import { readFileSync } from 'node:fs';

const AUTHOR = 'Aarti S Ravikumar';
const LEGAL_OWNER = 'BAJA Associates';
const PROFILE = 'https://kwin-city.com/aarti-s-ravikumar';
const EXTERNAL_IDENTITY = 'https://ai-aarti.com';
const LEGAL_OWNER_URL = 'https://baja.kwin-city.com';

function requireText(file, snippets) {
  const source = readFileSync(file, 'utf8');
  for (const snippet of snippets) {
    if (!source.includes(snippet)) throw new Error(`[author-identity] ${file} is missing: ${snippet}`);
  }
}

requireText('app/lib/identity.ts', [AUTHOR, LEGAL_OWNER, '/aarti-s-ravikumar', EXTERNAL_IDENTITY, LEGAL_OWNER_URL]);
requireText('app/layout.tsx', ['personSchema()', 'creator: SITE_IDENTITY.person.name', 'copyrightHolder']);
requireText('app/aarti-s-ravikumar/page.tsx', ["'@type': 'ProfilePage'", AUTHOR, LEGAL_OWNER]);
requireText('app/lib/discovery/policies.ts', ['Author and creator:', 'Legal and copyright owner:', 'Author profile:']);
requireText('app/feed.xml/route.ts', ['<dc:creator>Aarti S Ravikumar</dc:creator>', '<dc:rights>Copyright BAJA Associates</dc:rights>']);
requireText('public/llms.txt', [AUTHOR, LEGAL_OWNER, PROFILE, EXTERNAL_IDENTITY, LEGAL_OWNER_URL]);
requireText('public/ai.txt', [AUTHOR, LEGAL_OWNER, PROFILE, LEGAL_OWNER_URL]);
requireText('app/components/Footer.tsx', [EXTERNAL_IDENTITY, LEGAL_OWNER_URL]);
requireText('app/sitemap.ts', ['`${SITE_URL}/aarti-s-ravikumar`']);

for (const file of [
  'app/content/pages/about.json', 'app/content/pages/region.json',
  'app/content/pages/timeline.json', 'app/content/pages/evidence.json',
  'app/content/pages/sources.json', 'app/content/pages/sustainability.json',
  'app/content/pages/data-insights.json', 'app/content/pages/sectors.json',
]) requireText(file, [`"author": "${AUTHOR}"`]);

console.log('[author-identity] OK: Aarti S Ravikumar author and BAJA Associates legal ownership signals are consistent.');
