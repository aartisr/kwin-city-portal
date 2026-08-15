#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { verifySourceRegistry } from './lib/source-registry-policy.mjs';

const registryPath = 'public/feeds/kwin-city-news-feeds.opml';
const xml = readFileSync(registryPath, 'utf8');
const result = verifySourceRegistry(xml);

console.log(JSON.stringify({
  ...result,
  registry: registryPath,
}, null, 2));
