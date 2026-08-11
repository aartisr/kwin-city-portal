// @vitest-environment node

import { describe, expect, it } from 'vitest';
import {
  classifyReaderSourceTier,
  getReaderProvenance,
  parseReaderFeedsFromOpml,
} from '@/components/news-reader/source-registry';

describe('news-reader/source-registry', () => {
  it('parses feed entries from OPML with nested groups and decodes entities', () => {
    const opml = `
      <opml version="2.0">
        <body>
          <outline text="Bengaluru Local Desk Feeds">
            <outline text="Desk A"/>
            <outline
              text="Sample &amp; Feed"
              title="Sample &amp; Feed"
              xmlUrl="https://example.com/rss?x=1&amp;y=2"
              htmlUrl="https://example.com"
            />
          </outline>
        </body>
      </opml>
    `;

    const feeds = parseReaderFeedsFromOpml(opml);

    expect(feeds).toHaveLength(1);
    expect(feeds[0]).toEqual({
      title: 'Sample & Feed',
      xmlUrl: 'https://example.com/rss?x=1&y=2',
      htmlUrl: 'https://example.com',
      groupPath: ['Bengaluru Local Desk Feeds'],
    });
  });

  it('returns empty feed list for invalid OPML body', () => {
    expect(parseReaderFeedsFromOpml('<opml><head/></opml>')).toEqual([]);
  });

  it('classifies feeds by group tier rules and host fallbacks', () => {
    expect(classifyReaderSourceTier({
      title: 'Primary source',
      xmlUrl: 'https://publisher.example.com/rss',
      groupPath: ['Direct Publisher Feeds'],
    })).toBe('primary');

    expect(classifyReaderSourceTier({
      title: 'Official source',
      xmlUrl: 'https://example.com/rss',
      groupPath: ['Official Government Discovery Queries (Verify Original Link)'],
    })).toBe('official');

    expect(classifyReaderSourceTier({
      title: 'Gov host fallback',
      xmlUrl: 'https://kiadb.karnataka.gov.in/rss.xml',
      groupPath: ['Other group'],
    })).toBe('official');

    expect(classifyReaderSourceTier({
      title: 'Google discovery feed',
      xmlUrl: 'https://news.google.com/rss/search?q=kwin',
      groupPath: ['Anything'],
    })).toBe('contextual');

    expect(classifyReaderSourceTier({
      title: 'Unknown host',
      xmlUrl: 'not-a-url',
      htmlUrl: 'https://example.org',
      groupPath: ['Unknown'],
    })).toBe('contextual');
  });

  it('computes provenance for official discovery, direct publisher, and contextual feeds', () => {
    expect(getReaderProvenance({
      title: 'Official discovery',
      xmlUrl: 'https://news.google.com/rss/search?q=kwin+kiadb',
      groupPath: ['Official Government, State & Central Institutional Signals'],
    })).toBe('source-filtered-discovery');

    expect(getReaderProvenance({
      title: 'Publisher direct',
      xmlUrl: 'https://www.thehindu.com/feeder/default.rss',
      groupPath: ['Bengaluru Local Desk Feeds'],
    })).toBe('direct-publisher');

    expect(getReaderProvenance({
      title: 'Institutional direct',
      xmlUrl: 'https://www.rbi.org.in/rss/rss.aspx?Id=10',
      groupPath: ['Signals'],
    })).toBe('direct-institutional');

    expect(getReaderProvenance({
      title: 'Contextual feed',
      xmlUrl: 'https://example.org/feed.xml',
      groupPath: ['Strategic Context Signals'],
    })).toBe('contextual-monitoring');

    expect(getReaderProvenance({
      title: 'Google non-official discovery',
      xmlUrl: 'https://news.google.com/rss/search?q=kwin',
      groupPath: ['KWIN Precision Watch'],
    })).toBe('contextual-monitoring');

    expect(classifyReaderSourceTier({
      title: 'Malformed xml but official html host',
      xmlUrl: 'not-a-url',
      htmlUrl: 'https://example.gov.in/feed',
      groupPath: ['Unclassified bucket'],
    })).toBe('official');
  });
});
