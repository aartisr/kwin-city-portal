import Footer from '@/components/Footer';
import SiteChrome from '@/components/SiteChrome';
import { cookies } from 'next/headers';
import { HIGH_LEVEL_MENUS } from '@/components/header/navigation';
import type { NavGroup } from '@/components/header/types';
import { normalizeLocale, pickLocalizedValue, translate } from '@/lib/i18n/messages';

function getTranslatedMenus(locale: ReturnType<typeof normalizeLocale>): NavGroup[] {
  return HIGH_LEVEL_MENUS.map((group) => ({
    label: translate(locale, `header.groups.${group.label}`),
    items: group.items.map((item) => ({
      ...item,
      label: translate(locale, `header.items.${item.href}.label`),
      desc: item.desc ? translate(locale, `header.items.${item.href}.desc`) : undefined,
    })),
  }));
}

export default async function SiteFrame({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get('kwin_locale')?.value);
  const menuGroups = getTranslatedMenus(locale);

  return (
    <>
      <SiteChrome
        menuGroups={menuGroups}
        headerLabels={{
          search: translate(locale, 'common.search'),
          account: translate(locale, 'common.account'),
          signedIn: translate(locale, 'common.signedIn'),
          trust: translate(locale, 'common.trust'),
          hideTrustBar: translate(locale, 'common.hideTrustBar'),
          showTrustBar: translate(locale, 'common.showTrustBar'),
          toggleMenu: translate(locale, 'common.toggleMenu'),
          exploreKwin: translate(locale, 'common.exploreKwin'),
          language: translate(locale, 'common.language'),
        }}
        trustBannerCopy={{
          protocolLabel: pickLocalizedValue(locale, {
            en: 'Trust Protocol:',
            kn: 'ವಿಶ್ವಾಸ ಪ್ರೋಟೋಕಾಲ್:',
            hi: 'ट्रस्ट प्रोटोकॉल:',
            ta: 'நம்பிக்கை நெறிமுறை:',
          }),
          bodyText: pickLocalizedValue(locale, {
            en: 'every major claim must be source-linked, status-labeled, and reviewable for what it can and cannot prove.',
            kn: 'ಪ್ರತಿಯೊಂದು ಪ್ರಮುಖ ಹೇಳಿಕೆಯೂ ಮೂಲ-ಲಿಂಕ್, ಸ್ಥಿತಿ-ಲೇಬಲ್ ಹೊಂದಿರಬೇಕು ಮತ್ತು ಅದು ಏನು ಸಾಬೀತು ಮಾಡಬಹುದು/ಮಾಡಲಾರದು ಎಂಬುದಕ್ಕೆ ವಿಮರ್ಶಿಸಬಹುದಾಗಿರಬೇಕು.',
            hi: 'हर प्रमुख दावे को स्रोत-लिंक, स्थिति-लेबल के साथ प्रस्तुत किया जाना चाहिए और वह क्या सिद्ध कर सकता है/नहीं कर सकता, इसकी समीक्षा संभव होनी चाहिए।',
            ta: 'ஒவ்வொரு முக்கிய கூற்றும் மூல இணைப்பு, நிலை குறிச்சொல் உடன் இருக்க வேண்டும்; அது எதை நிரூபிக்க முடியும்/முடியாது என்பதை ஆய்வு செய்யக்கூடியதாக இருக்க வேண்டும்.',
          }),
          trustLabel: translate(locale, 'header.items./trust.label'),
          sourcesLabel: translate(locale, 'header.items./sources.label'),
          newsIntelligenceLabel: translate(locale, 'header.items./news-intelligence.label'),
        }}
      />
      {children}
      <Footer locale={locale} />
    </>
  );
}
