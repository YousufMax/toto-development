import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '@/lib/data';

interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, className }) => {
  return (
    <article
      className={clsx(
        'asymmetric-glass-card relative rounded-3xl p-7 sm:p-8 overflow-hidden flex flex-col justify-between min-h-[320px] group transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.92)] hover:-translate-y-2 backdrop-blur-2xl',
        className
      )}
    >
      {/* 3-Sided Ambient Radial Light Layers */}
      <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-[#00FC43]/28 blur-[65px] pointer-events-none group-hover:bg-[#00FC43]/40 transition-all duration-500" />
      <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-white/15 blur-[55px] pointer-events-none" />
      <div className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-cyan-400/10 blur-[65px] pointer-events-none" />

      {/* Decorative 3D geometric isometric svg watermark */}
      <div className="absolute right-2 top-8 w-44 h-44 pointer-events-none opacity-25 group-hover:opacity-40 transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 160 160" fill="none">
          <polygon
            points="80,20 140,55 140,115 80,150 20,115 20,55"
            stroke="#00FC43"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-spin-slow"
          />
          <polygon
            points="80,35 125,60 125,110 80,135 35,110 35,60"
            fill="url(#cardGrad)"
            stroke="#00FC43"
            strokeWidth="2"
            opacity="0.8"
          />
          <circle cx="80" cy="85" r="14" fill="#00FC43" fillOpacity="0.3" stroke="#00FC43" strokeWidth="1.5" />
          <circle cx="80" cy="85" r="5" fill="#ffffff" />
          <defs>
            <linearGradient id="cardGrad" x1="35" y1="35" x2="125" y2="135" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00FC43" stopOpacity="0.4" />
              <stop offset="1" stopColor="#051208" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-[85%]">
        {/* Eyebrow Number & Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#00FC43]/30 mb-5 text-[11px] font-mono text-[#00FC43]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] animate-pulse" />
          <span>
            {service.number} / {service.categoryTag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-[#00FC43] transition-colors duration-300">
          {service.title}
        </h3>

        {/* Short description (Crisp White High-Contrast Typography) */}
        <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-normal">
          {service.shortDesc}
        </p>

        {service.metrics && service.metrics.length > 0 && (
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/10">
            {service.metrics.map((m, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-sm font-bold text-[#00FC43]">{m.value}</span>
                <span className="text-[10px] text-white/80 font-medium uppercase tracking-wider">{m.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tag pills */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mt-8 pt-4 border-t border-white/10">
        <div className="flex flex-wrap gap-2 text-[11px]">
          {service.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="bg-black/60 border border-white/15 px-3 py-1 rounded-full text-white font-medium group-hover:border-[#00FC43]/60 transition-all shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/services/#${service.id}`}
          className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-neutral-300 group-hover:border-[#00FC43] group-hover:text-[#00FC43] group-hover:bg-[#00FC43]/10 transition-all shrink-0"
          aria-label={`View details for ${service.title}`}
        >
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
};
