'use client';

import React, { useState, useEffect } from 'react';
import {
  BellRing,
  Clock,
  Sparkles,
  Edit2,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Plus,
  Loader2,
  X,
  ExternalLink,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

interface EngagementPopup {
  id: number;
  page_route: string;
  title: string;
  description: string;
  cta_text: string;
  prefilled_message?: string;
  delay_seconds: number;
  display_frequency: string;
  is_enabled: boolean;
  show_on_mobile: boolean;
  show_on_desktop: boolean;
  specific_agent_id?: number;
  assigned_agent_name?: string;
}

interface WhatsAppAgent {
  id: number;
  agent_name: string;
}

export default function EngagementPopupsPage() {
  const [popups, setPopups] = useState<EngagementPopup[]>([]);
  const [agents, setAgents] = useState<WhatsAppAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPopup, setEditingPopup] = useState<EngagementPopup | null>(null);

  // Form State
  const [pageRoute, setPageRoute] = useState('/');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ctaText, setCtaText] = useState('Chat on WhatsApp');
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [delaySeconds, setDelaySeconds] = useState(15);
  const [displayFrequency, setDisplayFrequency] = useState('once_per_session');
  const [isEnabled, setIsEnabled] = useState(true);
  const [showOnMobile, setShowOnMobile] = useState(true);
  const [showOnDesktop, setShowOnDesktop] = useState(true);
  const [specificAgentId, setSpecificAgentId] = useState<number | ''>('');

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchPopups = async () => {
    try {
      setIsLoading(true);
      const [pRes, aRes] = await Promise.all([
        fetch('/api/admin/popups/', { cache: 'no-store' }),
        fetch('/api/admin/whatsapp/agents/', { cache: 'no-store' }),
      ]);

      if (pRes.ok) {
        const pData = await pRes.json();
        setPopups(Array.isArray(pData) ? pData : pData.popups || []);
      }
      if (aRes.ok) {
        const aData = await aRes.json();
        setAgents(Array.isArray(aData) ? aData : aData.agents || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  const openCreateModal = () => {
    setEditingPopup(null);
    setPageRoute('/');
    setTitle('A Technical Architect Is Available Now');
    setDescription(
      'Need an exact scope breakdown or bespoke package quotation? Consult directly with our on-duty architect.'
    );
    setCtaText('Consult on WhatsApp');
    setPrefilledMessage(
      'Hi TOTO Development, I am exploring your services and have a few questions.'
    );
    setDelaySeconds(15);
    setDisplayFrequency('once_per_session');
    setIsEnabled(true);
    setShowOnMobile(true);
    setShowOnDesktop(true);
    setSpecificAgentId('');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: EngagementPopup) => {
    setEditingPopup(p);
    setPageRoute(p.page_route);
    setTitle(p.title);
    setDescription(p.description);
    setCtaText(p.cta_text);
    setPrefilledMessage(p.prefilled_message || '');
    setDelaySeconds(p.delay_seconds);
    setDisplayFrequency(p.display_frequency);
    setIsEnabled(p.is_enabled);
    setShowOnMobile(p.show_on_mobile);
    setShowOnDesktop(p.show_on_desktop);
    setSpecificAgentId(p.specific_agent_id || '');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg('');

    try {
      const url = editingPopup ? `/api/admin/popups/${editingPopup.id}/` : '/api/admin/popups/';
      const method = editingPopup ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_route: pageRoute,
          title,
          description,
          cta_text: ctaText,
          prefilled_message: prefilledMessage,
          delay_seconds: delaySeconds,
          display_frequency: displayFrequency,
          is_enabled: isEnabled,
          show_on_mobile: showOnMobile,
          show_on_desktop: showOnDesktop,
          specific_agent_id: specificAgentId || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save popup');
      }

      setIsModalOpen(false);
      fetchPopups();
    } catch (err: any) {
      setErrorMsg(err.message || 'Operation failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this engagement popup?')) return;

    try {
      const res = await fetch(`/api/admin/popups/${id}/`, { method: 'DELETE' });
      if (res.ok) {
        fetchPopups();
      }
    } catch (e) {
      alert('Failed to delete popup');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-rose-glow text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <BellRing className="w-3.5 h-3.5 text-rose-400" />
            <span>CONVERSION ACCELERATORS & POPUPS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-silver">
            Engagement & Timed WhatsApp Popups
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure automated timed consultation triggers for high-intent visitors across service and pricing pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPopups}
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
            <span>Configure Page Popup</span>
          </button>
        </div>
      </div>

      {/* Popups Table Card */}
      <div className="p-6 sm:p-7 rounded-3xl admin-glass-card shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="overflow-x-auto admin-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="pb-3.5 font-bold">Target Page Route</th>
                <th className="pb-3.5 font-bold">Popup Headline & Message</th>
                <th className="pb-3.5 font-bold">Delay</th>
                <th className="pb-3.5 font-bold">Frequency</th>
                <th className="pb-3.5 font-bold">Routing Agent</th>
                <th className="pb-3.5 font-bold">Status</th>
                <th className="pb-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
                    <span>Loading popups...</span>
                  </td>
                </tr>
              ) : popups.length > 0 ? (
                popups.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.03] transition-colors group">
                    {/* Route */}
                    <td className="py-4 font-mono font-bold text-cyan-400 text-xs">
                      {p.page_route}
                    </td>

                    {/* Content Preview */}
                    <td className="py-4 max-w-sm">
                      <span className="font-bold text-white block text-sm group-hover:text-emerald-300 transition-colors">{p.title}</span>
                      <span className="text-[11px] text-slate-400 block line-clamp-2 mt-0.5">
                        {p.description}
                      </span>
                    </td>

                    {/* Delay */}
                    <td className="py-4 font-mono text-slate-300">
                      <span className="bg-white/[0.05] border border-white/[0.08] px-2.5 py-1 rounded-lg num-tabular">
                        {p.delay_seconds}s
                      </span>
                    </td>

                    {/* Frequency */}
                    <td className="py-4 font-mono text-[11px] text-slate-400">
                      {p.display_frequency.replace(/_/g, ' ')}
                    </td>

                    {/* Routing Agent */}
                    <td className="py-4 text-slate-300 font-mono text-[11px]">
                      {p.assigned_agent_name ? (
                        <span className="text-emerald-400 font-bold">{p.assigned_agent_name.split('—')[0]}</span>
                      ) : (
                        <span className="text-slate-500">Auto Active Schedule</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          p.is_enabled
                            ? 'badge-emerald-glow'
                            : 'bg-white/[0.05] text-slate-400 border border-white/[0.08]'
                        }`}
                      >
                        {p.is_enabled ? 'ENABLED' : 'DISABLED'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
                          title="Edit Popup"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                          title="Delete Popup"
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
                    No engagement popups configured.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-lg admin-glass-card rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-white relative my-8 border border-emerald-500/30">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-extrabold mb-1 text-gradient-silver tracking-tight">
              {editingPopup ? 'Edit Engagement Popup' : 'Configure New Page Popup'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Control delay timing and custom consultation hook for this specific page.
            </p>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  Page Route Path <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={pageRoute}
                  onChange={(e) => setPageRoute(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0d1020] border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-xs font-mono"
                >
                  <option value="/">Home Page (/)</option>
                  <option value="/services/web-development/">Website Development (/services/web-development/)</option>
                  <option value="/services/custom-software/">Custom Software (/services/custom-software/)</option>
                  <option value="/services/digital-marketing/">Digital Marketing (/services/digital-marketing/)</option>
                  <option value="/services/paid-ads/">Paid Ads (/services/paid-ads/)</option>
                  <option value="/services/video-motion/">Video & Motion (/services/video-motion/)</option>
                  <option value="/services/brand-design/">Brand Design & 3D (/services/brand-design/)</option>
                  <option value="/pricing/">Pricing Page (/pricing/)</option>
                  <option value="/contact/">Contact Page (/contact/)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  Popup Headline <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. A Live Architect Is Ready to Assist You"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  Description Message <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Have questions about our packages or architecture scope? Connect on WhatsApp now."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="Chat on WhatsApp"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Display Timing Delay
                  </label>
                  <select
                    value={delaySeconds}
                    onChange={(e) => setDelaySeconds(parseInt(e.target.value, 10))}
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1020] border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                  >
                    <option value={5}>After 5 Seconds</option>
                    <option value={10}>After 10 Seconds</option>
                    <option value={15}>After 15 Seconds (Default)</option>
                    <option value={30}>After 30 Seconds</option>
                    <option value={60}>After 1 Minute</option>
                    <option value={120}>After 2 Minutes</option>
                    <option value={180}>After 3 Minutes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Display Frequency
                  </label>
                  <select
                    value={displayFrequency}
                    onChange={(e) => setDisplayFrequency(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1020] border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                  >
                    <option value="once_per_session">Once per Browser Session</option>
                    <option value="once_per_day">Once per Day</option>
                    <option value="always">Always on every visit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Assign Specific Agent (Optional)
                  </label>
                  <select
                    value={specificAgentId}
                    onChange={(e) =>
                      setSpecificAgentId(e.target.value ? parseInt(e.target.value, 10) : '')
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1020] border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                  >
                    <option value="">Follow Active Schedule (Recommended)</option>
                    {agents.map((ag) => (
                      <option key={ag.id} value={ag.id}>
                        {ag.agent_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  Custom Prefilled Chat Message
                </label>
                <input
                  type="text"
                  value={prefilledMessage}
                  onChange={(e) => setPrefilledMessage(e.target.value)}
                  placeholder="Hi TOTO Development, I saw the consultation prompt on your website."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                />
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={(e) => setIsEnabled(e.target.checked)}
                    className="accent-emerald-400 rounded"
                  />
                  <span>Enable Popup for this Page</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/[0.08]">
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
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}