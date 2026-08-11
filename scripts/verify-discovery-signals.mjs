import { readFileSync, existsSync } from 'node:fs';

const REQUIRED_FILES = [
  'app/llms.txt/route.ts',
  'app/ai.txt/route.ts',
  'public/robots.txt',
  'public/BingSiteAuth.xml',
  'public/llms.txt',
  'public/ai.txt',
];

const REQUIRED_ROBOTS_LINES = [
  'Sitemap: https://kwin-city.com/sitemap.xml',
  'Sitemap: https://kwin-city.com/feed.xml',
];

const REQUIRED_LAYOUT_SNIPPETS = [
  "'llms-policy': `${SITE_URL}/llms.txt`",
  "'ai-policy': `${SITE_URL}/ai.txt`",
  'google: GOOGLE_SITE_VERIFICATION',
];

function fail(message) {
  console.error(`\n[discovery-signals] ${message}`);
  process.exit(1);
}

for (const filePath of REQUIRED_FILES) {
  if (!existsSync(filePath)) {
    fail(`Missing required discovery file: ${filePath}`);
  }
}

const robots = readFileSync('public/robots.txt', 'utf8');
for (const line of REQUIRED_ROBOTS_LINES) {
  if (!robots.includes(line)) {
    fail(`public/robots.txt must include: ${line}`);
  }
}

const layout = readFileSync('app/layout.tsx', 'utf8');
for (const snippet of REQUIRED_LAYOUT_SNIPPETS) {
  if (!layout.includes(snippet)) {
    fail(`app/layout.tsx is missing required snippet: ${snippet}`);
  }
}

const fallbackFiles = ['public/llms.txt', 'public/ai.txt'];
for (const filePath of fallbackFiles) {
  const text = readFileSync(filePath, 'utf8');
  if (!text.includes('Source of truth: this policy is generated dynamically at runtime')) {
    fail(`${filePath} must declare runtime source of truth.`);
  }
}

console.log('[discovery-signals] OK: AI discovery and citation signals are present.');
