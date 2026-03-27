import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFrame from '@/components/SiteFrame';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'Get the KWIN City App | Install on Android & iOS',
      kn: 'KWIN City ಆಪ್ ಪಡೆಯಿರಿ | Android ಮತ್ತು iOS ನಲ್ಲಿ ಸ್ಥಾಪಿಸಿ',
      hi: 'KWIN City ऐप प्राप्त करें | Android और iOS पर इंस्टॉल करें',
      ta: 'KWIN City ஆப்பைப் பெறுங்கள் | Android மற்றும் iOS இல் நிறுவுங்கள்',
    }),
    description: pickByLocale(locale, {
      en: 'Install the KWIN City intelligence portal as a free app on your Android or iPhone. No app store required. Works offline.',
      kn: 'KWIN City ಪೋರ್ಟಲ್ ಅನ್ನು ಉಚಿತ ಆಪ್ ಆಗಿ ಸ್ಥಾಪಿಸಿ. ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ.',
      hi: 'KWIN City पोर्टल को मुफ्त ऐप के रूप में इंस्टॉल करें। ऑफ़लाइन भी काम करता है।',
      ta: 'KWIN City தளத்தை உங்கள் Android அல்லது iPhone-ல் இலவச ஆப்பாக நிறுவுங்கள். ஆப் ஸ்டோர் தேவையில்லை. ஆஃப்லைனிலும் செயல்படும்.',
    }),
    alternates: { canonical: 'https://kwin-city.com/download' },
  };
}

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

