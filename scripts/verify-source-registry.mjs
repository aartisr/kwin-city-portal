#!/usr/bin/env node

import { readFileSync } from 'node:fs';

const registryPath = 'public/feeds/kwin-city-news-feeds.opml';
const xml = readFileSync(registryPath, 'utf8');
const allowedHosts = new Set(['news.google.com', 'rbi.org.in', 'www.thehindu.com', 'timesofindia.indiatimes.com']);
const urls = [...xml.matchAll(/xmlUrl="([^"]+)"/g)].map((match) => match[1].replace(/&amp;/g, '&'));

if (!urls.length) throw new Error('The source registry contains no feeds.');

const seen = new Set();
const unknownHosts = [];
const duplicateUrls = [];
const inventory = { directInstitutional: 0, directPublisher: 0, discovery: 0 };

for (const value of urls) {
  const url = new URL(value);
  if (url.protocol !== 'https:') throw new Error(`Non-HTTPS source blocked: ${value}`);
  if (!allowedHosts.has(url.hostname)) unknownHosts.push(url.hostname);
  if (seen.has(url.toString())) duplicateUrls.push(url.toString());
  seen.add(url.toString());

  if (url.hostname === 'rbi.org.in') inventory.directInstitutional += 1;
  else if (url.hostname === 'www.thehindu.com' || url.hostname === 'timesofindia.indiatimes.com') inventory.directPublisher += 1;
  else inventory.discovery += 1;
}

if (unknownHosts.length) throw new Error(`Unreviewed source hosts: ${[...new Set(unknownHosts)].join(', ')}`);
if (duplicateUrls.length) throw new Error(`Duplicate source URLs: ${[...new Set(duplicateUrls)].join(', ')}`);
if (!inventory.directInstitutional) throw new Error('At least one direct institutional source is required.');

console.log(JSON.stringify({
  status: 'healthy',
  registry: registryPath,
  sourceCount: urls.length,
  inventory,
  policy: 'Discovery feeds are monitoring signals only; direct sources retain provenance priority.',
}, null, 2));
