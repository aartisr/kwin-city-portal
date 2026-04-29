import { describe, expect, it } from 'vitest';
import { getHomeSchemas } from '@/lib/home/schemas';

describe('home/schemas', () => {
  it('returns all expected schema blocks', () => {
    const schemas = getHomeSchemas();
    expect(schemas.length).toBe(3);
  });

  it('contains required schema.org types for visible homepage content', () => {
    const schemas = getHomeSchemas();
    const types = schemas.map((schema) => String(schema['@type']));

    expect(types).toContain('Place');
    expect(types).toContain('CollectionPage');
    expect(types).toContain('BreadcrumbList');
    expect(types).not.toContain('FAQPage');
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

  it('keeps FAQ markup off the homepage because FAQ content lives on /faq', () => {
    const schemas = getHomeSchemas();
    const faq = schemas.find((schema) => schema['@type'] === 'FAQPage');

    expect(faq).toBeUndefined();
  });
});
