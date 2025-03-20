import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { DotPattern } from '../../components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import { Pointer } from '@/components/magicui/pointer';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { useTheme } from 'next-themes';

// 游戏分类数据
const categories = [
  { id: 'all', name: '全部' },
  { id: 'puzzle', name: '益智' },
  { id: 'action', name: '动作' },
  { id: 'strategy', name: '策略' },
  { id: 'arcade', name: '街机' },
];

// 游戏数据
const games = [
  {
    id: 'memory-match',
    title: '记忆配对',
    category: 'puzzle',
    description: '测试你的记忆力！翻转卡片并找到匹配的对子。',
    image: '/games/memory-match.jpg',
    bgColor: 'from-purple-500 to-blue-500',
  },
  {
    id: 'snake',
    title: '贪吃蛇',
    category: 'arcade',
    description: '控制蛇吃食物并成长，但不要撞到墙壁或自己的身体！',
    image: '/games/snake.jpg',
    bgColor: 'from-green-500 to-emerald-700',
  },
  {
    id: 'tic-tac-toe',
    title: '井字棋',
    category: 'strategy',
    description: '经典的两人对战游戏，谁能先连成一线？',
    image: '/games/tic-tac-toe.jpg',
    bgColor: 'from-blue-500 to-indigo-700',
  },
  {
    id: 'breakout',
    title: '打砖块',
    category: 'action',
    description: '控制挡板反弹球，打破所有的砖块！',
    image: '/games/breakout.jpg',
    bgColor: 'from-red-500 to-orange-600',
  },
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

const GameCard = ({ game }: { game: { 
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  bgColor: string;
} }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative overflow-hidden rounded-xl transition-all duration-300 min-h-[320px] ${isHovered ? 'scale-105 shadow-xl' : 'shadow-md'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${game.bgColor} opacity-80`}></div>
      
      {/* 游戏预览图片 */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          src={game.image}
          alt={game.title}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      
      <div className="relative p-6 h-full flex flex-col justify-between z-10">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
          <div className="inline-block px-3 py-1 mb-4 text-sm bg-white/20 rounded-full text-white">
            {categories.find(cat => cat.id === game.category)?.name}
          </div>
          <div className={`min-h-[80px] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-white/90">
              {game.description}
            </p>
          </div>
        </div>
        
        <Link href={`/games/${game.id}`} className="block mt-4">
          <RainbowButton className="w-full group relative cursor-pointer">
            开始游戏
            <span className="absolute right-4 top-1/2 -translate-y-1/2 transition-transform group-hover:translate-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </RainbowButton>
        </Link>
      </div>
    </div>
  );
};

const GamesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { theme, setTheme } = useTheme();
  
  const filteredGames = activeCategory === 'all' 
    ? games 
    : games.filter(game => game.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
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
            游戏中心
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            探索各种有趣的小游戏，测试你的技巧和反应能力！
          </p>
        </div>
        
        {/* 分类选择器 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${activeCategory === category.id 
                ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white font-medium shadow-md' 
                : 'bg-white/10 hover:bg-white/20 text-gray-700 dark:text-gray-200'}`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* 游戏网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default GamesPage;