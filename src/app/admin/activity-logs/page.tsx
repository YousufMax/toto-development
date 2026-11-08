'use client';

import React, { useState, useEffect } from 'react';
import {
  History,
  ShieldCheck,
  Search,
  RefreshCw,
  Loader2,
  Calendar,
  Lock,
} from 'lucide-react';

interface ActivityLog {
  id: number;
  user_name: string;
  action_type: string;
  entity_type: string;
  entity_id: string;
  details: any;
  ip_address: string;
  created_at: string;
}

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/activity-logs/?limit=100', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setLogs(Array.isArray(data) ? data : data.logs || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((l) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      l.user_name?.toLowerCase().includes(term) ||
      l.action_type?.toLowerCase().includes(term) ||
      l.entity_type?.toLowerCase().includes(term) ||
      l.entity_id?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-slate-glow text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <History className="w-3.5 h-3.5 text-slate-300" />
            <span>IMMUTABLE AUDIT TRAIL & SECURITY LEDGER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-silver">
            System Activity & Audit Logs
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete record of logins, pricing modifications, WhatsApp shift overrides, and lead status transitions.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-black" />
          <span>Refresh Audit Trail</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by actor, action type, or entity ID..."
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] focus:border-emerald-400 focus:outline-none text-white text-xs placeholder:text-slate-500 font-sans"
        />
      </div>

      {/* Logs Table Card */}
      <div className="p-6 sm:p-7 rounded-3xl admin-glass-card shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="overflow-x-auto admin-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="pb-3.5 font-bold">Timestamp</th>
                <th className="pb-3.5 font-bold">Actor</th>
                <th className="pb-3.5 font-bold">Action Type</th>
                <th className="pb-3.5 font-bold">Entity</th>
                <th className="pb-3.5 font-bold">Metadata Details</th>
                <th className="pb-3.5 font-bold text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] font-mono">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-sans">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
                    <span className="font-mono text-xs">Loading security ledger...</span>
                  </td>
                </tr>
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.03] transition-colors">
                    {/* Timestamp */}
                    <td className="py-3.5 text-slate-400 text-[11px] num-tabular">
                      {new Date(log.created_at).toLocaleString('en-GB')}
                    </td>

                    {/* Actor */}
                    <td className="py-3.5 font-bold text-white font-sans">{log.user_name}</td>

                    {/* Action Type */}
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold badge-emerald-glow">
                        {log.action_type}
                      </span>
                    </td>

                    {/* Entity */}
                    <td className="py-3.5 text-slate-300">
                      {log.entity_type} {log.entity_id ? `(${log.entity_id})` : ''}
                    </td>

                    {/* JSON Metadata */}
                    <td className="py-3.5 text-slate-400 max-w-xs truncate text-[11px] font-sans">
                      {typeof log.details === 'object' ? JSON.stringify(log.details) : log.details}
                    </td>

                    {/* IP */}
                    <td className="py-3.5 text-right text-slate-500 text-[11px]">
                      {log.ip_address || 'internal'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-sans font-mono">
                    No activity logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}