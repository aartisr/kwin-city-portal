import { describe, expect, it } from 'vitest';
import { getTranslatedText, translateGroupLabel, translateNavItem } from '@/components/header/i18n';

describe('header/i18n', () => {
  const t = (key: string) => {
    const messages: Record<string, string> = {
      'header.groups.Discover': 'Discover',
      'header.items./about.label': 'About',
      'header.items./about.desc': 'Mission and framework',
    };
    return messages[key] ?? key;
  };

  it('translates group labels using expected key namespace', () => {
    expect(translateGroupLabel(t, 'Discover')).toBe('Discover');
  });

  it('returns fallback text for missing keys', () => {
    expect(getTranslatedText(t, 'missing.key', 'Fallback')).toBe('Fallback');
    expect(getTranslatedText(t, 'missing.key')).toBe('missing.key');
  });

  it('translates nav labels and descriptions while preserving href', () => {
    const translated = translateNavItem(t, {
      label: 'About KWIN',
      href: '/about',
      desc: 'Original',
    });

    expect(translated.label).toBe('About');
    expect(translated.desc).toBe('Mission and framework');
    expect(translated.href).toBe('/about');
  });
});
