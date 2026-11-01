/**
 * Client-side Session and Attribution Utilities
 */

export interface AttributionData {
  sessionId: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPage?: string;
}

const SESSION_KEY = 'toto_session_id';
const ATTR_KEY = 'toto_attribution';

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'server_session';

  try {
    let sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now();
      localStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
  } catch {
    return 'fallback_session_' + Date.now();
  }
}

export function captureAttribution(): AttributionData {
  const sessionId = getOrCreateSessionId();
  if (typeof window === 'undefined') return { sessionId };

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || undefined;
    const utmMedium = urlParams.get('utm_medium') || undefined;
    const utmCampaign = urlParams.get('utm_campaign') || undefined;
    const utmContent = urlParams.get('utm_content') || undefined;
    const utmTerm = urlParams.get('utm_term') || undefined;

    // Check existing stored attribution
    const storedStr = localStorage.getItem(ATTR_KEY);
    let stored: Partial<AttributionData> = storedStr ? JSON.parse(storedStr) : {};

    // If new UTM source arrived, update stored attribution
    if (utmSource || utmCampaign) {
      stored = {
        sessionId,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        landingPage: window.location.pathname,
      };
      localStorage.setItem(ATTR_KEY, JSON.stringify(stored));
    } else if (!stored.sessionId) {
      stored = {
        sessionId,
        landingPage: window.location.pathname,
      };
      localStorage.setItem(ATTR_KEY, JSON.stringify(stored));
    }

    return {
      sessionId,
      utmSource: stored.utmSource || utmSource,
      utmMedium: stored.utmMedium || utmMedium,
      utmCampaign: stored.utmCampaign || utmCampaign,
      utmContent: stored.utmContent || utmContent,
      utmTerm: stored.utmTerm || utmTerm,
      landingPage: stored.landingPage,
    };
  } catch {
    return { sessionId };
  }
}
