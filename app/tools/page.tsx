import Link from 'next/link';
import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import ToolsPowerPalette from '@/tools/ToolsPowerPalette';
import ToolsUsageStrip from '@/tools/ToolsUsageStrip';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const TOOL_ROUTES = [
  {
    href: '/tools/risk-check',
    icon: '🛡️',
    title: {
      en: 'Risk Check',
      kn: 'ಅಪಾಯ ಪರಿಶೀಲನೆ',
      hi: 'रिस्क चेक',
    },
    summary: {
      en: 'Run preliminary parcel and area risk checks with source-linked caveats and recommendations.',
      kn: 'ಮೂಲಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿತ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಸಲಹೆಗಳೊಂದಿಗೆ ಪ್ರಾಥಮಿಕ ಅಪಾಯ ಪರಿಶೀಲನೆ ನಡೆಸಿ.',
      hi: 'स्रोत-लिंक्ड सावधानियों और सुझावों के साथ प्रारंभिक जोखिम जांच चलाएं।',
    },
  },
  {
    href: '/tools/accessibility',
    icon: '🧭',
    title: {
      en: 'Accessibility Calculator',
      kn: 'ಪ್ರವೇಶ ಸುಲಭತೆ ಲೆಕ್ಕಾಚಾರ',
      hi: 'एक्सेसिबिलिटी कैलकुलेटर',
    },
    summary: {
      en: 'Estimate travel-time ranges and projected corridor improvements for key KWIN routes.',
      kn: 'KWIN ಮುಖ್ಯ ಮಾರ್ಗಗಳಿಗೆ ಪ್ರಯಾಣ ಸಮಯ ಮತ್ತು ಯೋಜಿತ ಸಂಪರ್ಕ ಸುಧಾರಣೆಗಳನ್ನು ಅಂದಾಜಿಸಿ.',
      hi: 'मुख्य KWIN मार्गों के लिए यात्रा समय और अनुमानित कॉरिडोर सुधार देखें।',
    },
  },
  {
    href: '/tools/regulatory-navigator',
    icon: '📋',
    title: {
      en: 'Regulatory Navigator',
      kn: 'ನಿಯಾಮಕ ಮಾರ್ಗದರ್ಶಿ',
      hi: 'रेग्युलेटरी नेविगेटर',
    },
    summary: {
      en: 'Follow persona-specific compliance steps, authority checkpoints, and document requirements.',
      kn: 'ಪಾತ್ರ-ಆಧಾರಿತ ಅನುಸರಣೆ ಹಂತಗಳು, ಅಧಿಕಾರ ಚೆಕ್‌ಪಾಯಿಂಟ್‌ಗಳು ಮತ್ತು ದಾಖಲೆ ಅವಶ್ಯಕತೆಗಳನ್ನು ಅನುಸರಿಸಿ.',
      hi: 'भूमिका-आधारित अनुपालन चरण, प्राधिकरण चेकपॉइंट और दस्तावेज़ आवश्यकताएं देखें।',
    },
  },
  {
    href: '/updates/change-tracker',
    icon: '🛰️',
    title: {
      en: 'Change Tracker',
      kn: 'ಬದಲಾವಣೆ ಟ್ರ್ಯಾಕರ್',
      hi: 'चेंज ट्रैकर',
    },
    summary: {
      en: 'Track timeline movement and status shifts using source-backed phase updates.',
      kn: 'ಮೂಲಾಧಾರಿತ ಹಂತ ನವೀಕರಣಗಳೊಂದಿಗೆ ಕಾಲರೇಖೆ ಮತ್ತು ಸ್ಥಿತಿ ಬದಲಾವಣೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
      hi: 'स्रोत-समर्थित फेज अपडेट के साथ टाइमलाइन और स्थिति बदलाव ट्रैक करें।',
    },
  },
  {
    href: '/tools/spatial-explorer',
    icon: '🗺️',
    title: {
      en: 'Spatial Explorer',
      kn: 'ಸ್ಥಳಿಕ ಅನ್ವೇಷಕ',
      hi: 'स्पैटियल एक्सप्लोरर',
    },
    summary: {
      en: 'Explore phase-linked zoning, transport, utility, and anchor overlays with map context.',
      kn: 'ನಕ್ಷೆ ಹಿನ್ನೆಲೆಯೊಂದಿಗೆ ಹಂತ-ಆಧಾರಿತ ಜೋನಿಂಗ್, ಸಾರಿಗೆ ಮತ್ತು ಯುಟಿಲಿಟಿ ಲೇಯರ್‌ಗಳನ್ನು ನೋಡಿ.',
      hi: 'मैप कॉन्टेक्स्ट के साथ फेज-आधारित ज़ोनिंग, ट्रांसपोर्ट और यूटिलिटी लेयर देखें।',
    },
  },
  {
    href: '/updates/satellite-tracker',
    icon: '🛰',
    title: {
      en: 'Satellite Tracker',
      kn: 'ಉಪಗ್ರಹ ಟ್ರ್ಯಾಕರ್',
      hi: 'सैटेलाइट ट्रैकर',
    },
    summary: {
      en: 'Review month-wise development signals for corridor and site progression.',
      kn: 'ಕಾರಿಡಾರ್ ಮತ್ತು ಸೈಟ್ ಅಭಿವೃದ್ಧಿಯ ತಿಂಗಳುವಾರಿ ಪ್ರಗತಿ ಸೂಚನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ.',
      hi: 'कॉरिडोर और साइट प्रगति के मासिक विकास संकेत देखें।',
    },
  },
  {
    href: '/tools/valuation-index',
    icon: '📊',
    title: {
      en: 'Valuation Index',
      kn: 'ಮೌಲ್ಯಮಾಪನ ಸೂಚ್ಯಂಕ',
      hi: 'वैल्यूएशन इंडेक्स',
    },
    summary: {
      en: 'Compare directional market rates and guidance values by zone.',
      kn: 'ವಲಯವಾರು ಮಾರುಕಟ್ಟೆ ದರ ಮತ್ತು ಗೈಡನ್ಸ್ ವ್ಯಾಲ್ಯೂ ಹೋಲಿಕೆ ಮಾಡಿ.',
      hi: 'ज़ोन के अनुसार मार्केट रेट और गाइडेंस वैल्यू की तुलना करें।',
    },
  },
  {
    href: '/tools/investment-radar',
    icon: '📡',
    title: {
      en: 'Investment Radar',
      kn: 'ಹೂಡಿಕೆ ರಡಾರ್',
      hi: 'इन्वेस्टमेंट रडार',
    },
    summary: {
      en: 'Track anchor commitments and momentum by investment category.',
      kn: 'ಹೂಡಿಕೆ ವರ್ಗದ ಪ್ರಕಾರ ಆಂಕರ್ ಒಪ್ಪಂದಗಳು ಮತ್ತು ಚಲನವಲನವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
      hi: 'निवेश श्रेणियों के अनुसार एंकर कमिटमेंट और गति ट्रैक करें।',
    },
  },
  {
    href: '/tools/opportunity-exchange',
    icon: '🤝',
    title: {
      en: 'Opportunity Exchange',
      kn: 'ಅವಕಾಶ ವಿನಿಮಯ',
      hi: 'ऑपर्च्युनिटी एक्सचेंज',
    },
    summary: {
      en: 'Submit investor, developer, or landowner requirements for matchmaking.',
      kn: 'ಹೂಡಿಕೆದಾರ, ಡೆವಲಪರ್ ಅಥವಾ ಭೂಮಾಲೀಕರ ಅವಶ್ಯಕತೆಗಳನ್ನು ಮ್ಯಾಚ್‌ಮೇಕಿಂಗ್‌ಗೆ ಸಲ್ಲಿಸಿ.',
      hi: 'मैचमेकिंग के लिए निवेशक, डेवलपर या लैंडओनर आवश्यकताएं जमा करें।',
    },
  },
  {
    href: '/updates/regulatory-news',
    icon: '📰',
    title: {
      en: 'Regulatory News Engine',
      kn: 'ನಿಯಾಮಕ ಸುದ್ದಿ ಎಂಜಿನ್',
      hi: 'रेग्युलेटरी न्यूज़ इंजन',
    },
    summary: {
      en: 'Browse tagged gazette, policy, and infrastructure update feeds.',
      kn: 'ಟ್ಯಾಗ್ ಮಾಡಿದ ಗಜೆಟ್, ನೀತಿ ಮತ್ತು ಮೂಲಸೌಕರ್ಯ ನವೀಕರಣ ಫೀಡ್‌ಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ.',
      hi: 'टैग किए गए गजट, नीति और इन्फ्रास्ट्रक्चर अपडेट फीड देखें।',
    },
  },
  {
    href: '/tools/open-data-studio',
    icon: '🧩',
    title: {
      en: 'Open Data Studio',
      kn: 'ಓಪನ್ ಡೇಟಾ ಸ್ಟುಡಿಯೋ',
      hi: 'ओपन डेटा स्टूडियो',
    },
    summary: {
      en: 'Browse open datasets and queue GeoJSON, CSV, and JSON exports.',
      kn: 'ಓಪನ್ ಡೇಟಾಸೆಟ್‌ಗಳನ್ನು ನೋಡಿ ಮತ್ತು GeoJSON, CSV, JSON ಎಕ್ಸ್‌ಪೋರ್ಟ್‌ಗಳನ್ನು ಕ್ಯೂ ಮಾಡಿ.',
      hi: 'ओपन डेटासेट देखें और GeoJSON, CSV, JSON एक्सपोर्ट कतार में लगाएं।',
    },
  },
] as const;

