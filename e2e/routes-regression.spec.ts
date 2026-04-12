import { test, expect } from './fixtures';

const ROUTES = [
  '/',
  '/about',
  '/account',
  '/analytics',
  '/community',
  '/contact',
  '/data-insights',
  '/download',
  '/downloads',
  '/evidence',
  '/evidence-library',
  '/faq',
  '/for',
  '/for/curious-citizens',
  '/for/investor',
  '/for/journalist',
  '/for/researcher',
  '/for/resident',
  '/news-intelligence',
  '/news-reader',
  '/offline',
  '/region-map',
  '/search?q=kwin',
  '/sectors',
  '/sectors/comparison',
  '/sources',
  '/sustainability',
  '/terms',
  '/timeline',
  '/trust',
  '/updates',
  '/why-north-bengaluru',
];

const ALLOWED_ERROR_PATTERNS = [
  /favicon/i,
  /Download the React DevTools/i,
  /hydration/i,
  /source map/i,
  /violates the following Content Security Policy directive/i,
  /Creating a worker from 'blob:/i,
];

test.describe('Routes Regression Smoke', () => {
  for (const route of ROUTES) {
    test(`should render ${route} without runtime errors`, async ({ page }: any) => {
      const runtimeErrors: string[] = [];

      page.on('pageerror', (error: Error) => {
        runtimeErrors.push(error.message);
      });

      page.on('console', (msg: any) => {
        if (msg.type() !== 'error') {
          return;
        }

        const text = msg.text();
        if (ALLOWED_ERROR_PATTERNS.some((pattern) => pattern.test(text))) {
          return;
        }
        runtimeErrors.push(text);
      });

      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response).not.toBeNull();
      expect(response?.status() ?? 500).toBeLessThan(400);

      await Promise.race([
        page.locator('main, [role="main"]').first().waitFor({ state: 'visible', timeout: 15000 }),
        page.locator('h1, h2, h3').first().waitFor({ state: 'visible', timeout: 15000 }),
      ]).catch(() => null);

      const hasMain = await page
        .locator('main, [role="main"]')
        .first()
        .isVisible()
        .catch(() => false);
      const hasHeading = await page
        .locator('h1, h2, h3')
        .first()
        .isVisible()
        .catch(() => false);

      expect(hasMain || hasHeading).toBe(true);
      expect(runtimeErrors).toEqual([]);
    });
  }
});
