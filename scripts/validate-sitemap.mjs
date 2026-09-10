#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const origin = 'https://kwin-city.com';
const routeSource = await readFile(new URL('../src/hooks/useKwinPortal.ts', import.meta.url), 'utf8');
const metadataSource = await readFile(new URL('../src/components/DiscoverabilityLayer.tsx', import.meta.url), 'utf8');
const appSource = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const routeComponentFiles = ['Hero.tsx', 'ContactView.tsx', 'DiscourseLab.tsx'];
const routeComponentSources = await Promise.all(
  routeComponentFiles.map((file) => readFile(new URL(`../src/components/${file}`, import.meta.url), 'utf8')),
);
const routeMap = routeSource.match(/const tabPaths:[\s\S]*?= \{([\s\S]*?)\n\};/)?.[1];
const titleMap = metadataSource.match(/const tabTitles: Record<string, string> = \{([\s\S]*?)\n    \};/)?.[1];

if (!routeMap || !titleMap) throw new Error('Could not read the portal route or title map.');

const routes = [...routeMap.matchAll(/^\s*(\w+): '([^']+)',/gm)].map((match) => ({ tab: match[1], path: match[2] }));
const titles = new Map([...titleMap.matchAll(/^\s*(\w+): '([^']+)',?$/gm)].map((match) => [match[1], match[2]]));
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
const missing = routes.filter(({ path }) => !sitemapUrls.has(`${origin}${path}`)).map(({ path }) => path);
const invalidTitles = routes
  .map(({ tab }) => ({ tab, title: titles.get(tab) }))
  .filter(({ title }) => !title || title.length >= 70)
  .map(({ tab, title }) => `${tab} (${title?.length ?? 'missing'})`);
const staticTitle = html.match(/<title>([^<]+)<\/title>/)?.[1];
const appHeadingCount = (appSource.match(/<h1\b/g) ?? []).length;
const componentHeadingCount = routeComponentSources.reduce((count, source) => count + (source.match(/<h1\b/g) ?? []).length, 0);

if (missing.length) {
  throw new Error(`Indexable route(s) missing from public/sitemap.xml: ${missing.join(', ')}`);
}
if (invalidTitles.length || !staticTitle || staticTitle.length >= 70) {
  throw new Error(`Title coverage error: routes ${invalidTitles.join(', ') || 'none'}; static title (${staticTitle?.length ?? 'missing'}).`);
}
if (appHeadingCount !== 1 || componentHeadingCount !== 0) {
  throw new Error(`Heading coverage error: app shell has ${appHeadingCount} H1(s); route components have ${componentHeadingCount}.`);
}

console.log(`Sitemap, title, and H1 coverage verified for ${routes.length} portal routes.`);
