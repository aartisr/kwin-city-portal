import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import Timeline from '@/components/Timeline';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'Development Timeline | KWIN City 2024–2030 Roadmap',
      kn: 'ಅಭಿವೃದ್ಧಿ ಕಾಲರೇಖೆ | KWIN City 2024–2030 ಮಾರ್ಗನಕ್ಷೆ',
      hi: 'डेवलपमेंट टाइमलाइन | KWIN City 2024–2030 रोडमैप',
    }),
    description: pickByLocale(locale, {
      en: 'KWIN City\'s five-phase development roadmap from 2024 inauguration to full operations by 2030. Every milestone is labeled with its source and verification status.',
      kn: '2024 ಉದ್ಘಾಟನೆದಿಂದ 2030 ಕಾರ್ಯಾಚರಣೆವರೆಗೆ KWIN City ಯ ಐದು ಹಂತಗಳ ಕಾಲರೇಖೆ.',
      hi: '2024 उद्घाटन से 2030 संचालन तक KWIN City की पांच-चरणीय टाइमलाइन।',
    }),
    keywords: [
      'KWIN City timeline',
      'KWIN development phases',
      'North Bengaluru 2030',
      'KIADB project milestones',
      'knowledge city timeline India',
    ],
    alternates: { canonical: 'https://kwin-city.com/timeline' },
    openGraph: {
      title: pickByLocale(locale, {
        en: 'KWIN City Development Timeline — 2024 to 2030',
        kn: 'KWIN City ಅಭಿವೃದ್ಧಿ ಕಾಲರೇಖೆ — 2024 ರಿಂದ 2030',
        hi: 'KWIN City डेवलपमेंट टाइमलाइन — 2024 से 2030',
      }),
      description: pickByLocale(locale, {
        en: 'Five phases. One extraordinary ambition. The KWIN City roadmap, labeled with evidence.',
        kn: 'ಐದು ಹಂತಗಳು. ಒಂದು ಮಹತ್ವಾಕಾಂಕ್ಷೆ. ಸಾಕ್ಷ್ಯಾಧಾರಗಳೊಂದಿಗೆ KWIN ಮಾರ್ಗನಕ್ಷೆ.',
        hi: 'पांच चरण। एक महत्वाकांक्षा। प्रमाण के साथ KWIN रोडमैप।',
      }),
      url: 'https://kwin-city.com/timeline',
      type: 'website',
    },
  };
}

export default async function TimelinePage() {
  const locale = await getServerLocale();
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow={pickByLocale(locale, { en: 'Development Timeline', kn: 'ಅಭಿವೃದ್ಧಿ ಕಾಲರೇಖೆ', hi: 'डेवलपमेंट टाइमलाइन' })}
          title={pickByLocale(locale, {
            en: 'Five phases. One extraordinary ambition.',
            kn: 'ಐದು ಹಂತಗಳು. ಒಂದು ಅಸಾಧಾರಣ ಮಹತ್ವಾಕಾಂಕ್ಷೆ.',
            hi: 'पांच चरण। एक असाधारण महत्वाकांक्षा।',
          })}
          description={pickByLocale(locale, {
            en: 'From inauguration and land acquisition through to a fully operating knowledge-and-industry city — the KWIN roadmap is bold, phased, and open to examination. Every milestone is labeled with its source.',
            kn: 'ಉದ್ಘಾಟನೆ ಮತ್ತು ಭೂಸ್ವಾಧೀನದಿಂದ ಪೂರ್ಣ ಕಾರ್ಯಾಚರಣೆಯವರೆಗೆ KWIN ಮಾರ್ಗನಕ್ಷೆ ಹಂತವಾರಿಯಾಗಿ ಇಲ್ಲಿ ಇದೆ.',
            hi: 'उद्घाटन और भूमि अधिग्रहण से पूर्ण संचालन तक KWIN रोडमैप यहां चरणबद्ध रूप में दिया गया है।',
          })}
          sourceIds={['brief', 'kiadb']}
        />
        <Timeline />
      </main>
    </SiteFrame>
  );
}
