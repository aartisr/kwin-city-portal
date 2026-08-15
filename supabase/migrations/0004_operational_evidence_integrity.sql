-- Defense in depth for operational evidence. Qualification rows must agree
-- with their immutable attempt and the policy window they claim to represent.
ALTER TABLE public.operational_verification_attempts
  DROP CONSTRAINT IF EXISTS operational_attempt_completed_clock_skew;
ALTER TABLE public.operational_verification_attempts
  ADD CONSTRAINT operational_attempt_completed_clock_skew
  CHECK (completed_at <= created_at + interval '10 minutes');

ALTER TABLE public.operational_verification_attempts
  DROP CONSTRAINT IF EXISTS operational_attempt_max_duration;
ALTER TABLE public.operational_verification_attempts
  ADD CONSTRAINT operational_attempt_max_duration
  CHECK (completed_at - started_at <= interval '24 hours');

CREATE OR REPLACE FUNCTION public.validate_operational_qualification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  attempt public.operational_verification_attempts%ROWTYPE;
  expected_rail text;
  expected_expiry timestamptz;
BEGIN
  SELECT * INTO attempt
  FROM public.operational_verification_attempts
  WHERE id = NEW.attempt_id;

  IF NOT FOUND OR NOT attempt.qualified OR attempt.outcome <> 'passed' THEN
    RAISE EXCEPTION 'Qualification requires a qualified passed attempt';
  END IF;

  expected_rail := CASE attempt.suite
    WHEN 'content_refresh' THEN 'content'
    WHEN 'factual_audit' THEN 'factual_audit'
    WHEN 'execution_status' THEN 'execution_status'
  END;
  expected_expiry := NEW.qualified_at + CASE NEW.rail
    WHEN 'content' THEN interval '3 days'
    ELSE interval '14 days'
  END;

  IF NEW.rail <> expected_rail
     OR NEW.qualified_at <> attempt.completed_at
     OR NEW.policy_version <> attempt.policy_version
     OR NEW.commit_sha IS DISTINCT FROM attempt.commit_sha
     OR NEW.expires_at <> expected_expiry THEN
    RAISE EXCEPTION 'Qualification does not match its immutable attempt or policy window';
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.validate_operational_qualification() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.validate_operational_qualification() TO service_role;

DROP TRIGGER IF EXISTS validate_operational_qualification_insert
  ON public.operational_freshness_qualifications;
CREATE TRIGGER validate_operational_qualification_insert
BEFORE INSERT ON public.operational_freshness_qualifications
FOR EACH ROW EXECUTE FUNCTION public.validate_operational_qualification();
