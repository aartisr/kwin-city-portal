import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import CommunityDiscussion from '@/components/CommunityDiscussion';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, { en: 'Community Discussion', kn: 'ಸಮುದಾಯ ಚರ್ಚೆ', hi: 'समुदाय चर्चा' }),
    description: pickByLocale(locale, {
      en: 'Community thread for discussion and evidence requests',
      kn: 'ಚರ್ಚೆ ಮತ್ತು ಸಾಕ್ಷ್ಯ ವಿನಂತಿಗಳಿಗಾಗಿ ಸಮುದಾಯ ವೇದಿಕೆ',
      hi: 'चर्चा और प्रमाण अनुरोधों के लिए सामुदायिक मंच',
    }),
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
