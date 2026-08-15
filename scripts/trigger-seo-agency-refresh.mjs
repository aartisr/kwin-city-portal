const DEFAULT_TIMEOUT_MS = 120_000;

function configuredValue(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} must be configured.`);
  }
  return value;
}

export async function triggerSeoAgencyRefresh({
  refreshUrl = configuredValue('SITE_REFRESH_URL'),
  cronSecret = configuredValue('CRON_SECRET'),
  fetchImpl = fetch,
  timeoutMs = DEFAULT_TIMEOUT_MS,
} = {}) {
  const response = await fetchImpl(refreshUrl, {
    headers: { authorization: `Bearer ${cronSecret}` },
    signal: AbortSignal.timeout(timeoutMs),
  });

  const bodyText = await response.text();
  let body;
  try {
    body = JSON.parse(bodyText);
  } catch {
    throw new Error(`SEO agency refresh returned invalid JSON: HTTP ${response.status}${bodyText ? ` — ${bodyText}` : ''}`);
  }

  if (!response.ok || body?.success !== true) {
    throw new Error(`SEO agency refresh failed: HTTP ${response.status}${body?.error ? ` — ${body.error}` : ''}`);
  }

  if (body.storageBackend !== 'supabase') {
    throw new Error(
      `SEO agency refresh did not persist to Supabase (storageBackend: ${body.storageBackend ?? 'missing'})` +
        `${body.warning ? ` — ${body.warning}` : ''}`,
    );
  }

  console.log(
    `SEO agency refresh persisted to Supabase: runDate=${body.runDate}, generatedAt=${body.generatedAt}, durationMs=${body.durationMs}.`,
  );
  return body;
}

if (process.argv[1]?.endsWith('trigger-seo-agency-refresh.mjs')) {
  triggerSeoAgencyRefresh().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
