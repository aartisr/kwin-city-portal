import { removeDangerousPatterns, sanitizeEmail } from '@/lib/sanitizer';
import { CONTACT_FIELD_LIMITS } from './config';
import type { ContactPayload, ContactSubmission } from './config';

export type ContactValidationResult =
  | { kind: 'accepted'; submission: ContactSubmission }
  | { kind: 'spam' }
  | { kind: 'invalid'; error: string };

export function sanitiseContactField(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';

  return removeDangerousPatterns(value)
    .replace(/[<>"'`]/g, '')
    .replace(/\r\n/g, '\n')
    .trim()
    .slice(0, maxLen);
}

export function validateContactPayload(body: ContactPayload): ContactValidationResult {
  if (body.website) {
    return { kind: 'spam' };
  }

  const name = sanitiseContactField(body.name, CONTACT_FIELD_LIMITS.name);
  const email = sanitizeEmail(sanitiseContactField(body.email, CONTACT_FIELD_LIMITS.email));
  const message = sanitiseContactField(body.message, CONTACT_FIELD_LIMITS.message);
  const persona =
    sanitiseContactField(body.persona, CONTACT_FIELD_LIMITS.persona) || 'Visitor';

  if (!name || !email || !message) {
    return {
      kind: 'invalid',
      error: 'Name, email, and message are all required.',
    };
  }

  if (message.length < CONTACT_FIELD_LIMITS.minMessage) {
    return {
      kind: 'invalid',
      error: 'Please share a little more detail so we can respond usefully.',
    };
  }

  return {
    kind: 'accepted',
    submission: {
      name,
      email,
      persona,
      message,
    },
  };
}
