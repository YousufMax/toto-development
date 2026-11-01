'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Inbox,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  RefreshCw,
  Loader2,
  DollarSign,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

interface LeadItem {
  id: string;
  full_name: string;
  business_name: string;
  whatsapp_number: string;
  email: string;
  package_name: string;
  quoted_price: string;
  status: string;
  created_at: string;
}

const COLUMNS = [
  { id: 'new_request', title: 'New Enquiries', badgeClass: 'badge-cyan-glow', dotColor: 'bg-cyan-400' },
  { id: 'contacted', title: 'Contacted', badgeClass: 'badge-amber-glow', dotColor: 'bg-amber-400' },
  { id: 'discussion', title: 'In Discussion', badgeClass: 'badge-violet-glow', dotColor: 'bg-violet-400' },
  { id: 'confirmed', title: 'Deals Won', badgeClass: 'badge-emerald-glow', dotColor: 'bg-emerald-400' },
  { id: 'completed', title: 'Completed', badgeClass: 'badge-emerald-glow', dotColor: 'bg-emerald-400' },
];

export default function LeadsPipelinePage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/purchase-requests/?limit=100', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setLeads(Array.isArray(data) ? data : data.requests || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-blue-glow text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>VISUAL CRM KANBAN PIPELINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-silver">
            Leads & Deal Progression Funnel
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visual stage progression from initial inbound enquiry to confirmed agency contract.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sync</span>
          </button>

          <Link
            href="/admin/purchase-requests"
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-95"
          >
            <Inbox className="w-3.5 h-3.5 text-black" />
            <span>Table View</span>
          </Link>
        </div>
      </div>

      {/* Kanban Pipeline Columns */}
      {isLoading ? (
        <div className="py-24 text-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-emerald-400" />
          <span className="font-mono text-xs">Organizing real-time pipeline stages...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
          {COLUMNS.map((col) => {
            const columnLeads = leads.filter((l) => l.status === col.id);
            const totalVal = columnLeads.reduce(
              (acc, curr) => acc + (parseFloat(curr.quoted_price) || 0),
              0
            );

            return (
              <div
                key={col.id}
                className="admin-glass-card rounded-3xl p-4 flex flex-col min-h-[460px] shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor} shadow-[0_0_8px_currentColor]`} />
                    <h3 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">
                      {col.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono bg-white/[0.08] px-2 py-0.5 rounded-full text-slate-200 font-bold">
                    {columnLeads.length}
                  </span>
                </div>

                {/* Total Value Pill */}
                <div className="text-[11px] font-mono text-slate-400 mb-3 flex items-center justify-between bg-black/40 border border-white/[0.05] px-3 py-1.5 rounded-xl">
                  <span>Stage Value:</span>
                  <span className="text-emerald-400 font-bold num-tabular">
                    ৳{totalVal.toLocaleString('en-BD')}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3 flex-1 overflow-y-auto admin-scrollbar">
                  {columnLeads.length > 0 ? (
                    columnLeads.map((l) => (
                      <Link
                        key={l.id}
                        href={`/admin/purchase-requests?id=${l.id}`}
                        className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] hover:border-emerald-500/40 hover:bg-black/60 transition-all block group shadow-sm hover:scale-[1.01]"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1 font-bold">
                          <span>{l.id}</span>
                          <span className="text-slate-500 font-normal">
                            {new Date(l.created_at).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                            })}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                          {l.full_name}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate mb-2">
                          {l.business_name || 'Individual Client'}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.05] text-[11px]">
                          <span className="text-slate-400 truncate max-w-[90px]">
                            {l.package_name.split(' ')[0]}
                          </span>
                          <span className="font-mono font-bold text-white num-tabular">
                            ৳{parseFloat(l.quoted_price).toLocaleString('en-BD')}
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="h-32 border border-dashed border-white/[0.08] rounded-2xl flex items-center justify-center text-slate-600 text-[11px] font-mono">
                      No Leads in Stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}