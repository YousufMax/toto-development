'use client';

import { useState, useEffect, useCallback } from 'react';
import { captureAttribution } from '@/lib/session';

export interface ActiveWhatsAppState {
  agentId: number | null;
  agentName: string;
  phoneNumber: string;
  prefilledMessage: string;
  isScheduled: boolean;
  isOverride: boolean;
  isLoading: boolean;
  whatsappUrl: string;
}

export interface ExtraTrackMeta {
  packageId?: number;
  packageName?: string;
  packagePrice?: number;
  customMessage?: string;
}

const DEFAULT_STATE: ActiveWhatsAppState = {
  agentId: null,
  agentName: 'TOTO Senior Consultant',
  phoneNumber: '+8801800942868',
  prefilledMessage: 'Hi TOTO Development, I would like to consult on your agency services & packages.',
  isScheduled: false,
  isOverride: false,
  isLoading: true,
  whatsappUrl:
    'https://wa.me/8801800942868?text=Hi%20TOTO%20Development%2C%20I%20would%20like%20to%20consult%20on%20your%20agency%20services%20%26%20packages.',
};

export function useActiveWhatsApp() {
  const [waState, setWaState] = useState<ActiveWhatsAppState>(DEFAULT_STATE);

  const fetchActiveWhatsApp = useCallback(async () => {
    try {
      const res = await fetch('/api/whatsapp/active/', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const cleanPhone = (data.phoneNumber || '+8801800942868').replace(/[^\d]/g, '');
        const message = data.prefilledMessage || DEFAULT_STATE.prefilledMessage;
        const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

        setWaState({
          agentId: data.agentId,
          agentName: data.agentName || 'TOTO Senior Consultant',
          phoneNumber: data.phoneNumber || '+8801800942868',
          prefilledMessage: message,
          isScheduled: !!data.isScheduled,
          isOverride: !!data.isOverride,
          isLoading: false,
          whatsappUrl: url,
        });
      }
    } catch (err) {
      console.warn('Could not load dynamic WhatsApp number, using system default.', err);
      setWaState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    fetchActiveWhatsApp();
    // Poll every 5 minutes to stay aligned with shift rotations
    const interval = setInterval(fetchActiveWhatsApp, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchActiveWhatsApp]);

  const openWhatsApp = useCallback(
    async (source: string = 'website_button', extraMeta?: ExtraTrackMeta | string) => {
      const meta: ExtraTrackMeta =
        typeof extraMeta === 'string' ? { customMessage: extraMeta } : extraMeta || {};

      const textToUse = meta.customMessage || waState.prefilledMessage;
      const cleanPhone = waState.phoneNumber.replace(/[^\d]/g, '');
      const directFallbackUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textToUse)}`;

      // Pre-open window or redirect handling:
      // Note: On mobile browsers, synchronous window.open is preferred to avoid popup blocking
      let popupWindow: Window | null = null;
      if (typeof window !== 'undefined') {
        // Open a blank tab synchronously to guarantee iOS/Safari doesn't block the popup
        popupWindow = window.open('about:blank', '_blank');
      }

      const attribution = captureAttribution();

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1400); // 1.4s safety cap

        const trackRes = await fetch('/api/whatsapp/track/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            agentId: waState.agentId,
            phoneNumber: waState.phoneNumber,
            source,
            pageUrl: typeof window !== 'undefined' ? window.location.href : '',
            packageId: meta.packageId,
            packageName: meta.packageName,
            packagePrice: meta.packagePrice,
            utmSource: attribution.utmSource,
            utmMedium: attribution.utmMedium,
            utmCampaign: attribution.utmCampaign,
            utmContent: attribution.utmContent,
            utmTerm: attribution.utmTerm,
            sessionId: attribution.sessionId,
            prefilledMessage: textToUse,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (trackRes.ok) {
          const data = await trackRes.json();
          const finalUrl = data.destinationUrl || directFallbackUrl;
          const eventId = data.eventId;

          // Client-side Meta Pixel with exact matching eventID for CAPI deduplication
          if (typeof window !== 'undefined' && (window as any).fbq && eventId) {
            try {
              (window as any).fbq('track', 'Contact', {
                content_name: meta.packageName || 'WhatsApp Consultation',
                value: meta.packagePrice || 0,
                currency: 'BDT',
              }, { eventID: eventId });
            } catch (e) {}
          }

          // Client-side GA4 event
          if (typeof window !== 'undefined' && (window as any).gtag && eventId) {
            try {
              (window as any).gtag('event', 'whatsapp_click', {
                event_id: eventId,
                agent_name: waState.agentName,
                source,
              });
            } catch (e) {}
          }

          if (popupWindow && !popupWindow.closed) {
            popupWindow.location.href = finalUrl;
          } else if (typeof window !== 'undefined') {
            window.location.href = finalUrl;
          }
          return;
        }
      } catch (err) {
        // Timeout or network error: gracefully proceed with fallback URL
        console.warn('Track endpoint timed out or failed, proceeding with direct link', err);
      }

      // Fallback redirect
      if (popupWindow && !popupWindow.closed) {
        popupWindow.location.href = directFallbackUrl;
      } else if (typeof window !== 'undefined') {
        window.open(directFallbackUrl, '_blank', 'noopener,noreferrer');
      }
    },
    [waState]
  );

  const getDynamicWhatsAppUrl = useCallback(
    (customMessage?: string) => {
      const cleanPhone = waState.phoneNumber.replace(/[^\d]/g, '');
      const textToUse = customMessage || waState.prefilledMessage;
      return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textToUse)}`;
    },
    [waState]
  );

  return {
    ...waState,
    openWhatsApp,
    getDynamicWhatsAppUrl,
    refreshWhatsApp: fetchActiveWhatsApp,
  };
}