const QUICK_START_HREFS = ['/tools/risk-check', '/tools/spatial-explorer', '/updates/change-tracker', '/tools/open-data-studio'] as const;

const TOOL_LANES: Record<string, string> = {
  '/tools/risk-check': 'Due Diligence',
  '/tools/accessibility': 'Due Diligence',
  '/tools/regulatory-navigator': 'Due Diligence',
  '/tools/valuation-index': 'Market Intelligence',
  '/tools/investment-radar': 'Market Intelligence',
  '/tools/opportunity-exchange': 'Market Intelligence',
  '/tools/spatial-explorer': 'Spatial and Progress',
  '/updates/satellite-tracker': 'Spatial and Progress',
  '/updates/change-tracker': 'Spatial and Progress',
  '/updates/regulatory-news': 'Policy and Data',
  '/tools/open-data-studio': 'Policy and Data',
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return {
    title: pickByLocale(locale, {
      en: 'KWIN Tools | Risk, Accessibility, Regulatory, and Change Utilities',
      kn: 'KWIN ಉಪಕರಣಗಳು | ಅಪಾಯ, ಪ್ರವೇಶ, ನಿಯಾಮಕ ಮತ್ತು ಬದಲಾವಣೆ ಉಪಯೋಗಗಳು',
      hi: 'KWIN टूल्स | रिस्क, एक्सेसिबिलिटी, रेग्युलेटरी और चेंज यूटिलिटीज',
    }),
    description: pickByLocale(locale, {
      en: 'Central hub for KWIN utility tools: run risk checks, estimate accessibility, navigate regulatory steps, and track project changes.',
      kn: 'KWIN ಉಪಯೋಗಕಾರಿ ಟೂಲ್ಸ್ ಹಬ್: ಅಪಾಯ ಪರಿಶೀಲನೆ, ಪ್ರವೇಶ ಅಂದಾಜು, ನಿಯಾಮಕ ಹಂತಗಳು ಮತ್ತು ಬದಲಾವಣೆ ಟ್ರ್ಯಾಕಿಂಗ್.',
      hi: 'KWIN यूटिलिटी हब: रिस्क चेक, एक्सेसिबिलिटी अनुमान, रेग्युलेटरी चरण और बदलाव ट्रैकिंग।',
    }),
    alternates: { canonical: 'https://kwin-city.com/tools' },
  };
}

