import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site.config';
import { getUpdateEntries, getUpdatePath } from '@/lib/updates/content';

const SITE_URL = SITE_CONFIG.url;

/**
 * Dynamic XML sitemap — automatically discovered by Google Search Console,
 * Bing Webmaster Tools, and all crawlers that check /sitemap.xml.
 *
 * Priority guide:
 *   1.0 — homepage
 *   0.9 — primary pillar pages (sectors, sustainability, why-north-bengaluru)
 *   0.8 — supporting content (evidence, data-insights, timeline, sources)
 *   0.7 — persona pages
 *   0.6 — about / terms
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${SITE_CONFIG.lastUpdatedISO}T00:00:00+05:30`).toISOString();
  const updateEntries = getUpdateEntries();

  return [
    // ── Tier 1: Homepage ───────────────────────────────────────────────────
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // ── Tier 2: Primary content pillars ───────────────────────────────────
    {
      url: `${SITE_URL}/why-north-bengaluru`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/sectors`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/sectors/comparison`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/sustainability`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // ── Tier 3: Research & evidence ────────────────────────────────────────
    {
      url: `${SITE_URL}/evidence`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/data-insights`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/trust`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/news-intelligence`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/news-reader`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/updates`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/instagram`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/share`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    ...updateEntries.map((entry) => ({
      url: `${SITE_URL}${getUpdatePath(entry.id)}`,
      lastModified: new Date(`${entry.date}T00:00:00+05:30`).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    {
      url: `${SITE_URL}/download`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/downloads`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/timeline`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sources`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // ── Tier 4: Persona hub & individual personas ─────────────────────────
    {
      url: `${SITE_URL}/for`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/for/investor`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/for/resident`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/for/researcher`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/for/journalist`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/for/curious-citizens`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // ── Tier 5: About / legal ──────────────────────────────────────────────
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
