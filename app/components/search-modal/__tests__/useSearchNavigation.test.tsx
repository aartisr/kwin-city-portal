import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useSearchNavigation } from '@/components/search-modal/useSearchNavigation';
import type { SearchEntry } from '@/lib/search-index';

vi.mock('@/lib/search-index', () => ({
  querySearchIndex: vi.fn((query: string, limit: number) => {
    if (!query.trim()) {
      return [];
    }
    return [
      {
        id: 'about',
        title: 'About',
        description: 'About page',
        category: 'Page',
        href: '/about',
        icon: 'A',
        tags: ['about'],
      },
      {
        id: 'timeline',
        title: 'Timeline',
        description: 'Timeline page',
        category: 'Timeline',
        href: '/timeline',
        icon: 'T',
        tags: ['timeline'],
      },
    ].slice(0, limit);
  }),
}));

describe('search-modal/useSearchNavigation', () => {
  const popular: SearchEntry[] = [
    {
      id: 'home',
      title: 'Home',
      description: 'Homepage',
      category: 'Page',
      href: '/',
      icon: 'H',
      tags: ['home'],
    },
  ];

  it('uses popular items when query is empty', () => {
    const router = { push: vi.fn() } as any;
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      useSearchNavigation({
        query: '',
        open: true,
        onClose,
        router,
        popular,
      }),
    );

    expect(result.current.displayed).toEqual(popular);
    expect(result.current.activeIndex).toBe(0);
  });

  it('navigates keyboard selection and pushes route on Enter', () => {
    const router = { push: vi.fn() } as any;
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      useSearchNavigation({
        query: 'about',
        open: true,
        onClose,
        router,
        popular,
      }),
    );

    expect(result.current.displayed.length).toBeGreaterThan(0);

    act(() => {
      result.current.handleKey({
        key: 'ArrowDown',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleKey({
        key: 'Enter',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalled();
  });

  it('closes on Escape even with no results', () => {
    const router = { push: vi.fn() } as any;
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      useSearchNavigation({
        query: '',
        open: false,
        onClose,
        router,
        popular: [],
      }),
    );

    act(() => {
      result.current.handleKey({
        key: 'Escape',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(router.push).not.toHaveBeenCalled();
  });
});
