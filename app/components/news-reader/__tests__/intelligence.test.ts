import { describe, expect, it } from 'vitest';
import { clusterReaderItems, sortReaderClusters } from '../intelligence';
import type { ReaderItem } from '../types';

function item(overrides: Partial<ReaderItem>): ReaderItem {
  return {
    title: 'KWIN transit corridor receives approval', link: 'https://example.com/a', summary: 'KWIN transit corridor receives approval for Bengaluru.', fullContent: '', source: 'Example', sourceFeedUrl: 'https://example.com/rss', sourceTier: 'official', provenance: 'direct-institutional', authenticity: 'verified-feed', publishedAt: '2026-08-10T00:00:00.000Z', ...overrides,
  };
}

describe('reader intelligence', () => {
  it('clusters overlapping independent coverage and preserves provenance', () => {
    const clusters = clusterReaderItems([
      item({ link: 'https://gov.in/a', source: 'Government' }),
      item({ link: 'https://publisher.example/b', source: 'Publisher', provenance: 'direct-publisher', sourceTier: 'primary' }),
    ]);
    expect(clusters).toHaveLength(1);
    expect(clusters[0].sourceCount).toBe(2);
    expect(clusters[0].whyThisMatters.join(' ')).toContain('independent sources');
  });

  it('prioritizes direct institutional evidence for significance', () => {
    const clusters = clusterReaderItems([
      item({ link: 'https://news.example/a', provenance: 'contextual-monitoring', sourceTier: 'contextual' }),
      item({ link: 'https://gov.in/b', title: 'KWIN industrial policy publication', provenance: 'direct-institutional' }),
    ]);
    expect(sortReaderClusters(clusters, 'significance')[0].representative.provenance).toBe('direct-institutional');
  });
});
