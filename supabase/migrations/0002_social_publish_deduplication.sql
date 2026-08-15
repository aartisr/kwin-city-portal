-- Atomic, durable cross-run publishing deduplication. Service-role access only.
CREATE TABLE IF NOT EXISTS public.social_publish_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL CHECK (platform IN ('instagram', 'facebook', 'linkedin', 'x')),
  fingerprint text NOT NULL,
  source_url text NOT NULL,
  run_id text NOT NULL,
  status text NOT NULL DEFAULT 'reserved' CHECK (status IN ('reserved', 'published', 'failed', 'indeterminate')),
  lease_token uuid NOT NULL,
  lease_expires_at timestamptz NOT NULL,
  attempts integer NOT NULL DEFAULT 1 CHECK (attempts > 0),
  platform_post_id text,
  failure_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz,
  CONSTRAINT social_publish_reservations_platform_fingerprint_key UNIQUE (platform, fingerprint)
);

-- Keep this migration safe to re-run if an earlier draft was applied manually.
ALTER TABLE public.social_publish_reservations
  DROP CONSTRAINT IF EXISTS social_publish_reservations_status_check;
ALTER TABLE public.social_publish_reservations
  ADD CONSTRAINT social_publish_reservations_status_check
  CHECK (status IN ('reserved', 'published', 'failed', 'indeterminate'));

CREATE INDEX IF NOT EXISTS idx_social_publish_reservations_source_url
  ON public.social_publish_reservations (platform, source_url);

DROP TRIGGER IF EXISTS set_social_publish_reservations_updated_at ON public.social_publish_reservations;
CREATE TRIGGER set_social_publish_reservations_updated_at BEFORE UPDATE ON public.social_publish_reservations
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.acquire_social_publish_reservation(
  p_platform text,
  p_fingerprint text,
  p_source_url text,
  p_run_id text,
  p_lease_token uuid
)
RETURNS TABLE(acquired boolean, reservation_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  INSERT INTO public.social_publish_reservations (
    platform, fingerprint, source_url, run_id, lease_token, lease_expires_at
  ) VALUES (
    p_platform, p_fingerprint, p_source_url, p_run_id, p_lease_token, now() + interval '15 minutes'
  )
  -- Fail closed. A timed-out provider request may still have created the post,
  -- so reservations are never reclaimed automatically. Manual replay must use
  -- a new, explicitly reviewed fingerprint.
  ON CONFLICT (platform, fingerprint) DO NOTHING
  RETURNING true, public.social_publish_reservations.id;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::uuid;
  END IF;
END;
$$;

ALTER TABLE public.social_publish_reservations ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.social_publish_reservations FROM anon, authenticated;
GRANT ALL ON TABLE public.social_publish_reservations TO service_role;
REVOKE ALL ON FUNCTION public.acquire_social_publish_reservation(text, text, text, text, uuid)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.acquire_social_publish_reservation(text, text, text, text, uuid)
  TO service_role;
