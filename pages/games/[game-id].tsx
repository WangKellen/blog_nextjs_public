import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { DotPattern } from '../../components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { Pointer } from '@/components/magicui/pointer';
import { useTheme } from 'next-themes';

// 定义游戏组件的类型
type Card = {
  id: number;
  value: string;
};

type GameComponentProps = {
  onGameOver?: (score: number) => void;
};

type GameData = {
  title: string;
  description: string;
  instructions: string;
  component: React.FC<GameComponentProps>;
  bgColor: string;
  category: string;
};

const gamesData: Record<string, GameData> = {
  'memory-match': {
    title: '记忆配对',
    description: '测试你的记忆力！翻转卡片并找到匹配的对子。',
    instructions: '点击卡片将其翻转，找到所有匹配的对子以完成游戏。尽量用最少的步骤完成！',
    component: MemoryMatchGame,
    bgColor: 'from-indigo-500 to-purple-600',
    category: 'puzzle'
  },
  'snake': {
    title: '贪吃蛇',
    description: '控制蛇吃食物并成长，但不要撞到墙壁或自己的身体！',
    instructions: '使用方向键控制蛇的移动方向。吃到食物后蛇会变长，撞到墙壁或自己的身体则游戏结束。',
    component: SnakeGame,
    bgColor: 'from-emerald-500 to-teal-600',
    category: 'arcade'
  },
  'tic-tac-toe': {
    title: '井字棋',
    description: '经典的两人对战游戏，谁能先连成一线？',
    instructions: '两名玩家轮流在3x3的网格上放置X和O标记。先将三个标记连成一条直线的玩家获胜。',
    component: TicTacToeGame,
    bgColor: 'from-blue-500 to-sky-600',
    category: 'strategy'
  },
  'breakout': {
    title: '打砖块',
    description: '控制挡板反弹球，打破所有的砖块！',
    instructions: '使用鼠标或左右方向键控制挡板移动。反弹球以打破所有砖块，不要让球掉落到底部！',
    component: BreakoutGame,
    bgColor: 'from-amber-500 to-orange-600',
    category: 'action'
  },
};

