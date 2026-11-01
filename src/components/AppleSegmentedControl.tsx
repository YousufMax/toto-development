'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export interface AppleSegmentOption<T extends string> {
  id: T;
  label: string;
  shortLabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  price?: string;
}

interface AppleSegmentedControlProps<T extends string> {
  options: AppleSegmentOption<T>[];
  activeId: T;
  onChange: (id: T) => void;
  layoutId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AppleSegmentedControl<T extends string>({
  options,
  activeId,
  onChange,
  layoutId,
  className,
  size = 'md',
}: AppleSegmentedControlProps<T>) {
  return (
    <div
      className={clsx(
        'relative p-1 sm:p-1.5 rounded-full bg-[#060a08]/90 border border-white/12 shadow-[0_15px_40px_rgba(0,0,0,0.88),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-2xl inline-flex flex-wrap sm:flex-nowrap items-center justify-center gap-1 max-w-full select-none',
        className
      )}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = activeId === opt.id;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={clsx(
              'relative py-2 sm:py-2.5 px-3 sm:px-4 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 outline-none group active:scale-[0.98] whitespace-nowrap',
              size === 'sm' && 'py-1.5 sm:py-2 px-2.5 sm:px-3 text-xs',
              size === 'lg' && 'py-2.5 sm:py-3 px-4 sm:px-6 text-sm'
            )}
          >
            {/* Sliding Spring Active Thumb */}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 35,
                  mass: 0.8,
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-b from-[#112a1b] via-[#09170e] to-[#040805] border border-[#00FC43]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_8px_20px_rgba(0,0,0,0.7),0_0_20px_rgba(0,252,67,0.3)] z-0"
              >
                <span className="absolute bottom-1 inset-x-4 sm:inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#00FC43] to-transparent rounded-full pointer-events-none" />
              </motion.div>
            )}

            {/* Apple Micro Squircle Icon */}
            {Icon && (
              <div
                className={clsx(
                  'relative z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105',
                  isActive
                    ? 'bg-[#00FC43]/20 text-[#00FC43] border border-[#00FC43]/50 shadow-[0_0_10px_rgba(0,252,67,0.4)]'
                    : 'bg-white/5 text-neutral-400 border border-white/5 group-hover:text-white group-hover:bg-white/10'
                )}
              >
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            )}

            {/* Label */}
            <span
              className={clsx(
                'relative z-10 font-bold tracking-tight text-xs sm:text-sm transition-colors duration-200',
                isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
              )}
            >
              <span className="sm:hidden">{opt.shortLabel || opt.label}</span>
              <span className="hidden sm:inline">{opt.label}</span>
            </span>

            {/* Price Pill (if provided) */}
            {opt.price && (
              <span
                className={clsx(
                  'relative z-10 text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full transition-all duration-200',
                  isActive
                    ? 'bg-[#00FC43] text-[#041608] shadow-[0_0_8px_rgba(0,252,67,0.4)]'
                    : 'bg-white/5 text-neutral-400 group-hover:bg-white/10 group-hover:text-white'
                )}
              >
                {opt.price}
              </span>
            )}

            {/* Badge Tag (if provided) */}
            {opt.badge && (
              <span
                className={clsx(
                  'relative z-10 text-[9px] font-mono px-1.5 py-0.5 rounded-full border',
                  isActive
                    ? 'bg-[#00FC43]/15 text-[#00FC43] border-[#00FC43]/30'
                    : 'bg-white/5 text-neutral-400 border-white/10'
                )}
              >
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
