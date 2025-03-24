'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { DotPattern } from '../../components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';


interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function CozePage() {
  const { theme, setTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/coze/cozeapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer pat_XSUJna2IPuKCw8WMOOahgJLJIx4jtVxbup2HtsavQRdDvxnaIH6peiuho0opPIM5'
        },
        body: JSON.stringify({
          bot_id: '7481591439231762484',
          user: '123456',
          query: input.trim()
        })
      });

      if (!response.ok) {
        throw new Error('请求失败');
      }

      const assistantMessage = { role: 'assistant' as const, content: '' };
      setMessages(prev => [...prev, assistantMessage]);

      let currentMessage = '';
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('无法获取reader');
      }

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (!data) continue;
              
              currentMessage += data;
              // 使用函数式更新确保状态更新的一致性
              setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && lastMessage.role === 'assistant') {
                  lastMessage.content = currentMessage;
                  return [...newMessages];
                }
                return newMessages;
              });
              
              // 等待一小段时间模拟打字效果
              await new Promise(resolve => setTimeout(resolve, 50));
            }
          }
        }
      } catch (readerError) {
        console.error('读取流失败:', readerError);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="fixed top-6 left-6 z-50">
        <Link href="/ai" className="inline-flex items-center px-6 py-3 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-lg rounded-xl text-gray-800 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          返回AI实验室
        </Link>
      </div>
      
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-4 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-lg rounded-xl text-gray-800 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      <div className="container mx-auto max-w-3xl p-4 pt-24 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400 animate-gradient">Coze 智能助手</h1>
      
      <div className="space-y-6 mb-6 h-[600px] overflow-y-auto p-6 bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl relative z-20 scrollbar-thin scrollbar-thumb-orange-400/20 hover:scrollbar-thumb-orange-400/40 scrollbar-track-transparent hover:scrollbar-track-white/5 scrollbar-thumb-rounded-full scrollbar-track-rounded-full transition-colors duration-200">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}
          >
            <div className={`flex-shrink-0 w-10 h-10 rounded-full overflow-hidden ${message.role === 'user' ? 'bg-gradient-to-r from-orange-400 to-rose-400 shadow-lg' : 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg'} p-0.5`}>
              <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center">
                {message.role === 'user' ? (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                )}
              </div>
            </div>
            <div
              className={`max-w-[75%] p-4 rounded-2xl shadow-lg ${message.role === 'user' ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white' : 'bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-gray-200/50 dark:border-white/20'} animate-message-appear`}
            >
              <div className="prose prose-sm dark:prose-invert whitespace-pre-wrap break-words max-w-full prose-p:my-2 prose-p:whitespace-pre-wrap">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {loading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
          <div className="flex items-start gap-4 animate-fade-in">
            <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg p-0.5">
              <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
            </div>
            <div className="max-w-[75%] p-4 rounded-2xl shadow-lg bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse delay-150"></div>
                <div className="w-3 h-3 bg-violet-500 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="relative flex gap-3 mt-6">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入你的问题..."
          disabled={loading}
          className="flex-1 px-6 py-4 text-base rounded-2xl border-2 border-gray-200/50 dark:border-white/20 focus:border-orange-400/50 transition-colors duration-200 bg-white/5 backdrop-blur-lg"
        />
        <Button 
          type="submit" 
          disabled={loading}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500 text-white font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          发送
        </Button>
      </form>
    </div>
  </div>
);
}