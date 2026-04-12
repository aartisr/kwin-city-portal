import { describe, expect, it } from 'vitest';
import { getHomeSchemas } from '@/lib/home/schemas';

describe('home/schemas', () => {
  it('returns all expected schema blocks', () => {
    const schemas = getHomeSchemas();
    expect(schemas.length).toBe(5);
  });

  it('contains required schema.org types for rich results', () => {
    const schemas = getHomeSchemas();
    const types = schemas.map((schema) => String(schema['@type']));

    expect(types).toContain('Organization');
    expect(types).toContain('WebSite');
    expect(types).toContain('FAQPage');
    expect(types).toContain('BreadcrumbList');
  });

  it('includes SearchAction query endpoint in website schema', () => {
    const schemas = getHomeSchemas();
    const webSite = schemas.find((schema) => schema['@type'] === 'WebSite') as
      | { potentialAction?: { target?: { urlTemplate?: string } } }
      | undefined;

    expect(webSite).toBeDefined();
    expect(webSite?.potentialAction?.target?.urlTemplate).toContain('/search?q=');
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
