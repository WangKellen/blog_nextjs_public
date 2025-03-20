"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  icon?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {/* 时间轴中心线 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-orange-400 to-rose-400"></div>
      
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
        >
          {/* 时间点 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-orange-400 z-10">
            <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-75"></div>
          </div>
          
          {/* 内容卡片 */}
          <div
            className={`w-5/12 p-6 rounded-xl bg-white/10 backdrop-blur-lg shadow-xl
              hover:bg-white/15 transition-all duration-300 transform hover:scale-105
              border border-white/20 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}
          >
            <div className="text-orange-400 font-semibold mb-2">{item.date}</div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-gray-300">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};