"use client";

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

declare global {
  interface Window {
    particlesJS: any;
  }
}

interface ParticlesBackgroundProps {
  className?: string;
}

export function ParticlesBackground({ className }: ParticlesBackgroundProps) {
  const { theme } = useTheme();

  useEffect(() => {
    const initParticles = () => {
      const isDark = theme === 'dark';
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: isDark ? '#ffffff' : '#1a365d' },
          shape: { type: 'circle' },
          opacity: { value: isDark ? 0.5 : 0.7, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: isDark ? '#ffffff' : '#2a4365',
            opacity: isDark ? 0.4 : 0.6,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: isDark ? 1 : 0.8 } },
            push: { particles_nb: 4 }
          }
        },
        retina_detect: true
      });
    };

    const loadParticles = async () => {
      if (typeof window.particlesJS === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.async = true;
        script.onload = initParticles;
        document.body.appendChild(script);
      } else {
        initParticles();
      }
    };

    loadParticles();

    return () => {
      const particlesContainer = document.getElementById('particles-js');
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
      }
    };
  }, [theme]);

  return (
    <div className={cn(
      'fixed inset-0 w-full h-full',
      theme === 'dark' ? 'bg-[#0a192f]' : 'bg-[#f0f4f8]',
      className
    )}>
      <div id="particles-js" className="absolute inset-0" />
    </div>
  );
}