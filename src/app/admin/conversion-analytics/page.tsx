'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  Target,
  ArrowDownRight,
  Filter,
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  description: string;
  conversionFromPrev: string;
  dropOffRate: string;
  overallRate: string;
}

interface SourceChannel {
  source_channel: string;
  total_events: string;
}

export default function ConversionAnalyticsPage() {
  const [period, setPeriod] = useState<'today' | '7d' | '30d'>('30d');
  const [funnel, setFunnel] = useState<FunnelStage[]>([]);
  const [sources, setSources] = useState<SourceChannel[]>([]);
  const [overallRate, setOverallRate] = useState('0.0%');
  const [isLoading, setIsLoading] = useState(true);

  const fetchFunnel = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics/conversions/?period=${period}`);
      if (res.ok) {
        const data = await res.json();
        setFunnel(data.funnel || []);
        setSources(data.sources || []);
        setOverallRate(data.overallConversionRate || '0.0%');
      }
    } catch (e) {
      console.error('Error loading conversion funnel:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFunnel();
  }, [period]);

  const maxStageCount = funnel.length > 0 ? funnel[0].count : 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/30">
              Pipeline Intelligence
            </span>
            <span className="text-xs text-neutral-400">Full-Funnel Measurement</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#00FC43]" />
            Conversion Funnel Analytics
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Stage-by-stage drop-off tracking from first impression to verified agency contract.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center bg-[#080d09] border border-white/10 rounded-xl p-1 text-xs">
          {(['today', '7d', '30d'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                period === p
                  ? 'bg-[#00FC43]/20 text-[#00FC43] border border-[#00FC43]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {p === 'today' ? 'Today' : p === '7d' ? 'Last 7 Days' : 'Last 30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-1">
          <div className="text-xs text-neutral-400">Top of Funnel (Unique Visitors)</div>
          <div className="text-2xl font-bold font-mono text-white">
            {funnel[0]?.count || 0}
          </div>
          <div className="text-[11px] text-neutral-500">Initiating prospective client sessions</div>
        </div>

        <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-1">
          <div className="text-xs text-neutral-400">Bottom of Funnel (Verified Projects)</div>
          <div className="text-2xl font-bold font-mono text-[#00FC43]">
            {funnel[funnel.length - 1]?.count || 0}
          </div>
          <div className="text-[11px] text-neutral-500">Confirmed & active clients</div>
        </div>

        <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-1">
          <div className="text-xs text-neutral-400">Overall Funnel Conversion Rate</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{overallRate}</div>
          <div className="text-[11px] text-neutral-500">Visitor to closed client conversion</div>
        </div>
      </div>

      {/* Funnel Visualizer */}
      <div className="p-6 rounded-2xl bg-[#080d09] border border-white/10 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-[#00FC43]" />
            <span>6-Stage Agency Conversion Funnel</span>
          </h3>
          <span className="text-[11px] text-neutral-500">Real-time data synchronization</span>
        </div>

        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center text-neutral-400 space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#00FC43]" />
            <span className="text-xs">Computing funnel progression...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {funnel.map((stage, idx) => {
              const widthPct = Math.max(12, Math.round((stage.count / maxStageCount) * 100));

              return (
                <div key={stage.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-white/10 text-neutral-300 flex items-center justify-center text-[10px] font-mono font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-white text-sm">{stage.name}</span>
                      <span className="text-neutral-500 text-[11px] hidden md:inline">
                        — {stage.description}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 font-mono text-xs">
                      <span className="text-white font-bold text-sm">
                        {stage.count.toLocaleString()}
                      </span>
                      {idx > 0 && (
                        <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                          {stage.conversionFromPrev} conv
                        </span>
                      )}
                      {idx > 0 && (
                        <span className="text-red-400 text-[11px] flex items-center gap-0.5">
                          <ArrowDownRight className="w-3 h-3" />
                          {stage.dropOffRate} drop
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Funnel Progress Bar with Neon Gradient */}
                  <div className="h-8 rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden relative flex items-center p-1">
                    <div
                      className="h-full rounded-lg bg-gradient-to-r from-emerald-500 via-[#00FC43] to-[#88FFA8] transition-all duration-700 flex items-center justify-end pr-3"
                      style={{ width: `${widthPct}%` }}
                    >
                      <span className="text-[10px] font-mono font-black text-[#041608]">
                        {stage.overallRate}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Traffic Sources & Channel Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-[#080d09] border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Traffic Source Channel Attribution
          </h3>
          <div className="space-y-2 text-xs">
            {sources.map((src, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
              >
                <span className="font-semibold text-neutral-300">{src.source_channel}</span>
                <span className="font-mono font-bold text-[#00FC43] bg-white/5 px-2.5 py-1 rounded">
                  {src.total_events} events
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel Optimization Insights */}
        <div className="p-5 rounded-2xl bg-[#080d09] border border-white/10 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00FC43]" />
            Conversion Optimization Architecture
          </h3>
          <div className="space-y-3 text-xs text-neutral-300 leading-relaxed">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="font-bold text-[#00FC43] block">1. Dynamic WhatsApp Routing</span>
              Shifts auto-rotate based on Dhaka timezone, ensuring incoming traffic is always met by an active senior architect.
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="font-bold text-[#00FC43] block">2. Meta CAPI Deduplication</span>
              Server dispatches identical event IDs as the client pixel, guaranteeing zero double-reporting and higher Meta ad optimization accuracy.
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="font-bold text-[#00FC43] block">3. Instant Price Locking</span>
              Package booking modal stores prefilled quotations directly in the lead history, preventing lead decay.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
