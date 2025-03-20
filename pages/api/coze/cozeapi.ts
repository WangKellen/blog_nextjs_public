import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '仅支持POST请求' });
  }

  try {
    const requestBody = {
      ...req.body,
      stream: true, // 启用流式响应
      timeout: 60000 // 设置60秒超时
    };

    const response = await fetch('https://api.coze.cn/open_api/v2/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${req.headers.authorization?.split(' ')[1]}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({
        error: errorData.message || '请求失败',
        code: errorData.code
      });
    }

    // 设置响应头以支持流式传输
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = response.body?.getReader();
    if (!reader) {
      res.write(`data: ${JSON.stringify({ error: '无法获取响应流' })}

`);
      res.end();
      return;
    }

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const decoder = new TextDecoder();
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.slice(5).trim();
            if (!data) continue;

            try {
              const jsonData = JSON.parse(data);
              let content = '';
              
              // 处理标准格式的响应
              if (jsonData.choices?.[0]?.delta?.content) {
                content = jsonData.choices[0].delta.content;
              }
              // 处理消息事件格式的响应
              else if (jsonData.event === 'message' && 
                       jsonData.message?.type === 'answer' && 
                       jsonData.message?.content) {
                content = jsonData.message.content;
              }

              if (content) {
                // 直接传递原始内容，保留换行符
                res.write(`data: ${content.replace(/\n/g, '\n')}\n\n`);
              }
            } catch (parseError) {
              console.error('解析JSON数据失败:', parseError);
              continue;
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
      res.end();
    }
  } catch (error) {
    console.error('COZE API请求失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
}