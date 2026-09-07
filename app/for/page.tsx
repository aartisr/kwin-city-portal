import type { Metadata } from 'next';
import PersonaHub from '@/components/PersonaHub';
import SiteFrame from '@/components/SiteFrame';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'Explore KWIN City | For Investors · Residents · Researchers · Journalists',
      kn: 'KWIN City ಅನ್ವೇಷಿಸಿ | ಹೂಡಿಕೆದಾರರು · ನಿವಾಸಿಗಳು · ಸಂಶೋಧಕರು · ಪತ್ರಕರ್ತರು',
      hi: 'KWIN City एक्सप्लोर करें | निवेशक · निवासी · शोधकर्ता · पत्रकार',
    }),
    description: pickByLocale(locale, {
      en: 'Tailored KWIN City overviews for every audience: investment briefings, resident livability guides, research methodology, journalist story angles, and plain-language explainers for curious citizens.',
      kn: 'ಪ್ರತಿ ಪ್ರೇಕ್ಷಕರಿಗಾಗಿ KWIN City ವಿವರಣೆಗಳು: ಹೂಡಿಕೆ, ವಾಸಸ್ಥಿತಿ, ಸಂಶೋಧನೆ ಮತ್ತು ಪತ್ರಿಕೋದ್ಯಮ ದೃಷ್ಟಿಕೋನ.',
      hi: 'हर दर्शक के लिए KWIN City मार्गदर्शिका: निवेश, निवास, शोध और पत्रकारिता दृष्टिकोण।',
    }),
    keywords: [
      'KWIN City investor',
      'KWIN City resident',
      'KWIN City researcher',
      'North Bengaluru investment briefing',
      'smart city for residents India',
    ],
    alternates: { canonical: 'https://kwin-city.com/for' },
    openGraph: {
      title: pickByLocale(locale, {
        en: 'Explore KWIN City — For Investors, Residents, Researchers & More',
        kn: 'KWIN City ಅನ್ವೇಷಣೆ — ಹೂಡಿಕೆದಾರರು, ನಿವಾಸಿಗಳು, ಸಂಶೋಧಕರು ಮತ್ತು ಇನ್ನಷ್ಟು',
        hi: 'KWIN City एक्सप्लोर करें — निवेशक, निवासी, शोधकर्ता और अधिक',
      }),
      description: pickByLocale(locale, {
        en: 'Choose the right KWIN City briefing for investors, residents, researchers, journalists, and curious citizens, each with role-specific evidence and next steps.',
        kn: 'ಹೂಡಿಕೆದಾರರು, ನಿವಾಸಿಗಳು, ಸಂಶೋಧಕರು, ಪತ್ರಕರ್ತರು ಮತ್ತು ಕುತೂಹಲಕರ ನಾಗರಿಕರಿಗಾಗಿ ವಿಶೇಷ ಮಾರ್ಗದರ್ಶಿ.',
        hi: 'निवेशकों, निवासियों, शोधकर्ताओं, पत्रकारों और जिज्ञासु नागरिकों के लिए विशेष गाइड।',
      }),
      url: 'https://kwin-city.com/for',
      type: 'website',
    },
  };
}

export default function PersonaHubPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PersonaHub />
      </main>
    </SiteFrame>
  );
}
