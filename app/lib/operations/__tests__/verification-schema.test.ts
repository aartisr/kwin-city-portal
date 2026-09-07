import { describe, expect, it } from 'vitest';
import { parseVerificationSubmission } from '../verification-schema';
import { VERIFICATION_POLICIES } from '../verification-policy';

function valid() {
  const policy = VERIFICATION_POLICIES.factual_audit;
  return {
    idempotencyKey: 'github:123:1:factual', suite: 'factual_audit', outcome: 'passed', policyVersion: policy.version,
    startedAt: '2026-08-15T10:00:00.000Z', completedAt: '2026-08-15T10:05:00.000Z', environment: 'ci',
    provider: 'github_actions', trigger: 'schedule', providerRunUrl: 'https://github.com/example/repo/actions/runs/123',
    controls: policy.requiredControls.map((id) => ({ id, required: true, outcome: 'passed' })),
  };
}

describe('verification submission schema', () => {
  it('normalizes a valid bounded submission', () => {
    expect(parseVerificationSubmission(valid())).toMatchObject({ suite: 'factual_audit', provider: 'github_actions' });
  });

  it('rejects duplicate and empty controls', () => {
    const duplicate = valid();
    duplicate.controls.push({ ...duplicate.controls[0] });
    expect(() => parseVerificationSubmission(duplicate)).toThrow('duplicate-control');
    expect(() => parseVerificationSubmission({ ...valid(), controls: [] })).toThrow('invalid-controls');
  });

  it.each([
    ['credentials', 'https://user:secret@github.com/run'],
    ['insecure transport', 'http://github.com/run'],
  ])('rejects provider URLs with %s', (_label, providerRunUrl) => {
    expect(() => parseVerificationSubmission({ ...valid(), providerRunUrl })).toThrow('invalid-provider-url');
  });

  it('rejects nested or non-finite metrics', () => {
    const nested = valid();
    nested.controls[0] = { ...nested.controls[0], metrics: { unsafe: { nested: true } } } as never;
    expect(() => parseVerificationSubmission(nested)).toThrow('invalid-control-metrics');
    const infinite = valid();
    infinite.controls[0] = { ...infinite.controls[0], metrics: { count: Infinity } } as never;
    expect(() => parseVerificationSubmission(infinite)).toThrow('invalid-control-metrics');
  });
});
