import { useCallback, useEffect, useState } from 'react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { SearchEntry } from '@/lib/search-index';
import { querySearchIndex } from '@/lib/search-index';

export function useSearchNavigation({
  query,
  open,
  onClose,
  router,
  popular,
}: {
  query: string;
  open: boolean;
  onClose: () => void;
  router: AppRouterInstance;
  popular: SearchEntry[];
}) {
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    const found = querySearchIndex(query, 12);
    setResults(found);
    setActiveIndex(0);
  }, [open, query]);

  const displayed = query.trim() ? results : popular;

  const handleKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (displayed.length === 0) {
        if (e.key === 'Escape') onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % displayed.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + displayed.length) % displayed.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const chosen = displayed[activeIndex];
        if (chosen) {
          onClose();
          router.push(chosen.href);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [activeIndex, displayed, onClose, router],
  );

  return {
    results,
    activeIndex,
    displayed,
    setActiveIndex,
    handleKey,
  };
}
