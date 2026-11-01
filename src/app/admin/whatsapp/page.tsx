'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Phone,
  MessageSquare,
  ShieldCheck,
  Star,
  RefreshCw,
  X,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

interface WhatsAppAgent {
  id: number;
  agent_name: string;
  phone_number: string;
  status: 'active' | 'inactive' | 'scheduled';
  is_default: boolean;
  is_fallback: boolean;
  custom_prefilled_message: string;
  total_clicks: number;
  notes?: string;
  schedule_count?: string;
  created_at: string;
}

export default function WhatsAppManagementPage() {
  const [agents, setAgents] = useState<WhatsAppAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<WhatsAppAgent | null>(null);

  // Form State
  const [agentName, setAgentName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive' | 'scheduled'>('active');
  const [isDefault, setIsDefault] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [prefilledMessage, setPrefilledMessage] = useState(
    'Hi TOTO Development, I would like to consult on your agency services & packages.'
  );
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchAgents = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/whatsapp/agents/', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setAgents(Array.isArray(data) ? data : data.agents || []);
      }
    } catch (e) {
      console.error(e);
      setNotification({ message: 'Failed to synchronize with server.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const openCreateModal = () => {
    setEditingAgent(null);
    setAgentName('');
    setPhoneNumber('');
    setStatus('active');
    setIsDefault(false);
    setIsFallback(false);
    setPrefilledMessage(
      'Hi TOTO Development, I would like to consult on your agency services & packages.'
    );
    setNotes('');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (ag: WhatsAppAgent) => {
    setEditingAgent(ag);
    setAgentName(ag.agent_name);
    setPhoneNumber(ag.phone_number);
    setStatus(ag.status);
    setIsDefault(ag.is_default);
    setIsFallback(ag.is_fallback);
    setPrefilledMessage(ag.custom_prefilled_message);
    setNotes(ag.notes || '');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg('');

    try {
      const url = editingAgent
        ? `/api/admin/whatsapp/agents/${editingAgent.id}/`
        : '/api/admin/whatsapp/agents/';
      const method = editingAgent ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_name: agentName,
          phone_number: phoneNumber,
          status,
          is_default: isDefault,
          is_fallback: isFallback,
          custom_prefilled_message: prefilledMessage,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save agent.');
      }

      setIsModalOpen(false);
      fetchAgents();
    } catch (err: any) {
      setErrorMsg(err.message || 'Operation failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? All its associated schedules will also be removed.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/whatsapp/agents/${id}/`, { method: 'DELETE' });
      if (res.ok) {
        fetchAgents();
      }
    } catch (e) {
      alert('Failed to delete agent');
    }
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case 'active':
        return 'badge-emerald-glow';
      case 'scheduled':
        return 'badge-cyan-glow';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-emerald-glow text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
            <span>COMMUNICATION CLOUD & NUMBERS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-silver">
            WhatsApp Management Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage public WhatsApp contact numbers, assign dedicated agents, and set fallback destinations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAgents}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Refresh</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 font-bold text-black" />
            <span>Add WhatsApp Agent</span>
          </button>
        </div>
      </div>

      {/* Agents Table Card */}
      <div className="p-6 sm:p-7 rounded-3xl admin-glass-card shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="overflow-x-auto admin-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="pb-3.5 font-bold">Agent Name</th>
                <th className="pb-3.5 font-bold">WhatsApp Number</th>
                <th className="pb-3.5 font-bold">Status</th>
                <th className="pb-3.5 font-bold">Roles / Badges</th>
                <th className="pb-3.5 font-bold">Total Clicks</th>
                <th className="pb-3.5 font-bold">Prefilled Preview</th>
                <th className="pb-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
                    <span>Loading WhatsApp roster from database...</span>
                  </td>
                </tr>
              ) : agents.length > 0 ? (
                agents.map((ag) => (
                  <tr key={ag.id} className="hover:bg-white/[0.03] transition-colors group">
                    {/* Agent Name */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500/30 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0 font-bold">
                          {ag.agent_name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-semibold text-white block text-sm group-hover:text-emerald-300 transition-colors">
                            {ag.agent_name}
                          </span>
                          {ag.notes && (
                            <span className="text-[11px] text-slate-400 block max-w-xs truncate">
                              {ag.notes}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Phone Number */}
                    <td className="py-4 font-mono font-bold text-emerald-400">
                      {ag.phone_number}
                    </td>

                    {/* Status */}
                    <td className="py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${getStatusBadge(
                          ag.status
                        )}`}
                      >
                        {ag.status}
                      </span>
                    </td>

                    {/* Default / Fallback Badges */}
                    <td className="py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {ag.is_default && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono badge-cyan-glow font-bold">
                            DEFAULT
                          </span>
                        )}
                        {ag.is_fallback && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono badge-violet-glow font-bold">
                            FALLBACK
                          </span>
                        )}
                        {ag.schedule_count && parseInt(ag.schedule_count, 10) > 0 && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                            {ag.schedule_count} Slots
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Clicks */}
                    <td className="py-4 font-mono text-white">
                      <span className="bg-white/[0.05] border border-white/[0.08] px-2.5 py-1 rounded-lg num-tabular font-bold">
                        {ag.total_clicks}
                      </span>
                    </td>

                    {/* Prefilled message preview */}
                    <td className="py-4 text-slate-400 max-w-xs truncate text-[11px] font-sans">
                      &quot;{ag.custom_prefilled_message}&quot;
                    </td>

                    {/* Actions */}
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Test click-to-chat */}
                        <a
                          href={`https://wa.me/${ag.phone_number.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
                            ag.custom_prefilled_message
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Test WhatsApp Link"
                          className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => openEditModal(ag)}
                          title="Edit Agent"
                          className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(ag.id, ag.agent_name)}
                          title="Delete Agent"
                          className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-mono">
                    No WhatsApp agents configured yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT AGENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg admin-glass-card rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-white relative border border-emerald-500/30">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-extrabold mb-1 text-gradient-silver tracking-tight">
              {editingAgent ? 'Edit WhatsApp Agent' : 'Add New WhatsApp Agent'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Configure contact details and custom prefilled conversation starters.
            </p>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  Agent / Consultant Name <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="e.g. Sales Agent 01 — Tanvir Hasan (Dhaka HQ)"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  WhatsApp Phone Number (with Country Code) <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+8801800942868"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 focus:outline-none text-white text-sm font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Operational Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1020] border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="scheduled">Scheduled Only</option>
                    <option value="inactive">Temporarily Inactive</option>
                  </select>
                </div>

                <div className="space-y-2 pt-6">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDefault}
                      onChange={(e) => setIsDefault(e.target.checked)}
                      className="accent-emerald-400 rounded"
                    />
                    <span>Default Main Number</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFallback}
                      onChange={(e) => setIsFallback(e.target.checked)}
                      className="accent-emerald-400 rounded"
                    />
                    <span>Fallback (Out of Hours)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  Custom Prefilled Chat Message
                </label>
                <textarea
                  rows={3}
                  value={prefilledMessage}
                  onChange={(e) => setPrefilledMessage(e.target.value)}
                  placeholder="Message automatically loaded into customer WhatsApp chat window..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 focus:outline-none text-white text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  Internal Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Assigned to enterprise ERP inquiries"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 focus:outline-none text-white text-sm"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.35)] disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-black" /> : null}
                  <span>{editingAgent ? 'Update Agent' : 'Save Agent'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}