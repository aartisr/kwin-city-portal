import { expect, test } from './fixtures';

const CRITICAL_MOBILE_ROUTES = ['/', '/news-reader', '/evidence', '/aarti-s-ravikumar'] as const;

test.describe('Critical mobile layout contracts', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  for (const route of CRITICAL_MOBILE_ROUTES) {
    test(`${route} remains readable without horizontal overflow`, async ({ page }: any) => {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator('main, [role="main"]').first()).toBeVisible();

      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1);

      const firstHeading = page.locator('h1, h2').first();
      await expect(firstHeading).toBeVisible();
      await expect(firstHeading).toBeInViewport();
    });
  }
});
