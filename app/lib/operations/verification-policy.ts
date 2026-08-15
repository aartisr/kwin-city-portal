import { FRESHNESS_TARGET_DAYS } from './freshness-score';
import type { FreshnessRail, VerificationSubmission, VerificationSuite } from './verification-contracts';

type VerificationPolicy = {
  version: string;
  suite: VerificationSuite;
  rail: FreshnessRail;
  targetDays: number;
  requiredControls: readonly string[];
};

export const VERIFICATION_POLICIES: Record<VerificationSuite, VerificationPolicy> = {
  content_refresh: {
    version: 'content-refresh/v1', suite: 'content_refresh', rail: 'content',
    targetDays: FRESHNESS_TARGET_DAYS.content,
    requiredControls: ['authorization', 'source-health', 'live-inputs', 'content-validation', 'supabase-persistence', 'post-write-read'],
  },
  factual_audit: {
    version: 'factual-audit/v1', suite: 'factual_audit', rail: 'factual_audit',
    targetDays: FRESHNESS_TARGET_DAYS.factualAudit,
    requiredControls: ['operations-current', 'primary-source-health', 'source-registry', 'content-staleness', 'factual-integrity', 'discovery-signals'],
  },
  execution_status: {
    version: 'execution-status/v1', suite: 'execution_status', rail: 'execution_status',
    targetDays: FRESHNESS_TARGET_DAYS.executionStatus,
    requiredControls: ['node-runtime', 'type-check', 'unit-tests', 'migration-verification', 'vercel-config', 'pwa-verification', 'production-build'],
  },
};

export function evaluateVerification(submission: VerificationSubmission): { qualified: boolean; rail: FreshnessRail; reasons: string[] } {
  const policy = VERIFICATION_POLICIES[submission.suite];
  const reasons: string[] = [];
  if (submission.policyVersion !== policy.version) reasons.push('policy-version-mismatch');
  if (submission.outcome !== 'passed') reasons.push(`outcome-${submission.outcome}`);
  if (submission.suite === 'content_refresh' && submission.environment !== 'production') reasons.push('content-not-production');
  if (submission.suite !== 'content_refresh' && submission.environment !== 'ci') reasons.push('audit-not-ci');
  if (submission.suite !== 'content_refresh' && submission.provider !== 'github_actions') reasons.push('audit-provider-not-trusted');
  const controls = new Map(submission.controls.map((control) => [control.id, control]));
  for (const required of policy.requiredControls) {
    if (controls.get(required)?.outcome !== 'passed') reasons.push(`required-control-not-passed:${required}`);
  }
  if (submission.controls.some((control) => control.required && control.outcome !== 'passed')) reasons.push('required-control-failed');
  return { qualified: reasons.length === 0, rail: policy.rail, reasons };
}

export function qualificationExpiry(rail: FreshnessRail, qualifiedAt: string): string {
  const policy = Object.values(VERIFICATION_POLICIES).find((candidate) => candidate.rail === rail);
  const timestamp = new Date(qualifiedAt).getTime();
  return new Date(timestamp + (policy?.targetDays ?? 0) * 86_400_000).toISOString();
}
