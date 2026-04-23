import { describe, expect, it } from 'vitest';
import { getUpdatesSchemas } from '@/lib/updates/schemas';

describe('updates/schemas', () => {
  it('emits canonical update URLs instead of fragment-only anchors', () => {
    const schemas = getUpdatesSchemas();
    const itemList = schemas.find((schema) => schema['@type'] === 'ItemList') as
      | { itemListElement?: Array<{ url?: string }> }
      | undefined;

    expect(itemList).toBeDefined();
    expect(itemList?.itemListElement?.[0]?.url).toContain('/updates/');
    expect(itemList?.itemListElement?.[0]?.url).not.toContain('#');
  });

  it('uses detail-page URLs for NewsArticle entities', () => {
    const schemas = getUpdatesSchemas();
    const article = schemas.find((schema) => schema['@type'] === 'NewsArticle') as
      | { url?: string; mainEntityOfPage?: string; image?: string[] }
      | undefined;

    expect(article?.url).toContain('/updates/');
    expect(article?.mainEntityOfPage).toContain('/updates/');
    expect(article?.image?.[0]).toContain('/updates/');
  });
});
