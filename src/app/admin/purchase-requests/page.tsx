'use client';

import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Filter,
  Download,
  ExternalLink,
  RefreshCw,
  Clock,
  User,
  Building,
  Mail,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

interface PurchaseRequest {
  id: string;
  package_id: string;
  package_name: string;
  package_category?: string;
  quoted_price: string;
  currency: string;
  full_name: string;
  business_name: string;
  whatsapp_number: string;
  email: string;
  website_or_social?: string;
  project_requirements?: string;
  preferred_contact_method: string;
  status: string;
  assigned_agent_id?: number;
  assigned_agent_name?: string;
  internal_notes?: string;
  lead_source_page?: string;
  created_at: string;
}

interface LeadHistoryItem {
  id: number;
  request_id: string;
  user_name: string;
  previous_status: string;
  new_status: string;
  note: string;
  created_at: string;
}

const STATUS_OPTIONS = [
  { id: 'all', label: 'All Requests' },
  { id: 'new_request', label: 'New Request', badgeClass: 'badge-cyan-glow' },
  { id: 'contacted', label: 'Contacted', badgeClass: 'badge-amber-glow' },
  { id: 'discussion', label: 'Discussion', badgeClass: 'badge-violet-glow' },
  { id: 'quotation_sent', label: 'Quotation Sent', badgeClass: 'badge-cyan-glow' },
  { id: 'confirmed', label: 'Confirmed', badgeClass: 'badge-emerald-glow' },
  { id: 'in_progress', label: 'In Progress', badgeClass: 'badge-emerald-glow' },
  { id: 'completed', label: 'Completed', badgeClass: 'badge-emerald-glow' },
  { id: 'on_hold', label: 'On Hold', badgeClass: 'bg-white/[0.05] text-slate-400 border border-white/[0.08]' },
  { id: 'cancelled', label: 'Cancelled', badgeClass: 'badge-rose-glow' },
  { id: 'lost', label: 'Lost', badgeClass: 'badge-rose-glow' },
];

