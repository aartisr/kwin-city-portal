// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { verifySourceRegistry } from './lib/source-registry-policy.mjs';

const feed = (url: string) => `<outline type="rss" xmlUrl="${url.replaceAll('&', '&amp;')}" />`;
const official = 'https://news.google.com/rss/search?q=site%3Akiadb.karnataka.gov.in%20KWIN';

describe('source registry trust policy', () => {
  it('classifies Bing as discovery-only and official filtered search separately', () => {
    const result = verifySourceRegistry(`<opml><body>${feed(official)}${feed('https://www.bing.com/news/search?q=KWIN&format=rss')}</body></opml>`);
    expect(result.inventory).toEqual({ directInstitutional: 0, directPublisher: 0, officialDiscovery: 1, discovery: 1 });
  });

  it.each([
    ['lookalike host', 'https://www.bing.com.attacker.example/rss', /Unreviewed source hosts/],
    ['insecure transport', 'http://news.google.com/rss?q=KWIN', /Non-HTTPS/],
    ['embedded credentials', 'https://user:secret@news.google.com/rss?q=KWIN', /Credential-bearing/],
    ['nonstandard port', 'https://news.google.com:8443/rss?q=KWIN', /Non-standard/],
    ['fragment', 'https://news.google.com/rss?q=KWIN#hidden', /Fragment-bearing/],
  ])('fails closed for %s', (_label, candidate, error) => {
    expect(() => verifySourceRegistry(`<opml><body>${feed(official)}${feed(candidate)}</body></opml>`)).toThrow(error);
  });

  it('rejects duplicate canonical URLs', () => {
    expect(() => verifySourceRegistry(`<opml><body>${feed(official)}${feed(official)}</body></opml>`)).toThrow(/Duplicate source URLs/);
  });

  it('does not mistake ordinary aggregator results for institutional evidence', () => {
    expect(() => verifySourceRegistry(`<opml><body>${feed('https://www.bing.com/news/search?q=KWIN&format=rss')}</body></opml>`)).toThrow(/institutional signal/);
  });

  it('rejects empty and malformed registries', () => {
    expect(() => verifySourceRegistry('<opml><body /></opml>')).toThrow(/contains no feeds/);
    expect(() => verifySourceRegistry(null as unknown as string)).toThrow(/XML text/);
  });
});
