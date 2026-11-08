'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { clsx } from 'clsx';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe2,
  Layers,
  Sparkles,
  Cpu,
  TrendingUp,
  FileText,
  Star,
  Palette,
  Film,
} from 'lucide-react';
import {
  GLOBAL_METRICS,
  SERVICES_LIST,
  PORTFOLIO_PROJECTS,
  PRICING_PLANS,
  GRAPHIC_DESIGN_PLANS,
  BUSINESS_AD_PLANS,
  COMBO_PLANS,
  FAQS_LIST,
  SITE_CONFIG,
  BANGLADESHI_CIRCULAR_TESTIMONIALS,
  BRAND_DESIGN_SHOWCASE_CARDS,
} from '@/lib/data';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import { CardFanCarousel } from '@/components/ui/card-fan-carousel';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { StatsCounter } from '@/components/StatsCounter';
import { ServiceCard } from '@/components/ServiceCard';
import { ProjectCard } from '@/components/ProjectCard';
import { PricingCard } from '@/components/PricingCard';
import { FAQAccordion } from '@/components/FAQAccordion';
import type { PurchasePackageData } from '@/components/PackagePurchaseModal';

const ContactModal = dynamic(
  () => import('@/components/ContactModal').then((m) => m.ContactModal),
  { ssr: false }
);

const PackagePurchaseModal = dynamic(
  () => import('@/components/PackagePurchaseModal').then((m) => m.PackagePurchaseModal),
  { ssr: false }
);
import { parseBengaliPrice } from '@/lib/utils';
import { HeroEarthGlobe } from '@/components/HeroEarthGlobe';
import { BrandMarquee } from '@/components/BrandMarquee';
import { Team } from '@/components/ui/team';
import { AppleSpatialPillars } from '@/components/AppleSpatialPillars';
import { ApplePricingTabs } from '@/components/ApplePricingTabs';

interface AgencyService {
  id: string;
  category: 'development' | 'marketing' | 'creative';
  title: string;
  description: string;
  capabilities: string[];
  image: string;
  windowLabel: string;
  href: string;
}

const TOTO_SERVICES: AgencyService[] = [
  {
    id: 'software-engineering',
    category: 'development',
    title: 'Custom Software Development',
    description:
      'Purpose-built digital solutions tailored to your business operations. We develop scalable software, management systems, and custom applications that simplify complex workflows and improve efficiency.',
    capabilities: [
      'Custom Business Software',
      'CRM & Management Systems',
      'Workflow Integration',
    ],
    image: 'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/software.jpeg',
    windowLabel: 'system.toto.io/core',
    href: '/services/custom-software/',
  },
  {
    id: 'web-engineering',
    category: 'development',
    title: 'Website Development',
    description:
      'Modern, high-performance websites designed to deliver exceptional digital experiences. We combine responsive design, clean architecture, and intuitive functionality to build platforms that support business growth.',
    capabilities: [
      'Corporate Websites',
      'E-Commerce Development',
      'Custom Web Applications',
    ],
    image: 'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/web%20development.jpeg',
    windowLabel: 'experience.toto.io/live',
    href: '/services/web-development/',
  },
  {
    id: 'digital-strategy',
    category: 'marketing',
    title: 'Digital Marketing',
    description:
      'Strategic marketing solutions designed to strengthen your digital presence. We connect your business with relevant audiences through targeted campaigns, engaging content, and data-informed strategies.',
    capabilities: [
      'Social Media Marketing',
      'Content Strategy',
      'Digital Growth Planning',
    ],
    image: 'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/digital.jpeg',
    windowLabel: 'growth.toto.io/metrics',
    href: '/services/digital-marketing/',
  },
  {
    id: 'paid-advertising',
    category: 'marketing',
    title: 'Meta & Google Ads',
    description:
      'Performance-focused advertising campaigns designed to reach the right audience. From campaign planning to optimization, we help businesses generate qualified opportunities and make better use of advertising budgets.',
    capabilities: [
      'Meta Ads Management',
      'Google Ads Campaigns',
      'Campaign Optimization',
    ],
    image: 'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/ads.jpeg',
    windowLabel: 'ads.toto.io/campaigns',
    href: '/services/paid-ads/',
  },
  {
    id: 'motion-production',
    category: 'creative',
    title: 'Video Editing & Motion Graphics',
    description:
      'Compelling visual storytelling that brings your brand to life. We create professional videos and dynamic motion content designed to capture attention, communicate messages, and strengthen audience engagement.',
    capabilities: [
      'Professional Video Editing',
      'Motion Graphics',
      'Promotional Videos & Reels',
    ],
    image: '/images/services/video-editing.jpg',
    windowLabel: 'motion.toto.io/studio',
    href: '/services/video-motion/',
  },
  {
    id: 'creative-design',
    category: 'creative',
    title: 'Graphic Design',
    description:
      'Distinctive visual experiences that communicate your brand identity. From impactful marketing creatives to cohesive brand assets, we deliver professional designs that make your business stand out.',
    capabilities: [
      'Social Media Creatives',
      'Brand Identity Design',
      'Marketing & Promotional Design',
    ],
    image: '/images/services/graphic-design.jpg',
    windowLabel: 'identity.toto.io/design',
    href: '/services/brand-design/',
  },
];

