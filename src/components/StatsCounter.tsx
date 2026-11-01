'use client';

import React, { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { gsap } from '@/lib/gsap';

interface StatsCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  tag?: string;
  className?: string;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  label,
  sublabel,
  tag,
  className,
}) => {
  const numberRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!numberRef.current) return;

    const targetEl = numberRef.current;
    const obj = { val: 0 };

    const tl = gsap.to(obj, {
      val: value,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: containerRef.current ? { trigger: containerRef.current } : undefined,
      onUpdate: () => {
        if (targetEl) {
          // If value is a float like 99.4
          const formatted = Number.isInteger(value)
            ? Math.round(obj.val)
            : obj.val.toFixed(1);
          targetEl.innerText = `${prefix}${formatted}${suffix}`;
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, [value, suffix, prefix]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'px-6 py-6 group transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-center',
        className
      )}
    >
      <div className="editorial-serif text-5xl sm:text-6xl md:text-7xl font-normal text-[#00FC43] tracking-tight drop-shadow-[0_0_15px_rgba(0,252,67,0.45)] transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_28px_rgba(0,252,67,0.7)]">
        <span ref={numberRef}>
          {prefix}
          {value}
          {suffix}
        </span>
      </div>
      <p className="text-neutral-300 text-xs sm:text-sm mt-3 font-normal group-hover:text-white transition-colors leading-snug">
        <span className="font-semibold text-white block">{label}</span>
        {sublabel && <span className="text-neutral-400">{sublabel}</span>}
      </p>
      {tag && (
        <span className="inline-block mt-2.5 text-[10px] uppercase font-mono tracking-widest text-[#00FC43]/80 opacity-60 group-hover:opacity-100 transition-opacity">
          {tag}
        </span>
      )}
    </div>
  );
};
