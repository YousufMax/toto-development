'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Film,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Video,
  Sparkles,
  Scissors,
  Layers,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { Badge } from '@/components/Badge';
import { PricingCard } from '@/components/PricingCard';
import { ContactModal } from '@/components/ContactModal';
import { CardFanCarousel } from '@/components/ui/card-fan-carousel';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import { CommercialReelsShowcase } from '@/components/CommercialReelsShowcase';
import { ServiceWorkflow, WorkflowStep } from '@/components/ServiceWorkflow';
import { ServiceGuarantees, GuaranteeItem } from '@/components/ServiceGuarantees';
import { FAQAccordion } from '@/components/FAQAccordion';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';
import {
  BUSINESS_AD_PLANS,
  COMBO_PLANS,
  BANGLADESHI_CIRCULAR_TESTIMONIALS,
  VIDEO_MOTION_FAQS,
} from '@/lib/data';

const VIDEO_WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Scripting & Hook Strategy',
    bengaliTitle: 'সোশ্যাল হুক ও ভাইরাল স্ক্রিপ্ট প্রণয়ন',
    description: 'প্রথম ৩ সেকেন্ডের দৃষ্টি আকর্ষক হুক, অডিও বিট ও অডিয়েন্স সাইকোলজি মেনে স্ক্রিপ্ট চূড়ান্তকরণ।',
    icon: Film,
    duration: 'Day 1',
  },
  {
    step: '02',
    title: 'Dynamic Cut & Motion FX',
    bengaliTitle: 'কাটিং, সাউন্ড এফেক্টস ও ৩ডি ট্রানজিশন',
    description: 'গতিশীল কাটিং, কালার গ্রেডিং, কমার্শিয়াল সাউন্ড ইফেক্ট এবং কাস্টম মোশন গ্রাফিক্স সংযোজন।',
    icon: Scissors,
    duration: 'Days 2–3',
  },
  {
    step: '03',
    title: 'Subtitle & Polish Review',
    bengaliTitle: 'অ্যানিমেটেড সাবটাইটেল ও রিভিশন',
    description: 'ইংরেজি/বাংলা ট্রেন্ডি সাবটাইটেল, ব্র্যান্ড কালার টাইপোগ্রাফি এবং ক্লায়েন্ট রিভিউ রিভিশন।',
    icon: Sparkles,
    duration: 'Day 4',
  },
  {
    step: '04',
    title: '4K Multi-Format Export',
    bengaliTitle: 'সোশ্যাল ও অ্যাড-রেডি মাল্টি-রেশিও এক্সপোর্ট',
    description: 'সোশ্যাল মিডিয়ার জন্য 9:16 রিলস এবং ইউটিউব/টিভিডির জন্য 16:9 ক্রিস্টাল ক্লিয়ার 4K ফাইল ডেলিভারি।',
    icon: CheckCircle2,
    duration: 'Fast Delivery',
  },
];

const VIDEO_GUARANTEES: GuaranteeItem[] = [
  {
    icon: ShieldCheck,
    title: '100% Commercial Music Clearance',
    bengaliTitle: 'কপিরাইট মুক্ত লাইসেন্সড অডিও',
    description: 'মেটা ও ইউটিউবে কোনোদিন মিউজিক কপিরাইট স্ট্রাইক বা সাউন্ড মিউট হওয়ার ঝুঁকি থাকবে না।',
    highlightTag: 'Safe Monetization',
  },
  {
    icon: Sparkles,
    title: 'High-Retention Hook Crafting',
    bengaliTitle: 'অ্যালগরিদম-ফ্রেন্ডলি রিটেনশন',
    description: 'সোশ্যাল অ্যালগরিদমে ওয়াচ-টাইম বৃদ্ধি করতে প্রতি ফ্রেমে মনোযোগ ধরে রাখার কৌশল প্রয়োগ।',
    highlightTag: 'Viral Lift',
  },
  {
    icon: Video,
    title: 'Full Raw Assets & Project Files',
    bengaliTitle: 'প্রজেক্ট ফাইলের সম্পূর্ণ অধিকার',
    description: 'প্রিমিয়ার প্রো/আফটার ইফেক্টসের সমস্ত সোর্স প্রোজেক্ট ফাইল ও এক্সপোর্ট অ্যাসেটের পূর্ণ মালিকানা।',
    highlightTag: 'Full Rights',
  },
  {
    icon: CheckCircle2,
    title: 'Guaranteed Weekly Cadence',
    bengaliTitle: 'নিয়মিত সাপ্তাহিক ডেলিভারি শিডিউল',
    description: 'আপনার পেজের ধারাবাহিকতা বজায় রাখতে প্রতি সপ্তাহে নির্দিষ্ট দিনে ভিডিও ডেলিভারির অঙ্গীকার।',
    highlightTag: 'On-Schedule',
  },
];

