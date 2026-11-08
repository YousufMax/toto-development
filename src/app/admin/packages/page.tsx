'use client';

import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Percent,
  Sparkles,
  ArrowRight,
  Filter,
  RefreshCw,
  X,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

interface AdminPackage {
  id: string;
  slug: string;
  category: string;
  category_label: string;
  title: string;
  subtitle?: string;
  description?: string;
  regular_price: string;
  discounted_price: string;
  discount_percentage: string;
  discount_type: string;
  is_discount_active: boolean;
  custom_price_label: string;
  currency: string;
  currency_symbol: string;
  billing_type: string;
  features: { name: string; included: boolean }[];
  deliverables?: string[];
  timeline?: string;
  ideal_for?: string;
  is_featured: boolean;
  is_popular: boolean;
  badge?: string;
  is_active: boolean;
  display_order: number;
  total_requests?: string;
  total_pipeline_value?: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'web-development', label: 'Website Development' },
  { id: 'custom-software', label: 'Custom Software' },
  { id: 'graphic-design', label: 'Graphic Design' },
  { id: 'motion-video', label: 'Motion Video' },
  { id: 'digital-marketing', label: 'Digital Marketing' },
  { id: 'paid-ads', label: 'Paid Ads' },
];

export default function PackageManagementPage() {
  const [packages, setPackages] = useState<AdminPackage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<AdminPackage | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('web-development');
  const [categoryLabel, setCategoryLabel] = useState('Website Development');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [regularPrice, setRegularPrice] = useState('25000');
  const [customPriceLabel, setCustomPriceLabel] = useState('month');
  const [billingType, setBillingType] = useState('monthly');
  const [timeline, setTimeline] = useState('Monthly Rolling');
  const [idealFor, setIdealFor] = useState('Growing Brands & E-Commerce');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [badge, setBadge] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [featuresText, setFeaturesText] = useState(
    'Feature 1 (included)\nFeature 2 (included)\nFeature 3 (included)\nAdvanced Addon (excluded)'
  );

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

  const openCreateModal = () => {
    setEditingPackage(null);
    setTitle('');
    setCategory('web-development');
    setCategoryLabel('Website Development');
    setSubtitle('');
    setDescription('');
    setRegularPrice('25000');
    setCustomPriceLabel('month');
    setBillingType('monthly');
    setTimeline('Monthly Rolling');
    setIdealFor('Modern Businesses & Brands');
    setIsFeatured(false);
    setIsPopular(false);
    setBadge('');
    setDisplayOrder(packages.length + 1);
    setFeaturesText(
      'Custom React/Next.js Core Architecture\nHigh-Conversion Landing UI & Mobile View\nWhatsApp Live Floating Integration\nDedicated Technical Maintenance (excluded)'
    );
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: AdminPackage) => {
    setEditingPackage(pkg);
    setTitle(pkg.title);
    setCategory(pkg.category);
    setCategoryLabel(pkg.category_label || '');
    setSubtitle(pkg.subtitle || '');
    setDescription(pkg.description || '');
    setRegularPrice(pkg.regular_price);
    setCustomPriceLabel(pkg.custom_price_label || 'month');
    setBillingType(pkg.billing_type || 'monthly');
    setTimeline(pkg.timeline || '');
    setIdealFor(pkg.ideal_for || '');
    setIsFeatured(pkg.is_featured);
    setIsPopular(pkg.is_popular);
    setBadge(pkg.badge || '');
    setDisplayOrder(pkg.display_order || 1);

    const fText = (pkg.features || [])
      .map((f) => `${f.name} ${f.included ? '(included)' : '(excluded)'}`)
      .join('\n');
    setFeaturesText(fText);

    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg('');

    // Parse features
    const parsedFeatures = featuresText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const isExcluded = line.toLowerCase().includes('(excluded)');
        const cleanName = line
          .replace(/\(included\)/i, '')
          .replace(/\(excluded\)/i, '')
          .trim();
        return {
          name: cleanName,
          included: !isExcluded,
        };
      });

    try {
      const url = editingPackage
        ? `/api/admin/packages/${editingPackage.id}/`
        : '/api/admin/packages/';
      const method = editingPackage ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          category_label: categoryLabel,
          subtitle,
          description,
          regular_price: regularPrice,
          custom_price_label: customPriceLabel,
          billing_type: billingType,
          timeline,
          ideal_for: idealFor,
          is_featured: isFeatured,
          is_popular: isPopular,
          badge,
          display_order: displayOrder,
          features: parsedFeatures,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save package');
      }

      setIsModalOpen(false);
      fetchPackages();
    } catch (err: any) {
      setErrorMsg(err.message || 'Operation failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, pkgTitle: string) => {
    if (!confirm(`Are you sure you want to deactivate package "${pkgTitle}"?`)) return;

    try {
      const res = await fetch(`/api/admin/packages/${id}/`, { method: 'DELETE' });
      if (res.ok) {
        fetchPackages();
      }
    } catch (e) {
      alert('Failed to deactivate package');
    }
  };

  const filteredPackages =
    selectedCategory === 'all'
      ? packages
      : packages.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo-glow text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Package className="w-3.5 h-3.5 text-indigo-400" />
            <span>PRODUCT CATALOG & DYNAMIC OFFERINGS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-silver">
            Package Management System
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create, edit, and organize all agency service packages without modifying source code.
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

          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 font-bold text-black" />
            <span>Create New Package</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === c.id
                ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06] hover:bg-white/[0.06]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Packages Table Card */}
      <div className="p-6 sm:p-7 rounded-3xl admin-glass-card shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="overflow-x-auto admin-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="pb-3.5 font-bold">Package Title</th>
                <th className="pb-3.5 font-bold">Category</th>
                <th className="pb-3.5 font-bold">Regular Price</th>
                <th className="pb-3.5 font-bold">Active Price</th>
                <th className="pb-3.5 font-bold">Discount</th>
                <th className="pb-3.5 font-bold">Enquiries</th>
                <th className="pb-3.5 font-bold">Status</th>
                <th className="pb-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
                    <span>Loading packages...</span>
                  </td>
                </tr>
              ) : filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => {
                  const reg = parseFloat(pkg.regular_price);
                  const disc = parseFloat(pkg.discounted_price);
                  const requestsCount = parseInt(pkg.total_requests || '0', 10);

                  return (
                    <tr key={pkg.id} className="hover:bg-white/[0.03] transition-colors group">
                      {/* Title */}
                      <td className="py-4">
                        <div className="flex items-center gap-2.5">
                          <div>
                            <span className="font-bold text-white block text-sm group-hover:text-emerald-300 transition-colors">
                              {pkg.title}
                            </span>
                            {pkg.subtitle && (
                              <span className="text-[11px] text-slate-400 block truncate max-w-xs">
                                {pkg.subtitle}
                              </span>
                            )}
                          </div>
                          {pkg.is_featured && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono badge-emerald-glow shrink-0 font-bold">
                              FEATURED
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 text-slate-300 font-mono text-[11px]">
                        {pkg.category_label || pkg.category}
                      </td>

                      {/* Regular Price */}
                      <td className="py-4 font-mono text-slate-400">
                        ৳{reg.toLocaleString('en-BD')}
                        <span className="text-[10px] block">/{pkg.custom_price_label}</span>
                      </td>

                      {/* Active Price */}
                      <td className="py-4 font-mono font-bold text-emerald-400 text-sm">
                        ৳{disc.toLocaleString('en-BD')}
                        <span className="text-[10px] text-slate-400 block font-normal">
                          /{pkg.custom_price_label}
                        </span>
                      </td>

                      {/* Discount badge */}
                      <td className="py-4">
                        {pkg.is_discount_active ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold badge-amber-glow">
                            {pkg.discount_percentage}% OFF
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px] font-mono">Standard</span>
                        )}
                      </td>

                      {/* Enquiries */}
                      <td className="py-4 font-mono text-white">
                        <span className="bg-white/[0.05] border border-white/[0.08] px-2.5 py-1 rounded-lg num-tabular">
                          {requestsCount} requests
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            pkg.is_active
                              ? 'badge-emerald-glow'
                              : 'badge-rose-glow'
                          }`}
                        >
                          {pkg.is_active ? 'Active' : 'Archived'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(pkg)}
                            title="Edit Package"
                            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(pkg.id, pkg.title)}
                            title="Deactivate"
                            className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 font-mono">
                    No packages found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT PACKAGE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl admin-glass-card rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-white relative my-8 max-h-[90vh] overflow-y-auto border border-emerald-500/30 admin-scrollbar">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-extrabold mb-1 text-gradient-silver tracking-tight">
              {editingPackage ? 'Edit Package' : 'Create New Agency Package'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Configure deliverables, features list, and default pricing.
            </p>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Package Title <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Standard Growth Website"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Category <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      const found = CATEGORIES.find((c) => c.id === e.target.value);
                      if (found) setCategoryLabel(found.label);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1020] border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Regular Price (BDT ৳) <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}
                    placeholder="25000"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Price Label
                  </label>
                  <input
                    type="text"
                    value={customPriceLabel}
                    onChange={(e) => setCustomPriceLabel(e.target.value)}
                    placeholder="মাসিক / এককালীন / প্রজেক্ট"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  Subtitle / Highlight Hook
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Best suited for high-growth e-commerce ventures"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  Features List (One feature per line. Add (included) or (excluded))
                </label>
                <textarea
                  rows={5}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-xs font-mono"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-emerald-400 rounded"
                  />
                  <span>Mark as Featured Flagship</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="accent-emerald-400 rounded"
                  />
                  <span>Highlight with &apos;Most Popular&apos; Badge</span>
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
                  <span>{editingPackage ? 'Update Package' : 'Save Package'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}