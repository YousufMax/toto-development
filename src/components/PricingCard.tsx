'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Check, ArrowRight, Sparkles, Clock, ShieldCheck, RotateCcw, Calendar } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { PricingPlan } from '@/lib/data';
import { PackagePurchaseModal, PurchasePackageData } from './PackagePurchaseModal';
import { CalendlyModal } from './CalendlyModal';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';
import { parseBengaliPrice } from '@/lib/utils';

interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
  onOpenPurchaseModal?: (pkg: PurchasePackageData) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  className,
  onOpenPurchaseModal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const { openWhatsApp } = useActiveWhatsApp();

  const isVoltGold =
    plan.featured ||
    plan.id.includes('noksha') ||
    plan.id.includes('astha') ||
    plan.id.includes('sonalika') ||
    plan.id.includes('conversion') ||
    plan.id.includes('professional') ||
    plan.id.includes('commerce-pro') ||
    plan.id.includes('multivendor-business');
  const isRoyalViolet =
    plan.id.includes('abhijatya') ||
    plan.id.includes('gourob') ||
    plan.id.includes('agrojatra') ||
    plan.id.includes('signature') ||
    plan.id.includes('commerce-elite') ||
    plan.id.includes('advanced') ||
    plan.id.includes('enterprise');
  const isEmerald = !isVoltGold && !isRoyalViolet;

  // Parse numeric values correctly from Bengali ("৳১২,৪৯৯") or English ("$12,499")
  const numericPrice = parseBengaliPrice(plan.price);
  const numericOriginal = plan.originalPrice
    ? parseBengaliPrice(plan.originalPrice)
    : numericPrice;

  const packageDataForModal: PurchasePackageData = {
    id: plan.id,
    title: plan.name,
    categoryLabel: plan.subtitle || 'Service Package',
    regularPrice: numericOriginal || numericPrice,
    discountedPrice: numericPrice,
    currencySymbol: '৳',
    customPriceLabel: plan.period || 'মাস',
    hasDiscount: !!plan.discountBadge,
    savingsAmount: numericOriginal > numericPrice ? numericOriginal - numericPrice : undefined,
    features: plan.features?.map((f) => f.name),
  };

  const handleOpenPurchase = () => {
    if (onOpenPurchaseModal) {
      onOpenPurchaseModal(packageDataForModal);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDiscussOnWhatsApp = () => {
    const prefill = `Hi TOTO Development, I am interested in discussing the "${plan.name}" (${plan.price}/${plan.period}) package.`;
    openWhatsApp('package_discuss', {
      packageName: plan.name,
      packagePrice: numericPrice,
      customMessage: prefill,
    });
  };

  return (
    <>
      <div
        className={clsx(
          'group relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-500 backdrop-blur-2xl',
          isVoltGold
            ? 'border-2 border-[#00FC43] shadow-[0_20px_50px_rgba(0,0,0,0.96),0_0_35px_rgba(0,252,67,0.30),0_0_15px_rgba(245,158,11,0.15),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_0_25px_rgba(0,252,67,0.12)] lg:-translate-y-2 lg:scale-[1.02] z-20'
            : isRoyalViolet
            ? 'border border-violet-500/30 hover:border-violet-400/60 shadow-[0_15px_45px_rgba(0,0,0,0.94),0_0_25px_rgba(139,92,246,0.16),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_0_20px_rgba(99,102,241,0.12)] hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(0,0,0,0.98),0_0_35px_rgba(139,92,246,0.25)] z-10'
            : 'border border-emerald-500/20 hover:border-emerald-400/50 shadow-[0_15px_45px_rgba(0,0,0,0.92),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_0_18px_rgba(16,185,129,0.10)] hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(0,0,0,0.98),0_0_30px_rgba(16,185,129,0.20)] z-10',
          className
        )}
      >
        {/* 3-Sided Asymmetric Glass Background layer with distinctive palette */}
        {isVoltGold && (
          <div
            className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none -z-10"
            style={{
              background:
                'radial-gradient(circle at 10% 8%, rgba(0, 252, 67, 0.40) 0%, rgba(0, 252, 67, 0.12) 30%, transparent 60%), radial-gradient(circle at 90% 12%, rgba(255, 255, 255, 0.25) 0%, transparent 45%), radial-gradient(circle at 90% 90%, rgba(245, 158, 11, 0.16) 0%, transparent 55%), linear-gradient(145deg, rgba(14, 26, 18, 0.95) 0%, rgba(7, 14, 10, 0.98) 50%, rgba(3, 7, 5, 0.99) 100%)',
            }}
          >
            <div className="absolute -top-24 -left-16 w-88 h-88 rounded-full bg-[#00FC43]/30 blur-[95px]" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-amber-400/18 blur-[90px]" />
          </div>
        )}

        {isRoyalViolet && (
          <div
            className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none -z-10"
            style={{
              background:
                'radial-gradient(circle at 10% 8%, rgba(139, 92, 246, 0.35) 0%, rgba(99, 102, 241, 0.14) 32%, transparent 60%), radial-gradient(circle at 92% 10%, rgba(255, 255, 255, 0.22) 0%, transparent 45%), radial-gradient(circle at 90% 92%, rgba(99, 102, 241, 0.14) 0%, transparent 55%), linear-gradient(145deg, rgba(16, 14, 28, 0.95) 0%, rgba(9, 8, 18, 0.98) 50%, rgba(4, 3, 10, 0.99) 100%)',
            }}
          >
            <div className="absolute -top-24 -left-16 w-88 h-88 rounded-full bg-violet-500/25 blur-[95px] group-hover:bg-violet-500/35 transition-all duration-500" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-indigo-600/15 blur-[90px]" />
          </div>
        )}

        {isEmerald && (
          <div
            className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none -z-10"
            style={{
              background:
                'radial-gradient(circle at 10% 8%, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.10) 30%, transparent 60%), radial-gradient(circle at 92% 10%, rgba(255, 255, 255, 0.18) 0%, transparent 45%), radial-gradient(circle at 90% 92%, rgba(16, 185, 129, 0.12) 0%, transparent 55%), linear-gradient(145deg, rgba(8, 20, 14, 0.95) 0%, rgba(5, 12, 8, 0.98) 50%, rgba(2, 6, 4, 0.99) 100%)',
            }}
          >
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-400/20 blur-[85px] group-hover:bg-[#00FC43]/25 transition-all duration-500" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-emerald-600/12 blur-[85px]" />
          </div>
        )}

        {/* Featured Badge */}
        {plan.badge && (
          <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <span className="bg-gradient-to-r from-[#FFF3C4] via-[#F6C343] to-[#E5A823] text-[#1F1402] font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-[0_4px_25px_rgba(246,195,67,0.6),0_0_35px_rgba(255,215,100,0.4)] flex items-center gap-1.5 whitespace-nowrap border border-[#FFF6C8]/80">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current text-[#1F1402]" />
              <span>{plan.badge}</span>
            </span>
          </div>
        )}

        {/* Top Header */}
        <div>
          <div className="mb-4 sm:mb-6">
            {plan.highlightBadge && (
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-[#00FC43]/15 to-amber-500/20 border border-amber-400/50 text-amber-300 text-[11px] sm:text-xs font-bold mb-2.5 sm:mb-3 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                <span>{plan.highlightBadge}</span>
              </div>
            )}

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              {plan.name}
            </h3>
            {plan.subtitle && (
              <p
                className={clsx(
                  'editorial-serif italic text-xs sm:text-sm md:text-base font-normal mt-0.5',
                  isVoltGold
                    ? 'text-[#00FC43]'
                    : isRoyalViolet
                    ? 'text-violet-300 drop-shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                    : 'text-emerald-400'
                )}
              >
                {plan.subtitle}
              </p>
            )}
          </div>

          {/* Price Row */}
          <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
              {plan.originalPrice && (
                <span className="text-xs sm:text-sm font-semibold text-neutral-400 line-through tracking-tight">
                  {plan.originalPrice}
                </span>
              )}
              {plan.discountBadge && (
                <span
                  className={clsx(
                    'text-[10px] sm:text-[11px] font-black font-mono px-2 py-0.5 rounded-full tracking-wide shadow-sm',
                    isVoltGold
                      ? 'text-[#00FC43] bg-[#00FC43]/15 border border-[#00FC43]/35 shadow-[0_0_12px_rgba(0,252,67,0.28)]'
                      : isRoyalViolet
                      ? 'text-violet-300 bg-violet-500/20 border border-violet-500/40 shadow-[0_0_12px_rgba(139,92,246,0.25)]'
                      : 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/35'
                  )}
                >
                  {plan.discountBadge}
                </span>
              )}
              {plan.savingsText && (
                <span
                  className={clsx(
                    'text-[10px] sm:text-[11px] font-bold font-mono px-2 sm:px-2.5 py-0.5 rounded-full border shadow-sm',
                    isVoltGold
                      ? 'text-amber-300 bg-amber-500/15 border-amber-400/35 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                      : isRoyalViolet
                      ? 'text-violet-200 bg-violet-500/15 border-violet-400/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                      : 'text-emerald-300 bg-emerald-500/15 border-emerald-500/35 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                  )}
                >
                  {plan.savingsText}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-3xl sm:text-4xl lg:text-[48px] font-black tracking-tight text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                {plan.price}
              </span>
              <span className="text-xs sm:text-sm text-neutral-300 font-semibold">
                {plan.period === 'One-Time Cost' || plan.period === 'One-Time'
                  ? ' (One-Time)'
                  : plan.period === 'Starting Price'
                  ? ' (Starting)'
                  : plan.period === 'Bespoke Scope'
                  ? ' (Bespoke)'
                  : `/${plan.period}`}
              </span>
            </div>

            {/* Instant Deliverables Summary Chip */}
            {plan.deliverableSummary && (
              <div
                className={clsx(
                  'mt-3 px-3 py-1.5 rounded-xl border flex items-center gap-2 backdrop-blur-md transition-all duration-300',
                  isVoltGold
                    ? 'bg-[#00FC43]/[0.08] border-[#00FC43]/30 text-[#00FC43] shadow-[0_0_15px_rgba(0,252,67,0.15)]'
                    : isRoyalViolet
                    ? 'bg-violet-500/[0.10] border-violet-500/30 text-violet-200 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                    : 'bg-white/[0.04] border-white/10 text-neutral-200'
                )}
              >
                <Sparkles
                  className={clsx(
                    'w-3.5 h-3.5 shrink-0',
                    isVoltGold ? 'text-[#00FC43]' : isRoyalViolet ? 'text-violet-300' : 'text-emerald-400'
                  )}
                />
                <span className="text-[11px] sm:text-xs font-mono font-medium tracking-tight">
                  {plan.deliverableSummary}
                </span>
              </div>
            )}

            {/* Delivery, Support & Revision Meta Row */}
            {(plan.delivery || plan.supportDuration || plan.revisionPolicy) && (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3 pt-3 border-t border-white/10 text-[11px] font-mono text-neutral-300">
                {plan.delivery && (
                  <div
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5"
                    title="Estimated Delivery Timeline"
                  >
                    <Clock className="w-3.5 h-3.5 text-[#00FC43] shrink-0" />
                    <span className="truncate">{plan.delivery}</span>
                  </div>
                )}
                {plan.supportDuration && (
                  <div
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5"
                    title="Included Bug Support Duration"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00FC43] shrink-0" />
                    <span className="truncate">{plan.supportDuration}</span>
                  </div>
                )}
                {plan.revisionPolicy && (
                  <div
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5"
                    title="Included Revision Policy"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#00FC43] shrink-0" />
                    <span className="truncate">{plan.revisionPolicy}</span>
                  </div>
                )}
              </div>
            )}

            {plan.timeline && !plan.delivery && (
              <span
                className={clsx(
                  'inline-block mt-2.5 sm:mt-3 text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 rounded-full border',
                  isVoltGold
                    ? 'text-[#00FC43] bg-[#00FC43]/10 border-[#00FC43]/25'
                    : isRoyalViolet
                    ? 'text-violet-300 bg-violet-500/15 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                    : 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25'
                )}
              >
                {plan.timeline}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal mb-5 sm:mb-7">
            {plan.description}
          </p>

          {/* Action Buttons: Primary Booking + Secondary (Schedule Call + WhatsApp) */}
          <div className="flex flex-col gap-2 sm:gap-2.5 mb-6 sm:mb-8">
            {/* Button 1: Get This Package */}
            <button
              type="button"
              onClick={handleOpenPurchase}
              className={clsx(
                'w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-5 sm:px-6 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm transition-all duration-300 active:scale-95 select-none group/btn cursor-pointer min-h-[44px]',
                isVoltGold
                  ? 'brand-glow-button text-[#041608] font-extrabold shadow-[0_0_30px_rgba(0,252,67,0.55)] hover:shadow-[0_0_45px_rgba(0,252,67,0.8)]'
                  : isRoyalViolet
                  ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-500 hover:to-indigo-500 text-white font-bold shadow-[0_4px_25px_rgba(124,58,237,0.35)] border border-violet-400/30'
                  : 'bg-white text-[#050705] hover:bg-neutral-100 font-bold shadow-[0_4px_20px_rgba(255,255,255,0.12)] border border-white/20'
              )}
            >
              <span>{plan.ctaText || 'Get This Package'}</span>
              <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>

            {/* Secondary Action Row: 30-Min Call + WhatsApp */}
            <div className="grid grid-cols-2 gap-2">
              {/* Button 2: Schedule 30-Min Call */}
              <button
                type="button"
                onClick={() => setIsCalendlyOpen(true)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 sm:px-3 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-semibold text-white bg-white/5 hover:bg-indigo-500/15 border border-white/10 hover:border-indigo-400/40 transition-colors duration-200 active:scale-95 cursor-pointer backdrop-blur-md min-h-[40px] group/cal min-w-0"
                title="Schedule 30-Min 1-on-1 Strategy Call on Calendly"
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-400 group-hover/cal:text-indigo-300 shrink-0" />
                <span className="truncate">Schedule Call</span>
              </button>

              {/* Button 3: Discuss on WhatsApp */}
              <button
                type="button"
                onClick={handleDiscussOnWhatsApp}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 sm:px-3 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-semibold text-white bg-white/5 hover:bg-[#00FC43]/10 border border-white/10 hover:border-[#00FC43]/40 transition-colors duration-200 active:scale-95 cursor-pointer backdrop-blur-md min-h-[40px] group/wa min-w-0"
                title="Direct WhatsApp Consultation"
              >
                <FaWhatsapp className="w-3.5 h-3.5 text-[#00FC43] shrink-0" />
                <span className="truncate">WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-2.5 sm:space-y-3 pt-1">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-2 sm:mb-3 font-semibold">
              What&apos;s Included:
            </span>
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed">
                <span
                  className={clsx(
                    'w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                    feature.included
                      ? isVoltGold
                        ? 'text-[#00FC43] bg-[#00FC43]/15'
                        : isRoyalViolet
                        ? 'text-violet-300 bg-violet-500/20'
                        : 'text-emerald-400 bg-emerald-500/15'
                      : 'text-neutral-600 bg-white/5'
                  )}
                >
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
                <span className={feature.included ? 'text-white font-medium' : 'text-neutral-500 line-through'}>
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Package Purchase Modal */}
      {!onOpenPurchaseModal && (
        <PackagePurchaseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          packageData={packageDataForModal}
        />
      )}

      {/* Calendly 30-Min Strategy Call Modal */}
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        packageName={plan.name}
      />
    </>
  );
};
