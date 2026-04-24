import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_URL = process.env.SITE_URL ?? 'https://kwin-city.com';
const SITE_ORIGIN = new URL(SITE_URL).origin;
const SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`;
const FEED_URL = `${SITE_ORIGIN}/feed.xml`;
const INDEXNOW_ENDPOINT = process.env.INDEXNOW_ENDPOINT ?? 'https://api.indexnow.org/indexnow';
const DEFAULT_INDEXNOW_KEY = '57AA00BD-4FE7-48FB-932C-A0EBDB93354B';
const DRY_RUN = process.env.INDEXNOW_DRY_RUN === '1' || process.env.DRY_RUN === '1';

function normalizeHost(value) {
  if (!value) {
    return new URL(SITE_ORIGIN).host;
  }

  return value.includes('://') ? new URL(value).host : value.replace(/^\/+|\/+$/g, '');
}

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  return new URL(trimmed, SITE_ORIGIN).toString().replace(/\/$/, '');
}

function unique(values) {
  return [...new Set(values)];
}

function getIndexNowKey() {
  const key = process.env.INDEXNOW_KEY ?? DEFAULT_INDEXNOW_KEY;
  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
    throw new Error('INDEXNOW_KEY must be 8-128 characters and contain only letters, numbers, or hyphens.');
  }

  return key;
}

function verifyLocalIndexNowKeyFile(key) {
  const keyFile = resolve(process.cwd(), 'public', `${key}.txt`);
  if (!existsSync(keyFile)) {
    console.warn(`WARN: IndexNow key file not found locally at public/${key}.txt`);
    return;
  }

  const contents = readFileSync(keyFile, 'utf8').trim();
  if (contents !== key) {
    throw new Error(`IndexNow key file public/${key}.txt must contain exactly "${key}".`);
  }
}

function parseConfiguredUrls() {
  const raw = process.env.INDEXNOW_URLS;
  if (!raw) {
    return [];
  }

  return unique(
    raw
      .split(/[\n,]/)
      .map((value) => normalizeUrl(value))
      .filter(Boolean),
  );
}

function parseSitemapUrls(xml) {
  return unique(
    [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)]
      .map((match) => normalizeUrl(match[1]))
      .filter(Boolean),
  );
}

async function getCanonicalIndexNowUrls() {
  const configuredUrls = parseConfiguredUrls();
  if (configuredUrls.length > 0) {
    return configuredUrls;
  }

  try {
    const response = await fetch(SITEMAP_URL, {
      headers: { accept: 'application/xml,text/xml;q=0.9,*/*;q=0.1' },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return parseSitemapUrls(await response.text());
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`WARN: Could not read sitemap for IndexNow URL discovery (${reason}); using priority fallback URLs.`);
    return [`${SITE_ORIGIN}`, `${SITE_ORIGIN}/updates`, `${SITE_ORIGIN}/evidence`, `${SITE_ORIGIN}/sources`, `${SITE_ORIGIN}/trust`];
  }
}

function buildDiscoveryTargets() {
  return [
    {
      name: 'Bing sitemap ping',
      url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    },
    {
      name: 'Bing feed ping',
      url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(FEED_URL)}`,
    },
  ];
}

function buildIndexNowTargets(urls) {
  const key = getIndexNowKey();
  verifyLocalIndexNowKeyFile(key);

  const host = normalizeHost(process.env.INDEXNOW_HOST ?? SITE_ORIGIN);
  const keyLocation = process.env.INDEXNOW_KEY_LOCATION ?? `https://${host}/${key}.txt`;
  const allowedOrigin = `https://${host}`;
  const canonicalUrls = unique(urls).filter((url) => {
    const urlHost = new URL(url).host;
    if (urlHost !== host) {
      console.warn(`WARN: Skipping IndexNow URL with non-matching host: ${url}`);
      return false;
    }

    return true;
  });

  return canonicalUrls.map((url) => {
    const params = new URLSearchParams({ url, key, keyLocation });
    return {
      name: `IndexNow submit ${url.replace(allowedOrigin, '') || '/'}`,
      url: `${INDEXNOW_ENDPOINT}?${params.toString()}`,
    };
  });
}

async function ping(target) {
  if (DRY_RUN) {
    console.log(`DRY: ${target.name} -> ${target.url}`);
    return true;
  }

  try {
    const response = await fetch(target.url, {
      method: target.method ?? 'GET',
      headers: target.body ? { 'content-type': 'application/json' } : undefined,
      body: target.body ? JSON.stringify(target.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    console.log(`OK: ${target.name}`);
    return true;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`WARN: ${target.name} failed (${reason})`);
    return false;
  }
}

async function run() {
  const canonicalUrls = await getCanonicalIndexNowUrls();
  const targets = [...buildDiscoveryTargets(), ...buildIndexNowTargets(canonicalUrls)];
  console.log(`Notifying ${targets.length} endpoint(s) for ${SITE_ORIGIN}`);
  console.log(`IndexNow streaming ${canonicalUrls.length} canonical URL(s) from ${SITEMAP_URL}`);

  const results = [];
  for (const target of targets) {
    results.push(await ping(target));
  }
  const successCount = results.filter(Boolean).length;

  console.log(`Completed notifications: ${successCount}/${targets.length} successful`);

  // Do not fail publish pipelines on third-party ping endpoint behavior.
  // Providers can return 410/404 when ping APIs are deprecated or throttled.
  if (successCount === 0) {
    console.warn('No ping endpoint succeeded. This is non-blocking; discovery still works via sitemap/feed crawling.');
  }
}

run();
