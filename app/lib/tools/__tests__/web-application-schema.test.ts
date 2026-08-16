import { describe, expect, it } from 'vitest';
import { INTERACTIVE_APPLICATIONS, interactiveApplicationsSchema } from '@/lib/tools/web-application-schema';

describe('interactive application discovery schema', () => {
  it('publishes every indexed tool as a free, attributable WebApplication', () => {
    const schema = interactiveApplicationsSchema();
    expect(schema.numberOfItems).toBe(INTERACTIVE_APPLICATIONS.length);
    expect(schema.itemListElement).toHaveLength(INTERACTIVE_APPLICATIONS.length);
    for (const entry of schema.itemListElement) {
      expect(entry.item).toMatchObject({ '@type': 'WebApplication', isAccessibleForFree: true });
      expect(entry.item.featureList.length).toBeGreaterThan(1);
      expect(entry.item.url).toMatch(/^https:\/\/kwin-city\.com\/tools\//);
    }
  });
});
