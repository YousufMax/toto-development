'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Quote,
  ShieldCheck,
  Zap,
  Globe2,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Badge } from '@/components/Badge';
import { StatsCounter } from '@/components/StatsCounter';
import { ProjectCard } from '@/components/ProjectCard';
import { ContactModal } from '@/components/ContactModal';
import { TiltedGridHero } from '@/components/ui/tilted-grid-hero';
import { CardFanCarousel } from '@/components/ui/card-fan-carousel';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import {
  PORTFOLIO_PROJECTS,
  TESTIMONIALS,
  BANGLADESHI_CIRCULAR_TESTIMONIALS,
  BRAND_DESIGN_SHOWCASE_CARDS,
} from '@/lib/data';

const PORTFOLIO_GALLERY_IMAGES = [
  {
    src: '/portfolio-3d/3d-5.png',
    title: 'E-Commerce',
    alt: 'TOTO Elite Mart — Premier E-Commerce Online Shopping Platform',
  },
  {
    src: '/portfolio-3d/3d-4.png',
    title: 'Software',
    alt: 'Onnow Multi-Outlet SaaS Software & Live Order ERP Dashboard',
  },
  {
    src: '/portfolio-3d/3d-1.png',
    title: 'Software',
    alt: 'Custom Streaming & Media SaaS Software Application',
  },
  {
    src: '/portfolio-3d/3d-10.png',
    title: 'E-Commerce',
    alt: 'Marketo Fashion & Sportswear E-Commerce Storefront',
  },
  {
    src: '/portfolio-3d/3d-13.png',
    title: 'Software',
    alt: 'Texon Enterprise Digital Business Software Platform',
  },
  {
    src: '/portfolio-3d/3d-11.png',
    title: 'E-Commerce',
    alt: 'Marketo Organic Grocery & Daily Essentials E-Commerce Store',
  },
  {
    src: '/portfolio-3d/3d-2.png',
    title: 'Software',
    alt: 'POC Academy Admin Management Portal & EdTech Software',
  },
  {
    src: '/portfolio-3d/3d-8.png',
    title: 'E-Commerce',
    alt: 'Marketo Smart Audio & Electronics E-Commerce Platform',
  },
  {
    src: '/portfolio-3d/3d-12.png',
    title: 'E-Commerce',
    alt: 'Marketo Smart Security Tech & Electronics Storefront',
  },
  {
    src: '/portfolio-3d/3d-6.png',
    title: 'E-Commerce',
    alt: 'High-Conversion Modern Digital E-Commerce Web Application',
  },
  {
    src: '/portfolio-3d/3d-7.png',
    title: 'Software',
    alt: 'Custom Enterprise Software Architecture & Management Suite',
  },
  {
    src: '/portfolio-3d/3d-9.png',
    title: 'E-Commerce',
    alt: 'Interactive E-Commerce Web Store & High-Speed Checkout',
  },
  {
    src: '/portfolio-3d/3d-3.png',
    title: 'Software',
    alt: 'Custom SaaS Analytics & Software Application Interface',
  },
];

