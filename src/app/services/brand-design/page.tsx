'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Palette,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  Eye,
  RefreshCw,
  FileCheck,
  HeartHandshake,
  Award,
  Lock,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { Badge } from '@/components/Badge';
import { PricingCard } from '@/components/PricingCard';
import { ContactModal } from '@/components/ContactModal';
import { CardFanCarousel } from '@/components/ui/card-fan-carousel';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import { ServiceWorkflow, WorkflowStep } from '@/components/ServiceWorkflow';
import { ServiceGuarantees, GuaranteeItem } from '@/components/ServiceGuarantees';
import { FAQAccordion } from '@/components/FAQAccordion';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';
import {
  GRAPHIC_DESIGN_PLANS,
  COMBO_PLANS,
  BANGLADESHI_CIRCULAR_TESTIMONIALS,
  BRAND_DESIGN_SHOWCASE_CARDS,
  BRAND_DESIGN_FAQS,
} from '@/lib/data';

const BRAND_WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Creative Brief & Discovery',
    bengaliTitle: 'কৌশলগত ব্রিফিং ও অডিয়েন্স বিশ্লেষণ',
    description: 'আপনার ব্র্যান্ডের অনন্য বৈশিষ্ট্য, লক্ষ্যমাত্রা ও প্রতিযোগী ব্র‍্যান্ড বিশ্লেষণ করে ডিজাইন গাইডলাইন নির্ধারণ।',
    icon: Palette,
    duration: 'Day 1',
  },
  {
    step: '02',
    title: 'Visual Concepts & 3D Draft',
    bengaliTitle: 'মুডবোর্ড ও প্রাথমিক ৩ডি ড্রাফট',
    description: 'কালার প্যালেট, টাইপোগ্রাফি টোকেন ও ফোটোরিয়ালিস্টিক 3D কমার্শিয়াল কনসেপ্ট প্রস্তুত ও শেয়ার।',
    icon: Sparkles,
    duration: 'Days 2–3',
  },
  {
    step: '03',
    title: 'Collaborative Refinement',
    bengaliTitle: 'ফিডব্যাক অনুযায়ী পারফেক্ট রিভিশন',
    description: 'আপনার ফিডব্যাক ও মন্তব্য অনুসারে নিখুঁত সমন্বয়—সন্তুষ্ট না হওয়া পর্যন্ত ফাইনাল পলিশ।',
    icon: RefreshCw,
    duration: 'Days 4–5',
  },
  {
    step: '04',
    title: 'Commercial Assets Handover',
    bengaliTitle: 'প্রেস-রেডি ও সোর্স ফাইল হস্তান্তর',
    description: 'প্রিন্ট-রেডি CMYK ফাইল, সম্পূর্ণ ভেক্টর সোর্স ফাইল (AI, PSD, SVG) এবং 4K 3D রেন্ডার ডেলিভারি।',
    icon: FileCheck,
    duration: 'Final Delivery',
  },
];

const BRAND_GUARANTEES: GuaranteeItem[] = [
  {
    icon: HeartHandshake,
    title: '100% Satisfaction SLA',
    bengaliTitle: 'পরিপূর্ণ সন্তুষ্টি নিশ্চয়তা',
    description: 'আপনার ব্র্যান্ডের প্রত্যাশিত মান অর্জন না হওয়া পর্যন্ত রিভিশন সহায়তা অব্যাহত থাকে।',
    highlightTag: 'Zero Risk',
  },
  {
    icon: Award,
    title: '100% Human Craftsmanship',
    bengaliTitle: 'মৌলিক ও ইউনিক ডিজাইন',
    description: 'কোনো রোবোটিক বা কপি-পেস্ট এআই টেমপ্লেট নয়—প্রতিটি ডিজাইন এক্সক্লুসিভলি আপনার ব্র্যান্ডের জন্য নির্মিত।',
    highlightTag: 'Originality',
  },
  {
    icon: Lock,
    title: 'Full Commercial Ownership',
    bengaliTitle: 'সোর্স ফাইলের পূর্ণ মালিকানা',
    description: 'সব কপিরাইট, ভেক্টর সোর্স ফাইল ও কমার্শিয়াল ব্যবহারের আইনি স্বত্ব ১০০% আপনার প্রতিষ্ঠানের।',
    highlightTag: '100% Yours',
  },
  {
    icon: ShieldCheck,
    title: 'On-Time Milestone Delivery',
    bengaliTitle: 'নির্ধারিত সময়ে নিশ্চিত ডেলিভারি',
    description: 'বিজ্ঞাপনী ও প্রোডাক্ট লঞ্চ শিডিউল বজায় রাখতে লিখিত ডেলিভারি টাইমলাইন শতভাগ মেনে চলা হয়।',
    highlightTag: 'Guaranteed',
  },
];