export default function VideoMotionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Commercial Video & Motion');
  const { openWhatsApp } = useActiveWhatsApp();

  const videoTestimonials = BANGLADESHI_CIRCULAR_TESTIMONIALS;

  return (
    <div className="relative pt-36 md:pt-44 pb-24 overflow-hidden bg-[#050705]">
      {/* Ambient Spotlight */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#00FC43]/12 blur-[170px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 01. SERVICE HERO HEADER                                                   */}
      {/* ========================================================================= */}
      <section className="relative px-4 max-w-6xl mx-auto text-center mb-20">
        <Badge variant="emerald">05 / CREATIVE MEDIA</Badge>

        <h1 className="editorial-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white mt-6 tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Commercial Video Production {'&'} <br className="hidden sm:inline" />
          <span className="italic text-[#00FC43]">3D Motion Content Graphics</span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mt-6 leading-relaxed font-normal">
          Make your brand impossible to ignore. Viral short-form video reels, 3D animated CGI product teasers, and commercial-grade editing built for high retention and social conversion.
        </p>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-10">
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">82%</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Video Retention Rate</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">12M+</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Total Video Impressions</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">6.8%</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Average Click-Through (CTR)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#packages"
            className="brand-glow-button px-8 py-4 rounded-full text-sm font-bold text-[#041608] inline-flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(0,252,67,0.5)]"
          >
            <span>View Video Packages</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </a>

          <button
            type="button"
            onClick={() =>
              openWhatsApp(
                'video_motion_hero',
                'Hi TOTO Development, I would like to consult on Commercial Video Editing & Motion Graphics packages.'
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
      {/* 02. COMMERCIAL VIDEO REELS & MOTION SHOWREEL (3D GLASSY COVERFLOW)       */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl mx-auto px-4 mb-28">
        <CommercialReelsShowcase />
      </section>

      {/* ========================================================================= */}
      {/* 03. BUSINESS AD PACKAGES (CREATIVE ADS & MOTION VIDEO PACKAGES)           */}
      {/* ========================================================================= */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 relative">
        <div className="text-center mb-16">
          <Badge variant="emerald">BUSINESS AD PACKAGES • 20% DISCOUNT ACTIVE</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white mt-4 tracking-tight">
            Creative Ads {'&'}{' '}
            <span className="italic text-[#00FC43] drop-shadow-[0_0_30px_rgba(0,252,67,0.4)]">
              Motion Video Packages
            </span>
          </h2>

          {/* Bundle Highlight Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-5 px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <span className="text-sm sm:text-base font-bold text-white tracking-wide">Business Ad Packages</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43]" />
            <span className="text-xs sm:text-sm font-mono text-[#00FC43] font-semibold">Your Brand. Our Creativity. Better Presentation.</span>
          </div>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Professional commercial advertising requires strategic pacing, compelling hooks, and high-retention storytelling. Select from our three Creative Ads &amp; Motion Video retainer packages below.
          </p>
        </div>

        {/* Center Radiant Halo behind Featured Card */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[640px] bg-[#00FC43]/18 blur-[120px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-8 sm:pt-10">
          {BUSINESS_AD_PLANS.map((plan) => (
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
            For brands requiring both creative static assets and short-form video reels, our all-in-one growth retainers offer comprehensive social media coverage with dedicated production support.
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
      {/* 05. 4-STEP VIDEO PRODUCTION WORKFLOW                                      */}
      {/* ========================================================================= */}
      <ServiceWorkflow
        badgeText="PRODUCTION SPRINT ROADMAP"
        headingPrefix="How We Produce"
        headingHighlight="High-Retention Reels"
        subheading="From hook scripting to dynamic sound design and multi-ratio exports, our structured sprint delivers scroll-stopping engagement."
        steps={VIDEO_WORKFLOW_STEPS}
      />

      {/* ========================================================================= */}
      {/* 06. IRONCLAD RISK-FREE GUARANTEES                                         */}
      {/* ========================================================================= */}
      <ServiceGuarantees
        badgeText="PRODUCTION QUALITY SLA"
        headingPrefix="Risk-Free Standards &"
        headingHighlight="Video Guarantees"
        subheading="We eliminate video production friction with commercial audio licensing, raw project files, and reliable delivery cadences."
        guarantees={VIDEO_GUARANTEES}
      />

      {/* ========================================================================= */}
      {/* 07. CLIENT REVIEWS & VERIFIED PROOF                                       */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="text-center mb-12">
          <Badge variant="subtle">CREATIVE CLIENT REVIEWS</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Proven Results in <span className="italic text-[#00FC43]">Video {'&'} Motion</span>
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto mt-3">
            Real feedback from brand directors whose visual reels and packaging captivated thousands of buyers.
          </p>
        </div>

        <div className="bg-[#060a07] border border-[#00FC43]/20 rounded-3xl p-4 sm:p-10 flex justify-center items-center relative overflow-hidden shadow-2xl">
          <CircularTestimonials
            testimonials={videoTestimonials}
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
      {/* 08. OBJECTION-KILLER VIDEO MOTION FAQS                                    */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 mb-24 relative z-10">
        <div className="text-center mb-14">
          <Badge variant="emerald">QUESTIONS & CLARITY</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Frequently Asked <span className="italic text-[#00FC43]">Questions</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-4 font-light">
            Everything you need to know about our viral scripting, product footage requirements, music licensing, and monthly video retainers.
          </p>
        </div>

        <FAQAccordion items={VIDEO_MOTION_FAQS} />
      </section>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPlan={selectedPlan}
      />
    </div>
  );
}
