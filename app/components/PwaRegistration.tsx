'use client';

import { useEffect } from 'react';

export default function PwaRegistration() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              // New content available — could show a toast here
              console.info('[KWIN SW] New version available. Refresh to update.');
            }
          });
        });
      })
      .catch((err) => {
        console.warn('[KWIN SW] Registration failed:', err);
      });
  }, []);

  return null;
}
