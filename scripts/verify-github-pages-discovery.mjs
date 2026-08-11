import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const HUB_DIR = 'github-pages';
const HUB_URL = 'https://aartisr.github.io/kwin-city-portal/';
const PRIMARY_URL = 'https://kwin-city.com';
const REQUIRED_FILES = [
  '.nojekyll',
  'index.html',
  'geo-ai-index.html',
  'seo-link-graph.html',
  'main-site-directory.html',
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  'style.css',
];
const VALID_PRIMARY_PATHS = new Set([
  '/', '/about', '/timeline', '/evidence', '/sources', '/trust', '/data-insights',
  '/updates', '/news-intelligence', '/faq', '/region-map', '/sectors/comparison',
  '/why-north-bengaluru', '/sustainability', '/search', '/sitemap.xml', '/feed.xml',
  '/llms.txt', '/robots.txt', '/ai.txt', '/opensearch.xml', '/sectors', '/news-reader',
  '/seo-agency', '/updates/change-tracker', '/updates/regulatory-news',
  '/updates/satellite-tracker', '/updates/update-2025-12-phase1-infra',
  '/updates/update-2024-12-kiadb-approvals', '/updates/update-2024-10-inauguration',
  '/instagram', '/share', '/download', '/downloads', '/for', '/for/investor',
  '/for/resident', '/for/researcher', '/for/journalist', '/for/curious-citizens',
  '/contact', '/tools', '/tools/accessibility', '/tools/investment-radar',
  '/tools/open-data-studio', '/tools/opportunity-exchange', '/tools/regulatory-navigator',
  '/tools/risk-check', '/tools/spatial-explorer', '/tools/valuation-index', '/terms',
]);

const REQUIRED_STABLE_BACKLINKS = [...VALID_PRIMARY_PATHS];

function fail(message) {
  console.error(`\n[github-pages-discovery] ${message}`);
  process.exit(1);
}

for (const file of REQUIRED_FILES) {
  if (!existsSync(join(HUB_DIR, file))) fail(`Missing GitHub Pages asset: ${file}`);
}

const pages = ['index.html', 'geo-ai-index.html', 'seo-link-graph.html', 'main-site-directory.html'];
const sitemap = readFileSync(join(HUB_DIR, 'sitemap.xml'), 'utf8');
const robots = readFileSync(join(HUB_DIR, 'robots.txt'), 'utf8');
const llms = readFileSync(join(HUB_DIR, 'llms.txt'), 'utf8');

if (!robots.includes(`Sitemap: ${HUB_URL}sitemap.xml`)) fail('robots.txt must reference the published hub sitemap.');
if (!llms.includes(`Hub Sitemap: ${HUB_URL}sitemap.xml`)) fail('llms.txt must reference the published hub sitemap.');

for (const page of pages) {
  const expectedUrl = page === 'index.html' ? HUB_URL : `${HUB_URL}${page}`;
  if (!sitemap.includes(`<loc>${expectedUrl}</loc>`)) fail(`sitemap.xml is missing ${page}.`);

  const html = readFileSync(join(HUB_DIR, page), 'utf8');
  if (!html.includes(`<link rel="canonical" href="${expectedUrl}"`)) fail(`${page} has an incorrect or missing canonical URL.`);
  if (!html.includes('application/ld+json')) fail(`${page} must include structured data.`);

  for (const href of html.matchAll(/href="(https:\/\/kwin-city\.com[^"?#]*)/g)) {
    const path = href[1].slice(PRIMARY_URL.length) || '/';
    if (!VALID_PRIMARY_PATHS.has(path)) fail(`${page} links to an unrecognised primary-site URL: ${href[1]}`);
  }

  for (const href of html.matchAll(/href="\.\/([^"?#]+)"/g)) {
    if (!existsSync(join(HUB_DIR, href[1]))) fail(`${page} links to missing local asset: ${href[1]}`);
  }
}

const combinedHtml = pages.map((page) => readFileSync(join(HUB_DIR, page), 'utf8')).join('\n');
for (const path of REQUIRED_STABLE_BACKLINKS) {
  const href = `${PRIMARY_URL}${path === '/' ? '/' : path}`;
  if (!combinedHtml.includes(`href="${href}"`)) fail(`Missing stable backlink to primary-site URL: ${href}`);
}

console.log(`[github-pages-discovery] OK: ${pages.length} crawlable hub pages, ${REQUIRED_STABLE_BACKLINKS.length} stable primary-site backlinks, and all declared primary-site links are valid.`);
