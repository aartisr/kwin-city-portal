'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    // User previously dismissed
    if (localStorage.getItem('kwin-pwa-dismissed-v2') === 'true') return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Delay to avoid being intrusive on first load
      setTimeout(() => setVisible(true), 4000);
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', () => setInstalled(true));

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
    }
    setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem('kwin-pwa-dismissed-v2', 'true');
  };

  return (
    <AnimatePresence>
      {visible && !installed && (
        <motion.div
          key="pwa-prompt"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          className="fixed bottom-4 left-3 right-3 z-[200] max-w-md mx-auto"
        >
          <div className="rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.45)] border border-white/10 bg-[linear-gradient(160deg,#0D1640_0%,#040714_100%)]">
            {/* Accent top border */}
            <div className="h-[3px] bg-gradient-to-r from-amber-400 via-cyan-300 to-amber-300" />

            <div className="p-5">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-13 h-13 rounded-xl flex-shrink-0 flex items-center justify-center font-extrabold text-xl text-[#040714] bg-[linear-gradient(135deg,#F5A623,#E8A020)] shadow-amber-500/40 shadow-lg">
                  K
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-amber-400 mb-1">
                    Install App
                  </p>
                  <h3 className="text-white font-extrabold text-[16px] leading-tight mb-1">
                    KWIN City on your Phone
                  </h3>
                  <p className="text-[#7C8EA6] text-[13px] leading-5">
                    Instant access, works offline, no app store needed.
                  </p>
                </div>

                <button
                  onClick={handleDismiss}
                  aria-label="Dismiss"
                  className="text-[#4F6280] hover:text-white transition-colors p-1 flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex gap-2.5 mt-4">
                <button
                  onClick={handleInstall}
                  className="flex-1 bg-[linear-gradient(135deg,#F5A623,#E8A020)] text-[#040714] text-sm font-extrabold py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Install Free →
                </button>
                <Link
                  href="/download"
                  onClick={handleDismiss}
                  className="flex-1 text-center border border-white/15 text-[#94A3B8] hover:text-white text-sm font-semibold py-2.5 rounded-xl hover:border-white/25 transition-colors"
                >
                  See all options
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
