'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(true);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* 100% Opaque Obsidian Backdrop (Zero-Bleed Rule) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#040605]/90 backdrop-blur-xl -z-10"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-3xl max-h-[92dvh] bg-[#070b09] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,1),0_0_35px_rgba(0,252,67,0.15)] flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-white/10 flex items-center justify-between gap-4 bg-[#0a0f0c] shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#00FC43]/15 border border-[#00FC43]/40 flex items-center justify-center text-[#00FC43] shrink-0 shadow-[0_0_15px_rgba(0,252,67,0.25)]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2 truncate">
                    <span>Schedule 30-Min Strategy Call</span>
                    <span className="w-2 h-2 rounded-full bg-[#00FC43] animate-pulse shrink-0" />
                  </h3>
                  <p className="text-xs text-neutral-400 truncate">
                    {packageName ? (
                      <>
                        Discussion topic:{' '}
                        <span className="text-[#00FC43] font-semibold">{packageName}</span>
                      </>
                    ) : (
                      'Direct 1-on-1 Consultation with Yousuf Ali, Senior Consultant'
                    )}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-bar with trust signals */}
            <div className="px-5 sm:px-7 py-2 bg-black/40 border-b border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-neutral-400 shrink-0">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <Clock className="w-3.5 h-3.5 text-[#00FC43]" />
                  <span>30 Minutes Duration</span>
                </span>
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00FC43]" />
                  <span>Free & Confidential</span>
                </span>
              </div>
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#00FC43] hover:underline"
              >
                <span>Open in Fullscreen</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Calendly Iframe Container */}
            <div className="relative w-full flex-1 min-h-[520px] sm:min-h-[580px] bg-[#070b09] overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#070b09] z-10">
                  <div className="w-8 h-8 border-2 border-[#00FC43]/30 border-t-[#00FC43] rounded-full animate-spin" />
                  <p className="text-xs text-neutral-400 font-mono">Loading Calendly Calendar...</p>
                </div>
              )}

              <iframe
                src={targetUrl}
                title="Schedule a consultation with TOTO Development"
                className="w-full h-full min-h-[520px] sm:min-h-[580px] border-none"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
