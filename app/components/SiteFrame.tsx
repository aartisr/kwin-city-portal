import Footer from '@/components/Footer';
import SiteChrome from '@/components/SiteChrome';
import { cookies } from 'next/headers';
import { HIGH_LEVEL_MENUS } from '@/components/header/navigation';
import type { NavGroup } from '@/components/header/types';
import { normalizeLocale, pickLocalizedValue, translate } from '@/lib/i18n/messages';
import { getSiteFreshnessStatus } from '@/lib/operations/site-freshness';

function withFallback(translated: string, key: string, fallback: string): string {
  return translated === key ? fallback : translated;
}

function getTranslatedMenus(locale: ReturnType<typeof normalizeLocale>): NavGroup[] {
  return HIGH_LEVEL_MENUS.map((group) => ({
    key: group.key,
    label: withFallback(
      translate(locale, `header.groups.${group.label}`),
      `header.groups.${group.label}`,
      group.label
    ),
    items: group.items.map((item) => ({
      ...item,
      label: withFallback(
        translate(locale, `header.items.${item.href}.label`),
        `header.items.${item.href}.label`,
        item.label
      ),
      desc: item.desc
        ? withFallback(
            translate(locale, `header.items.${item.href}.desc`),
            `header.items.${item.href}.desc`,
            item.desc
          )
        : undefined,
    })),
  }));
}

export default async function SiteFrame({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get('kwin_locale')?.value);
  const menuGroups = getTranslatedMenus(locale);
  const freshness = getSiteFreshnessStatus();

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
          degraded: freshness.degraded,
          contentAgeDays: freshness.content.ageDays,
          factualAuditAgeDays: freshness.factualAudit.ageDays,
          executionStatusAgeDays: freshness.executionStatus.ageDays,
          statusText: freshness.degraded
            ? pickLocalizedValue(locale, {
                en: `Freshness watch: content baseline ${freshness.content.ageDays}d, factual audit ${freshness.factualAudit.ageDays}d, execution status ${freshness.executionStatus.ageDays}d old.`,
                kn: `ತಾಜಾತನ ವೀಕ್ಷಣೆ: ವಿಷಯ ಆಧಾರ ${freshness.content.ageDays} ದಿನ, ವಾಸ್ತವ ಪರಿಶೀಲನೆ ${freshness.factualAudit.ageDays} ದಿನ, ಕಾರ್ಯಗತ ಸ್ಥಿತಿ ${freshness.executionStatus.ageDays} ದಿನ ಹಳೆಯದು.`,
                hi: `फ्रेशनैस वॉच: कंटेंट बेसलाइन ${freshness.content.ageDays} दिन, तथ्य ऑडिट ${freshness.factualAudit.ageDays} दिन, एग्जिक्यूशन स्टेटस ${freshness.executionStatus.ageDays} दिन पुराना है।`,
                ta: `புதியமை கண்காணிப்பு: உள்ளடக்க அடிப்படை ${freshness.content.ageDays} நாள், உண்மை ஆய்வு ${freshness.factualAudit.ageDays} நாள், செயலாக்க நிலை ${freshness.executionStatus.ageDays} நாள் பழையது.`,
              })
            : pickLocalizedValue(locale, {
                en: `Last verification sweep: factual audit ${freshness.factualAudit.ageDays}d ago, execution status ${freshness.executionStatus.ageDays}d ago.`,
                kn: `ಕೊನೆಯ ಪರಿಶೀಲನಾ ಸುತ್ತು: ವಾಸ್ತವ ಪರಿಶೀಲನೆ ${freshness.factualAudit.ageDays} ದಿನಗಳ ಹಿಂದೆ, ಕಾರ್ಯಗತ ಸ್ಥಿತಿ ${freshness.executionStatus.ageDays} ದಿನಗಳ ಹಿಂದೆ.`,
                hi: `अंतिम सत्यापन स्वीप: तथ्य ऑडिट ${freshness.factualAudit.ageDays} दिन पहले, एग्जिक्यूशन स्टेटस ${freshness.executionStatus.ageDays} दिन पहले।`,
                ta: `கடைசி சரிபார்ப்பு சுற்று: உண்மை ஆய்வு ${freshness.factualAudit.ageDays} நாள் முன், செயலாக்க நிலை ${freshness.executionStatus.ageDays} நாள் முன்.`,
              }),
        }}
      />
      {children}
      <Footer locale={locale} freshness={freshness} />
    </>
  );
}
