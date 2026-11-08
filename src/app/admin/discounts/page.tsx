'use client';

import React, { useState, useEffect } from 'react';
import {
  Percent,
  Calendar,
  Sparkles,
  Calculator,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Plus,
  Loader2,
  Clock,
  ArrowRight,
  X,
} from 'lucide-react';

interface DiscountPackage {
  id: string;
  title: string;
  category_label: string;
  regular_price: string;
  discounted_price: string;
  discount_percentage: string;
  discount_fixed_amount: string;
  discount_type: 'none' | 'percentage' | 'fixed';
  is_discount_active: boolean;
  discount_start_date?: string;
  discount_expiry_date?: string;
  custom_price_label: string;
  currency_symbol: string;
}

export default function PricingDiscountsPage() {
  const [packages, setPackages] = useState<DiscountPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<DiscountPackage | null>(null);

  // Form State
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('20');
  const [isDiscountActive, setIsDiscountActive] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/packages/', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setPackages(Array.isArray(data) ? data : data.packages || []);
      }
    } catch (e) {
      console.error('Failed to load packages', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const openDiscountModal = (pkg: DiscountPackage) => {
    setSelectedPkg(pkg);
    setDiscountType(pkg.discount_type === 'fixed' ? 'fixed' : 'percentage');
    setDiscountValue(
      pkg.discount_type === 'fixed'
        ? pkg.discount_fixed_amount || '2000'
        : pkg.discount_percentage || '20'
    );
    setIsDiscountActive(pkg.is_discount_active);
    setStartDate(pkg.discount_start_date ? pkg.discount_start_date.slice(0, 10) : '');
    setExpiryDate(pkg.discount_expiry_date ? pkg.discount_expiry_date.slice(0, 10) : '');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSaveDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPkg) return;

    setIsSaving(true);
    setErrorMsg('');

    const reg = parseFloat(selectedPkg.regular_price);
    const val = parseFloat(discountValue) || 0;
    const pct = discountType === 'percentage' ? val : 0;
    const fixed = discountType === 'fixed' ? val : 0;

    try {
      const res = await fetch(`/api/admin/packages/${selectedPkg.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discount_type: discountType,
          discount_percentage: pct,
          discount_fixed_amount: fixed,
          is_discount_active: isDiscountActive,
          discount_start_date: startDate || null,
          discount_expiry_date: expiryDate || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update discount');
      }

      setIsModalOpen(false);
      fetchPackages();
    } catch (err: any) {
      setErrorMsg(err.message || 'Operation failed');
    } finally {
      setIsSaving(false);
    }
  };

  // Preview computation
  const computePreview = () => {
    if (!selectedPkg) return { final: 0, savings: 0 };
    const reg = parseFloat(selectedPkg.regular_price) || 0;
    const val = parseFloat(discountValue) || 0;

    if (discountType === 'percentage') {
      const savings = (reg * val) / 100;
      return { final: Math.max(0, reg - savings), savings };
    } else {
      const savings = Math.min(reg, val);
      return { final: Math.max(0, reg - savings), savings };
    }
  };

  const preview = computePreview();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-violet-glow text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Percent className="w-3.5 h-3.5 text-violet-400" />
            <span>DYNAMIC PRICING & CAMPAIGN DISCOUNTS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-silver">
            Pricing, Discounts & Promotions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure percentage or fixed amount discounts. Discounts apply in real-time across public package pricing cards and modals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPackages}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="p-6 sm:p-7 rounded-3xl admin-glass-card shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="overflow-x-auto admin-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="pb-3.5 font-bold">Package</th>
                <th className="pb-3.5 font-bold">Regular Price</th>
                <th className="pb-3.5 font-bold">Discount Rule</th>
                <th className="pb-3.5 font-bold">Final Customer Price</th>
                <th className="pb-3.5 font-bold">Validity Window</th>
                <th className="pb-3.5 font-bold">Status</th>
                <th className="pb-3.5 font-bold text-right">Configure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
                    <span>Loading pricing engine...</span>
                  </td>
                </tr>
              ) : packages.length > 0 ? (
                packages.map((pkg) => {
                  const reg = parseFloat(pkg.regular_price);
                  const disc = parseFloat(pkg.discounted_price);
                  const savings = reg - disc;
                  const hasActive = pkg.is_discount_active;

                  return (
                    <tr key={pkg.id} className="hover:bg-white/[0.03] transition-colors group">
                      {/* Package Title */}
                      <td className="py-4">
                        <span className="font-bold text-white block text-sm group-hover:text-emerald-300 transition-colors">
                          {pkg.title}
                        </span>
                        <span className="text-[11px] text-slate-400 block font-mono">
                          {pkg.category_label}
                        </span>
                      </td>

                      {/* Regular Price */}
                      <td className="py-4 font-mono text-slate-400">
                        ৳{reg.toLocaleString('en-BD')}
                      </td>

                      {/* Discount Rule */}
                      <td className="py-4 font-mono">
                        {hasActive ? (
                          pkg.discount_type === 'percentage' ? (
                            <span className="text-amber-400 font-bold">
                              {pkg.discount_percentage}% OFF
                            </span>
                          ) : (
                            <span className="text-amber-400 font-bold">
                              ৳{parseFloat(pkg.discount_fixed_amount).toLocaleString('en-BD')} OFF
                            </span>
                          )
                        ) : (
                          <span className="text-slate-500">None</span>
                        )}
                      </td>

                      {/* Final Customer Price */}
                      <td className="py-4 font-mono font-bold text-white text-sm num-tabular">
                        <span className="text-emerald-400">৳{disc.toLocaleString('en-BD')}</span>
                        {hasActive && savings > 0 && (
                          <span className="text-[10px] text-slate-400 block font-normal">
                            (Saves: ৳{savings.toLocaleString('en-BD')})
                          </span>
                        )}
                      </td>

                      {/* Active Window */}
                      <td className="py-4 text-[11px] text-slate-400 font-mono">
                        {pkg.discount_expiry_date ? (
                          <span>Until {new Date(pkg.discount_expiry_date).toLocaleDateString()}</span>
                        ) : (
                          <span>Indefinite</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            hasActive
                              ? 'badge-amber-glow'
                              : 'bg-white/[0.05] text-slate-400 border border-white/[0.08]'
                          }`}
                        >
                          {hasActive ? 'ACTIVE DISCOUNT' : 'REGULAR PRICING'}
                        </span>
                      </td>

                      {/* Configure Button */}
                      <td className="py-4 text-right">
                        <button
                          onClick={() => openDiscountModal(pkg)}
                          className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] transition-colors font-semibold text-xs cursor-pointer"
                        >
                          Edit Discount
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT DISCOUNT MODAL */}
      {isModalOpen && selectedPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg admin-glass-card rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-white relative border border-emerald-500/30">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1 font-bold">
              <Calculator className="w-4 h-4" />
              <span>DYNAMIC PRICING ENGINE</span>
            </div>

            <h3 className="text-xl font-extrabold mb-1 text-gradient-silver tracking-tight">
              {selectedPkg.title}
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Regular Base Price: ৳{parseFloat(selectedPkg.regular_price).toLocaleString('en-BD')}
            </p>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSaveDiscount} className="space-y-4">
              {/* Discount Type Buttons */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-bold">
                  Discount Computation Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDiscountType('percentage')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      discountType === 'percentage'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                        : 'bg-white/[0.04] text-slate-400 border-white/[0.08]'
                    }`}
                  >
                    Percentage (%)
                  </button>

                  <button
                    type="button"
                    onClick={() => setDiscountType('fixed')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      discountType === 'fixed'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                        : 'bg-white/[0.04] text-slate-400 border-white/[0.08]'
                    }`}
                  >
                    Fixed Amount (৳)
                  </button>
                </div>
              </div>

              {/* Value Input */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  {discountType === 'percentage'
                    ? 'Discount Percentage (%)'
                    : 'Fixed Discount Amount (৳)'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder={discountType === 'percentage' ? '20' : '2500'}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm font-mono"
                />
              </div>

              {/* Real-time Calculation Box */}
              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">
                    Calculated Final Customer Price:
                  </span>
                  <span className="num-tabular text-2xl font-extrabold text-emerald-400">
                    ৳{preview.final.toLocaleString('en-BD')}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 font-mono block">Customer Saves:</span>
                  <span className="text-xs font-mono font-bold text-amber-400 num-tabular">
                    ৳{preview.savings.toLocaleString('en-BD')}
                  </span>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Start Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-xs font-mono"
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDiscountActive}
                    onChange={(e) => setIsDiscountActive(e.target.checked)}
                    className="accent-emerald-400 rounded"
                  />
                  <span>Publish Discount on Website Immediately</span>
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
                  <span>Apply Dynamic Price</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}