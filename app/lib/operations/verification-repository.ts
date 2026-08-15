import { createHash } from 'node:crypto';
import { getSupabaseAdmin } from '@/lib/server/supabase-client';
import type { DurableRailEvidence, FreshnessRail, VerificationSubmission } from './verification-contracts';
import { evaluateVerification, qualificationExpiry } from './verification-policy';

function canonicalize(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => `${JSON.stringify(key)}:${canonicalize(item)}`).join(',')}}`;
  return JSON.stringify(value);
}

export function manifestHash(value: unknown): string {
  return createHash('sha256').update(canonicalize(value)).digest('hex');
}

function assertSameAttempt(existing: {
  suite: string; policy_version: string; started_at: string; completed_at: string;
  controls: unknown; manifest_sha256: string;
}, submission: VerificationSubmission) {
  const evaluation = evaluateVerification(submission);
  const expectedManifest = { ...(submission.manifest ?? {}), qualificationReasons: evaluation.reasons };
  const same = existing.suite === submission.suite
    && existing.policy_version === submission.policyVersion
    && new Date(existing.started_at).toISOString() === submission.startedAt
    && new Date(existing.completed_at).toISOString() === submission.completedAt
    && canonicalize(existing.controls) === canonicalize(submission.controls)
    && existing.manifest_sha256 === manifestHash(expectedManifest);
  if (!same) throw new Error('idempotency-key-payload-conflict');
}

async function ensureQualification(
  supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>,
  attempt: { id: string; qualified: boolean },
  submission: VerificationSubmission,
) {
  if (!attempt.qualified) return;
  const evaluation = evaluateVerification(submission);
  const existing = await supabase.from('operational_freshness_qualifications').select('id').eq('rail', evaluation.rail).eq('attempt_id', attempt.id).maybeSingle();
  if (existing.error) throw new Error(`operational-qualification-read-failed:${existing.error.message}`);
  if (existing.data) return;
  const qualification = await supabase.from('operational_freshness_qualifications').insert({
    rail: evaluation.rail, attempt_id: attempt.id, qualified_at: submission.completedAt,
    expires_at: qualificationExpiry(evaluation.rail, submission.completedAt), policy_version: submission.policyVersion,
    commit_sha: submission.commitSha ?? null,
  });
  if (qualification.error && qualification.error.code !== '23505') throw new Error(`operational-qualification-write-failed:${qualification.error.message}`);
}

export async function recordVerification(submission: VerificationSubmission) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('operational-evidence-storage-unavailable');
  const existing = await supabase.from('operational_verification_attempts').select('*').eq('idempotency_key', submission.idempotencyKey).maybeSingle();
  if (existing.error) throw new Error(`operational-evidence-read-failed:${existing.error.message}`);
  if (existing.data) {
    assertSameAttempt(existing.data, submission);
    await ensureQualification(supabase, existing.data, submission);
    return { attempt: existing.data, idempotent: true };
  }
  const evaluation = evaluateVerification(submission);
  const manifest = { ...(submission.manifest ?? {}), qualificationReasons: evaluation.reasons };
  const insert = await supabase.from('operational_verification_attempts').insert({
    idempotency_key: submission.idempotencyKey, suite: submission.suite, outcome: submission.outcome,
    qualified: evaluation.qualified, policy_version: submission.policyVersion, started_at: submission.startedAt,
    completed_at: submission.completedAt, commit_sha: submission.commitSha ?? null, environment: submission.environment,
    provider: submission.provider, provider_run_id: submission.providerRunId ?? null, provider_run_url: submission.providerRunUrl ?? null,
    trigger_name: submission.trigger, controls: submission.controls, manifest, manifest_sha256: manifestHash(manifest),
    failure_code: submission.failureCode ?? null, failure_summary: submission.failureSummary ?? null,
  }).select('*').single();
  if (insert.error || !insert.data) {
    if (insert.error?.code === '23505') {
      const raced = await supabase.from('operational_verification_attempts').select('*').eq('idempotency_key', submission.idempotencyKey).maybeSingle();
      if (raced.data) {
        assertSameAttempt(raced.data, submission);
        await ensureQualification(supabase, raced.data, submission);
        return { attempt: raced.data, idempotent: true };
      }
    }
    throw new Error(`operational-evidence-write-failed:${insert.error?.message ?? 'unknown'}`);
  }
  await ensureQualification(supabase, insert.data, submission);
  return { attempt: insert.data, idempotent: false };
}

export async function getLatestDurableRailEvidence(): Promise<Partial<Record<FreshnessRail, DurableRailEvidence>> | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const result = await supabase.from('operational_freshness_qualifications').select('*').order('qualified_at', { ascending: false }).limit(100);
  if (result.error || !result.data) return null;
  const output: Partial<Record<FreshnessRail, DurableRailEvidence>> = {};
  for (const qualification of result.data) {
    const rail = qualification.rail as FreshnessRail;
    if (output[rail]) continue;
    const attempt = await supabase.from('operational_verification_attempts').select('*').eq('id', qualification.attempt_id).maybeSingle();
    if (!attempt.data) continue;
    output[rail] = {
      rail, qualifiedAt: qualification.qualified_at, expiresAt: qualification.expires_at,
      policyVersion: qualification.policy_version, commitSha: qualification.commit_sha,
      provider: attempt.data.provider as DurableRailEvidence['provider'], providerRunUrl: attempt.data.provider_run_url,
    };
  }
  return output;
}

export async function beginSchedulerHeartbeat(input: { idempotencyKey: string; provider: 'github_actions' | 'vercel_cron' | 'manual' | 'local'; scheduleId: string; invocationId: string }) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;
  const result = await supabase.from('operational_scheduler_heartbeats').upsert({
    idempotency_key: input.idempotencyKey, provider: input.provider, schedule_id: input.scheduleId,
    invocation_id: input.invocationId, outcome: 'received', duration_ms: null, failure_code: null, completed_at: null,
  }, { onConflict: 'idempotency_key', ignoreDuplicates: true });
  return !result.error;
}

export async function completeSchedulerHeartbeat(idempotencyKey: string, input: { outcome: 'passed' | 'failed' | 'partial' | 'timed_out' | 'indeterminate'; durationMs: number; failureCode?: string }) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;
  const result = await supabase.from('operational_scheduler_heartbeats').update({
    outcome: input.outcome, duration_ms: input.durationMs, failure_code: input.failureCode ?? null, completed_at: new Date().toISOString(),
  }).eq('idempotency_key', idempotencyKey);
  return !result.error;
}
