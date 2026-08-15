import { describe, expect, it } from 'vitest';
import { sha256Fingerprint } from '../verification-fingerprint';
import { buildVerificationRecord } from '../verification-record';
import { VERIFICATION_POLICIES } from '../verification-policy';
import type { VerificationSubmission } from '../verification-contracts';

function submission(): VerificationSubmission {
  const policy = VERIFICATION_POLICIES.execution_status;
  return {
    idempotencyKey: 'github:123:1:execution', suite: policy.suite, outcome: 'passed', policyVersion: policy.version,
    startedAt: '2026-08-15T10:00:00.000Z', completedAt: '2026-08-15T10:05:00.000Z', environment: 'ci',
    provider: 'github_actions', trigger: 'schedule',
    controls: policy.requiredControls.map((id) => ({ id, required: true, outcome: 'passed' })),
  };
}

describe('verification record builder', () => {
  it('creates deterministic order-independent fingerprints', () => {
    expect(sha256Fingerprint({ b: 2, a: 1 })).toBe(sha256Fingerprint({ a: 1, b: 2 }));
    expect(sha256Fingerprint({ a: 1 })).not.toBe(sha256Fingerprint({ a: 2 }));
  });

  it('builds a qualified immutable record and exact policy expiry', () => {
    const record = buildVerificationRecord(submission());
    expect(record.evaluation.qualified).toBe(true);
    expect(record.requestSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(record.manifestSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(record.expiresAt).toBe('2026-08-29T10:05:00.000Z');
  });

  it('changes the request fingerprint when any evidence-bearing field changes', () => {
    const original = submission();
    const changed = { ...original, commitSha: 'a'.repeat(40) };
    expect(buildVerificationRecord(original).requestSha256).not.toBe(buildVerificationRecord(changed).requestSha256);
  });
});
