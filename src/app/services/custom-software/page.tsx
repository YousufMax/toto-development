'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import {
  Code2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Terminal,
  Database,
  Lock,
  Boxes,
  Receipt,
  Users,
  PackageCheck,
  UserCheck,
  Kanban,
  Utensils,
  GraduationCap,
  Building2,
  Cpu,
  Layers,
  FileText,
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  Server,
  Check,
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
  SOFTWARE_PACKAGES,
  SOFTWARE_SOLUTIONS_CATALOGUE,
  SoftwareSolutionItem,
  SECURITY_TIERS,
  BANGLADESHI_CIRCULAR_TESTIMONIALS,
  CUSTOM_SOFTWARE_FAQS,
} from '@/lib/data';
import { parseBengaliPrice } from '@/lib/utils';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';

const SOFTWARE_WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Architecture & Schema Mapping',
    bengaliTitle: 'সিস্টেম ডিজাইন ও ডাটাবেজ স্কিমা',
    description: 'আপনার বিজনেস রিকোয়ারমেন্টস বিশ্লেষণ, ইউজার রোল পারমিশন এবং রিলেশনাল ডাটাবেজ স্কিমা চূড়ান্তকরণ।',
    icon: Database,
    duration: 'Week 1',
  },
  {
    step: '02',
    title: 'Interactive UI/UX & Flow',
    bengaliTitle: 'ক্লিকেবল প্রোটোটাইপ ও রোল প্রিভিউ',
    description: 'অ্যাডমিন, ম্যানেজার ও সেলস স্টাফের জন্য দ্রুতগতির রেসপন্সিভ ড্যাশবোর্ড ইন্টারফেস তৈরি।',
    icon: Layers,
    duration: 'Week 2',
  },
  {
    step: '03',
    title: 'High-Concurrency Development',
    bengaliTitle: 'ক্লিন কোড ও সিকিউর এপিআই ইঞ্জিনিয়ারিং',
    description: 'Next.js, React ও PostgreSQL রিলেশনাল ক্লাউড ইঞ্জিনের সাথে মিলি-সেকেন্ড গতির ব্যাকএন্ড বিল্ড।',
    icon: Code2,
    duration: 'Weeks 3–4',
  },
  {
    step: '04',
    title: 'Staff Training & Code Handover',
    bengaliTitle: 'লাইভ সার্ভার লঞ্চ ও স্টাফ ট্রেনিং',
    description: 'ক্লাউড সার্ভার ডেপ্লয়মেন্ট, স্টাফ ট্রেনিং সেশন এবং ১০০% সোর্স কোড ও ডাটাবেজের সরাসরি হস্তান্তর।',
    icon: CheckCircle2,
    duration: 'Final Handover',
  },
];

const SOFTWARE_GUARANTEES: GuaranteeItem[] = [
  {
    icon: Code2,
    title: '100% Source Code Ownership',
    bengaliTitle: 'সম্পূর্ণ সোর্স কোডের মালিকানা',
    description: 'কোনো ভেন্ডর লক-ইন নেই—সম্পূর্ণ ক্লিন কমেন্টেড কোড ও ডাটাবেজ আপনার নিজস্ব গিটল্যাব/গিটহাবে পুশ করে দেওয়া হয়।',
    highlightTag: 'Full Rights',
  },
  {
    icon: ShieldCheck,
    title: '90-Day Free Bug Warranty',
    bengaliTitle: '৯০ দিনের ফ্রি প্রোডাকশন ওয়ারেন্টি',
    description: 'লাইভ প্রোডাকশনে কোনো বাগ বা ত্রুটি দেখা দিলে আমাদের ইঞ্জিনিয়াররা তাৎক্ষণিক সম্পূর্ণ বিনামূল্যে সমাধান করবে।',
    highlightTag: 'Zero Risk',
  },
  {
    icon: Zap,
    title: 'Sub-Second Response Latency',
    bengaliTitle: 'সাব-সেকেন্ড আল্ট্রা-ফাস্ট স্পিড',
    description: 'লাখ লাখ ট্রানজেকশনেও স্লো হবে না—অপ্টিমাইজড ইন্ডেক্সিং ও ক্লাউড কোয়েরি ক্যাশিং নিশ্চিত।',
    highlightTag: '<200ms',
  },
  {
    icon: Lock,
    title: 'Enterprise Cryptography & NDA',
    bengaliTitle: 'গোপনীয়তা চুক্তি ও এন্টারপ্রাইজ সিকিউরিটি',
    description: 'আইনি নন-ডিসক্লোজার এগ্রিমেন্ট (NDA) এবং ক্লায়েন্ট ডাটাবেজ সুরক্ষায় মাল্টি-লেয়ার রোল-বেসড এক্সেস।',
    highlightTag: 'NDA Protected',
  },
];

