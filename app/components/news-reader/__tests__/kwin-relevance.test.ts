// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { scoreKwinRelevance } from '../kwin-relevance';

describe('KWIN editorial relevance', () => {
  it.each([
    'Campaign against Yettinahole project to intensify in coming days',
    'Greens urge MP to save Nethravati River',
    'Toyota To Set Up 300-Acre Technology & Manufacturing Hub Near Bengaluru',
    'We Compete Globally Not With Other States: Karnataka Minister',
  ])('rejects live discovery false positive: %s', (title) => {
    expect(scoreKwinRelevance(title, `${title} Publisher`).isRelevant).toBe(
      false,
    );
  });

  it('gives the strongest score to an explicit KWIN City headline', () => {
    const result = scoreKwinRelevance(
      'Bengaluru semiconductor park in KWIN City to open in December',
      'The KIADB-backed development is near Doddaballapura in North Bengaluru.',
    );
    expect(result.isRelevant).toBe(true);
    expect(result.score).toBe(100);
    expect(result.reasons).toContain('KWIN City named in headline');
  });

  it('recognizes the full name and the KHIR City legacy name', () => {
    expect(
      scoreKwinRelevance(
        'Knowledge, Wellbeing and Innovation City receives university interest',
        '',
      ).isRelevant,
    ).toBe(true);
    expect(
      scoreKwinRelevance('KHIR City planning record published', '').score,
    ).toBeGreaterThan(0);
  });

  it('recognizes the official Wellness spelling and Kannada KWIN City', () => {
    expect(
      scoreKwinRelevance(
        'Knowledge, Wellness and Innovation City advances',
        '',
      ).isRelevant,
    ).toBe(true);
    expect(
      scoreKwinRelevance(
        'ಕ್ವಿನ್ ಸಿಟಿಯಲ್ಲಿ ಸೆಮಿಕಂಡಕ್ಟರ್ ಪಾರ್ಕ್ ಆರಂಭ',
        '',
      ).isRelevant,
    ).toBe(true);
  });

  it('allows a body-only explicit identity match at a lower confidence score', () => {
    const result = scoreKwinRelevance(
      'University expansion proposed near Bengaluru',
      'The institution is evaluating an expansion inside KWIN City.',
    );
    expect(result.isRelevant).toBe(true);
    expect(result.score).toBeLessThan(100);
  });
});
