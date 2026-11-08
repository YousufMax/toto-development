'use client';

import React from 'react';
import Image from 'next/image';

interface HeroEarthGlobeProps {
  className?: string;
}

export const HeroEarthGlobe: React.FC<HeroEarthGlobeProps> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-x-0 bottom-0 top-0 overflow-hidden flex flex-col items-center justify-end -z-10 ${className}`}
    >
      {/* ========================================================================= */}
      {/* 01. GRAND AMBIENT PLANETARY CORONA & SPACE HORIZON BLOOM                   */}
      {/* ========================================================================= */}
      {/* Soft emerald & sapphire space horizon ambient bloom radiating behind the planet crest */}
      <div className="absolute bottom-[4%] sm:bottom-[6%] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1300px] h-[220px] xs:h-[280px] sm:h-[450px] md:h-[550px] rounded-full bg-gradient-to-t from-[#00FC43]/20 via-[#0284c7]/15 to-transparent blur-[60px] sm:blur-[110px] pointer-events-none animate-pulse-glow" />

      {/* ========================================================================= */}
      {/* 02. CLEAN, MAJESTIC HALF-EARTH HORIZON (PURE PLANETARY VISUAL)            */}
      {/* ========================================================================= */}
      <div className="relative w-[540px] h-[540px] xs:w-[620px] xs:h-[620px] sm:w-[950px] sm:h-[950px] md:w-[1350px] md:h-[1350px] lg:w-[1550px] lg:h-[1550px] xl:w-[1750px] xl:h-[1750px] translate-y-[44%] xs:translate-y-[46%] sm:translate-y-[54%] md:translate-y-[58%] flex items-center justify-center shrink-0">
        
        {/* Single Spherical Planet Container - True Circle with Duotone Atmospheric Glow */}
        <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center shadow-[0_-20px_50px_rgba(0,252,67,0.4),0_-40px_90px_rgba(2,132,199,0.22),inset_0_25px_60px_rgba(0,252,67,0.4)] border-t-2 border-t-[#00FC43]/70 border-x border-x-[#00FC43]/25 border-b-transparent">
          
          {/* Pure Earth Asset with Screen Blending & Soft Radial Feather */}
          <div className="w-full h-full flex items-center justify-center animate-spin-globe transform-gpu will-change-transform">
            <Image
              src="/images/earth-globe.webp"
              alt="3D Cybernetic Planetary Earth Horizon"
              width={1024}
              height={1024}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
              className="w-full h-full object-contain select-none pointer-events-none mix-blend-screen brightness-120 contrast-125 saturate-130 drop-shadow-[0_0_65px_rgba(0,252,67,0.6)]"
              style={{
                maskImage:
                  'radial-gradient(circle at 50% 50%, black 64%, rgba(0, 0, 0, 0.75) 67%, transparent 70%)',
                WebkitMaskImage:
                  'radial-gradient(circle at 50% 50%, black 64%, rgba(0, 0, 0, 0.75) 67%, transparent 70%)',
              }}
            />
          </div>

          {/* Luminous Atmospheric Horizon Crest Light */}
          <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_35px_80px_rgba(0,252,67,0.5)]" />
        </div>
      </div>

      {/* Silky bottom transition gradient into the statistics section */}
      <div className="absolute bottom-0 inset-x-0 h-20 sm:h-32 bg-gradient-to-t from-[#050705] via-[#050705]/80 to-transparent pointer-events-none z-10" />
    </div>
  );
};