export default function BrandDesignPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Brand Design & 3D Packaging');
  const { openWhatsApp } = useActiveWhatsApp();

  const designTestimonials = BANGLADESHI_CIRCULAR_TESTIMONIALS;

  return (
    <div className="relative pt-36 md:pt-44 pb-24 overflow-hidden bg-[#050705]">
      {/* Ambient Spotlight */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#00FC43]/12 blur-[170px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 01. SERVICE HERO HEADER                                                   */}
      {/* ========================================================================= */}
      <section className="relative px-4 max-w-6xl mx-auto text-center mb-20">
        <Badge variant="emerald">06 / BRAND ARCHITECTURE</Badge>

        <h1 className="editorial-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white mt-6 tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Brand Visual Identity & <br className="hidden sm:inline" />
          <span className="italic text-[#00FC43]">3D Commercial FMCG Packaging</span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mt-6 leading-relaxed font-normal">
          Look different, stay memorable. High-fashion editorial design systems, distinctive logos, typography tokens, and photorealistic 3D FMCG packaging renders that captivate retail buyers.
        </p>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-10">
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">+260%</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Brand Recognition Lift</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">150+</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Assets & Mockups Delivered</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">100%</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Design System Consistency</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#packages"
            className="brand-glow-button px-8 py-4 rounded-full text-sm font-bold text-[#041608] inline-flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(0,252,67,0.5)]"
          >
            <span>View Design Packages</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </a>

          <button
            type="button"
            onClick={() =>
              openWhatsApp(
                'brand_design_hero',
                'Hi TOTO Development, I would like to consult on Brand Visual Identity & 3D Packaging packages.'
              )
            }
            className="px-7 py-4 rounded-full text-sm font-semibold text-white bg-white/5 border border-white/15 hover:border-[#00FC43]/50 hover:bg-[#00FC43]/10 transition-all backdrop-blur-md inline-flex items-center gap-2 cursor-pointer"
          >
            <FaWhatsapp className="w-4 h-4 text-[#00FC43]" />
            <span>Consult on WhatsApp</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. CREATIVE BRAND DESIGN & VISUAL SYSTEMS (FAN CAROUSEL)                 */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl mx-auto px-4 mb-28">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <Badge variant="subtle">3D VISUAL SHOWCASE</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Creative Brand Design &{' '}
            <span className="italic text-[#00FC43]">Visual Systems</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto font-light leading-relaxed">
            Every breakthrough software ecosystem and consumer product deserves an iconic identity. Explore our bespoke 3D packaging mockups, commercial FMCG advertising campaigns, luxury cosmetics CGI, and high-conversion brand design systems.
          </p>
        </div>

        <CardFanCarousel cards={BRAND_DESIGN_SHOWCASE_CARDS} />
      </section>

      {/* ========================================================================= */}
      {/* 03. OUR CREATIVE PACKAGES (আমাদের প্যাকেজসমূহ)                             */}
      {/* ========================================================================= */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 relative">
        <div className="text-center mb-16">
          <Badge variant="emerald">TOTO DEVELOPMENT • MONTHLY CREATIVE DESIGN PACKAGES</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Monthly Creative <span className="italic text-[#00FC43]">Design Packages</span>
          </h2>
          <div className="inline-flex flex-wrap items-center justify-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <span className="text-xs sm:text-sm font-bold text-white">100% Human-Created Unique Designs</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43]" />
            <span className="text-xs sm:text-sm font-mono text-[#00FC43] font-semibold">No AI-Generated Creatives</span>
          </div>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Professional monthly retainer plans designed to maintain visual consistency and elevate brand presence across digital channels.
          </p>
        </div>

        {/* Center Radiant Halo behind আস্থা (Most Popular) */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[640px] bg-[#00FC43]/18 blur-[120px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch pt-8 sm:pt-10">
          {GRAPHIC_DESIGN_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. ALL-IN-ONE DESIGN & VIDEO COMBO PACKAGES                              */}
      {/* ========================================================================= */}
      <section id="combo-packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 relative">
        <div className="text-center mb-16">
          <Badge variant="subtle">ALL-IN-ONE SOLUTION • 20% DISCOUNT ACTIVE</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white mt-4 tracking-tight">
            Design & Video <span className="italic text-[#00FC43] drop-shadow-[0_0_30px_rgba(0,252,67,0.4)]">Combo Packages</span>
          </h2>

          {/* Bundle Highlight Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-5 px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <span className="text-sm sm:text-base font-bold text-white tracking-wide">Design + Video Reels All-In-One</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43]" />
            <span className="text-xs sm:text-sm font-mono text-[#00FC43] font-semibold">রুপালীকা • সোনালীকা • অগ্রযাত্রা</span>
          </div>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            For ambitious brands requiring dynamic short-form video reels alongside brand design, choose our integrated monthly growth retainers.
          </p>
        </div>

        {/* Center Radiant Halo behind Featured Card */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[640px] bg-[#00FC43]/18 blur-[120px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-8 sm:pt-10">
          {COMBO_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. 4-STEP WORKING WORKFLOW                                               */}
      {/* ========================================================================= */}
      <ServiceWorkflow
        badgeText="TRANSPARENT CREATIVE ROADMAP"
        headingPrefix="How We Deliver"
        headingHighlight="Iconic Brand Assets"
        subheading="A disciplined 4-phase creative sprint designed for speed, revision transparency, and commercial market impact."
        steps={BRAND_WORKFLOW_STEPS}
      />

      {/* ========================================================================= */}
      {/* 06. IRONCLAD RISK-FREE GUARANTEES                                         */}
      {/* ========================================================================= */}
      <ServiceGuarantees
        badgeText="TOTO QUALITY COMMITMENT"
        headingPrefix="Risk-Free Standards &"
        headingHighlight="Client Guarantees"
        subheading="We remove all guesswork with clear commercial rights, full source files, and a relentless commitment to brand perfection."
        guarantees={BRAND_GUARANTEES}
      />

      {/* ========================================================================= */}
      {/* 07. CLIENT REVIEWS & VERIFIED PROOF                                       */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="text-center mb-12">
          <Badge variant="subtle">BRANDING CLIENT REVIEWS</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Proven Results in <span className="italic text-[#00FC43]">Brand Design & 3D</span>
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto mt-3">
            Real feedback from brand founders whose visual identity and packaging achieved immediate retail recognition.
          </p>
        </div>

        <div className="bg-[#060a07] border border-[#00FC43]/20 rounded-3xl p-4 sm:p-10 flex justify-center items-center relative overflow-hidden shadow-2xl">
          <CircularTestimonials
            testimonials={designTestimonials}
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
      {/* 08. OBJECTION-KILLER BRAND DESIGN FAQS                                    */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 mb-24 relative z-10">
        <div className="text-center mb-14">
          <Badge variant="emerald">QUESTIONS & CLARITY</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Frequently Asked <span className="italic text-[#00FC43]">Questions</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-4 font-light">
            Everything you need to know about our design revisions, source file deliverables, commercial 3D renders, and monthly retainers.
          </p>
        </div>

        <FAQAccordion items={BRAND_DESIGN_FAQS} />
      </section>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPlan={selectedPlan}
      />
    </div>
  );
}
