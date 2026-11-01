import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  pulse?: boolean;
  className?: string;
  variant?: 'emerald' | 'subtle' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  pulse = true,
  className,
  variant = 'emerald',
}) => {
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide backdrop-blur-md transition-all duration-300 select-none',
        variant === 'emerald' &&
          'bg-[#0d170f]/90 border border-[#00FC43]/35 text-[#dae6d3] shadow-[0_0_15px_rgba(0,252,67,0.18)]',
        variant === 'subtle' &&
          'bg-white/5 border border-white/10 text-neutral-300 hover:border-[#00FC43]/30',
        variant === 'outline' &&
          'border border-[#00FC43]/50 text-[#00FC43] bg-[#00FC43]/5',
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FC43] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FC43] shadow-[0_0_8px_#00FC43]"></span>
        </span>
      )}
      <span>{children}</span>
    </div>
  );
};
