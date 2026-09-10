#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const origin = 'https://kwin-city.com';
const routeSource = await readFile(new URL('../src/hooks/useKwinPortal.ts', import.meta.url), 'utf8');
const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const routeMap = routeSource.match(/const tabPaths:[\s\S]*?= \{([\s\S]*?)\n\};/)?.[1];

if (!routeMap) throw new Error('Could not read the portal route map.');

const paths = [...routeMap.matchAll(/^\s*\w+: '([^']+)',/gm)].map((match) => match[1]);
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
const missing = paths.filter((path) => !sitemapUrls.has(`${origin}${path}`));

if (missing.length) {
  throw new Error(`Indexable route(s) missing from public/sitemap.xml: ${missing.join(', ')}`);
}

console.log(`Sitemap coverage verified for ${paths.length} portal routes.`);
