'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import {
  Globe,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Gauge,
  ShoppingBag,
  Sparkles,
  Server,
  Database,
  Lock,
  Layers,
  Rocket,
  Check,
  HelpCircle,
  RefreshCw,
  Cpu,
  Laptop,
  Users,
  Gift,
  FileText,
  BarChart3,
  Cloud,
  ChevronRight,
  Store,
  Building2,
  Boxes,
  Receipt,
  Headphones,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { Badge } from '@/components/Badge';
import { PricingCard } from '@/components/PricingCard';
import { ContactModal } from '@/components/ContactModal';
import { PackagePurchaseModal, PurchasePackageData } from '@/components/PackagePurchaseModal';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import { TiltedGridHero } from '@/components/ui/tilted-grid-hero';
import { ServiceWorkflow, WorkflowStep } from '@/components/ServiceWorkflow';
import { ServiceGuarantees, GuaranteeItem } from '@/components/ServiceGuarantees';
import { FAQAccordion } from '@/components/FAQAccordion';
import {
  LANDING_PAGE_PLANS,
  BUSINESS_WEBSITE_PLANS,
  ECOMMERCE_PLANS,
  MULTIVENDOR_PLANS,
  COMMERCE_ELITE_12_FEATURES,
  SECURITY_TIERS,
  INFRASTRUCTURE_COMPARISON,
  BASIC_VS_TOTO_COMPARISON,
  DEVELOPMENT_ADDONS,
  BANGLADESHI_CIRCULAR_TESTIMONIALS,
  WEB_DEVELOPMENT_FAQS,
} from '@/lib/data';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';

const WEB_GALLERY_IMAGES = [
  {
    src: '/portfolio-3d/3d-5.png',
    title: 'High-Velocity E-Commerce',
    alt: 'TOTO Elite Mart — Premier E-Commerce Online Shopping Platform',
  },
  {
    src: '/portfolio-3d/3d-8.png',
    title: 'Modern Web Architecture',
    alt: 'High-Conversion Modern Digital E-Commerce Web Application',
  },
  {
    src: '/portfolio-3d/3d-1.png',
    title: 'Custom Software & ERP',
    alt: 'Enterprise ERP & Multi-Branch Business Management System',
  },
  {
    src: '/portfolio-3d/3d-2.png',
    title: 'Analytics & Reporting Hub',
    alt: 'Real-Time Enterprise Analytics & Financial Dashboard',
  },
  {
    src: '/portfolio-3d/3d-9.png',
    title: 'Point of Sale (POS)',
    alt: 'High-Speed Cloud Point of Sale System',
  },
  {
    src: '/portfolio-3d/3d-3.png',
    title: 'Inventory & Supply Chain',
    alt: 'Automated Multi-Warehouse Inventory Management',
  },
  {
    src: '/portfolio-3d/3d-10.png',
    title: 'Role-Based Access Control',
    alt: 'Granular Permissions and Security Audit Trail',
  },
  {
    src: '/portfolio-3d/3d-11.png',
    title: 'Database & REST API',
    alt: 'High-Concurrency PostgreSQL Cloud Infrastructure',
  },
];

const WEB_WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Strategy & Wireframe Architecture',
    bengaliTitle: 'স্ট্র্যাটেজি ও ইউএক্স ওয়্যারফ্রেম',
    duration: 'Day 1 – 3',
    description:
      'We audit your brand category, analyze top-converting competitor funnels, and construct high-converting mobile-first wireframes mapped to instant checkout flow.',
    icon: Sparkles,
  },
  {
    step: '02',
    title: 'Full-Stack Development & UI Design',
    bengaliTitle: 'হাই-স্পিড কোডিং ও ডিজাইন',
    duration: 'Day 4 – 10',
    description:
      'Engineered with modern Next.js / Laravel architectures, fluid responsive layouts, micro-animations, and 100% responsive fluid mobile layouts with sub-second page loads.',
    icon: Laptop,
  },
  {
    step: '03',
    title: 'bKash/Nagad & Courier Automated Sync',
    bengaliTitle: 'পেমেন্ট গেটওয়ে ও কুরিয়ার ইন্টিগ্রেশন',
    duration: 'Day 11 – 13',
    description:
      'Seamless direct merchant tokenized integration for bKash, Nagad, Card gateways, and automated webhook dispatch for Steadfast, Pathao, or RedX with barcode generation.',
    icon: RefreshCw,
  },
  {
    step: '04',
    title: 'Lighthouse 98+ Audit & Production Launch',
    bengaliTitle: 'লাইটহাউস টেস্ট ও লাইভ ডিপ্লয়মেন্ট',
    duration: 'Day 14',
    description:
      'Rigorous security hardening, SSL lock, Meta Pixel / CAPI / Google Tag Manager integration, Cloudflare CDN routing, and complete administrative dashboard handover.',
    icon: Rocket,
  },
];

