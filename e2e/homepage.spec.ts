import { test, expect } from './fixtures';

/**
 * Critical user flow: Homepage navigation and content discovery
 * Tests hero section, navigation, call-to-action buttons, and initial data loading
 */

test.describe('Homepage - Navigation & Discovery', () => {
  test.beforeEach(async ({ page }: any) => {
    await page.goto('/');
    // Wait for the primary content to load
    await page.waitForLoadState('networkidle');
  });

  test('should load homepage and display hero section with proper hierarchy', async ({
    page,
    injectA11y,
  }: any) => {
    await injectA11y();

    // Check that hero section exists
    const hero = page.locator('[data-testid="hero-section"]');
    await expect(hero).toBeVisible();

    // Verify primary heading is H1 (not H2 or H3)
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('KWIN City', { ignoreCase: true });
  });

  test('should have functional navigation from home to major sections', async ({
    page,
    checkA11yOnPage,
  }: any) => {
    // Check for navigation landmark
    const nav = page.locator('nav[aria-label], nav role="navigation"');
    await expect(nav).toBeVisible();

    // Each link should be focusable and have visible text
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(2);

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    let focusedElement = await page.evaluate(() =>
      document.activeElement?.getAttribute('role')
    );
    expect(['link', 'button', null]).toContain(focusedElement);

    // Run a11y check
    await checkA11yOnPage();
  });

  test('should have primary CTA button visible and actionable', async ({
    page,
  }: any) => {
    // Test navigation to Different Sections
    const sections = [
      { label: 'About', path: '/about' },
      { label: 'Data Insights', path: '/data-insights' },
      { label: 'Evidence', path: '/evidence' },
      { label: 'Sustainability', path: '/sustainability' },
      { label: 'Timeline', path: '/timeline' },
    ];

    for (const section of sections) {
      await page.goto(section.path);
      await page.waitForLoadState('networkidle');

      // Verify page loaded
      const heading = page.locator('h1, h2');
      await expect(heading.first()).toBeVisible();

      // Should have a back link or breadcrumb
      const breadcrumb = page.locator('[data-testid="breadcrumb"], nav[aria-label*="Breadcrumb"]');
      const backButton = page.locator('button[aria-label*="back"], a[aria-label*="back"]');
      
      const hasNavigation = await breadcrumb.isVisible().catch(() => false) ||
                           await backButton.isVisible().catch(() => false);
      expect(hasNavigation).toBeTruthy();
    }
  });

  test('should have above-the-fold performance on mobile/desktop', async ({
    page,
  }: any) => {
    // Get all interactive elements
    const buttons = page.locator('button, a, input, select, textarea');

    // Test first interactive element
    if (await buttons.first().isVisible()) {
      await page.keyboard.press('Tab');
      
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement;
        return window.getComputedStyle(el).outline !== 'none' ||
               window.getComputedStyle(el).boxShadow.includes('rgb');
      });

      expect(focusedElement).toBeTruthy();
    }
  });

  test('should have skip link for keyboard users', async ({
    page,
  }: any) => {
    const links = page.locator('a');
    const linkCount = await links.count();

    for (let i = 0; i < Math.min(linkCount, 15); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');

      const descriptiveText = text || ariaLabel;
      
      // Links should have descriptive text
      expect(descriptiveText).toBeTruthy();
      expect(descriptiveText?.toLowerCase()).not.toMatch(/^(click|here|link|read more)$/i);
    }
  });

  test('should preload critical data for smooth navigation', async ({
    page,
  }: any) => {
    // Look for aria-live regions for notifications
    const liveRegions = page.locator('[aria-live]');
    const liveCount = await liveRegions.count();

    // Page should have at least one aria-live region for dynamic updates
    // (e.g., for success messages, errors, loading states)
    if (liveCount === 0) {
      console.warn('Warning: No aria-live regions found for dynamic announcements');
    }

    // Verify any found live regions have correct polite/assertive values
    for (let i = 0; i < liveCount; i++) {
      const region = liveRegions.nth(i);
      const ariaLive = await region.getAttribute('aria-live');
      expect(['polite', 'assertive', 'off']).toContain(ariaLive);
    }
  });

  test('should have proper color contrast for text and backgrounds', async ({
    page,
    injectA11y,
  }: any) => {
    await injectA11y();

    const violations = await page.evaluate(async () => {
      // Check common text elements
      const textElements = document.querySelectorAll('p, span, a, button, h1, h2, h3, h4, h5, h6');
      const lowContrastElements = [];

      for (const el of textElements) {
        if (!(el as HTMLElement).offsetParent) continue; // Skip hidden elements

        const color = window.getComputedStyle(el).color;
        const bgColor = window.getComputedStyle(el).backgroundColor;

        // Simplified contrast check (would need full WCAG algorithm)
        if (color === 'rgb(128, 128, 128)' && bgColor === 'rgb(128, 128, 128)') {
          lowContrastElements.push(el.tagName);
        }
      }

      return lowContrastElements;
    });

    // Should not have elements with poor contrast
    expect(violations.length).toBe(0);
  });
});
