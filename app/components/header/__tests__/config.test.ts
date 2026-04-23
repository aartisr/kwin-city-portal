import { describe, expect, it } from 'vitest';
import { GROUP_STORIES, splitItems } from '@/components/header/config';

describe('header/config', () => {
  it('defines a story block for each top-level header lane', () => {
    expect(Object.keys(GROUP_STORIES)).toEqual([
      'discover',
      'ecosystem',
      'research',
      'intelligence',
      'audiences',
    ]);
  });

  it('splits item arrays into balanced columns', () => {
    const [left, right] = splitItems([
      { label: 'A', href: '/a' },
      { label: 'B', href: '/b' },
      { label: 'C', href: '/c' },
      { label: 'D', href: '/d' },
      { label: 'E', href: '/e' },
    ]);

    expect(left).toHaveLength(3);
    expect(right).toHaveLength(2);
    expect([...left, ...right].map((item) => item.href)).toEqual(['/a', '/b', '/c', '/d', '/e']);
  });
});
