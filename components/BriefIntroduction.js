// components/BriefIntroduction.js
import { ShineBorder } from './magicui/shine-border';
import { motion } from 'framer-motion';

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
            一名充满激情的产品经理和半个程序员，致力于将创新想法转化为实际的产品解决方案。
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
          className="bg-white/35 dark:bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-gray-200/20 dark:border-white/10 z-10"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center text-orange-400">最新项目</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white/80 dark:bg-white/5 rounded-lg hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300">
              <h4 className="text-lg font-semibold mb-2 text-orange-400">AI教育平台</h4>
              <p className="text-gray-900 dark:text-white/90">设计开发多款AIGC工具，赋能高校教育教学及教师办公效率提升</p>
            </div>
            <div className="p-4 bg-white/80 dark:bg-white/5 rounded-lg hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300">
              <h4 className="text-lg font-semibold mb-2 text-orange-400">XR虚拟展厅</h4>
              <p className="text-gray-900 dark:text-white/90">为企业打造数字化展示平台，提供沉浸式体验解决方案</p>
            </div>
            <div className="p-4 bg-white/80 dark:bg-white/5 rounded-lg hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300">
              <h4 className="text-lg font-semibold mb-2 text-orange-400">无人机虚拟仿真训练系统</h4>
              <p className="text-gray-900 dark:text-white/90">为无人机相关专业学生提供基础训练，助力高校降本增效</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BriefIntroduction;