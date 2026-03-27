import { test, expect } from './fixtures';

/**
 * Critical user flow: Evidence & Search Functionality
 * Tests search, filtering, evidence presentation, and source attribution
 */

test.describe('Evidence Vault - Search & Discovery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/evidence');
    await page.waitForLoadState('networkidle');
  });

  test('should have searchable evidence with accessible search interface', async ({
    page,
    checkA11yOnPage,
  }) => {
    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]');

    if (await searchInput.isVisible()) {
      // Should have associated label
      const id = await searchInput.getAttribute('id');
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        // Label should exist
        const labelCount = await label.count();
        expect(labelCount).toBeGreaterThan(0);
      }

      // Search should be keyboard accessible
      await searchInput.focus();
      await searchInput.type('test');
      await page.keyboard.press('Enter');

      // Wait for results
      await page.waitForLoadState('networkidle');

      // Results should be announced
      const resultCount = await page.locator('[data-testid="evidence-item"], .evidence-card').count();
      console.log(`Found ${resultCount} evidence items`);
    }

    await checkA11yOnPage();
  });

  test('should display evidence with sources and citations', async ({
    page,
  }) => {
    // Each evidence item should have source attribution
    const evidenceItems = page.locator('[data-testid="evidence-item"], .evidence-card, article');
    const itemCount = await evidenceItems.count();

    if (itemCount > 0) {
      const firstItem = evidenceItems.first();

      // Should have visible source information
      const sourceLink = firstItem.locator('a[href^="http"], [data-testid*="source"]');
      const sourceText = firstItem.locator('cite, [data-testid*="citation"]');

      const hasSource = await sourceLink.count() > 0 || await sourceText.count() > 0;
      expect(hasSource).toBeTruthy();
    }
  });

  test('should handle content with proper semantic markup', async ({
    page,
  }) => {
    // Articles should use semantic HTML
    const articles = page.locator('article');
    const sections = page.locator('section');

    // Should use semantic elements
    const hasSemantic = await articles.count() > 0 || await sections.count() > 0;

    if (!hasSemantic) {
      console.warn(
        'Warning: Consider using semantic HTML elements (article, section)'
      );
    }

    // Headings should be properly nested
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();

    // Should have multiple heading levels for structure
    if (headingCount > 0) {
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeLessThanOrEqual(1); // Only one H1 per page
    }
  });

  test('should allow filtering evidence by type or category', async ({
    page,
  }) => {
    // Find filter controls
    const filterButtons = page.locator('[data-testid*="filter"], label:has(input[type="checkbox"]), label:has(input[type="radio"])');
    const filterCount = await filterButtons.count();

    if (filterCount > 0) {
      // Test first filter
      const firstFilter = filterButtons.first();
      await firstFilter.click();

      // Results should update
      await page.waitForLoadState('networkidle');

      // Should have some results or "no results" message
      const results = await page.locator('[data-testid="evidence-item"], .evidence-card').count();
      const noResults = await page.locator('text=/no results|nothing found/i').count();

      expect(results > 0 || noResults > 0).toBeTruthy();
    }
  });

  test('should provide evidence source links that are accessible', async ({
    page,
  }) => {
    const sourceLinks = page.locator('a[href^="http"], a[data-testid*="source"]');
    const linkCount = await sourceLinks.count();

    for (let i = 0; i < Math.min(linkCount, 5); i++) {
      const link = sourceLinks.nth(i);

      // Links should indicate external origin
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');
      const hasIndicator = ariaLabel?.includes('external') ||
                          title?.includes('external') ||
                          await link.locator('svg[aria-label*="external"]').count() > 0;

      if (!hasIndicator) {
        console.warn(
          'Warning: External links should be marked as external for screen readers'
        );
      }

      // Links should open in new tab if external
      const target = await link.getAttribute('target');
      if (target === '_blank') {
        const rel = await link.getAttribute('rel');
        expect(rel).toContain('noopener');
      }
    }
  });
});
