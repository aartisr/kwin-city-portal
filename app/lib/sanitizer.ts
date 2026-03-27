/**
 * Input Sanitization Utilities
 * Prevents XSS and injection attacks by sanitizing user input
 */

/**
 * Basic HTML entity encoding
 * Converts dangerous characters to HTML entities
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';

  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;',
  };

  return input.replace(/[&<>"'\/]/g, (char) => map[char]);
}

/**
 * Sanitize user input for community posts
 * - Removes HTML tags
 * - Limits length
 * - Removes suspicious patterns
 */
export function sanitizeCommunityPost(input: string, maxLength = 1000): string {
  if (!input) return '';

  // Remove any HTML/script tags
  let cleaned = input.replace(/<[^>]*>/g, '');

  // Remove script-like patterns
  cleaned = cleaned.replace(/javascript:/gi, '');
  cleaned = cleaned.replace(/on\w+\s*=/gi, '');

  // Trim to max length
  cleaned = cleaned.substring(0, maxLength);

  return cleaned.trim();
}

/**
 * Validate and sanitize email addresses
 */
export function sanitizeEmail(input: string): string | null {
  if (!input) return null;

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmed = input.trim().toLowerCase();

  if (emailRegex.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Validate and sanitize URLs
 * Only allows http/https protocols
 */
export function sanitizeUrl(input: string): string | null {
  if (!input) return null;

  try {
    const url = new URL(input);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return url.toString();
    }
  } catch (e) {
    // Invalid URL
  }

  return null;
}

/**
 * Remove dangerous patterns from any string
 */
export function removeDangerousPatterns(input: string): string {
  if (!input) return '';

  let cleaned = input;

  // Remove common XSS vectors
  const patterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<embed/gi,
    /<object/gi,
    /eval\(/gi,
    /expression\(/gi,
  ];

  patterns.forEach((pattern) => {
    cleaned = cleaned.replace(pattern, '');
  });

  return cleaned;
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate and sanitize community content title
 */
export function sanitizeTitle(
  input: string,
  minLength = 3,
  maxLength = 200
): string | null {
  if (!input) return null;

  let cleaned = sanitizeHtml(input.trim());

  if (cleaned.length < minLength || cleaned.length > maxLength) {
    return null;
  }

  return cleaned;
}

/**
 * Validate and sanitize community content body
 */
export function sanitizeBody(input: string, minLength = 10, maxLength = 5000): string | null {
  if (!input) return null;

  let cleaned = sanitizeCommunityPost(input, maxLength);

  if (cleaned.length < minLength) {
    return null;
  }

  return cleaned;
}
