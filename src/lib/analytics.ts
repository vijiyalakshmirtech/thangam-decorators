import { ConversionEvent, EventPayload } from '../types/analytics';
import { siteConfig } from '../config/site';

/**
 * Global window type augmentation for GA4 gtag
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Guarantee dataLayer and gtag shim exist on client
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
  }
}

/**
 * Resolves the active GA4 Measurement ID from environment variables or site configuration.
 */
export function getMeasurementId(): string | null {
  const envId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (typeof envId === 'string' && envId.trim().length > 0 && envId !== 'PASTE_MY_GA4_MEASUREMENT_ID_HERE') {
    return envId.trim();
  }
  if (siteConfig.analytics.measurementId && siteConfig.analytics.measurementId !== 'PASTE_MY_GA4_MEASUREMENT_ID_HERE') {
    return siteConfig.analytics.measurementId.trim();
  }
  return null;
}

let isInitialized = false;

/**
 * Initializes Google Analytics 4 (gtag.js) non-blockingly.
 * Guarantees zero duplicate script injections and zero UX disruption.
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined' || isInitialized) {
    return;
  }

  const measurementId = getMeasurementId();
  const isEnabled = Boolean(siteConfig.analytics.enabled || measurementId);

  if (measurementId && isEnabled) {
    try {
      // Check if gtag script is already inserted to prevent duplicate scripts
      const scriptId = 'google-ga4-gtag';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
        document.head.appendChild(script);
      }

      window.gtag?.('js', new Date());
      window.gtag?.('config', measurementId, {
        anonymize_ip: siteConfig.analytics.anonymizeIp,
        send_page_view: false, // Dispatched explicitly below to prevent double counting
      });
    } catch (err) {
      // Fail silently to ensure analytics errors never block the website
    }
  }

  isInitialized = true;

  // Track initial page view
  trackPageView();
}

/**
 * Explicitly tracks a page_view event.
 */
export function trackPageView(pagePath?: string, pageTitle?: string): void {
  if (typeof window === 'undefined') return;

  const path = pagePath || window.location.pathname + window.location.search;
  const title = pageTitle || document.title;

  trackEvent('page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

/**
 * Privacy-Centric Analytics Dispatcher
 *
 * Strict Privacy Rules:
 * 1. NEVER track personally identifiable information (PII) like names, phone numbers, emails, or message text.
 * 2. Analytics is completely non-blocking; UI functionality is never dependent on analytics execution.
 * 3. Gracefully no-ops when disabled or running in non-browser environments.
 */
export function trackEvent(event: ConversionEvent, payload: EventPayload = {}): void {
  if (typeof window === 'undefined') return;

  // Development/Debug logging
  if (import.meta.env.DEV && import.meta.env.VITE_DEBUG_ANALYTICS === 'true') {
    console.debug(`[Analytics Track] ${event}:`, payload);
  }

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, {
        ...payload,
        event_category: 'Engagement',
        anonymize_ip: siteConfig.analytics.anonymizeIp,
      });
    }
  } catch (err) {
    // Fail silently to guarantee zero UX disruption
  }
}