export default function PortfolioPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const filteredProjects = PORTFOLIO_PROJECTS.filter(
    (p) => selectedFilter === 'all' || p.category === selectedFilter
  );

  return (
    <div className="relative pt-36 md:pt-44 pb-24 overflow-hidden bg-[#050705] text-[#dae6d3] min-h-screen">
      {/* ========================================================================= */}
      {/* 01. PORTFOLIO HERO                                                        */}
      {/* ========================================================================= */}
      <section className="relative px-4 max-w-6xl mx-auto text-center mb-20">
        <Badge variant="emerald">PROVEN PRODUCTION TRACK RECORD</Badge>

        <h1 className="editorial-serif text-4xl sm:text-6xl md:text-7xl lg:text-[78px] font-bold text-white mt-6 tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Crafted with{' '}
          <span className="editorial-serif italic font-normal text-[#00FC43] drop-shadow-[0_0_25px_rgba(0,252,67,0.4)]">
            Architectural Precision
          </span>
          <br className="hidden sm:inline" /> & Proven Commercial Impact
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto mt-6 leading-relaxed font-normal">
          Explore our portfolio of high-throughput web applications, intelligent AI worker fleets,
          and mission-critical software built for global market leaders.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="brand-glow-button px-8 py-3.5 rounded-full text-sm font-bold text-[#041608] inline-flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(0,252,67,0.5)]"
          >
            <span>Start a project like these</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </button>

          <a
            href="#projects-grid"
            className="px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-white/5 border border-white/15 hover:border-[#00FC43]/50 hover:bg-[#00FC43]/10 transition-all backdrop-blur-md"
          >
            Explore Case Studies ↓
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 01.5. 3D CURVED PRODUCTION GALLERY (TILTED GRID HERO)                     */}
      {/* ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {/* Ambient background bloom behind gallery */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-[#00FC43]/12 blur-[120px] pointer-events-none rounded-full" />

        {/* Section Heading directly above the 3D Gallery (High-Converting for Buyers) */}
        <div className="text-center mb-10 sm:mb-12 relative z-10">
          <Badge variant="emerald">COMMERCIAL SHOWCASE · LIVE 3D REEL</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl lg:text-[52px] font-normal text-white mt-4 tracking-tight leading-[1.12]">
            High-Conversion E-Commerce &{' '}
            <span className="italic text-[#00FC43] drop-shadow-[0_0_25px_rgba(0,252,67,0.4)]">
              Scalable Software Systems
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            An interactive tour of mission-critical platforms we&apos;ve engineered—delivering sub-second checkout speeds, fault-tolerant business software, and millions in commercial revenue.
          </p>
        </div>

        <div className="relative rounded-3xl p-1 sm:p-2 bg-gradient-to-b from-[#00FC43]/25 via-white/5 to-transparent shadow-[0_20px_70px_rgba(0,0,0,0.95)]">
          <TiltedGridHero
            images={PORTFOLIO_GALLERY_IMAGES}
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
      {/* 02. FOUR METRICS ROW (AUTHENTIC ENGINEERING & IMPACT BENCHMARKS)          */}
      {/* ========================================================================= */}
      <section className="relative bg-[#080d09]/95 border-y border-[#00FC43]/25 py-14 sm:py-16 px-4 mb-20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#00FC43]/60 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10 text-center">
          <StatsCounter
            value={80}
            suffix="+"
            label="Production Deployments"
            sublabel="Software, Web & Creative Retainers"
            tag="Track Record"
          />
          <StatsCounter
            value={3.4}
            suffix="×"
            label="Average Conversion Lift"
            sublabel="Measured E-Commerce Growth"
            tag="Direct Impact"
          />
          <StatsCounter
            value={98}
            suffix="%"
            label="On-Time Sprint Delivery"
            sublabel="Zero Technical Debt"
            tag="Velocity"
          />
          <StatsCounter
            value={10}
            suffix="k+"
            label="Daily Orders & Transactions"
            sublabel="Processed Across Platforms"
            tag="Concurrency"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. FILTER SYSTEM                                                         */}
      {/* ========================================================================= */}
      <section id="projects-grid" className="max-w-6xl mx-auto px-4 mb-16">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {[
            { id: 'all', label: `All Projects (${PORTFOLIO_PROJECTS.length})` },
            { id: 'software', label: 'Software' },
            { id: 'web', label: 'Web Development' },
            { id: 'marketing', label: 'Digital Marketing' },
            { id: 'ads', label: 'Ads' },
            { id: 'video', label: 'Video & Motion' },
            { id: 'design', label: 'Design' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                selectedFilter === tab.id
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
      {/* 04. PROJECTS GRID                                                         */}
      {/* ========================================================================= */}
      <section id="projects-grid" className="max-w-6xl mx-auto px-4 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={idx === 0 && selectedFilter === 'all'}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04.5. BRAND ARCHITECTURE & CREATIVE DESIGN (FAN CAROUSEL)                 */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl mx-auto px-4 mb-28">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
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
      {/* 05. CLIENT TESTIMONIALS & REVIEWS                                         */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="text-center mb-12">
          <Badge variant="subtle">EXECUTIVE CLIENT REVIEWS</Badge>
          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-4 tracking-tight">
            What Leaders Say About <span className="italic text-[#00FC43]">Partnering With Us</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-4">
            Direct feedback from top founders and enterprise leaders across Dhaka, Chattogram, and beyond.
          </p>
        </div>

        {/* 3D Interactive Circular Testimonials Stage */}
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
      </section>

      {/* ========================================================================= */}
      {/* 06. CONVERSION CTA BANNER                                                 */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#101c13] via-[#09110b] to-[#040805] border border-[#00FC43]/40 shadow-[0_0_60px_rgba(0,252,67,0.2)] text-center relative overflow-hidden">
          <Badge variant="emerald">YOUR VISION, ENGINEERED</Badge>

          <h2 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mt-6 tracking-tight max-w-2xl mx-auto">
            Ready to Build Your Company&apos;s Next <span className="italic text-[#00FC43]">Flagship?</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Let&apos;s discuss architecture, scope, and timeline. Get a free proposal within 48 hours.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="brand-glow-button px-8 py-3.5 rounded-full text-sm font-bold text-[#041608] inline-flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(0,252,67,0.6)]"
            >
              <span>Request project proposal</span>
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
