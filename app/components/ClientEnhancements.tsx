'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const PwaRegistration = dynamic(() => import('@/components/PwaRegistration'), { ssr: false });
const PwaInstallPrompt = dynamic(() => import('@/components/PwaInstallPrompt'), { ssr: false });
const PageAnalytics = dynamic(() => import('@/components/PageAnalytics'), { ssr: false });
const ClarityInit = dynamic(() => import('@/components/ClarityInit'), { ssr: false });

export default function ClientEnhancements() {
  const [shouldEnhance, setShouldEnhance] = useState(false);

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

  if (!shouldEnhance) {
    return null;
  }

  return (
    <>
      <PwaRegistration />
      <PwaInstallPrompt />
      <PageAnalytics />
      <ClarityInit />
    </>
  );
}
