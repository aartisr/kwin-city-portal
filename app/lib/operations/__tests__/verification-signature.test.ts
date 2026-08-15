import { describe, expect, it } from 'vitest';
import { signEvidencePayload, verifyEvidenceSignature } from '../verification-signature';

describe('operational evidence signatures', () => {
  const secret = 'a-dedicated-secret-with-enough-entropy';
  const now = Date.parse('2026-08-15T10:00:00.000Z');
  const timestamp = String(now);
  const nonce = '0123456789abcdef01234567';
  const body = '{"suite":"factual_audit"}';

  it('accepts the exact signed body within the replay window', () => {
    const signature = signEvidencePayload(secret, timestamp, nonce, body);
    expect(verifyEvidenceSignature({ secret, timestamp, nonce, signature, body, now })).toBe(true);
  });

  it('rejects tampering and stale requests', () => {
    const signature = signEvidencePayload(secret, timestamp, nonce, body);
    expect(verifyEvidenceSignature({ secret, timestamp, nonce, signature, body: `${body} `, now })).toBe(false);
    expect(verifyEvidenceSignature({ secret, timestamp, nonce, signature, body, now: now + 300_001 })).toBe(false);
  });
});
