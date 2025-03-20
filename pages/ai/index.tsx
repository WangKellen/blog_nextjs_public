import { useState } from 'react';
import { DotPattern } from '../../components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ScrollProgress } from '../../components/magicui/scroll-progress';
import { useTheme } from 'next-themes';

// AI应用数据
const aiApps = [
  {
    id: 1,
    title: 'AI健筑师',
    description: '智能生成个性化的健身和饮食计划，助你达成健康目标。',
    icon: '💪',
    status: '在线运行',
    tags: ['健身规划', '营养指导', '个性化方案']
  },
  {
    id: 2,
    title: 'AI图像生成',
    description: '通过文本描述生成高质量的图像，让创意转化为现实。',
    icon: '🎨',
    status: '开发中',
    tags: ['Stable Diffusion', '图像生成', 'DALL-E']
  },
  {
    id: 3,
    title: 'AI代码助手',
    description: '智能代码补全和建议，提高编程效率。',
    icon: '💻',
    status: '规划中',
    tags: ['代码生成', '自动补全', '编程辅助']
  },
  {
    id: 4,
    title: 'COZE智能助手-AI健身助手',
    description: 'COZE官方智能体运用自然语言交互技术，精准打造详尽的健身规划与饮食方案，全方位助力健康生活。',
    icon: '🤖',
    status: '在线运行',
    tags: ['COZE', '智能体', '健身建议']
  },
  {
    id: 5,
    title: 'COZE智能助手-梗大师',
    description: 'COZE官方智能体，凭借自然语言交互技术，为你完整呈现网络热梗，从此玩梗接梗，轻松拿捏！ ',
    icon: '🐮',
    status: '在线运行',
    tags: ['COZE', '智能体', '健身建议']
  },
  // 更多AI应用...
];

function DotPatternBackground() {
  return (
    <div className="fixed inset-0 w-full h-full">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(2000px_circle_at_center,white,transparent)]",
          "opacity-50"
        )}
        glow={false}
      />
    </div>
  );
}

interface AIAppCardProps {
  app: {
    id: number;
    title: string;
    description: string;
    icon: string;
    status: string;
    tags: string[];
  };
}

const AIAppCard = ({ app }: AIAppCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-xl transition-all duration-300 bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-rose-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-4xl">{app.icon}</span>
          <span className={`px-3 py-1 rounded-full text-sm ${app.status === '在线运行' ? 'bg-green-500/20 text-green-500' : app.status === '开发中' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-gray-500/20 text-gray-500'}`}>
            {app.status}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-orange-400 transition-colors">
          {app.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {app.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {app.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-white/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded-full border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-rose-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </div>
  );
};

const AIPage = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <ScrollProgress />
      
      <div className="absolute inset-0 opacity-30 dark:opacity-50">
        <DotPatternBackground />
      </div>
      
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="inline-flex items-center px-6 py-3 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-lg rounded-xl text-gray-800 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          返回主页
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
      
      <main className="container mx-auto px-4 pt-8 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
            AI 实验室
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            探索AI的无限可能，体验未来科技的魅力
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiApps.map((app) => (
            <Link key={app.id} href={app.title === 'AI健筑师' ? '/ai/trainer' : app.title === 'COZE智能助手-AI健身助手' ? '/ai/coze' : app.title === 'COZE智能助手-梗大师' ? '/ai/gengmaster' : '#'} className="block">
              <AIAppCard app={app} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AIPage;