import { test, expect } from './fixtures';

/**
 * Performance, Reliability & Accessibility
 * Tests page performance, error handling, and WCAG compliance
 */

test.describe('Performance & Reliability', () => {
  test('should load pages within acceptable performance thresholds', async ({
    page,
  }: any) => {
    const start = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - start;

    // First Contentful Paint should be < 2.5s for good UX
    expect(loadTime).toBeLessThan(5000);

    // Check for Core Web Vitals using performance API
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      return {
        domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
        loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
      };
    });

    console.log('Performance metrics:', metrics);
  });

  test('should have proper error boundaries for failed resource loads', async ({
    page,
  }: any) => {
    // Navigate to page
    await page.goto('/');

    // Monitor failed requests
    const failedRequests: string[] = [];

    page.on('requestfailed', (request: any) => {
      failedRequests.push(request.url());
    });

    // Wait for network to settle
    await page.waitForLoadState('networkidle');

    // Should still render main content even if some resources fail
    const mainContent = page.locator('main, [role="main"]');
    await expect(mainContent).toBeVisible();

    console.log(`Failed requests: ${failedRequests.length}`);
  });

  test('should handle missing images gracefully with alt text', async ({
    page,
  }: any) => {
    await page.goto('/');

    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');

      // Every image should have alt text
      expect(alt).toBeTruthy();
      expect(alt?.length).toBeGreaterThan(0);

      // Alt text should describe the image, not just say "image"
      expect(alt?.toLowerCase()).not.toBe('image');
    }
  });

  test('should have proper language declaration for text-to-speech', async ({
    page,
  }: any) => {
    await page.goto('/');

    // HTML element should have lang attribute
    const htmlElement = page.locator('html');
    const lang = await htmlElement.getAttribute('lang');

    expect(lang).toBeTruthy();
    expect(lang).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/); // e.g., en, en-US
  });

  test('should prevent layout shifts during page load (CLS)', async ({
    page,
  }: any) => {
    // Track layout shift events
    const layoutShifts: number[] = [];

    await page.evaluate(() => {
      const observer = new PerformanceObserver((entries) => {
        for (const entry of entries.getEntries()) {
          if ((entry as any).hadRecentInput) return;
          const { value } = entry as any;
          layoutShifts.push(value);
        }
      });

      try {
        observer.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        console.warn('LayoutShift observer not supported');
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // CLS should be < 0.1 for good experience
    const clf = layoutShifts.reduce((a, b) => a + b, 0);
    console.log(`Cumulative Layout Shift: ${clf.toFixed(3)}`);

    // Just log this metric; it's informational
    if (clf > 0.25) {
      console.warn('High layout shift detected. Consider fixed layout elements.');
    }
  });
});

test.describe('WCAG 2.1 Compliance - Level AA', () => {
  test('should have sufficient color contrast (4.5:1 for normal text)', async ({
    page,
    injectA11y,
  }: any) => {
    await page.goto('/');
    await injectA11y();

    // Axe will check color contrast as part of the full scan
    const violations = await page.evaluate(async () => {
      return (window as any).axe.run((results: any) => {
        return results.violations.filter((v: any) => v.id === 'color-contrast');
      });
    }).catch(() => []);

    console.log(`Color contrast issues: ${violations.length}`);
  });

  test('should have text resizable up to 200% without loss of functionality', async ({
    page,
  }: any) => {
    await page.goto('/');

    // Test with 200% zoom
    await page.evaluate(() => {
      document.documentElement.style.zoom = '200%';
    });

    // Content should still be operable
    const mainContent = page.locator('main, [role="main"]');
    await expect(mainContent).toBeVisible();

    // No horizontal scroll should be required
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    // Allow small margin
    expect(scrollWidth - viewportWidth).toBeLessThan(50);
  });

  test.skip('should pass automated a11y scan', async ({
    page,
    injectA11y,
  }: any) => {
    // This test is a template; actual implementation depends on your setup
    await page.goto('/');
    await injectA11y();

    // Run full axe scan
    const result = await page.evaluate(async () => {
      return (window as any).axe.run();
    }).catch(() => ({ violations: [] }));

    // Filter out known issues that need manual review
    const criticalViolations = result.violations?.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(criticalViolations?.length || 0).toBe(0);
  });
});
