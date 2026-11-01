'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Inbox,
  Package,
  Percent,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  RefreshCw,
  PhoneCall,
  Activity,
  Layers,
  Flame,
  DollarSign,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

interface OverviewData {
  metrics: {
    totalEnquiries: number;
    newLeads: number;
    pendingRequests: number;
    totalPackages: number;
    activeDiscounts: number;
    totalWhatsAppClicks: number;
    whatsAppClicksToday: number;
  };
  activeWhatsApp: {
    agentId: number | null;
    agentName: string;
    phoneNumber: string;
    isScheduled: boolean;
    isOverride: boolean;
    scheduleDetails?: {
      startTime: string;
      endTime: string;
      timezone: string;
    };
    serverTimeDhaka: string;
  };
  clicksBySource: { source: string; count: string }[];
  packagePerformance: {
    package_name: string;
    request_count: string;
    potential_revenue: string;
  }[];
  pipeline: { status: string; count: string }[];
  recentRequests: {
    id: string;
    full_name: string;
    business_name: string;
    package_name: string;
    quoted_price: string;
    currency: string;
    status: string;
    created_at: string;
    phone?: string;
  }[];
  recentLogs: {
    id: number;
    user_name: string;
    action_type: string;
    entity_type: string;
    entity_id: string;
    created_at: string;
  }[];
}

