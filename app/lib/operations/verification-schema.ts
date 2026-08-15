import { VERIFICATION_OUTCOMES, VERIFICATION_SUITES, type VerificationSubmission } from './verification-contracts';

const SHA = /^[0-9a-f]{40}$/;
const ID = /^[a-z0-9][a-z0-9._:/-]{1,119}$/i;
const MAX_ATTEMPT_DURATION_MS = 24 * 60 * 60_000;

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function optionalHttpsUrl(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value !== 'string' || value.length > 2_048) throw new Error('invalid-provider-url');
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error();
    return url.toString();
  } catch { throw new Error('invalid-provider-url'); }
}

function scalarMetrics(value: unknown): VerificationSubmission['controls'][number]['metrics'] | undefined {
  if (value == null) return undefined;
  if (!isObject(value) || Object.keys(value).length > 50) throw new Error('invalid-control-metrics');
  const output: NonNullable<VerificationSubmission['controls'][number]['metrics']> = {};
  for (const [key, metric] of Object.entries(value)) {
    if (!ID.test(key) || !['string', 'number', 'boolean'].includes(typeof metric) && metric !== null) throw new Error('invalid-control-metrics');
    if (typeof metric === 'number' && !Number.isFinite(metric)) throw new Error('invalid-control-metrics');
    output[key] = typeof metric === 'string' ? metric.slice(0, 500) : metric as number | boolean | null;
  }
  return output;
}

export function parseVerificationSubmission(value: unknown): VerificationSubmission {
  if (!isObject(value)) throw new Error('invalid-body');
  if (!VERIFICATION_SUITES.includes(value.suite as never)) throw new Error('invalid-suite');
  if (!VERIFICATION_OUTCOMES.includes(value.outcome as never)) throw new Error('invalid-outcome');
  if (typeof value.idempotencyKey !== 'string' || !ID.test(value.idempotencyKey)) throw new Error('invalid-idempotency-key');
  if (typeof value.policyVersion !== 'string' || !ID.test(value.policyVersion)) throw new Error('invalid-policy-version');
  const startedAt = new Date(String(value.startedAt));
  const completedAt = new Date(String(value.completedAt));
  if (Number.isNaN(startedAt.getTime()) || Number.isNaN(completedAt.getTime()) || completedAt < startedAt) throw new Error('invalid-timestamps');
  if (startedAt.getTime() > Date.now() + 10 * 60_000) throw new Error('future-timestamp');
  if (completedAt.getTime() > Date.now() + 10 * 60_000) throw new Error('future-timestamp');
  if (completedAt.getTime() - startedAt.getTime() > MAX_ATTEMPT_DURATION_MS) throw new Error('attempt-duration-too-long');
  if (value.commitSha != null && (typeof value.commitSha !== 'string' || !SHA.test(value.commitSha))) throw new Error('invalid-commit-sha');
  const providerRunUrl = optionalHttpsUrl(value.providerRunUrl);
  if (!['production', 'preview', 'ci', 'development'].includes(String(value.environment))) throw new Error('invalid-environment');
  if (!['github_actions', 'vercel_cron', 'manual', 'local'].includes(String(value.provider))) throw new Error('invalid-provider');
  if (!['schedule', 'workflow_dispatch', 'deployment', 'retry', 'manual', 'request'].includes(String(value.trigger))) throw new Error('invalid-trigger');
  if (!Array.isArray(value.controls) || value.controls.length === 0 || value.controls.length > 100) throw new Error('invalid-controls');
  const controlIds = new Set<string>();
  const controls = value.controls.map((control) => {
    if (!isObject(control) || typeof control.id !== 'string' || !ID.test(control.id)) throw new Error('invalid-control');
    if (controlIds.has(control.id)) throw new Error('duplicate-control');
    controlIds.add(control.id);
    if (typeof control.required !== 'boolean' || !VERIFICATION_OUTCOMES.includes(control.outcome as never) || control.outcome === 'partial') throw new Error('invalid-control-outcome');
    return {
      id: control.id, required: control.required, outcome: control.outcome as VerificationSubmission['controls'][number]['outcome'],
      summary: typeof control.summary === 'string' ? control.summary.slice(0, 500) : undefined,
      durationMs: typeof control.durationMs === 'number' && control.durationMs >= 0 ? Math.round(control.durationMs) : undefined,
      metrics: scalarMetrics(control.metrics),
    };
  });
  return {
    idempotencyKey: value.idempotencyKey,
    suite: value.suite as VerificationSubmission['suite'], outcome: value.outcome as VerificationSubmission['outcome'],
    policyVersion: value.policyVersion, startedAt: startedAt.toISOString(), completedAt: completedAt.toISOString(),
    commitSha: value.commitSha as string | undefined,
    environment: value.environment as VerificationSubmission['environment'],
    provider: value.provider as VerificationSubmission['provider'],
    providerRunId: typeof value.providerRunId === 'string' ? value.providerRunId.slice(0, 200) : undefined,
    providerRunUrl,
    trigger: value.trigger as VerificationSubmission['trigger'],
    controls, manifest: isObject(value.manifest) ? value.manifest : {},
    failureCode: typeof value.failureCode === 'string' ? value.failureCode.slice(0, 120) : undefined,
    failureSummary: typeof value.failureSummary === 'string' ? value.failureSummary.slice(0, 1000) : undefined,
  };
}
