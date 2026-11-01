'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Inbox,
  Clock,
  Sparkles,
  RefreshCw,
  Loader2,
  Calendar,
  Layers,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

export default function AnalyticsReportsPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/overview/', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan-glow text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>TELEMETRY & CONVERSION INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-silver">
            Analytics & Conversion Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track user journey touchpoints, WhatsApp traffic sources, and deal pipeline conversion velocity.
          </p>
        </div>

        <button
          onClick={fetchAnalytics}
          className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-black" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* WhatsApp Traffic */}
        <div className="p-6 rounded-3xl admin-card-emerald rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-emerald-400 font-bold">
              Total WhatsApp Traffic
            </span>
            <FaWhatsapp className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="num-tabular text-4xl font-extrabold text-white block">
            {data?.metrics?.totalWhatsAppClicks ?? 0}
          </span>
          <span className="text-xs text-emerald-400 mt-1 block font-mono font-bold">
            +{data?.metrics?.whatsAppClicksToday ?? 0} clicks recorded today
          </span>
        </div>

        {/* Customer Enquiries */}
        <div className="p-6 rounded-3xl admin-card-cyan rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-cyan-400 font-bold">
              Customer Enquiries
            </span>
            <Inbox className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="num-tabular text-4xl font-extrabold text-white block">
            {data?.metrics?.totalEnquiries ?? 0}
          </span>
          <span className="text-xs text-slate-400 mt-1 block">
            {data?.metrics?.newLeads ?? 0} awaiting sales contact
          </span>
        </div>

        {/* Active Deals */}
        <div className="p-6 rounded-3xl admin-card-violet rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-violet-400 font-bold">
              Active Deals
            </span>
            <TrendingUp className="w-4 h-4 text-violet-400" />
          </div>
          <span className="num-tabular text-4xl font-extrabold text-violet-300 block">
            {data?.metrics?.pendingRequests ?? 0}
          </span>
          <span className="text-xs text-slate-400 mt-1 block font-mono">
            In active negotiation stages
          </span>
        </div>
      </div>

      {/* Traffic Sources & Package Revenue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WhatsApp Sources */}
        <div className="p-6 sm:p-7 rounded-3xl admin-glass-card shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <h3 className="text-base font-extrabold text-white mb-2 tracking-tight">
            WhatsApp Click Attribution
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Where visitors are initiating WhatsApp conversations across the site
          </p>

          <div className="space-y-4">
            {data?.clicksBySource && data.clicksBySource.length > 0 ? (
              data.clicksBySource.map((c: any, i: number) => {
                const total = data.metrics.totalWhatsAppClicks || 1;
                const count = parseInt(c.count, 10);
                const pct = Math.round((count / total) * 100);

                return (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white font-mono">{c.source}</span>
                      <span className="text-emerald-400 font-mono font-bold num-tabular">
                        {c.count} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/[0.05] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">No clicks tracked yet.</p>
            )}
          </div>
        </div>

        {/* Lead Pipeline Distribution */}
        <div className="p-6 sm:p-7 rounded-3xl admin-glass-card shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <h3 className="text-base font-extrabold text-white mb-2 tracking-tight">
            Pipeline Funnel Distribution
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Stage-by-stage distribution of all customer purchase enquiries
          </p>

          <div className="space-y-3">
            {data?.pipeline && data.pipeline.length > 0 ? (
              data.pipeline.map((p: any, i: number) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.05] flex items-center justify-between text-xs"
                >
                  <span className="font-mono text-white uppercase tracking-wider font-semibold">
                    {p.status.replace(/_/g, ' ')}
                  </span>
                  <span className="badge-emerald-glow font-mono font-bold px-3 py-1 rounded-xl">
                    {p.count} leads
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">No leads recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}