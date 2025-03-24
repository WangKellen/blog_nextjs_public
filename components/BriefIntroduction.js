// components/BriefIntroduction.js
import { ShineBorder } from './magicui/shine-border';
import { motion } from 'framer-motion';
import CircularGallery from './CircularGallery/CircularGallery';


const BriefIntroduction = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="container mx-auto px-4 py-24">
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="space-y-12"
      >
        {/* 个人简介部分 */}
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16 relative z-20">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
            关于我
          </h2>
          <p className="text-gray-900 dark:text-white text-lg leading-relaxed">
            一名产品经理和半个程序员，致力于将创新想法转化为实际的产品解决方案。
            在技术与产品的交叉领域中，找到了独特的平衡点。
          </p>
        </motion.div>

        {/* 核心技能网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            {...fadeInUp}
            className="relative bg-white/75 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-200/20 dark:border-white/10 group hover:bg-white/100 dark:hover:bg-white/20 transition-all duration-300 z-10"
          >
            <ShineBorder borderWidth={2} duration={10} shineColor={["#f97316", "#fb923c"]} />
            <h3 className="text-xl font-semibold mb-4 text-orange-400">产品设计</h3>
            <ul className="space-y-2 text-gray-700 dark:text-white/80">
              <li className="flex items-center gap-2">
                <span className="text-orange-400">•</span>
                <span>需求分析与用户研究</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">•</span>
                <span>产品规划与原型设计</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">•</span>
                <span>用户体验优化</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="relative bg-white/75 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-200/20 dark:border-white/10 group hover:bg-white/20 transition-all duration-300"
          >
            <ShineBorder borderWidth={2} duration={10} shineColor={["#f97316", "#fb923c"]} />
            <h3 className="text-xl font-semibold mb-4 text-orange-400">技术开发</h3>
            <ul className="space-y-2 text-gray-700 dark:text-white/80">
              <li className="flex items-center gap-2">
                <span className="text-orange-400">•</span>
                <span>Python & Django开发</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">•</span>
                <span>Web应用开发</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">•</span>
                <span>数据分析与处理</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="relative bg-white/75 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-200/20 dark:border-white/10 group hover:bg-white/20 transition-all duration-300 z-10"
          >
            <ShineBorder borderWidth={2} duration={10} shineColor={["#f97316", "#fb923c"]} />
            <h3 className="text-xl font-semibold mb-4 text-orange-400">AI & XR</h3>
            <ul className="space-y-2 text-gray-700 dark:text-white/80">
              <li className="flex items-center gap-2">
                <span className="text-orange-400">•</span>
                <span>AI应用设计与开发</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">•</span>
                <span>XR产品规划</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">•</span>
                <span>创新技术应用</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* 最新项目展示 */}
        <motion.div 
          {...fadeInUp}
          className="h-[650px] w-full relative z-10"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center text-orange-400">最新项目</h3>
          <CircularGallery
            items={[
              { 
                image: "/最新项目/教学教育智能体平台.png",
                text: "AI教育平台"
              },
              { 
                image: "/最新项目/XR管线项目.png",
                text: "XR管线项目"
              },
              { 
                image: "/最新项目/无人机虚拟仿真.png",
                text: "无人机虚拟仿真训练系统"
              },
              { 
                image: "/最新项目/AI数字人.png",
                text: "AI数字人"
              },
              { 
                image: "/最新项目/AI绘图工坊.png",
                text: "AI绘图工坊"
              },
              { 
                image: "/最新项目/AI建筑效果图体验站.png",
                text: "AI建筑效果图体验站"
              }
            ]}
            bend={2}
            textColor="#f97316"
            borderRadius={0.05}
            font="bold 24px DM Sans"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BriefIntroduction;