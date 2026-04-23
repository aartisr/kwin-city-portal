'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    __kwinClarityInitialized?: boolean;
  }
}

const CLARITY_PROJECT_ID = 'w90fdbtt4x';
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || CLARITY_PROJECT_ID;

export default function ClarityInit() {
  useEffect(() => {
    let cancelled = false;

    async function initClarity() {
      if (window.__kwinClarityInitialized) {
        return;
      }

      const { default: Clarity } = await import('@microsoft/clarity');
      if (cancelled || window.__kwinClarityInitialized) {
        return;
      }

      Clarity.init(clarityProjectId);
      window.__kwinClarityInitialized = true;
    }

    void initClarity();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
