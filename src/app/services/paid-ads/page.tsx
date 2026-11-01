'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Target,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  LineChart,
  Layers,
  Sparkles,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { Badge } from '@/components/Badge';
import { ContactModal } from '@/components/ContactModal';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import { BANGLADESHI_CIRCULAR_TESTIMONIALS } from '@/lib/data';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';

export default function PaidAdsPage() {
  const { getDynamicWhatsAppUrl } = useActiveWhatsApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const adsTestimonials = BANGLADESHI_CIRCULAR_TESTIMONIALS;

  return (
    <div className="relative pt-36 md:pt-44 pb-24 overflow-hidden bg-[#050705]">
      {/* Ambient Spotlight */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#00FC43]/12 blur-[170px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 01. SERVICE HERO HEADER                                                   */}
      {/* ========================================================================= */}
      <section className="relative px-4 max-w-6xl mx-auto text-center mb-20">
        <Badge variant="emerald">04 / PERFORMANCE MEDIA</Badge>

        <h1 className="editorial-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white mt-6 tracking-tight leading-[1.08] max-w-4xl mx-auto">
          High-ROAS Meta & Google <br className="hidden sm:inline" />
          <span className="italic text-[#00FC43]">Paid Advertising Campaigns</span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mt-6 leading-relaxed font-normal">
          Less guesswork, smarter media buying. Server-side CAPI tracking, creative testing variations, and algorithmic audience targeting engineered to cut acquisition costs in half.
        </p>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-10">
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">5.2×</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Average ROAS Delivered</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">-48%</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Cost Per Acquisition (CPA)</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">+290%</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Qualified Inbound Leads</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="brand-glow-button px-8 py-4 rounded-full text-sm font-bold text-[#041608] inline-flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(0,252,67,0.5)]"
          >
            <span>Launch High-ROAS Ad Campaign</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </button>

          <a
            href={getDynamicWhatsAppUrl(
              'Hi TOTO Development, I would like to consult on high-ROAS Meta & Google Ad campaigns for my business.'
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
      {/* 02. KEY CAPABILITIES DELIVERED                                            */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0a120c] border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43] mb-3">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Meta Ads Mastery</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Hyper-targeted Facebook & Instagram campaigns utilizing broad, lookalike, and interest stacking.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43] mb-3">
                <LineChart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Google Performance Max</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Intent-driven Search ads, YouTube video pre-rolls, and PMax campaigns capturing active buyers.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43] mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Conversion API (CAPI)</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Server-side conversion tracking immune to iOS ad blockers, guaranteeing 100% attribution accuracy.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43] mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Creative Testing</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Relentless A/B/C testing of visual angles, hooks, and copy to discover scalable winner creatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. CLIENT REVIEWS & VERIFIED PROOF                                       */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <Badge variant="subtle">PERFORMANCE CLIENT REVIEWS</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Proven Results in <span className="italic text-[#00FC43]">Paid Ads</span>
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto mt-3">
            Real feedback from brand founders who scaled revenue with 5.2× average return on ad spend.
          </p>
        </div>

        <div className="bg-[#060a07] border border-[#00FC43]/20 rounded-3xl p-4 sm:p-10 flex justify-center items-center relative overflow-hidden shadow-2xl">
          <CircularTestimonials
            testimonials={adsTestimonials}
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

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPlan="Meta & Google Ads"
      />
    </div>
  );
}
