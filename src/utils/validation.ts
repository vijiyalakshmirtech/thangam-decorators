/**
 * Form input and string validation utilities.
 */

/**
 * Validates standard email address format.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.trim().length === 0) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates standard 10-digit or 12-digit (+91) Indian phone number.
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const clean = phone.replace(/[^0-9]/g, '');
  return clean.length === 10 || (clean.length === 12 && clean.startsWith('91'));
}

/**
 * Sanitizes input string to prevent script injection.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 1000); // Enforce max length
}
