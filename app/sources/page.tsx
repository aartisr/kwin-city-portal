import type { Metadata } from 'next';
import Link from 'next/link';
import {
  KWIN_CLAIM_MAPPINGS,
  KWIN_SOURCE_REGISTRY,
} from '@/data/constants';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'Sources & Claim Ledger | Primary Institutional Records · KIADB · Karnataka',
      kn: 'ಮೂಲಗಳು ಮತ್ತು ಹೇಳಿಕೆ ಲೆಡ್ಜರ್ | ಪ್ರಾಥಮಿಕ ಸಂಸ್ಥಾಪಕ ದಾಖಲೆಗಳು · KIADB · ಕರ್ನಾಟಕ',
      hi: 'स्रोत और क्लेम लेजर | प्राथमिक संस्थागत रिकॉर्ड · KIADB · कर्नाटक',
    }),
    description: pickByLocale(locale, {
      en: 'Full source registry and claim-to-source mapping for KWIN City. Every fact on this portal links to its primary institutional document — KIADB records, Karnataka state data, and verified open data.',
      kn: 'KWIN Cityಗಾಗಿ ಸಂಪೂರ್ಣ ಮೂಲ ರಿಜಿಸ್ಟ್ರಿ ಮತ್ತು ಕ್ಲೇಮ್-ಟು-ಸೋರ್ಸ್ ಮ್ಯಾಪಿಂಗ್.',
      hi: 'KWIN City के लिए पूर्ण स्रोत रजिस्ट्री और क्लेम-टू-सोर्स मैपिंग।',
    }),
    keywords: [
      'KWIN City sources',
      'KIADB documents',
      'Karnataka development records',
      'urban research sources India',
      'claim verification portal',
    ],
    alternates: { canonical: 'https://kwin-city.com/sources' },
    openGraph: {
      title: pickByLocale(locale, {
        en: 'KWIN City Sources — Complete Claim Ledger & Primary Institutional Records',
        kn: 'KWIN City ಮೂಲಗಳು — ಸಂಪೂರ್ಣ ಕ್ಲೇಮ್ ಲೆಡ್ಜರ್ ಮತ್ತು ಪ್ರಾಥಮಿಕ ದಾಖಲೆಗಳು',
        hi: 'KWIN City स्रोत — पूर्ण क्लेम लेजर और प्राथमिक संस्थागत रिकॉर्ड',
      }),
      description: pickByLocale(locale, {
        en: 'Every claim on the KWIN City portal links to its primary source. Full ledger with KIADB, Karnataka open data, and verified institutional records.',
        kn: 'KWIN City ಪೋರ್ಟಲ್‌ನ ಪ್ರತಿಯೊಂದು ಕ್ಲೇಮ್ ತನ್ನ ಮೂಲಕ್ಕೆ ಲಿಂಕ್ ಆಗಿದೆ.',
        hi: 'KWIN City पोर्टल का हर दावा अपने मूल स्रोत से जुड़ा है।',
      }),
      url: 'https://kwin-city.com/sources',
      type: 'website',
    },
  };
}

const statusStyles = {
  verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'pending-verification': 'bg-amber-50 text-amber-700 border-amber-200',
  contextual: 'bg-blue-50 text-blue-700 border-blue-200',
};

const sources = Object.values(KWIN_SOURCE_REGISTRY);

