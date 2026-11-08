'use client';

import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { clsx } from 'clsx';
import {
  Cpu,
  Layers,
  Terminal,
  TrendingUp,
  Activity,
  Timer,
  CheckCircle2,
  Radio,
  MapPin,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Check,
  Zap,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { Badge } from '@/components/Badge';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';

/* ========================================================================= */
/* 01. COMPACT APPLE-GRADE SPATIAL CARD CONTAINER                            */
/* ========================================================================= */
interface SpatialCardProps {
  number: string;
  badge: string;
  title: string;
  bengaliTitle?: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

function CompactSpatialCard({
  number,
  badge,
  title,
  bengaliTitle,
  description,
  children,
  className,
}: SpatialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle Apple-grade constraint (-5 to 5 deg)
      const rotX = ((y - centerY) / centerY) * -5;
      const rotY = ((x - centerX) / centerX) * 5;

      setRotateX(rotX);
      setRotateY(rotY);
      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.16,
      });
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
      className={clsx('relative group select-none transition-transform duration-300', className)}
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.08s ease-out'
            : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="h-full rounded-2xl sm:rounded-3xl bg-[#070b09] border border-white/10 hover:border-[#00FC43]/40 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(0,252,67,0.15)]"
      >
        {/* Specular Glare (Apple Flashlight Layer) */}
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(0, 252, 67, ${glarePosition.opacity}), transparent 75%)`,
            pointerEvents: 'none',
          }}
          className="absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"
        />

        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -left-16 w-56 h-56 rounded-full bg-[#00FC43]/10 blur-[70px] pointer-events-none group-hover:bg-[#00FC43]/18 transition-all duration-500" />

        {/* Compact Header: Single-glance typography */}
        <div className="relative z-20 mb-3" style={{ transform: 'translateZ(18px)' }}>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="editorial-serif text-2xl sm:text-3xl font-normal text-[#00FC43] shrink-0">
                {number}
              </span>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate group-hover:text-[#00FC43] transition-colors">
                  {title}
                </h3>
                {bengaliTitle && (
                  <p className="text-[10px] font-mono text-[#00FC43]/85 truncate hidden sm:block">
                    {bengaliTitle}
                  </p>
                )}
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-[#00FC43] bg-[#00FC43]/10 px-2 py-0.5 rounded-full border border-[#00FC43]/20 shrink-0 shadow-[0_0_10px_rgba(0,252,67,0.1)] whitespace-nowrap">
              <span className="w-1 h-1 rounded-full bg-[#00FC43] animate-pulse" />
              {badge}
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed font-normal line-clamp-2">
            {description}
          </p>
        </div>

        {/* Live Interactive 3D Artifact Stage */}
        <div
          className="relative z-20 mt-2 rounded-xl bg-[#040705] border border-white/5 p-3 sm:p-3.5 overflow-hidden shadow-inner"
          style={{ transform: 'translateZ(25px)' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 02. ARTIFACT 01: LIVE COMPILING CODE TERMINAL                             */
/* ========================================================================= */
function LiveCodeTerminal() {
  const [activeStep, setActiveStep] = useState(0);

  const STATUS_CYCLES = [
    { label: 'EDGE COMPILED', metric: '0.3ms TTFB', status: '✓ Zero Regressions' },
    { label: 'TYPE AUDIT', metric: '100% Strict', status: '✓ 0 Type Errors' },
    { label: 'SECURITY LOCK', metric: 'SHA-256', status: '✓ 0 Vulnerabilities' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STATUS_CYCLES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const current = STATUS_CYCLES[activeStep];

  return (
    <div className="relative font-mono text-[10px] sm:text-[11px]">
      {/* Chrome Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/80" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <span className="w-2 h-2 rounded-full bg-[#00FC43]" />
          <span className="text-neutral-500 text-[9px] ml-1.5">engine.cluster.ts</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-[#00FC43] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] animate-ping" />
          <span>{current.label}</span>
        </div>
      </div>

      {/* Code Snippet */}
      <div className="space-y-0.5 text-neutral-300 leading-snug">
        <p>
          <span className="text-[#00FC43]">const</span> <span className="text-white">cluster</span> = <span className="text-[#00FC43]">await</span> <span className="text-sky-300">TOTOEngine</span>.<span className="text-emerald-400">deploy</span>({'{'}
        </p>
        <p className="pl-3 text-neutral-400">
          runtime: <span className="text-amber-300">&apos;edge-distributed&apos;</span>,
        </p>
        <p className="pl-3 text-neutral-400">
          typeSafety: <span className="text-[#00FC43]">&apos;100% strict&apos;</span>,
        </p>
        <p>{'}'});</p>
      </div>

      {/* Live Telemetry Pill Bar */}
      <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between gap-2 text-[9px]">
        <span className="text-neutral-400 flex items-center gap-1">
          <Cpu className="w-3 h-3 text-[#00FC43]" />
          <span>Turbopack: <strong className="text-white">{current.metric}</strong></span>
        </span>
        <span className="text-[#00FC43] font-bold bg-[#00FC43]/10 px-1.5 py-0.5 rounded border border-[#00FC43]/20">
          {current.status}
        </span>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 03. ARTIFACT 02: LIVE CONTINUOUSLY SURGING GROWTH GRAPH                   */
/* ========================================================================= */
function LiveSurgingGraph() {
  const [metric, setMetric] = useState(284);
  const [revenue, setRevenue] = useState(148200);
  const [isSurging, setIsSurging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSurging(true);
      setMetric((prev) => {
        // Continuous upward wave that resets slightly after peak
        if (prev >= 328) return 284;
        return prev + Math.floor(Math.random() * 5) + 3;
      });
      setRevenue((prev) => {
        if (prev >= 185000) return 148200;
        return prev + Math.floor(Math.random() * 2500) + 1200;
      });
      setTimeout(() => setIsSurging(false), 600);
    }, 1900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Telemetry Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/30">
            <TrendingUp className="w-3 h-3" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-white block">Revenue Velocity</span>
            <span className="text-[9px] text-neutral-400 font-mono">Live Conversion Index</span>
          </div>
        </div>

        {/* Live Ticker */}
        <div className="text-right">
          <div className="inline-flex items-center gap-1">
            <span
              className={clsx(
                'editorial-serif text-base sm:text-lg font-normal text-[#00FC43] transition-all duration-300',
                isSurging && 'scale-110 text-white drop-shadow-[0_0_12px_#00FC43]'
              )}
            >
              +{metric}%
            </span>
            <span className="text-[9px] font-mono text-[#00FC43] bg-[#00FC43]/15 px-1 py-0.2 rounded border border-[#00FC43]/30 animate-pulse">
              ↑ SURGE
            </span>
          </div>
          <span className="text-[8px] font-mono text-neutral-400 block -mt-0.5">
            ৳{revenue.toLocaleString()}/mo
          </span>
        </div>
      </div>

      {/* 3D Glowing Live Upward-Surging Wave Graph */}
      <div className="relative h-20 w-full flex items-end justify-between gap-1.5 px-0.5 pt-1 overflow-hidden">
        {/* Ambient Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="w-full border-b border-dashed border-white/20" />
          <div className="w-full border-b border-dashed border-white/20" />
          <div className="w-full border-b border-dashed border-white/20" />
        </div>

        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 300 70"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="liveSurgeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FC43" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00FC43" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00FC43" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#00FC43" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Upward Volumetric Fill Area */}
          <path
            d="M 0,65 Q 60,62 110,42 T 210,22 T 300,6 L 300,70 L 0,70 Z"
            fill="url(#liveSurgeGradient)"
          />

          {/* Upward Surging Glowing Stroke */}
          <path
            d="M 0,65 Q 60,62 110,42 T 210,22 T 300,6"
            stroke="url(#strokeGradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="drop-shadow-[0_0_10px_rgba(0,252,67,0.9)]"
          />

          {/* Apex Point Marker Pulsing Live */}
          <circle cx="300" cy="6" r="5" fill="#00FC43" className="animate-ping" />
          <circle cx="300" cy="6" r="3" fill="#ffffff" />
        </svg>

        {/* 6 Ascending Glass Bar Columns that Rhythmically Elevate */}
        <div className="w-1/6 h-[25%] bg-white/5 rounded-t border-t border-white/10" />
        <div className="w-1/6 h-[38%] bg-white/5 rounded-t border-t border-white/10" />
        <div className="w-1/6 h-[50%] bg-[#00FC43]/10 rounded-t border-t border-[#00FC43]/20" />
        <div className="w-1/6 h-[64%] bg-[#00FC43]/15 rounded-t border-t border-[#00FC43]/40" />
        <div className="w-1/6 h-[78%] bg-[#00FC43]/25 rounded-t border-t border-[#00FC43]/60 shadow-[0_0_12px_rgba(0,252,67,0.3)]" />
        <div
          className={clsx(
            'w-1/6 bg-gradient-to-t from-[#00FC43]/30 to-[#00FC43]/60 rounded-t border-t border-[#00FC43] shadow-[0_0_16px_rgba(0,252,67,0.6)] transition-all duration-500',
            isSurging ? 'h-[100%]' : 'h-[92%]'
          )}
        />
      </div>

      {/* Metric Tags */}
      <div className="mt-2 pt-2 border-t border-white/5 grid grid-cols-2 gap-1.5 text-[9px] font-mono">
        <div className="p-1 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between">
          <span className="text-neutral-400">Ad CAC:</span>
          <span className="text-[#00FC43] font-bold">-38.4%</span>
        </div>
        <div className="p-1 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between">
          <span className="text-neutral-400">Checkout:</span>
          <span className="text-white font-bold">&lt;180ms</span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 04. ARTIFACT 03: LIVE SPRINT RADAR & MILESTONE TRACKER                    */
/* ========================================================================= */
function LiveSprintRadar() {
  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/30">
            <Timer className="w-3 h-3" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-white block">Agile Milestone Tracker</span>
            <span className="text-[9px] text-neutral-400 font-mono">Real-Time Sprint Audit</span>
          </div>
        </div>
        <span className="text-[9px] font-mono font-bold text-[#00FC43] bg-[#00FC43]/10 px-2 py-0.5 rounded-full border border-[#00FC43]/20">
          SLA 14-DAYS
        </span>
      </div>

      {/* 3 Compact Sprint Milestone Stages */}
      <div className="space-y-1.5 text-[10px]">
        <div className="flex items-center justify-between p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#00FC43] text-[#050906] flex items-center justify-center font-bold text-[9px] shadow-[0_0_8px_#00FC43]">
              ✓
            </div>
            <span className="font-medium text-white truncate max-w-[170px] sm:max-w-none">
              Phase 1: Architecture &amp; Wireframe
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#00FC43] font-bold shrink-0">APPROVED</span>
        </div>

        <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#00FC43]/[0.05] border border-[#00FC43]/30">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#00FC43]/20 text-[#00FC43] border border-[#00FC43] flex items-center justify-center font-bold text-[9px] animate-pulse">
              ●
            </div>
            <span className="font-semibold text-white truncate max-w-[170px] sm:max-w-none">
              Phase 2: High-Velocity Engineering
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#00FC43] font-bold shrink-0 animate-pulse">
            LIVE STAGING
          </span>
        </div>

        <div className="flex items-center justify-between p-1.5 rounded-lg bg-white/[0.01] border border-white/5 opacity-65">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-white/10 text-neutral-400 flex items-center justify-center font-bold text-[9px]">
              3
            </div>
            <span className="font-normal text-neutral-300 truncate max-w-[170px] sm:max-w-none">
              Phase 3: Production Launch &amp; CDN
            </span>
          </div>
          <span className="text-[9px] font-mono text-neutral-400 shrink-0">DAY 14</span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 05. ARTIFACT 04: LIVE KHULNA HQ STUDIO COMMAND HUB                        */
/* ========================================================================= */
function LiveStudioCommandHub() {
  const { openWhatsApp } = useActiveWhatsApp();

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/30">
            <MapPin className="w-3 h-3 text-[#00FC43]" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-white block">TOTO Digital HQ</span>
            <span className="text-[9px] text-neutral-400 font-mono">Sonadanga, Khulna · BD</span>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/20 text-[9px] text-[#00FC43] font-mono font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] animate-ping" />
          <span>LIVE POD</span>
        </div>
      </div>

      {/* Compact Specs Box */}
      <div className="p-2 rounded-lg bg-white/[0.02] border border-white/10 space-y-1 text-[10px]">
        <div className="flex items-center justify-between">
          <span className="text-neutral-400 font-mono">Office Address:</span>
          <span className="text-white font-medium truncate max-w-[170px]">
            256 Upper Rd, Mou Market 3rd Fl
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-neutral-400 font-mono">Direct Ping:</span>
          <span className="text-[#00FC43] font-bold font-mono">&lt; 15 Min Lead Architect</span>
        </div>
      </div>

      {/* Action Row */}
      <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between gap-2">
        <span className="text-[10px] text-neutral-400 truncate">
          Consult directly with lead pod:
        </span>
        <button
          type="button"
          onClick={() =>
            openWhatsApp('home_pillars_studio_pod', {
              customMessage:
                'Hi TOTO Development, I would like to consult directly with your dedicated studio engineering pod.',
            })
          }
          className="px-2.5 py-1 rounded-full bg-[#00FC43] hover:bg-[#00e33c] text-[#041608] text-[10px] font-bold inline-flex items-center gap-1 transition-all shadow-[0_0_12px_rgba(0,252,67,0.35)] active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
        >
          <FaWhatsapp className="w-3 h-3" />
          <span>Connect Pod</span>
        </button>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 06. MASTER EXPORT: APPLE SPATIAL PILLARS SECTION                          */
/* ========================================================================= */
export function AppleSpatialPillars() {
  return (
    <section
      className="py-16 sm:py-24 px-4 relative z-20 border-t border-b border-white/10 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 50% 0%, rgba(0, 252, 67, 0.08) 0%, rgba(6, 10, 7, 0.96) 45%, #040705 100%)',
      }}
    >
      {/* Background Spatial Grid & Multi-Point Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#00FC43]/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <Badge variant="emerald">SPATIAL ENGINEERING EXCELLENCE</Badge>
          <h2 className="editorial-serif text-2xl sm:text-4xl md:text-5xl font-normal text-white mt-3 tracking-tight leading-[1.18]">
            Why Ambitious Leaders{' '}
            <span className="italic text-[#00FC43] drop-shadow-[0_0_30px_rgba(0,252,67,0.35)]">
              Choose TOTO
            </span>
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto mt-2.5 leading-relaxed font-light">
            We replace guesswork with engineering rigor. Clean architecture, transparent
            milestones, and quantifiable business outcomes designed for mission-critical scale.
          </p>
        </div>

        {/* Compact Apple-Grade 2x2 Bento Spatial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* ========================================================================= */}
          {/* CARD 01: Zero Technical Debt (Live Compiling Code Terminal)               */}
          {/* ========================================================================= */}
          <CompactSpatialCard
            number="01"
            badge="ZERO TECH DEBT"
            title="Architectural Rigor"
            bengaliTitle="জিরো টেকনিক্যাল ডেব্ট ও ক্লিন কোড"
            description="No fragile off-the-shelf templates or bloated plugins. We author clean, maintainable TypeScript and Next.js 14 platforms built to endure millions of monthly hits."
          >
            <LiveCodeTerminal />
          </CompactSpatialCard>

          {/* ========================================================================= */}
          {/* CARD 02: 3× Client ROI (Live Continuously Surging Growth Graph)           */}
          {/* ========================================================================= */}
          <CompactSpatialCard
            number="02"
            badge="3× CLIENT ROI"
            title="Direct Business Impact"
            bengaliTitle="৩ গুণ ক্লায়েন্ট আরওআই ও সেলস কনভার্সন"
            description="Code is useless if it does not grow revenue. Every interface, button, and animation is engineered with conversion ergonomics to drive quantifiable top-line ROI."
          >
            <LiveSurgingGraph />
          </CompactSpatialCard>

          {/* ========================================================================= */}
          {/* CARD 03: 90% On-Time Delivery (Live Sprint Radar & Milestones)            */}
          {/* ========================================================================= */}
          <CompactSpatialCard
            number="03"
            badge="90% ON-TIME"
            title="Velocity Without Compromise"
            bengaliTitle="নির্ধারিত সময়ে ৯৯% অন-টাইম ডেলিভারি"
            description="Our sprint-based methodology delivers production software in weeks, not quarters. Transparent roadmaps with weekly live staging builds you test directly in your browser."
          >
            <LiveSprintRadar />
          </CompactSpatialCard>

          {/* ========================================================================= */}
          {/* CARD 04: Dedicated Pod Support (Live Khulna HQ Command Hub)               */}
          {/* ========================================================================= */}
          <CompactSpatialCard
            number="04"
            badge="STUDIO PODS"
            title="Dedicated Pod Support"
            bengaliTitle="খুলনা হেডকোয়ার্টার্স ও ডেডিকেটেড সাপোর্ট"
            description="Operating from our Khulna headquarters, we combine deep market mastery with international engineering standards, backed by dedicated direct WhatsApp communication."
          >
            <LiveStudioCommandHub />
          </CompactSpatialCard>
        </div>
      </div>
    </section>
  );
}
