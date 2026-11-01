'use client';

import React from 'react';
import { clsx } from 'clsx';
import { LucideIcon, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/Badge';

export interface GuaranteeItem {
  icon: LucideIcon;
  title: string;
  bengaliTitle: string;
  description: string;
  highlightTag?: string;
}

interface ServiceGuaranteesProps {
  badgeText?: string;
  headingPrefix?: string;
  headingHighlight?: string;
  subheading?: string;
  guarantees: GuaranteeItem[];
  className?: string;
}

export const ServiceGuarantees: React.FC<ServiceGuaranteesProps> = ({
  badgeText = 'IRONCLAD CRAFTSMANSHIP COMMITMENT',
  headingPrefix = 'Risk-Free Standards &',
  headingHighlight = 'Client Guarantees',
  subheading = 'We eliminate risk and protect your investment with legally binding deliverables, source ownership, and transparent quality standards.',
  guarantees,
  className,
}) => {
  return (
    <section className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 relative', className)}>
      <div className="text-center mb-14 max-w-3xl mx-auto">
        <Badge variant="emerald">{badgeText}</Badge>
        <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight leading-tight">
          {headingPrefix} <span className="italic text-[#00FC43]">{headingHighlight}</span>
        </h2>
        <p className="text-neutral-300 text-sm sm:text-base mt-4 leading-relaxed font-light max-w-2xl mx-auto">
          {subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {guarantees.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              style={{
                background:
                  'radial-gradient(circle at 12% 15%, rgba(0, 252, 67, 0.16) 0%, rgba(12, 44, 22, 0.25) 35%, rgba(9, 15, 11, 0.94) 65%, rgba(4, 7, 5, 0.98) 100%)',
              }}
              className="p-6 sm:p-7 rounded-3xl border border-[#00FC43]/25 hover:border-[#00FC43]/60 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(0,252,67,0.22)] flex flex-col justify-between group backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43] group-hover:scale-110 group-hover:bg-[#00FC43] group-hover:text-[#041608] transition-all duration-300 shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  {item.highlightTag && (
                    <span className="text-[10px] font-mono text-[#00FC43] bg-[#00FC43]/10 border border-[#00FC43]/30 px-2.5 py-0.5 rounded-full font-semibold">
                      {item.highlightTag}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-0.5 group-hover:text-[#00FC43] transition-colors">
                  {item.title}
                </h3>
                <h4 className="text-xs font-semibold text-[#00FC43] font-mono mb-3">
                  {item.bengaliTitle}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00FC43]" />
                <span className="text-neutral-300">Guaranteed Deliverable</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Physical Office Verification Banner */}
      <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#060a07] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00FC43]/15 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43] shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Registered Physical Headquarters</span>
            <span className="text-[11px] sm:text-xs text-neutral-400 font-mono">
              256 Upper Road, Mou Market 3rd Floor, Sonadanga, Khulna - 9000
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#00FC43] bg-[#00FC43]/10 border border-[#00FC43]/20 px-3 py-1.5 rounded-full shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>In-Person Consultations Available</span>
        </div>
      </div>
    </section>
  );
};
