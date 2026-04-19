import { SITE_CONFIG } from '@/config/site.config';
import updatesData from '@/content/pages/updates.json';

type UpdateLink = {
  label: string;
  href: string;
};

type UpdateEntry = {
  id: string;
  date: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  verificationTier: 'verified' | 'pending' | 'contextual';
  tags: string[];
  links: UpdateLink[];
};

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
  const entries = [...(updatesData.entries as UpdateEntry[])].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const items = entries
    .map((entry) => {
      const url = `${siteUrl}/updates#${entry.id}`;
      const relatedLinks = entry.links
        .map((link) => {
          const href = link.href.startsWith('http') ? link.href : `${siteUrl}${link.href}`;
          return `<li><a href="${escapeXml(href)}">${escapeXml(link.label)}</a></li>`;
        })
        .join('');

      const description = `<p>${escapeXml(entry.summary)}</p><p>${escapeXml(entry.body)}</p><p><strong>Category:</strong> ${escapeXml(entry.category)} | <strong>Verification:</strong> ${escapeXml(entry.verificationTier)}</p>${relatedLinks ? `<ul>${relatedLinks}</ul>` : ''}`;

      return `<item>
  <title>${escapeXml(entry.title)}</title>
  <link>${escapeXml(url)}</link>
  <guid isPermaLink="true">${escapeXml(url)}</guid>
  <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
  <description><![CDATA[${description}]]></description>
  <category>${escapeXml(entry.category)}</category>
</item>`;
    })
    .join('\n');

  const lastBuildDate = entries.length > 0 ? new Date(entries[0].date).toUTCString() : new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>KWIN City Updates Feed</title>
  <link>${escapeXml(siteUrl)}</link>
  <description>Official milestones, announcements, and verified updates for KWIN City.</description>
  <language>en-IN</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  <atom:link href="${escapeXml(`${siteUrl}/feed.xml`)}" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=86400',
    },
  });
}
