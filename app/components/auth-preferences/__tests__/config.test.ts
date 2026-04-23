import { describe, expect, it } from 'vitest';
import { allTopics, defaultPreferences } from '@/components/auth-preferences/config';

describe('auth-preferences/config', () => {
  it('keeps safe defaults for first-time preference state', () => {
    expect(defaultPreferences.persona).toBe('resident');
    expect(defaultPreferences.favoriteTopics).toContain('timeline');
    expect(defaultPreferences.digestFrequency).toBe('weekly');
    expect(defaultPreferences.emailUpdates).toBe(true);
  });

  it('exposes all saved topic keys used by the preferences form', () => {
    expect(allTopics).toEqual([
      'timeline',
      'sectors',
      'sustainability',
      'evidence',
      'news-intelligence',
    ]);
  });
});
