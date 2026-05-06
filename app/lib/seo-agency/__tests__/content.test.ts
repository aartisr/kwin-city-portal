// @vitest-environment node

import { createKwinSeoAgencyRun } from '../content';
import { scoreKwinRelevance } from '../news';
import type { KwinNewsSignal } from '../types';

const signal: KwinNewsSignal = {
  title: 'KWIN City update near Doddaballapura and North Bengaluru',
  url: 'https://example.com/kwin-city',
  source: 'Example News',
  summary: 'A source-led report mentions KIADB, KWIN City, and the Bengaluru airport corridor.',
  publishedAt: '2026-05-05T00:00:00.000Z',
  relevanceScore: 92,
  matchedTerms: ['kwin city', 'doddaballapura', 'north bengaluru', 'kiadb'],
  evidenceStatus: 'contextual',
  recommendedAngle: 'Frame as source-linked regional intelligence.',
};

describe('KWIN SEO agency content generation', () => {
  it('scores direct KWIN City signals higher than generic Bengaluru stories', () => {
    const direct = scoreKwinRelevance({
      title: 'KWIN City and KIADB update near Doddaballapura',
      summary: 'North Bengaluru corridor context for Knowledge Wellbeing Innovation City.',
      source: 'The Hindu - Bengaluru',
    });
    const generic = scoreKwinRelevance({
      title: 'Bengaluru weather update',
      summary: 'City traffic and rain updates.',
      source: 'Generic source',
    });

    expect(direct.relevanceScore).toBeGreaterThan(generic.relevanceScore);
    expect(direct.matchedTerms).toContain('kwin city');
  });

  it('creates daily, weekly, monthly, and yearly snapshots', () => {
    const run = createKwinSeoAgencyRun({
      now: new Date('2026-05-05T02:00:00.000Z'),
      newsSignals: [signal],
    });

    expect(run.runDate).toBe('2026-05-05');
    expect(run.newsSignals[0].title).toBe(signal.title);
    expect(run.socialQueue.map((draft) => draft.platform)).toEqual(['instagram', 'facebook', 'linkedin', 'x']);
    expect(run.snapshots.map((snapshot) => snapshot.cadence)).toEqual(['daily', 'weekly', 'monthly', 'yearly']);
    expect(run.dailyArticle.slug).toBe(run.dailyBrief.slug);
    expect(run.dailyArticle.sections.length).toBeGreaterThanOrEqual(5);
    expect(run.dailyArticle.canonicalUrl).toContain('/seo-agency/articles/');
    expect(run.socialQueue.every((draft) => draft.link.includes('/seo-agency/articles/'))).toBe(true);
    expect(run.socialQueue.find((draft) => draft.platform === 'instagram')?.mediaUrl).toContain('/instagram-image');
    expect(run.dailyBrief.internalLinks.some((link) => link.href === '/news-intelligence')).toBe(true);
  });
});