const SERVICE_TABS = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'development', label: 'Development' },
  { id: 'marketing', label: 'Marketing & Ads' },
  { id: 'creative', label: 'Creative Studio' },
];

const PORTFOLIO_FILTER_TABS = [
  { id: 'all', label: 'All Projects' },
  { id: 'software', label: 'Software' },
  { id: 'web', label: 'Web Development' },
  { id: 'marketing', label: 'Digital Marketing' },
  { id: 'ads', label: 'Ads' },
  { id: 'video', label: 'Video & Motion' },
  { id: 'design', label: 'Design' },
];

export default function HomePage() {
  const [homePricingTab, setHomePricingTab] = useState<'combo' | 'graphic-design' | 'business-ads'>('combo');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>('all');
  const [selectedPortfolioFilter, setSelectedPortfolioFilter] = useState<string>('all');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [modalDefaultPlan, setModalDefaultPlan] = useState<string>('');
  const [activePurchasePackage, setActivePurchasePackage] = useState<PurchasePackageData | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const openQuote = (planTitle?: string) => {
    if (planTitle) {
      const allPlans = [...COMBO_PLANS, ...GRAPHIC_DESIGN_PLANS, ...BUSINESS_AD_PLANS];
      const foundPlan = allPlans.find(
        (p) => p.name.includes(planTitle) || planTitle.includes(p.name) || p.id === planTitle
      );
      if (foundPlan) {
        const numPrice = parseBengaliPrice(foundPlan.price);
        const numOrig = parseBengaliPrice(foundPlan.originalPrice) || numPrice;
        setActivePurchasePackage({
          id: foundPlan.id,
          title: foundPlan.name,
          categoryLabel: foundPlan.subtitle,
          regularPrice: numOrig,
          discountedPrice: numPrice,
          currencySymbol: '৳',
          customPriceLabel: foundPlan.period || 'month',
          hasDiscount: !!foundPlan.discountBadge,
          savingsAmount: numOrig > numPrice ? numOrig - numPrice : undefined,
          features: foundPlan.features?.map((f) => f.name),
        });
        return;
      }
      setModalDefaultPlan(planTitle);
    }
    setIsQuoteModalOpen(true);
  };

  const filteredServices = TOTO_SERVICES.filter(
    (s) => selectedServiceFilter === 'all' || s.category === selectedServiceFilter
  );

  const filteredProjects = PORTFOLIO_PROJECTS.filter(
    (p) => selectedPortfolioFilter === 'all' || p.category === selectedPortfolioFilter
  );

  return (
    <div className="relative">
      {/* ========================================================================= */}
      {/* 01. HERO SECTION WITH 3D CYBERNETIC GLOBE & EDITORIAL HEADLINE            */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        className="relative pt-24 xs:pt-28 sm:pt-36 md:pt-44 pb-14 xs:pb-16 sm:pb-24 md:pb-32 overflow-hidden text-center px-4 z-10 flex flex-col items-center justify-center min-h-[90svh] sm:min-h-[92dvh]"
      >
        {/* Professional 3D Cybernetic Planetary Earth Horizon Background */}
        <HeroEarthGlobe />

        {/* Floating Telemetry HUD Cards (Desktop Only - Adds High-Tech Depth & Trust) */}
        {/* Left Floating HUD Widget */}
        <div className="hidden xl:flex flex-col gap-1.5 absolute top-[36%] left-6 2xl:left-14 p-4 rounded-2xl bg-[#080e0a]/80 border border-[#00FC43]/30 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(0,252,67,0.12)] max-w-[210px] text-left animate-float-slow pointer-events-none z-20">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#00FC43] uppercase tracking-wider font-semibold">Delivery Speed</span>
            <span className="w-2 h-2 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43] animate-pulse" />
          </div>
          <div className="editorial-serif text-2xl text-white font-normal">+300% <span className="text-xs font-sans text-neutral-400">Velocity</span></div>
          <div className="text-[11px] text-neutral-400 font-sans leading-tight">From conception to production deployment</div>
        </div>

        {/* Right Floating HUD Widget (Warm Amber Trust Accent) */}
        <div className="hidden xl:flex flex-col gap-1.5 absolute top-[36%] right-6 2xl:right-14 p-4 rounded-2xl bg-[#0f0e07]/85 border border-amber-400/40 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_22px_rgba(245,158,11,0.18)] max-w-[210px] text-left animate-float-reverse pointer-events-none z-20">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">Verified Trust</span>
            <span className="text-[10px] text-amber-400 font-bold tracking-tight">★★★★★</span>
          </div>
          <div className="editorial-serif text-2xl text-white font-normal">5.0 / 5.0 <span className="text-xs font-sans text-neutral-400">Rating</span></div>
          <div className="text-[11px] text-neutral-400 font-sans leading-tight">Clutch verified high-ticket agency</div>
        </div>

        {/* Content Container */}
        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10 w-full">
          {/* Eyebrow Pill */}
          <div className="hero-stagger mb-4 sm:mb-7">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/35 text-[11px] sm:text-xs font-medium text-[#00FC43] shadow-[0_0_20px_rgba(0,252,67,0.2)] backdrop-blur-md hover:border-[#00FC43]/60 transition-colors duration-200">
              <span className="font-semibold tracking-wide text-white">Full-Stack Digital Solutions</span>
              <span className="text-white/30 hidden xs:inline">·</span>
              <span className="text-[#00FC43] font-mono text-[10px] sm:text-[11px] hidden xs:inline">Engineering Tomorrow</span>
            </div>
          </div>

          {/* Headline (Optimized for Mobile Screens & 4K Displays) */}
          <h1 className="hero-stagger editorial-serif text-[26px] xs:text-[30px] sm:text-5xl md:text-6xl lg:text-[74px] font-bold leading-[1.16] sm:leading-[1.06] text-white tracking-tight max-w-4xl text-center select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.98)]">
            Building the{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#00FC43] via-[#a3ffbf] to-[#00FC43] drop-shadow-[0_0_40px_rgba(0,252,67,0.6)]">
              digital solutions
            </span>
            <br className="hidden sm:inline" /> behind modern businesses
          </h1>

          {/* Subtitle */}
          <p className="hero-stagger text-xs sm:text-base md:text-lg text-neutral-300 max-w-xl mt-3 sm:mt-5 font-normal leading-relaxed text-center font-sans drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)] px-2 sm:px-0">
            Engineering custom software, high-speed web platforms, performance marketing, high-ROAS ads, commercial video reels, and brand design systems for ambitious businesses.
          </p>

          {/* Action CTAs (Mobile-First Layout: Prominent primary + 2-col secondary row on mobile) */}
          <div className="hero-stagger flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto px-4 sm:px-0 max-w-xs sm:max-w-none">
            {/* Primary Strategy Button */}
            <button
              onClick={() => openQuote()}
              className="brand-glow-button w-full sm:w-auto px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 text-[#041608] transition-transform duration-200 transform hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_30px_rgba(0,252,67,0.6)] border border-[#00FC43]/60 group"
            >
              <span>Book a strategy call</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Mobile 2-column secondary buttons (inline on desktop) */}
            <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:items-center sm:gap-3">
              <Link
                href="/services/"
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-semibold inline-flex items-center justify-center gap-1.5 text-white bg-white/5 border border-white/15 hover:border-[#00FC43]/60 hover:text-[#00FC43] hover:bg-[#00FC43]/10 transition-colors duration-200 backdrop-blur-md group"
              >
                <span>Services</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/portfolio/"
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs font-semibold inline-flex items-center justify-center gap-1.5 text-neutral-300 bg-white/[0.04] border border-white/10 hover:border-[#00FC43]/50 hover:text-white transition-colors duration-200 backdrop-blur-md group"
              >
                <Layers className="w-3.5 h-3.5 text-[#00FC43] transition-transform group-hover:scale-110" />
                <span>Our Work</span>
              </Link>
            </div>
          </div>

          {/* High-Trust Verification Strip (Compact Social Proof) */}
          <div className="hero-stagger flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 mt-4 sm:mt-7 text-[11px] sm:text-xs text-neutral-300 font-medium">
            <div className="flex items-center gap-1">
              <span className="flex text-amber-400 text-xs">★★★★★</span>
              <span className="text-white font-bold ml-0.5">5.0</span>
              <span className="text-neutral-400">Verified Agency</span>
            </div>
            <span className="text-neutral-700 hidden xs:inline">·</span>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00FC43]" />
              <span>500+ Production Deliveries</span>
            </div>
            <span className="text-neutral-700 hidden sm:inline">·</span>
            <div className="hidden sm:flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FC43]" />
              <span>Dedicated WhatsApp Support</span>
            </div>
          </div>

          {/* Live System Status Cockpit Bar (Resting directly on the Earth Horizon) */}
          <div className="hero-stagger mt-5 sm:mt-10 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-5 px-3.5 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-black/85 border border-[#00FC43]/40 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.95)] text-[10px] sm:text-xs text-neutral-300 relative z-20">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43] animate-pulse" />
              <span className="font-mono text-white font-bold tracking-wider">ACCEPTING PROJECTS</span>
            </div>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-1 text-neutral-300">
              <span className="text-neutral-400">Track Record:</span>
              <span className="text-[#00FC43] font-mono font-bold">500+ Shipped</span>
            </div>
            <span className="text-neutral-700 hidden xs:inline">|</span>
            <div className="hidden xs:flex items-center gap-1 text-neutral-300">
              <span className="text-neutral-400">Headquarters:</span>
              <span className="text-white font-semibold">Sonadanga, Khulna</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 01.5 INFINITE BRAND LOGO MARQUEE (Curated Bangladesh & Regional Leaders)  */}
      {/* ========================================================================= */}
      <BrandMarquee />

      {/* ========================================================================= */}
      {/* 02. BUSINESS STATISTICS ROW (With Animated GSAP Counters)                 */}
      {/* ========================================================================= */}
      <section className="relative bg-[#080d09] border-t border-b border-[#00FC43]/20 py-16 px-4 z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10 text-center">
          {GLOBAL_METRICS.map((stat, i) => (
            <StatsCounter
              key={i}
              value={stat.numericValue}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              sublabel={stat.sublabel}
              tag={stat.highlightTag}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. SPECIALIZED SERVICES (Interactive Filter Grid)                        */}
      {/* ========================================================================= */}
      <section
        id="services"
        className="relative py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-colors z-20"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(0, 252, 67, 0.08) 0%, rgba(4, 7, 5, 0.5) 45%, transparent 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 border border-[#00FC43]/30 bg-[#00FC43]/10 rounded-full px-5 py-1.5 text-xs font-semibold text-[#00FC43] uppercase tracking-wider shadow-[0_0_15px_rgba(0,252,67,0.2)] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] animate-pulse" />
              <span>Our Specialized Services</span>
            </div>
            <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-tight">
              What We Help{' '}
              <span
                className="italic text-[#00FC43] font-normal"
                style={{ textShadow: 'rgba(0, 252, 67, 0.45) 0px 0px 24px' }}
              >
                Businesses
              </span>{' '}
              Build
            </h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
              From custom software and modern websites to strategic marketing and creative production, we deliver integrated digital solutions that help businesses grow.
            </p>

            {/* Navigation Tabs (Functional Category Filtering) */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8 text-xs font-medium">
              {SERVICE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedServiceFilter(tab.id)}
                  className={`px-5 py-2 rounded-full transition-all duration-300 font-semibold cursor-pointer ${
                    selectedServiceFilter === tab.id
                      ? 'bg-[#00FC43] text-[#041608] shadow-[0_0_15px_rgba(0,252,67,0.4)]'
                      : 'bg-white/5 border border-white/10 text-neutral-300 hover:border-[#00FC43]/40 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Frosted Glassmorphism 1-by-1 Stacking Cards System                        */}
          {/* ========================================================================= */}
          <div className="relative flex flex-col space-y-8 sm:space-y-14 lg:space-y-20 max-w-5xl mx-auto pb-8 sm:pb-14">
            {filteredServices.map((service, index) => {
              const isDev = service.category === 'development';
              const isMkt = service.category === 'marketing';
              const primaryAccent = isDev ? '#00FC43' : isMkt ? '#00E5FF' : '#A855F7';
              const secondaryAccent = isDev ? '#06B6D4' : isMkt ? '#F59E0B' : '#00FC43';

              return (
                <article
                  key={service.id}
                  className="frosted-glass-stack-card rounded-3xl p-6 sm:p-9 lg:p-11 transition-all duration-300 group overflow-hidden"
                  style={{
                    zIndex: 10 + index,
                    ['--stack-offset' as string]: `${index * 8}px`,
                  }}
                >
                  {/* 3-Sided Asymmetric Ambient Light Glow System */}
                  {/* Side 1: Top-Left High Light Spotlight (Brand Green) */}
                  <div
                    className="absolute -top-16 -left-16 w-80 h-80 rounded-full blur-[70px] pointer-events-none opacity-80"
                    style={{ backgroundColor: 'rgba(0, 252, 67, 0.28)' }}
                  />
                  {/* Side 2: Top-Right Specular Diamond Rim (White) */}
                  <div
                    className="absolute -top-10 -right-10 w-64 h-64 rounded-full blur-[65px] pointer-events-none opacity-40"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)' }}
                  />
                  {/* Side 3: Bottom-Right Low Light Ambient Fill (Soft Mint/Cyan) */}
                  <div
                    className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full blur-[80px] pointer-events-none opacity-50"
                    style={{ backgroundColor: isMkt ? 'rgba(255, 184, 0, 0.14)' : 'rgba(0, 210, 255, 0.12)' }}
                  />

                  {/* Glass Specular Top Bevel Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-black/40 pointer-events-none rounded-3xl" />

                  {/* Card Content Grid: Balanced Narrative + High-Resolution Visual Showcase */}
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* Left Column: Narrative, Description, Capabilities, and CTA */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Category Label */}
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border transition-colors"
                          style={{
                            backgroundColor: `${primaryAccent}15`,
                            borderColor: `${primaryAccent}40`,
                            color: primaryAccent,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: primaryAccent }}
                          />
                          <span>{service.id.toUpperCase().replace('-', ' ')}</span>
                        </div>

                        {/* Service Title */}
                        <h3 className="editorial-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight leading-[1.2] mb-4 group-hover:text-[#00FC43] transition-colors duration-300">
                          {service.title}
                        </h3>

                        {/* Service Description (Crisp White High-Contrast Typography) */}
                        <p className="text-white/95 text-sm sm:text-base leading-relaxed font-normal mb-6 max-w-xl">
                          {service.description}
                        </p>

                        {/* Sleek Key Capabilities Pills (Pure White Text with Brand Green Dot) */}
                        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8">
                          {service.capabilities.map((cap, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 hover:border-[#00FC43]/60 text-xs font-semibold text-white backdrop-blur-md transition-all shadow-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43]" />
                              <span>{cap}</span>
                            </span>
                          ))}
                        </div>
                    </div>

                    {/* CTA Action Button */}
                    <div className="flex flex-wrap items-center gap-3.5 pt-1">
                      <a
                        href="#contact"
                        className="brand-glow-button text-xs sm:text-sm font-semibold rounded-full px-7 py-2.5 inline-flex items-center gap-2 cursor-pointer shadow-md hover:shadow-[0_0_30px_rgba(0,252,67,0.55)] transition-all"
                      >
                        <span>Initiate Project</span>
                        <ArrowUpRight className="w-4 h-4 font-bold" />
                      </a>
                      {service.href && (
                        <Link
                          href={service.href}
                          className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#00FC43]/40 transition-all inline-flex items-center gap-1.5 backdrop-blur-sm group/btn"
                        >
                          <span>Explore Details</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#00FC43] transition-transform group-hover/btn:translate-x-0.5" />
                        </Link>
                      )}
                      <span className="text-xs text-neutral-400 font-mono flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] animate-pulse" />
                        <span>Dedicated Tech Team</span>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: High-Resolution Visual Showcase in a Sleek Glass Browser Frame */}
                  <div className="lg:col-span-5">
                    <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-[0_20px_45px_rgba(0,0,0,0.7)] group/window backdrop-blur-md">
                      {/* Window Header Bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_6px_rgba(234,179,8,0.4)]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/[0.04] border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] animate-pulse" />
                          <span className="text-[10px] font-mono text-neutral-300 tracking-wider">
                            {service.windowLabel}
                          </span>
                        </div>
                      </div>

                      {/* Image Preview Container */}
                      <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-950">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 100vw, 480px"
                          className="object-cover object-center transform group-hover/window:scale-105 transition-transform duration-700 brightness-95 group-hover/window:brightness-105"
                        />
                        {/* Dual-color subtle gradient depth overlay on image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ); })}
          </div>

          {/* Bottom Action Button */}
          <div className="text-center mt-14">
            <Link
              href="/services/"
              className="brand-glow-button text-sm font-semibold rounded-full px-8 py-3.5 inline-flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-[0_0_35px_rgba(0,252,67,0.6)]"
            >
              <span>Explore all services</span>
              <ArrowUpRight className="w-4 h-4 font-bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. PORTFOLIO SHOWCASE                                                    */}
      {/* ========================================================================= */}
      <section id="portfolio" className="py-14 sm:py-20 lg:py-24 px-4 text-white relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 border border-[#00FC43]/30 bg-[#00FC43]/10 rounded-full px-5 py-1.5 text-xs font-semibold text-[#00FC43] uppercase tracking-wider shadow-[0_0_15px_rgba(0,252,67,0.15)] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] animate-pulse" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight">
              Work That Moves{' '}
              <span
                className="italic text-[#00FC43] font-light"
                style={{ textShadow: 'rgba(0, 252, 67, 0.4) 0px 0px 20px' }}
              >
                Business Forward
              </span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
              Explore digital solutions and creative brand architectures built to solve real business challenges.
            </p>
          </div>

          {/* ========================================================================= */}
          {/* 3D CREATIVE PORTFOLIO SHOWCASE: BRAND IDENTITY & PACKAGING ARCHITECTURE   */}
          {/* ========================================================================= */}
          <div className="mb-16 sm:mb-20 p-5 sm:p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#08120a]/95 via-[#050906]/95 to-[#030604] border border-[#00FC43]/25 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(0,252,67,0.12)] backdrop-blur-2xl relative overflow-hidden">
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-[#00FC43]/15 blur-[75px] pointer-events-none" />
            <div className="absolute -bottom-10 right-10 w-64 h-64 bg-[#00FC43]/10 blur-[85px] pointer-events-none" />

            <div className="text-center mb-6 sm:mb-8 relative z-10">
              <span className="text-[11px] font-mono text-[#00FC43] uppercase tracking-widest font-bold inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/25 mb-3 shadow-[0_0_12px_rgba(0,252,67,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] animate-pulse" />
                CREATIVE PORTFOLIO SHOWCASE
              </span>
              <h3 className="editorial-serif text-2xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
                Brand Identity &amp; <span className="italic text-[#00FC43] drop-shadow-[0_0_25px_rgba(0,252,67,0.4)]">Packaging Architecture</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mt-2.5 leading-relaxed font-normal">
                Photorealistic 3D FMCG packaging mockups, luxury cosmetics CGI, and high-impact retail visual identities engineered for conversion.
              </p>
            </div>

            <CardFanCarousel cards={BRAND_DESIGN_SHOWCASE_CARDS} />
          </div>

          {/* Client Case Studies Header & Filter Pills */}
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00FC43] font-bold block mb-2">
              ENGINEERING &amp; DIGITAL CASE STUDIES
            </span>
            <h3 className="editorial-serif text-2xl sm:text-3xl font-normal text-white">
              Selected <span className="italic text-[#00FC43]">Client Deployments</span>
            </h3>

            {/* Portfolio Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-xs font-medium">
              {PORTFOLIO_FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPortfolioFilter(tab.id)}
                  className={`px-4 py-1.5 rounded-full transition-all duration-300 font-medium cursor-pointer ${
                    selectedPortfolioFilter === tab.id
                      ? 'bg-[#00FC43] text-[#041608] font-bold shadow-[0_0_15px_rgba(0,252,67,0.4)]'
                      : 'bg-white/5 border border-white/10 text-neutral-300 hover:border-[#00FC43]/40 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Bento Showcase Grid (First 3 Projects on Home Page) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {filteredProjects.slice(0, 3).map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={idx === 0 && selectedPortfolioFilter === 'all'}
              />
            ))}
          </div>

          {/* See More Projects CTA Button */}
          <div className="flex justify-center mt-12 sm:mt-14">
            <Link
              href="/portfolio/"
              className="brand-glow-button text-sm sm:text-base font-semibold rounded-full px-9 sm:px-11 py-3.5 sm:py-4 inline-flex items-center gap-2.5 cursor-pointer shadow-lg hover:shadow-[0_0_35px_rgba(0,252,67,0.5)] transition-all hover:scale-105 active:scale-95"
            >
              <span>See More</span>
              <ArrowRight className="w-4 h-4 font-bold" />
            </Link>
          </div>

          {/* Have a Project in Mind? Call to Action with Off-Center Radial Mesh Aurora */}
          <div
            style={{
              background:
                'radial-gradient(circle at 12% 18%, rgba(0, 252, 67, 0.28) 0%, rgba(14, 56, 26, 0.38) 25%, rgba(9, 16, 11, 0.90) 60%, rgba(4, 7, 5, 0.98) 100%)',
            }}
            className="mt-20 p-8 sm:p-12 lg:p-14 rounded-3xl border border-[#00FC43]/35 text-center relative overflow-hidden backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,252,67,0.18)]"
          >
            {/* Off-Center Ambient Radial Blooms */}
            <div className="absolute -top-28 -left-28 w-96 h-96 rounded-full bg-[#00FC43]/22 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#10b981]/15 blur-[95px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="editorial-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4">
                Have a Project in Mind?
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base mb-8 font-normal">
                Let&apos;s turn your next idea into something remarkable.
              </p>
              <button
                onClick={() => openQuote()}
                className="brand-glow-button text-sm font-semibold rounded-full px-8 py-3.5 inline-flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-[0_0_35px_rgba(0,252,67,0.6)] transition-all"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 font-bold" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. WHY CHOOSE US (Apple-Grade Spatial 3D Bento Engineering Grid)          */}
      {/* ========================================================================= */}
      <AppleSpatialPillars />

      {/* ========================================================================= */}
      {/* 05.5. WORLD-CLASS TEAM & ENGINEERING LEADERSHIP                           */}
      {/* ========================================================================= */}
      <Team className="border-b border-white/10" />

      {/* ========================================================================= */}
      {/* 06. TRANSPARENT PRICING GRID                                              */}
      {/* ========================================================================= */}
      <section id="pricing" className="py-14 sm:py-20 lg:py-24 px-4 relative z-20 overflow-hidden">
        {/* Ambient Multi-Point Mesh & Radial Glows behind Pricing Section */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[950px] h-[550px] bg-[#00FC43]/12 blur-[170px] pointer-events-none -z-10" />
        <div className="absolute -top-20 -left-36 w-[580px] h-[580px] bg-[#00FC43]/10 blur-[150px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 -right-36 w-[620px] h-[620px] bg-[#10b981]/10 blur-[160px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <Badge variant="emerald">CREATIVE PACKAGES</Badge>

            {/* Headline */}
            <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white mt-4 tracking-tight leading-[1.12]">
              Unbeatable value,{' '}
              <br className="hidden sm:inline" />
              <span className="italic text-[#00FC43] drop-shadow-[0_0_30px_rgba(0,252,67,0.4)]">
                unmatched quality
              </span>
            </h2>

            {/* Bundle Name Pill Bar */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-5 px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <span className="text-sm sm:text-base font-bold text-white tracking-wide">From Vision to Success</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43]" />
              <span className="text-xs sm:text-sm font-mono text-[#00FC43] font-semibold">Creative Design & Video Packages</span>
            </div>

            <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
              Professional creative designs and video content to build a consistent, memorable brand presence.
            </p>
          </div>

          {/* Apple-Grade VisionOS Category Switcher & Dynamic Island */}
          <ApplePricingTabs
            activeTab={homePricingTab}
            onChange={setHomePricingTab}
          />

          {/* 3 Pricing Packages Grid with Ambient Center Backlight */}
          <div className="relative">
            {/* Center Radiant Halo behind Featured (Best Value) */}
            <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[640px] bg-[#00FC43]/18 blur-[120px] pointer-events-none -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch pt-8 sm:pt-10">
              {(homePricingTab === 'combo'
                ? COMBO_PLANS
                : homePricingTab === 'graphic-design'
                ? GRAPHIC_DESIGN_PLANS
                : BUSINESS_AD_PLANS
              ).map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  onOpenPurchaseModal={(pkg) => setActivePurchasePackage(pkg)}
                />
              ))}
            </div>
          </div>

          {/* Ready to Strengthen Your Brand? CTA Banner */}
          <div
            style={{
              background:
                'radial-gradient(circle at 88% 22%, rgba(0, 252, 67, 0.28) 0%, rgba(14, 58, 28, 0.38) 28%, rgba(8, 14, 10, 0.94) 62%, #030503 100%)',
            }}
            className="mt-16 rounded-3xl p-8 sm:p-12 border border-[#00FC43]/40 shadow-[0_20px_50px_rgba(0,0,0,0.92),0_0_40px_rgba(0,252,67,0.22)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden backdrop-blur-2xl"
          >
            <div className="absolute -top-24 -right-20 w-88 h-88 rounded-full bg-[#00FC43]/24 blur-[90px] pointer-events-none" />
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-[#00FC43] block mb-2 font-bold">
                Take The Next Step
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                Ready to Strengthen Your Brand?
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Choose the package that fits your business goals. Let&apos;s build a consistent, memorable brand presence together.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <button
                onClick={() => openQuote('সোনালীকা (Creative Growth)')}
                className="brand-glow-button px-8 py-4 rounded-full font-bold text-sm text-[#041608] shadow-[0_0_35px_rgba(0,252,67,0.6)] hover:shadow-[0_0_50px_rgba(0,252,67,0.85)] flex items-center gap-2 cursor-pointer transition-all duration-300 active:scale-95"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 font-bold" />
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/pricing/"
              className="text-xs font-mono uppercase tracking-widest text-[#00FC43] hover:underline underline-offset-4 inline-flex items-center gap-1.5"
            >
              <span>View all pricing packages & retainers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. BANGLADESHI CLIENT SUCCESS & 3D EXECUTIVE REVIEWS                     */}
      {/* ========================================================================= */}
      <section
        id="reviews"
        className="py-14 sm:py-20 lg:py-24 px-4 relative z-20 border-t border-white/10"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(0, 252, 67, 0.05) 0%, rgba(5, 7, 5, 0.8) 50%, #050705 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <Badge variant="emerald">VERIFIED CLIENT SUCCESS</Badge>
            <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
              Trusted by Ambitious Brands Across <span className="italic text-[#00FC43]">Bangladesh</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-4">
              Real results, genuine satisfaction, and transformational business growth from founders across Bangladesh.
            </p>
          </div>

          <div className="bg-[#060a07] border border-[#00FC43]/20 rounded-3xl p-4 sm:p-10 flex justify-center items-center relative overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#00FC43]/10 blur-[100px] pointer-events-none" />
            <CircularTestimonials
              testimonials={BANGLADESHI_CIRCULAR_TESTIMONIALS}
              autoplay={true}
              colors={{
                name: "#ffffff",
                designation: "#00FC43",
                testimony: "#e2e8f0",
                arrowBackground: "#0b150e",
                arrowForeground: "#00FC43",
                arrowHoverBackground: "#00FC43",
              }}
              fontSizes={{
                name: "1.75rem",
                designation: "0.875rem",
                quote: "1.05rem",
              }}
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. INTERACTIVE FAQ ACCORDION                                              */}
      {/* ========================================================================= */}
      <section
        id="faq"
        className="py-14 sm:py-20 lg:py-24 px-4 relative z-20 border-t border-white/10"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(0, 252, 67, 0.06) 0%, rgba(5, 8, 6, 0.5) 45%, transparent 100%)',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <Badge variant="emerald">QUESTIONS & CLARITY</Badge>
            <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
              Frequently Asked <span className="italic text-[#00FC43]">Questions</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-4">
              Clear, verified answers on our engineering standards, deployment timelines, and client engagement
              process.
            </p>
          </div>

          <FAQAccordion items={FAQS_LIST} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. FINAL CALL TO ACTION & ADVISOR INQUIRY SECTION                        */}
      {/* ========================================================================= */}
      <section id="contact" className="py-14 sm:py-20 lg:py-24 px-4 relative z-20 overflow-hidden">
        {/* Glow behind contact */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#00FC43]/12 blur-[160px] pointer-events-none" />

        <div
          style={{
            background:
              'radial-gradient(circle at 85% 15%, rgba(0, 252, 67, 0.28) 0%, rgba(14, 56, 26, 0.38) 25%, rgba(9, 16, 11, 0.90) 60%, rgba(4, 7, 5, 0.98) 100%)',
          }}
          className="max-w-5xl mx-auto rounded-3xl p-8 sm:p-14 border border-[#00FC43]/45 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(0,252,67,0.22)] text-center relative z-10 overflow-hidden backdrop-blur-2xl"
        >
          {/* Asymmetrical Ambient Radial Blooms inside Contact Card */}
          <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#00FC43]/22 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-28 -left-28 w-[380px] h-[380px] rounded-full bg-[#10b981]/15 blur-[90px] pointer-events-none" />
          <Badge variant="emerald">READY TO ENGINEER SCALE?</Badge>

          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white mt-6 tracking-tight max-w-3xl mx-auto">
            Let&apos;s Build the <span className="italic text-[#00FC43]">Digital Infrastructure</span>{' '}
            Your Business Deserves
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Direct access to senior solutions architects. Detailed technical breakdown and fixed-scope
            proposal within 48 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <button
              onClick={() => openQuote()}
              className="brand-glow-button px-9 py-4 rounded-full text-sm font-bold text-[#041608] inline-flex items-center gap-2 cursor-pointer shadow-[0_0_35px_rgba(0,252,67,0.6)]"
            >
              <span>Request a proposal</span>
              <ArrowRight className="w-4 h-4 font-bold" />
            </button>

            <Link
              href="/about/"
              className="px-8 py-4 rounded-full text-sm font-semibold text-white bg-white/5 border border-white/15 hover:border-[#00FC43]/50 hover:bg-[#00FC43]/10 transition-all backdrop-blur-md"
            >
              Learn more about our team →
            </Link>
          </div>

          {/* Direct Support Trust Note */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00FC43]" /> Strict Mutual NDA Protected
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#00FC43]" /> 48-Hour Proposal Turnaround
            </span>
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-[#00FC43]" /> Headquarters: Sonadanga, Khulna - 9000
            </span>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <ContactModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultPlan={modalDefaultPlan}
      />

      <PackagePurchaseModal
        isOpen={!!activePurchasePackage}
        onClose={() => setActivePurchasePackage(null)}
        packageData={activePurchasePackage}
      />
    </div>
  );
}