export default function PurchaseRequestsPage() {
  const [requests, setRequests] = useState<PurchaseRequest[]>([]);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Drawer / Details State
  const [selectedRequest, setSelectedRequest] = useState<PurchaseRequest | null>(null);
  const [leadHistory, setLeadHistory] = useState<LeadHistoryItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [newInternalNote, setNewInternalNote] = useState('');
  const [updateStatusVal, setUpdateStatusVal] = useState('');

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedStatus !== 'all') params.append('status', selectedStatus);
      if (selectedPackage !== 'all') params.append('packageId', selectedPackage);

      const res = await fetch(`/api/admin/purchase-requests/?${params.toString()}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch (e) {
      console.error('Failed to load purchase requests', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [selectedStatus, selectedPackage]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRequests();
  };

  const openDetailsDrawer = async (req: PurchaseRequest) => {
    setSelectedRequest(req);
    setUpdateStatusVal(req.status);
    setNewInternalNote('');
    setIsDrawerOpen(true);

    try {
      const res = await fetch(`/api/admin/purchase-requests/${req.id}/`);
      if (res.ok) {
        const data = await res.json();
        if (data.history) setLeadHistory(data.history);
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }
  };

  const handleUpdateLead = async () => {
    if (!selectedRequest) return;
    setIsUpdatingStatus(true);

    try {
      const res = await fetch(`/api/admin/purchase-requests/${selectedRequest.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: updateStatusVal,
          internal_notes: newInternalNote || undefined,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setSelectedRequest(updated.request);
        fetchRequests();
        setNewInternalNote('');

        // Refresh history
        const hRes = await fetch(`/api/admin/purchase-requests/${selectedRequest.id}/`);
        if (hRes.ok) {
          const hData = await hRes.json();
          setLeadHistory(hData.history || []);
        }
      }
    } catch (e) {
      alert('Failed to update lead');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const opt = STATUS_OPTIONS.find((s) => s.id === status);
    return opt?.badgeClass || 'bg-slate-500/15 text-slate-300 border-slate-500/30';
  };

  const formatStatus = (s: string) => {
    return s.replace(/_/g, ' ').toUpperCase();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-emerald-glow text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Inbox className="w-3.5 h-3.5 text-emerald-400" />
            <span>CUSTOMER ENQUIRIES & PURCHASE INTENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-silver">
            Purchase Requests & Deal CRM
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Qualify incoming customer purchase proposals, verify locked quotations, and coordinate direct WhatsApp sales outreach.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchRequests}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Refresh</span>
          </button>

          <a
            href="/api/admin/purchase-requests/export/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-black" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl admin-glass-card">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Request ID, customer name, email, or company..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] focus:border-emerald-400 focus:outline-none text-white text-xs placeholder:text-slate-500 font-sans"
          />
        </form>

        {/* Status Filter */}
        <div className="flex items-center gap-3 overflow-x-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-[#0d1020] border border-white/[0.1] text-xs text-white focus:border-emerald-400 focus:outline-none"
          >
            {STATUS_OPTIONS.map((st) => (
              <option key={st.id} value={st.id}>
                {st.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CRM Main Table Card */}
      <div className="p-6 sm:p-7 rounded-3xl admin-glass-card shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="overflow-x-auto admin-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="pb-3.5 font-bold">Request ID</th>
                <th className="pb-3.5 font-bold">Customer & Business</th>
                <th className="pb-3.5 font-bold">Contact (WhatsApp/Email)</th>
                <th className="pb-3.5 font-bold">Selected Package</th>
                <th className="pb-3.5 font-bold">Quoted Locked Price</th>
                <th className="pb-3.5 font-bold">Status Workflow</th>
                <th className="pb-3.5 font-bold">Submitted</th>
                <th className="pb-3.5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
                    <span>Loading CRM leads from PostgreSQL...</span>
                  </td>
                </tr>
              ) : requests.length > 0 ? (
                requests.map((req) => (
                  <tr
                    key={req.id}
                    onClick={() => openDetailsDrawer(req)}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                  >
                    {/* Request ID */}
                    <td className="py-4 font-mono font-bold text-cyan-400">{req.id}</td>

                    {/* Customer */}
                    <td className="py-4">
                      <span className="font-semibold text-white block text-sm group-hover:text-emerald-300 transition-colors">
                        {req.full_name}
                      </span>
                      <span className="text-[11px] text-slate-400 block">{req.business_name}</span>
                    </td>

                    {/* Contact */}
                    <td className="py-4 font-mono">
                      <div className="flex items-center gap-1.5 text-slate-200">
                        <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{req.whatsapp_number}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">{req.email}</span>
                    </td>

                    {/* Package */}
                    <td className="py-4">
                      <span className="text-white font-medium block">{req.package_name}</span>
                      {req.package_category && (
                        <span className="text-[10px] text-slate-500 font-mono">
                          {req.package_category}
                        </span>
                      )}
                    </td>

                    {/* Locked Price */}
                    <td className="py-4 font-mono font-bold text-white text-sm num-tabular">
                      ৳{parseFloat(req.quoted_price).toLocaleString('en-BD')}
                    </td>

                    {/* Status */}
                    <td className="py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${getStatusBadge(
                          req.status
                        )}`}
                      >
                        {formatStatus(req.status)}
                      </span>
                    </td>

                    {/* Submission Date */}
                    <td className="py-4 text-slate-400 font-mono text-[11px]">
                      {new Date(req.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Inspect Button */}
                    <td className="py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetailsDrawer(req);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] transition-colors cursor-pointer font-semibold"
                      >
                        View & Manage
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 font-mono">
                    No matching purchase requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* LEAD DETAILS DRAWER / MODAL */}
      {isDrawerOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-xl h-full admin-glass-card border-l border-white/[0.1] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-white admin-scrollbar">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
                    Customer Enquiry Details
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-0.5 text-gradient-silver tracking-tight">
                    {selectedRequest.id}
                  </h3>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full bg-white/[0.05] text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Customer Info Card */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-white">{selectedRequest.full_name}</h4>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${getStatusBadge(
                      selectedRequest.status
                    )}`}
                  >
                    {formatStatus(selectedRequest.status)}
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-2 font-mono">
                  <p className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-slate-500" />
                    <span>Company: <strong className="text-white">{selectedRequest.business_name}</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp: <strong className="text-emerald-400">{selectedRequest.whatsapp_number}</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Email: <strong className="text-white">{selectedRequest.email}</strong></span>
                  </p>
                  {selectedRequest.website_or_social && (
                    <p className="flex items-center gap-2 truncate">
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      <a
                        href={selectedRequest.website_or_social}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline truncate"
                      >
                        {selectedRequest.website_or_social}
                      </a>
                    </p>
                  )}
                </div>

                {/* 1-Click WhatsApp Conversation Button */}
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${selectedRequest.whatsapp_number.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
                      `Hello ${selectedRequest.full_name}, this is TOTO Development regarding your purchase request (${selectedRequest.id}) for ${selectedRequest.package_name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-98"
                  >
                    <FaWhatsapp className="w-4 h-4 fill-current text-black" />
                    <span>Open WhatsApp Conversation with Client</span>
                  </a>
                </div>
              </div>

              {/* Package Details & Locked Quoted Price */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-2 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-bold">
                  Package Specification & Locked Quotation
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    {selectedRequest.package_name}
                  </span>
                  <span className="num-tabular text-xl font-extrabold text-emerald-400">
                    ৳{parseFloat(selectedRequest.quoted_price).toLocaleString('en-BD')}
                  </span>
                </div>
                {selectedRequest.project_requirements && (
                  <div className="mt-3 pt-3 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1 font-bold">
                      Client Project Requirements:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/[0.05]">
                      {selectedRequest.project_requirements}
                    </p>
                  </div>
                )}
              </div>

              {/* Update Status Workflow & Notes */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono uppercase tracking-wider">
                    PIPELINE STATUS WORKFLOW
                  </label>
                  <select
                    value={updateStatusVal}
                    onChange={(e) => setUpdateStatusVal(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1020] border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-xs font-semibold"
                  >
                    <option value="new_request">New Request</option>
                    <option value="contacted">Contacted</option>
                    <option value="discussion">In Discussion</option>
                    <option value="quotation_sent">Quotation Sent</option>
                    <option value="confirmed">Confirmed Deal</option>
                    <option value="in_progress">Work In Progress</option>
                    <option value="completed">Completed Successfully</option>
                    <option value="on_hold">On Hold</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono uppercase tracking-wider">
                    INTERNAL SALES NOTES & LOGS
                  </label>
                  <textarea
                    rows={3}
                    value={newInternalNote}
                    onChange={(e) => setNewInternalNote(e.target.value)}
                    placeholder="Add meeting notes, customer objections, or next follow-up date..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-xs resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleUpdateLead}
                  disabled={isUpdatingStatus}
                  className="w-full py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white font-extrabold text-xs border border-white/[0.1] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {isUpdatingStatus ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Save Status & Log Note</span>
                </button>
              </div>

              {/* Interaction History Timeline */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-3 font-bold">
                  Interaction History Timeline
                </span>
                <div className="space-y-3">
                  {leadHistory.map((h) => (
                    <div
                      key={h.id}
                      className="p-3.5 rounded-xl bg-black/30 border border-white/[0.05] text-xs text-slate-300 space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white">{h.user_name}</span>
                        <span className="text-slate-500 font-mono">
                          {new Date(h.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-slate-400">{h.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}