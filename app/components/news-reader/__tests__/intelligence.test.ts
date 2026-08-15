// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clusterReaderItems, explainReaderRank, rankKwinClusters, rankRegionalClusters, scoreReaderItem, sortReaderClusters } from '../intelligence';
import type { ReaderItem } from '../types';

function item(overrides: Partial<ReaderItem>): ReaderItem {
  return {
    title: 'KWIN transit corridor receives approval', link: 'https://example.com/a', summary: 'KWIN transit corridor receives approval for Bengaluru.', fullContent: '', source: 'Example', sourceFeedUrl: 'https://example.com/rss', sourceTier: 'official', provenance: 'direct-institutional', authenticity: 'verified-feed', isKwinRelated: true, publishedAt: '2026-08-10T00:00:00.000Z', ...overrides,
  };
}

describe('reader intelligence', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-10T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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

  it('splits unrelated stories into separate clusters and sorts by source breadth/newest', () => {
    const clusters = clusterReaderItems([
      item({
        link: 'https://publisher-a.example/a',
        originalLink: 'https://publisher-a.example/a',
        title: 'KWIN logistics policy milestone',
        publishedAt: '2026-08-10T10:00:00.000Z',
      }),
      item({
        link: 'https://publisher-b.example/b',
        originalLink: 'https://publisher-b.example/b',
        title: 'KWIN logistics policy milestone',
        provenance: 'direct-publisher',
        sourceTier: 'primary',
        publishedAt: '2026-08-10T09:00:00.000Z',
      }),
      item({
        link: 'https://context.example/c',
        title: 'Independent lake restoration briefing',
        summary: 'Hydrology and lake governance update',
        provenance: 'contextual-monitoring',
        sourceTier: 'contextual',
        publishedAt: '2026-08-08T09:00:00.000Z',
      }),
    ]);

    expect(clusters).toHaveLength(2);
    expect(sortReaderClusters(clusters, 'source-breadth')[0].sourceCount).toBe(2);
    expect(sortReaderClusters(clusters, 'newest')[0].representative.publishedAt).toBe('2026-08-10T10:00:00.000Z');
  });

  it('scores and explains provenance-specific ranking reasons', () => {
    const institutional = item({ provenance: 'direct-institutional', publishedAt: '2026-08-10T11:00:00.000Z' });
    const contextual = item({ provenance: 'contextual-monitoring', publishedAt: null });

    expect(scoreReaderItem(institutional)).toBeGreaterThan(scoreReaderItem(contextual));
    expect(explainReaderRank(item({ provenance: 'direct-publisher' }), 1)).toContain('direct publisher feed');
    expect(explainReaderRank(item({ provenance: 'source-filtered-discovery' }), 1)).toContain('source-filtered discovery signal');
    expect(explainReaderRank(item({ provenance: 'contextual-monitoring' }), 1)).toContain('contextual monitoring signal');
  });

  it('ranks explicit KWIN relevance before recency', () => {
    const clusters = clusterReaderItems([
      item({ link: 'https://example.com/strong', title: 'KWIN City infrastructure update', kwinRelevanceScore: 100, publishedAt: '2026-08-09T00:00:00.000Z' }),
      item({ link: 'https://example.com/weak', title: 'KWIN investment update', kwinRelevanceScore: 82, publishedAt: '2026-08-10T11:00:00.000Z' }),
    ]);

    expect(rankKwinClusters(clusters)[0].representative.link).toBe('https://example.com/strong');
  });

  it('prefers infrastructure, investment, and policy in regional intelligence', () => {
    const clusters = clusterReaderItems([
      item({ link: 'https://example.com/general', title: 'Bengaluru cultural festival announced', summary: 'A weekend cultural programme.', isKwinRelated: false, provenance: 'direct-institutional' }),
      item({ link: 'https://example.com/strategic', title: 'Karnataka approves Bengaluru infrastructure investment policy', summary: 'New transport corridors and industrial investment.', isKwinRelated: false, provenance: 'direct-publisher', sourceTier: 'primary' }),
    ]);
    const ranked = rankRegionalClusters(clusters);

    expect(ranked[0].representative.link).toBe('https://example.com/strategic');
    expect(ranked[0].whyThisMatters).toContain('infrastructure and connectivity');
    expect(ranked[0].whyThisMatters).toContain('investment and economic development');
    expect(ranked[0].whyThisMatters).toContain('policy, planning, or regulation');
  });
});
