'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/data';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
  calendlyUrl?: string;
}

export function CalendlyModal({
  isOpen,
  onClose,
  packageName,
  calendlyUrl = SITE_CONFIG.calendlyUrl || 'https://calendly.com/yousuf91013/30min',
}: CalendlyModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Avoid SSR hydration issues with createPortal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and manage browser back button history
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
      return;
    }

    document.body.style.overflow = 'hidden';
    setIsLoading(true);

    // Push history state so Android/iOS back swipe or browser Back button closes modal
    window.history.pushState({ modal: 'calendly' }, '');

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

  // Build target URL with prefill parameters
  const targetUrl = React.useMemo(() => {
    try {
      const url = new URL(calendlyUrl);
      if (packageName) {
        url.searchParams.set('a1', `Package: ${packageName}`);
      }
      url.searchParams.set('hide_landing_page_details', '1');
      url.searchParams.set('hide_gdpr_banner', '1');
      url.searchParams.set('background_color', '070b09');
      url.searchParams.set('text_color', 'ffffff');
      url.searchParams.set('primary_color', '00fc43');
      return url.toString();
    } catch {
      return calendlyUrl;
    }
  }, [calendlyUrl, packageName]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-start sm:justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* 100% Opaque Obsidian Backdrop (Zero-Bleed Rule) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#040605]/95 backdrop-blur-2xl z-0"
        />

        {/* ========================================================================= */}
        {/* UNMISSABLE FLOATING TOP ACTION BAR (ALWAYS VISIBLE ABOVE ALL CONTENT)    */}
        {/* ========================================================================= */}
        <div className="fixed top-2 inset-x-2 sm:top-4 sm:inset-x-6 z-[1000001] flex items-center justify-between pointer-events-none max-w-4xl mx-auto">
          {/* Back to Website Button */}
          <button
            type="button"
            onClick={onClose}
            className="pointer-events-auto inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#070b09]/95 border border-white/20 hover:border-[#00FC43] text-white font-bold text-xs sm:text-sm shadow-[0_10px_35px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all active:scale-95 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#00FC43] transition-transform group-hover:-translate-x-1" />
            <span className="hidden xs:inline">Return to Website</span>
            <span className="xs:hidden">Back</span>
          </button>

          {/* Prominent Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#070b09]/95 border border-white/20 hover:border-red-400 text-neutral-300 hover:text-white font-bold text-xs sm:text-sm shadow-[0_10px_35px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all active:scale-95 cursor-pointer"
            aria-label="Close modal"
          >
            <span className="hidden xs:inline">Close</span>
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative w-full max-w-3xl bg-[#070b09] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,1),0_0_40px_rgba(0,252,67,0.15)] flex flex-col overflow-hidden z-10 mt-14 sm:mt-12 mb-4"
        >
          {/* Modal Header */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 flex items-center justify-between gap-3 bg-[#0a0f0c] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00FC43]/15 border border-[#00FC43]/40 flex items-center justify-center text-[#00FC43] shrink-0 shadow-[0_0_15px_rgba(0,252,67,0.25)]">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2 truncate">
                  <span>Schedule 30-Min Strategy Call</span>
                  <span className="w-2 h-2 rounded-full bg-[#00FC43] animate-pulse shrink-0" />
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 truncate">
                  {packageName ? (
                    <>
                      Topic: <span className="text-[#00FC43] font-semibold">{packageName}</span>
                    </>
                  ) : (
                    'Direct 1-on-1 Consultation with Yousuf Ali, Senior Consultant'
                  )}
                </p>
              </div>
            </div>

            {/* Direct Open in Fullscreen link */}
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-[#00FC43] hover:underline shrink-0"
            >
              <span>Fullscreen</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Sub-bar with trust signals */}
          <div className="px-4 sm:px-6 py-2 bg-black/50 border-b border-white/5 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-neutral-400 shrink-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <Clock className="w-3.5 h-3.5 text-[#00FC43]" />
                <span>30 Mins</span>
              </span>
              <span className="flex items-center gap-1.5 text-neutral-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00FC43]" />
                <span>Free & Confidential</span>
              </span>
            </div>
            <span className="text-neutral-500 text-[10px]">Press Esc or Tap Outside to Exit</span>
          </div>

          {/* Calendly Iframe Container */}
          <div className="relative w-full h-[580px] sm:h-[620px] bg-[#070b09] overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#070b09] z-10">
                <div className="w-8 h-8 border-2 border-[#00FC43]/30 border-t-[#00FC43] rounded-full animate-spin" />
                <p className="text-xs text-neutral-400 font-mono">Loading Calendly Calendar...</p>
              </div>
            )}

            <iframe
              src={targetUrl}
              title="Schedule a consultation with TOTO Development"
              className="w-full h-full border-none"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
