import { describe, expect, it } from 'vitest';
import { validateContactPayload } from '@/lib/server/contact/validation';

describe('contact/validation', () => {
  it('accepts a valid submission', () => {
    const result = validateContactPayload({
      name: 'Aarti',
      email: 'aarti@example.com',
      persona: 'Researcher',
      message: 'I would like to learn more about the evidence system.',
    });

    expect(result.kind).toBe('accepted');
    if (result.kind === 'accepted') {
      expect(result.submission.email).toBe('aarti@example.com');
      expect(result.submission.persona).toBe('Researcher');
    }
  });

  it('rejects missing required fields', () => {
    const result = validateContactPayload({
      name: '',
      email: 'invalid-email',
      message: '',
    });

    expect(result).toEqual({
      kind: 'invalid',
      error: 'Name, email, and message are all required.',
    });
  });

  it('rejects messages that are too short', () => {
    const result = validateContactPayload({
      name: 'Aarti',
      email: 'aarti@example.com',
      message: 'Too short',
    });

    expect(result).toEqual({
      kind: 'invalid',
      error: 'Please share a little more detail so we can respond usefully.',
    });
  });

  it('silently classifies honeypot submissions as spam', () => {
    const result = validateContactPayload({
      name: 'Bot',
      email: 'bot@example.com',
      message: 'This should never be processed.',
      website: 'https://spam.example.com',
    });

    expect(result).toEqual({ kind: 'spam' });
  });
});
