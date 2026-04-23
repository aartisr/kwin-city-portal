import { describe, expect, it } from 'vitest';
import { frequencyLabel, topicLabel } from '@/components/auth-preferences/labels';

describe('auth-preferences/labels', () => {
  const l = (values: { en: string }) => values.en;

  it('maps known topic ids to stable display labels', () => {
    expect(topicLabel('timeline', l)).toBe('Timeline');
    expect(topicLabel('news-intelligence', l)).toBe('News Intelligence');
  });

  it('falls back to raw topic ids for unknown values', () => {
    expect(topicLabel('custom-topic', l)).toBe('custom-topic');
  });

  it('maps digest frequencies to labels', () => {
    expect(frequencyLabel('daily', l)).toBe('Daily');
    expect(frequencyLabel('weekly', l)).toBe('Weekly');
    expect(frequencyLabel('monthly', l)).toBe('Monthly');
  });
});