const WEB_GUARANTEES: GuaranteeItem[] = [
  {
    title: '<200ms Instant Checkout Speed',
    bengaliTitle: '২০০ms সুপারফাস্ট চেকআউট ও লোডিং',
    description:
      'Engineered to achieve 95+ Google PageSpeed score. Fast page loading slashes drop-offs and cuts ad CAC by up to 38%.',
    icon: Zap,
  },
  {
    title: 'Direct Merchant Settlement (Zero Cut)',
    bengaliTitle: '১০০% ডিরেক্ট মার্চেন্ট পেমেন্ট — কোনো ফি নেই',
    description:
      'All customer payments flow directly into your own verified bank or merchant bKash/Nagad accounts without any third-party intermediary cuts.',
    icon: ShieldCheck,
  },
  {
    title: '1-Click Courier Sync & Barcodes',
    bengaliTitle: 'অটোমেটেড কুরিয়ার বুকিং ও ইনভয়েস প্রিন্ট',
    description:
      'Automatically pushes orders to Steadfast or Pathao with 1-click consignment generation, SMS tracking, and printable thermal labels.',
    icon: ShoppingBag,
  },
  {
    title: '99.9% Uptime SLA & 60-Day Support',
    bengaliTitle: '৯৯.৯% আপটাইম গ্যারান্টি ও ৬০ দিনের ফ্রি সাপোর্ট',
    description:
      'Cloudflare enterprise edge caching, automatic database snapshots, and 60 days of complimentary technical warranty post-launch.',
    icon: Headphones,
  },
];

