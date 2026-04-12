import { test, expect } from './fixtures';

const CRITICAL_ROUTES = ['/', '/about', '/contact', '/data-insights', '/for/investor', '/search?q=kwin'];

test.describe('Accessibility Smoke', () => {
  for (const route of CRITICAL_ROUTES) {
    test(`should keep core a11y semantics on ${route}`, async ({ page, injectA11y }: any) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await injectA11y();

      const hasMain = await page
        .locator('main, [role="main"]')
        .first()
        .isVisible()
        .catch(() => false);
      const heading = page.locator('h1, h2').first();
      const hasHeading = await heading.isVisible().catch(() => false);
      const hasSearchInput = await page
        .locator('input[type="search"], input[role="searchbox"]')
        .first()
        .isVisible()
        .catch(() => false);
      expect(hasMain || hasHeading || hasSearchInput).toBe(true);

      const links = page.locator('a[href]');
      const linkCount = await links.count();
      expect(linkCount).toBeGreaterThan(0);

      for (let i = 0; i < Math.min(linkCount, 10); i += 1) {
        const link = links.nth(i);
        const text = (await link.textContent())?.trim();
        const ariaLabel = (await link.getAttribute('aria-label'))?.trim();
        expect(Boolean(text) || Boolean(ariaLabel)).toBe(true);
      }

      const interactive = page.locator('button, a, input, select, textarea');
      const interactiveCount = await interactive.count();
      expect(interactiveCount).toBeGreaterThan(0);
    });
  }
});
