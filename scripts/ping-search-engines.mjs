const SITE_URL = 'https://kwin-city.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const FEED_URL = `${SITE_URL}/feed.xml`;

function buildTargets() {
  const targets = [
    {
      name: 'Bing sitemap ping',
      url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    },
    {
      name: 'Bing feed ping',
      url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(FEED_URL)}`,
    },
  ];

  if (process.env.INDEXNOW_KEY && process.env.INDEXNOW_HOST) {
    targets.push({
      name: 'IndexNow submit',
      url: 'https://api.indexnow.org/indexnow',
      method: 'POST',
      body: {
        host: process.env.INDEXNOW_HOST,
        key: process.env.INDEXNOW_KEY,
        keyLocation: `https://${process.env.INDEXNOW_HOST}/${process.env.INDEXNOW_KEY}.txt`,
        urlList: [SITE_URL, `${SITE_URL}/updates`, `${SITE_URL}/feed.xml`, `${SITE_URL}/sitemap.xml`],
      },
    });
  }

  return targets;
}

async function ping(target) {
  try {
    const response = await fetch(target.url, {
      method: target.method ?? 'GET',
      headers: target.body ? { 'content-type': 'application/json' } : undefined,
      body: target.body ? JSON.stringify(target.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    console.log(`OK: ${target.name}`);
    return true;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`WARN: ${target.name} failed (${reason})`);
    return false;
  }
}

async function run() {
  const targets = buildTargets();
  console.log(`Notifying ${targets.length} endpoint(s) for ${SITE_URL}`);

  const results = await Promise.all(targets.map((target) => ping(target)));
  const successCount = results.filter(Boolean).length;

  console.log(`Completed notifications: ${successCount}/${targets.length} successful`);

  // Do not fail publish pipelines on third-party ping endpoint behavior.
  // Providers can return 410/404 when ping APIs are deprecated or throttled.
  if (successCount === 0) {
    console.warn('No ping endpoint succeeded. This is non-blocking; discovery still works via sitemap/feed crawling.');
  }
}

run();
