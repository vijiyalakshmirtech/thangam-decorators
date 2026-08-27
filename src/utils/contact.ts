import { siteConfig } from '../config/site';

/**
 * Generates a valid WhatsApp click-to-chat URL.
 * Supports both signatures: (message, customNumber) and (customNumber, message).
 * Returns null if the WhatsApp number is not configured.
 *
 * @param param1 Optional pre-filled text message or phone number
 * @param param2 Optional specific number override or pre-filled message
 */
export function generateWhatsAppUrl(
  param1?: string | null,
  param2?: string | null
): string | null {
  let message: string | undefined;
  let customNumber: string | null | undefined;

  // Determine parameter order
  const isPhoneLike = (str?: string | null) =>
    str ? /^\+?[0-9\s-]{7,16}$/.test(str.trim()) : false;

  if (isPhoneLike(param1) && param2 && !isPhoneLike(param2)) {
    customNumber = param1;
    message = param2;
  } else {
    message = param1 ?? undefined;
    customNumber = param2;
  }

  const number = customNumber ?? siteConfig.contact.whatsappNumber;

  if (!number) {
    return null;
  }

  const cleanNumber = number.replace(/\D/g, '');

  if (!cleanNumber) {
    return null;
  }

  const baseUrl = `https://wa.me/${cleanNumber}`;

  if (!message) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a valid `tel:` link URL for phone calls.
 *
 * @param phoneNumber Optional phone number override (defaults to siteConfig.contact.phonePrimary)
 */
export function generateTelUrl(phoneNumber?: string): string {
  const phone = phoneNumber ?? siteConfig.contact.phonePrimary;
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  return `tel:${cleanPhone}`;
}

/**
 * Generates a valid `mailto:` URL with optional subject and body.
 *
 * @param subject Optional email subject
 * @param body Optional email body text
 */
export function generateMailtoUrl(subject?: string, body?: string): string {
  const email = siteConfig.contact.email;
  const params = new URLSearchParams();

  if (subject) {
    params.append('subject', subject);
  }
  if (body) {
    params.append('body', body);
  }

  const queryString = params.toString();
  return queryString ? `mailto:${email}?${queryString}` : `mailto:${email}`;
}

/**
 * Generates a Google Maps search URL from verified physical address fields.
 */
export function generateGoogleMapsUrl(): string {
  const query = [
    siteConfig.brand.name,
    siteConfig.location.address,
    siteConfig.location.city,
    siteConfig.location.postalCode,
    siteConfig.location.state,
    siteConfig.location.country,
  ]
    .filter(Boolean)
    .join(', ');

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