const SOFTWARE_GALLERY_IMAGES = [
  {
    src: '/portfolio-3d/3d-1.png',
    title: 'Custom Software & ERP',
    alt: 'Enterprise ERP & Multi-Branch Business Management System',
  },
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
    src: '/portfolio-3d/3d-2.png',
    title: 'Analytics & Reporting Hub',
    alt: 'Real-Time Enterprise Analytics & Financial Dashboard',
  },
  {
    src: '/portfolio-3d/3d-3.png',
    title: 'Inventory & Supply Chain',
    alt: 'Automated Multi-Warehouse Inventory Management',
  },
  {
    src: '/portfolio-3d/3d-9.png',
    title: 'Point of Sale (POS)',
    alt: 'High-Speed Cloud Point of Sale System',
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

export default function CustomSoftwarePage() {
  const { getDynamicWhatsAppUrl, openWhatsApp } = useActiveWhatsApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDefaultScope, setModalDefaultScope] = useState('Custom Software & ERP');
  const [activePurchasePackage, setActivePurchasePackage] = useState<PurchasePackageData | null>(null);

  // Functional Selection State for Ready Business Software
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(
    SOFTWARE_SOLUTIONS_CATALOGUE[0].id
  );

  const selectedSolution =
    SOFTWARE_SOLUTIONS_CATALOGUE.find((s) => s.id === selectedSolutionId) ||
    SOFTWARE_SOLUTIONS_CATALOGUE[0];

  const softwareTestimonial = BANGLADESHI_CIRCULAR_TESTIMONIALS;

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

  const handleSelectSolutionForPurchase = (solution: SoftwareSolutionItem) => {
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

  return (
    <div className="relative pt-36 md:pt-44 pb-24 overflow-hidden bg-[#050705]">
      {/* Ambient Spotlight */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#00FC43]/12 blur-[170px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 01. SERVICE HERO HEADER                                                   */}
      {/* ========================================================================= */}
      <section className="relative px-4 max-w-6xl mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/30 text-xs font-mono font-bold text-[#00FC43] uppercase mb-4 tracking-wider">
          <span>CUSTOM SOFTWARE ENGINEERING</span>
        </div>

        <h1 className="editorial-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white mt-4 tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Custom Software &amp; <br className="hidden sm:inline" />
          <span className="italic text-[#00FC43] drop-shadow-[0_0_30px_rgba(0,252,67,0.4)]">
            Enterprise Management Systems
          </span>
        </h1>

        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <span className="text-sm sm:text-base font-bold text-white tracking-wide">Premium Engineering. Smarter Investment.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43]" />
          <span className="text-xs sm:text-sm font-mono text-[#00FC43] font-semibold">PostgreSQL Relational DB • 100% Source Code Ownership</span>
        </div>

        <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto mt-6 leading-relaxed font-normal">
          Accelerate business operations and eliminate spreadsheet chaos. We build high-concurrency relational databases, secure APIs, and custom software systems tailored specifically to your unique workflow.
        </p>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-10">
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">3.5×</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Operational Speed Lift</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">100%</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Data Consistency</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">25 hrs/wk</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Manual Staff Time Saved</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#packages"
            className="brand-glow-button px-8 py-4 rounded-full text-sm font-bold text-[#041608] inline-flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(0,252,67,0.5)]"
          >
            <span>Explore Software Packages</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </a>

          <a
            href={getDynamicWhatsAppUrl(
              'Hi TOTO Development, I am interested in building a Custom Software or ERP solution for my business.'
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
            images={SOFTWARE_GALLERY_IMAGES}
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
      {/* 02. SOFTWARE ESTIMATION FACTORS                                           */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#08100b] border border-[#00FC43]/20 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00FC43] font-bold block mb-2">
              TRANSPARENT ESTIMATION LOGIC
            </span>
            <h2 className="editorial-serif text-2xl sm:text-4xl font-normal text-white tracking-tight leading-snug">
              Software Pricing Depends on Complexity, <br />
              <span className="italic text-[#00FC43]">Not Simply the Number of Pages.</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base mt-4 leading-relaxed font-light">
              Unlike simple informational websites, software pricing is determined by functional complexity, database architecture, and integration requirements across four key technical criteria:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 pt-8 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="w-7 h-7 rounded-lg bg-[#00FC43]/10 text-[#00FC43] font-bold text-xs flex items-center justify-center font-mono mb-3">01</span>
              <h3 className="text-sm font-bold text-white">Business Modules</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Scope of inventory, billing, sales pipeline, payroll, or ledger accounting systems.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="w-7 h-7 rounded-lg bg-[#00FC43]/10 text-[#00FC43] font-bold text-xs flex items-center justify-center font-mono mb-3">02</span>
              <h3 className="text-sm font-bold text-white">Business Logic</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Custom discount calculations, automated commission structures, and multi-tier approval chains.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="w-7 h-7 rounded-lg bg-[#00FC43]/10 text-[#00FC43] font-bold text-xs flex items-center justify-center font-mono mb-3">03</span>
              <h3 className="text-sm font-bold text-white">API Integrations</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Payment gateways, SMS notification dispatch, courier logistics APIs, or biometric scanners.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="w-7 h-7 rounded-lg bg-[#00FC43]/10 text-[#00FC43] font-bold text-xs flex items-center justify-center font-mono mb-3">04</span>
              <h3 className="text-sm font-bold text-white">User Roles (RBAC)</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Granular permission matrix for administrators, branch managers, cashiers, and accountants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. FIXED SOFTWARE PACKAGES                                               */}
      {/* ========================================================================= */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 relative">
        <div className="text-center mb-14">
          <Badge variant="emerald">APPROVED PRICING • 20% PROMOTIONAL DISCOUNT</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Fixed Scope <span className="italic text-[#00FC43]">Software Architecture</span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed font-normal">
            Clearly defined deliverables, milestone-based billing, zero hidden fees, and complete source code ownership.
          </p>
        </div>

        {/* Center Radiant Halo behind Featured Card */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[640px] bg-[#00FC43]/18 blur-[120px] pointer-events-none -z-10" />

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch pt-8 sm:pt-10">
          {SOFTWARE_PACKAGES.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onOpenPurchaseModal={(pkg) => setActivePurchasePackage(pkg)}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. READY BUSINESS SOFTWARE SOLUTIONS (FUNCTIONAL INTERACTIVE SELECTOR)   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="text-center mb-14">
          <Badge variant="subtle">INDUSTRY-SPECIFIC MODULES</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Business Software <span className="italic text-[#00FC43]">Solutions Catalogue</span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Modular software architectures built for specific industry workflows. Select any solution below to inspect details and request implementation.
          </p>
        </div>

        {/* Interactive Grid of Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 pt-4">
          {SOFTWARE_SOLUTIONS_CATALOGUE.map((solution) => {
            const isSelected = selectedSolutionId === solution.id;
            return (
              <div
                key={solution.id}
                onClick={() => setSelectedSolutionId(solution.id)}
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
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center justify-between gap-2">
                      <span>{solution.title}</span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00FC43] text-[#041608] text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-[0_0_15px_#00FC43] shrink-0">
                          ✓ Active
                        </span>
                      )}
                    </h3>
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
                      setSelectedSolutionId(solution.id);
                      handleSelectSolutionForPurchase(solution);
                    }}
                    className={clsx(
                      'w-full py-3 px-5 rounded-xl font-extrabold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md min-h-[44px]',
                      isSelected
                        ? 'brand-glow-button text-[#041608] shadow-[0_0_30px_rgba(0,252,67,0.6)]'
                        : 'bg-white/5 hover:bg-[#00FC43] text-white hover:text-[#041608] border border-white/12 hover:border-[#00FC43]'
                    )}
                  >
                    <span>{isSelected ? '✓ Selected • Click to Proceed' : 'Select Solution'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Selection Summary Card */}
        {selectedSolution && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#09180e] via-[#061009] to-[#040805] border border-[#00FC43]/50 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,252,67,0.15)] flex flex-col lg:flex-row lg:items-center justify-between gap-6 animate-fadeIn">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FC43]/15 text-[#00FC43] text-xs font-mono font-bold mb-2 border border-[#00FC43]/30">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>ACTIVE SELECTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {selectedSolution.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                {selectedSolution.desc}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-xs font-mono font-bold text-[#00FC43] bg-[#00FC43]/10 px-3 py-1 rounded-full border border-[#00FC43]/25">
                  Starting Investment: {selectedSolution.startingPrice}
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
                onClick={() => handleSelectSolutionForPurchase(selectedSolution)}
                className="brand-glow-button w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-bold text-[#041608] inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(0,252,67,0.5)] whitespace-nowrap"
              >
                <span>Proceed with {selectedSolution.title}</span>
                <ArrowRight className="w-4 h-4 font-bold" />
              </button>

              <button
                type="button"
                onClick={() =>
                  openWhatsApp('software_solution_summary', {
                    customMessage: `Hi TOTO Development, I would like to consult on the "${selectedSolution.title}" solution (${selectedSolution.startingPrice}).`,
                  })
                }
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaWhatsapp className="w-4 h-4 text-[#00FC43]" />
                <span>Consult on WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 05. BESPOKE ENTERPRISE ARCHITECTURE                                       */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0b1710] via-[#07100b] to-[#040805] border border-[#00FC43]/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00FC43] font-bold block mb-2">
              BESPOKE ARCHITECTURE
            </span>
            <h3 className="editorial-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Need Custom Enterprise Software or Large-Scale ERP?
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm mt-3 leading-relaxed">
              If your business requirements exceed fixed-scope packages or involve complex operational pipelines, book a technical discovery sprint with our senior software architects. We will author an exhaustive Software Requirements Specification (SRS) and delivery proposal.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                setModalDefaultScope('Custom Enterprise Software / ERP');
                setIsModalOpen(true);
              }}
              className="brand-glow-button w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-bold text-[#041608] inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(0,252,67,0.5)] whitespace-nowrap"
            >
              <span>Schedule Architecture Sprint</span>
              <ArrowRight className="w-4 h-4 font-bold" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. SECURITY & DATA INTEGRITY                                             */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="text-center mb-14">
          <Badge variant="emerald">RESPONSIBLE ENGINEERING</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Enterprise Security &amp; <br className="hidden sm:inline" />
            <span className="italic text-[#00FC43]">Data Integrity Standards</span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            We enforce cryptographic standards, strict role-based access, and isolated database clusters to protect your mission-critical operations.
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
      {/* 07. 4-PHASE SOFTWARE ENGINEERING ROADMAP                                  */}
      {/* ========================================================================= */}
      <ServiceWorkflow
        badgeText="SOFTWARE ENGINEERING SPRINT"
        headingPrefix="How We Architect &"
        headingHighlight="Deploy Software"
        subheading="A rigorous 4-phase agile delivery roadmap ensuring relational integrity, role security, and zero production regressions."
        steps={SOFTWARE_WORKFLOW_STEPS}
      />

      {/* ========================================================================= */}
      {/* 08. IRONCLAD RISK-FREE SOFTWARE GUARANTEES                                */}
      {/* ========================================================================= */}
      <ServiceGuarantees
        badgeText="TOTO ENGINEERING COMMITMENT"
        headingPrefix="Enterprise SLAs &"
        headingHighlight="Client Guarantees"
        subheading="We protect your core operations with 100% source code handover, 90-day bug warranty, and sub-second database performance."
        guarantees={SOFTWARE_GUARANTEES}
      />

      {/* ========================================================================= */}
      {/* 09. CLIENT REVIEWS & VERIFIED PROOF                                       */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="text-center mb-12">
          <Badge variant="subtle">CLIENT VERIFICATION</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Proven Results in <span className="italic text-[#00FC43]">Custom Software</span>
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto mt-3">
            Real feedback from enterprise directors whose daily operational workflows run reliably on our platforms.
          </p>
        </div>

        <div className="bg-[#060a07] border border-[#00FC43]/20 rounded-3xl p-4 sm:p-10 flex justify-center items-center relative overflow-hidden shadow-2xl">
          <CircularTestimonials
            testimonials={softwareTestimonial}
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
      {/* 10. OBJECTION-KILLER CUSTOM SOFTWARE FAQS                                 */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 mb-24 relative z-10">
        <div className="text-center mb-14">
          <Badge variant="emerald">QUESTIONS & CLARITY</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Frequently Asked <span className="italic text-[#00FC43]">Questions</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-4 font-light">
            Everything you need to know about code ownership, database migration, staff training, and post-launch technical support.
          </p>
        </div>

        <FAQAccordion items={CUSTOM_SOFTWARE_FAQS} />
      </section>

      {/* Package Purchase Modal */}
      {activePurchasePackage && (
        <PackagePurchaseModal
          isOpen={!!activePurchasePackage}
          onClose={() => setActivePurchasePackage(null)}
          packageData={activePurchasePackage}
        />
      )}

      {/* Custom Quote / Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPlan={modalDefaultScope}
      />
    </div>
  );
}
