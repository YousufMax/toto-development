'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  Calendar,
  Filter,
  Download,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Info,
  Loader2,
  ShieldAlert,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

interface AgentMetric {
  id: number;
  agentName: string;
  phoneNumber: string;
  status: string;
  isDefault: boolean;
  isFallback: boolean;
  assignedSchedule: string;
  lifetimeClicks: number;
  rangeClicks: number;
  uniqueClickers: number;
  conversationsCount: number | null;
  verifiedConversions: number;
  conversionRate: string;
  lastActiveAt: string | null;
}

interface DeepDiveData {
  dailyTrend: Array<{ day: string; clicks: string; unique_visitors: string }>;
  sourceBreakdown: Array<{ source: string; count: string }>;
  deviceDistribution: Array<{ device: string; count: string }>;
  hourlyDistribution: Array<{ hour: string; count: string }>;
  topPages: Array<{ page_url: string; count: string }>;
  recentClicks: Array<{
    id: number;
    phone_number: string;
    source: string;
    page_url: string;
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    device_category: string | null;
    created_at: string;
    agent_name: string;
  }>;
}

export default function WhatsAppIntelligencePage() {
  const [period, setPeriod] = useState<'today' | 'yesterday' | '7d' | '30d'>('30d');
  const [agents, setAgents] = useState<AgentMetric[]>([]);
  const [deepDive, setDeepDive] = useState<DeepDiveData | null>(null);
  const [isWaBusinessConnected, setIsWaBusinessConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<AgentMetric | null>(null);

  const fetchMetrics = async (targetAgentId?: number) => {
    setIsLoading(true);
    try {
      const url = `/api/admin/whatsapp/intelligence?period=${period}${
        targetAgentId ? `&agentId=${targetAgentId}` : ''
      }`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setAgents(data.agents || []);
        setDeepDive(data.deepDive || null);
        setIsWaBusinessConnected(!!data.isWaBusinessConnected);
      }
    } catch (e) {
      console.error('Error fetching intelligence:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics(selectedAgent ? selectedAgent.id : undefined);
  }, [period, selectedAgent]);

  const handleExportCSV = () => {
    if (!agents.length) return;
    const headers = [
      'Agent Name',
      'WhatsApp Number',
      'Status',
      'Assigned Schedule',
      `Clicks (${period})`,
      'Unique Clickers',
      'Conversations',
      'Conversions',
      'Conversion Rate',
      'Last Active',
    ];
    const rows = agents.map((a) => [
      `"${a.agentName}"`,
      `"${a.phoneNumber}"`,
      a.status,
      `"${a.assignedSchedule}"`,
      a.rangeClicks,
      a.uniqueClickers,
      a.conversationsCount ?? 'Not Connected',
      a.verifiedConversions,
      a.conversionRate,
      a.lastActiveAt ? new Date(a.lastActiveAt).toLocaleString() : 'Never',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `whatsapp_intelligence_${period}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRangeClicks = agents.reduce((acc, curr) => acc + curr.rangeClicks, 0);
  const totalConversions = agents.reduce((acc, curr) => acc + curr.verifiedConversions, 0);
  const aggregateRate =
    totalRangeClicks > 0
      ? ((totalConversions / totalRangeClicks) * 100).toFixed(1) + '%'
      : '0.0%';

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/30">
              Intelligence Center
            </span>
            <span className="text-xs text-neutral-400">Direct Conversion Operations</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FaWhatsapp className="w-6 h-6 text-[#00FC43]" />
            WhatsApp Intelligence
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real-time attribution, contact volume, shift performance, and client conversion tracking.
          </p>
        </div>

        {/* Date Filter & Export */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#080d09] border border-white/10 rounded-xl p-1 text-xs">
            {(['today', 'yesterday', '7d', '30d'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  period === p
                    ? 'bg-[#00FC43]/20 text-[#00FC43] border border-[#00FC43]/30'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {p === 'today'
                  ? 'Today'
                  : p === 'yesterday'
                  ? 'Yesterday'
                  : p === '7d'
                  ? '7 Days'
                  : '30 Days'}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="Export CSV"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Total Contacts</span>
            <MessageSquare className="w-4 h-4 text-[#00FC43]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{totalRangeClicks}</div>
          <div className="text-[11px] text-neutral-500">
            Across {agents.length} agent numbers ({period})
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Verified Conversions</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{totalConversions}</div>
          <div className="text-[11px] text-neutral-500">Submitted purchase inquiries</div>
        </div>

        <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Contact-to-Quote Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{aggregateRate}</div>
          <div className="text-[11px] text-neutral-500">Conversion efficiency</div>
        </div>

        <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Cloud API Status</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xs font-semibold mt-1">
            {isWaBusinessConnected ? (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Cloud Sync
              </span>
            ) : (
              <span className="text-neutral-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-neutral-600" />
                Unconnected (Clicks Only)
              </span>
            )}
          </div>
          <div className="text-[11px] text-neutral-500">
            {isWaBusinessConnected
              ? 'Message read receipts active'
              : 'Webhooks unconfigured'}
          </div>
        </div>
      </div>

      {/* WhatsApp Business Cloud API Notice if not connected */}
      {!isWaBusinessConnected && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/90 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-300">
              Honest Data Transparency: WhatsApp Business Platform Not Connected
            </span>
            <p className="text-amber-300/80 leading-relaxed text-[11px]">
              Direct website button clicks, unique visitor sessions, and quotation conversions are accurately tracked and stored. 
              Conversation-level messaging metrics (received messages, two-way reply count) require Meta WhatsApp Cloud API credentials. 
              Configure your credentials in the <a href="/admin/marketing-integrations" className="underline font-bold text-white">Marketing Integrations</a> section to activate live 2-way analytics.
            </p>
          </div>
        </div>
      )}

      {/* Performance Overview Table */}
      <div className="rounded-xl border border-white/10 bg-[#080d09] overflow-hidden">
        <div className="px-4 py-3 bg-white/[0.02] border-b border-white/10 flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>Agent Numbers & Conversion Overview</span>
            <span className="text-[10px] text-neutral-500 font-normal">
              ({period.toUpperCase()})
            </span>
          </h3>
          {selectedAgent && (
            <button
              onClick={() => setSelectedAgent(null)}
              className="text-xs text-[#00FC43] hover:underline cursor-pointer"
            >
              Showing all agents (Click to reset filter)
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-neutral-400 space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#00FC43]" />
            <span className="text-xs">Analyzing agent performance...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.01] border-b border-white/10 text-neutral-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Agent Name</th>
                  <th className="py-3 px-4">WhatsApp Number</th>
                  <th className="py-3 px-4">Assigned Shift</th>
                  <th className="py-3 px-4 text-center">Total Clicks</th>
                  <th className="py-3 px-4 text-center">Unique Clickers</th>
                  <th className="py-3 px-4 text-center">Conversations</th>
                  <th className="py-3 px-4 text-center">Conversions</th>
                  <th className="py-3 px-4 text-center">Conversion Rate</th>
                  <th className="py-3 px-4">Last Activity</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {agents.map((ag) => {
                  const isSelected = selectedAgent?.id === ag.id;
                  return (
                    <tr
                      key={ag.id}
                      className={`transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#00FC43]/10 border-l-2 border-[#00FC43]'
                          : 'hover:bg-white/[0.02]'
                      }`}
                      onClick={() => setSelectedAgent(isSelected ? null : ag)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{ag.agentName}</span>
                          {ag.isDefault && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              Default
                            </span>
                          )}
                          {ag.isFallback && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              Fallback
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-medium text-neutral-300">
                        {ag.phoneNumber}
                      </td>

                      <td className="py-3.5 px-4 text-neutral-400 text-[11px] max-w-[200px] truncate">
                        {ag.assignedSchedule}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold text-white">
                        {ag.rangeClicks}
                        <span className="text-[10px] text-neutral-500 block font-normal">
                          {ag.lifetimeClicks} lifetime
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono text-neutral-300">
                        {ag.uniqueClickers}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        {isWaBusinessConnected ? (
                          <span className="font-mono text-white font-bold">
                            {ag.conversationsCount}
                          </span>
                        ) : (
                          <span
                            className="text-[10px] text-neutral-500 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                            title="Connect WhatsApp Business API in Marketing Integrations"
                          >
                            Not Connected
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-400">
                        {ag.verifiedConversions}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold">
                        <span
                          className={
                            parseFloat(ag.conversionRate) > 0
                              ? 'text-[#00FC43]'
                              : 'text-neutral-500'
                          }
                        >
                          {ag.conversionRate}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-neutral-400 text-[11px]">
                        {ag.lastActiveAt ? (
                          new Date(ag.lastActiveAt).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        ) : (
                          <span className="text-neutral-600">No clicks yet</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAgent(isSelected ? null : ag);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors inline-flex items-center gap-1"
                        >
                          <span>{isSelected ? 'Close' : 'Deep Dive'}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Deep Dive Individual / Global Analytics */}
      {deepDive && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00FC43]" />
              {selectedAgent
                ? `Individual Number Analytics: ${selectedAgent.agentName} (${selectedAgent.phoneNumber})`
                : 'Overall WhatsApp Conversion Analytics'}
            </h3>
            {selectedAgent && (
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-xs text-neutral-400 hover:text-white cursor-pointer"
              >
                Clear selection
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Source Breakdown */}
            <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-3">
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Trigger Source Breakdown
              </h4>
              {deepDive.sourceBreakdown.length === 0 ? (
                <div className="text-xs text-neutral-500 py-6 text-center">No source logs yet</div>
              ) : (
                <div className="space-y-2 text-xs">
                  {deepDive.sourceBreakdown.map((sb, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-neutral-300 capitalize">
                        {sb.source.replace(/_/g, ' ')}
                      </span>
                      <span className="font-mono font-bold text-white bg-white/5 px-2 py-0.5 rounded">
                        {sb.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Device Distribution */}
            <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-3">
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Device Category
              </h4>
              <div className="space-y-2 text-xs">
                {deepDive.deviceDistribution.map((dd, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-neutral-300 flex items-center gap-2 capitalize">
                      {dd.device === 'mobile' ? (
                        <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                      ) : dd.device === 'tablet' ? (
                        <Tablet className="w-3.5 h-3.5 text-blue-400" />
                      ) : (
                        <Monitor className="w-3.5 h-3.5 text-purple-400" />
                      )}
                      {dd.device}
                    </span>
                    <span className="font-mono font-bold text-white bg-white/5 px-2 py-0.5 rounded">
                      {dd.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Landing Pages */}
            <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-3">
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Top Contact Generating Pages
              </h4>
              {deepDive.topPages.length === 0 ? (
                <div className="text-xs text-neutral-500 py-6 text-center">No page logs yet</div>
              ) : (
                <div className="space-y-2 text-xs">
                  {deepDive.topPages.map((tp, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-neutral-300 truncate max-w-[200px]" title={tp.page_url}>
                        {tp.page_url}
                      </span>
                      <span className="font-mono font-bold text-white bg-white/5 px-2 py-0.5 rounded">
                        {tp.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Live Click Events Log */}
          <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center justify-between">
              <span>Real-Time WhatsApp Contact Log</span>
              <span className="text-[10px] text-neutral-500 font-normal">Last 25 Events</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.01] border-b border-white/10 text-neutral-500 text-[10px] uppercase">
                  <tr>
                    <th className="py-2 px-3">Timestamp</th>
                    <th className="py-2 px-3">Agent</th>
                    <th className="py-2 px-3">Source Trigger</th>
                    <th className="py-2 px-3">Page</th>
                    <th className="py-2 px-3">Campaign (UTM)</th>
                    <th className="py-2 px-3">Device</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[11px] font-mono">
                  {deepDive.recentClicks.map((rc) => (
                    <tr key={rc.id} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 px-3 text-neutral-400">
                        {new Date(rc.created_at).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </td>
                      <td className="py-2.5 px-3 text-white font-sans font-medium">
                        {rc.agent_name || rc.phone_number}
                      </td>
                      <td className="py-2.5 px-3 capitalize font-sans text-neutral-300">
                        {rc.source.replace(/_/g, ' ')}
                      </td>
                      <td className="py-2.5 px-3 text-neutral-400 font-sans truncate max-w-[150px]">
                        {rc.page_url}
                      </td>
                      <td className="py-2.5 px-3 text-[#00FC43]">
                        {rc.utm_campaign || rc.utm_source ? (
                          `${rc.utm_source || 'direct'} / ${rc.utm_campaign || 'none'}`
                        ) : (
                          <span className="text-neutral-600 font-sans">Organic</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-neutral-300 capitalize font-sans">
                        {rc.device_category || 'desktop'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
