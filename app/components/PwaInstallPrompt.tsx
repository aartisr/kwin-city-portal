"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PWA_CONFIG } from "@/lib/pwa/config";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const DISMISSAL_KEY = "kwin-pwa-install-dismissed-at";

function isStandalone() {
  const navigatorWithStandalone = navigator as Navigator & {
    standalone?: boolean;
  };
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    navigatorWithStandalone.standalone === true
  );
}

function dismissalIsActive() {
  try {
    const dismissedAt = Number(localStorage.getItem(DISMISSAL_KEY));
    const lifetime = PWA_CONFIG.installDismissalDays * 24 * 60 * 60 * 1000;
    return Number.isFinite(dismissedAt) && Date.now() - dismissedAt < lifetime;
  } catch {
    return false;
  }
}

export default function PwaInstallPrompt() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const isIos = useMemo(
    () =>
      typeof navigator !== "undefined" &&
      /iphone|ipad|ipod/i.test(navigator.userAgent),
    [],
  );

  useEffect(() => {
    if (isStandalone() || dismissalIsActive()) return;
    let revealTimer: ReturnType<typeof setTimeout> | undefined;

    const reveal = () => {
      if (revealTimer) clearTimeout(revealTimer);
      revealTimer = setTimeout(() => setVisible(true), 5_000);
    };
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as BeforeInstallPromptEvent);
      reveal();
    };
    const onInstalled = () => {
      setInstalled(true);
      setVisible(false);
      setPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if (isIos) reveal();

    return () => {
      if (revealTimer) clearTimeout(revealTimer);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [isIos]);

  const install = async () => {
    if (!prompt) {
      setShowIosHelp(true);
      return;
    }
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === "accepted") setInstalled(true);
    } finally {
      setPrompt(null);
      setVisible(false);
    }
  };

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISSAL_KEY, String(Date.now()));
    } catch {
      // Storage can be unavailable in private browsing; dismissal still works now.
    }
  };

  return (
    <AnimatePresence>
      {visible && !installed ? (
        <motion.aside
          key="pwa-install"
          initial={{ y: 100, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed inset-x-3 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[240] mx-auto max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(150deg,rgba(13,22,64,.98),rgba(4,7,20,.98))] text-white shadow-[0_30px_90px_rgba(0,0,0,.55)] backdrop-blur-2xl"
          aria-labelledby="pwa-install-title"
        >
          <div className="h-1 bg-gradient-to-r from-amber-400 via-cyan-300 to-indigo-400" />
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 text-2xl font-black text-[#040714] shadow-lg shadow-amber-500/20">
                K
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[.22em] text-cyan-300">
                  Your city intelligence, elevated
                </p>
                <h2
                  id="pwa-install-title"
                  className="text-lg font-black leading-tight"
                >
                  Install KWIN City
                </h2>
                <p className="mt-1 text-sm leading-5 text-slate-300">
                  Faster launches, an offline safety net, and no app store
                  required.
                </p>
              </div>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss install suggestion for 30 days"
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </div>

            {showIosHelp ? (
              <div className="mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-300/[.06] p-3 text-sm leading-6 text-slate-200">
                In Safari, tap <strong>Share</strong>, then choose{" "}
                <strong>Add to Home Screen</strong> and confirm{" "}
                <strong>Add</strong>.
              </div>
            ) : null}

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={install}
                className="rounded-xl bg-gradient-to-r from-amber-300 to-orange-400 px-4 py-3 text-sm font-black text-[#040714] transition hover:brightness-105"
              >
                {isIos && !prompt ? "How to install" : "Install free"}
              </button>
              <Link
                href="/download"
                onClick={dismiss}
                className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-bold text-slate-200 transition hover:border-white/30 hover:bg-white/[.06]"
              >
                Explore the app
              </Link>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
