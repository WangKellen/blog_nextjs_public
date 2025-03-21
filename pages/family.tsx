'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { IconFileWord, IconSun, IconMoon } from '@tabler/icons-react';
import confetti from 'canvas-confetti';
// 从正确的相对路径导入 AnimatedTestimonials 组件
import { AnimatedTestimonials } from '../components/ui/animated-testimonials';

const familyMembers = [
  {
    quote: '家庭的顶梁柱，永远温暖有力的臂膀',
    name: '大王',
    designation: '家庭顶梁柱',
    src: '/合照/大王.jpg'
  },
  {
    quote: '家庭的贤内助，永远温柔体贴的港湾',
    name: '小王',
    designation: '温柔港湾',
    src: '/合照/小王.jpg'
  },
  {
    quote: '活泼可爱的小天使，给家庭带来欢乐',
    name: '可乐',
    designation: '开心果',
    src: '/合照/可乐.jpg'
  },
  {
    quote: '甜美可人的小公主，家里的开心果',
    name: '草莓',
    designation: '小公主',
    src: '/合照/草莓.jpg'
  },
  {
    quote: '软萌可爱的小天使，永远的开心果',
    name: '馒头',
    designation: '小天使',
    src: '/合照/馒头.jpg'
  }
];

export default function FamilyPage() {
  const { theme, setTheme } = useTheme();

  const triggerFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 dark:block hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,182,255,0.1),rgba(255,182,255,0)_50%)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(147,197,253,0.15),rgba(147,197,253,0)_50%)] pointer-events-none"></div>
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-lg rounded-xl text-gray-800 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
        >
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
            <IconSun className="w-6 h-6" />
          ) : (
            <IconMoon className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={triggerFireworks}
          className="p-4 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-lg rounded-xl text-gray-800 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
        >
          <IconFileWord className="w-6 h-6" />
        </button>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-screen-2xl relative z-10">
        <h1 className="text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
          我的家庭
        </h1>
        <div className="text-lg">
          <AnimatedTestimonials testimonials={familyMembers} />
        </div>
      </div>
    </div>
  );
}