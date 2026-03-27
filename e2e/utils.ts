import { expect } from './fixtures';

type Page = any;

/**
 * Reusable test utilities for E2E testing
 */

/**
 * Navigate to page and wait for critical content
 */
export async function navigateToPage(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return page.evaluate(
    (sel: string) => {
      const element = document.querySelector(sel);
      if (!element) return false;

      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      );
    },
    selector
  );
}

/**
 * Get computed color contrast ratio (simplified)
 * Note: Full WCAG contrast calculation is complex; this is approximate
 */
export async function getContrastRatio(page: Page, selector: string): Promise<number> {
  return page.evaluate((sel: string) => {
    const element = document.querySelector(sel) as HTMLElement;
    if (!element) return 0;

    const color = window.getComputedStyle(element).color;
    const bgColor = window.getComputedStyle(element).backgroundColor;

    // Parse RGB values
    const parseRGB = (rgb: string) => {
      const match = rgb.match(/\d+/g);
      if (!match) return { r: 0, g: 0, b: 0 };
      return {
        r: parseInt(match[0]),
        g: parseInt(match[1]),
        b: parseInt(match[2]),
      };
    };

    const fg = parseRGB(color);
    const bg = parseRGB(bgColor);

    // Calculate luminance
    const getLuminance = (color: { r: number; g: number; b: number }) => {
      const [r, g, b] = [color.r, color.g, color.b].map((c) => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(fg);
    const l2 = getLuminance(bg);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  }, selector);
}

/**
 * Verify all links are accessible (keyboard & screen reader)
 */
export async function verifyLinkAccessibility(page: Page) {
  const links = page.locator('a');
  const count = await links.count();

  const issues: string[] = [];

  for (let i = 0; i < count; i++) {
    const link = links.nth(i);
    const isVisible = await link.isVisible();

    if (isVisible) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');

      if (!text?.trim() && !ariaLabel) {
        issues.push(`Link at index ${i} has no accessible text`);
      }
    }
  }

  return issues;
}

/**
 * Test keyboard navigation through focusable elements
 */
export async function testKeyboardNavigation(page: Page) {
  const focusableElements = page.locator(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const count = await focusableElements.count();

  for (let i = 0; i < Math.min(count, 10); i++) {
    await page.keyboard.press('Tab');

    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  }
}

/**
 * Get all a11y violations on current page using axe-core
 */
export async function getA11yViolations(page: Page): Promise<any[]> {
  return page.evaluate(async () => {
    if (!(window as any).axe) return [];

    return new Promise((resolve) => {
      (window as any).axe.run((results: any) => {
        resolve(results.violations);
      });
    });
  }).catch(() => []);
}

/**
 * Wait for specific keyboard navigation pattern
 */
export async function waitForKeyboardFocus(page: Page, selector: string) {
  return page.waitForFunction(
    (sel: string) => {
      const element = document.querySelector(sel);
      return element === document.activeElement;
    },
    selector,
    { timeout: 5000 }
  );
}

/**
 * Assert WCAG contrast compliance
 */
export async function assertContrastCompliance(
  page: Page,
  selector: string,
  level: 'AA' | 'AAA' = 'AA'
) {
  const ratio = await getContrastRatio(page, selector);

  // WCAG levels: AA = 4.5:1 (normal), AAA = 7:1 (normal)
  const minimumRatio = level === 'AAA' ? 7 : 4.5;

  expect(ratio).toBeGreaterThanOrEqual(minimumRatio);
}
