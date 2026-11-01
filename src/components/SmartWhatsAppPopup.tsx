'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';

interface PopupConfig {
  enabled: boolean;
  id?: number;
  title?: string;
  description?: string;
  ctaText?: string;
  delaySeconds?: number;
  displayFrequency?: string;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
  agentName?: string;
  whatsappUrl?: string;
}

export function SmartWhatsAppPopup() {
  const pathname = usePathname();
  const { openWhatsApp } = useActiveWhatsApp();
  const [config, setConfig] = useState<PopupConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  // Avoid showing popup on admin pages
  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) {
      setIsVisible(false);
      return;
    }

    let isMounted = true;
    let timer: NodeJS.Timeout | null = null;

    const checkAndSchedulePopup = async () => {
      // Check session storage if already dismissed
      const sessionKey = `toto_popup_dismissed_${pathname}`;
      if (typeof window !== 'undefined' && sessionStorage.getItem(sessionKey)) {
        setHasDismissed(true);
        return;
      }

      try {
        const res = await fetch(`/api/popups/active/?route=${encodeURIComponent(pathname || '/')}`, {
          cache: 'no-store',
        });
        if (!res.ok) return;

        const data: PopupConfig = await res.json();
        if (!isMounted || !data.enabled) return;

        setConfig(data);

        const delay = (data.delaySeconds || 15) * 1000;
        timer = setTimeout(() => {
          if (isMounted) {
            setIsVisible(true);
          }
        }, delay);
      } catch (e) {
        // fail silently
      }
    };

    checkAndSchedulePopup();

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [pathname, isAdminRoute]);

  const handleDismiss = () => {
    setIsVisible(false);
    setHasDismissed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`toto_popup_dismissed_${pathname}`, 'true');
    }
  };

  const handleCtaClick = () => {
    if (config?.whatsappUrl) {
      // Record click
      fetch('/api/whatsapp/click/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: config.whatsappUrl,
          pageUrl: pathname,
          source: 'smart_engagement_popup',
        }),
      }).catch(() => {});

      window.open(config.whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      openWhatsApp('smart_engagement_popup');
    }
    handleDismiss();
  };

  if (isAdminRoute || !isVisible || !config || !config.enabled) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="fixed bottom-6 left-4 sm:left-6 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-96 bg-[#08100a]/95 backdrop-blur-xl border border-[#00FC43]/30 rounded-3xl p-5 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(0,252,67,0.2)] text-white"
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          aria-label="Close message"
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FC43] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FC43]" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#00FC43]">
            {config.agentName ? `${config.agentName} (Online)` : 'Live Consultant Available'}
          </span>
        </div>

        {/* Title */}
        <h4 className="editorial-serif text-lg font-normal text-white leading-snug">
          {config.title || 'A Live Agent Is Ready to Assist You'}
        </h4>

        {/* Description */}
        <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
          {config.description ||
            'Have questions about our custom software, packages, or pricing? Chat directly on WhatsApp.'}
        </p>

        {/* Action Button */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={handleCtaClick}
            className="brand-glow-button flex-1 py-3 px-4 rounded-full text-xs font-bold text-[#041608] flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,252,67,0.4)]"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>{config.ctaText || 'Chat on WhatsApp'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDismiss}
            className="py-3 px-4 rounded-full text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
