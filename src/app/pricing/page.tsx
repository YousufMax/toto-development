'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Clock,
  Sparkles,
  HelpCircle,
  ShoppingBag,
  Building2,
  Rocket,
  Code2,
  Store,
  Palette,
  Film,
  Play,
  Layers,
  Database,
  Lock,
  Cpu,
  CheckCircle2,
  ChevronRight,
  Monitor,
  Zap,
  Boxes,
  Receipt,
  Users,
  PackageCheck,
  UserCheck,
  Kanban,
  Utensils,
  GraduationCap,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { Badge } from '@/components/Badge';
import { PricingCard } from '@/components/PricingCard';
import { FAQAccordion } from '@/components/FAQAccordion';
import { ContactModal } from '@/components/ContactModal';
import { PackagePurchaseModal, PurchasePackageData } from '@/components/PackagePurchaseModal';
import { AppleSegmentedControl } from '@/components/AppleSegmentedControl';
import { TiltedGridHero } from '@/components/ui/tilted-grid-hero';
import { CardFanCarousel } from '@/components/ui/card-fan-carousel';
import { CommercialReelsShowcase } from '@/components/CommercialReelsShowcase';
import {
  ECOMMERCE_PLANS,
  BUSINESS_WEBSITE_PLANS,
  LANDING_PAGE_PLANS,
  SOFTWARE_PACKAGES,
  MULTIVENDOR_PLANS,
  COMBO_PLANS,
  GRAPHIC_DESIGN_PLANS,
  BUSINESS_AD_PLANS,
  SOFTWARE_SOLUTIONS_CATALOGUE,
  SoftwareSolutionItem,
  COMMERCE_ELITE_12_FEATURES,
  SECURITY_TIERS,
  BASIC_VS_TOTO_COMPARISON,
  DEVELOPMENT_ADDONS,
  DEV_PRICING_FAQS,
  SITE_CONFIG,
  BRAND_DESIGN_SHOWCASE_CARDS,
} from '@/lib/data';
import { parseBengaliPrice } from '@/lib/utils';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';

const WEB_SOFTWARE_SHOWCASE_IMAGES = [
  {
    src: '/portfolio-3d/3d-1.png',
    title: 'Enterprise ERP & Multi-Branch Systems',
    alt: 'Custom Enterprise ERP & Multi-Branch Business Management System',
  },
  {
    src: '/portfolio-3d/3d-5.png',
    title: 'High-Conversion E-Commerce Storefronts',
    alt: 'High-Conversion Modern Digital E-Commerce Web Application',
  },
  {
    src: '/portfolio-3d/3d-2.png',
    title: 'Real-Time Analytics & Financial Hub',
    alt: 'Corporate Financial Accounting & Executive Analytics Hub',
  },
  {
    src: '/portfolio-3d/3d-8.png',
    title: 'Modern Web Architecture & SaaS',
    alt: 'High-Performance Modern Web Architecture and Cloud SaaS Platform',
  },
  {
    src: '/portfolio-3d/3d-9.png',
    title: 'High-Speed Cloud Point of Sale (POS)',
    alt: 'Enterprise Multi-Outlet Cloud Point of Sale System',
  },
  {
    src: '/portfolio-3d/3d-3.png',
    title: 'Automated Multi-Warehouse Inventory',
    alt: 'Real-Time Automated Multi-Warehouse Inventory Management',
  },
  {
    src: '/portfolio-3d/3d-10.png',
    title: 'Role-Based Access Control (RBAC)',
    alt: 'Granular Role-Based Access Control and Security Audit Engine',
  },
  {
    src: '/portfolio-3d/3d-11.png',
    title: 'High-Concurrency PostgreSQL DB',
    alt: 'High-Concurrency Managed PostgreSQL Cloud Infrastructure',
  },
];

const PRICING_DISCIPLINES = [
  {
    id: 'section-design',
    title: 'Brand Design',
    sub: 'Design & Combos',
    price: '৳২,০৯৯+',
    icon: Palette,
  },
  {
    id: 'section-motion',
    title: 'Video & Motion',
    sub: 'Commercial Ads',
    price: '৳৬,০০০+',
    icon: Film,
  },
  {
    id: 'section-software',
    title: 'Custom Software',
    sub: 'ERP & Systems',
    price: '৳৬০,০০০+',
    icon: Code2,
  },
  {
    id: 'section-ecommerce',
    title: 'Web & Commerce',
    sub: 'Fast Platforms',
    price: '৳২৫,০০০+',
    icon: ShoppingBag,
  },
];

