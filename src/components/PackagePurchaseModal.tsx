'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Send,
  Loader2,
  Sparkles,
  ArrowRight,
  Lock,
  Tag,
  Check,
  HelpCircle,
  Clock,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { captureAttribution } from '@/lib/session';
import { parseBengaliPrice, toBengaliNumerals } from '@/lib/utils';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';

export interface PurchasePackageData {
  id: string;
  title: string;
  categoryLabel?: string;
  regularPrice: number | string;
  discountedPrice: number | string;
  currencySymbol?: string;
  customPriceLabel?: string;
  hasDiscount?: boolean;
  savingsAmount?: number;
  features?: string[];
}

interface PackagePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: PurchasePackageData | null;
}

export function PackagePurchaseModal({
  isOpen,
  onClose,
  packageData,
}: PackagePurchaseModalProps) {
  const { openWhatsApp } = useActiveWhatsApp();
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [websiteOrSocial, setWebsiteOrSocial] = useState('');
  const [requirements, setRequirements] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');
  const [agreeConsent, setAgreeConsent] = useState(true);

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
    finalPrice: number;
    message: string;
  } | null>(null);
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successResult, setSuccessResult] = useState<{
    requestId: string;
    message: string;
    whatsappUrl?: string;
  } | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and handle browser back button
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
      return;
    }

    document.body.style.overflow = 'hidden';
    window.history.pushState({ modal: 'purchase' }, '');

    const handlePopState = () => {
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !packageData) return null;

  // Authoritative numeric price normalization
  const numRegular = parseBengaliPrice(packageData.regularPrice);
  let numDiscounted = parseBengaliPrice(packageData.discountedPrice);

  // Fallback defaults if 0
  if (numDiscounted === 0) {
    if (packageData.id.includes('tuli')) numDiscounted = 2099;
    else if (packageData.id.includes('noksha')) numDiscounted = 4099;
    else if (packageData.id.includes('abhijatya')) numDiscounted = 6099;
    else if (packageData.id.includes('protoy') || packageData.id.includes('protyoy')) numDiscounted = 6000;
    else if (packageData.id.includes('astha')) numDiscounted = 10000;
    else if (packageData.id.includes('gourob')) numDiscounted = 17000;
    else if (packageData.id.includes('sonalika')) numDiscounted = 12499;
    else if (packageData.id.includes('rupalika') || packageData.id.includes('rupali')) numDiscounted = 9999;
    else if (packageData.id.includes('agrojatra')) numDiscounted = 17999;
    else numDiscounted = numRegular > 0 ? numRegular : 6000;
  }

  const effectiveRegular = numRegular > numDiscounted ? numRegular : Math.round(numDiscounted * 1.25);
  const currency = packageData.currencySymbol || '৳';

  const currentPrice = appliedCoupon ? appliedCoupon.finalPrice : numDiscounted;
  const currentSavings = effectiveRegular > currentPrice ? effectiveRegular - currentPrice : 0;
  const periodLabel = packageData.customPriceLabel ? ` / ${packageData.customPriceLabel}` : ' / মাস';

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setIsApplyingCoupon(true);
    setCouponFeedback(null);

    try {
      const res = await fetch('/api/coupons/validate/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: couponInput.trim(),
          packageId: packageData.id,
          basePrice: numDiscounted,
        }),
      });

      const data = await res.json();
      if (data.valid) {
        setAppliedCoupon({
          code: data.code,
          discountAmount: data.discountAmount,
          finalPrice: data.finalPrice,
          message: data.message,
        });
        setCouponFeedback({ type: 'success', text: data.message });
      } else {
        setAppliedCoupon(null);
        setCouponFeedback({ type: 'error', text: data.message || 'Invalid coupon code.' });
      }
    } catch {
      setCouponFeedback({ type: 'error', text: 'Failed to validate coupon code.' });
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponFeedback(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !businessName.trim() || !whatsappNumber.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name, company, WhatsApp number, and email.');
      return;
    }

    if (!agreeConsent) {
      setErrorMessage('Please accept the privacy and communication consent.');
      return;
    }

    setIsLoading(true);

    const attribution = captureAttribution();

    try {
      const res = await fetch('/api/packages/purchase/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: packageData.id,
          fullName,
          businessName,
          whatsappNumber,
          email,
          websiteOrSocial,
          projectRequirements: requirements,
          preferredContactMethod: contactMethod,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
          couponCode: appliedCoupon?.code,
          utmSource: attribution.utmSource,
          utmMedium: attribution.utmMedium,
          utmCampaign: attribution.utmCampaign,
          utmContent: attribution.utmContent,
          utmTerm: attribution.utmTerm,
          sessionId: attribution.sessionId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      // Client-side Meta Pixel with matching eventID
      if (typeof window !== 'undefined' && (window as any).fbq && data.eventId) {
        try {
          (window as any).fbq('track', 'Lead', {
            content_name: packageData.title,
            value: data.quotedPrice || currentPrice,
            currency: 'BDT',
          }, { eventID: data.eventId });
        } catch (e) {}
      }

      setSuccessResult({
        requestId: data.requestId,
        message:
          data.message ||
          'Thank you for your interest in TOTO Development. Your request has been received successfully. Our team will contact you shortly.',
        whatsappUrl: data.whatsappRedirectUrl,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetAndClose = () => {
    setSuccessResult(null);
    setErrorMessage('');
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponFeedback(null);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#080d09] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-4 max-h-[92vh] flex flex-col font-sans"
        >
          {/* Top Control Bar */}
          <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-white/5 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-[#00FC43]/10 via-transparent to-transparent">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00FC43]/20 text-[#00FC43] border border-[#00FC43]/30">
                <Sparkles className="w-3 h-3 text-[#00FC43]" />
                Official Package Booking
              </span>
              {packageData.categoryLabel && (
                <span className="text-[11px] text-neutral-400 font-medium hidden sm:inline">
                  {packageData.categoryLabel}
                </span>
              )}
            </div>

            <button
              onClick={resetAndClose}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pricing & Deliverables Hero Showcase */}
          <div className="px-5 sm:px-6 py-4 bg-[#0a120c] border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-shrink-0">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {packageData.title}
              </h2>
              {packageData.categoryLabel && (
                <p className="text-xs text-neutral-400 mt-0.5">
                  {packageData.categoryLabel}
                </p>
              )}
            </div>

            {/* Price Box */}
            <div className="bg-black/40 border border-[#00FC43]/30 rounded-2xl px-4 py-2.5 sm:text-right shrink-0">
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                Investment Rate
              </div>
              <div className="flex items-baseline sm:justify-end gap-2 mt-0.5">
                <span className="text-xs text-neutral-500 line-through font-mono">
                  {currency}{effectiveRegular.toLocaleString('en-US')}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#00FC43] font-mono tracking-tight drop-shadow-[0_0_12px_rgba(0,252,67,0.4)]">
                  {currency}{currentPrice.toLocaleString('en-US')}
                </span>
                <span className="text-xs text-neutral-400 font-medium">
                  {periodLabel}
                </span>
              </div>
              {currentSavings > 0 && (
                <div className="text-[10px] text-[#00FC43] font-bold font-mono mt-0.5">
                  সাশ্রয় {currency}{currentSavings.toLocaleString('en-US')} (20% OFF)
                </div>
              )}
            </div>
          </div>

          {/* Deliverables Quick Pills */}
          {packageData.features && packageData.features.length > 0 && (
            <div className="px-5 sm:px-6 py-2.5 bg-white/[0.02] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-[11px] text-neutral-300 flex-shrink-0 no-scrollbar">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 shrink-0">
                Includes:
              </span>
              {packageData.features.slice(0, 4).map((feat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 shrink-0 text-white font-medium"
                >
                  <Check className="w-3 h-3 text-[#00FC43]" />
                  {feat}
                </span>
              ))}
            </div>
          )}

          {/* Calendly Consultation Helper Strip */}
          <div className="px-5 sm:px-6 py-2 bg-[#070d10] border-b border-indigo-500/20 flex items-center justify-between gap-3 text-xs flex-shrink-0">
            <span className="text-neutral-300 text-[11px] sm:text-xs truncate">
              Prefer to discuss custom scope with our consultant first?
            </span>
            <a
              href={`https://calendly.com/yousuf91013/30min?a1=${encodeURIComponent(
                packageData.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00FC43] hover:underline font-bold text-[11px] sm:text-xs inline-flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Book 30-Min Call →</span>
            </a>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
            {successResult ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#00FC43]/20 border border-[#00FC43] flex items-center justify-center mx-auto text-[#00FC43] shadow-[0_0_30px_rgba(0,252,67,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-white tracking-tight">
                    Quotation Confirmed & Locked!
                  </h4>
                  <p className="text-xs font-mono text-[#00FC43] font-bold bg-[#00FC43]/10 py-1 px-3 rounded-full inline-block border border-[#00FC43]/20">
                    Booking Reference: {successResult.requestId}
                  </p>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    {successResult.message}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  {successResult.whatsappUrl && (
                    <a
                      href={successResult.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brand-glow-button w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-bold text-[#041608] inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,252,67,0.4)]"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                  )}

                  <button
                    onClick={resetAndClose}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-semibold text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Banner with Graceful WhatsApp Fallback */}
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-red-400 font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-red-500/20 text-neutral-300">
                      <span>Prefer instant booking?</span>
                      <button
                        type="button"
                        onClick={() => {
                          const msg = `Hi TOTO Development, I would like to book the "${packageData.title}" package directly.`;
                          openWhatsApp('booking_error_fallback', {
                            packageName: packageData.title,
                            packagePrice: currentPrice,
                            customMessage: msg,
                          });
                        }}
                        className="text-[#00FC43] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <FaWhatsapp className="w-3.5 h-3.5" />
                        <span>Chat Directly on WhatsApp →</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Full Name <span className="text-[#00FC43]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full px-4 py-3 rounded-xl bg-[#0c140e] border border-white/10 focus:border-[#00FC43] focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Business / Company Name <span className="text-[#00FC43]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Apex Luxury Ltd."
                      className="w-full px-4 py-3 rounded-xl bg-[#0c140e] border border-white/10 focus:border-[#00FC43] focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      WhatsApp Number <span className="text-[#00FC43]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="017XXXXXXXX or +880 1XXXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-[#0c140e] border border-white/10 focus:border-[#00FC43] focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Email Address <span className="text-[#00FC43]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tanvir@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#0c140e] border border-white/10 focus:border-[#00FC43] focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Website or Facebook Page URL <span className="text-neutral-500">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={websiteOrSocial}
                    onChange={(e) => setWebsiteOrSocial(e.target.value)}
                    placeholder="https://facebook.com/yourbrand or https://yourdomain.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#0c140e] border border-white/10 focus:border-[#00FC43] focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                  />
                </div>

                {/* Coupon Code Section */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#00FC43]" />
                      Agency Promotion / Coupon Code
                    </span>
                    {appliedCoupon && (
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-[11px] text-red-400 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      disabled={!!appliedCoupon}
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="e.g. TOTO20 or VIPGROWTH"
                      className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#0c140e] border border-white/10 focus:border-[#00FC43] focus:outline-none text-white text-xs font-mono uppercase placeholder:text-neutral-600 transition-colors disabled:opacity-60"
                    />
                    {!appliedCoupon ? (
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon || !couponInput.trim()}
                        className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-[#00FC43] hover:text-[#041608] text-white text-xs font-bold transition-all disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
                      >
                        {isApplyingCoupon ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <span>Apply</span>
                        )}
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-2.5 rounded-lg bg-[#00FC43]/20 border border-[#00FC43]/40 text-[#00FC43] text-xs font-bold font-mono">
                        <Check className="w-3.5 h-3.5" />
                        {appliedCoupon.code}
                      </span>
                    )}
                  </div>

                  {couponFeedback && (
                    <div
                      className={`text-xs ${
                        couponFeedback.type === 'success' ? 'text-[#00FC43]' : 'text-red-400'
                      }`}
                    >
                      {couponFeedback.text}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Project Requirements / Specific Goals <span className="text-neutral-500">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Tell us about your target launch timeline, assets needed, or key targets..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0c140e] border border-white/10 focus:border-[#00FC43] focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors resize-none"
                  />
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-2">
                    Preferred Communication Channel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'whatsapp', label: 'WhatsApp', icon: FaWhatsapp },
                      { id: 'phone', label: 'Direct Call', icon: Send },
                      { id: 'email', label: 'Email', icon: ShieldCheck },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setContactMethod(item.id as any)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                          contactMethod === item.id
                            ? 'bg-[#00FC43]/15 text-[#00FC43] border-[#00FC43]'
                            : 'bg-white/5 text-neutral-400 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <item.icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Privacy Consent */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={agreeConsent}
                    onChange={(e) => setAgreeConsent(e.target.checked)}
                    className="mt-1 accent-[#00FC43] rounded cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-neutral-400 leading-relaxed cursor-pointer">
                    I agree to allow TOTO Development to contact me regarding this package quotation. We guarantee zero spam and strict NDAs.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="brand-glow-button w-full py-4 rounded-xl text-sm font-bold text-[#041608] flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(0,252,67,0.4)] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Locking Quoted Price...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Package Booking ({currency}{currentPrice.toLocaleString('en-US')}{periodLabel})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer note */}
          <div className="px-5 sm:px-6 py-3 bg-[#050805] border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500 flex-shrink-0">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#00FC43]" />
              Encrypted Submission • Price Guaranteed
            </span>
            <span>TOTO Operations Cloud</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
