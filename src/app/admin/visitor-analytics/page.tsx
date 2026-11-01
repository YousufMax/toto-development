'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Share2,
  Download,
  Calendar,
  Layers,
  Sparkles,
  Loader2,
  TrendingUp,
} from 'lucide-react';

interface VisitorAnalyticsData {
  sources: Array<{ source_channel: string; total_visits: string }>;
  devices: Array<{ device: string; count: string }>;
  landingPages: Array<{
    page_url: string;
    views: string;
    whatsapp_contacts: string;
    purchase_leads: string;
  }>;
  campaigns: Array<{
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    total_clicks: string;
    leads_count: string;
  }>;
}

export default function VisitorAnalyticsPage() {
  const [period, setPeriod] = useState<'today' | '7d' | '30d'>('30d');
  const [data, setData] = useState<VisitorAnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics/visitors?period=${period}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error('Error fetching visitor analytics:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const handleExportCSV = () => {
    if (!data?.campaigns?.length) return;
    const headers = ['UTM Source', 'UTM Medium', 'UTM Campaign', 'Total Clicks', 'Leads Generated', 'Conversion Rate'];
    const rows = data.campaigns.map((c) => {
      const clicks = parseInt(c.total_clicks, 10);
      const leads = parseInt(c.leads_count, 10);
      const rate = clicks > 0 ? ((leads / clicks) * 100).toFixed(1) + '%' : '0.0%';
      return [`"${c.utm_source}"`, `"${c.utm_medium}"`, `"${c.utm_campaign}"`, clicks, leads, rate];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `utm_campaign_analytics_${period}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalDeviceVisits =
    data?.devices.reduce((acc, curr) => acc + parseInt(curr.count, 10), 0) || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/30">
              Audience Signals
            </span>
            <span className="text-xs text-neutral-400">Traffic Attribution & Devices</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#00FC43]" />
            Visitor & Traffic Analytics
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Identify your most profitable traffic channels, landing page engagement, and device splits.
          </p>
        </div>

        <div className="flex items-center gap-2">
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
                {p === 'today' ? 'Today' : p === '7d' ? '7 Days' : '30 Days'}
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

      {isLoading ? (
        <div className="py-24 flex flex-col items-center justify-center text-neutral-400 space-y-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#00FC43]" />
          <span className="text-xs">Compiling visitor metrics...</span>
        </div>
      ) : (
        <>
          {/* Traffic Sources & Device Split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Traffic Sources */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-[#080d09] border border-white/10 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#00FC43]" />
                Traffic Sources & Acquisition Channels
              </h3>

              <div className="space-y-2.5 text-xs">
                {data?.sources.map((src, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                  >
                    <span className="font-semibold text-white">{src.source_channel}</span>
                    <span className="font-mono font-bold text-[#00FC43] bg-white/5 px-2.5 py-1 rounded">
                      {src.total_visits} sessions
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Split */}
            <div className="p-5 rounded-2xl bg-[#080d09] border border-white/10 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Device Distribution
              </h3>

              <div className="space-y-3">
                {data?.devices.map((d, i) => {
                  const count = parseInt(d.count, 10);
                  const pct = Math.round((count / totalDeviceVisits) * 100);

                  return (
                    <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white capitalize flex items-center gap-2">
                          {d.device === 'mobile' ? (
                            <Smartphone className="w-4 h-4 text-emerald-400" />
                          ) : d.device === 'tablet' ? (
                            <Tablet className="w-4 h-4 text-blue-400" />
                          ) : (
                            <Monitor className="w-4 h-4 text-purple-400" />
                          )}
                          {d.device}
                        </span>
                        <span className="font-mono font-bold text-white">
                          {pct}% ({count})
                        </span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#00FC43] h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Top Landing Pages Table */}
          <div className="rounded-2xl border border-white/10 bg-[#080d09] overflow-hidden p-5 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Top Landing Page Performance
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.01] border-b border-white/10 text-neutral-500 text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Landing Page URL</th>
                    <th className="py-2.5 px-3 text-center">Page Views</th>
                    <th className="py-2.5 px-3 text-center">WhatsApp Contacts</th>
                    <th className="py-2.5 px-3 text-center">Purchase Leads</th>
                    <th className="py-2.5 px-3 text-center">Conversion Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {data?.landingPages.map((lp, i) => {
                    const views = parseInt(lp.views, 10);
                    const contacts = parseInt(lp.whatsapp_contacts, 10);
                    const leads = parseInt(lp.purchase_leads, 10);
                    const rate = views > 0 ? (((contacts + leads) / views) * 100).toFixed(1) + '%' : '0.0%';

                    return (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-3 font-mono text-white font-medium">
                          {lp.page_url}
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-neutral-300">
                          {views}
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-emerald-400 font-bold">
                          {contacts}
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-[#00FC43] font-bold">
                          {leads}
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold text-white">
                          {rate}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* UTM Campaign Performance Table */}
          <div className="rounded-2xl border border-white/10 bg-[#080d09] overflow-hidden p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00FC43]" />
                UTM Campaign Attribution & ROAS Insights
              </h3>
              <span className="text-[11px] text-neutral-500">Ad & referral tags</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.01] border-b border-white/10 text-neutral-500 text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">UTM Source</th>
                    <th className="py-2.5 px-3">UTM Medium</th>
                    <th className="py-2.5 px-3">UTM Campaign</th>
                    <th className="py-2.5 px-3 text-center">Tracked Clicks</th>
                    <th className="py-2.5 px-3 text-center">Leads Generated</th>
                    <th className="py-2.5 px-3 text-center">Conversion Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                  {data?.campaigns.map((camp, i) => {
                    const clicks = parseInt(camp.total_clicks, 10);
                    const leads = parseInt(camp.leads_count, 10);
                    const rate = clicks > 0 ? ((leads / clicks) * 100).toFixed(1) + '%' : '0.0%';

                    return (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-3 text-[#00FC43] font-bold">{camp.utm_source}</td>
                        <td className="py-3 px-3 text-neutral-300">{camp.utm_medium}</td>
                        <td className="py-3 px-3 text-white">{camp.utm_campaign}</td>
                        <td className="py-3 px-3 text-center font-bold text-white">{clicks}</td>
                        <td className="py-3 px-3 text-center font-bold text-emerald-400">{leads}</td>
                        <td className="py-3 px-3 text-center font-bold text-[#00FC43]">{rate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
