-- PostgreSQL exposes RETURNS TABLE names as PL/pgSQL variables. Avoid an
-- ambiguous reference between the output variable `attempt_id` and the
-- qualification table column by using targetless conflict handling.
CREATE OR REPLACE FUNCTION public.record_operational_verification(
  p_idempotency_key text,
  p_request_sha256 text,
  p_suite text,
  p_outcome text,
  p_qualified boolean,
  p_policy_version text,
  p_started_at timestamptz,
  p_completed_at timestamptz,
  p_commit_sha text,
  p_environment text,
  p_provider text,
  p_provider_run_id text,
  p_provider_run_url text,
  p_trigger_name text,
  p_controls jsonb,
  p_manifest jsonb,
  p_manifest_sha256 text,
  p_failure_code text,
  p_failure_summary text,
  p_rail text,
  p_expires_at timestamptz
)
RETURNS TABLE(attempt_id uuid, inserted boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_attempt_id uuid;
  v_existing_fingerprint text;
  v_inserted boolean := false;
BEGIN
  INSERT INTO public.operational_verification_attempts (
    idempotency_key, request_sha256, suite, outcome, qualified, policy_version,
    started_at, completed_at, commit_sha, environment, provider, provider_run_id,
    provider_run_url, trigger_name, controls, manifest, manifest_sha256,
    failure_code, failure_summary
  ) VALUES (
    p_idempotency_key, p_request_sha256, p_suite, p_outcome, p_qualified,
    p_policy_version, p_started_at, p_completed_at, p_commit_sha, p_environment,
    p_provider, p_provider_run_id, p_provider_run_url, p_trigger_name, p_controls,
    p_manifest, p_manifest_sha256, p_failure_code, p_failure_summary
  )
  ON CONFLICT (idempotency_key) DO NOTHING
  RETURNING id INTO v_attempt_id;

  IF v_attempt_id IS NOT NULL THEN
    v_inserted := true;
  ELSE
    SELECT evidence_attempt.id,
           COALESCE(evidence_attempt.request_sha256, evidence_attempt.manifest_sha256)
      INTO v_attempt_id, v_existing_fingerprint
    FROM public.operational_verification_attempts AS evidence_attempt
    WHERE evidence_attempt.idempotency_key = p_idempotency_key;

    IF v_existing_fingerprint IS DISTINCT FROM p_request_sha256 THEN
      RAISE EXCEPTION USING
        ERRCODE = 'P0001',
        MESSAGE = 'idempotency-key-payload-conflict';
    END IF;
  END IF;

  IF p_qualified THEN
    INSERT INTO public.operational_freshness_qualifications (
      rail, attempt_id, qualified_at, expires_at, policy_version, commit_sha
    ) VALUES (
      p_rail, v_attempt_id, p_completed_at, p_expires_at, p_policy_version, p_commit_sha
    )
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN QUERY SELECT v_attempt_id, v_inserted;
END;
$$;

REVOKE ALL ON FUNCTION public.record_operational_verification(
  text, text, text, text, boolean, text, timestamptz, timestamptz, text, text,
  text, text, text, text, jsonb, jsonb, text, text, text, text, timestamptz
) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_operational_verification(
  text, text, text, text, boolean, text, timestamptz, timestamptz, text, text,
  text, text, text, text, jsonb, jsonb, text, text, text, text, timestamptz
) TO service_role;
