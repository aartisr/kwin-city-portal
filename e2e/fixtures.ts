/// <reference path="./deps-shim.d.ts" />

import { test as base, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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
      // No-op for compatibility with older tests; AxeBuilder handles script injection internally.
      await Promise.resolve(page);
    });
  },

  checkA11yOnPage: async ({ page }: any, use: any) => {
    await use(async (options?: { excludeTags?: string[]; excludeRules?: string[] }) => {
      const builder = new (AxeBuilder as unknown as new (args: { page: unknown }) => {
        withTags: (tags: string[]) => void;
        disableRules: (rules: string | string[]) => void;
        analyze: () => Promise<{ violations: unknown[] }>;
      })({ page });

      if (options?.excludeTags?.length) {
        builder.withTags(options.excludeTags);
      }

      if (options?.excludeRules?.length) {
        for (const ruleId of options.excludeRules) {
          builder.disableRules(ruleId);
        }
      }

      const results = await builder.analyze();
      expect(results.violations).toEqual([]);
    });
  },
});

export { expect };
export type TestFixture = A11yPageFixture;