// 记忆配对游戏组件
function MemoryMatchGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // 初始化游戏
  useEffect(() => {
    initGame();
  }, []);

  // 初始化游戏函数
  const initGame = () => {
    // 创建卡片对
    const cardValues = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const duplicatedCards = [...cardValues, ...cardValues];
    
    // 洗牌算法
    const shuffledCards = duplicatedCards
      .map(value => ({ value, id: Math.random() }))
      .sort((a, b) => a.id - b.id)
      .map((card, index) => ({ ...card, id: index }));
    
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    setMoves(0);
    setGameOver(false);
    setGameStarted(false);
    setShowPreview(false);
  };

  // 开始游戏
  const startGame = () => {
    setGameStarted(true);
    setShowPreview(true);
    // 显示所有卡片3秒
    const allCards = cards.map((_, index) => index);
    setFlipped(allCards);
    
    setTimeout(() => {
      setFlipped([]);
      setShowPreview(false);
    }, 3000);
  };

  // 处理卡片点击
  const handleCardClick = (id: number) => {
    if (!gameStarted || showPreview || disabled || flipped.includes(id) || solved.includes(id)) return;
    
    // 翻转卡片
    const newFlipped = flipped.length === 0 ? [id] : [...flipped, id];
    setFlipped(newFlipped);
    
    // 如果翻转了两张卡片
    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves(moves + 1);
      
      // 检查是否匹配
      const [first, second] = newFlipped;
      if (cards[first].value === cards[second].value) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        setDisabled(false);
        
        // 检查游戏是否结束
        if (solved.length + 2 === cards.length) {
          setGameOver(true);
        }
      } else {
        // 如果不匹配，延迟翻回
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 flex justify-between w-full max-w-md">
        <div className="text-lg font-medium text-gray-800 dark:text-white">步数: {moves}</div>
        <button 
          onClick={initGame}
          className="px-4 py-2 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-lg transition-colors text-gray-800 dark:text-white"
        >
          重新开始
        </button>
      </div>
      
      {!gameStarted ? (
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">准备好了吗？</h3>
          <p className="mb-4 text-gray-600 dark:text-white/90">点击开始按钮，记住卡片位置</p>
          <RainbowButton onClick={startGame} className="px-6 py-3">
            开始游戏
            <Pointer>
              <div className="h-4 w-4 rounded-full bg-white" />
            </Pointer>
          </RainbowButton>
        </div>
      ) : gameOver ? (
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">恭喜！你赢了！</h3>
          <p className="mb-4 text-gray-600 dark:text-white/90">你用了 {moves} 步完成了游戏</p>
          <RainbowButton onClick={initGame} className="px-6 py-3">
            再玩一次
            <Pointer>
              <div className="h-4 w-4 rounded-full bg-white" />
            </Pointer>
          </RainbowButton>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 w-full max-w-md">
          {cards.map((card, index) => (
            <div 
              key={index}
              onClick={() => handleCardClick(index)}
              className={`relative aspect-square flex items-center justify-center text-3xl rounded-lg cursor-pointer transform-gpu transition-all duration-500 ${flipped.includes(index) || solved.includes(index) ? 'bg-white dark:bg-white/20 rotate-y-0' : 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-purple-500/20 dark:to-indigo-500/20 rotate-y-180'}`}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className={`absolute inset-0 flex items-center justify-center backface-hidden transition-opacity duration-500 text-gray-800 dark:text-white ${flipped.includes(index) || solved.includes(index) ? 'opacity-100' : 'opacity-0'}`}>
                {card.value}
              </div>
              <div className={`absolute inset-0 flex items-center justify-center backface-hidden transition-opacity duration-500 text-gray-600 dark:text-white ${flipped.includes(index) || solved.includes(index) ? 'opacity-0' : 'opacity-100'}`}>
                <span className="text-2xl">?</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 贪吃蛇游戏组件（简化版）
function SnakeGame() {
  return (
    <div className="text-center">
      <p className="mb-8">贪吃蛇游戏将在这里实现</p>
      <div className="w-full max-w-md h-80 mx-auto bg-white/10 rounded-lg flex items-center justify-center">
        <p>游戏区域</p>
      </div>
    </div>
  );
}

// 井字棋游戏组件（简化版）
function TicTacToeGame() {
  return (
    <div className="text-center">
      <p className="mb-8">井字棋游戏将在这里实现</p>
      <div className="w-full max-w-md h-80 mx-auto bg-white/10 rounded-lg flex items-center justify-center">
        <p>游戏区域</p>
      </div>
    </div>
  );
}

// 打砖块游戏组件（简化版）
function BreakoutGame() {
  return (
    <div className="text-center">
      <p className="mb-8">打砖块游戏将在这里实现</p>
      <div className="w-full max-w-md h-80 mx-auto bg-white/10 rounded-lg flex items-center justify-center">
        <p>游戏区域</p>
      </div>
    </div>
  );
}

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

const GameDetailPage = () => {
  const router = useRouter();
  const { 'game-id': gameId } = router.query;
  const [game, setGame] = useState<GameData | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    if (gameId && typeof gameId === 'string') {
      const gameData = gamesData[gameId];
      if (gameData) {
        setGame(gameData);
      } else {
        router.push('/games');
      }
    }
  }, [gameId, router]);

  if (!game) {
    return (
      <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
        <div className="absolute inset-0 opacity-30 dark:opacity-50">
          <DotPatternBackground />
        </div>
        <Navbar />
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/10 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-orange-400 border-r-orange-400 border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-medium text-white">加载中...</p>
        </div>
      </div>
    );
  }

  const GameComponent = game.component;

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="absolute inset-0 opacity-30 dark:opacity-50">
        <DotPatternBackground />
      </div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/games" className="inline-block">
            <div className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 text-white transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              返回游戏列表
            </div>
          </Link>
          <div className="flex gap-4">
            <button
              onClick={() => setShowStats(!showStats)}
              className="px-4 py-2 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-lg transition-colors text-gray-800 dark:text-white flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              统计
            </button>
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              className="px-4 py-2 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-lg transition-colors text-gray-800 dark:text-white flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              成就
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 游戏信息区域 */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-200 dark:border-white/10">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
                  {game.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {game.description}
                </p>
                <div className={`p-6 rounded-xl bg-gradient-to-br ${game.bgColor} shadow-lg backdrop-blur-md`}>
                  <h2 className="text-2xl font-bold mb-4 text-white">游戏说明</h2>
                  <p className="text-white/90">{game.instructions}</p>
                </div>
              </div>

              {showStats && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 text-white">游戏统计</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">最高分数</span>
                      <span className="text-orange-400 font-bold">1000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">游戏次数</span>
                      <span className="text-orange-400 font-bold">25</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">总游戏时间</span>
                      <span className="text-orange-400 font-bold">2小时</span>
                    </div>
                  </div>
                </div>
              )}

              {showAchievements && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 text-white">成就</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">新手入门</h3>
                        <p className="text-sm text-gray-300">完成第一局游戏</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">高分达人</h3>
                        <p className="text-sm text-gray-300">达到1000分</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 游戏区域 */}
          <div className="lg:col-span-9">
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">游戏区域</h2>
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                      <span className="text-sm text-gray-600 dark:text-gray-300">在线玩家</span>
                      <span className="ml-2 text-orange-500 dark:text-orange-400 font-bold">128</span>
                    </div>
                    <div className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                      <span className="text-sm text-gray-600 dark:text-gray-300">最高分</span>
                      <span className="ml-2 text-orange-500 dark:text-orange-400 font-bold">2048</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={game.category === 'arcade' || game.category === 'action' ? 'p-4' : 'p-8'}>
                <GameComponent />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GameDetailPage;