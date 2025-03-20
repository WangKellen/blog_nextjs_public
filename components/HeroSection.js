// HeroSection.js
import Image from "next/image";
import ThreeDCardDemo from "./ThreeDCardDemo";
import { OrbitingCirclesDemo } from "./HeroCircle";
import { cn } from '@/lib/utils';
import { DotPattern } from '../components/magicui/dot-pattern';
export function DotPatternDemo() {
    return (
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
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

const HeroSection = () => {
    return (
        <section className="relative h-screen ">
            <div className="container mx-auto h-full flex justify-center items-center text-gray-800 dark:text-gray-100 z-10 relative">
                <div className="relative w-full h-full flex justify-center items-center overflow-visible">
                    <div style={{ 
                        transform: 'scale(2) translateY(-7.5%)', 
                        zIndex: 1, 
                        width: '50%', 
                        height: '50%' 
                    }}>
                        <OrbitingCirclesDemo />
                    </div>
                    <div style={{ position: 'absolute', zIndex: 2 }}>
                        <ThreeDCardDemo />
                    </div>
                </div>
            </div>
        </section>
    );
};




export default HeroSection;