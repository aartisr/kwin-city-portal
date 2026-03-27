'use client';

import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

type PageView = {
  path: string;
  title: string;
  timestamp: string;
  referrer: string;
};

type EngagementMetric = {
  path: string;
  timeOnPage: number;
  scrollDepth: number;
  timestamp: string;
};

const fmtDateTime = (iso: string, locale: 'en' | 'kn' | 'hi' | 'ta') => {
  try {
    const intlLocale = locale === 'kn' ? 'kn-IN' : locale === 'hi' ? 'hi-IN' : locale === 'ta' ? 'ta-IN' : 'en-IN';
    return new Date(iso).toLocaleString(intlLocale);
  } catch {
    return iso;
  }
};

export default function AnalyticsDashboard() {
  const { locale } = useI18n();
  const l = (values: { en: string; kn?: string; hi?: string; ta?: string }) => pickLocalizedValue(locale, values);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [engagement, setEngagement] = useState<EngagementMetric[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pv = JSON.parse(localStorage.getItem('pageAnalytics') || '[]') as PageView[];
    const em = JSON.parse(localStorage.getItem('engagementMetrics') || '[]') as EngagementMetric[];

    setPageViews(pv);
    setEngagement(em);
  }, []);

  const summary = useMemo(() => {
    const totalViews = pageViews.length;
    const uniquePaths = new Set(pageViews.map((v) => v.path)).size;

    const avgTime = engagement.length
      ? Math.round(engagement.reduce((sum, m) => sum + m.timeOnPage, 0) / engagement.length)
      : 0;

    const avgScroll = engagement.length
      ? Math.round(engagement.reduce((sum, m) => sum + m.scrollDepth, 0) / engagement.length)
      : 0;

    const pathCounts = pageViews.reduce<Record<string, number>>((acc, v) => {
      acc[v.path] = (acc[v.path] || 0) + 1;
      return acc;
    }, {});

    const topPages = Object.entries(pathCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([path, views]) => ({ path, views }));

    return { totalViews, uniquePaths, avgTime, avgScroll, topPages };
  }, [pageViews, engagement]);

  const clearAnalytics = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('pageAnalytics');
    localStorage.removeItem('engagementMetrics');
    setPageViews([]);
    setEngagement([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-14">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{l({ en: 'Analytics Dashboard', kn: 'ವಿಶ್ಲೇಷಣಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', hi: 'एनालिटिक्स डैशबोर्ड', ta: 'பகுப்பாய்வு டாஷ்போர்டு' })}</h1>
          <p className="text-blue-100 max-w-2xl">
            {l({ en: 'Snapshot of on-device page tracking for Sprint 2 validation and UX tuning.', kn: 'Sprint 2 ಪರಿಶೀಲನೆ ಮತ್ತು UX ಸುಧಾರಣೆಗೆ ಸಾಧನದೊಳಗಿನ ಪುಟ ಟ್ರ್ಯಾಕಿಂಗ್‌ನ ಸಾರಾಂಶ.', hi: 'Sprint 2 सत्यापन और UX सुधार के लिए डिवाइस-आधारित पेज ट्रैकिंग का स्नैपशॉट।', ta: 'Sprint 2 சரிபார்ப்பு மற்றும் UX மேம்பாட்டிற்கான சாதனத்திலேயே உள்ள பக்க கண்காணிப்பு சுருக்கம்.' })}
          </p>
        </div>
      </section>

      <section className="container py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">{l({ en: 'Total Views', kn: 'ಒಟ್ಟು ವೀಕ್ಷಣೆಗಳು', hi: 'कुल दृश्य', ta: 'மொத்த பார்வைகள்' })}</p>
            <p className="text-3xl font-extrabold text-slate-900">{summary.totalViews}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">{l({ en: 'Unique Pages', kn: 'ವೈಶಿಷ್ಟ್ಯಪೂರ್ಣ ಪುಟಗಳು', hi: 'अद्वितीय पृष्ठ', ta: 'தனித்துவமான பக்கங்கள்' })}</p>
            <p className="text-3xl font-extrabold text-slate-900">{summary.uniquePaths}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">{l({ en: 'Avg Time On Page', kn: 'ಪುಟದಲ್ಲಿನ ಸರಾಸರಿ ಸಮಯ', hi: 'पेज पर औसत समय', ta: 'பக்கத்தில் சராசரி நேரம்' })}</p>
            <p className="text-3xl font-extrabold text-slate-900">{summary.avgTime}s</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">{l({ en: 'Avg Scroll Depth', kn: 'ಸರಾಸರಿ ಸ್ಕ್ರೋಲ್ ಆಳ', hi: 'औसत स्क्रोल गहराई', ta: 'சராசரி ஸ்க்ரோல் ஆழம்' })}</p>
            <p className="text-3xl font-extrabold text-slate-900">{summary.avgScroll}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">{l({ en: 'Top Pages', kn: 'ಮುಖ್ಯ ಪುಟಗಳು', hi: 'शीर्ष पेज', ta: 'முன்னணி பக்கங்கள்' })}</h2>
            {summary.topPages.length === 0 ? (
              <p className="text-slate-600">{l({ en: 'No tracked page views yet.', kn: 'ಇನ್ನೂ ಯಾವುದೇ ಪುಟ ವೀಕ್ಷಣೆ ಟ್ರ್ಯಾಕ್ ಆಗಿಲ್ಲ.', hi: 'अभी तक कोई पेज व्यू ट्रैक नहीं हुआ है।', ta: 'இன்னும் எந்தப் பக்கப் பார்வையும் கண்காணிக்கப்படவில்லை.' })}</p>
            ) : (
              <div className="space-y-2">
                {summary.topPages.map((row) => (
                  <div key={row.path} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                    <span className="text-sm font-semibold text-slate-800">{row.path}</span>
                    <span className="text-sm text-slate-600">{row.views} {l({ en: 'views', kn: 'ವೀಕ್ಷಣೆಗಳು', hi: 'व्यू', ta: 'பார்வைகள்' })}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">{l({ en: 'Latest Engagement', kn: 'ಇತ್ತೀಚಿನ ತೊಡಗುಿಕೆ', hi: 'नवीनतम सहभागिता', ta: 'சமீபத்திய ஈடுபாடு' })}</h2>
            {engagement.length === 0 ? (
              <p className="text-slate-600">{l({ en: 'No engagement records yet.', kn: 'ಇನ್ನೂ ತೊಡಗುಿಕೆ ದಾಖಲೆಗಳಿಲ್ಲ.', hi: 'अभी तक कोई सहभागिता रिकॉर्ड नहीं है।', ta: 'இன்னும் ஈடுபாட்டு பதிவுகள் இல்லை.' })}</p>
            ) : (
              <div className="max-h-72 overflow-auto space-y-2">
                {[...engagement].reverse().slice(0, 10).map((row, i) => (
                  <div key={`${row.timestamp}-${i}`} className="rounded-lg border border-slate-200 px-3 py-2">
                    <p className="text-sm font-bold text-slate-900">{row.path}</p>
                    <p className="text-xs text-slate-600">{fmtDateTime(row.timestamp, locale)}</p>
                    <p className="text-xs text-slate-700 mt-1">
                      {row.timeOnPage}s {l({ en: 'on page', kn: 'ಪುಟದಲ್ಲಿ', hi: 'पेज पर', ta: 'பக்கத்தில்' })}, {row.scrollDepth}% {l({ en: 'scroll', kn: 'ಸ್ಕ್ರೋಲ್', hi: 'स्क्रोल', ta: 'ஸ்க்ரோல்' })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-amber-900">
            {l({ en: 'Analytics are local to this browser and never sent to a server in this Sprint 2 implementation.', kn: 'ಈ Sprint 2 ಅನುಷ್ಠಾನದಲ್ಲಿ ವಿಶ್ಲೇಷಣೆಗಳು ಈ ಬ್ರೌಸರ್‌ನಲ್ಲೇ ಉಳಿಯುತ್ತವೆ ಮತ್ತು ಸರ್ವರ್‌ಗೆ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ.', hi: 'Sprint 2 के इस कार्यान्वयन में एनालिटिक्स इस ब्राउज़र में स्थानीय रहते हैं और सर्वर पर नहीं भेजे जाते।', ta: 'Sprint 2 செயலாக்கத்தில் பகுப்பாய்வு இந்த உலாவியில் உள்ளூராகவே இருக்கும்; சேவையகத்திற்கு அனுப்பப்படாது.' })}
          </p>
          <button
            onClick={clearAnalytics}
            className="px-4 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors"
          >
            {l({ en: 'Clear Local Analytics', kn: 'ಸ್ಥಳೀಯ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಅಳಿಸಿ', hi: 'स्थानीय एनालिटिक्स साफ करें', ta: 'உள்ளூர் பகுப்பாய்வை அழிக்கவும்' })}
          </button>
        </div>
      </section>
    </main>
  );
}
