import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_URL = process.env.SITE_URL ?? 'https://kwin-city.com';
const SITE_ORIGIN = new URL(SITE_URL).origin;
const HOST = new URL(SITE_ORIGIN).host;
const SITEMAP_URL = process.env.INDEXNOW_SITEMAP_URL ?? `${SITE_ORIGIN}/sitemap.xml`;
const ENDPOINT = process.env.INDEXNOW_ENDPOINT ?? 'https://api.indexnow.org/indexnow';
const KEY = process.env.INDEXNOW_KEY ?? '57AA00BD-4FE7-48FB-932C-A0EBDB93354B';
const KEY_LOCATION = process.env.INDEXNOW_KEY_LOCATION ?? `${SITE_ORIGIN}/${KEY}.txt`;
const DRY_RUN = process.env.INDEXNOW_DRY_RUN === '1';

function parseSitemapUrls(xml) {
  return [
    ...new Set(
      [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)]
        .map((match) => match[1].trim())
        .filter((url) => new URL(url).host === HOST),
    ),
  ];
}

function verifyLocalKeyFile() {
  const keyFile = resolve(process.cwd(), 'public', `${KEY}.txt`);
  if (!existsSync(keyFile)) {
    throw new Error(`Missing IndexNow verification file: public/${KEY}.txt`);
  }

  if (readFileSync(keyFile, 'utf8').trim() !== KEY) {
    throw new Error(`public/${KEY}.txt must contain exactly the IndexNow key.`);
  }
}

async function getSitemapUrls() {
  const response = await fetch(SITEMAP_URL, {
    headers: { accept: 'application/xml,text/xml;q=0.9,*/*;q=0.1' },
  });

  if (!response.ok) {
    throw new Error(`Could not fetch ${SITEMAP_URL}: HTTP ${response.status}`);
  }

  const urls = parseSitemapUrls(await response.text());
  if (urls.length === 0) {
    throw new Error(`No ${HOST} URLs were found in ${SITEMAP_URL}.`);
  }

  return urls;
}

async function run() {
  verifyLocalKeyFile();
  const urlList = await getSitemapUrls();
  const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };

  console.log(`Prepared ${urlList.length} URL(s) from ${SITEMAP_URL}.`);

  if (DRY_RUN) {
    console.log('DRY RUN: IndexNow request was not sent.');
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const responseBody = (await response.text()).trim();

  if (response.status !== 200) {
    const detail = responseBody ? ` — ${responseBody}` : '';
    throw new Error(`IndexNow submission failed: HTTP ${response.status}${detail}`);
  }

  console.log(`IndexNow submission succeeded: HTTP 200 accepted ${urlList.length} URL(s).`);
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
