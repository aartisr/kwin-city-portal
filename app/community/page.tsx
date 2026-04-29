import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import CommunityDiscussion from '@/components/CommunityDiscussion';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, { en: 'Community Discussion', kn: 'ಸಮುದಾಯ ಚರ್ಚೆ', hi: 'समुदाय चर्चा' }),
    description: pickByLocale(locale, {
      en: 'Private community discussion thread for KWIN City questions, evidence requests, corrections, and moderated feedback from residents, researchers, investors, and media users.',
      kn: 'ಚರ್ಚೆ ಮತ್ತು ಸಾಕ್ಷ್ಯ ವಿನಂತಿಗಳಿಗಾಗಿ ಸಮುದಾಯ ವೇದಿಕೆ',
      hi: 'चर्चा और प्रमाण अनुरोधों के लिए सामुदायिक मंच',
    }),
    alternates: { canonical: 'https://kwin-city.com/community' },
    robots: { index: false },
  };
}

export default function CommunityPage() {
  return (
    <SiteFrame>
      <CommunityDiscussion />
    </SiteFrame>
  );
}
