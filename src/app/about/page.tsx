'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe2,
  Check,
  X as XIcon,
  Award,
  Terminal,
  Cpu,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '@/components/Badge';
import { StatsCounter } from '@/components/StatsCounter';
import { FAQAccordion } from '@/components/FAQAccordion';
import { ContactModal } from '@/components/ContactModal';
import { Team } from '@/components/ui/team';
import { FAQS_LIST, SITE_CONFIG } from '@/lib/data';

export default function AboutPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const JOURNEY_STEPS = [
    {
      year: '2021',
      title: 'Studio Founding',
      location: 'Khulna',
      desc: 'Founded with a core mission: build high-speed websites, reliable software, and distinct brand designs that drive real business growth.',
    },
    {
      year: '2022',
      title: 'Custom Software & ERP',
      location: 'Khulna HQ',
      desc: 'Expanded into bespoke business management software, inventory tracking systems, and sub-200ms e-commerce platforms.',
    },
    {
      year: '2023',
      title: 'Performance Marketing & Ads',
      location: 'Khulna HQ',
      desc: 'Launched specialized Meta & Google Ads pods, delivering verified 5.2× average ROAS and high-intent inbound acquisition.',
    },
    {
      year: '2024',
      title: 'Creative 3D Studio & Video Lab',
      location: 'Khulna Studio',
      desc: 'Expanded our creative production studio in Khulna specializing in commercial video reels and photorealistic 3D FMCG packaging mockups.',
    },
    {
      year: '2025+',
      title: 'Integrated Full-Service Agency',
      location: 'Khulna Headquarters',
      desc: 'Unified team across software development, web engineering, digital marketing, paid ads, video production, and brand design under one roof.',
    },
  ];

  const CORE_VALUES = [
    {
      number: '01',
      title: 'Architectural Rigor',
      tagline: 'Zero shortcuts in code or design.',
      desc: 'We never copy-paste fragile boilerplates. Every interface, database index, and API contract is crafted to withstand millions of requests with sub-second performance.',
      icon: Terminal,
    },
    {
      number: '02',
      title: 'Commercial Transparency',
      tagline: 'No bloated retainers. Fixed milestones.',
      desc: 'Clear scope, weekly staging builds you can test directly, and 100% intellectual property ownership from day one. You own all code, repositories, and design systems.',
      icon: ShieldCheck,
    },
    {
      number: '03',
      title: 'Compounding Business Impact',
      tagline: 'Code engineered to grow revenue.',
      desc: 'Technology is not an overhead expense; it is a growth engine. Every feature we ship is measured against real conversion lift, retention, and operational speed.',
      icon: TrendingUp,
    },
  ];

  const FOUR_STEP_PROCESS = [
    {
      step: '01',
      name: 'Architectural Discovery',
      duration: 'Week 1',
      desc: 'We dissect your technical requirements, API dependencies, database schemas, and business targets to assemble a detailed technical blueprint.',
    },
    {
      step: '02',
      name: 'Design & Motion Tokens',
      duration: 'Weeks 2–3',
      desc: 'Full high-fidelity Figma design system and GSAP animation prototypes matching our editorial serif and glassmorphism design standard.',
    },
    {
      step: '03',
      name: 'Full-Stack Engineering',
      duration: 'Weeks 3–5',
      desc: 'Clean Next.js, TypeScript, and microservice implementation with automated CI/CD pipelines, strict typing, and end-to-end integration tests.',
    },
    {
      step: '04',
      name: 'Zero-Downtime Launch & SLA',
      duration: 'Week 6+',
      desc: 'Multi-region edge deployment, DNS propagation, Lighthouse 98+ performance tuning, and 60 days of guaranteed warranty and support.',
    },
  ];

  const COMPARISON = [
    {
      factor: 'Intellectual Property Ownership',
      traditional: 'Often held in proprietary agency accounts',
      toto: '100% code & asset ownership handed over in GitHub',
    },
    {
      factor: 'Technology Architecture',
      traditional: 'Bloated WordPress / drag-and-drop templates',
      toto: 'Custom Next.js, TypeScript & enterprise cloud microservices',
    },
    {
      factor: 'Animation & User Experience',
      traditional: 'Generic off-the-shelf CSS plugins',
      toto: 'Custom GSAP motion choreography & editorial luxury design',
    },
    {
      factor: 'Pricing & Scope Structure',
      traditional: 'Vague hourly retainers with endless budget creep',
      toto: 'Predictable, fixed-scope milestone deliverables',
    },
    {
      factor: 'Post-Launch Warranty',
      traditional: 'Additional hourly billing for bug fixes',
      toto: '30 to 60 days included warranty & dedicated architect support',
    },
  ];

  return (
    <div className="relative pt-36 md:pt-44 pb-24 overflow-hidden">
      {/* ========================================================================= */}
      {/* 01. ABOUT HERO                                                            */}
      {/* ========================================================================= */}
      <section className="relative px-4 max-w-6xl mx-auto text-center mb-24">
        <Badge variant="emerald">ABOUT TOTO DEVELOPMENT</Badge>

        <h1 className="editorial-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-white mt-6 tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Engineering the <br className="hidden sm:inline" />
          <span className="editorial-serif italic font-normal text-[#00FC43]">Digital Foundations</span>{' '}
          for Modern Enterprise Scale
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto mt-6 leading-relaxed font-normal">
          Founded on the conviction that digital solutions must directly compound commercial value. We are an
          integrated digital agency uniting software engineers, web architects, performance marketers, video creators, and 3D brand designers operating from our headquarters in Sonadanga, Khulna.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="brand-glow-button px-8 py-3.5 rounded-full text-sm font-bold text-[#041608] inline-flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(0,252,67,0.5)]"
          >
            <span>Book a strategy consultation</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </button>

          <Link
            href="/services/"
            className="px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-white/5 border border-white/15 hover:border-[#00FC43]/50 hover:bg-[#00FC43]/10 transition-all backdrop-blur-md"
          >
            View our capabilities →
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. STATS ROW                                                             */}
      {/* ========================================================================= */}
      <section className="relative bg-[#080d09] border-y border-[#00FC43]/20 py-16 px-4 mb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10 text-center">
          <StatsCounter
            value={80}
            suffix="+"
            label="Projects Delivered"
            sublabel="Software, Web & Creative"
            tag="Proven Delivery"
          />
          <StatsCounter
            value={5.2}
            suffix="×"
            label="Average ROAS"
            sublabel="Meta & Google Campaigns"
            tag="Direct Impact"
          />
          <StatsCounter
            value={99.4}
            suffix="%"
            label="Client Satisfaction"
            sublabel="Dedicated Support Pods"
            tag="Client Trust"
          />
          <StatsCounter
            value={100}
            suffix="%"
            label="Asset Ownership"
            sublabel="Full Code & Design Files Handover"
            tag="Transparency"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. CORE VALUES & PHILOSOPHY (3 Luxury Frosted Emerald Cards)             */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="text-center mb-16">
          <Badge variant="subtle">OUR GUIDING PRINCIPLES</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            How We Build <span className="italic text-[#00FC43]">Differently</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-4">
            Three non-negotiable standards that govern every line of code and every interaction design
            we deliver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.number}
                className="p-8 sm:p-9 rounded-3xl bg-gradient-to-br from-[#101c13] via-[#09120b] to-[#040805] border border-[#00FC43]/25 hover:border-[#00FC43]/70 transition-all duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(0,252,67,0.25)] hover:-translate-y-2 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="editorial-serif text-3xl font-normal text-[#00FC43]">
                      {val.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00FC43] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs font-mono text-[#00FC43]/80 mb-4">{val.tagline}</p>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. OUR JOURNEY TIMELINE                                                  */}
      {/* ========================================================================= */}
      <section className="relative py-24 px-4 bg-[#070b08]/80 border-y border-white/10 mb-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="emerald">EVOLUTION & MILESTONES</Badge>
            <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
              Our Journey of <span className="italic text-[#00FC43]">Engineering Innovation</span>
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-[2px] before:bg-gradient-to-b before:from-[#00FC43] before:via-[#00FC43]/40 before:to-transparent">
            {JOURNEY_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={step.year}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00FC43] shadow-[0_0_15px_#00FC43] z-10" />

                  {/* Content card */}
                  <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                    <div className="p-6 rounded-2xl bg-[#0a120c] border border-white/10 hover:border-[#00FC43]/50 transition-all duration-300 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="editorial-serif text-2xl font-normal text-[#00FC43]">
                          {step.year}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full">
                          {step.location}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. FOUR-STEP PROCESS                                                     */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="text-center mb-16">
          <Badge variant="subtle">EXECUTION METHODOLOGY</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            How We Execute <span className="italic text-[#00FC43]">Sprints</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-4">
            Structured delivery with clear checkpoints so you always know what is being shipped and
            when.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOUR_STEP_PROCESS.map((proc) => (
            <div
              key={proc.step}
              className="p-7 rounded-3xl bg-[#0a120c] border border-white/10 hover:border-[#00FC43]/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="editorial-serif text-3xl font-normal text-[#00FC43]">
                    {proc.step}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded-full">
                    {proc.duration}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{proc.name}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                  {proc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. THE TOTO DIFFERENCE (Comparison Matrix)                               */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 mb-28">
        <div className="text-center mb-16">
          <Badge variant="emerald">HEAD-TO-HEAD COMPARISON</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Traditional Agency vs.{' '}
            <span className="italic text-[#00FC43]">TOTO Development</span>
          </h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#090f0b]/90 overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-3 p-5 sm:p-6 border-b border-white/10 bg-black/40 text-xs sm:text-sm font-bold text-white">
            <div>Decision Criteria</div>
            <div className="text-neutral-400">Traditional Web Agency</div>
            <div className="text-[#00FC43]">TOTO Development</div>
          </div>

          <div className="divide-y divide-white/5">
            {COMPARISON.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 p-5 sm:p-6 text-xs sm:text-sm items-center hover:bg-white/[0.02] transition-colors"
              >
                <div className="font-semibold text-white pr-2">{row.factor}</div>
                <div className="text-neutral-400 flex items-start gap-2 pr-2">
                  <XIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{row.traditional}</span>
                </div>
                <div className="text-[#00FC43] font-medium flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00FC43] shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>{row.toto}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. ELITE LEADERSHIP & TALENT FLEET                                       */}
      {/* ========================================================================= */}
      <Team className="mb-28" />

      {/* ========================================================================= */}
      {/* 08. GLOBAL OFFICE HUBS                                                    */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 mb-28">
        <div className="text-center mb-12">
          <Badge variant="emerald">OFFICIAL HEADQUARTERS</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Our Studio & <span className="italic text-[#00FC43]">Headquarters</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-4">
            All software engineering, creative production, and marketing operations are centralized at our Khulna facility.
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#101b14] via-[#09120b] to-[#040805] border border-[#00FC43]/30 shadow-[0_0_50px_rgba(0,252,67,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00FC43]/10 blur-[100px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/30 text-[11px] font-mono text-[#00FC43] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] animate-pulse" />
                <span>CENTRALIZED FACILITY</span>
              </div>
              <h3 className="editorial-serif text-2xl sm:text-3xl font-normal text-white">
                TOTO Development Group
              </h3>
              <p className="text-xs font-mono text-[#00FC43] mt-1">Agency Headquarters & Development Studio</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] font-mono text-neutral-400 block">Visiting & Support Hours:</span>
              <span className="text-sm font-semibold text-white block mt-0.5">09:00 AM – 08:00 PM</span>
              <span className="text-xs text-neutral-400 font-mono block">Saturday – Thursday</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                  Official Office Address
                </span>
                <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                  256 Upper Road, Mou Market 3rd Floor,<br />
                  Sonadanga, Khulna - 9000,<br />
                  Bangladesh
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2 text-xs font-mono text-neutral-300">
                <div>
                  <span className="text-neutral-500">Postal Code:</span> <span className="text-white">9000</span>
                </div>
                <div>
                  <span className="text-neutral-500">Direct Contact:</span>{' '}
                  <a href={`tel:${SITE_CONFIG.contactPhone}`} className="text-[#00FC43] hover:underline">
                    {SITE_CONFIG.contactPhone}
                  </a>
                </div>
                <div>
                  <span className="text-neutral-500">Official Inquiries:</span>{' '}
                  <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-[#00FC43] hover:underline">
                    {SITE_CONFIG.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#00FC43]">
                Centralized Operations
              </h4>
              <div className="space-y-2.5 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43]" />
                  <span>Custom Software & ERP Engineering Lab</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43]" />
                  <span>Next.js Web Platforms & E-Commerce Flagships</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43]" />
                  <span>Meta & Google Performance Ads Cockpit</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43]" />
                  <span>Commercial Video Reels & 3D Packaging Suite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. CLOSING CTA BANNER                                                    */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#101c13] via-[#09110b] to-[#040805] border border-[#00FC43]/40 shadow-[0_0_60px_rgba(0,252,67,0.2)] text-center relative overflow-hidden">
          <Badge variant="emerald">COLLABORATE WITH US</Badge>

          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-6 tracking-tight max-w-2xl mx-auto">
            Ready to Build With an <span className="italic text-[#00FC43]">Elite Engineering Team?</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Schedule a confidential 30-minute discovery session with our senior architects.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="brand-glow-button px-8 py-3.5 rounded-full text-sm font-bold text-[#041608] inline-flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(0,252,67,0.6)]"
            >
              <span>Schedule discovery session</span>
              <ArrowRight className="w-4 h-4 font-bold" />
            </button>
          </div>
        </div>
      </section>

      <ContactModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
