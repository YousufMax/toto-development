'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '@/lib/data';

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, className }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={clsx('space-y-4 max-w-4xl mx-auto', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.id}
            style={{
              background: isOpen
                ? 'radial-gradient(circle at 8% 20%, rgba(0, 252, 67, 0.22) 0%, rgba(14, 52, 26, 0.30) 32%, rgba(10, 16, 12, 0.90) 65%, rgba(4, 7, 5, 0.98) 100%)'
                : 'radial-gradient(circle at 6% 15%, rgba(0, 252, 67, 0.08) 0%, rgba(9, 14, 11, 0.88) 45%, rgba(4, 7, 5, 0.96) 100%)',
            }}
            className={clsx(
              'relative rounded-2xl transition-all duration-300 border overflow-hidden backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.7)]',
              isOpen
                ? 'border-[#00FC43]/50 shadow-[0_0_35px_rgba(0,252,67,0.18)]'
                : 'border-white/10 hover:border-[#00FC43]/30 hover:shadow-[0_0_20px_rgba(0,252,67,0.1)]'
            )}
          >
            {/* Ambient Radial Bloom Spotlight inside open FAQ item */}
            {isOpen && (
              <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full bg-[#00FC43]/16 blur-[60px] pointer-events-none" />
            )}
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-base sm:text-lg text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[#00FC43]/70">
                  {String(index + 1).padStart(2, '0')}.
                </span>
                {item.question}
              </span>
              <span
                className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300',
                  isOpen
                    ? 'border-[#00FC43] bg-[#00FC43]/15 text-[#00FC43] rotate-180'
                    : 'border-white/10 bg-white/5 text-neutral-400 group-hover:text-white'
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            <div
              className={clsx(
                'grid transition-all duration-300 ease-in-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal border-t border-white/5 pt-4">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
