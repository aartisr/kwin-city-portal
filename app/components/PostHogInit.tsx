'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { capturePostHogEvent, initPostHog } from '@/lib/analytics/posthog';

export default function PostHogInit() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrlRef = useRef<string>('');

  useEffect(() => {
    let cancelled = false;

    const browser = window as typeof window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const initialize = () => {
      if (!cancelled) {
        initPostHog();
      }
    };

    if (typeof browser.requestIdleCallback === 'function') {
      const idleId = browser.requestIdleCallback(initialize, { timeout: 2000 });
      return () => {
        cancelled = true;
        browser.cancelIdleCallback?.(idleId);
      };
    }

    const timeoutId = browser.setTimeout(initialize, 1000);
    return () => {
      cancelled = true;
      browser.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const query = searchParams?.toString();
    const currentUrl = query ? `${pathname}?${query}` : pathname;

    if (!currentUrl || lastTrackedUrlRef.current === currentUrl) {
      return;
    }

    lastTrackedUrlRef.current = currentUrl;
    capturePostHogEvent('$pageview', {
      $current_url: window.location.href,
      pathname,
      query: query || null,
    });
  }, [pathname, searchParams]);

  return null;
}
