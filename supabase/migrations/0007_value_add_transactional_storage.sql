-- Forward-only repair for environments bootstrapped before value-add tables
-- were included in the baseline. These workflows must never depend on a
-- serverless local-file fallback for durable production submissions.
CREATE TABLE IF NOT EXISTS public.value_add_alert_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  persona text NOT NULL,
  topics text[] NOT NULL DEFAULT '{}',
  geofilters text[] NOT NULL DEFAULT '{}',
  cadence text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.value_add_export_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  export_type text NOT NULL,
  filters jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'queued',
  file_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.value_add_opportunity_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  role text NOT NULL,
  requirement text NOT NULL,
  budget_band text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_value_add_alerts_email ON public.value_add_alert_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_value_add_alerts_status ON public.value_add_alert_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_value_add_exports_created_at ON public.value_add_export_jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_value_add_exports_status ON public.value_add_export_jobs(status);
CREATE INDEX IF NOT EXISTS idx_value_add_leads_created_at ON public.value_add_opportunity_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_value_add_leads_role ON public.value_add_opportunity_leads(role);

DROP TRIGGER IF EXISTS set_value_add_alerts_updated_at ON public.value_add_alert_subscriptions;
CREATE TRIGGER set_value_add_alerts_updated_at
BEFORE UPDATE ON public.value_add_alert_subscriptions
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.value_add_alert_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.value_add_export_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.value_add_opportunity_leads ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.value_add_alert_subscriptions FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.value_add_export_jobs FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.value_add_opportunity_leads FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.value_add_alert_subscriptions TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE public.value_add_export_jobs TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE public.value_add_opportunity_leads TO service_role;
