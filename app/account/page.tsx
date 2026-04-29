import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import AuthPreferences from '@/components/AuthPreferences';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'Account and Preferences',
      kn: 'ಖಾತೆ ಮತ್ತು ಆದ್ಯತೆಗಳು',
      hi: 'खाता और प्राथमिकताएँ',
    }),
    description: pickByLocale(locale, {
      en: 'Sign in to KWIN City to manage saved preferences, newsletter choices, profile details, and personalized portal settings across research, investor, resident, and media workflows.',
      kn: 'KWIN Cityಗಾಗಿ ನಿಮ್ಮ ಉಳಿಸಿದ ಆದ್ಯತೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.',
      hi: 'KWIN City के लिए अपनी सहेजी गई प्राथमिकताएँ प्रबंधित करें।',
    }),
    alternates: { canonical: 'https://kwin-city.com/account' },
    robots: { index: false },
  };
}

export default function AccountPage() {
  return (
    <SiteFrame>
      <AuthPreferences />
    </SiteFrame>
  );
}