export default async function ToolsIndexPage() {
  const locale = await getServerLocale();
  const l = (values: Parameters<typeof pickByLocale<string>>[1]) => pickByLocale(locale, values);
  const quickStartRoutes = TOOL_ROUTES.filter((tool) => QUICK_START_HREFS.includes(tool.href as (typeof QUICK_START_HREFS)[number]));
  const powerOptions = TOOL_ROUTES.map((tool) => ({
    href: tool.href,
    icon: tool.icon,
    title: l(tool.title),
    summary: l(tool.summary),
    lane: l({
      en: TOOL_LANES[tool.href] ?? 'Tools',
      kn: TOOL_LANES[tool.href] ?? 'ಉಪಕರಣಗಳು',
      hi: TOOL_LANES[tool.href] ?? 'टूल्स',
    }),
  }));
  const usageOptions = TOOL_ROUTES.map((tool) => ({
    href: tool.href,
    icon: tool.icon,
    title: l(tool.title),
  }));

  return (
    <SiteFrame>
      <ToolsPowerPalette options={powerOptions} />
      <main id="main-content" role="main">
        <PageIntro
          eyebrow={l({ en: 'KWIN Utilities', kn: 'KWIN ಉಪಯೋಗಗಳು', hi: 'KWIN यूटिलिटीज' })}
          title={l({ en: 'Actionable Tools', kn: 'ಕಾರ್ಯಗತ ಉಪಕರಣಗಳು', hi: 'कार्यान्वित टूल्स' })}
          description={l({
            en: 'Use these utilities to move from narrative to decisions with structured, source-grounded workflows.',
            kn: 'ಕಥನದಿಂದ ನಿರ್ಧಾರಕ್ಕೆ ಹೋಗಲು ಈ ಉಪಕರಣಗಳನ್ನು ಬಳಸಿ; ಎಲ್ಲವೂ ಮೂಲಾಧಾರಿತ ಕಾರ್ಯಪ್ರವಾಹಗಳೊಂದಿಗೆ.',
            hi: 'इन टूल्स से कथा से निर्णय तक जाएं, संरचित और स्रोत-आधारित कार्यप्रवाह के साथ।',
          })}
          sourceIds={['brief', 'kiadb', 'strr']}
        />

        <section className="section bg-slate-50">
          <div className="container">
            <ToolsUsageStrip options={usageOptions} />

            <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6F3F00]">
                    {l({ en: 'Command Center', kn: 'ಕಮಾಂಡ್ ಸೆಂಟರ್', hi: 'कमांड सेंटर' })}
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                    {l({ en: 'Start with the strongest decision paths', kn: 'ಬಲವಾದ ನಿರ್ಧಾರ ಮಾರ್ಗಗಳಿಂದ ಪ್ರಾರಂಭಿಸಿ', hi: 'सबसे मजबूत निर्णय मार्गों से शुरू करें' })}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-[#6F3F00]">
                    {l({ en: 'Shift+T or Cmd/Ctrl+K', kn: 'Shift+T ಅಥವಾ Cmd/Ctrl+K', hi: 'Shift+T या Cmd/Ctrl+K' })}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    {l({ en: '11 live tools', kn: '11 ಲೈವ್ ಟೂಲ್‌ಗಳು', hi: '11 लाइव टूल्स' })}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    {l({ en: '4 intent lanes', kn: '4 ಉದ್ದೇಶ ಮಾರ್ಗಗಳು', hi: '4 इंटेंट लेन' })}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    {l({ en: 'Source-linked outputs', kn: 'ಮೂಲ-ಲಿಂಕ್ಡ್ ಔಟ್‌ಪುಟ್‌ಗಳು', hi: 'स्रोत-लिंक्ड आउटपुट' })}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                {quickStartRoutes.map((tool) => (
                  <Link
                    key={`quick-${tool.href}`}
                    href={tool.href}
                    className="group rounded-xl border border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(248,250,252,1))] px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-[0_12px_26px_rgba(15,23,42,0.08)]"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6F3F00]">
                      {l({ en: 'Quick Start', kn: 'ಕ್ವಿಕ್ ಸ್ಟಾರ್ಟ್', hi: 'क्विक स्टार्ट' })}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-900">
                      <span>{tool.icon}</span>
                      <span>{l(tool.title)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {TOOL_ROUTES.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-3 inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                    {l({
                      en: TOOL_LANES[tool.href] ?? 'Tools',
                      kn: TOOL_LANES[tool.href] ?? 'ಉಪಕರಣಗಳು',
                      hi: TOOL_LANES[tool.href] ?? 'टूल्स',
                    })}
                  </div>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-2xl">
                    {tool.icon}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{l(tool.title)}</h2>
                  <p className="mt-2 text-slate-600">{l(tool.summary)}</p>
                  <div className="mt-4 text-sm font-semibold text-slate-900 group-hover:text-slate-700">
                    {l({ en: 'Open tool', kn: 'ಉಪಕರಣ ತೆರೆಯಿರಿ', hi: 'टूल खोलें' })} {'->'}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
