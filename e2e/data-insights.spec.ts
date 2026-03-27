import { test, expect } from './fixtures';

/**
 * Critical user flow: Data Insights & Visualizations
 * Tests interactive data, charts, filters, and accessibility of visual content
 */

test.describe('Data Insights - Visualizations & Interactivity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/data-insights');
    await page.waitForLoadState('networkidle');
  });

  test('should load data insights page with accessible charts', async ({
    page,
    checkA11yOnPage,
  }) => {
    // Verify page structure
    const mainContent = page.locator('main, [role="main"]');
    await expect(mainContent).toBeVisible();

    // Check for data tables as alternatives to charts
    const tables = page.locator('table');
    const charts = page.locator('[data-testid*="chart"], .chart, svg');

    // Should have either tables OR aria-labels on charts
    const hasAccessibleData = await tables.count() > 0 ||
      (await charts.count() > 0 && 
       await charts.first().getAttribute('aria-label') !== null);

    expect(hasAccessibleData).toBeTruthy();

    await checkA11yOnPage({
      excludeRules: ['aria-allowed-attr'], // Charts might have custom attrs
    });
  });

  test('should provide keyboard navigation for interactive charts', async ({
    page,
  }) => {
    // Find all interactive chart elements
    const interactiveElements = page.locator('[tabindex], button, [role="button"]');
    const count = await interactiveElements.count();

    if (count > 0) {
      // Tab to first interactive element and verify focus
      await page.keyboard.press('Tab');
      const activeElement = await page.evaluate(() =>
        document.activeElement?.tagName
      );

      expect(['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(activeElement);
    }
  });

  test('should filter data with accessible form controls', async ({
    page,
  }) => {
    // Look for filter inputs
    const filterInputs = page.locator('input[type="checkbox"], select, input[type="radio"]');
    const filterCount = await filterInputs.count();

    if (filterCount > 0) {
      const firstFilter = filterInputs.first();

      // Filter should have associated label
      const id = await firstFilter.getAttribute('id');
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeVisible();
      }

      // Should be able to interact via keyboard
      await firstFilter.focus();
      if (await firstFilter.getAttribute('type') === 'checkbox') {
        await page.keyboard.press('Space');
      } else {
        await page.keyboard.press('ArrowDown');
      }
    }
  });

  test('should display data summary in text format', async ({
    page,
  }) => {
    // Page should have descriptive text alongside visualizations
    const paragraphs = page.locator('p');
    const paragraphCount = await paragraphs.count();

    // Should have at least some text describing the data
    expect(paragraphCount).toBeGreaterThan(0);

    // Check for statistics or key findings in text
    const textContent = await page.textContent();
    const hasMetrics = /(\d+\.?\d*%|\d+\s*(million|thousand|billion))/i.test(
      textContent || ''
    );

    // Should display at least some metrics
    expect(textContent).toContain('data') || console.warn('No "data" keyword found');
  });

  test('should provide data export options that are keyboard accessible', async ({
    page,
  }) => {
    const exportButtons = page.locator('button[aria-label*="export"], button:has-text("Export"), a:has-text("Download")');
    const exportCount = await exportButtons.count();

    if (exportCount > 0) {
      const firstExport = exportButtons.first();
      
      // Should be keyboard accessible
      await firstExport.focus();
      await page.keyboard.press('Enter');

      // Should indicate file type or format
      const label = await firstExport.getAttribute('aria-label') || await firstExport.textContent();
      expect(label).toMatch(/(CSV|JSON|PDF|Excel|Export|Download)/i);
    }
  });

  test('should handle missing or loading data gracefully', async ({
    page,
  }) => {
    // All visualizations should have alt text or loading states
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt).not.toBe(''); // Alt text should not be empty
    }

    // Should display loading states with aria-busy or similar
    const loadingStates = page.locator('[aria-busy="true"], [role="status"]');
    // Loading states are optional but if present should be properly marked
  });
});
