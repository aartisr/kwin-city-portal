-- Append-only, service-role-only operational evidence for honest freshness.
CREATE TABLE IF NOT EXISTS public.operational_verification_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key text NOT NULL UNIQUE CHECK (char_length(idempotency_key) BETWEEN 8 AND 240),
  suite text NOT NULL CHECK (suite IN ('content_refresh', 'factual_audit', 'execution_status')),
  outcome text NOT NULL CHECK (outcome IN ('passed', 'failed', 'partial', 'skipped', 'timed_out', 'indeterminate', 'cancelled')),
  qualified boolean NOT NULL DEFAULT false CHECK (NOT qualified OR outcome = 'passed'),
  policy_version text NOT NULL CHECK (char_length(policy_version) BETWEEN 3 AND 80),
  started_at timestamptz NOT NULL,
  completed_at timestamptz NOT NULL CHECK (completed_at >= started_at),
  commit_sha text CHECK (commit_sha IS NULL OR commit_sha ~ '^[0-9a-f]{40}$'),
  environment text NOT NULL CHECK (environment IN ('production', 'preview', 'ci', 'development')),
  provider text NOT NULL CHECK (provider IN ('github_actions', 'vercel_cron', 'manual', 'local')),
  provider_run_id text,
  provider_run_url text CHECK (provider_run_url IS NULL OR provider_run_url ~ '^https://'),
  trigger_name text NOT NULL CHECK (trigger_name IN ('schedule', 'workflow_dispatch', 'deployment', 'retry', 'manual', 'request')),
  controls jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(controls) = 'array'),
  manifest jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(manifest) = 'object'),
  manifest_sha256 text NOT NULL CHECK (manifest_sha256 ~ '^[0-9a-f]{64}$'),
  failure_code text,
  failure_summary text CHECK (failure_summary IS NULL OR char_length(failure_summary) <= 1000),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT operational_attempt_clock_skew CHECK (started_at <= created_at + interval '10 minutes')
);

CREATE TABLE IF NOT EXISTS public.operational_freshness_qualifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rail text NOT NULL CHECK (rail IN ('content', 'factual_audit', 'execution_status')),
  attempt_id uuid NOT NULL REFERENCES public.operational_verification_attempts(id) ON DELETE RESTRICT,
  qualified_at timestamptz NOT NULL,
  expires_at timestamptz NOT NULL CHECK (expires_at > qualified_at),
  policy_version text NOT NULL,
  commit_sha text CHECK (commit_sha IS NULL OR commit_sha ~ '^[0-9a-f]{40}$'),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (rail, attempt_id)
);

CREATE TABLE IF NOT EXISTS public.operational_scheduler_heartbeats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key text NOT NULL UNIQUE,
  provider text NOT NULL CHECK (provider IN ('github_actions', 'vercel_cron', 'manual', 'local')),
  schedule_id text NOT NULL,
  invocation_id text NOT NULL,
  outcome text NOT NULL CHECK (outcome IN ('received', 'passed', 'failed', 'partial', 'timed_out', 'indeterminate')),
  duration_ms integer CHECK (duration_ms IS NULL OR duration_ms >= 0),
  failure_code text,
  received_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_operational_attempts_suite_completed
  ON public.operational_verification_attempts (suite, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_operational_qualifications_rail_qualified
  ON public.operational_freshness_qualifications (rail, qualified_at DESC);
CREATE INDEX IF NOT EXISTS idx_operational_heartbeats_received
  ON public.operational_scheduler_heartbeats (received_at DESC);

ALTER TABLE public.operational_verification_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operational_freshness_qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operational_scheduler_heartbeats ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.operational_verification_attempts FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.operational_freshness_qualifications FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.operational_scheduler_heartbeats FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT ON TABLE public.operational_verification_attempts TO service_role;
GRANT SELECT, INSERT ON TABLE public.operational_freshness_qualifications TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE public.operational_scheduler_heartbeats TO service_role;

CREATE OR REPLACE FUNCTION public.prevent_operational_evidence_mutation()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  RAISE EXCEPTION 'Operational evidence is append-only';
END;
$$;

REVOKE ALL ON FUNCTION public.prevent_operational_evidence_mutation() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS prevent_operational_attempt_mutation ON public.operational_verification_attempts;
CREATE TRIGGER prevent_operational_attempt_mutation
BEFORE UPDATE OR DELETE ON public.operational_verification_attempts
FOR EACH ROW EXECUTE FUNCTION public.prevent_operational_evidence_mutation();

DROP TRIGGER IF EXISTS prevent_operational_qualification_mutation ON public.operational_freshness_qualifications;
CREATE TRIGGER prevent_operational_qualification_mutation
BEFORE UPDATE OR DELETE ON public.operational_freshness_qualifications
FOR EACH ROW EXECUTE FUNCTION public.prevent_operational_evidence_mutation();
