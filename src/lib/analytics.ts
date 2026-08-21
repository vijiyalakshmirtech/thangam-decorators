import { ConversionEvent, EventPayload } from '../types/analytics';
import { siteConfig } from '../config/site';

/**
 * Privacy-Centric Analytics Dispatcher
 *
 * Strict Privacy Rules:
 * 1. NEVER track personally identifiable information (PII) like names, phone numbers, emails, or message text.
 * 2. Analytics is completely non-blocking; UI functionality is never dependent on analytics execution.
 * 3. Gracefully no-ops when disabled or running in non-browser environments.
 */
export function trackEvent(event: ConversionEvent, payload: EventPayload = {}): void {
  if (!siteConfig.analytics.enabled || typeof window === 'undefined') {
    // In development mode or when analytics is disabled, log subtly if in debug mode
    if (import.meta.env.DEV && import.meta.env.VITE_DEBUG_ANALYTICS === 'true') {
      console.debug(`[Analytics Track] ${event}:`, payload);
    }
    return;
  }

  try {
    // Google Analytics 4 integration (if gtag is initialized on window)
    const windowWithGtag = window as unknown as {
      gtag?: (command: string, action: string, params: Record<string, unknown>) => void;
    };

    if (typeof windowWithGtag.gtag === 'function') {
      windowWithGtag.gtag('event', event, {
        ...payload,
        event_category: 'Conversion',
        anonymize_ip: siteConfig.analytics.anonymizeIp,
      });
    }
  } catch (err) {
    // Fail silently to guarantee zero UX disruption
  }
}
