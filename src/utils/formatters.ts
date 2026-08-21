/**
 * Utility string, phone, and date formatters.
 */

/**
 * Formats Indian phone number into readable +91 XXXXX XXXXX layout.
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

/**
 * Formats a category slug into human-readable label.
 */
export function formatCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    'traditional-mandapam': 'Traditional Mandapam',
    'reception-stage': 'Reception Stage',
    'pre-wedding': 'Pre-Wedding & Haldi',
    'temple-cultural': 'Temple & Cultural',
  };
  return map[category] || category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Truncates text cleanly at word boundaries.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}
