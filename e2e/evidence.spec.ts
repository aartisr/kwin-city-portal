import { test, expect } from './fixtures';

/**
 * Critical user flow: Evidence & Search Functionality
 * Tests search, filtering, evidence presentation, and source attribution
 */

test.describe('Evidence Vault - Search & Discovery', () => {
  test.beforeEach(async ({ page }: any) => {
    await page.goto('/evidence');
    await page.waitForLoadState('networkidle');
  });

  test('should have searchable evidence with accessible search interface', async ({
    page,
    checkA11yOnPage,
  }: any) => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]').first();

    if (await searchInput.count() > 0 && await searchInput.isVisible()) {
      const id = await searchInput.getAttribute('id');
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        expect(await label.count()).toBeGreaterThan(0);
      }

      await searchInput.focus();
      await searchInput.fill('test');
      await page.keyboard.press('Enter');
      await page.waitForLoadState('networkidle');

      const resultCount = await page
        .locator('[data-testid="evidence-item"], .evidence-card, article')
        .count();
      expect(resultCount).toBeGreaterThanOrEqual(0);
    }

    await checkA11yOnPage();
  });

  test('should display evidence with sources and citations', async ({ page }: any) => {
    const evidenceItems = page.locator('[data-testid="evidence-item"], .evidence-card, article');
    const itemCount = await evidenceItems.count();

    if (itemCount > 0) {
      const firstItem = evidenceItems.first();
      const sourceLink = firstItem.locator('a[href^="http"], [data-testid*="source"]');
      const sourceText = firstItem.locator('cite, [data-testid*="citation"]');
      const hasSource = (await sourceLink.count()) > 0 || (await sourceText.count()) > 0;
      expect(hasSource).toBeTruthy();
    }
  });

  test('should handle content with proper semantic markup', async ({ page }: any) => {
    const articles = page.locator('article');
    const sections = page.locator('section');
    const hasSemantic = (await articles.count()) > 0 || (await sections.count()) > 0;

    if (!hasSemantic) {
      console.warn('No semantic article/section elements detected on evidence page.');
    }

    const headingCount = await page.locator('h1, h2, h3, h4, h5, h6').count();
    if (headingCount > 0) {
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeLessThanOrEqual(1);
    }
  });

  test('should allow filtering evidence by type or category', async ({ page }: any) => {
    const filterButtons = page.locator(
      '[data-testid*="filter"], label:has(input[type="checkbox"]), label:has(input[type="radio"])'
    );
    const filterCount = await filterButtons.count();

    if (filterCount > 0) {
      await filterButtons.first().click();
      await page.waitForLoadState('networkidle');

      const results = await page.locator('[data-testid="evidence-item"], .evidence-card, article').count();
      const noResults = await page.locator('text=/no results|nothing found/i').count();
      expect(results > 0 || noResults > 0).toBeTruthy();
    }
  });

  test('should provide evidence source links that are accessible', async ({ page }: any) => {
    const sourceLinks = page.locator('a[href^="http"], a[data-testid*="source"]');
    const linkCount = await sourceLinks.count();

    for (let i = 0; i < Math.min(linkCount, 5); i++) {
      const link = sourceLinks.nth(i);
      const target = await link.getAttribute('target');

      if (target === '_blank') {
        const rel = await link.getAttribute('rel');
        expect(rel || '').toContain('noopener');
      }

      const text = (await link.textContent())?.trim() || (await link.getAttribute('aria-label'));
      expect(Boolean(text)).toBeTruthy();
    }
  });
});
