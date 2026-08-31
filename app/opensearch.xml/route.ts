import { SITE_CONFIG } from '@/config/site.config';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const siteUrl = SITE_CONFIG.url;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>KWIN City</ShortName>
  <Description>Search the KWIN City evidence-first portal</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Image height="64" width="64" type="image/png">${escapeXml(`${siteUrl}/icon`)}</Image>
  <Url type="text/html" method="get" template="${escapeXml(`${siteUrl}/search?q={searchTerms}`)}" />
  <Url type="application/rss+xml" rel="results" template="${escapeXml(`${siteUrl}/feed.xml`)}" />
</OpenSearchDescription>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/opensearchdescription+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
