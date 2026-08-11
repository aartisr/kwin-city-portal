'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const PwaRegistration = dynamic(() => import('@/components/PwaRegistration'), { ssr: false });
const PwaInstallPrompt = dynamic(() => import('@/components/PwaInstallPrompt'), { ssr: false });
const PageAnalytics = dynamic(() => import('@/components/PageAnalytics'), { ssr: false });
const ClarityInit = dynamic(() => import('@/components/ClarityInit'), { ssr: false });
const PostHogInit = dynamic(() => import('@/components/PostHogInit'), { ssr: false });

export default function ClientEnhancements() {
  const [shouldEnhance, setShouldEnhance] = useState(false);
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false);

  useEffect(() => {
    const browser = globalThis as typeof globalThis & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const activate = () => setShouldEnhance(true);

    if (typeof browser.requestIdleCallback === 'function') {
      const idleId = browser.requestIdleCallback(activate, { timeout: 1500 });
      return () => browser.cancelIdleCallback?.(idleId);
    }

    const timeoutId = browser.setTimeout(activate, 800);
    return () => browser.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const browser = globalThis as typeof globalThis & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
      navigator: Navigator & {
        connection?: { effectiveType?: string; saveData?: boolean };
      };
    };
    const connection = browser.navigator.connection;

    // Analytics must never compete with the first render, and should respect
    // explicit data-saving or very slow connection preferences.
    if (connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
      return;
    }

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const activate = () => {
      if (cancelled) return;
      if (typeof browser.requestIdleCallback === 'function') {
        idleId = browser.requestIdleCallback(() => setShouldLoadAnalytics(true), { timeout: 5000 });
      } else {
        timeoutId = browser.setTimeout(() => setShouldLoadAnalytics(true), 3500);
      }
    };

    if (document.readyState === 'complete') {
      activate();
    } else {
      window.addEventListener('load', activate, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', activate);
      if (idleId !== undefined) browser.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) browser.clearTimeout(timeoutId);
    };
  }, []);

  if (!shouldEnhance) {
    return null;
  }

  return (
    <>
      <PwaRegistration />
      <PwaInstallPrompt />
      {shouldLoadAnalytics ? (
        <>
          <PageAnalytics />
          <ClarityInit />
          <PostHogInit />
        </>
      ) : null}
    </>
  );
}
