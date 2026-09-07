import { getSupabaseAdmin } from '@/lib/server/supabase-client';
import type { DurableRailEvidence, FreshnessRail, VerificationSubmission } from './verification-contracts';
import { VERIFICATION_POLICIES } from './verification-policy';
import { buildVerificationRecord } from './verification-record';

export async function recordVerification(submission: VerificationSubmission) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('operational-evidence-storage-unavailable');
  const record = buildVerificationRecord(submission);
  const transaction = await supabase.rpc('record_operational_verification', {
    p_idempotency_key: submission.idempotencyKey, p_request_sha256: record.requestSha256,
    p_suite: submission.suite, p_outcome: submission.outcome, p_qualified: record.evaluation.qualified,
    p_policy_version: submission.policyVersion, p_started_at: submission.startedAt, p_completed_at: submission.completedAt,
    p_commit_sha: submission.commitSha ?? null, p_environment: submission.environment, p_provider: submission.provider,
    p_provider_run_id: submission.providerRunId ?? null, p_provider_run_url: submission.providerRunUrl ?? null,
    p_trigger_name: submission.trigger, p_controls: submission.controls, p_manifest: record.manifest,
    p_manifest_sha256: record.manifestSha256, p_failure_code: submission.failureCode ?? null,
    p_failure_summary: submission.failureSummary ?? null, p_rail: record.evaluation.rail,
    p_expires_at: record.expiresAt,
  });
  if (transaction.error || !transaction.data?.[0]) {
    const message = transaction.error?.message ?? 'unknown';
    if (message.includes('idempotency-key-payload-conflict')) throw new Error('idempotency-key-payload-conflict');
    throw new Error(`operational-evidence-transaction-failed:${message}`);
  }
  const receipt = transaction.data[0];
  const attempt = await supabase.from('operational_verification_attempts').select('*').eq('id', receipt.attempt_id).single();
  if (attempt.error || !attempt.data) throw new Error(`operational-evidence-read-after-write-failed:${attempt.error?.message ?? 'unknown'}`);
  return { attempt: attempt.data, idempotent: !receipt.inserted };
}

export async function getLatestDurableRailEvidence(): Promise<Partial<Record<FreshnessRail, DurableRailEvidence>> | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const result = await supabase.from('operational_freshness_qualifications').select('*').order('qualified_at', { ascending: false }).limit(100);
  if (result.error || !result.data) return null;
  const attemptIds = [...new Set(result.data.map((qualification) => qualification.attempt_id))];
  const attemptsResult = attemptIds.length
    ? await supabase.from('operational_verification_attempts').select('*').in('id', attemptIds)
    : { data: [], error: null };
  if (attemptsResult.error || !attemptsResult.data) return null;
  const attempts = new Map(attemptsResult.data.map((attempt) => [attempt.id, attempt]));
  const output: Partial<Record<FreshnessRail, DurableRailEvidence>> = {};
  for (const qualification of result.data) {
    const rail = qualification.rail as FreshnessRail;
    if (output[rail]) continue;
    const currentPolicy = Object.values(VERIFICATION_POLICIES).find((policy) => policy.rail === rail);
    if (!currentPolicy || qualification.policy_version !== currentPolicy.version) continue;
    const attempt = attempts.get(qualification.attempt_id);
    if (!attempt || !attempt.qualified) continue;
    output[rail] = {
      rail, qualifiedAt: qualification.qualified_at, expiresAt: qualification.expires_at,
      policyVersion: qualification.policy_version, commitSha: qualification.commit_sha,
      provider: attempt.provider as DurableRailEvidence['provider'], providerRunUrl: attempt.provider_run_url,
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
