'use client';

import React from 'react';

export const AtmosphericBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none bg-[#030504] transform-gpu will-change-transform"
      style={{ contain: 'paint layout' }}
    >
      {/* ========================================================================= */}
      {/* 01. FULL-VIEWPORT MULTI-TONE COSMIC MESH AURORA GRADIENT OVERLAY          */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(0, 252, 67, 0.18) 0px, transparent 50%),
            radial-gradient(at 100% 10%, rgba(14, 165, 233, 0.16) 0px, transparent 52%),
            radial-gradient(at 15% 45%, rgba(0, 252, 67, 0.12) 0px, transparent 48%),
            radial-gradient(at 88% 55%, rgba(99, 102, 241, 0.14) 0px, transparent 50%),
            radial-gradient(at 5% 85%, rgba(16, 185, 129, 0.18) 0px, transparent 52%),
            radial-gradient(at 95% 95%, rgba(0, 229, 255, 0.14) 0px, transparent 55%)
          `,
        }}
      />

      {/* ========================================================================= */}
      {/* 02. ASYMMETRICAL MULTI-POINT AMBIENT RADIAL GLOWS (BALANCED COSMIC AURORA) */}
      {/* ========================================================================= */}
      {/* Corner 1: Top-Left Screen Aurora (Deep Emerald + Hyper Green) */}
      <div className="absolute -top-40 -left-40 w-[380px] h-[380px] md:w-[850px] md:h-[850px] rounded-full bg-[#0a3d1c]/35 blur-[80px] md:blur-[160px] pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-[260px] h-[260px] md:w-[550px] md:h-[550px] rounded-full bg-[#00FC43]/18 blur-[60px] md:blur-[130px] pointer-events-none animate-pulse-glow" />

      {/* Corner 2: Top-Right Screen Ambient Light (Deep Sapphire & Electric Sky Blue) */}
      <div className="absolute top-[2%] -right-40 w-[360px] h-[360px] md:w-[800px] md:h-[800px] rounded-full bg-[#0284c7]/15 blur-[80px] md:blur-[160px] pointer-events-none animate-float-slow" />
      <div className="absolute top-[8%] -right-20 w-[220px] h-[220px] md:w-[450px] md:h-[450px] rounded-full bg-[#0ea5e9]/12 blur-[60px] md:blur-[120px] pointer-events-none" />

      {/* Point 3: Mid-Left Screen Aurora Wave (Organic Forest Jade) */}
      <div className="absolute top-[36%] -left-64 w-[360px] h-[360px] md:w-[800px] md:h-[800px] rounded-full bg-[#082c16]/45 blur-[80px] md:blur-[170px] pointer-events-none animate-glow-drift" />

      {/* Point 4: Mid-Right Screen Luminous Spotlight (Subtle Cosmic Indigo & Cyan) */}
      <div className="absolute top-[52%] -right-48 w-[340px] h-[340px] md:w-[750px] md:h-[750px] rounded-full bg-[#6366f1]/12 blur-[80px] md:blur-[170px] pointer-events-none animate-float-reverse" />
      <div className="absolute top-[58%] -right-24 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-[#00FC43]/14 blur-[60px] md:blur-[130px] pointer-events-none" />

      {/* Corner 5: Bottom-Left Screen Aurora Well (Mint & Emerald) */}
      <div className="absolute top-[78%] -left-48 w-[340px] h-[340px] md:w-[750px] md:h-[750px] rounded-full bg-[#10b981]/18 blur-[80px] md:blur-[160px] pointer-events-none animate-pulse-glow" />

      {/* Corner 6: Bottom-Right Screen Deep Oceanic Void */}
      <div className="absolute top-[86%] -right-48 w-[400px] h-[400px] md:w-[900px] md:h-[900px] rounded-full bg-[#08283a]/30 blur-[90px] md:blur-[180px] pointer-events-none animate-float-slow" />

      {/* ========================================================================= */}
      {/* 03. ARCHITECTURAL CYBER GRID TEXTURE (SUBTLE LUXURY DEPTH)                 */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 opacity-[0.028] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00FC43 1px, transparent 1px), linear-gradient(90deg, #00FC43 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
};
