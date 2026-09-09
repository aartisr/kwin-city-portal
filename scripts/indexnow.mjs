#!/usr/bin/env node
/**
 * Submit changed public URLs to IndexNow.
 *
 * The protocol verifies ownership per host. This repository can verify
 * kwin-city.com and its GitHub Pages project path, but not github.com/wiki.
 * Run without --submit to inspect the payloads safely.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const submit = process.argv.includes('--submit');
const writeKeyFiles = process.argv.includes('--write-key-files');
const endpoint = 'https://api.indexnow.org/indexnow';
const keyPattern = /^[A-Za-z0-9-]{8,128}$/;

function option(name, fallback) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

function validateKey(key, label) {
  if (!keyPattern.test(key ?? '')) throw new Error(`${label} must be 8–128 characters using letters, numbers, or dashes.`);
}

async function mainUrls(origin) {
  const sitemap = await readFile(join(root, 'public', 'sitemap.xml'), 'utf8');
  return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replace('https://kwin-city.com', origin));
}

async function pageUrls(origin) {
  const files = await readdir(join(root, 'docs'));
  return files
    .filter((file) => file.endsWith('.html'))
    .map((file) => file === 'index.html' ? `${origin}/` : `${origin}/${file}`);
}

async function ensureKeyFile(directory, key) {
  const file = join(root, directory, `${key}.txt`);
  await writeFile(file, `${key}\n`, 'utf8');
  return file;
}

async function submitHost({ label, origin, urls, key, keyPath }) {
  if (!key) {
    console.log(`SKIP ${label}: no key configured.`);
    return;
  }
  validateKey(key, `${label} key`);
  const host = new URL(origin).host;
  const keyLocation = `${origin}/${keyPath}`;
  const payload = { host, key, keyLocation, urlList: urls };

  if (!submit) {
    console.log(`DRY RUN ${label}: ${urls.length} URLs\n${JSON.stringify(payload, null, 2)}\n`);
    return;
  }

  for (let index = 0; index < urls.length; index += 10_000) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ...payload, urlList: urls.slice(index, index + 10_000) }),
    });
    const body = await response.text();
    if (!response.ok && response.status !== 202) throw new Error(`${label} submission failed (${response.status}): ${body}`);
    console.log(`${label}: accepted ${Math.min(10_000, urls.length - index)} URLs (${response.status}).`);
  }
}

const mainOrigin = option('--main-origin', 'https://kwin-city.com').replace(/\/$/, '');
const pagesOrigin = option('--pages-origin', 'https://aartisr.github.io/kwin-city-portal').replace(/\/$/, '');
const mainKey = process.env.INDEXNOW_MAIN_KEY;
const pagesKey = process.env.INDEXNOW_PAGES_KEY;

if (writeKeyFiles) {
  if (mainKey) { validateKey(mainKey, 'INDEXNOW_MAIN_KEY'); console.log(`Wrote ${await ensureKeyFile('public', mainKey)}`); }
  if (pagesKey) { validateKey(pagesKey, 'INDEXNOW_PAGES_KEY'); console.log(`Wrote ${await ensureKeyFile('docs', pagesKey)}`); }
}

await submitHost({ label: 'Main portal', origin: mainOrigin, urls: await mainUrls(mainOrigin), key: mainKey, keyPath: `${mainKey}.txt` });
await submitHost({ label: 'GitHub Pages', origin: pagesOrigin, urls: await pageUrls(pagesOrigin), key: pagesKey, keyPath: `${pagesKey}.txt` });
console.log('SKIP GitHub Wiki: IndexNow requires a verification key hosted on github.com; a repository Wiki cannot host that key. GitHub will discover Wiki pages through normal crawling and internal links.');
