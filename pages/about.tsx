import React, { useState } from 'react';
import { DotPattern } from '../components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Timeline } from '../components/magicui/timeline';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaGamepad, FaCamera, FaFilm, FaDumbbell, FaHeart } from 'react-icons/fa';
import { ShineBorder } from '../components/magicui/shine-border';
import { Pointer } from "../components/magicui/pointer";
import { motion, AnimatePresence } from "motion/react";

function DotPatternDemo() {
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

const AboutPage = () => {
  const [activeCards, setActiveCards] = useState({
    ai: false,
    game: false,
    fitness: false,
    pet: false,
    photo: false,
    movie: false
  });

  const toggleCard = (card: keyof typeof activeCards) => {
    setActiveCards(prev => ({
      ...prev,
      [card]: !prev[card]
    }));
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 text-white">
      <div className="absolute inset-0">
        <DotPatternDemo />
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <Link href="/" className="inline-block mb-8 px-6 py-3 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          ← 返回主页
        </Link>
        <h1 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
          关于我
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl flex flex-col h-full">
            <div className="flex flex-col md:flex-row gap-4 flex-grow">
              <div className="md:w-1/3">
                <div className="relative w-full pt-[100%] rounded-xl overflow-hidden mb-4">
                  <Image
                    src="/myphotos/pic1.jpg"
                    alt="个人照片"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-white text-lg font-semibold">王昆仑</h3>
                    <p className="text-white/80 text-sm">AI产品经理 / 开发者</p>
                  </div>
                </div>
                <div className="flex gap-2 justify-center mb-4 md:mb-0">
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
                     className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                    <FaGithub size={20} className="text-white/80" />
                  </a>
                  <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"
                     className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                    <FaTwitter size={20} className="text-white/80" />
                  </a>
                  <a href="mailto:your.email@example.com"
                     className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                    <FaEnvelope size={20} className="text-white/80" />
                  </a>
                </div>
              </div>
              <div className="md:w-2/3 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold mb-3 text-orange-400">个人简介</h2>
                <p className="text-base leading-relaxed mb-4 text-white/90">
                      一名充满激情的产品经理和半个程序员，我始终致力于将创新想法转化为实际的产品解决方案。在技术与产品的交叉领域中，我找到了独特的平衡点，能够同时从用户体验和技术实现的角度思考问题。
                </p>
                <div className="grid grid-cols-1 gap-4 flex-grow">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-orange-400">项目经验</h3>
                    <ul className="space-y-2 text-sm text-white/90">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span>主导设计20余款虚拟仿真软件，赋能高校教育</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span>设计并实现XR虚拟展厅系统，为企业数字化转型提供创新解决方案</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span>设计并实现5款高校AIGC工具，为高校智能化教育提供新的思路</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-orange-400">个人成就</h3>
                    <ul className="space-y-2 text-sm text-white/90">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span>由人力资源和社会保障部社会保障能力建设中心主办的《虚拟现实应用技术人才》高级培训班主讲老师，培训并赋能高校教师200余人</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span>从0-1设计搭建了20余款虚拟仿真软件，参与并使用学生达3000余</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span>设计5款AIGC工具，赋能学校AI教育教学及教师办公</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-orange-400">座右铭</h3>
                    <p className="text-sm text-white/90 italic text-center px-4 py-3 border-l-2 border-orange-400/50">
                      "创新源于思考，成功始于行动。保持对技术的热爱，
                      用创造力改变世界，让每一个项目都成为进步的阶梯。"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl flex-grow">
              <h2 className="text-3xl font-semibold mb-6 text-orange-400">专业技能</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
                  <ShineBorder borderWidth={2} duration={10} shineColor={["#f97316", "#fb923c"]} />
                  <span className="text-orange-400 block mb-2">产品设计</span>
                  <div className="space-y-2">
                    <div className="h-2 bg-orange-400/20 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-orange-400 rounded-full"></div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">需求分析</span>
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">用户研究</span>
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">产品规划</span>
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">原型设计</span>
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">项目管理</span>
                    </div>
                  </div>
                </div>
                <div className="relative bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
                  <ShineBorder borderWidth={2} duration={10} shineColor={["#f97316", "#fb923c"]} />
                  <span className="text-orange-400 block mb-4">Python开发</span>
                  <div className="space-y-4">
                    <div className="h-2 bg-orange-400/20 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-orange-400 rounded-full"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">Web开发</span>
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">数据分析</span>
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">自动化</span>
                    </div>
                  </div>
                </div>
                <div className="relative bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
                  <ShineBorder borderWidth={2} duration={10} shineColor={["#f97316", "#fb923c"]} />
                  <span className="text-orange-400 block mb-4">Django框架</span>
                  <div className="space-y-4">
                    <div className="h-2 bg-orange-400/20 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-orange-400 rounded-full"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">后端开发</span>
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">API设计</span>
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">数据库</span>
                    </div>
                  </div>
                </div>
                <div className="relative bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
                  <ShineBorder borderWidth={2} duration={10} shineColor={["#f97316", "#fb923c"]} />
                  <span className="text-orange-400 block mb-4">AI与XR产品规划</span>
                  <div className="space-y-4">
                    <div className="h-2 bg-orange-400/20 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-orange-400 rounded-full"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">AI应用</span>
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">XR应用</span>
                      <span className="px-2 py-1 text-xs bg-white/5 rounded-full text-white/80">创新设计</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
              <h2 className="text-3xl font-semibold mb-6 text-orange-400">兴趣爱好</h2>
              <div className="grid grid-cols-3 gap-3">
    <div 
      onClick={() => toggleCard('ai')}
      className={`bg-white/5 p-4 rounded-lg text-center hover:bg-white/10 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer relative ${activeCards.ai ? 'glow-effect' : ''}`}
    >
      <svg className={`w-6 h-6 text-orange-400 transition-transform ${activeCards.ai ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      <span className="text-orange-400 text-sm">AI</span>
    </div>
    <div 
      onClick={() => toggleCard('game')}
      className={`bg-white/5 p-4 rounded-lg text-center hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${activeCards.game ? 'scale-105' : ''}`}
    >
      <FaGamepad className={`w-6 h-6 text-orange-400 transition-transform ${activeCards.game ? 'animate-wiggle' : ''}`} />
      <span className="text-orange-400 text-sm">游戏</span>
    </div>
    <div 
      onClick={() => toggleCard('fitness')}
      className={`bg-white/5 p-4 rounded-lg text-center hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${activeCards.fitness ? 'scale-105' : ''}`}
    >
      <FaDumbbell className={`w-6 h-6 text-orange-400 transition-transform ${activeCards.fitness ? 'animate-bounce' : ''}`} />
      <span className="text-orange-400 text-sm">健身</span>
    </div>
    <div 
      onClick={() => toggleCard('pet')}
      className="bg-white/5 p-4 rounded-lg text-center hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer relative"
    >
      <div className="relative">
        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <AnimatePresence>
          {activeCards.pet && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2"
            >
              <FaHeart className="text-red-500 w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="text-orange-400 text-sm">养宠</span>
    </div>
    <div 
      onClick={() => toggleCard('photo')}
      className={`bg-white/5 p-4 rounded-lg text-center hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${activeCards.photo ? 'scale-105' : ''}`}
    >
      <FaCamera className={`w-6 h-6 text-orange-400 transition-transform ${activeCards.photo ? 'animate-flash' : ''}`} />
      <span className="text-orange-400 text-sm">旅游摄影</span>
    </div>
    <div 
      onClick={() => toggleCard('movie')}
      className={`bg-white/5 p-4 rounded-lg text-center hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${activeCards.movie ? 'rotate-12' : ''}`}
    >
      <FaFilm className={`w-6 h-6 text-orange-400 transition-transform ${activeCards.movie ? 'animate-spin-slow' : ''}`} />
      <span className="text-orange-400 text-sm">电影</span>
    </div>
  </div>
            </div>
          </div>
        </div>

        {/* 时间轴部分 */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
            个人经历
          </h2>
          <Timeline
            items={[
              {
                date: "2025 - 现在",
                title: "AI、XR产品经理",
                description: "负责AI与XR产品的创新规划和开发，推动产品从概念到落地的全过程。"
              },
              {
                date: "2021 - 2024",
                title: "售前工程师 & XR产品经理",
                description: "主导多个XR项目技术方案设计和产品规划，培养了跨职能团队协作能力。"
              },
              {
                date: "2020 - 2021",
                title: "Python教师",
                description: "担任Python编程培训讲师，培训学员的编程思维和实践能力。"
              },
              {
                date: "2016 - 2020",
                title: "西南科技大学",
                description: "就读于软件工程专业，系统学习编程技术和软件开发理论。"
              }
            ]}
          />
        </div>

        {/* 社交媒体链接 */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold mb-8 text-orange-400">联系方式</h2>
          <div className="flex justify-center space-x-8">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
               className="text-white hover:text-orange-400 transition-colors duration-300">
              <FaGithub size={32} />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"
               className="text-white hover:text-orange-400 transition-colors duration-300">
              <FaTwitter size={32} />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
               className="text-white hover:text-orange-400 transition-colors duration-300">
              <FaLinkedin size={32} />
            </a>
            <a href="mailto:your.email@example.com"
               className="text-white hover:text-orange-400 transition-colors duration-300">
              <FaEnvelope size={32} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;