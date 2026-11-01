'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Search,
  Share2,
  BarChart3,
  Users,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { Badge } from '@/components/Badge';
import { ContactModal } from '@/components/ContactModal';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import { BANGLADESHI_CIRCULAR_TESTIMONIALS } from '@/lib/data';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';

export default function DigitalMarketingPage() {
  const { getDynamicWhatsAppUrl } = useActiveWhatsApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const marketingTestimonials = BANGLADESHI_CIRCULAR_TESTIMONIALS;

  return (
    <div className="relative pt-36 md:pt-44 pb-24 overflow-hidden bg-[#050705]">
      {/* Ambient Spotlight */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#00FC43]/12 blur-[170px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 01. SERVICE HERO HEADER                                                   */}
      {/* ========================================================================= */}
      <section className="relative px-4 max-w-6xl mx-auto text-center mb-20">
        <Badge variant="emerald">03 / INBOUND & ACQUISITION</Badge>

        <h1 className="editorial-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white mt-6 tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Strategic Digital Marketing & <br className="hidden sm:inline" />
          <span className="italic text-[#00FC43]">Omni-Channel Content Growth</span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mt-6 leading-relaxed font-normal">
          Get seen by the right audience. Strategic content marketing, omni-channel social media distribution, and search engine optimization designed to build unshakeable brand authority.
        </p>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-10">
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">+380%</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Audience Reach Lift</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">8.4%</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Engagement Rate</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a120c] border border-white/10 text-center">
            <span className="editorial-serif text-3xl font-bold text-[#00FC43] block">4.2×</span>
            <span className="text-xs text-neutral-400 font-mono mt-1 block">Inbound Lead Velocity</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="brand-glow-button px-8 py-4 rounded-full text-sm font-bold text-[#041608] inline-flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(0,252,67,0.5)]"
          >
            <span>Start Marketing Strategy Sprint</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </button>

          <a
            href={getDynamicWhatsAppUrl(
              'Hi TOTO Development, I want to discuss Digital Marketing & SEO Content Strategy for my brand.'
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
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Technical SEO</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Keyword architecture, search intent mapping, and high-domain backlinks to rank on Google Page 1.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43] mb-3">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Social Distribution</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Consistent cross-channel distribution across LinkedIn, Facebook, Instagram, and YouTube.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43] mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Audience Nurturing</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                High-intent email marketing, community engagement, and lead qualification funnels.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#00FC43]/10 border border-[#00FC43]/30 flex items-center justify-center text-[#00FC43] mb-3">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Analytics Cockpit</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Bi-weekly transparent reporting measuring organic impressions, CTR, and inbound conversions.
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
          <Badge variant="subtle">GROWTH CLIENT REVIEWS</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            Proven Results in <span className="italic text-[#00FC43]">Digital Marketing</span>
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto mt-3">
            Real feedback from marketing leaders who scaled inbound inquiries and organic visibility.
          </p>
        </div>

        <div className="bg-[#060a07] border border-[#00FC43]/20 rounded-3xl p-4 sm:p-10 flex justify-center items-center relative overflow-hidden shadow-2xl">
          <CircularTestimonials
            testimonials={marketingTestimonials}
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
        defaultPlan="Digital Marketing & SEO"
      />
    </div>
  );
}
