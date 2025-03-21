import { cn } from "@/lib/utils";
import React from "react";

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
  pathOpacity?: number; 
  pathDasharray?: string; 
  pathColor?: string; // 路径颜色
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 100,
  speed = 1,
  pathOpacity = 1, // 默认透明度为 1
  pathDasharray = "", // 默认无虚线
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/30 stroke-[2] dark:stroke-white/80"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            style={{ opacity: pathOpacity }} 
            // 设置虚线样式
            strokeDasharray={pathDasharray} 
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
              } as React.CSSProperties
            }
            className={cn(
              `absolute flex  transform-gpu animate-orbit items-center justify-center rounded-full`,
              { "[animation-direction:reverse]": reverse },
              className,
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