export default function WebDevelopmentPage() {
  const { getDynamicWhatsAppUrl, openWhatsApp } = useActiveWhatsApp();
  const [activeCategoryTab, setActiveCategoryTab] = useState<'ecommerce' | 'business' | 'landing' | 'multivendor'>('ecommerce');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedPlanForQuote, setSelectedPlanForQuote] = useState('Website Development');
  const [activePurchasePackage, setActivePurchasePackage] = useState<PurchasePackageData | null>(null);

  const webTestimonials = BANGLADESHI_CIRCULAR_TESTIMONIALS;

  const categoryPlans =
    activeCategoryTab === 'ecommerce'
      ? ECOMMERCE_PLANS
      : activeCategoryTab === 'business'
      ? BUSINESS_WEBSITE_PLANS
      : activeCategoryTab === 'landing'
      ? LANDING_PAGE_PLANS
      : MULTIVENDOR_PLANS;

  return (
    <div className="relative pt-36 md:pt-44 pb-24 overflow-hidden bg-[#050705]">
      {/* Ambient Spotlight */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#00FC43]/12 blur-[170px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 01. SERVICE HERO HEADER                                                   */}
      {/* ========================================================================= */}
      <section className="relative px-4 max-w-6xl mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/30 text-xs font-mono font-bold text-[#00FC43] uppercase mb-4 tracking-wider">
          <span>WEB &amp; E-COMMERCE ENGINEERING</span>
        </div>

        <h1 className="editorial-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white mt-4 tracking-tight leading-[1.08] max-w-4xl mx-auto">
          High-Performance Next.js <br className="hidden sm:inline" />
          <span className="italic text-[#00FC43] drop-shadow-[0_0_30px_rgba(0,252,67,0.4)]">
            Web Platforms &amp; E-Commerce
          </span>
        </h1>

        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <span className="text-sm sm:text-base font-bold text-white tracking-wide">Premium Engineering. Smarter Investment.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43]" />
          <span className="text-xs sm:text-sm font-mono text-[#00FC43] font-semibold">Zero Bloated Plugins • Managed PostgreSQL Database</span>
        </div>

        <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto mt-6 leading-relaxed font-normal">
          Eliminate bloated plugins and sluggish page loads. We engineer modern Next.js, React, and PostgreSQL web platforms designed to maximize brand authority, checkout speed, and organic conversions.
        </p>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-10">
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">&lt;180ms</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Checkout Latency</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">99.9%</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Uptime Reliability</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">+42%</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Conversion Rate Lift</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#packages"
            className="brand-glow-button px-8 py-4 rounded-full text-sm font-bold text-[#041608] inline-flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(0,252,67,0.5)]"
          >
            <span>Explore Development Packages</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </a>

          <a
            href={getDynamicWhatsAppUrl(
              'Hi TOTO Development, I want to discuss a Web Development or E-Commerce project for my business.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded-full text-sm font-semibold text-white bg-white/5 border border-white/15 hover:border-[#00FC43]/50 hover:bg-[#00FC43]/10 transition-all backdrop-blur-md inline-flex items-center gap-2"
          >
            <FaWhatsapp className="w-4 h-4 text-[#00FC43]" />
            <span>Consult on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 01.5. 3D CURVED PRODUCTION GALLERY (TILTED GRID HERO)                     */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full mb-28">
        {/* Section Heading directly above the 3D Gallery (High-Converting for Buyers) */}
        <div className="text-center max-w-4xl mx-auto px-4 mb-10">
          <Badge variant="emerald">COMMERCIAL SHOWCASE · LIVE 3D REEL</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight leading-tight">
            High-Conversion E-Commerce &{' '}
            <span className="italic text-[#00FC43]">
              Scalable Software Systems
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Immerse yourself in our production software interfaces, real-time analytics hubs, and high-velocity storefronts engineered for Bangladesh&apos;s fastest-growing enterprises.
          </p>
        </div>

        <div className="relative rounded-3xl p-1 sm:p-2 bg-gradient-to-b from-[#00FC43]/25 via-white/5 to-transparent shadow-[0_20px_70px_rgba(0,0,0,0.95)]">
          <TiltedGridHero
            images={WEB_GALLERY_IMAGES}
            speed={4.2}
            tileHeight={30}
            aspectRatio={16 / 10}
            gap={7}
            axis={50}
            curve={65}
            fade={12}
            className="h-[480px] sm:h-[560px] md:h-[640px] w-full rounded-[22px] border border-white/10 bg-[#050906] overflow-hidden"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. WHY COMMERCE CORE — ENGINEERING PHILOSOPHY                            */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#08100b] border border-[#00FC43]/20 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00FC43] font-bold block mb-2">
              ENGINEERING PHILOSOPHY
            </span>
            <h2 className="editorial-serif text-2xl sm:text-4xl font-normal text-white tracking-tight leading-snug">
              A Website Is Easy to Launch. <br />
              <span className="italic text-[#00FC43]">A Business System Needs More.</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base mt-4 leading-relaxed font-light">
              We do not deploy pirated WordPress themes or fragile plugin-dependent architectures. All web and commerce platforms are built on modern engineering standards—combining Next.js, React, TypeScript, and isolated managed PostgreSQL cloud databases for unmatched uptime and sub-second performance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43]">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">Next.js &amp; React</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43]">
                <Database className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">PostgreSQL Cloud</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43]">
                <Lock className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">Zero Bloated Plugins</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">100% Code Ownership</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. DEVELOPMENT PACKAGES & PRICING SWITCHER                               */}
      {/* ========================================================================= */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 relative">
        <div className="text-center mb-12">
          <Badge variant="emerald">APPROVED PRICING • 20% DISCOUNT ACTIVE</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Transparent Development <span className="italic text-[#00FC43]">Packages</span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed font-normal">
            Transparent, one-time engineering investment with zero recurring platform lock-in. Complete source code and database ownership belongs to your business.
          </p>
        </div>

        {/* 4-Category Tactile Switcher */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#070c09]/95 border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveCategoryTab('ecommerce')}
                className={clsx(
                  'relative group py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-center cursor-pointer select-none',
                  activeCategoryTab === 'ecommerce'
                    ? 'bg-gradient-to-b from-[#0f2b18] via-[#09180e] to-[#040905] text-white border border-[#00FC43]/70 shadow-[0_0_25px_rgba(0,252,67,0.35)] font-bold'
                    : 'bg-white/[0.02] border border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                )}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#00FC43]" />
                <span className="text-xs sm:text-sm">E-Commerce</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-white/10 text-neutral-300">৳২৯,৯৯৯+</span>
              </button>

              <button
                onClick={() => setActiveCategoryTab('business')}
                className={clsx(
                  'relative group py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-center cursor-pointer select-none',
                  activeCategoryTab === 'business'
                    ? 'bg-gradient-to-b from-[#0f2b18] via-[#09180e] to-[#040905] text-white border border-[#00FC43]/70 shadow-[0_0_25px_rgba(0,252,67,0.35)] font-bold'
                    : 'bg-white/[0.02] border border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                )}
              >
                <Building2 className="w-3.5 h-3.5 text-[#00FC43]" />
                <span className="text-xs sm:text-sm">Business</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-white/10 text-neutral-300">৳১৬,৯৯৯+</span>
              </button>

              <button
                onClick={() => setActiveCategoryTab('landing')}
                className={clsx(
                  'relative group py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-center cursor-pointer select-none',
                  activeCategoryTab === 'landing'
                    ? 'bg-gradient-to-b from-[#0f2b18] via-[#09180e] to-[#040905] text-white border border-[#00FC43]/70 shadow-[0_0_25px_rgba(0,252,67,0.35)] font-bold'
                    : 'bg-white/[0.02] border border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                )}
              >
                <Rocket className="w-3.5 h-3.5 text-[#00FC43]" />
                <span className="text-xs sm:text-sm">Landing Page</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-white/10 text-neutral-300">৳৭,৯৯৯+</span>
              </button>

              <button
                onClick={() => setActiveCategoryTab('multivendor')}
                className={clsx(
                  'relative group py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-center cursor-pointer select-none',
                  activeCategoryTab === 'multivendor'
                    ? 'bg-gradient-to-b from-[#0f2b18] via-[#09180e] to-[#040905] text-white border border-[#00FC43]/70 shadow-[0_0_25px_rgba(0,252,67,0.35)] font-bold'
                    : 'bg-white/[0.02] border border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                )}
              >
                <Store className="w-3.5 h-3.5 text-[#00FC43]" />
                <span className="text-xs sm:text-sm">Multi-Vendor</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-white/10 text-neutral-300">৳১,৪৯,৯৯৯+</span>
              </button>
            </div>
          </div>

          {/* Active Context Banner */}
          <div className="mt-3 px-4 py-2.5 rounded-xl bg-[#070b08]/85 border border-white/10 backdrop-blur-md flex items-center justify-between text-xs sm:text-sm text-neutral-200">
            <span>
              {activeCategoryTab === 'ecommerce' && 'Custom E-Commerce Core: Sub-second single-screen checkout, real-time inventory, and courier APIs.'}
              {activeCategoryTab === 'business' && 'Business & Corporate Web: Institutional flagships, dynamic content CMS, and conversion architecture.'}
              {activeCategoryTab === 'landing' && 'High-Converting Landing Pages: Built for high ROAS on Meta and Google ad campaigns.'}
              {activeCategoryTab === 'multivendor' && 'Multi-Vendor Marketplace: Multi-tenant storefronts, dedicated vendor portals, and automated commissions.'}
            </span>
            <span className="hidden sm:inline font-mono font-bold text-[#00FC43]">100% One-Time Investment</span>
          </div>
        </div>

        {/* Center Radiant Halo behind Featured Card */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[640px] bg-[#00FC43]/18 blur-[120px] pointer-events-none -z-10" />

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch pt-8 sm:pt-10">
          {categoryPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onOpenPurchaseModal={(pkg) => setActivePurchasePackage(pkg)}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. COMMERCE ELITE — 12 PREMIUM FEATURES SHOWCASE                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="text-center mb-14">
          <Badge variant="subtle">ENTERPRISE CAPABILITIES</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Commerce Elite: <span className="italic text-[#00FC43]">12 Core Capabilities</span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Beyond a standard storefront—complete operational modules engineered to run a modern, high-volume commerce enterprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMMERCE_ELITE_12_FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="p-6 rounded-2xl bg-[#080e0a] border border-white/10 hover:border-[#00FC43]/40 transition-all duration-300 group shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-lg bg-[#00FC43]/10 border border-[#00FC43]/25 text-[#00FC43] font-mono text-xs font-bold flex items-center justify-center">
                  {feat.id < 10 ? `0${feat.id}` : feat.id}
                </span>
                <span className="text-[10px] font-mono text-[#00FC43] uppercase tracking-wider font-semibold">
                  Elite Module
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#00FC43] transition-colors">
                {feat.title}
              </h3>
              <p className="text-xs text-[#00FC43] font-mono font-medium mt-0.5">
                {feat.bengaliTitle}
              </p>
              <p className="text-xs text-neutral-300 leading-relaxed mt-3">
                {feat.benefit}
              </p>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-neutral-400">
                <span className="text-neutral-500">Technical Advantage: </span>
                <span>{feat.technicalAdvantage}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. SECURITY AS A CORE SELLING POINT                                      */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="text-center mb-14">
          <Badge variant="emerald">RESPONSIBLE ENGINEERING</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Enterprise Security &amp; <br className="hidden sm:inline" />
            <span className="italic text-[#00FC43]">Data Integrity Standards</span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            We enforce cryptographic standards, strict input isolation, and dedicated cloud databases to secure your critical business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SECURITY_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#070c09] border border-white/10 hover:border-[#00FC43]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#00FC43]/10 text-[#00FC43] border border-[#00FC43]/20 mb-3 inline-block">
                  {tier.badge}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">{tier.name}</h3>
                <p className="text-xs text-[#00FC43] font-mono font-semibold">{tier.bengaliName}</p>
                <p className="text-xs text-neutral-400 mt-2 mb-6 leading-relaxed">{tier.description}</p>

                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  {tier.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00FC43] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. PREMIUM CLOUD INFRASTRUCTURE COMPARISON                               */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="text-center mb-12">
          <Badge variant="subtle">INFRASTRUCTURE ARCHITECTURE</Badge>
          <h2 className="editorial-serif text-3xl sm:text-4xl font-normal text-white mt-3 tracking-tight">
            Standard Hosting vs <span className="italic text-[#00FC43]">Dual-Layer Cloud Architecture</span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto mt-2">
            Select the appropriate deployment topology tailored to your expected concurrency and scaling demands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INFRASTRUCTURE_COMPARISON.map((infra) => (
            <div
              key={infra.id}
              className="p-6 rounded-2xl bg-[#080d0a] border border-white/10 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-white">{infra.title}</h3>
                <p className="text-xs text-[#00FC43] font-mono mt-0.5">{infra.bengaliTitle}</p>
                <div className="mt-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-neutral-300">
                  <strong className="text-white">Best Suited For: </strong>
                  {infra.bestFor}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed mt-3 mb-4">
                  {infra.description}
                </p>
                <ul className="space-y-2 border-t border-white/10 pt-3">
                  {infra.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00FC43] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. EDUCATIONAL COMPARISON: BASIC VS TOTO DEVELOPMENT                     */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="text-center mb-12">
          <Badge variant="emerald">EVALUATION CRITERIA</Badge>
          <h2 className="editorial-serif text-3xl sm:text-4xl font-normal text-white mt-3 tracking-tight">
            Basic Website Offering vs <span className="italic text-[#00FC43]">TOTO Professional Engineering</span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto mt-2">
            A technical evaluation of why bespoke software engineering delivers superior long-term ROI.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#070b08] shadow-2xl">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="p-4 sm:p-5 font-bold text-white font-mono uppercase text-xs">Evaluation Criteria</th>
                <th className="p-4 sm:p-5 font-bold text-neutral-400 font-mono uppercase text-xs">Generic Template Off-the-Shelf</th>
                <th className="p-4 sm:p-5 font-bold text-[#00FC43] font-mono uppercase text-xs">TOTO Professional Engineering</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {BASIC_VS_TOTO_COMPARISON.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-white">
                    <span className="block font-bold">{row.criteria}</span>
                    <span className="text-[11px] text-neutral-400 font-mono">{row.bengaliCriteria}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-neutral-400 leading-relaxed">
                    {row.basicOffering}
                  </td>
                  <td className="p-4 sm:p-5 text-neutral-200 leading-relaxed font-medium bg-[#00FC43]/[0.02]">
                    <span className="text-[#00FC43] font-semibold">{row.totoProfessional}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. UPGRADE PATH & ADD-ONS                                                */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Upgrade Path */}
          <div className="p-8 rounded-3xl bg-[#08100b] border border-white/10">
            <Badge variant="subtle">SEAMLESS UPGRADE</Badge>
            <h3 className="editorial-serif text-2xl sm:text-3xl font-bold text-white mt-3">
              Future-Ready <span className="italic text-[#00FC43]">Upgrade Path</span>
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mt-3">
              All solutions are built modularly. As your transaction volume grows, scale your features without rebuilding from scratch or losing historical customer data.
            </p>
            <div className="space-y-4 mt-6">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00FC43]/20 text-[#00FC43] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Start With Any Tier</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Begin with Commerce Start or Business Essential based on your immediate launch goals.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00FC43]/20 text-[#00FC43] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Upgrade Without Data Loss</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Preserve all registered accounts, past orders, and product catalogs seamlessly.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00FC43]/20 text-[#00FC43] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Pay Only Difference</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Pay only the marginal difference between tiers when activating advanced modules.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add-on Features */}
          <div className="p-8 rounded-3xl bg-[#080d0a] border border-white/10">
            <Badge variant="emerald">TRANSPARENT EXTRAS</Badge>
            <h3 className="editorial-serif text-2xl sm:text-3xl font-bold text-white mt-3">
              Optional <span className="italic text-[#00FC43]">Add-on Features</span>
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mt-3">
              Expand your platform with modular integrations and specialized features on demand:
            </p>
            <div className="space-y-2.5 mt-6 max-h-[340px] overflow-y-auto pr-2">
              {DEVELOPMENT_ADDONS.map((addon) => (
                <div
                  key={addon.id}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{addon.name}</span>
                    <span className="text-[11px] text-neutral-400 font-mono">{addon.bengaliName}</span>
                  </div>
                  <span className="font-mono font-bold text-[#00FC43] bg-[#00FC43]/10 px-2.5 py-1 rounded-full border border-[#00FC43]/20 whitespace-nowrap">
                    {addon.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09. 4-PHASE WEB ENGINEERING WORKFLOW                                      */}
      {/* ========================================================================= */}
      <ServiceWorkflow
        badgeText="ENGINEERING ROADMAP"
        headingPrefix="How We Build &"
        headingHighlight="Deploy High-Converting Stores"
        subheading="A disciplined 4-stage sprint ensuring sub-second checkout speeds, automated courier logistics, and zero-downtime launches."
        steps={WEB_WORKFLOW_STEPS}
      />

      {/* ========================================================================= */}
      {/* 10. RISK-REVERSAL SERVICE GUARANTEES                                      */}
      {/* ========================================================================= */}
      <ServiceGuarantees
        badgeText="TOTO CLIENT PROTECTION"
        headingPrefix="Ironclad SLAs &"
        headingHighlight="High-Speed Guarantees"
        subheading="Every web platform is backed by enforceable performance metrics, direct payment settlement, and verified physical accountability."
        guarantees={WEB_GUARANTEES}
      />

      {/* ========================================================================= */}
      {/* 11. CLIENT REVIEWS & VERIFIED PROOF                                       */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <Badge variant="subtle">CLIENT SATISFACTION</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Proven Results in <span className="italic text-[#00FC43]">Web Development</span>
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto mt-3">
            Direct feedback from founders and executives whose digital platforms run on our architecture.
          </p>
        </div>

        <div className="bg-[#060a07] border border-[#00FC43]/20 rounded-3xl p-4 sm:p-10 flex justify-center items-center relative overflow-hidden shadow-2xl">
          <CircularTestimonials
            testimonials={webTestimonials}
            autoplay={true}
            colors={{
              name: '#ffffff',
              designation: '#00FC43',
              testimony: '#e2e8f0',
              arrowBackground: '#0b150e',
              arrowForeground: '#00FC43',
              arrowHoverBackground: '#00FC43',
            }}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. OBJECTION-KILLER WEB DEVELOPMENT FAQS                                 */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 mb-24 relative z-10">
        <div className="text-center mb-14">
          <Badge variant="emerald">QUESTIONS & CLARITY</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Frequently Asked <span className="italic text-[#00FC43]">Questions</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-4 font-light">
            Clear, transparent answers about payment gateway setup, courier automation, speed optimization, and ongoing maintenance.
          </p>
        </div>

        <FAQAccordion items={WEB_DEVELOPMENT_FAQS} />
      </section>

      {/* Package Purchase Modal */}
      {activePurchasePackage && (
        <PackagePurchaseModal
          isOpen={!!activePurchasePackage}
          onClose={() => setActivePurchasePackage(null)}
          packageData={activePurchasePackage}
        />
      )}

      {/* Contact / Discovery Modal */}
      <ContactModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultPlan={selectedPlanForQuote}
      />
    </div>
  );
}
