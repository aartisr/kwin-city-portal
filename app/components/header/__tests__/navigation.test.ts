import { describe, expect, it } from 'vitest';
import { HIGH_LEVEL_MENUS } from '@/components/header/navigation';

describe('header/navigation', () => {
  it('defines menu groups with unique labels', () => {
    const labels = HIGH_LEVEL_MENUS.map((group) => group.label);
    expect(new Set(labels).size).toBe(labels.length);
    expect(labels.length).toBeGreaterThan(0);
  });

  it('keeps href values unique across all menu items', () => {
    const hrefs = HIGH_LEVEL_MENUS.flatMap((group) => group.items.map((item) => item.href));
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it('ensures each menu item has required display data', () => {
    for (const group of HIGH_LEVEL_MENUS) {
      expect(group.items.length).toBeGreaterThan(0);
      for (const item of group.items) {
        expect(item.label.length).toBeGreaterThan(0);
        expect(item.href.startsWith('/')).toBe(true);
      }
    }
  });
});
