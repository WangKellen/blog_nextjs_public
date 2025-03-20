import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface BodyMapProps {
  onSelectBodyPart: (part: string) => void;
  selectedParts: string[];
}

const bodyPartNames: { [key: string]: string } = {
  'head': '头部',
  'torso': '躯干',
  'left-arm': '左臂',
  'right-arm': '右臂',
  'left-leg': '左腿',
  'right-leg': '右腿',
  'left-foot': '左脚',
  'right-foot': '右脚'
};

const BodyMap: React.FC<BodyMapProps> = ({ onSelectBodyPart, selectedParts }) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const handlePartClick = (part: string) => {
    onSelectBodyPart(part);
  };

  const handlePartHover = (part: string | null) => {
    setHoveredPart(part);
  };

  const getPartStyle = (part: string) => {
    const isSelected = selectedParts.includes(part);
    const isHovered = hoveredPart === part;
    
    return cn(
      'transition-colors duration-200 cursor-pointer',
      isSelected ? 'fill-orange-500' : 'fill-gray-400 dark:fill-gray-600',
      isHovered && !isSelected ? 'fill-orange-400' : '',
      'hover:fill-orange-400'
    );
  };

  return (
    <svg
      viewBox="0 0 200 400"
      className="w-full h-full"
      style={{ maxHeight: '300px' }}
    >
      {/* 头部 */}
      <circle
        cx="100"
        cy="40"
        r="30"
        className={getPartStyle('head')}
        onClick={() => handlePartClick('head')}
        onMouseEnter={() => handlePartHover('head')}
        onMouseLeave={() => handlePartHover(null)}
      />

      {/* 躯干 */}
      <rect
        x="70"
        y="80"
        width="60"
        height="100"
        className={getPartStyle('torso')}
        onClick={() => handlePartClick('torso')}
        onMouseEnter={() => handlePartHover('torso')}
        onMouseLeave={() => handlePartHover(null)}
      />

      {/* 左臂 */}
      <rect
        x="40"
        y="80"
        width="20"
        height="80"
        className={getPartStyle('left-arm')}
        onClick={() => handlePartClick('left-arm')}
        onMouseEnter={() => handlePartHover('left-arm')}
        onMouseLeave={() => handlePartHover(null)}
      />

      {/* 右臂 */}
      <rect
        x="140"
        y="80"
        width="20"
        height="80"
        className={getPartStyle('right-arm')}
        onClick={() => handlePartClick('right-arm')}
        onMouseEnter={() => handlePartHover('right-arm')}
        onMouseLeave={() => handlePartHover(null)}
      />

      {/* 左腿 */}
      <rect
        x="70"
        y="190"
        width="25"
        height="100"
        className={getPartStyle('left-leg')}
        onClick={() => handlePartClick('left-leg')}
        onMouseEnter={() => handlePartHover('left-leg')}
        onMouseLeave={() => handlePartHover(null)}
      />

      {/* 右腿 */}
      <rect
        x="105"
        y="190"
        width="25"
        height="100"
        className={getPartStyle('right-leg')}
        onClick={() => handlePartClick('right-leg')}
        onMouseEnter={() => handlePartHover('right-leg')}
        onMouseLeave={() => handlePartHover(null)}
      />

      {/* 左脚 */}
      <rect
        x="70"
        y="300"
        width="25"
        height="20"
        className={getPartStyle('left-foot')}
        onClick={() => handlePartClick('left-foot')}
        onMouseEnter={() => handlePartHover('left-foot')}
        onMouseLeave={() => handlePartHover(null)}
      />

      {/* 右脚 */}
      <rect
        x="105"
        y="300"
        width="25"
        height="20"
        className={getPartStyle('right-foot')}
        onClick={() => handlePartClick('right-foot')}
        onMouseEnter={() => handlePartHover('right-foot')}
        onMouseLeave={() => handlePartHover(null)}
      />
    </svg>
  );
};

export { bodyPartNames };
export default BodyMap;