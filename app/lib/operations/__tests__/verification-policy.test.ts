import { describe, expect, it } from 'vitest';
import { evaluateVerification, VERIFICATION_POLICIES } from '../verification-policy';
import type { VerificationSubmission } from '../verification-contracts';

function factual(overrides: Partial<VerificationSubmission> = {}): VerificationSubmission {
  const policy = VERIFICATION_POLICIES.factual_audit;
  return {
    idempotencyKey: 'github:123:1:factual', suite: 'factual_audit', outcome: 'passed',
    policyVersion: policy.version, startedAt: '2026-08-15T10:00:00.000Z', completedAt: '2026-08-15T10:05:00.000Z',
    environment: 'ci', provider: 'github_actions', trigger: 'schedule',
    controls: policy.requiredControls.map((id) => ({ id, required: true, outcome: 'passed' })),
    ...overrides,
  };
}

describe('verification qualification policy', () => {
  it('qualifies only a complete trusted audit', () => {
    expect(evaluateVerification(factual())).toEqual({ qualified: true, rail: 'factual_audit', reasons: [] });
  });

  it('fails closed for a missing required control', () => {
    const submission = factual();
    submission.controls = submission.controls.slice(1);
    expect(evaluateVerification(submission).qualified).toBe(false);
  });

  it('does not let local or manual evidence advance CI freshness', () => {
    const result = evaluateVerification(factual({ environment: 'development', provider: 'manual' }));
    expect(result.reasons).toEqual(expect.arrayContaining(['audit-not-ci', 'audit-provider-not-trusted']));
  });
});
