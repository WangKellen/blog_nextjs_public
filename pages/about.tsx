import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Timeline } from '../components/magicui/timeline';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaGamepad, FaCamera, FaFilm, FaDumbbell, FaHeart } from 'react-icons/fa';
import { ShineBorder } from '../components/magicui/shine-border';
import { Pointer } from "../components/magicui/pointer";
import { motion, AnimatePresence } from "motion/react";



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
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.1)_0%,transparent_70%)] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px] animate-[grid_20s_linear_infinite]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-50">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-orange-400/30 blur-xl"
                style={{
                  width: `${Math.random() * 4 + 1}rem`,
                  height: `${Math.random() * 4 + 1}rem`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `scale(${Math.random() * 0.5 + 0.5})`,
                  animation: `float ${Math.random() * 10 + 5}s linear infinite`,
                  animationDelay: `${Math.random() * -10}s`
                }}
              />
            ))}
          </div>
        </div>
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
            <a href="https://github.com/WangKellen" target="_blank" rel="noopener noreferrer" 
               className="text-white hover:text-orange-400 transition-colors duration-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            <a href="https://www.douyin.com/user/MS4wLjABAAAAY36iobpBicy5e9Kt75f7ZDtX5y82AoVxKCMIQjSb_JJPkI7bZe3o5TqdxRhalg6X?from_tab_name=main" target="_blank" rel="noopener noreferrer"
               className="text-white hover:text-orange-400 transition-colors duration-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 1024 1024">
                <path d="M32 511.776c0 264.96 214.784 479.744 479.776 479.744 264.96 0 479.744-214.784 479.744-479.744C991.52 246.816 776.736 32 511.776 32 246.816 32 32 246.784 32 511.776z" fill="#170B1A" />
                <path d="M512.256 347.2c0.448-50.368 0-101.216 0.448-151.616h103.168c-0.48 9.12 0.96 17.76 2.4 26.4l-70.528 5.76 5.76 403.968c0.48 17.28-12 56.128-20.64 71.008-13.44 23.04-54.208 44.128-81.088 46.528-16.768 1.44-29.248-2.88-44.608-11.04-11.52-6.24-17.76-40.768-21.12-49.92 26.4 14.912 60.96 13.44 86.4-3.328a88.128 88.128 0 0 0 40.736-73.408c-0.96-88.288-0.96-176.544-0.96-264.32z m169.824-29.248c14.4 9.088 30.72 16.32 47.488 19.648 10.08 2.4 19.68 3.36 29.76 3.36v27.84c-29.76-6.72-94.048-25.44-77.248-50.88z" fill="#25F4EE" />
                <path d="M326.08 447.008a188.032 188.032 0 0 1 125.216-26.4v31.68c-40.288 0.96-73.856 18.24-106.496 42.208-24.448 18.24-41.28 36.928-54.208 64.768-12.48 26.368-17.76 48.448-17.28 77.728 0 32.128 8.64 55.168 24 83.456 7.2 12.96 21.12 32.64 17.76 47.04a185.92 185.92 0 0 1-53.76-59.04 193.6 193.6 0 0 1-26.368-103.136 195.52 195.52 0 0 1 28.288-94.496 186.08 186.08 0 0 1 62.848-63.808z" fill="#25F4EE" />
                <path d="M541.984 221.984h77.248c12 20.64 11.04 28.32 17.76 41.28 10.56 20.608 18.688 28.288 41.728 51.328a11.2 11.2 0 0 1 3.36 3.36c20.16 23.04 47.488 39.328 77.248 46.048 17.28 12.48 5.28 62.848 5.28 89.696-50.4 0.48-101.728-19.2-142.496-48.928 0 64.32 0 123.776 0.48 188.544 0 8.64 0.48 16.8 0 25.92-2.4 31.168-16.8 76.768-32.64 103.616a197.888 197.888 0 0 1-53.728 60.928 172 172 0 0 1-97.856 33.6 219.936 219.936 0 0 1-53.28-4.32c-24.448-5.28-47.968-29.76-68.576-44.16l-1.44-1.408c-10.08-10.56-19.2-22.56-25.92-36-15.36-27.84-24-59.488-24-91.616a192 192 0 0 1 18.24-84.928c12.96-27.84 32.16-52.8 56.128-71.04a194.24 194.24 0 0 1 111.296-38.816c11.04 5.248 3.36 86.336 3.36 86.336-12.928-4.32-30.208-2.88-43.648 0.48-16.32 3.36-24.96 12.96-37.44 23.52-7.68 6.72-14.4 13.92-18.688 23.04-8.16 15.36-7.68 17.28-6.24 34.528 1.92 16.32 4.8 34.048 15.84 46.528 7.2 9.12 12 23.04 21.568 29.28 7.68 12.48 17.76 21.568 28.8 26.88 15.36 8.128 32.64 11.52 49.408 10.048 26.88-1.92 51.84-18.24 65.28-41.728 8.64-15.36 12.448-35.04 12.448-51.84 0-141.504 0.48-410.176 0.48-410.176z" fill="#FFFFFF" />
                <path d="M618.24 221.984c9.152 0.48 17.792 0 27.36 0 0 29.76 9.6 59.968 26.88 84.448 2.4 3.36 4.32 6.24 6.72 8.64-19.68-12-35.04-30.72-45.568-51.36-6.72-12.48-12-26.88-15.36-41.728z m141.088 142.016c10.048 2.4 19.648 3.36 29.76 3.36v104.096c-50.88 0.48-101.76-16.32-143.488-46.528v206.784c0.48 15.808-0.96 31.168-4.32 46.528a192 192 0 0 1-75.776 115.616 181.216 181.216 0 0 1-68.16 30.24c-29.728 6.72-60.416 6.24-89.216-1.44a189.888 189.888 0 0 1-91.136-54.72c20.608 14.88 44.128 24.48 69.056 29.76 17.28 3.84 35.52 4.8 53.28 4.32a172 172 0 0 0 97.856-33.6 198.624 198.624 0 0 0 53.76-60.928 211.136 211.136 0 0 0 27.808-89.216 233.28 233.28 0 0 0 0-25.92c-0.96-63.808-0.96-128.096-0.96-192.384a240.32 240.32 0 0 0 142.016 45.12c-0.48-26.88 0-54.24-0.48-81.088z" fill="#FE2C55" />
                <path d="M451.296 444.608c10.08 0 20.64 0.48 30.24 1.92v106.976a84.672 84.672 0 0 0-45.12-1.92c-28.288 6.24-51.808 27.84-61.856 55.168-10.08 26.88-6.24 58.56 10.56 81.568-10.08-5.76-18.24-13.44-25.44-22.56-10.56-12.48-17.76-28.8-19.68-45.12-1.92-16.768 0.96-35.008 9.12-49.856 4.32-9.12 11.04-16.8 18.72-23.52 12.48-10.56 28.288-17.28 43.648-21.6 12.96-2.88 26.88-3.36 39.36 0.96 0.448-4.32 0.448-71.488 0.448-82.016z" fill="#FE2C55" />
              </svg>
            </a>
            <a href="https://space.bilibili.com/216750847" target="_blank" rel="noopener noreferrer"
               className="text-white hover:text-orange-400 transition-colors duration-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 1024 1024">
                <path d="M900.8 388.544c-0.384-68.304-57.6-124.224-122.832-122.928-44.064 0.864-85.584 0-135.6 0 21.36-22.464 41.424-41.856 59.856-60.576 11.472-11.664 10.128-22.944-0.336-33.6s-21.024-17.232-34.464-2.736-90.816 96.816-90.816 96.816H472.688s-70.512-68.496-97.296-96c-12.96-13.296-24-15.888-37.824-1.584s-11.232 25.488 2.016 38.688c17.808 17.712 34.032 37.056 53.472 58.512h-148.8a80.16 80.16 0 0 0-36.768 8.4c-46.416 22.944-68.976 61.392-69.552 111.408C136.784 488 137.6 591.296 137.6 694.4c0 91.968 44.496 139.2 136.032 143.664 8.064 0.432 19.2 0 19.2 0s4.224 40.944 40.992 40.992c34.08 0 40.752-41.616 40.752-41.616l298.656 1.584s7.776 40.992 38.4 40.992c48 0 43.968-40.992 43.968-40.992s62.88 5.712 95.184-24c30.912-28.464 48.336-62.4 49.008-102.48 2.16-108 1.44-216 1.008-324z m-79.584 336c0 28.8-7.968 35.904-37.92 35.904H262.592c-29.52 0-38.16-8.592-38.4-38.4V383.792c0-27.936 9.264-37.584 37.152-37.632q261.504-0.288 523.2 0c28.416 0 36.432 7.536 36.528 35.376q0.432 171.696-0.048 343.248z" fill="currentColor"></path><path d="M599.936 627.2s-27.312 26.112-46.176 14.4c-14.4-8.64-21.36-23.184-29.568-38.976l-0.288 0.48-0.288-0.48c-8.256 15.792-15.408 30.336-29.568 38.976-18.864 11.52-46.176-14.4-46.176-14.4l-22.656 15.648s-0.528 0.384 2.832 4.8c21.648 28.464 59.184 40.272 87.216 21.36a24.432 24.432 0 0 1 8.688-4.272 24.432 24.432 0 0 1 8.688 4.272c28.032 18.96 65.856 6.24 87.216-21.36 3.408-4.416 2.832-4.8 2.832-4.8zM280.1408 476.048l160.0176-30.0624 11.6352 61.9392-160.0176 30.0624zM763.5392 537.92l-160.0176-30.0624 11.6352-61.9392 160.0176 30.0624z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;