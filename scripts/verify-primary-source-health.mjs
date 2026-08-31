#!/usr/bin/env node

const TIMEOUT_MS = 12_000;
// This is an observability gate, not a publication gate: government and public
// institutional domains regularly have transient DNS, TLS, and bot-protection
// failures outside this repository's control. Require one independently
// reachable endpoint to detect a broken runner/network, and surface every
// individual outage as a GitHub Actions warning for follow-up.
const MIN_HEALTHY_SOURCES = 1;
const PRIMARY_SOURCES = [
  // KIADB remains the authoritative source for KWIN-specific records. Its public
  // endpoint currently has an incomplete TLS certificate chain, so it is
  // monitored directly but cannot safely be a single point of CI failure.
  { id: 'kiadb', url: 'https://kiadb.karnataka.gov.in/', required: false },
  { id: 'bmrda', url: 'https://bmrda.karnataka.gov.in/', required: false },
  { id: 'bial', url: 'https://www.bengaluruairport.com/', required: false },
  { id: 'ksndmc', url: 'https://ksndmc.karnataka.gov.in/', required: false },
];

async function probe(url) {
  const signal = AbortSignal.timeout(TIMEOUT_MS);

  try {
    const headResponse = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal,
      headers: { 'user-agent': 'kwin-always-current-health-check/1.0' },
    });

    if (headResponse.ok) {
      return headResponse;
    }
  } catch (error) {
    // Fallback to GET below.
    const headError = error instanceof Error ? error : new Error(String(error));

    try {
      return await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal,
        headers: { 'user-agent': 'kwin-always-current-health-check/1.0', range: 'bytes=0-1024' },
      });
    } catch (getError) {
      const getMessage = getError instanceof Error ? getError.message : String(getError);
      const getCause = getError instanceof Error && getError.cause instanceof Error
        ? ` (${getError.cause.message})`
        : '';
      throw new Error(`HEAD failed: ${headError.message}; GET failed: ${getMessage}${getCause}`);
    }
  }

  return fetch(url, {
    method: 'GET',
    redirect: 'follow',
    signal,
    headers: { 'user-agent': 'kwin-always-current-health-check/1.0', range: 'bytes=0-1024' },
  });
}

async function main() {
  const checks = [];

  for (const source of PRIMARY_SOURCES) {
    try {
      const response = await probe(source.url);
      checks.push({
        id: source.id,
        url: source.url,
        required: source.required,
        healthy: response.ok,
        status: response.status,
        finalUrl: response.url,
        lastModified: response.headers.get('last-modified'),
        etag: response.headers.get('etag'),
      });
    } catch (error) {
      checks.push({
        id: source.id,
        url: source.url,
        required: source.required,
        healthy: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const requiredFailures = checks.filter((check) => check.required && !check.healthy);
  const healthyCount = checks.filter((check) => check.healthy).length;

  if (requiredFailures.length > 0) {
    throw new Error(`Required primary source unavailable: ${requiredFailures.map((item) => item.id).join(', ')}`);
  }

  if (healthyCount < MIN_HEALTHY_SOURCES) {
    throw new Error(`Primary source health degraded: only ${healthyCount}/${PRIMARY_SOURCES.length} sources responded successfully.`);
  }

  const degradedChecks = checks.filter((check) => !check.healthy);
  if (degradedChecks.length > 0) {
    console.warn(`::warning::Primary-source endpoint(s) need attention: ${degradedChecks.map((item) => item.id).join(', ')}. Direct source links remain unchanged.`);
  }

  console.log(JSON.stringify({
    status: degradedChecks.length > 0 ? 'degraded-but-operational' : 'healthy',
    checkedAt: new Date().toISOString(),
    healthyCount,
    total: PRIMARY_SOURCES.length,
    minimumHealthySources: MIN_HEALTHY_SOURCES,
    checks,
  }, null, 2));
}

main();