export default async function SourcesPage() {
  const locale = await getServerLocale();
  const backLabel = pickByLocale(locale, {
    en: 'Back to homepage',
    kn: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    hi: 'मुखपृष्ठ पर वापस जाएं',
  });
  const pageTitle = pickByLocale(locale, {
    en: 'Sources and Claim Ledger',
    kn: 'ಮೂಲಗಳು ಮತ್ತು ಹೇಳಿಕೆ ಲೆಡ್ಜರ್',
    hi: 'स्रोत और क्लेम लेजर',
  });
  const pageDescription = pickByLocale(locale, {
    en: 'This page shows the source basis for the KWIN City portal. It separates primary references, pending primary verification, and contextual regional evidence so readers can see exactly what each claim rests on.',
    kn: 'ಈ ಪುಟವು KWIN City ಪೋರ್ಟಲ್‌ನ ಮೂಲಾಧಾರಗಳನ್ನು ತೋರಿಸುತ್ತದೆ: ಪ್ರಾಥಮಿಕ ಉಲ್ಲೇಖಗಳು, ಪರಿಶೀಲನೆ ಬಾಕಿ ಉಲ್ಲೇಖಗಳು, ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಹಿನ್ನೆಲೆ ಸಾಕ್ಷ್ಯಗಳು.',
    hi: 'यह पेज KWIN City पोर्टल के स्रोत आधार को दिखाता है: प्राथमिक संदर्भ, लंबित सत्यापन, और क्षेत्रीय संदर्भ प्रमाण।',
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mb-10">
          <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            {backLabel}
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mt-4 mb-4">{pageTitle}</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {pageDescription}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">{pickByLocale(locale, { en: 'Source Registry', kn: 'ಮೂಲ ರಿಜಿಸ್ಟ್ರಿ', hi: 'स्रोत रजिस्ट्री' })}</h2>
          <div className="grid grid-cols-1 gap-4">
            {sources.map((source) => (
              <article id={source.id} key={source.id} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.18em] text-gray-400 mb-2">{source.label}</div>
                    <h3 className="text-xl font-semibold text-gray-900">{source.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{source.publisher}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[source.status]}`}>
                    {source.status === 'pending-verification'
                      ? 'Pending primary verification'
                      : source.status === 'verified'
                        ? pickByLocale(locale, { en: 'Primary source', kn: 'ಪ್ರಾಥಮಿಕ ಮೂಲ', hi: 'प्राथमिक स्रोत' })
                        : pickByLocale(locale, { en: 'Contextual source', kn: 'ಪರಿಸ್ಥಿತಿಜನ್ಯ ಮೂಲ', hi: 'संदर्भ स्रोत' })}
                  </span>
                </div>
                <p className="text-gray-700 leading-7 mb-3">{source.note}</p>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                    {pickByLocale(locale, { en: 'Open source', kn: 'ಮೂಲ ತೆರೆಯಿರಿ', hi: 'स्रोत खोलें' })}
                  </a>
                ) : (
                  <div className="text-sm text-gray-500">{pickByLocale(locale, { en: 'Internal project brief; no public URL attached.', kn: 'ಆಂತರಿಕ ಯೋಜನಾ ಸಂಕ್ಷಿಪ್ತ; ಸಾರ್ವಜನಿಕ URL ಲಭ್ಯವಿಲ್ಲ.', hi: 'आंतरिक परियोजना सार; सार्वजनिक URL उपलब्ध नहीं।' })}</div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">{pickByLocale(locale, { en: 'Claim Mapping', kn: 'ಹೇಳಿಕೆ ಮ್ಯಾಪಿಂಗ್', hi: 'क्लेम मैपिंग' })}</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-4 font-semibold text-gray-900">{pickByLocale(locale, { en: 'Section', kn: 'ವಿಭಾಗ', hi: 'सेक्शन' })}</th>
                  <th className="px-5 py-4 font-semibold text-gray-900">{pickByLocale(locale, { en: 'Claim', kn: 'ಹೇಳಿಕೆ', hi: 'क्लेम' })}</th>
                  <th className="px-5 py-4 font-semibold text-gray-900">{pickByLocale(locale, { en: 'Status', kn: 'ಸ್ಥಿತಿ', hi: 'स्थिति' })}</th>
                  <th className="px-5 py-4 font-semibold text-gray-900">{pickByLocale(locale, { en: 'Sources', kn: 'ಮೂಲಗಳು', hi: 'स्रोत' })}</th>
                </tr>
              </thead>
              <tbody>
                {KWIN_CLAIM_MAPPINGS.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 last:border-b-0">
                    <td className="px-5 py-4 align-top text-gray-700">{item.section}</td>
                    <td className="px-5 py-4 align-top text-gray-900 leading-7">{item.claim}</td>
                    <td className="px-5 py-4 align-top">
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}>
                        {item.status === 'pending-verification'
                          ? pickByLocale(locale, { en: 'Pending primary verification', kn: 'ಪ್ರಾಥಮಿಕ ಪರಿಶೀಲನೆ ಬಾಕಿ', hi: 'प्राथमिक सत्यापन लंबित' })
                          : item.status === 'verified'
                            ? pickByLocale(locale, { en: 'Primary source', kn: 'ಪ್ರಾಥಮಿಕ ಮೂಲ', hi: 'प्राथमिक स्रोत' })
                            : pickByLocale(locale, { en: 'Contextual', kn: 'ಪರಿಸ್ಥಿತಿಜನ್ಯ', hi: 'संदर्भ' })}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="flex flex-wrap gap-2">
                        {item.sourceIds.map((sourceId) => {
                          const source = KWIN_SOURCE_REGISTRY[sourceId];
                          return (
                            <Link
                              key={sourceId}
                              href={`#${source.id}`}
                              className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-700"
                            >
                              {source.label}
                            </Link>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}