export default function PricingPage() {
  const { openWhatsApp } = useActiveWhatsApp();
  const [activePricingSection, setActivePricingSection] = useState<string>('section-design');

  useEffect(() => {
    const sectionIds = ['section-design', 'section-motion', 'section-software', 'section-ecommerce'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 220;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActivePricingSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section 1: Design Choice ('combo' | 'design')
  const [designChoice, setDesignChoice] = useState<'combo' | 'design'>('combo');

  // Section 2: Motion Choice ('motion' | 'combo')
  const [motionChoice, setMotionChoice] = useState<'motion' | 'combo'>('motion');

  // Section 3: Custom Software Choice ('packages' | 'catalogue')
  const [softwareChoice, setSoftwareChoice] = useState<'packages' | 'catalogue'>('packages');
  const [selectedSoftwareSolutionId, setSelectedSoftwareSolutionId] = useState<string>(
    SOFTWARE_SOLUTIONS_CATALOGUE[0].id
  );

  // Section 4: E-Commerce & Web Choice ('ecommerce' | 'corporate' | 'landing' | 'multivendor')
  const [ecommerceChoice, setEcommerceChoice] = useState<'ecommerce' | 'corporate' | 'landing' | 'multivendor'>('ecommerce');

  // Modals state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState('');
  const [activePurchasePackage, setActivePurchasePackage] = useState<PurchasePackageData | null>(null);

  const selectedSoftwareSolution =
    SOFTWARE_SOLUTIONS_CATALOGUE.find((s) => s.id === selectedSoftwareSolutionId) ||
    SOFTWARE_SOLUTIONS_CATALOGUE[0];

  // Master list of all plans for quick modal prefilling
  const allPlans = [
    ...COMBO_PLANS,
    ...GRAPHIC_DESIGN_PLANS,
    ...BUSINESS_AD_PLANS,
    ...SOFTWARE_PACKAGES,
    ...ECOMMERCE_PLANS,
    ...BUSINESS_WEBSITE_PLANS,
    ...LANDING_PAGE_PLANS,
    ...MULTIVENDOR_PLANS,
  ];

  const handleOpenPurchase = (planNameOrId: string, customPrice?: number, categoryLabel?: string) => {
    const foundPlan = allPlans.find(
      (p) => p.id === planNameOrId || p.name === planNameOrId || p.name.includes(planNameOrId)
    );

    if (foundPlan) {
      const numPrice = parseBengaliPrice(foundPlan.price);
      const numOrig = parseBengaliPrice(foundPlan.originalPrice) || numPrice;
      setActivePurchasePackage({
        id: foundPlan.id,
        title: foundPlan.name,
        categoryLabel: categoryLabel || foundPlan.subtitle || 'TOTO Plan',
        regularPrice: numOrig,
        discountedPrice: numPrice,
        currencySymbol: '৳',
        customPriceLabel: foundPlan.period || 'One-Time Cost',
        hasDiscount: !!foundPlan.discountBadge,
        savingsAmount: numOrig > numPrice ? numOrig - numPrice : undefined,
        features: foundPlan.features?.map((f) => f.name),
      });
    } else {
      setSelectedPlanForModal(planNameOrId);
      setIsQuoteModalOpen(true);
    }
  };

  const handleSolutionSelectForPurchase = (solution: SoftwareSolutionItem) => {
    const numPrice = parseBengaliPrice(solution.startingPrice);
    const regularPrice = Math.round(numPrice / 0.8);
    setActivePurchasePackage({
      id: `sol-${solution.id}`,
      title: `${solution.title}`,
      categoryLabel: 'Custom Business Software Solution',
      regularPrice: regularPrice,
      discountedPrice: numPrice,
      currencySymbol: '৳',
      customPriceLabel: 'Starting Investment (One-Time)',
      hasDiscount: true,
      savingsAmount: regularPrice - numPrice,
      features: solution.modules,
    });
  };

  const renderSolutionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-[#00FC43]" />;
      case 'Receipt':
        return <Receipt className="w-5 h-5 text-[#00FC43]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#00FC43]" />;
      case 'PackageCheck':
        return <PackageCheck className="w-5 h-5 text-[#00FC43]" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-[#00FC43]" />;
      case 'Kanban':
        return <Kanban className="w-5 h-5 text-[#00FC43]" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#00FC43]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#00FC43]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#00FC43]" />;
      default:
        return <Code2 className="w-5 h-5 text-[#00FC43]" />;
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative pt-36 md:pt-44 pb-24 overflow-hidden">
      {/* Ambient Multi-Point Mesh & Radial Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[950px] h-[550px] bg-[#00FC43]/12 blur-[170px] pointer-events-none -z-10" />
      <div className="absolute top-40 -left-36 w-[550px] h-[550px] bg-[#00FC43]/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-96 -right-36 w-[600px] h-[600px] bg-[#10b981]/10 blur-[160px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 01. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section className="relative px-4 max-w-6xl mx-auto text-center mb-10 sm:mb-14 z-10">
        <Badge variant="subtle">TOTO DEVELOPMENT ECOSYSTEM</Badge>

        <h1 className="editorial-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal text-white mt-5 tracking-tight leading-[1.10] max-w-4xl mx-auto">
          Transparent Pricing,{' '}
          <br className="hidden sm:inline" />
          <span className="italic text-[#00FC43] drop-shadow-[0_0_30px_rgba(0,252,67,0.4)]">
            Engineered for Growth
          </span>
        </h1>

        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <span className="text-sm sm:text-base font-bold text-white tracking-wide">100% Upfront Pricing</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43]" />
          <span className="text-xs sm:text-sm font-mono text-[#00FC43] font-semibold">20% Promotional Discount Active Across All Packages</span>
        </div>

        <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto mt-5 leading-relaxed font-normal">
          Explore transparent pricing across our four core disciplines. Review included deliverables, estimated delivery timelines, and guaranteed support periods for your project.
        </p>

        {/* Apple VisionOS 4-Discipline Navigation Hub (Symmetrical 2x2 Grid on Mobile, 4-Col Pill on Desktop) */}
        <div className="mt-8 max-w-4xl mx-auto px-2">
          <div className="p-1.5 sm:p-2 rounded-2xl md:rounded-full bg-[#060a08]/90 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.92),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2">
              {PRICING_DISCIPLINES.map((item) => {
                const Icon = item.icon;
                const isActive = activePricingSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActivePricingSection(item.id);
                      scrollToSection(item.id);
                    }}
                    className={clsx(
                      'relative py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl md:rounded-full flex items-center justify-between md:justify-center gap-2 cursor-pointer transition-all duration-200 outline-none select-none group active:scale-[0.98]',
                      isActive
                        ? 'text-white'
                        : 'bg-white/[0.03] text-neutral-300 border border-white/5 hover:bg-white/[0.06] hover:border-white/15 hover:text-white'
                    )}
                  >
                    {/* Apple Spring Sliding Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="hero-pricing-discipline-thumb"
                        transition={{
                          type: 'spring',
                          stiffness: 450,
                          damping: 35,
                          mass: 0.8,
                        }}
                        className="absolute inset-0 rounded-xl md:rounded-full bg-gradient-to-b from-[#112a1b] via-[#09170e] to-[#040805] border border-[#00FC43]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_8px_20px_rgba(0,0,0,0.7),0_0_20px_rgba(0,252,67,0.3)] z-0"
                      >
                        <span className="absolute bottom-1 inset-x-4 sm:inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#00FC43] to-transparent rounded-full pointer-events-none" />
                      </motion.div>
                    )}

                    <div className="relative z-10 flex items-center gap-2 min-w-0">
                      <div
                        className={clsx(
                          'w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105',
                          isActive
                            ? 'bg-[#00FC43]/20 text-[#00FC43] border border-[#00FC43]/50 shadow-[0_0_10px_rgba(0,252,67,0.4)]'
                            : 'bg-white/5 text-neutral-400 border border-white/5 group-hover:text-white'
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>

                      <div className="text-left min-w-0">
                        <span className="text-xs sm:text-sm font-bold tracking-tight block truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono hidden lg:block truncate">
                          {item.sub}
                        </span>
                      </div>
                    </div>

                    <span
                      className={clsx(
                        'relative z-10 text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full shrink-0 transition-colors',
                        isActive
                          ? 'bg-[#00FC43] text-[#041608] shadow-[0_0_8px_rgba(0,252,67,0.4)]'
                          : 'bg-white/5 text-neutral-400 group-hover:text-white'
                      )}
                    >
                      {item.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 01: GRAPHIC DESIGN & COMBOS                                       */}
      {/* ========================================================================= */}
      <section id="section-design" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 relative z-10 scroll-mt-28">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#070c09]/95 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/20 text-[#00FC43] text-xs font-mono font-bold mb-3">
                <Palette className="w-3.5 h-3.5" /> BRAND &amp; CREATIVE DESIGN
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Brand Design &amp; Creative Retainers
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
                Distinctive visual identity, social media creatives, and integrated design + short-form video reels retainers. 100% human-created, no generic AI templates.
              </p>
            </div>

            {/* SELECTION CONTROLS (Apple-Model Structured) */}
            <AppleSegmentedControl
              activeId={designChoice}
              onChange={setDesignChoice}
              layoutId="pricing-design-segment"
              options={[
                {
                  id: 'combo',
                  label: 'Creative Combos',
                  shortLabel: 'Combos',
                  icon: Sparkles,
                  price: '৳৯,৯৯৯+',
                },
                {
                  id: 'design',
                  label: 'Graphic Design',
                  shortLabel: 'Design',
                  icon: Palette,
                  price: '৳২,০৯৯+',
                },
              ]}
            />
          </div>

          {/* Visual Showcase: Creative Design Showcase */}
          <div className="pt-8 sm:pt-10 mb-8 sm:mb-12 border-b border-white/5 pb-10">
            <div className="text-center mb-6">
              <span className="text-[11px] font-mono text-[#00FC43] uppercase tracking-widest font-bold block mb-1">
                CREATIVE PORTFOLIO SHOWCASE
              </span>
              <h3 className="editorial-serif text-2xl sm:text-3xl font-normal text-white">
                Brand Identity &amp; <span className="italic text-[#00FC43]">Packaging Architecture</span>
              </h3>
            </div>
            <CardFanCarousel cards={BRAND_DESIGN_SHOWCASE_CARDS} />
          </div>

          {/* Render Active Cards */}
          <div className="pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 sm:mb-10 px-1">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FC43] shadow-[0_0_10px_#00FC43]" />
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {designChoice === 'combo'
                    ? 'Integrated Social Media Retainers'
                    : 'Graphic Design Retainers'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  {designChoice === 'combo' ? 'রুপালীকা • সোনালীকা • অগ্রযাত্রা' : 'তুলি • নকশা • আভিজাত্য'}
                </span>
                <span className="text-xs font-mono text-[#00FC43] bg-[#00FC43]/10 px-3 py-1 rounded-full border border-[#00FC43]/20 font-semibold">
                  Monthly Retainer
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch pt-4 sm:pt-6">
              {(designChoice === 'combo' ? COMBO_PLANS : GRAPHIC_DESIGN_PLANS).map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  onOpenPurchaseModal={(pkg) => setActivePurchasePackage(pkg)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 02: COMMERCIAL VIDEO REELS & MOTION ADS                           */}
      {/* ========================================================================= */}
      <section id="section-motion" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 relative z-10 scroll-mt-28">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#070c09]/95 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/20 text-[#00FC43] text-xs font-mono font-bold mb-3">
                <Film className="w-3.5 h-3.5" /> VIDEO PRODUCTION &amp; MOTION
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Commercial Video &amp; Motion Graphics
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
                High-retention 9:16 vertical video reels, 3D commercial motion graphics, and scheduled advertising campaigns.
              </p>
            </div>

            {/* SELECTION CONTROLS (Apple-Model Structured) */}
            <AppleSegmentedControl
              activeId={motionChoice}
              onChange={setMotionChoice}
              layoutId="pricing-motion-segment"
              options={[
                {
                  id: 'motion',
                  label: 'Commercial Motion Ads',
                  shortLabel: 'Motion Ads',
                  icon: Film,
                  price: '৳৬,০০০+',
                },
                {
                  id: 'combo',
                  label: 'Video & Design Combos',
                  shortLabel: 'Combos',
                  icon: Sparkles,
                  price: '৳৯,৯৯৯+',
                },
              ]}
            />
          </div>

          {/* Visual Showcase: Commercial Video Showcase */}
          <div className="pt-8 sm:pt-10 mb-8 sm:mb-12 border-b border-white/5 pb-10">
            <CommercialReelsShowcase />
          </div>

          {/* Render Active Cards */}
          <div className="pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 sm:mb-10 px-1">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FC43] shadow-[0_0_10px_#00FC43]" />
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {motionChoice === 'motion'
                    ? 'Commercial Motion Ads Retainers'
                    : 'Integrated Video & Creative Retainers'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  {motionChoice === 'motion' ? 'প্রত্যয় • আস্থা • গৌরব' : 'রুপালীকা • সোনালীকা • অগ্রযাত্রা'}
                </span>
                <span className="text-xs font-mono text-[#00FC43] bg-[#00FC43]/10 px-3 py-1 rounded-full border border-[#00FC43]/20 font-semibold">
                  Monthly Retainer
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch pt-4 sm:pt-6">
              {(motionChoice === 'motion' ? BUSINESS_AD_PLANS : COMBO_PLANS).map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  onOpenPurchaseModal={(pkg) => setActivePurchasePackage(pkg)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PRODUCTION ARCHITECTURE SHOWCASE (WEB & SOFTWARE UNIFIED)                 */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24 z-10">
        <div className="text-center mb-10 sm:mb-12">
          <Badge variant="emerald">PRODUCTION ARCHITECTURE BENCHMARK</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight leading-tight">
            High-Velocity Digital Storefronts &amp;{' '}
            <span className="italic text-[#00FC43]">
              Scalable Software Systems
            </span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Explore our production software dashboards, real-time analytics hubs, and high-velocity storefronts engineered for Bangladesh&apos;s leading enterprises.
          </p>
        </div>

        <div className="relative rounded-3xl p-1 sm:p-2 bg-gradient-to-b from-[#00FC43]/25 via-white/5 to-transparent shadow-[0_20px_70px_rgba(0,0,0,0.95)]">
          <TiltedGridHero
            images={WEB_SOFTWARE_SHOWCASE_IMAGES}
            speed={4.2}
            tileHeight={30}
            aspectRatio={16 / 10}
            gap={7}
            axis={50}
            curve={65}
            fade={12}
            className="h-[460px] sm:h-[540px] md:h-[600px] w-full rounded-[22px] border border-white/10 bg-[#050906] overflow-hidden"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 03: CUSTOM SOFTWARE DEVELOPMENT                                   */}
      {/* ========================================================================= */}
      <section id="section-software" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 relative z-10 scroll-mt-28">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#070c09]/95 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/20 text-[#00FC43] text-xs font-mono font-bold mb-3">
                <Code2 className="w-3.5 h-3.5" /> CUSTOM SOFTWARE ENGINEERING
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Custom Software &amp; Enterprise Systems
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
                Scalable relational database architecture, automated operational workflows, and bespoke software systems with 100% source code ownership.
              </p>
            </div>

            {/* SELECTION CONTROLS (Apple-Model Structured) */}
            <AppleSegmentedControl
              activeId={softwareChoice}
              onChange={setSoftwareChoice}
              layoutId="pricing-software-segment"
              options={[
                {
                  id: 'packages',
                  label: 'Architecture Packages',
                  shortLabel: 'Packages',
                  icon: Cpu,
                },
                {
                  id: 'catalogue',
                  label: 'Business Solutions Catalogue',
                  shortLabel: 'Catalogue',
                  icon: Database,
                },
              ]}
            />
          </div>

          {/* Key Estimation Factors Box */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#07130b] via-[#050e08] to-[#07130b] border border-[#00FC43]/20">
            <span className="text-xs font-mono font-bold text-[#00FC43] uppercase tracking-wider block mb-3">
              KEY FACTORS IN SOFTWARE ESTIMATION
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <strong className="text-white block font-bold mb-1">1. Functional Modules</strong>
                <span className="text-neutral-400">Inventory, billing, CRM, payroll, or ledger systems.</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <strong className="text-white block font-bold mb-1">2. Business Logic</strong>
                <span className="text-neutral-400">Automated calculation rules and approval chains.</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <strong className="text-white block font-bold mb-1">3. Third-Party APIs</strong>
                <span className="text-neutral-400">Payment gateways, SMS dispatch, or courier logistics.</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <strong className="text-white block font-bold mb-1">4. Role-Based Access (RBAC)</strong>
                <span className="text-neutral-400">Granular permissions for admins, managers, and staff.</span>
              </div>
            </div>
          </div>

          {/* Render Active Software Choice */}
          <div className="pt-8 sm:pt-10">
            {softwareChoice === 'packages' ? (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 sm:mb-10 px-1">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00FC43] shadow-[0_0_10px_#00FC43]" />
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Software Architecture Packages
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      Essential • Professional • Advanced
                    </span>
                    <span className="text-xs font-mono text-[#00FC43] bg-[#00FC43]/10 px-3 py-1 rounded-full border border-[#00FC43]/20 font-semibold">
                      100% One-Time Investment
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch pt-4 sm:pt-6">
                  {SOFTWARE_PACKAGES.map((plan) => (
                    <PricingCard
                      key={plan.id}
                      plan={plan}
                      onOpenPurchaseModal={(pkg) => setActivePurchasePackage(pkg)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6 px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00FC43] shadow-[0_0_10px_#00FC43]" />
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Business Software Solutions Catalogue
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#00FC43] bg-[#00FC43]/10 px-3 py-1 rounded-full border border-[#00FC43]/20">
                    Click to Select &amp; Review Solution
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 pt-4">
                  {SOFTWARE_SOLUTIONS_CATALOGUE.map((solution) => {
                    const isSelected = selectedSoftwareSolutionId === solution.id;
                    return (
                      <div
                        key={solution.id}
                        onClick={() => setSelectedSoftwareSolutionId(solution.id)}
                        className={clsx(
                          'group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 backdrop-blur-2xl cursor-pointer select-none overflow-hidden',
                          isSelected
                            ? 'border-2 border-[#00FC43] shadow-[0_20px_50px_rgba(0,0,0,0.96),0_0_40px_rgba(0,252,67,0.35),0_0_20px_rgba(245,158,11,0.20),inset_1.5px_1.5px_2px_rgba(255,255,255,0.6),inset_0_0_30px_rgba(0,252,67,0.18)] -translate-y-1 scale-[1.02] z-20'
                            : 'border border-emerald-500/25 hover:border-emerald-400/70 shadow-[0_15px_45px_rgba(0,0,0,0.92),inset_1.5px_1.5px_2px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(0,252,67,0.12),inset_-1px_-1px_15px_rgba(0,210,255,0.06)] hover:-translate-y-1.5 hover:shadow-[0_25px_55px_rgba(0,0,0,0.98),0_0_35px_rgba(0,252,67,0.28)] z-10'
                        )}
                      >
                        {/* 3-Sided Asymmetric Glass Lighting Background Layer */}
                        <div
                          className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none -z-10"
                          style={{
                            background: isSelected
                              ? 'radial-gradient(circle at 10% 8%, rgba(0, 252, 67, 0.45) 0%, rgba(0, 252, 67, 0.15) 30%, transparent 58%), radial-gradient(circle at 92% 10%, rgba(255, 255, 255, 0.30) 0%, transparent 45%), radial-gradient(circle at 90% 90%, rgba(245, 158, 11, 0.22) 0%, transparent 55%), linear-gradient(145deg, rgba(16, 28, 20, 0.95) 0%, rgba(8, 15, 11, 0.98) 50%, rgba(3, 7, 5, 0.99) 100%)'
                              : 'radial-gradient(circle at 10% 8%, rgba(0, 252, 67, 0.35) 0%, rgba(16, 185, 129, 0.12) 28%, transparent 58%), radial-gradient(circle at 92% 10%, rgba(255, 255, 255, 0.25) 0%, transparent 45%), radial-gradient(circle at 90% 90%, rgba(6, 182, 212, 0.18) 0%, transparent 55%), linear-gradient(145deg, rgba(10, 24, 16, 0.92) 0%, rgba(6, 14, 10, 0.96) 50%, rgba(2, 6, 4, 0.99) 100%)',
                          }}
                        >
                          {/* Side 1: Top-Left Electric Volt Lime Flare */}
                          <div
                            className={clsx(
                              'absolute -top-20 -left-16 w-64 h-64 rounded-full blur-[85px] transition-all duration-500',
                              isSelected ? 'bg-[#00FC43]/40' : 'bg-[#00FC43]/25 group-hover:bg-[#00FC43]/35'
                            )}
                          />
                          {/* Side 2: Top-Right Specular Diamond-White / Cyan Rim Light */}
                          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-cyan-400/18 blur-[75px]" />
                          {/* Side 3: Bottom-Right Warm Amber / Gold Dusk Light */}
                          <div
                            className={clsx(
                              'absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-[80px] transition-all duration-500',
                              isSelected ? 'bg-amber-400/25' : 'bg-amber-400/15 group-hover:bg-amber-400/22'
                            )}
                          />
                        </div>

                        <div>
                          {/* Top Header Row with Frosted Icon Box & Price */}
                          <div className="flex items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={clsx(
                                  'w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-inner backdrop-blur-md',
                                  isSelected
                                    ? 'bg-[#00FC43]/20 border border-[#00FC43]/60 shadow-[0_0_20px_rgba(0,252,67,0.35)]'
                                    : 'bg-white/[0.06] border border-white/20 shadow-[0_0_15px_rgba(0,252,67,0.15)] group-hover:border-[#00FC43]/50'
                                )}
                              >
                                {renderSolutionIcon(solution.iconName)}
                              </div>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/25 text-[#00FC43] text-[10px] sm:text-[11px] font-mono font-bold tracking-wide">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] shadow-[0_0_6px_#00FC43] animate-pulse" />
                                BUSINESS SOLUTION
                              </span>
                            </div>

                            <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-right backdrop-blur-md">
                              <span className="text-[10px] font-mono text-neutral-400 block -mb-0.5 uppercase tracking-wider">Starts at</span>
                              <span className="text-xs sm:text-sm font-black text-white font-mono tracking-tight drop-shadow-sm">
                                {solution.startingPrice}
                              </span>
                            </div>
                          </div>

                          {/* Title & Bengali Subtitle */}
                          <div className="mb-3">
                            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center justify-between gap-2">
                              <span>{solution.title}</span>
                              {isSelected && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00FC43] text-[#041608] text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-[0_0_15px_#00FC43] shrink-0">
                                  ✓ Active
                                </span>
                              )}
                            </h4>
                            <p className="editorial-serif italic text-xs sm:text-sm text-[#00FC43] drop-shadow-[0_0_10px_rgba(0,252,67,0.3)] mt-0.5 font-normal">
                              {solution.bengaliTitle}
                            </p>
                          </div>

                          <p className="text-xs sm:text-sm text-neutral-300 mt-2 mb-5 leading-relaxed font-normal">
                            {solution.desc}
                          </p>

                          {/* 2-Column Glass Module Badges */}
                          <div className="pt-3.5 border-t border-white/10">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block mb-2.5">
                              Included Modules:
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                              {solution.modules.map((mod, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/8 hover:border-[#00FC43]/30 hover:bg-[#00FC43]/[0.05] transition-all"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00FC43] shrink-0 drop-shadow-[0_0_6px_#00FC43]" />
                                  <span className="text-xs font-mono font-medium text-neutral-200 truncate">{mod}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Footer CTA Button */}
                        <div className="pt-5 mt-5 border-t border-white/10">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSoftwareSolutionId(solution.id);
                              handleSolutionSelectForPurchase(solution);
                            }}
                            className={clsx(
                              'w-full py-3 px-5 rounded-xl font-extrabold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md min-h-[44px]',
                              isSelected
                                ? 'brand-glow-button text-[#041608] shadow-[0_0_30px_rgba(0,252,67,0.6)]'
                                : 'bg-white/5 hover:bg-[#00FC43] text-white hover:text-[#041608] border border-white/12 hover:border-[#00FC43]'
                            )}
                          >
                            <span>{isSelected ? '✓ Selected • Choose Package' : 'Select Solution'}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Dynamic Selection Summary Box */}
                {selectedSoftwareSolution && (
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#09180e] via-[#061009] to-[#040805] border border-[#00FC43]/50 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,252,67,0.15)] flex flex-col lg:flex-row lg:items-center justify-between gap-6 animate-fadeIn">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FC43]/15 text-[#00FC43] text-xs font-mono font-bold mb-2 border border-[#00FC43]/30">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>ACTIVE SELECTION</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {selectedSoftwareSolution.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                        {selectedSoftwareSolution.desc}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="text-xs font-mono font-bold text-[#00FC43] bg-[#00FC43]/10 px-3 py-1 rounded-full border border-[#00FC43]/25">
                          Starting Investment: {selectedSoftwareSolution.startingPrice}
                        </span>
                        <span className="text-xs font-mono text-neutral-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                          Estimated Delivery: 20–25 Business Days
                        </span>
                        <span className="text-xs font-mono text-neutral-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                          45 Days Bug Support
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleSolutionSelectForPurchase(selectedSoftwareSolution)}
                        className="brand-glow-button w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-bold text-[#041608] inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(0,252,67,0.5)] whitespace-nowrap"
                      >
                        <span>Choose {selectedSoftwareSolution.title}</span>
                        <ArrowRight className="w-4 h-4 font-bold" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openWhatsApp('pricing_software_summary', {
                            customMessage: `Hi TOTO Development, I would like to consult on the "${selectedSoftwareSolution.title}" software solution (${selectedSoftwareSolution.startingPrice}).`,
                          })
                        }
                        className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FaWhatsapp className="w-4 h-4 text-[#00FC43]" />
                        <span>Discuss on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 04: E-COMMERCE & WEB DEVELOPMENT                                  */}
      {/* ========================================================================= */}
      <section id="section-ecommerce" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 relative z-10 scroll-mt-28">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#070c09]/95 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/20 text-[#00FC43] text-xs font-mono font-bold mb-3">
                <ShoppingBag className="w-3.5 h-3.5" /> WEB &amp; COMMERCE PLATFORMS
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                High-Performance Web &amp; E-Commerce
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
                Modern Next.js and managed PostgreSQL platforms engineered for sub-second page loads, conversion rate optimization, and zero recurring platform lock-in.
              </p>
            </div>

            {/* SELECTION CONTROLS (Apple-Model Structured) */}
            <AppleSegmentedControl
              activeId={ecommerceChoice}
              onChange={setEcommerceChoice}
              layoutId="pricing-ecommerce-segment"
              options={[
                {
                  id: 'ecommerce',
                  label: 'Custom E-Commerce',
                  shortLabel: 'E-Commerce',
                  icon: ShoppingBag,
                },
                {
                  id: 'corporate',
                  label: 'Corporate Websites',
                  shortLabel: 'Corporate',
                  icon: Building2,
                },
                {
                  id: 'landing',
                  label: 'Landing Pages',
                  shortLabel: 'Landing',
                  icon: Rocket,
                },
                {
                  id: 'multivendor',
                  label: 'Multi-Vendor',
                  shortLabel: 'Multi-Vendor',
                  icon: Store,
                },
              ]}
            />
          </div>

          {/* Render Active Cards */}
          <div className="pt-8 sm:pt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 sm:mb-10 px-1">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FC43] shadow-[0_0_10px_#00FC43]" />
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {ecommerceChoice === 'ecommerce' && 'Custom E-Commerce Platforms'}
                  {ecommerceChoice === 'corporate' && 'Corporate & Business Websites'}
                  {ecommerceChoice === 'landing' && 'High-Conversion Landing Pages'}
                  {ecommerceChoice === 'multivendor' && 'Multi-Vendor Marketplaces'}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#00FC43] bg-[#00FC43]/10 px-3 py-1 rounded-full border border-[#00FC43]/20 font-semibold">
                100% One-Time Investment
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch pt-4 sm:pt-6">
              {(ecommerceChoice === 'ecommerce'
                ? ECOMMERCE_PLANS
                : ecommerceChoice === 'corporate'
                ? BUSINESS_WEBSITE_PLANS
                : ecommerceChoice === 'landing'
                ? LANDING_PAGE_PLANS
                : MULTIVENDOR_PLANS
              ).map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  onOpenPurchaseModal={(pkg) => setActivePurchasePackage(pkg)}
                />
              ))}
            </div>

            {/* Commerce Elite 12-Module Showcase (When E-Commerce is Selected) */}
            {ecommerceChoice === 'ecommerce' && (
              <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#040805] border border-white/10">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <Badge variant="subtle">ENTERPRISE CAPABILITIES</Badge>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    Commerce Elite: 12 Core Capabilities
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Pre-integrated enterprise features engineered for speed, reliability, and checkout conversion.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {COMMERCE_ELITE_12_FEATURES.map((feat) => (
                    <div key={feat.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-xs text-[#00FC43] font-bold">#{feat.id}</span>
                        <h4 className="text-sm font-bold text-white">{feat.title}</h4>
                      </div>
                      <p className="text-xs text-neutral-300 mb-2 leading-relaxed">{feat.benefit}</p>
                      <span className="text-[10px] font-mono text-[#00FC43] bg-[#00FC43]/10 px-2 py-0.5 rounded-full inline-block">
                        {feat.technicalAdvantage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
      {/* 06. EDUCATIONAL COMPARISON: BASIC VS TOTO DEVELOPMENT                     */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="text-center mb-12">
          <Badge variant="subtle">EVALUATION CRITERIA</Badge>
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
      {/* 07. UPGRADE PATH & ADD-ONS                                                */}
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
      {/* 08. COMPREHENSIVE PRICING & DEVELOPMENT FAQS                              */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 mb-28">
        <div className="text-center mb-12">
          <Badge variant="subtle">CLEAR ANSWERS</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Frequently Asked <span className="italic text-[#00FC43]">Questions</span>
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto mt-3">
            Clear information on domain registration, cloud hosting, source code ownership, and payment terms.
          </p>
        </div>

        <FAQAccordion items={DEV_PRICING_FAQS} />
      </section>

      {/* Package Purchase Modal */}
      {activePurchasePackage && (
        <PackagePurchaseModal
          isOpen={!!activePurchasePackage}
          onClose={() => setActivePurchasePackage(null)}
          packageData={activePurchasePackage}
        />
      )}

      {/* Contact / Consultation Modal */}
      <ContactModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultPlan={selectedPlanForModal}
      />
    </div>
  );
}
