"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PWA_CONFIG } from "@/lib/pwa/config";

export default function PwaRegistration() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );
  const [isOnline, setIsOnline] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const reloadOnControllerChange = useRef(false);

  const applyUpdate = useCallback(() => {
    if (!waitingWorker) return;
    reloadOnControllerChange.current = true;
    setIsUpdating(true);
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
  }, [waitingWorker]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) =>
          Promise.all(
            registrations.map((registration) => registration.unregister()),
          ),
        )
        .catch(() => undefined);
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | undefined;
    let disposed = false;

    const observeRegistration = (registration: ServiceWorkerRegistration) => {
      if (registration.waiting && navigator.serviceWorker.controller) {
        setWaitingWorker(registration.waiting);
      }
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener("statechange", () => {
          if (
            worker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            setWaitingWorker(worker);
          }
        });
      });
      intervalId = setInterval(
        () => registration.update().catch(() => undefined),
        PWA_CONFIG.updateCheckIntervalMs,
      );
    };

    navigator.serviceWorker
      .register(PWA_CONFIG.serviceWorkerUrl, {
        scope: PWA_CONFIG.serviceWorkerScope,
        updateViaCache: "none",
      })
      .then((registration) => {
        if (!disposed) observeRegistration(registration);
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[PWA] Service worker registration failed.", error);
        }
      });

    const onControllerChange = () => {
      if (reloadOnControllerChange.current) window.location.reload();
    };
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      onControllerChange,
    );

    return () => {
      disposed = true;
      if (intervalId) clearInterval(intervalId);
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        onControllerChange,
      );
    };
  }, []);

  useEffect(() => {
    const sync = () => setIsOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[250] flex flex-col items-center gap-2 p-3"
      aria-live="polite"
      aria-atomic="true"
    >
      {!isOnline ? (
        <div className="pointer-events-auto flex max-w-lg items-center gap-3 rounded-full border border-amber-300/30 bg-[#07101f]/95 px-4 py-2 text-sm font-semibold text-white shadow-2xl backdrop-blur-xl">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400" />
          Offline mode · showing saved content where available
        </div>
      ) : null}

      {waitingWorker ? (
        <div className="pointer-events-auto flex w-full max-w-lg items-center gap-3 rounded-2xl border border-cyan-300/20 bg-[#07101f]/95 p-3 text-white shadow-2xl backdrop-blur-xl">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-amber-300 font-black text-[#040714]">
            K
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold">
              A fresher KWIN City is ready
            </p>
            <p className="text-xs text-slate-300">
              Update safely without losing your place.
            </p>
          </div>
          <button
            type="button"
            onClick={applyUpdate}
            disabled={isUpdating}
            className="rounded-xl bg-amber-300 px-4 py-2 text-xs font-extrabold text-[#040714] transition hover:bg-amber-200 disabled:opacity-60"
          >
            {isUpdating ? "Updating…" : "Update"}
          </button>
          <button
            type="button"
            onClick={() => setWaitingWorker(null)}
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Dismiss update notification"
          >
            ×
          </button>
        </div>
      ) : null}
    </div>
  );
}
