'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Palette, Film } from 'lucide-react';
import { clsx } from 'clsx';

export type PricingTabId = 'combo' | 'graphic-design' | 'business-ads';

interface ApplePricingTabsProps {
  activeTab: PricingTabId;
  onChange: (tab: PricingTabId) => void;
}

const TABS = [
  {
    id: 'combo' as const,
    label: 'Combos',
    fullLabel: 'Design & Video Combos',
    price: '৳৯,৯৯৯+',
    badge: 'Best Value',
    icon: Sparkles,
    headline: 'রুপালীকা • সোনালীকা • অগ্রযাত্রা',
    bengaliDesc: 'গ্রাফিক ডিজাইন ও সিনেমাটিক রিলস অল-ইন-ওয়ান প্যাকেজ',
    tag: 'সর্বাধিক সাশ্রয়ী রিটেইনার',
  },
  {
    id: 'graphic-design' as const,
    label: 'Design',
    fullLabel: 'Creative Design',
    price: '৳২,০৯৯+',
    badge: 'Popular',
    icon: Palette,
    headline: 'তুলি • নকশা • আভিজাত্য',
    bengaliDesc: '১৫–৩০টি প্রিমিয়াম সোশ্যাল মিডিয়া পোস্ট ও ব্র্যান্ডিং',
    tag: '১০০% হিউম্যান ক্রাফটেড',
  },
  {
    id: 'business-ads' as const,
    label: 'Ads',
    fullLabel: 'Commercial Ads',
    price: '৳৬,০০০+',
    badge: '20% OFF',
    icon: Film,
    headline: 'প্রত্যয় • আস্থা • গৌরব',
    bengaliDesc: '৩–১০টি কাস্টম মোশন ভিডিও ও হাই-কনভার্শন রিলস',
    tag: '২০% ডিসকাউন্ট সচল',
  },
];

export function ApplePricingTabs({ activeTab, onChange }: ApplePricingTabsProps) {
  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <div className="max-w-3xl mx-auto mb-10 sm:mb-14 px-2 w-full">
      {/* ========================================================================= */}
      {/* 01. APPLE VISIONOS FLOATING SEGMENTED CAPSULE                             */}
      {/* ========================================================================= */}
      <div className="relative p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#060a08]/90 border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.92),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-2xl w-full">
        <div className="grid grid-cols-3 gap-1 relative w-full">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                className="relative py-2 sm:py-3 px-1 sm:px-4 rounded-xl sm:rounded-full flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 cursor-pointer text-center select-none transition-all duration-200 outline-none group active:scale-[0.98] min-w-0"
              >
                {/* Smooth Sliding Active Thumb (Apple Liquid Tab Spring Physics) */}
                {isActive && (
                  <motion.div
                    layoutId="apple-pricing-active-pill"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 35,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 rounded-xl sm:rounded-full bg-gradient-to-b from-[#112a1b] via-[#09170e] to-[#040805] border border-[#00FC43]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_25px_rgba(0,0,0,0.7),0_0_25px_rgba(0,252,67,0.3)] z-0"
                  >
                    {/* Apple Subtle Bottom Glow Accent */}
                    <span className="absolute bottom-1 inset-x-4 sm:inset-x-10 h-[2px] bg-gradient-to-r from-transparent via-[#00FC43] to-transparent rounded-full pointer-events-none" />
                  </motion.div>
                )}

                {/* Tab Icon and Label */}
                <div className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 min-w-0">
                  <div
                    className={clsx(
                      'w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105',
                      isActive
                        ? 'bg-[#00FC43]/20 text-[#00FC43] border border-[#00FC43]/50 shadow-[0_0_12px_rgba(0,252,67,0.4)]'
                        : 'bg-white/5 text-neutral-400 border border-white/5 group-hover:text-white group-hover:bg-white/10'
                    )}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>

                  <span
                    className={clsx(
                      'text-xs sm:text-xs md:text-sm font-bold tracking-tight transition-colors duration-200 whitespace-nowrap',
                      isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                    )}
                  >
                    <span className="sm:hidden">{tab.label}</span>
                    <span className="hidden sm:inline md:hidden">{tab.label}</span>
                    <span className="hidden md:inline">{tab.fullLabel}</span>
                  </span>
                </div>

                {/* Apple Micro-Price Capsule */}
                <span
                  className={clsx(
                    'relative z-10 text-[9px] sm:text-[11px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full transition-all duration-200 whitespace-nowrap shrink-0',
                    isActive
                      ? 'bg-[#00FC43] text-[#041608] shadow-[0_0_12px_rgba(0,252,67,0.5)]'
                      : 'bg-white/5 text-neutral-400 group-hover:bg-white/10 group-hover:text-white'
                  )}
                >
                  {tab.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 02. APPLE DYNAMIC ISLAND CONTEXTUAL BANNER (ZERO-OVERFLOW ARCHITECTURE)   */}
      {/* ========================================================================= */}
      <div className="mt-3.5 sm:mt-4 w-full max-w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full max-w-full px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl sm:rounded-full bg-[#060a08]/95 border border-[#00FC43]/30 backdrop-blur-2xl shadow-[0_12px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(0,252,67,0.1)] flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-center sm:text-left overflow-hidden"
          >
            {/* Left Contextual Text */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 min-w-0 w-full sm:w-auto text-center sm:text-left">
              <div className="inline-flex items-center justify-center sm:justify-start gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43] animate-pulse shrink-0" />
                <strong className="text-white font-bold text-xs sm:text-sm tracking-tight whitespace-normal sm:whitespace-nowrap">
                  {currentTab.headline}
                </strong>
              </div>
              <span className="hidden sm:inline text-neutral-500 font-bold">•</span>
              <p className="text-[11px] sm:text-xs md:text-sm text-neutral-300 font-normal leading-relaxed break-words">
                {currentTab.bengaliDesc}
              </p>
            </div>

            {/* Right Tag Pill */}
            <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/35 text-[10px] sm:text-[11px] font-mono font-bold whitespace-nowrap shadow-[0_0_12px_rgba(0,252,67,0.2)] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43]" />
              {currentTab.tag}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
