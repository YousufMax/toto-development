'use client';

import React from 'react';
import { clsx } from 'clsx';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/Badge';

export interface WorkflowStep {
  step: string;
  title: string;
  bengaliTitle: string;
  description: string;
  icon: LucideIcon;
  duration?: string;
}

interface ServiceWorkflowProps {
  badgeText?: string;
  headingPrefix?: string;
  headingHighlight?: string;
  subheading?: string;
  steps: WorkflowStep[];
  className?: string;
}

export const ServiceWorkflow: React.FC<ServiceWorkflowProps> = ({
  badgeText = 'HOW WE WORK · 4 SPRINT PHASES',
  headingPrefix = 'Engineered for Clarity &',
  headingHighlight = 'Guaranteed Speed',
  subheading = 'From initial strategic briefing to commercial deployment, our disciplined workflow eliminates guesswork and delivers quantifiable milestones.',
  steps,
  className,
}) => {
  return (
    <section className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 relative', className)}>
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <Badge variant="emerald">{badgeText}</Badge>
        <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight leading-tight">
          {headingPrefix} <span className="italic text-[#00FC43]">{headingHighlight}</span>
        </h2>
        <p className="text-neutral-300 text-sm sm:text-base mt-4 leading-relaxed font-light max-w-2xl mx-auto">
          {subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              style={{
                background:
                  'radial-gradient(circle at 15% 15%, rgba(0, 252, 67, 0.18) 0%, rgba(14, 52, 25, 0.28) 30%, rgba(10, 16, 12, 0.95) 65%, rgba(4, 7, 5, 0.99) 100%)',
              }}
              className="p-7 rounded-3xl relative overflow-hidden border border-[#00FC43]/20 hover:border-[#00FC43]/70 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(0,252,67,0.25)] group flex flex-col justify-between backdrop-blur-xl"
            >
              {/* Subtle Ambient Radial Bloom inside card */}
              <div className="absolute -top-16 -left-16 w-52 h-52 rounded-full bg-[#00FC43]/14 blur-[65px] pointer-events-none group-hover:bg-[#00FC43]/25 transition-all duration-500" />

              <div className="relative z-10">
                {/* Step Index & Duration */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43] group-hover:scale-110 group-hover:bg-[#00FC43] group-hover:text-[#041608] transition-all duration-300 shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00FC43] tracking-widest px-2.5 py-1 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/25">
                    {item.step}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1 group-hover:text-[#00FC43] transition-colors">
                  {item.title}
                </h3>
                <h4 className="text-xs font-semibold text-[#00FC43] font-mono mb-3">
                  {item.bengaliTitle}
                </h4>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {item.duration && (
                <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Timeline:</span>
                  <span className="text-white font-semibold">{item.duration}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
