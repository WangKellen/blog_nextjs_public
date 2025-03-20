// ThreeDCardDemo 组件保持不变
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MorphingText } from "../components/magicui/morphing-text";
import { RainbowButton } from "../components/magicui/rainbow-button";
const texts = [
    "王大海",
    "产品经理",
    "半个程序员",
    "Python",
    "Django",
    "虚仿产品经理",
    "AI产品经理",
    "半个健身达人",
    "英雄联盟玩家",
];



export function MorphingTextHero() {
    return (
        <div className="flex items-center justify-center">
            <MorphingText
                texts={texts}
                className="text-[20pt] lg:text-[3rem] text-orange-500 mt-10 whitespace-nowrap"
            />
        </div>
    );
}


export function RainbowButtonDemo() {
  return <RainbowButton>Get Unlimited Access</RainbowButton>;
}


const ThreeDCardDemo = () => {

    return (
        <CardContainer className="inter-var">
            <CardBody className="bg-gray-100 relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-neutral-600"
                >
                    Hello i am : 
                </CardItem>
                {/* 使用 Flexbox 布局 */}
                <div className="flex justify-between items-start">
                    <CardItem
                        as="div"
                        translateZ="60"
                        // 添加 mt-4 类，根据需要调整数值
                        className="text-neutral-500 text-sm max-w-sm mt-6 w-1/2"
                    >
                        <MorphingTextHero /> 
                    </CardItem>
                </div>
                <CardItem
                    translateZ="100"
                    rotateX={20}
                    rotateZ={-10}
                    className="w-full mt-4"
                >
                    <Image
                        src="/myphotos/pic1.jpg"
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                        
                    />
                </CardItem>
                <div className="flex justify-between items-center mt-20">

                <div className="flex justify-start items-end -mb-10 -ml-10">
                    <div className="w-20 h-20 bg-orange-500 rounded-full"></div>
                </div>
                    <RainbowButton>查看资料</RainbowButton>
                </div>
            </CardBody>
        </CardContainer>
    );
};

export default ThreeDCardDemo;