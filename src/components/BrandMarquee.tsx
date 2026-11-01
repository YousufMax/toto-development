'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface BrandItem {
  id: string;
  name: string;
  logo: string;
  alt: string;
  opticalClass: string;
  renderFullName?: boolean;
}

export const CURATED_BANGLADESH_BRANDS: BrandItem[] = [
  {
    id: 'grameenphone',
    name: 'Grameenphone',
    logo: '/brands/grameenphone.svg',
    alt: 'Grameenphone',
    opticalClass: 'h-6 sm:h-7 w-auto',
    renderFullName: true,
  },
  {
    id: 'bkash',
    name: 'bKash',
    logo: '/brands/bkash.svg',
    alt: 'bKash',
    opticalClass: 'h-6 sm:h-7 w-auto max-w-[105px]',
  },
  {
    id: 'robi',
    name: 'Robi',
    logo: '/brands/robi.svg',
    alt: 'Robi Axiata',
    opticalClass: 'h-6 sm:h-7 w-auto max-w-[80px]',
  },
  {
    id: 'walton',
    name: 'Walton',
    logo: '/brands/walton.svg',
    alt: 'Walton',
    opticalClass: 'h-5 sm:h-6 w-auto max-w-[110px]',
  },
  {
    id: 'airtel',
    name: 'Airtel Bangladesh',
    logo: '/brands/airtel.svg',
    alt: 'Airtel',
    opticalClass: 'h-6 sm:h-7 w-auto max-w-[85px]',
  },
  {
    id: 'square',
    name: 'Square Group',
    logo: '/brands/square.svg',
    alt: 'Square Group',
    opticalClass: 'h-6 sm:h-7 w-auto max-w-[85px]',
  },
  {
    id: 'daraz',
    name: 'Daraz',
    logo: '/brands/daraz.png',
    alt: 'Daraz',
    opticalClass: 'h-5 sm:h-6 w-auto max-w-[100px]',
  },
  {
    id: 'bashundhara',
    name: 'Bashundhara Group',
    logo: '/brands/bashundhara.svg',
    alt: 'Bashundhara Group',
    opticalClass: 'h-5 sm:h-5.5 w-auto max-w-[130px]',
  },
  {
    id: 'unilever',
    name: 'Unilever Bangladesh',
    logo: '/brands/unilever.svg',
    alt: 'Unilever Bangladesh',
    opticalClass: 'h-5 sm:h-5.5 w-auto max-w-[110px]',
  },
  {
    id: 'rokomari',
    name: 'Rokomari',
    logo: '/brands/rokomari.svg',
    alt: 'Rokomari',
    opticalClass: 'h-6 sm:h-7 w-auto max-w-[105px]',
  },
];

interface BrandMarqueeProps {
  className?: string;
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ className }) => {
  // Duplicate for seamless 100% infinite continuous loop
  const duplicatedBrands = [
    ...CURATED_BANGLADESH_BRANDS,
    ...CURATED_BANGLADESH_BRANDS,
    ...CURATED_BANGLADESH_BRANDS,
  ];

  return (
    <section
      aria-label="Brands Shaping Bangladesh & Beyond"
      className={clsx(
        'relative bg-white py-6 sm:py-8 overflow-hidden border-y border-neutral-200/85 z-20 select-none shadow-[0_8px_25px_rgba(0,0,0,0.1)]',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-5 text-center relative z-10">
        {/* Section Heading */}
        <h2 className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-neutral-400 font-semibold">
          Brands Shaping Bangladesh & Beyond
        </h2>
      </div>

      {/* Marquee Viewport with White Edge Gradient Fades */}
      <div className="relative w-full overflow-hidden">
        {/* Left Edge Subtle Fade */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-white via-white/85 to-transparent z-20 pointer-events-none" />

        {/* Right Edge Subtle Fade */}
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-white via-white/85 to-transparent z-20 pointer-events-none" />

        {/* Infinite Scrolling Track (NO BRAND BOXES, CLEAN LOGOS DIRECTLY ON WHITE) */}
        <div
          className="brand-marquee-track flex items-center gap-10 sm:gap-14 md:gap-18 lg:gap-20 py-1.5"
          style={{
            animation: 'brandMarqueeScroll 30s linear infinite',
          }}
        >
          {duplicatedBrands.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center shrink-0 hover:scale-105 transition-transform duration-300 cursor-default"
            >
              {brand.renderFullName ? (
                <div className="flex items-center gap-2 sm:gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logo}
                    alt={brand.alt}
                    className={clsx(
                      'object-contain pointer-events-none',
                      brand.opticalClass
                    )}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#002f6c] tracking-tight whitespace-nowrap">
                    Grameenphone
                  </span>
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={brand.logo}
                  alt={brand.alt}
                  className={clsx(
                    'object-contain pointer-events-none filter brightness-100',
                    brand.opticalClass
                  )}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};