'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

declare global {
  interface Window {
    __kwinClarityInitialized?: boolean;
  }
}

const CLARITY_PROJECT_ID = 'w90fdbtt4x';
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || CLARITY_PROJECT_ID;

export default function ClarityInit() {
  useEffect(() => {
    if (window.__kwinClarityInitialized) {
      return;
    }

    Clarity.init(clarityProjectId);
    window.__kwinClarityInitialized = true;
  }, []);

  return null;
}