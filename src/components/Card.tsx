import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, glow = true, className, ...props }) => {
  return (
    <div
      style={{
        background:
          'radial-gradient(circle at 8% 8%, rgba(0, 252, 67, 0.30) 0%, rgba(0, 252, 67, 0.10) 28%, transparent 58%), radial-gradient(circle at 92% 10%, rgba(255, 255, 255, 0.20) 0%, transparent 45%), radial-gradient(circle at 92% 92%, rgba(0, 210, 255, 0.12) 0%, transparent 55%), linear-gradient(145deg, rgba(14, 22, 17, 0.86) 0%, rgba(7, 12, 9, 0.92) 50%, rgba(3, 5, 4, 0.98) 100%)',
      }}
      className={clsx(
        'asymmetric-glass-card relative rounded-3xl p-7 sm:p-8 overflow-hidden transition-all duration-500 border border-white/10 hover:border-[#00FC43]/60 shadow-[0_20px_50px_rgba(0,0,0,0.92),inset_1.5px_1.5px_2px_rgba(255,255,255,0.45),inset_0_0_25px_rgba(0,252,67,0.18),inset_-1px_-1px_20px_rgba(0,210,255,0.06)] backdrop-blur-2xl',
        glow && 'hover:shadow-[0_30px_65px_rgba(0,0,0,0.96),0_0_45px_rgba(0,252,67,0.30)] hover:-translate-y-2',
        className
      )}
      {...props}
    >
      {/* 3-Sided Ambient Radial Light Layers */}
      <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-[#00FC43]/25 blur-[65px] pointer-events-none transition-all duration-500 group-hover:bg-[#00FC43]/38" />
      <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-white/15 blur-[55px] pointer-events-none" />
      <div className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-cyan-400/10 blur-[65px] pointer-events-none" />
      <div className="relative z-10 text-white">{children}</div>
    </div>
  );
};
