#!/usr/bin/env node

const TIMEOUT_MS = 12_000;
const PRIMARY_SOURCES = [
  { id: 'kiadb', url: 'https://kiadb.karnataka.gov.in/', required: true },
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
  } catch {
    // Fallback to GET below.
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

  if (healthyCount < 3) {
    throw new Error(`Primary source health degraded: only ${healthyCount}/${PRIMARY_SOURCES.length} sources responded successfully.`);
  }

  console.log(JSON.stringify({
    status: 'healthy',
    checkedAt: new Date().toISOString(),
    healthyCount,
    total: PRIMARY_SOURCES.length,
    checks,
  }, null, 2));
}

main();
