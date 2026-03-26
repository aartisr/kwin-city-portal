import { MetadataRoute } from 'next';

/**
 * robots.ts — served at /robots.txt
 * Instructs search crawlers which paths to index and where the sitemap is.
 * Disables API routes and private paths from indexing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
    ],
    sitemap: 'https://kwin-city.com/sitemap.xml',
    host: 'https://kwin-city.com',
  };
}
