'use client';

import React, { useState, useMemo } from 'react';
import { clsx } from 'clsx';
import {
  Calculator,
  Check,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Cpu,
  Film,
  Palette,
  Percent,
  BadgePercent,
  Zap,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';

export interface ScopeServiceOption {
  id: string;
  name: string;
  bengaliName: string;
  category: string;
  tagline: string;
  basePrice: number;
  icon: 'globe' | 'cpu' | 'film' | 'palette';
  highlightBadge: string;
}

export interface ScopeFeatureOption {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: 'core' | 'scale' | 'speed';
}

const CORE_SERVICES: ScopeServiceOption[] = [
  {
    id: 'web',
    name: 'Web & E-Commerce Platforms',
    bengaliName: 'ওয়েব ও আধুনিক ই-কমার্স প্ল্যাটফর্ম',
    category: 'Full-Stack Web',
    tagline: 'Next.js 14, TypeScript, Sub-Second Storefronts & Corporate CMS',
    basePrice: 16999,
    icon: 'globe',
    highlightBadge: 'HIGH-SPEED NEXT.JS',
  },
  {
    id: 'software',
    name: 'Custom Software & Enterprise ERP',
    bengaliName: 'কাস্টম বিজনেস সফটওয়্যার ও ইআরপি',
    category: 'Cloud Engineering',
    tagline: 'PostgreSQL Relational DB, POS, Inventory, Accounting & RBAC',
    basePrice: 39999,
    icon: 'cpu',
    highlightBadge: 'FULL CODE OWNERSHIP',
  },
  {
    id: 'video',
    name: 'Commercial Video & Motion Reels',
    bengaliName: 'কমার্শিয়াল ভিডিও ও হাই-ইমপ্যাক্ট রিলস',
    category: 'Motion Production',
    tagline: 'High-Retention 9:16 Vertical Reels, 3D CGI & Social Media Ads',
    basePrice: 10000,
    icon: 'film',
    highlightBadge: 'HIGH ROAS CONVERSION',
  },
  {
    id: 'design',
    name: 'Brand Visual Identity & 3D Packaging',
    bengaliName: 'ব্র্যান্ড আইডেন্টিটি ও ৩ডি প্যাকেজিং সিজিআই',
    category: 'Human Creative',
    tagline: '100% Human-Created Visuals, FMCG Packaging Renders & Editorial Brand Book',
    basePrice: 9999,
    icon: 'palette',
    highlightBadge: '100% HUMAN CREATIVE',
  },
];

const KEY_CAPABILITIES: ScopeFeatureOption[] = [
  {
    id: 'payment-gateway',
    name: 'Payment Gateway (bKash/Nagad/SSL)',
    desc: 'Instant automated checkout, refund & digital invoices',
    price: 8000,
    category: 'core',
  },
  {
    id: 'rbac-dashboard',
    name: 'Role-Based Admin Dashboard & RBAC',
    desc: 'Granular permissions for admin, manager & sales staff',
    price: 10000,
    category: 'core',
  },
  {
    id: 'lighthouse-speed',
    name: 'Sub-Second Speed Tuning (Lighthouse 98+)',
    desc: 'Zero-lag edge delivery, optimized images & caching',
    price: 5000,
    category: 'speed',
  },
  {
    id: 'meta-capi',
    name: 'Meta CAPI & GA4 E-Commerce Tracking',
    desc: 'Server-side tracking for maximum ad ROAS attribution',
    price: 4500,
    category: 'scale',
  },
  {
    id: 'packaging-3d',
    name: 'Photorealistic 3D FMCG Packaging CGI',
    desc: 'Commercial 4K pouch, jar & bottle mockups for retail ads',
    price: 6000,
    category: 'scale',
  },
  {
    id: 'courier-api',
    name: 'Automated Courier API (Steadfast/Pathao)',
    desc: 'One-click barcode shipping label & real-time tracking',
    price: 5000,
    category: 'core',
  },
  {
    id: 'express-sprint',
    name: 'Express 10-Day Sprint Fast-Track',
    desc: 'Dedicated engineering priority & daily milestone sync',
    price: 6000,
    category: 'speed',
  },
  {
    id: 'extended-support',
    name: 'Extended 90-Day Bug Warranty & SLA',
    desc: 'Priority technical maintenance & direct developer access',
    price: 5000,
    category: 'scale',
  },
];

export const ScopeEstimator: React.FC<{ onBookConsultation?: (scopeText: string) => void }> = ({
  onBookConsultation,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['web']);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'payment-gateway',
    'lighthouse-speed',
  ]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((s) => s !== id)
          : prev
        : [...prev, id]
    );
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const servicesTotal = selectedServices.reduce((sum, sId) => {
      const match = CORE_SERVICES.find((s) => s.id === sId);
      return sum + (match ? match.basePrice : 0);
    }, 0);

    const featuresTotal = selectedFeatures.reduce((sum, fId) => {
      const match = KEY_CAPABILITIES.find((f) => f.id === fId);
      return sum + (match ? match.price : 0);
    }, 0);

    const regularSubtotal = servicesTotal + featuresTotal;
    // 20% Approved Promotional Discount
    const promotionalDiscount = Math.round(regularSubtotal * 0.2);
    const discountedSubtotal = regularSubtotal - promotionalDiscount;

    const minRange = Math.round(discountedSubtotal * 0.95);
    const maxRange = Math.round(discountedSubtotal * 1.1);

    const selectedServiceNames = selectedServices
      .map((sId) => CORE_SERVICES.find((s) => s.id === sId)?.name)
      .filter(Boolean)
      .join(', ');

    const selectedFeatureNames = selectedFeatures
      .map((fId) => KEY_CAPABILITIES.find((f) => f.id === fId)?.name)
      .filter(Boolean)
      .join(', ');

    // Timeline estimate
    let timelineEstimate = '১২–১৮ কার্যদিবস';
    if (selectedFeatures.includes('express-sprint')) {
      timelineEstimate = '৭–১০ কার্যদিবস (Express Sprint)';
    } else if (selectedServices.includes('software')) {
      timelineEstimate = '২৫–৩৫ কার্যদিবস';
    } else if (selectedServices.includes('web')) {
      timelineEstimate = '১৫–২০ কার্যদিবস';
    } else {
      timelineEstimate = '৭–১২ কার্যদিবস';
    }

    // Warranty estimate
    let warrantyEstimate = '৪৫ দিন বাগ সাপোর্ট ও টেকনিক্যাল গ্যারান্টি';
    if (selectedFeatures.includes('extended-support')) {
      warrantyEstimate = '৯০ দিন প্রায়োরিটি বাগ সাপোর্ট ও ডেডিকেটেড SLA';
    } else if (selectedServices.includes('software')) {
      warrantyEstimate = '৬০ দিন গ্যারান্টিড বাগ সাপোর্ট ও মেইনটেন্যান্স';
    }

    return {
      regularSubtotal,
      promotionalDiscount,
      discountedSubtotal,
      minRange,
      maxRange,
      selectedServiceNames,
      selectedFeatureNames,
      timelineEstimate,
      warrantyEstimate,
    };
  }, [selectedServices, selectedFeatures]);

  const { getDynamicWhatsAppUrl } = useActiveWhatsApp();

  const rawWhatsappMessage =
    `Hi TOTO Development,\n\nI calculated a custom project scope on your website Scope Estimator:\n\n` +
    `📌 Selected Services (Core Pillars):\n• ${calculation.selectedServiceNames}\n\n` +
    `⚡ Key Capabilities & Deliverables:\n• ${calculation.selectedFeatureNames}\n\n` +
    `💰 Standard Scope Value: ৳${calculation.regularSubtotal.toLocaleString()}\n` +
    `🔥 20% Promotional Discount: -৳${calculation.promotionalDiscount.toLocaleString()}\n` +
    `✅ Estimated Investment: ৳${calculation.minRange.toLocaleString()} – ৳${calculation.maxRange.toLocaleString()}\n` +
    `⏱ Estimated Delivery: ${calculation.timelineEstimate}\n` +
    `🛡 Technical Warranty: ${calculation.warrantyEstimate}\n\n` +
    `I would like to schedule a strategy consultation to discuss this scope.`;

  const renderServiceIcon = (icon: ScopeServiceOption['icon']) => {
    switch (icon) {
      case 'globe':
        return <Globe className="w-5 h-5 text-[#00FC43]" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-[#00FC43]" />;
      case 'film':
        return <Film className="w-5 h-5 text-[#00FC43]" />;
      case 'palette':
        return <Palette className="w-5 h-5 text-[#00FC43]" />;
    }
  };

  return (
    <div className="w-full rounded-3xl bg-[#060b08] border border-[#00FC43]/30 p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(0,252,67,0.15)] relative overflow-hidden backdrop-blur-2xl">
      {/* 3-Sided Asymmetric Ambient Color Lighting Background */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle at 10% 8%, rgba(0, 252, 67, 0.25) 0%, rgba(0, 252, 67, 0.08) 32%, transparent 60%), radial-gradient(circle at 92% 10%, rgba(255, 255, 255, 0.20) 0%, rgba(0, 210, 255, 0.12) 30%, transparent 50%), radial-gradient(circle at 90% 90%, rgba(245, 158, 11, 0.15) 0%, transparent 55%), linear-gradient(145deg, rgba(12, 22, 16, 0.96) 0%, rgba(6, 12, 9, 0.98) 50%, rgba(3, 7, 5, 0.99) 100%)',
        }}
      >
        <div className="absolute -top-24 -left-20 w-88 h-88 rounded-full bg-[#00FC43]/20 blur-[100px]" />
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-cyan-400/15 blur-[95px]" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-amber-400/15 blur-[90px]" />
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/30 text-[11px] font-mono text-[#00FC43] mb-2 shadow-[0_0_15px_rgba(0,252,67,0.15)]">
            <Calculator className="w-3.5 h-3.5" />
            <span className="font-bold">INTERACTIVE ESTIMATION ENGINE</span>
          </div>
          <h3 className="editorial-serif text-2xl sm:text-4xl font-normal text-white tracking-tight">
            Calculate Your Project <span className="italic text-[#00FC43]">Scope & Budget</span>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
            Select your required core engineering pillars and high-impact capabilities to generate an instant, transparent milestone investment estimate.
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 text-xs font-mono font-bold mb-1 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <BadgePercent className="w-3.5 h-3.5" />
            <span>20% PROMO DISCOUNT ACTIVE</span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 block">
            Pricing Model: <strong className="text-white">Fixed Milestone · Zero Hidden Costs</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Step 1 (Services) & Step 2 (Capabilities) */}
        <div className="lg:col-span-7 space-y-8">
          {/* STEP 1: SELECT SERVICES (ONLY 4 CUSTOM CORE SERVICES) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43]" />
                <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-white font-bold">
                  1. Select Core Services (Multi-Select)
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                4 Core Engineering Pillars
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CORE_SERVICES.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={clsx(
                      'group relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer select-none overflow-hidden backdrop-blur-xl',
                      isSelected
                        ? 'border-2 border-[#00FC43] bg-[#091a10] shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(0,252,67,0.3),inset_1px_1px_2px_rgba(255,255,255,0.4)] scale-[1.01]'
                        : 'border border-white/10 bg-white/[0.03] hover:border-[#00FC43]/40 hover:bg-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
                    )}
                  >
                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div
                          className={clsx(
                            'w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-inner',
                            isSelected
                              ? 'bg-[#00FC43]/20 border border-[#00FC43]/50 shadow-[0_0_15px_rgba(0,252,67,0.3)]'
                              : 'bg-white/5 border border-white/15'
                          )}
                        >
                          {renderServiceIcon(service.icon)}
                        </div>

                        <div
                          className={clsx(
                            'w-5 h-5 rounded-full border flex items-center justify-center transition-all',
                            isSelected
                              ? 'border-[#00FC43] bg-[#00FC43] text-[#041608] shadow-[0_0_10px_#00FC43]'
                              : 'border-white/20 bg-white/5'
                          )}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="mb-2">
                        <span className="text-[10px] font-mono font-bold text-[#00FC43] tracking-widest block uppercase mb-0.5">
                          {service.highlightBadge}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                          {service.name}
                        </h4>
                        <p className="editorial-serif italic text-xs text-[#00FC43] font-normal mt-0.5">
                          {service.bengaliName}
                        </p>
                      </div>

                      <p className="text-[11px] text-neutral-300 leading-relaxed font-light mb-4">
                        {service.tagline}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">
                        Starting Baseline:
                      </span>
                      <span className="text-xs font-mono font-black text-white bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                        ৳{service.basePrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: KEY CAPABILITIES & DELIVERABLES */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43]" />
                <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-white font-bold">
                  2. Key Capabilities & Deliverables
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                Select required features
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {KEY_CAPABILITIES.map((feature) => {
                const isSelected = selectedFeatures.includes(feature.id);
                return (
                  <button
                    type="button"
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={clsx(
                      'p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group backdrop-blur-md',
                      isSelected
                        ? 'border-[#00FC43]/80 bg-[#00FC43]/10 shadow-[0_0_20px_rgba(0,252,67,0.15)]'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                    )}
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-bold text-white tracking-tight truncate">
                          {feature.name}
                        </h5>
                      </div>
                      <p className="text-[10px] text-neutral-300 mt-0.5 line-clamp-1 font-light">
                        {feature.desc}
                      </p>
                      <span className="text-[10px] font-mono font-bold text-[#00FC43] mt-1 inline-block">
                        +৳{feature.price.toLocaleString()}
                      </span>
                    </div>

                    <div
                      className={clsx(
                        'w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all',
                        isSelected
                          ? 'border-[#00FC43] bg-[#00FC43] text-[#041608] shadow-[0_0_10px_#00FC43]'
                          : 'border-white/20 bg-white/5 group-hover:border-white/40'
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Step 3 (Live Investment & Project Specification Box) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#09150d] border border-[#00FC43]/40 p-6 sm:p-7 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(0,252,67,0.2)] relative backdrop-blur-2xl">
          <div>
            {/* Header with Live Status */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-neutral-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00FC43]" />
                Live Investment Calculator
              </span>
              <span className="text-[10px] font-mono text-[#00FC43] bg-[#00FC43]/15 px-2.5 py-0.5 rounded-full border border-[#00FC43]/30 font-bold">
                20% DISCOUNT ACTIVE
              </span>
            </div>

            {/* Price Calculations */}
            <div className="mb-6">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="text-xs text-neutral-400 font-mono">Standard Scope Value:</span>
                <span className="text-sm text-neutral-400 font-mono line-through">
                  ৳{calculation.regularSubtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2 mb-3 pb-3 border-b border-white/10">
                <span className="text-xs text-amber-300 font-mono font-bold flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5" /> 20% Promotional Savings:
                </span>
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-400/30">
                  -৳{calculation.promotionalDiscount.toLocaleString()}
                </span>
              </div>

              <span className="text-xs text-neutral-300 font-semibold block mb-1">
                Estimated Discounted Investment:
              </span>
              <div className="editorial-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#00FC43] tracking-tight drop-shadow-[0_2px_15px_rgba(0,252,67,0.3)]">
                ৳{calculation.minRange.toLocaleString()} – ৳{calculation.maxRange.toLocaleString()}
              </div>
              <span className="text-[11px] font-mono text-neutral-400 block mt-1">
                100% One-Time Investment · Zero Platform Lock-in
              </span>
            </div>

            {/* Scope Deliverables Summary */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 space-y-3">
              <div className="flex items-center gap-2 text-xs text-neutral-200">
                <Clock className="w-4 h-4 text-[#00FC43] shrink-0" />
                <span>
                  Estimated Timeline: <strong className="text-white">{calculation.timelineEstimate}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-200">
                <ShieldCheck className="w-4 h-4 text-[#00FC43] shrink-0" />
                <span>
                  Warranty: <strong className="text-white">{calculation.warrantyEstimate}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-[#00FC43] shrink-0" />
                <span>
                  Code Handover: <strong className="text-white">Full GitHub Ownership & CI/CD</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-[#00FC43] shrink-0" />
                <span>
                  Creative Rigor: <strong className="text-white">100% Human-Crafted (No AI Slop)</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <a
              href={getDynamicWhatsAppUrl(rawWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full brand-glow-button py-4 px-5 rounded-xl sm:rounded-full text-xs sm:text-sm font-extrabold text-[#041608] flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,252,67,0.6)] active:scale-95 cursor-pointer min-h-[48px]"
            >
              <FaWhatsapp className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
              <span>Discuss This Scope on WhatsApp</span>
            </a>

            {onBookConsultation && (
              <button
                type="button"
                onClick={() =>
                  onBookConsultation(
                    `Scope: ${calculation.selectedServiceNames} | Features: ${calculation.selectedFeatureNames} | Budget: ৳${calculation.minRange} – ৳${calculation.maxRange}`
                  )
                }
                className="w-full py-3 px-4 rounded-xl sm:rounded-full text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all text-center cursor-pointer min-h-[44px]"
              >
                Request Written Proposal & Agreement
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScopeEstimator;
