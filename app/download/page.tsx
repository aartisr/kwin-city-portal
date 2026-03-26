import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFrame from '@/components/SiteFrame';

export const metadata: Metadata = {
  title: 'Get the KWIN City App | Install on Android & iOS',
  description:
    'Install the KWIN City intelligence portal as a free app on your Android or iPhone. No app store required. Works offline. Nobel Prize quality.',
  alternates: { canonical: 'https://kwin-city.com/download' },
};

const steps = {
  android: [
    {
      num: '01',
      title: 'Open in Chrome',
      body: 'Visit kwin-city.com in Chrome on your Android device.',
    },
    {
      num: '02',
      title: 'Tap the banner',
      body: 'A "Install app" banner appears automatically. Tap it — or use Chrome menu → "Add to Home screen".',
    },
    {
      num: '03',
      title: 'Confirm install',
      body: 'Tap "Add" in the dialog. KWIN City appears on your home screen like any native app.',
    },
  ],
  ios: [
    {
      num: '01',
      title: 'Open in Safari',
      body: 'Visit kwin-city.com in Safari on your iPhone or iPad.',
    },
    {
      num: '02',
      title: 'Tap Share button',
      body: 'Tap the Share icon (box with arrow) at the bottom of your screen.',
    },
    {
      num: '03',
      title: 'Add to Home Screen',
      body: 'Scroll to "Add to Home Screen" and tap it. KWIN City is now a full-screen app on your device.',
    },
  ],
};

const features = [
  { icon: '⚡', title: 'Blazing Fast', body: 'Next.js 15 optimised, cached locally on your device.' },
  { icon: '📶', title: 'Works Offline', body: 'Browse previously visited pages with no internet.' },
  { icon: '🔒', title: 'Privacy First', body: 'No tracking, no login required. Read freely.' },
  { icon: '🔔', title: 'Always Current', body: 'Auto-updates silently in the background.' },
  { icon: '📱', title: 'Native Feel', body: 'Full-screen, no browser chrome, portrait-optimised.' },
  { icon: '🆓', title: 'Completely Free', body: 'No app store, no account, no subscription ever.' },
];