export default async function DownloadPage() {
  const locale = await getServerLocale();
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
              {pickByLocale(locale, { en: 'Free App · Android & iOS', kn: 'ಉಚಿತ ಆಪ್ · Android ಮತ್ತು iOS', hi: 'मुफ़्त ऐप · Android और iOS' })}
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              KWIN City<br />
              <span className="bg-gradient-to-r from-amber-400 to-cyan-300 bg-clip-text text-transparent">
                {pickByLocale(locale, { en: 'in your pocket', kn: 'ನಿಮ್ಮ ಜೇಬಿನಲ್ಲಿ', hi: 'आपकी जेब में' })}
              </span>
            </h1>
            <p className="text-[#7C8EA6] text-lg md:text-xl leading-8 mb-10 max-w-2xl mx-auto">
              {pickByLocale(locale, {
                en: 'Install the full intelligence portal on any smartphone — no app store, no fee, no bloat. It\'s a Progressive Web App that installs direct from Chrome or Safari.',
                kn: 'ಯಾವುದೇ ಸ್ಮಾರ್ಟ್‌ಫೋನ್‌ನಲ್ಲಿ ಸಂಪೂರ್ಣ ಪೋರ್ಟಲ್ ಅನ್ನು ಸ್ಥಾಪಿಸಿ — ಆಪ್ ಸ್ಟೋರ್ ಬೇಡ, ಶುಲ್ಕ ಬೇಡ, ಅನಗತ್ಯವೂ ಬೇಡ. ಇದು Chrome ಅಥವಾ Safari ನಿಂದ ನೇರವಾಗಿ ಸ್ಥಾಪಿಸಬಹುದಾದ Progressive Web App.',
                hi: 'किसी भी स्मार्टफ़ोन पर पूरा पोर्टल इंस्टॉल करें — न ऐप स्टोर, न शुल्क, न अनावश्यक चीज़ें। यह एक Progressive Web App है जो Chrome या Safari से सीधे इंस्टॉल होता है।',
                ta: 'எந்த ஸ்மார்ட்போனிலும் முழு தளத்தை நிறுவுங்கள் — ஆப் ஸ்டோர் இல்லை, கட்டணம் இல்லை, தேவையற்ற சுமை இல்லை. இது Chrome அல்லது Safari-இலிருந்து நேரடியாக நிறுவப்படும் Progressive Web App.',
              })}
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
                {pickByLocale(locale, { en: 'Open & Install Now', kn: 'ಈಗ ತೆರೆಯಿರಿ ಮತ್ತು ಸ್ಥಾಪಿಸಿ', hi: 'अभी खोलें और इंस्टॉल करें' })}
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
                {pickByLocale(locale, { en: 'Download APK (Android)', kn: 'APK ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (Android)', hi: 'APK डाउनलोड करें (Android)', ta: 'APK பதிவிறக்கவும் (Android)' })}
              </a>
            </div>

            <p className="mt-5 text-[#4F6280] text-xs">
              {pickByLocale(locale, { en: 'APK = direct install file for Android · No Google Play account needed', kn: 'APK = Android‌ಗೆ ನೇರ ಸ್ಥಾಪನೆ ಫೈಲ್ · Google Play ಖಾತೆ ಅಗತ್ಯವಿಲ್ಲ', hi: 'APK = Android के लिए सीधी इंस्टॉल फ़ाइल · Google Play खाता आवश्यक नहीं', ta: 'APK = Android-க்கு நேரடி நிறுவல் கோப்பு · Google Play கணக்கு தேவையில்லை' })}
            </p>
          </div>
        </section>

        {/* ── Features grid ────────────────────────────────── */}
        <section className="container py-16 max-w-5xl mx-auto">
          <p className="text-center text-[11px] font-bold tracking-[0.22em] uppercase text-amber-400 mb-10">
            {pickByLocale(locale, { en: 'Why the KWIN App', kn: 'KWIN ಆಪ್ ಯಾಕೆ', hi: 'KWIN ऐप क्यों' })}
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
            {pickByLocale(locale, { en: 'Step-by-Step Installation', kn: 'ಹಂತ ಹಂತದ ಸ್ಥಾಪನೆ', hi: 'स्टेप-बाय-स्टेप इंस्टॉलेशन' })}
          </p>
          <h2 className="text-center text-3xl font-extrabold text-white mb-12">
            {pickByLocale(locale, { en: '3 taps to install', kn: 'ಸ್ಥಾಪಿಸಲು 3 ಟ್ಯಾಪ್‌ಗಳು', hi: 'इंस्टॉल करने के लिए 3 टैप', ta: 'நிறுவ 3 தட்டல்கள்' })}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Android */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03]">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/8 bg-white/[0.04]">
                <svg className="w-5 h-5 text-[#3DDC84]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.523 15.341l.001-.001 2.757-4.775a.5.5 0 00-.866-.5l-2.792 4.833A9.056 9.056 0 0112 14.25a9.056 9.056 0 01-4.623-1.352L4.585 8.065a.5.5 0 00-.866.5l2.757 4.775C4.643 14.72 3.25 17.064 3 19.75h18c-.25-2.686-1.643-5.03-3.477-6.409z" />
                </svg>
                <span className="font-bold text-white text-sm">Android</span>
                <span className="ml-auto text-[#4F6280] text-xs">{pickByLocale(locale, { en: 'Chrome browser', kn: 'Chrome ಬ್ರೌಸರ್', hi: 'Chrome ब्राउज़र', ta: 'Chrome உலாவி' })}</span>
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
                <span className="ml-auto text-[#4F6280] text-xs">{pickByLocale(locale, { en: 'Safari browser', kn: 'Safari ಬ್ರೌಸರ್', hi: 'Safari ब्राउज़र', ta: 'Safari உலாவி' })}</span>
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
              {pickByLocale(locale, { en: 'Advanced · Android Only', kn: 'ಮುನ್ನಡೆದ · Android ಮಾತ್ರ', hi: 'उन्नत · केवल Android', ta: 'மேம்பட்டது · Android மட்டும்' })}
            </p>
            <h2 className="text-2xl font-extrabold text-white mb-3">{pickByLocale(locale, { en: 'Download APK Directly', kn: 'APK ಅನ್ನು ನೇರವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ', hi: 'APK सीधे डाउनलोड करें', ta: 'APK-ஐ நேரடியாக பதிவிறக்கவும்' })}</h2>
            <p className="text-[#7C8EA6] mb-6 leading-7">
              {pickByLocale(locale, {
                en: 'For power users who prefer sideloading: download the Android APK from GitHub Releases. This is a Trusted Web Activity wrapper — same experience, native app container.',
                kn: 'ಸೈಡ್‌ಲೋಡಿಂಗ್ ಇಷ್ಟಪಡುವ ಪವರ್ ಬಳಕೆದಾರರಿಗೆ: GitHub Releases ನಿಂದ Android APK ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ. ಇದು Trusted Web Activity wrapper — ಅದೇ ಅನುಭವ, native app container.',
                hi: 'साइडलोडिंग पसंद करने वाले पावर यूज़र्स के लिए: GitHub Releases से Android APK डाउनलोड करें। यह Trusted Web Activity wrapper है — वही अनुभव, नेटिव ऐप कंटेनर।',
                ta: 'சைட்லோடிங் விரும்பும் பயனர்களுக்கு: GitHub Releases-இல் இருந்து Android APK-ஐ பதிவிறக்கவும். இது Trusted Web Activity wrapper — அதே அனுபவம், native app container.',
              })}
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
                {pickByLocale(locale, { en: 'Download Latest APK', kn: 'ಇತ್ತೀಚಿನ APK ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ', hi: 'नवीनतम APK डाउनलोड करें', ta: 'புதிய APK-ஐ பதிவிறக்கவும்' })}
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
              <p>{pickByLocale(locale, { en: 'To sideload: Settings → Security → Install unknown apps → Allow Chrome/Files Manager', kn: 'ಸೈಡ್‌ಲೋಡ್ ಮಾಡಲು: Settings → Security → Install unknown apps → Chrome/Files Manager ಗೆ ಅನುಮತಿ', hi: 'साइडलोड के लिए: Settings → Security → Install unknown apps → Chrome/Files Manager को अनुमति दें', ta: 'சைட்லோடு செய்ய: Settings → Security → Install unknown apps → Chrome/Files Manager-ஐ அனுமதி' })}</p>
              <p>{pickByLocale(locale, { en: 'Built automatically via GitHub Actions · Trusted Web Activity (TWA) · No tracking', kn: 'GitHub Actions ಮೂಲಕ ಸ್ವಯಂಚಾಲಿತ ನಿರ್ಮಾಣ · Trusted Web Activity (TWA) · ಟ್ರ್ಯಾಕಿಂಗ್ ಇಲ್ಲ', hi: 'GitHub Actions द्वारा स्वचालित निर्माण · Trusted Web Activity (TWA) · कोई ट्रैकिंग नहीं', ta: 'GitHub Actions மூலம் தானியங்கி உருவாக்கம் · Trusted Web Activity (TWA) · கண்காணிப்பு இல்லை' })}</p>
            </div>
          </div>
        </section>

        {/* ── Footer CTA ─────────────────────────────────────── */}
        <section className="container pb-24 text-center max-w-lg mx-auto">
          <p className="text-[#4F6280] text-sm leading-6 mb-6">
            {pickByLocale(locale, {
              en: 'The PWA approach means zero maintenance cost, always up-to-date content, and feature-parity with any native app for a knowledge portal.',
              kn: 'PWA ವಿಧಾನವು ಶೂನ್ಯ ನಿರ್ವಹಣಾ ವೆಚ್ಚ, ಸದಾ ನವೀಕೃತ ವಿಷಯ ಮತ್ತು ಜ್ಞಾನ ಪೋರ್ಟಲ್‌ಗೆ native app ಸಮಾನ ಅನುಭವವನ್ನು ಒದಗಿಸುತ್ತದೆ.',
              hi: 'PWA तरीका शून्य रखरखाव लागत, हमेशा अपडेटेड सामग्री और ज्ञान पोर्टल के लिए नेटिव ऐप जैसी सुविधाएँ देता है।',
              ta: 'PWA அணுகுமுறை பராமரிப்பு செலவை குறைத்து, எப்போதும் புதுப்பிக்கப்பட்ட உள்ளடக்கத்தையும் native app போன்ற அம்சங்களையும் வழங்குகிறது.',
            })}
          </p>
          <Link
            href="/"
            className="text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors"
          >
            ← {pickByLocale(locale, { en: 'Back to KWIN City Portal', kn: 'KWIN City ಪೋರ್ಟಲ್‌ಗೆ ಹಿಂತಿರುಗಿ', hi: 'KWIN City पोर्टल पर वापस जाएँ', ta: 'KWIN City தளத்திற்குத் திரும்பு' })}
          </Link>
        </section>

      </main>
    </SiteFrame>
  );
}
