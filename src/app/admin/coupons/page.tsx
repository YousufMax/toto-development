'use client';

import React, { useState, useEffect } from 'react';
import {
  Tag,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Calendar,
  Percent,
  TrendingUp,
  Clock,
  Sparkles,
  Loader2,
  AlertCircle,
  Eye,
  Trash2,
} from 'lucide-react';

interface CouponItem {
  id: number;
  code: string;
  discount_type: 'percentage' | 'fixed_amount';
  discount_value: string;
  max_discount_amount: string | null;
  min_order_amount: string;
  package_restriction: string;
  allowed_package_ids: any[];
  usage_limit_total: number | null;
  usage_limit_per_user: number;
  times_used: number;
  starts_at: string;
  expires_at: string | null;
  is_active: boolean;
  notes: string | null;
  total_redemptions?: string;
  total_discount_given?: string;
  created_at: string;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // New coupon modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const [formCode, setFormCode] = useState('');
  const [formType, setFormType] = useState<'percentage' | 'fixed_amount'>('percentage');
  const [formValue, setFormValue] = useState('');
  const [formMaxCap, setFormMaxCap] = useState('');
  const [formLimit, setFormLimit] = useState('');
  const [formExpiresAt, setFormExpiresAt] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/coupons/');
      if (res.ok) {
        const data = await res.json();
        setCoupons(data.coupons || []);
      }
    } catch (e) {
      console.error('Error fetching coupons:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const generateRandomCode = (prefix: string = 'TOTO') => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let rand = '';
    for (let i = 0; i < 4; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormCode(`${prefix}-${rand}`);
  };

  const handleToggleActive = async (coupon: CouponItem) => {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !coupon.is_active }),
      });
      if (res.ok) {
        setCoupons((prev) =>
          prev.map((c) => (c.id === coupon.id ? { ...c, is_active: !c.is_active } : c))
        );
      }
    } catch (e) {
      console.error('Error toggling coupon status:', e);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formCode.trim() || !formValue.trim()) {
      setFormError('Please enter code and discount value.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/coupons/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: formCode.trim().toUpperCase(),
          discount_type: formType,
          discount_value: parseFloat(formValue),
          max_discount_amount: formMaxCap ? parseFloat(formMaxCap) : null,
          usage_limit_total: formLimit ? parseInt(formLimit, 10) : null,
          expires_at: formExpiresAt ? new Date(formExpiresAt).toISOString() : null,
          notes: formNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create coupon');
      }

      setIsCreateOpen(false);
      setFormCode('');
      setFormValue('');
      setFormMaxCap('');
      setFormLimit('');
      setFormExpiresAt('');
      setFormNotes('');
      fetchCoupons();
    } catch (err: any) {
      setFormError(err.message || 'Error creating coupon.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.notes && c.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const isExpired = c.expires_at ? new Date() > new Date(c.expires_at) : false;

    if (filterStatus === 'active') return matchesSearch && c.is_active && !isExpired;
    if (filterStatus === 'expired') return matchesSearch && (isExpired || !c.is_active);
    return matchesSearch;
  });

  const totalRedemptionsCount = coupons.reduce(
    (acc, curr) => acc + (parseInt(curr.times_used as any, 10) || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/30">
              Commercial Engine
            </span>
            <span className="text-xs text-neutral-400">Promotions & Codes</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Coupon & Discount System
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Create high-converting promo codes, set usage limits, and track client redemptions.
          </p>
        </div>

        <button
          onClick={() => {
            generateRandomCode('VIP');
            setIsCreateOpen(true);
          }}
          className="brand-glow-button px-4 py-2.5 rounded-xl text-xs font-bold text-[#041608] flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,252,67,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#090d0a] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Total Active Codes</span>
            <Tag className="w-4 h-4 text-[#00FC43]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {coupons.filter((c) => c.is_active).length}
          </div>
          <div className="text-[11px] text-neutral-500">Live & valid on packages</div>
        </div>

        <div className="p-4 rounded-xl bg-[#090d0a] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Total Redemptions</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {totalRedemptionsCount}
          </div>
          <div className="text-[11px] text-neutral-500">Applied in purchase requests</div>
        </div>

        <div className="p-4 rounded-xl bg-[#090d0a] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Platform Status</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-base font-bold text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Automatic Enforcement
          </div>
          <div className="text-[11px] text-neutral-500">Server validated on purchase</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#080d09] border border-white/5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coupon codes or notes..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 focus:border-[#00FC43] focus:outline-none text-xs text-white placeholder:text-neutral-500"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {(['all', 'active', 'expired'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-[#00FC43]/20 text-[#00FC43] border border-[#00FC43]/40'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Coupons Table */}
      <div className="rounded-xl border border-white/10 bg-[#080d09] overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-neutral-400 space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#00FC43]" />
            <span className="text-xs">Loading coupon records...</span>
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="py-16 text-center text-neutral-400 space-y-2">
            <Tag className="w-8 h-8 mx-auto text-neutral-600" />
            <p className="text-sm font-medium">No coupons found</p>
            <p className="text-xs text-neutral-500">Create your first coupon code to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] border-b border-white/10 text-neutral-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Coupon Code</th>
                  <th className="py-3 px-4">Discount Value</th>
                  <th className="py-3 px-4">Usage / Limit</th>
                  <th className="py-3 px-4">Expiry Window</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredCoupons.map((c) => {
                  const isExpired = c.expires_at ? new Date() > new Date(c.expires_at) : false;
                  return (
                    <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white text-sm bg-white/5 px-2.5 py-1 rounded border border-white/10">
                            {c.code}
                          </span>
                          <button
                            onClick={() => handleCopy(c.code)}
                            title="Copy Code"
                            className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
                          >
                            {copiedCode === c.code ? (
                              <Check className="w-3.5 h-3.5 text-[#00FC43]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        {c.notes && (
                          <div className="text-[11px] text-neutral-500 mt-1 truncate max-w-xs">
                            {c.notes}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-semibold">
                        {c.discount_type === 'percentage' ? (
                          <span className="text-[#00FC43]">
                            {parseFloat(c.discount_value)}% OFF
                            {c.max_discount_amount && (
                              <span className="text-[10px] text-neutral-400 block font-normal">
                                Max ৳{parseFloat(c.max_discount_amount).toLocaleString()}
                              </span>
                            )}
                          </span>
                        ) : (
                          <span className="text-emerald-400">
                            ৳{parseFloat(c.discount_value).toLocaleString()} FLAT
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="text-white font-bold">{c.times_used}</span>
                          <span className="text-neutral-500">
                            / {c.usage_limit_total !== null ? c.usage_limit_total : '∞'}
                          </span>
                        </div>
                        {c.usage_limit_total && (
                          <div className="w-20 bg-white/10 h-1 rounded-full mt-1 overflow-hidden">
                            <div
                              className="bg-[#00FC43] h-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (c.times_used / c.usage_limit_total) * 100
                                )}%`,
                              }}
                            />
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-neutral-300">
                        {c.expires_at ? (
                          <div className="space-y-0.5">
                            <span className={isExpired ? 'text-red-400 line-through' : ''}>
                              {new Date(c.expires_at).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                            {isExpired && (
                              <span className="text-[10px] text-red-400 block font-semibold">
                                Expired
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-neutral-500 italic">No expiration</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        {c.is_active && !isExpired ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-500/15 text-neutral-400 border border-neutral-500/30">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleToggleActive(c)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-medium border transition-colors cursor-pointer ${
                            c.is_active
                              ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                              : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                          }`}
                        >
                          {c.is_active ? 'Deactivate' : 'Activate'}
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

      {/* Modal: Create Coupon */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#080d09] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#00FC43]" />
                Create New Coupon Code
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-neutral-300">Coupon Code</label>
                  <button
                    type="button"
                    onClick={() => generateRandomCode('TOTO')}
                    className="text-[#00FC43] hover:underline cursor-pointer"
                  >
                    Generate Random
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                  placeholder="e.g. VIP2026, SUMMER5000"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono text-sm uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Discount Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c140e] border border-white/10 focus:border-[#00FC43] focus:outline-none text-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed_amount">Fixed Amount (৳)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-neutral-300 mb-1">
                    Value {formType === 'percentage' ? '(%)' : '(৳)'}
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder={formType === 'percentage' ? '20' : '5000'}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                  />
                </div>
              </div>

              {formType === 'percentage' && (
                <div>
                  <label className="block font-medium text-neutral-300 mb-1">
                    Maximum Discount Cap (৳) <span className="text-neutral-500">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    value={formMaxCap}
                    onChange={(e) => setFormMaxCap(e.target.value)}
                    placeholder="e.g. 10000"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-300 mb-1">
                    Total Redemption Limit <span className="text-neutral-500">(Blank = ∞)</span>
                  </label>
                  <input
                    type="number"
                    value={formLimit}
                    onChange={(e) => setFormLimit(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-300 mb-1">
                    Expiration Date <span className="text-neutral-500">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    value={formExpiresAt}
                    onChange={(e) => setFormExpiresAt(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">
                  Internal Campaign Notes
                </label>
                <input
                  type="text"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Facebook Campaign Ramadan 2026 Special"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="brand-glow-button px-5 py-2 rounded-lg text-xs font-bold text-[#041608] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span>Create & Publish</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
