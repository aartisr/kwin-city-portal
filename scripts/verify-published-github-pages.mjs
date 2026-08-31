const baseUrl = `${(process.env.PAGES_URL ?? 'https://aartisr.github.io/kwin-city-portal/').replace(/\/$/, '')}/`;
const expectedAssets = [
  ['', 'text/html'],
  ['/robots.txt', 'text/plain'],
  ['/sitemap.xml', 'application/xml'],
  ['/llms.txt', 'text/plain'],
  ['/geo-ai-index.html', 'text/html'],
  ['/seo-link-graph.html', 'text/html'],
];

const failures = [];

for (const [path, contentType] of expectedAssets) {
  const url = `${baseUrl}${path.replace(/^\//, '')}`;
  try {
    const response = await fetch(url, { redirect: 'follow' });
    const actualContentType = response.headers.get('content-type') ?? '';
    if (!response.ok || !actualContentType.includes(contentType)) {
      failures.push(`${url} returned ${response.status} (${actualContentType || 'missing content type'})`);
    }
  } catch (error) {
    failures.push(`${url} could not be fetched: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length > 0) {
  console.error(`[github-pages-publish] ${failures.join('\n[github-pages-publish] ')}`);
  process.exit(1);
}

console.log(`[github-pages-publish] OK: ${expectedAssets.length} discovery assets are reachable from ${baseUrl}`);