export default function AdminOverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const fetchOverview = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch('/api/admin/overview/', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error('Failed to load overview data', e);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new_request':
        return 'badge-cyan-glow';
      case 'contacted':
        return 'badge-amber-glow';
      case 'discussion':
        return 'badge-violet-glow';
      case 'quotation_sent':
        return 'badge-cyan-glow';
      case 'confirmed':
        return 'badge-emerald-glow';
      case 'in_progress':
        return 'badge-emerald-glow';
      case 'completed':
        return 'badge-emerald-glow';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    }
  };

  const formatStatus = (s: string) => {
    return s.replace(/_/g, ' ').toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse max-w-7xl mx-auto">
        <div className="h-28 bg-white/[0.03] rounded-3xl border border-white/[0.05]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-36 bg-white/[0.03] rounded-3xl border border-white/[0.05]" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-white/[0.03] rounded-3xl border border-white/[0.05]" />
          <div className="h-96 bg-white/[0.03] rounded-3xl border border-white/[0.05]" />
        </div>
      </div>
    );
  }

  const metrics = data?.metrics;
  const activeWA = data?.activeWhatsApp;

  // Calculate total pipeline revenue
  const totalPipelineRevenue = data?.packagePerformance?.reduce(
    (sum, p) => sum + (parseFloat(p.potential_revenue) || 0),
    0
  ) || 0;

  // Filter requests
  const filteredRequests = data?.recentRequests?.filter((r) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'new') return r.status === 'new_request';
    if (selectedFilter === 'discussion') return r.status === 'discussion' || r.status === 'quotation_sent';
    if (selectedFilter === 'confirmed') return r.status === 'confirmed' || r.status === 'completed';
    return true;
  }) || [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan-glow text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>CENTRAL AGENCY TELEMETRY • LIVE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gradient-silver">
            Executive Command Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Multi-agent WhatsApp rotation telemetry, qualified purchase pipelines, and high-conversion client touchpoints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchOverview}
            disabled={isRefreshing}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-cyan-500/40 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Live Sync'}</span>
          </button>

          <Link
            href="/admin/purchase-requests"
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-95"
          >
            <Inbox className="w-4 h-4 text-black" />
            <span>View All Leads</span>
          </Link>
        </div>
      </div>

      {/* 1. REAL-TIME WHATSAPP ON-DUTY COCKPIT HERO BANNER */}
      {activeWA && (
        <div className="relative rounded-3xl p-6 sm:p-7 admin-glass-card border border-emerald-500/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Ambient Mesh Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-transparent blur-[100px] pointer-events-none -z-10" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-[0_0_30px_rgba(16,185,129,0.35)] shrink-0">
                <div className="w-full h-full bg-[#080d16] rounded-[14px] flex items-center justify-center text-emerald-400">
                  <FaWhatsapp className="w-7 h-7" />
                </div>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-[#080d16] animate-pulse" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
                    ACTIVE WHATSAPP ON-DUTY AGENT
                  </span>
                  {activeWA.isOverride ? (
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full badge-amber-glow font-bold">
                      MANUAL OVERRIDE
                    </span>
                  ) : activeWA.isScheduled ? (
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full badge-emerald-glow font-bold">
                      SCHEDULE RESOLVED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full badge-cyan-glow font-bold">
                      FALLBACK ACTIVE
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {activeWA.agentName}
                </h3>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-300 font-mono">
                  <a
                    href={`https://wa.me/${activeWA.phoneNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>{activeWA.phoneNumber}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {activeWA.scheduleDetails && (
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Shift: {activeWA.scheduleDetails.startTime} – {activeWA.scheduleDetails.endTime} ({activeWA.scheduleDetails.timezone})
                    </span>
                  )}

                  <span className="text-slate-400 hidden sm:inline">
                    Server: <strong className="text-slate-200">{activeWA.serverTimeDhaka}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/admin/whatsapp-scheduler"
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] hover:border-white/[0.2] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Manage Shifts</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/admin/whatsapp"
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              >
                All 6 Agents
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. CORE BUSINESS METRIC CARDS (STANDARD COLORFUL PALETTE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Enquiries (CYAN) */}
        <div className="p-5 rounded-3xl admin-card-cyan rounded-2xl flex flex-col justify-between transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-cyan-400 font-bold">
              Total Enquiries
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="num-tabular text-3xl sm:text-4xl font-extrabold text-white block">
              {metrics?.totalEnquiries ?? 0}
            </span>
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
              <span>Forms & Package Inquiries</span>
              <span className="text-cyan-400 font-semibold font-mono">+18%</span>
            </div>
          </div>
        </div>

        {/* Card 2: New Actionable Leads (EMERALD) */}
        <div className="p-5 rounded-3xl admin-card-emerald rounded-2xl flex flex-col justify-between transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-emerald-400 font-bold">
              Actionable Leads
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="num-tabular text-3xl sm:text-4xl font-extrabold text-emerald-400 block">
              {metrics?.newLeads ?? 0}
            </span>
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
              <span>Ready for outreach</span>
              <span className="text-emerald-400 font-bold font-mono">PRIORITY</span>
            </div>
          </div>
        </div>

        {/* Card 3: Active Deal Pipeline (VIOLET) */}
        <div className="p-5 rounded-3xl admin-card-violet rounded-2xl flex flex-col justify-between transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-violet-400 font-bold">
              Active Pipeline
            </span>
            <div className="p-2 rounded-xl bg-violet-500/15 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="num-tabular text-3xl sm:text-4xl font-extrabold text-violet-300 block">
              {metrics?.pendingRequests ?? 0}
            </span>
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
              <span>In discussion & quotes</span>
              <span className="text-violet-400 font-semibold font-mono">CLOSING</span>
            </div>
          </div>
        </div>

        {/* Card 4: WhatsApp Clicks (GREEN / WHATSAPP) */}
        <div className="p-5 rounded-3xl admin-card-emerald rounded-2xl flex flex-col justify-between transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-emerald-400 font-bold">
              WhatsApp Clicks
            </span>
            <div className="p-2 rounded-xl bg-[#25D366]/20 text-[#25D366] shadow-[0_0_15px_rgba(37,211,102,0.25)]">
              <FaWhatsapp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="num-tabular text-3xl sm:text-4xl font-extrabold text-white">
                {metrics?.totalWhatsAppClicks ?? 0}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                +{metrics?.whatsAppClicksToday ?? 0} today
              </span>
            </div>
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
              <span>Direct customer chats</span>
              <span className="text-emerald-400 font-semibold font-mono">LIVE</span>
            </div>
          </div>
        </div>

        {/* Card 5: Pipeline Revenue / Value (AMBER / GOLD) */}
        <div className="p-5 rounded-3xl admin-card-amber rounded-2xl flex flex-col justify-between transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-amber-400 font-bold">
              Pipeline GMV Value
            </span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="num-tabular text-2xl sm:text-3xl font-extrabold text-amber-300 block">
              ৳{totalPipelineRevenue.toLocaleString('en-BD')}
            </span>
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
              <span>Active proposal total</span>
              <span className="text-amber-400 font-semibold font-mono">QUALIFIED</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. VISUAL PIPELINE STAGES BAR (WORLD-BEST CRM FLOW) */}
      <div className="p-6 rounded-3xl admin-glass-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Deal Conversion Velocity & Stage Funnel</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live progression of customer purchase proposals through qualification stages
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Total Inquiries:</span>
            <strong className="text-white font-bold">{metrics?.totalEnquiries ?? 0}</strong>
          </div>
        </div>

        {/* Visual Multi-Stage Progress Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {/* Stage 1: New Request */}
          <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/25">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold text-sky-400 uppercase">Stage 01</span>
              <span className="w-2 h-2 rounded-full bg-sky-400" />
            </div>
            <p className="text-xs font-semibold text-white">New Request</p>
            <p className="num-tabular text-lg font-extrabold text-sky-300 mt-1">
              {metrics?.newLeads ?? 0} <span className="text-xs text-slate-400 font-normal">leads</span>
            </p>
          </div>

          {/* Stage 2: Contacted */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">Stage 02</span>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
            <p className="text-xs font-semibold text-white">Contacted</p>
            <p className="num-tabular text-lg font-extrabold text-amber-300 mt-1">
              {data?.pipeline?.find((p) => p.status === 'contacted')?.count ?? '0'} <span className="text-xs text-slate-400 font-normal">in touch</span>
            </p>
          </div>

          {/* Stage 3: Discussion */}
          <div className="p-3.5 rounded-2xl bg-violet-500/10 border border-violet-500/25">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold text-violet-400 uppercase">Stage 03</span>
              <span className="w-2 h-2 rounded-full bg-violet-400" />
            </div>
            <p className="text-xs font-semibold text-white">In Discussion</p>
            <p className="num-tabular text-lg font-extrabold text-violet-300 mt-1">
              {data?.pipeline?.find((p) => p.status === 'discussion')?.count ?? '0'} <span className="text-xs text-slate-400 font-normal">active</span>
            </p>
          </div>

          {/* Stage 4: Quotation Sent */}
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/25">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">Stage 04</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <p className="text-xs font-semibold text-white">Quotation Sent</p>
            <p className="num-tabular text-lg font-extrabold text-cyan-300 mt-1">
              {data?.pipeline?.find((p) => p.status === 'quotation_sent')?.count ?? '0'} <span className="text-xs text-slate-400 font-normal">reviewing</span>
            </p>
          </div>

          {/* Stage 5: Confirmed / Won */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Stage 05</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-xs font-semibold text-white">Confirmed Deals</p>
            <p className="num-tabular text-lg font-extrabold text-emerald-300 mt-1">
              {data?.pipeline?.find((p) => p.status === 'confirmed' || p.status === 'completed')?.count ?? '0'} <span className="text-xs text-slate-400 font-normal">won</span>
            </p>
          </div>
        </div>
      </div>

      {/* 4. PERFORMANCE GRID: PACKAGE DEMAND & TRAFFIC ORIGINS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Package Demand & Leaderboard (2 Cols) */}
        <div className="lg:col-span-2 p-6 sm:p-7 rounded-3xl admin-glass-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight">
                Package Demand & Revenue Leaderboard
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Conversion demand and pipeline value generated per agency service tier
              </p>
            </div>
            <Link
              href="/admin/packages"
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
            >
              <span>Manage ({metrics?.totalPackages})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {data?.packagePerformance && data.packagePerformance.length > 0 ? (
              data.packagePerformance.map((pkg, idx) => {
                const count = parseInt(pkg.request_count, 10);
                const revenue = parseFloat(pkg.potential_revenue) || 0;
                const isTop = idx === 0;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isTop
                        ? 'bg-gradient-to-r from-amber-500/10 via-white/[0.02] to-transparent border-amber-500/30 shadow-[0_4px_20px_rgba(245,158,11,0.1)]'
                        : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono font-extrabold shrink-0 ${
                          idx === 0
                            ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                            : idx === 1
                            ? 'bg-slate-300 text-black'
                            : idx === 2
                            ? 'bg-amber-700 text-white'
                            : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{pkg.package_name}</h4>
                          {isTop && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                              TOP CHOICE
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          {count} customer purchase {count === 1 ? 'request' : 'requests'}
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="num-tabular text-lg font-extrabold text-emerald-400 block">
                        ৳{revenue.toLocaleString('en-BD')}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Pipeline Value
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-500 py-8 text-center">
                No purchase requests recorded yet.
              </p>
            )}
          </div>
        </div>

        {/* WhatsApp Traffic By Source & Active Discounts (1 Col) */}
        <div className="space-y-6">
          {/* Active Discounts Card */}
          <div className="p-6 rounded-3xl admin-card-violet rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-violet-300 font-bold">
                Dynamic Pricing Rules
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full badge-violet-glow font-mono font-bold">
                {metrics?.activeDiscounts} Active
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Discounts are calculated server-side in real-time with anti-tampering verification and automatic expiration dates.
            </p>

            <Link
              href="/admin/discounts"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-bold"
            >
              <span>Manage Pricing & Discounts</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* WhatsApp Clicks By Source Card */}
          <div className="p-6 rounded-3xl admin-glass-card">
            <h3 className="text-sm font-extrabold text-white mb-3 tracking-tight flex items-center justify-between">
              <span>Traffic Sources</span>
              <span className="text-[10px] font-mono text-emerald-400">TOUCHPOINTS</span>
            </h3>

            <div className="space-y-3">
              {data?.clicksBySource && data.clicksBySource.length > 0 ? (
                data.clicksBySource.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-slate-300 font-mono text-[11px] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {c.source}
                    </span>
                    <span className="font-bold text-white bg-white/[0.08] px-2.5 py-1 rounded-lg num-tabular">
                      {c.count} clicks
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 py-3 text-center">No clicks tracked yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. RECENT CUSTOMER PURCHASE REQUESTS TABLE (HIGH LUXURY FINTECH/SAAS) */}
      <div className="p-6 sm:p-7 rounded-3xl admin-glass-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight">
              Recent Purchase Enquiries & CRM Feed
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live inbound customer requests submitted via the flagship website
            </p>
          </div>

          {/* Fast Filters */}
          <div className="flex items-center gap-2">
            {[
              { key: 'all', label: 'All Deals' },
              { key: 'new', label: 'New Requests' },
              { key: 'discussion', label: 'In Discussion' },
              { key: 'confirmed', label: 'Confirmed' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setSelectedFilter(f.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === f.key
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.06]'
                }`}
              >
                {f.label}
              </button>
            ))}

            <Link
              href="/admin/purchase-requests"
              className="ml-2 text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
            >
              <span>Full CRM Table</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto admin-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="pb-3.5 font-bold">Request ID</th>
                <th className="pb-3.5 font-bold">Customer & Business</th>
                <th className="pb-3.5 font-bold">Package</th>
                <th className="pb-3.5 font-bold">Quoted Price</th>
                <th className="pb-3.5 font-bold">Status</th>
                <th className="pb-3.5 font-bold">Date</th>
                <th className="pb-3.5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="py-4 font-mono text-cyan-400 font-bold">{req.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                          {req.full_name?.charAt(0) || 'C'}
                        </div>
                        <div>
                          <span className="font-semibold text-white block group-hover:text-emerald-300 transition-colors">
                            {req.full_name}
                          </span>
                          <span className="text-[11px] text-slate-400">{req.business_name || 'Individual'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-200 font-medium">
                        {req.package_name}
                      </span>
                    </td>
                    <td className="py-4 num-tabular font-bold text-white text-sm">
                      ৳{parseFloat(req.quoted_price).toLocaleString('en-BD')}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${getStatusBadge(
                          req.status
                        )}`}
                      >
                        {formatStatus(req.status)}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400 font-mono text-[11px]">
                      {new Date(req.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        {req.phone && (
                          <a
                            href={`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${req.full_name}, this is TOTO Development regarding your purchase request ${req.id} for ${req.package_name}.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-colors"
                            title="Direct WhatsApp Client"
                          >
                            <FaWhatsapp className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <Link
                          href={`/admin/purchase-requests?id=${req.id}`}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white border border-white/[0.08] transition-all font-semibold"
                        >
                          Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500 font-mono">
                    No requests found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. SYSTEM AUDIT ACTIVITY LOGS FEED */}
      <div className="p-6 rounded-3xl admin-glass-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            <h3 className="text-sm font-extrabold text-white tracking-tight uppercase font-mono">
              Live System Activity & Audit Trail
            </h3>
          </div>
          <Link
            href="/admin/activity-logs"
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            <span>Full Audit Trail</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {data?.recentLogs && data.recentLogs.length > 0 ? (
            data.recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between text-xs py-2.5 px-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-bold text-white">{log.user_name}</span>
                  <span className="px-2 py-0.5 rounded-md bg-white/[0.05] text-slate-300 font-mono text-[10px]">
                    {log.action_type}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">{log.entity_id}</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  {new Date(log.created_at).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 py-3 text-center">No activity logs recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}