export default function DownloadPage() {
  const url = 'https://kwin-city.com';

  return (
    <SiteFrame>
      <main className="bg-[linear-gradient(180deg,#040714_0%,#061027_60%,#040714_100%)] text-white min-h-screen">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          {/* Ambient glows */}
          <div aria-hidden className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[130px] bg-amber-500/10 pointer-events-none" />
          <div aria-hidden className="absolute top-1/2 left-10 w-[400px] h-[400px] rounded-full blur-[100px] bg-cyan-500/8 pointer-events-none" />

          <div className="container relative z-10 text-center max-w-3xl mx-auto">
            {/* App icon */}
            <div className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center font-extrabold text-4xl text-[#040714] bg-[linear-gradient(135deg,#F5A623,#E8A020)] shadow-2xl shadow-amber-500/40 mb-8">
              K
            </div>

            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-amber-400 mb-5">
              Free App · Android & iOS
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              KWIN City<br />
              <span className="bg-gradient-to-r from-amber-400 to-cyan-300 bg-clip-text text-transparent">
                in your pocket
              </span>
            </h1>
            <p className="text-[#7C8EA6] text-lg md:text-xl leading-8 mb-10 max-w-2xl mx-auto">
              Install the full intelligence portal on any smartphone — no app store, no fee, no bloat.
              It&apos;s a <strong className="text-white">Progressive Web App</strong> that installs direct from Chrome or Safari.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-extrabold text-[#040714] bg-[linear-gradient(135deg,#F5A623,#E8A020)] hover:opacity-90 transition-opacity text-base shadow-xl shadow-amber-500/30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
                Open & Install Now
              </a>
              <a
                href="https://github.com/aartisr/kwin-city-portal/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-[#94A3B8] border border-white/15 hover:text-white hover:border-white/25 hover:bg-white/[0.05] transition-all text-base"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Download APK (Android)
              </a>
            </div>

            <p className="mt-5 text-[#4F6280] text-xs">
              APK = direct install file for Android · No Google Play account needed
            </p>
          </div>
        </section>

        {/* ── Features grid ────────────────────────────────── */}
        <section className="container py-16 max-w-5xl mx-auto">
          <p className="text-center text-[11px] font-bold tracking-[0.22em] uppercase text-amber-400 mb-10">
            Why the KWIN App
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 hover:bg-white/[0.07] transition-colors"
              >
                <span className="text-2xl mb-3 block">{f.icon}</span>
                <h3 className="font-extrabold text-white text-sm mb-1">{f.title}</h3>
                <p className="text-[#7C8EA6] text-[13px] leading-5">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Install guides ────────────────────────────────── */}
        <section className="container py-16 max-w-5xl mx-auto">
          <p className="text-center text-[11px] font-bold tracking-[0.22em] uppercase text-amber-400 mb-3">
            Step-by-Step Installation
          </p>
          <h2 className="text-center text-3xl font-extrabold text-white mb-12">
            3 taps to install
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Android */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03]">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/8 bg-white/[0.04]">
                <svg className="w-5 h-5 text-[#3DDC84]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.523 15.341l.001-.001 2.757-4.775a.5.5 0 00-.866-.5l-2.792 4.833A9.056 9.056 0 0112 14.25a9.056 9.056 0 01-4.623-1.352L4.585 8.065a.5.5 0 00-.866.5l2.757 4.775C4.643 14.72 3.25 17.064 3 19.75h18c-.25-2.686-1.643-5.03-3.477-6.409z" />
                </svg>
                <span className="font-bold text-white text-sm">Android</span>
                <span className="ml-auto text-[#4F6280] text-xs">Chrome browser</span>
              </div>
              <div className="p-6 space-y-5">
                {steps.android.map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <span className="text-[11px] font-extrabold text-amber-400 tracking-widest mt-0.5 shrink-0 w-6">
                      {step.num}
                    </span>
                    <div>
                      <p className="font-bold text-white text-sm mb-0.5">{step.title}</p>
                      <p className="text-[#7C8EA6] text-[13px] leading-5">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* iOS */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03]">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/8 bg-white/[0.04]">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83z" />
                </svg>
                <span className="font-bold text-white text-sm">iPhone / iPad</span>
                <span className="ml-auto text-[#4F6280] text-xs">Safari browser</span>
              </div>
              <div className="p-6 space-y-5">
                {steps.ios.map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <span className="text-[11px] font-extrabold text-amber-400 tracking-widest mt-0.5 shrink-0 w-6">
                      {step.num}
                    </span>
                    <div>
                      <p className="font-bold text-white text-sm mb-0.5">{step.title}</p>
                      <p className="text-[#7C8EA6] text-[13px] leading-5">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── APK direct download ───────────────────────────── */}
        <section className="container py-16 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(245,166,35,0.07),rgba(6,182,212,0.05))] p-8 text-center">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-amber-400 mb-3">
              Advanced · Android Only
            </p>
            <h2 className="text-2xl font-extrabold text-white mb-3">Download APK Directly</h2>
            <p className="text-[#7C8EA6] mb-6 leading-7">
              For power users who prefer sideloading: download the Android APK from GitHub Releases.
              This is a Trusted Web Activity wrapper — same experience, native app container.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://github.com/aartisr/kwin-city-portal/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#040714] bg-[linear-gradient(135deg,#F5A623,#E8A020)] hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Latest APK
              </a>
              <a
                href="https://github.com/aartisr/kwin-city-portal/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#94A3B8] border border-white/15 hover:text-white hover:border-white/25 transition-all"
              >
                All Releases ↗
              </a>
            </div>
            <div className="mt-5 text-[#4F6280] text-xs leading-5 space-y-1">
              <p>To sideload: Settings → Security → <em>Install unknown apps</em> → Allow Chrome/Files Manager</p>
              <p>Built automatically via GitHub Actions · Trusted Web Activity (TWA) · No tracking</p>
            </div>
          </div>
        </section>

        {/* ── Footer CTA ─────────────────────────────────────── */}
        <section className="container pb-24 text-center max-w-lg mx-auto">
          <p className="text-[#4F6280] text-sm leading-6 mb-6">
            The PWA approach means zero maintenance cost, always up-to-date content,
            and feature-parity with any native app for a knowledge portal.
          </p>
          <Link
            href="/"
            className="text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors"
          >
            ← Back to KWIN City Portal
          </Link>
        </section>

      </main>
    </SiteFrame>
  );
}
