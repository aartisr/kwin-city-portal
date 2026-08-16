// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { buildIntelligenceBrief } from '../intelligence-brief';
import type { ReaderCluster, ReaderItem } from '../types';

function item(overrides: Partial<ReaderItem> = {}): ReaderItem {
  return {
    title: 'KWIN infrastructure investment announced',
    link: 'https://publisher.example/story',
    summary: 'The publisher reports a new infrastructure investment near KWIN.',
    summarySource: 'publisher-feed',
    source: 'Publisher',
    sourceFeedUrl: 'https://publisher.example/rss',
    sourceTier: 'primary',
    provenance: 'direct-publisher',
    isKwinRelated: true,
    kwinRelevanceReasons: ['infrastructure and connectivity'],
    authenticity: 'verified-feed',
    publishedAt: '2026-08-15T10:00:00.000Z',
    ...overrides,
  };
}

function cluster(items: ReaderItem[]): ReaderCluster {
  return {
    id: 'cluster', title: items[0].title, summary: items[0].summary,
    representative: items[0], items, sourceCount: items.length,
    confidence: 'medium', whyThisMatters: ['infrastructure and connectivity'], score: 90,
  };
}

describe('KWIN intelligence brief', () => {
  it('never upgrades multiple publishers into primary confirmation', () => {
    const selected = item();
    const brief = buildIntelligenceBrief(selected, cluster([
      selected,
      item({ link: 'https://second.example/story', source: 'Second publisher' }),
    ]), new Date('2026-08-15T12:00:00.000Z'));

    expect(brief.evidenceStatus).toBe('corroborated');
    expect(brief.unknown.join(' ')).toContain('No primary document');
    expect(brief.questions.find((entry) => entry.id === 'confirmed')?.answer).toContain('Not by primary evidence');
  });

  it('recognizes direct institutional evidence but preserves qualification', () => {
    const primary = item({
      source: 'Government agency',
      link: 'https://agency.gov.in/order',
      provenance: 'direct-institutional',
      sourceTier: 'official',
    });
    const brief = buildIntelligenceBrief(primary, cluster([primary]));

    expect(brief.evidenceStatus).toBe('confirmed-primary');
    expect(brief.evidenceLabel).toBe('Primary evidence available');
    expect(brief.questions[0].answer).toContain('not every interpretation');
  });

  it('fails closed when a discovery feed supplies no usable summary or timestamp', () => {
    const discovery = item({
      summary: 'Summary unavailable from this feed.',
      summarySource: 'unavailable',
      provenance: 'source-filtered-discovery',
      sourceTier: 'contextual',
      authenticity: 'discovery-feed',
      publishedAt: null,
    });
    const brief = buildIntelligenceBrief(discovery);

    expect(brief.evidenceStatus).toBe('discovery-only');
    expect(brief.whatHappened).toContain('no independently usable article summary');
    expect(brief.unknown).toHaveLength(4);
    expect(brief.timeline[0].at).toBeNull();
  });

  it('orders the coverage timeline oldest to newest', () => {
    const newer = item({ publishedAt: '2026-08-15T12:00:00.000Z' });
    const older = item({ link: 'https://older.example/story', publishedAt: '2026-08-14T12:00:00.000Z' });
    const brief = buildIntelligenceBrief(newer, cluster([newer, older]));

    expect(brief.timeline.map((entry) => entry.at)).toEqual([
      '2026-08-14T12:00:00.000Z',
      '2026-08-15T12:00:00.000Z',
    ]);
  });
});
