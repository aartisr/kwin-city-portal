import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import Pillars from '@/components/Pillars';
import SourceReferences from '@/components/SourceReferences';
import JsonLd from '@/components/JsonLd';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kwin-city.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://kwin-city.com/about' },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const title = pickByLocale(locale, {
    en: 'About KWIN City | Knowledge · Wellbeing · Innovation Township',
    kn: 'KWIN City ಬಗ್ಗೆ | ಜ್ಞಾನ · ಕ್ಷೇಮ · ನವೀನತೆ ಟೌನ್‌ಶಿಪ್',
    hi: 'KWIN City के बारे में | ज्ञान · कल्याण · नवाचार टाउनशिप',
  });
  const description = pickByLocale(locale, {
    en: 'Learn about KWIN City — a proposed 465-acre knowledge-economy township in Doddaballapura, North Bengaluru. Built on three pillars: world-class research, genuine wellbeing infrastructure, and breakthrough industrial clusters.',
    kn: 'KWIN City ಕುರಿತು ತಿಳಿಯಿರಿ — ಉತ್ತರ ಬೆಂಗಳೂರಿನ ದೊಡ್ಡಬಳ್ಳಾಪುರದಲ್ಲಿ ಪ್ರಸ್ತಾಪಿತ 465 ಏಕರೆ ಜ್ಞಾನ-ಆರ್ಥಿಕ ಟೌನ್‌ಶಿಪ್.',
    hi: 'KWIN City के बारे में जानें — उत्तर बेंगलुरु के डोड्डाबल्लापुर में प्रस्तावित 465 एकड़ ज्ञान-आधारित टाउनशिप।',
  });
  const ogTitle = pickByLocale(locale, {
    en: 'About KWIN City — Knowledge, Wellbeing, Innovation Township',
    kn: 'KWIN City ಬಗ್ಗೆ — ಜ್ಞಾನ, ಕ್ಷೇಮ, ನವೀನತೆ ಟೌನ್‌ಶಿಪ್',
    hi: 'KWIN City के बारे में — ज्ञान, कल्याण, नवाचार टाउनशिप',
  });
  const ogDescription = pickByLocale(locale, {
    en: 'Three pillars. One ambitious city. Learn what KWIN City proposes and what the evidence says.',
    kn: 'ಮೂರು ಸ್ತಂಭಗಳು. ಒಂದು ಮಹತ್ವಾಕಾಂಕ್ಷಿ ನಗರ. KWIN City ಏನು ಪ್ರಸ್ತಾಪಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ನೋಡಿ.',
    hi: 'तीन स्तंभ। एक महत्वाकांक्षी शहर। KWIN City क्या प्रस्तावित करता है, जानिए।',
  });

  return {
    title,
    description,
    keywords: [
      'about KWIN City',
      'KWIN City overview',
      'knowledge economy township India',
      'KIADB Doddaballapura',
      'North Bengaluru urban development',
    ],
    alternates: { canonical: 'https://kwin-city.com/about' },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: 'https://kwin-city.com/about',
      type: 'website',
    },
  };
}

export default async function AboutPage() {
  const locale = await getServerLocale();
  const eyebrow = pickByLocale(locale, {
    en: 'About KWIN City',
    kn: 'KWIN City ಬಗ್ಗೆ',
    hi: 'KWIN City के बारे में',
  });
  const title = pickByLocale(locale, {
    en: 'A township designed around people, knowledge, and the future.',
    kn: 'ಜನರು, ಜ್ಞಾನ ಮತ್ತು ಭವಿಷ್ಯವನ್ನು ಕೇಂದ್ರದಲ್ಲಿಟ್ಟ ಟೌನ್‌ಶಿಪ್.',
    hi: 'लोगों, ज्ञान और भविष्य के लिए डिजाइन की गई टाउनशिप।',
  });
  const description = pickByLocale(locale, {
    en: 'KWIN City brings three ideas together that rarely meet at scale: world-class research and education, genuine wellbeing infrastructure, and breakthrough industrial clusters. This page tells you what\'s proposed, what\'s confirmed, and why it matters.',
    kn: 'KWIN City ಮೂರು ಪ್ರಮುಖ ಕಲ್ಪನೆಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸುತ್ತದೆ: ಜಾಗತಿಕ ಮಟ್ಟದ ಸಂಶೋಧನೆ, ನಿಜವಾದ ಕ್ಷೇಮ ಮೂಲಸೌಕರ್ಯ ಮತ್ತು ನವೀನ ಕೈಗಾರಿಕಾ ಕ್ಲಸ್ಟರ್‌ಗಳು.',
    hi: 'KWIN City तीन प्रमुख विचारों को साथ लाता है: विश्वस्तरीय अनुसंधान, वास्तविक कल्याण अवसंरचना और नवाचार उद्योग क्लस्टर।',
  });

  return (
    <SiteFrame>
      <JsonLd data={breadcrumb} />
      <main id="main-content" role="main">
        <PageIntro
          eyebrow={eyebrow}
          title={title}
          description={description}
          sourceIds={['brief', 'kiadb']}
        />
        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Current reading of the project</h2>
                <p className="text-gray-700 leading-8 mb-4">
                  At this stage, the safest description is that KWIN City is a proposed North Bengaluru township framed
                  around knowledge, wellbeing, and innovation. The portal treats the brief as a live project narrative,
                  not as final proof of implementation.
                </p>
                <p className="text-gray-700 leading-8 mb-0">
                  That is why the site separates overview content from full source review and keeps major figures marked
                  as pending primary verification until public institutional records are available.
                </p>
              </div>
              <SourceReferences sourceIds={['brief', 'kiadb', 'economicSurvey']} />
            </div>
          </div>
        </section>
        <Pillars />
      </main>
    </SiteFrame>
  );
}
