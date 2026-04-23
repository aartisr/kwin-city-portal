import { describe, expect, it } from 'vitest';
import { getHomeSchemas } from '@/lib/home/schemas';

describe('home/schemas', () => {
  it('returns all expected schema blocks', () => {
    const schemas = getHomeSchemas();
    expect(schemas.length).toBe(4);
  });

  it('contains required schema.org types for rich results', () => {
    const schemas = getHomeSchemas();
    const types = schemas.map((schema) => String(schema['@type']));

    expect(types).toContain('Place');
    expect(types).toContain('CollectionPage');
    expect(types).toContain('FAQPage');
    expect(types).toContain('BreadcrumbList');
  });

  it('includes major discovery sections in the collection page schema', () => {
    const schemas = getHomeSchemas();
    const collectionPage = schemas.find((schema) => schema['@type'] === 'CollectionPage') as
      | { hasPart?: string[] }
      | undefined;

    expect(collectionPage).toBeDefined();
    expect(collectionPage?.hasPart).toContain('https://kwin-city.com/updates');
    expect(collectionPage?.hasPart).toContain('https://kwin-city.com/trust');
  });

  it('includes FAQ entries for FAQ rich snippets', () => {
    const schemas = getHomeSchemas();
    const faq = schemas.find((schema) => schema['@type'] === 'FAQPage') as
      | { mainEntity?: unknown[] }
      | undefined;

    expect(faq).toBeDefined();
    expect(Array.isArray(faq?.mainEntity)).toBe(true);
    expect((faq?.mainEntity ?? []).length).toBeGreaterThanOrEqual(4);
  });
});
