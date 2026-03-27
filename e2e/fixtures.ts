import { test as base, expect } from '@playwright/test';
import { injectAxe, checkA11y, getViolations } from 'axe-playwright';

/**
 * Playwright test fixtures with accessibility support
 * - Automatically injects axe-core for a11y testing
 * - Provides reusable a11y checking utilities
 */

type A11yPageFixture = {
  injectA11y: () => Promise<void>;
  checkA11yOnPage: (options?: {
    excludeTags?: string[];
    excludeRules?: string[];
  }) => Promise<void>;
  getA11yViolations: () => Promise<any[]>;
};

export const test = base.extend<A11yPageFixture>({
  injectA11y: async ({ page }, use) => {
    await use(async () => {
      await injectAxe(page);
    });
  },

  checkA11yOnPage: async ({ page }, use) => {
    await use(async (options) => {
      await injectAxe(page);
      const violations = await getViolations(page, {
        tags: options?.excludeTags || [],
        rules: options?.excludeRules || [],
      });

      // Assert no critical violations
      expect(violations.length).toBe(0);
    });
  },

  getA11yViolations: async ({ page }, use) => {
    await use(async () => {
      await injectAxe(page);
      return await getViolations(page);
    });
  },
});

export { expect };
