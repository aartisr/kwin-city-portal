/// <reference path="./deps-shim.d.ts" />

import { test as base, expect } from '@playwright/test';
import { injectAxe, checkA11y } from '@axe-core/playwright';

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
};

export const test = base.extend({
  injectA11y: async ({ page }: any, use: any) => {
    await use(async () => {
      await injectAxe(page);
    });
  },

  checkA11yOnPage: async ({ page }: any, use: any) => {
    await use(async () => {
      await injectAxe(page);
      await checkA11y(page);
    });
  },
});

export { expect };
export type TestFixture = A11yPageFixture;
