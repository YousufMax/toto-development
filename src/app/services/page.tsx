'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Sparkles,
  Cpu,
  Layers,
  Globe2,
  TrendingUp,
  Database,
  Shield,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/Badge';
import { StatsCounter } from '@/components/StatsCounter';
import { FAQAccordion } from '@/components/FAQAccordion';
import { ContactModal } from '@/components/ContactModal';
import {
  SERVICES_LIST,
  SERVICES_PAGE_METRICS,
  FAQS_LIST,
  PORTFOLIO_PROJECTS,
} from '@/lib/data';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<string>('');

  const openQuoteWithService = (serviceName: string) => {
    setSelectedPlanForModal(serviceName);
    setIsQuoteModalOpen(true);
  };

  const filteredServices = SERVICES_LIST.filter(
    (s) => activeTab === 'all' || s.category === activeTab
  );

  return (
    <div className="relative pt-36 md:pt-44 pb-24 overflow-hidden">
      {/* ========================================================================= */}
      {/* 01. SERVICES HERO BANNER                                                  */}
      {/* ========================================================================= */}
      <section className="relative px-4 max-w-6xl mx-auto text-center mb-20">
        <Badge variant="emerald">WHAT WE BUILD</Badge>

        <h1 className="editorial-serif text-4xl sm:text-6xl md:text-7xl lg:text-[78px] font-bold text-white mt-6 tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Digital Services Designed <br className="hidden sm:inline" />
          for Real{' '}
          <span className="editorial-serif italic font-normal text-[#00FC43] drop-shadow-[0_0_25px_rgba(0,252,67,0.4)]">
            Business Outcomes
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto mt-6 leading-relaxed font-normal">
          TOTO Development delivers integrated digital capabilities across custom software, modern website development, digital marketing, Meta & Google ads, commercial video editing, and brand design.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => openQuoteWithService('Custom Software & Web Apps')}
            className="brand-glow-button px-8 py-3.5 rounded-full text-sm font-bold text-[#041608] inline-flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(0,252,67,0.5)]"
          >
            <span>Get a free proposal</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </button>

          <a
            href="#services-grid"
            className="px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-white/5 border border-white/15 hover:border-[#00FC43]/50 hover:bg-[#00FC43]/10 transition-all backdrop-blur-md"
          >
            Explore services ↓
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. SERVICES METRICS ROW                                                  */}
      {/* ========================================================================= */}
      <section className="relative bg-[#080d09] border-y border-[#00FC43]/20 py-16 px-4 mb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10 text-center">
          {SERVICES_PAGE_METRICS.map((stat, i) => (
            <StatsCounter
              key={i}
              value={stat.numericValue}
              suffix={stat.suffix}
              prefix={stat.value.startsWith('$') ? '$' : ''}
              label={stat.label}
              sublabel={stat.sublabel}
              tag={stat.highlightTag}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. CATEGORY NAVIGATION STRIP                                             */}
      {/* ========================================================================= */}
      <section id="services-grid" className="max-w-6xl mx-auto px-4 mb-16">
        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-4">
          {[
            { id: 'all', label: 'All 6 Verticals' },
            { id: 'development', label: 'Software & Web' },
            { id: 'marketing', label: 'Digital Marketing & Ads' },
            { id: 'creative', label: 'Video, Motion & 3D Brand' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#00FC43] text-[#041608] shadow-[0_0_20px_rgba(0,252,67,0.4)]'
                  : 'bg-[#0a120c] border border-white/10 text-neutral-300 hover:border-[#00FC43]/40 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. SIX CORE SERVICES DETAILED CARDS                                      */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service) => {
            const isDev = service.category === 'development';
            const isMkt = service.category === 'marketing';
            const primaryAccent = isDev ? '#00FC43' : isMkt ? '#00E5FF' : '#A855F7';
            const bgGradient = isDev
              ? 'from-[#0e1c13]/95 via-[#08120e]/90 to-[#040806]/95 border-[#00FC43]/25 hover:border-[#00FC43]/70 hover:shadow-[0_0_40px_rgba(0,252,67,0.22)]'
              : isMkt
              ? 'from-[#081822]/95 via-[#051118]/90 to-[#03060b]/95 border-cyan-500/25 hover:border-cyan-400/70 hover:shadow-[0_0_40px_rgba(6,182,212,0.22)]'
              : 'from-[#160d24]/95 via-[#0f0819]/90 to-[#06030c]/95 border-purple-500/25 hover:border-purple-400/70 hover:shadow-[0_0_40px_rgba(168,85,247,0.22)]';

            return (
              <div
                key={service.id}
                id={service.id}
                className="asymmetric-glass-card p-8 sm:p-10 rounded-3xl transition-all duration-500 shadow-2xl hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* 3-Sided Ambient Radial Light Layers */}
                <div
                  className="absolute -top-12 -left-12 w-64 h-64 rounded-full blur-[60px] pointer-events-none opacity-80"
                  style={{ backgroundColor: 'rgba(0, 252, 67, 0.28)' }}
                />
                <div
                  className="absolute -top-8 -right-8 w-52 h-52 rounded-full blur-[55px] pointer-events-none opacity-35"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)' }}
                />
                <div
                  className="absolute -bottom-12 -right-12 w-60 h-60 rounded-full blur-[70px] pointer-events-none opacity-45"
                  style={{ backgroundColor: isMkt ? 'rgba(255, 184, 0, 0.12)' : 'rgba(0, 210, 255, 0.10)' }}
                />

                <div className="relative z-10">
                  {/* Number & Tag Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border"
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
                      <span>
                        {service.number} / {service.categoryTag}
                      </span>
                    </div>

                    {service.metrics && service.metrics[0] && (
                      <span
                        className="text-xs font-mono font-bold px-3 py-1 rounded-full border shadow-sm"
                        style={{
                          backgroundColor: `${primaryAccent}15`,
                          borderColor: `${primaryAccent}30`,
                          color: primaryAccent,
                        }}
                      >
                        {service.metrics[0].value} {service.metrics[0].label}
                      </span>
                    )}
                  </div>

                  {/* Title (Crisp Pure White) */}
                  <h3 className="editorial-serif text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#00FC43] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description (Crisp White High-Contrast Typography) */}
                  <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal mb-6">
                    {service.fullDesc || service.shortDesc}
                  </p>

                  {/* Features Checklist (Solid White Text) */}
                  {service.features && (
                    <div className="space-y-2.5 mb-8 bg-black/40 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-white font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00FC43] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Deliverables & Actions */}
                <div className="pt-6 border-t border-white/10 relative z-10">
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-white font-medium shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => openQuoteWithService(service.title)}
                    className="brand-glow-button px-5 py-2.5 rounded-full text-xs font-bold text-[#041608] inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,252,67,0.4)] cursor-pointer active:scale-95 transition-all"
                  >
                    <span>Book This Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>

                  <Link
                    href={`/services/${service.id}/`}
                    className="text-xs text-[#00FC43] hover:underline underline-offset-4 font-medium inline-flex items-center gap-1"
                  >
                    <span>Explore details & packages</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. DETAILED BENTO DEEP-DIVE: WEB DEV & AI AUTOMATION                      */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="asymmetric-glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <Badge variant="emerald">ARCHITECTURE BENCHMARK</Badge>
              <h2 className="editorial-serif text-3xl sm:text-4xl font-normal text-white mt-4 tracking-tight">
                Sub-Second Speed,{' '}
                <span className="italic text-[#00FC43]">Uncompromising Security</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal mt-4">
                We engineer Next.js static site generation (SSG) with global edge delivery. Pages are
                pre-rendered at build time, resulting in instantaneous page transitions, perfect Core
                Web Vitals, and 0ms database lag for your visitors.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                  <span className="editorial-serif text-3xl font-bold text-[#00FC43]">99/100</span>
                  <span className="text-xs text-white/90 block mt-1 font-medium">Google Lighthouse Score</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                  <span className="editorial-serif text-3xl font-bold text-[#00FC43]">&lt;0.8s</span>
                  <span className="text-xs text-white/90 block mt-1 font-medium">Largest Contentful Paint</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                  <span className="editorial-serif text-3xl font-bold text-[#00FC43]">100%</span>
                  <span className="text-xs text-white/90 block mt-1 font-medium">Hosting-Agnostic Static Export</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                  <span className="editorial-serif text-3xl font-bold text-[#00FC43]">0ms</span>
                  <span className="text-xs text-white/90 block mt-1 font-medium">Server Cold Start Overhead</span>
                </div>
              </div>
            </div>

            {/* Architecture code box preview */}
            <div className="rounded-2xl bg-[#060a08]/90 border border-[#00FC43]/40 p-6 font-mono text-xs text-white shadow-2xl overflow-x-auto backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-[11px] text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00FC43]/80 inline-block" />
                </div>
                <span>next.config.js — Static Export Architecture</span>
              </div>
              <pre className="text-neutral-300 leading-relaxed">
                <code>{`/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;`}</code>
              </pre>
              <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-[#00FC43]">
                ✓ Hosting-Agnostic: Deployable to Netlify, Vercel, S3, Apache, Nginx & cPanel
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. BLUEPRINT PROCESS (Obsidian Timeline)                                 */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="text-center mb-16">
          <Badge variant="subtle">THE BLUEPRINT PROCESS</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            How Your Platform Comes to <span className="italic text-[#00FC43]">Life</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: 'Stage 01',
              title: 'Discovery & Schema',
              desc: 'Deep architecture assessment, data modeling, API contract definition, and sprint velocity mapping.',
            },
            {
              step: 'Stage 02',
              title: 'Editorial Design & UI',
              desc: 'High-contrast glassmorphic design system in Figma with GSAP motion interaction prototypes.',
            },
            {
              step: 'Stage 03',
              title: 'Precision Engineering',
              desc: 'Next.js 14, strict TypeScript interfaces, automated CI/CD deployment pipelines, and security audits.',
            },
            {
              step: 'Stage 04',
              title: 'Launch & Handoff',
              desc: 'Full static site export, edge DNS setup, Lighthouse tuning, and full IP repo transfer to your team.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="asymmetric-glass-card p-7 rounded-3xl transition-all duration-300 shadow-xl group"
            >
              <span className="text-[11px] font-mono text-[#00FC43] bg-[#00FC43]/10 px-3 py-1 rounded-full border border-[#00FC43]/30 inline-block mb-4 shadow-sm">
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. RELEVANT CASE STUDIES BANNER                                          */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <Badge variant="emerald">PROVEN RESULTS</Badge>
            <h2 className="editorial-serif text-3xl sm:text-4xl font-normal text-white mt-3 tracking-tight">
              Featured Case <span className="italic text-[#00FC43]">Studies</span>
            </h2>
          </div>
          <Link
            href="/portfolio/"
            className="text-xs font-mono uppercase tracking-widest text-[#00FC43] hover:underline underline-offset-4 inline-flex items-center gap-1.5"
          >
            <span>Explore all case studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_PROJECTS.slice(0, 2).map((p) => (
            <div
              key={p.id}
              className="asymmetric-glass-card p-8 rounded-3xl transition-all duration-300 shadow-xl group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#00FC43] font-bold">{p.categoryLabel}</span>
                <span className="text-xs text-white/90 font-medium">{p.region}</span>
              </div>
              <h3 className="editorial-serif text-2xl font-bold text-white mb-2 group-hover:text-[#00FC43] transition-colors">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/95 mb-6 leading-relaxed">{p.tagline}</p>
              <div className="flex items-center gap-4 py-4 border-t border-white/10">
                {p.metrics?.map((m, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="editorial-serif text-xl font-bold text-[#00FC43]">
                      {m.value}
                    </span>
                    <span className="text-[10px] text-white/80 font-medium">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. FAQ ACCORDION                                                         */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 mb-28">
        <div className="text-center mb-16">
          <Badge variant="subtle">QUESTIONS</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Services & Delivery <span className="italic text-[#00FC43]">FAQ</span>
          </h2>
        </div>
        <FAQAccordion items={FAQS_LIST} />
      </section>

      {/* ========================================================================= */}
      {/* 09. CALL TO ACTION BANNER                                                 */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="asymmetric-glass-card rounded-3xl p-8 sm:p-14 border border-[#00FC43]/50 shadow-[0_0_60px_rgba(0,252,67,0.25)] text-center relative overflow-hidden">
          <Badge variant="emerald">TAKE ACTION</Badge>

          <h2 className="editorial-serif text-3xl sm:text-5xl font-bold text-white mt-6 tracking-tight max-w-2xl mx-auto">
            Ready to Build a High-Impact <span className="italic text-[#00FC43]">Digital Asset?</span>
          </h2>

          <p className="text-white/95 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed font-normal">
            Get in touch today for an architectural consultation and fixed-scope sprint estimate.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => openQuoteWithService('Custom Software & Web Apps')}
              className="brand-glow-button px-8 py-3.5 rounded-full text-sm font-bold text-[#041608] inline-flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(0,252,67,0.6)]"
            >
              <span>Request custom quote</span>
              <ArrowRight className="w-4 h-4 font-bold" />
            </button>
          </div>
        </div>
      </section>

      <ContactModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultPlan={selectedPlanForModal}
      />
    </div>
  );
}
