import React, { useState } from 'react';
import { Download, Sparkles, X, Share2, CheckCircle2, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallBadgeProps {
  variant?: 'compact' | 'expanded';
  className?: string;
}

export const PWAInstallBadge: React.FC<PWAInstallBadgeProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // If already installed, show a subtle active PWA badge or null if compact
  if (isInstalled) {
    if (variant === 'compact') {
      return (
        <div
          title="Running in Standalone PWA Mode (Offline Enabled)"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-medium text-emerald-400 select-none ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>PWA Active</span>
        </div>
      );
    }
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const installed = await install();
      if (installed) {
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 4000);
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Direct browser fallback guidance
      setShowIOSModal(true);
    }
  };

  return (
    <>
      {/* Subtle Install Trigger Badge */}
      <button
        onClick={handleInstallClick}
        aria-label="Install KWIN City App"
        title="Install KWIN City Portal as a Progressive Web App (Offline & Fast Access)"
        className={`group relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 text-[11px] font-medium text-slate-300 hover:text-emerald-300 transition-all duration-200 cursor-pointer shadow-sm ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <Download className="w-3 h-3 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
        <span className="tracking-tight">
          {variant === 'compact' ? 'Install App' : 'Install KWIN App'}
        </span>
        <span className="hidden sm:inline-block text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-400 group-hover:text-emerald-400 border border-slate-700/50">
          PWA
        </span>
      </button>

      {/* iOS / General Install Guidance Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Install KWIN City Portal</h3>
                <p className="text-xs text-slate-400">Offline-first research app</p>
              </div>
            </div>

            <div className="space-y-3 my-4 text-xs text-slate-300">
              {isIOS ? (
                <>
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-800/50 border border-slate-800">
                    <span className="font-mono text-emerald-400 font-semibold">1.</span>
                    <span>
                      Tap the <strong className="text-white">Share</strong> button <Share2 className="w-3.5 h-3.5 inline mx-0.5 text-emerald-400" /> in Safari’s toolbar.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-800/50 border border-slate-800">
                    <span className="font-mono text-emerald-400 font-semibold">2.</span>
                    <span>
                      Scroll down and select <strong className="text-white">Add to Home Screen</strong>.
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-800/50 border border-slate-800">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Use Chrome or Edge address bar install icon <Download className="w-3 h-3 inline mx-0.5 text-emerald-400" /> or browser menu <strong>Install app</strong> for instant desktop & mobile access.
                    </span>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full mt-2 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-xs transition cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-xs shadow-xl animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>KWIN City Portal installed successfully!</span>
        </div>
      )}
    </>
  );
};
