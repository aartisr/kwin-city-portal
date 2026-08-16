import Link from 'next/link';
import type { ReactNode } from 'react';
import DeferredNewsletterSignup from '@/components/DeferredNewsletterSignup';
import { SITE_CONFIG } from '@/config/site.config';
import FooterNavLink from '@/components/footer/FooterNavLink';
import { buildFooterContent } from '@/components/footer/content';
import type { SiteFreshnessStatus } from '@/lib/operations/site-freshness';
import { calculateFreshnessSlaScore } from '@/lib/operations/freshness-score';
import {
  pickLocalizedValue,
  translate,
  type Locale,
} from '@/lib/i18n/messages';

function FacebookIcon() {
  return (
    <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M13.6 22v-8.1h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.8-.1-1.6-.2-2.4-.2-2.5 0-4.2 1.5-4.2 4.3v2.4H7.5v3.2h2.8V22h3.3Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="m13.9 10.5 7.4-8.5h-1.8l-6.4 7.4L8 2H2.1l7.8 11.3L2.1 22h1.8l6.8-7.7 5.4 7.7H22l-8.1-11.5Zm-2.4 2.7-.8-1.1L4.5 3.3h2.6l5 7.1.8 1.1 6.6 9.3h-2.6l-5.4-7.6Z"
      />
    </svg>
  );
}

function SocialFooterLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`KWIN City on ${label}`}
      className="inline-flex items-center gap-1.5 text-[#91A8C0] transition-colors hover:text-white"
    >
      {children}
      <span>{label}</span>
    </a>
  );
}

export default function Footer({ locale, freshness }: { locale: Locale; freshness: SiteFreshnessStatus }) {
  const t = (key: string) => translate(locale, key);
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);
  const year = new Date().getFullYear();
  const freshnessScore = calculateFreshnessSlaScore({
    contentAgeDays: freshness.content.ageDays,
    factualAuditAgeDays: freshness.factualAudit.ageDays,
    executionStatusAgeDays: freshness.executionStatus.ageDays,
  });
  const {
    lastUpdatedText,
    quickRoutes,
    signalCards,
    audienceCards,
    footerGroups,
    trustCards,
    credibilityRail,
  } = buildFooterContent(locale);

  return (
    <footer
      className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#030611_0%,#071224_38%,#08192F_62%,#030611_100%)]"
      role="contentinfo"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-10 h-48 w-48 rounded-full bg-[#F5A623]/12 blur-3xl md:h-72 md:w-72" />
        <div className="absolute right-[-10%] top-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl md:h-96 md:w-96" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
        <div className="absolute bottom-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent" />
      </div>

      <div className="container relative py-12 md:py-16 lg:py-20">
        <section className="footer-panel kwin-fade-up overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_28px_80px_rgba(2,6,23,0.35)]" style={{ animationDelay: '0.04s' }}>
          <div className="grid gap-8 px-5 py-6 sm:px-7 sm:py-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-10 lg:py-10">
            <div className="kwin-fade-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#F5A623] md:text-xs">
                {t('footer.ctaEyebrow')}
              </p>
              <div className="mt-4 max-w-2xl">
                <h3 className="text-[2rem] font-extrabold leading-[1.02] tracking-[-0.05em] text-white md:text-[3.3rem]">
                  {t('footer.ctaTitle')}
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#B5C6D9] md:text-[16px]">
                  {t('footer.ctaBody')}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/about" className="btn btn-primary text-center">
                  {t('footer.exploreKwin')}
                </Link>
                <Link href="/sources" className="btn btn-outline-light text-center">
                  {t('footer.viewSources')}
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {credibilityRail.map((item) => (
                  <span
                    key={item.label}
                    className="footer-chip inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-[11px] font-semibold tracking-[0.03em] text-[#D6E3F1]"
                  >
                    <span className="text-[#F5A623]" aria-hidden="true">{item.icon}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 kwin-fade-up" style={{ animationDelay: '0.16s' }}>
              <div className="footer-panel rounded-[1.5rem] border border-white/10 bg-[#07111F]/85 p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                      {l({ en: 'Decision Desk', kn: 'ನಿರ್ಧಾರ ಡೆಸ್ಕ್', hi: 'डिसीजन डेस्क', ta: 'முடிவு மேசை' })}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#9DB1C8]">
                      {l({
                        en: 'Borrowing from Stripe, GitHub, and Notion: the footer should help you choose your next move instantly.',
                        kn: 'Stripe, GitHub, ಮತ್ತು Notion ನಿಂದ ಪ್ರೇರಣೆ: ಫುಟರ್ ನಿಮ್ಮ ಮುಂದಿನ ಕ್ರಮವನ್ನು ತಕ್ಷಣ ಆಯ್ಕೆಮಾಡಲು ಸಹಾಯ ಮಾಡಬೇಕು.',
                        hi: 'Stripe, GitHub और Notion से प्रेरित: फुटर को तुरंत अगला कदम चुनने में मदद करनी चाहिए।',
                        ta: 'Stripe, GitHub, Notion பாணியில்: அடிக்குறிப்பு உடனே அடுத்த செயலை தேர்வு செய்ய உதவ வேண்டும்.',
                      })}
                    </p>
                  </div>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200">
                    {l({ en: 'Fast paths', kn: 'ವೇಗದ ಮಾರ್ಗಗಳು', hi: 'फास्ट पाथ्स', ta: 'வேகமான பாதைகள்' })}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {quickRoutes.map((route) => (
                    <FooterNavLink key={route.href} link={route} />
                  ))}
                </div>
              </div>

              <div id="newsletter" className="footer-panel rounded-[1.5rem] border border-white/10 bg-[linear-gradient(160deg,rgba(245,166,35,0.10),rgba(6,182,212,0.10))] p-5 md:p-6">
                <DeferredNewsletterSignup />
              </div>
            </div>
          </div>

          <div className="grid gap-3 border-t border-white/8 px-5 py-5 sm:px-7 lg:grid-cols-4 lg:px-10">
            {signalCards.map((card, index) => (
              <article
                key={card.title}
                className="footer-panel kwin-fade-up rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4 transition-transform duration-300 hover:-translate-y-1 hover:bg-white/[0.05]"
                style={{ animationDelay: `${0.22 + index * 0.05}s` }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5A623]">{card.eyebrow}</p>
                <h4 className="mt-2 text-[15px] font-bold leading-6 text-white">{card.title}</h4>
                <p className="mt-2 text-[13px] leading-6 text-[#90A4BD]">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="footer-panel kwin-fade-up rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 md:p-7" style={{ animationDelay: '0.18s' }}>
              <div className="flex items-center gap-3">
                <div className="footer-brand-mark flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#F5A623,#E8A020)] text-xl font-extrabold text-[#040714] shadow-[0_12px_28px_rgba(232,160,32,0.35)]">
                  K
                </div>
                <div>
                  <p className="text-lg font-extrabold tracking-tight text-white">KWIN City</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6E859F]">
                    {l({ en: 'North Bengaluru', kn: 'ಉತ್ತರ ಬೆಂಗಳೂರು', hi: 'नॉर्थ बेंगलुरु', ta: 'வட பெங்களூரு' })}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[15px] leading-7 text-[#B1C2D6]">
                {l({
                  en: 'A research portal for KWIN City, designed to feel more like a decision interface than a marketing brochure.',
                  kn: 'KWIN Cityಗಾಗಿ ಸಂಶೋಧನಾ ಪೋರ್ಟಲ್, ಮಾರುಕಟ್ಟೆ ಬ್ರೋಶರ್ ಗಿಂತ ನಿರ್ಧಾರ ಇಂಟರ್‌ಫೇಸ್‌ನಂತೆ ಅನುಭವವಾಗುವಂತೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
                  hi: 'KWIN City के लिए एक शोध पोर्टल, जिसे मार्केटिंग ब्रोशर से अधिक एक निर्णय इंटरफेस जैसा महसूस हो, इस तरह बनाया गया है।',
                  ta: 'KWIN Cityக்கான ஆய்வு தளம்; விளம்பர பிரோஷரை விட ஒரு முடிவு இடைமுகம் போல உணரப்படுமாறு வடிவமைக்கப்பட்டது.',
                })}
              </p>

              <div className="footer-panel mt-5 rounded-[1.25rem] border border-white/8 bg-[#07111E]/90 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                  {l({ en: 'Navigate by audience', kn: 'ಪ್ರೇಕ್ಷಕರ ಪ್ರಕಾರ ಸಂಚರಿಸಿ', hi: 'दर्शक के अनुसार नेविगेट करें', ta: 'பார்வையாளர்படி வழிசெல்' })}
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {audienceCards.map((card) => (
                    <FooterNavLink key={card.href} link={card} />
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] text-[#6E859F]">
                <span>13°13&apos;N 77°32&apos;E</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>Doddaballapura, Karnataka</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>{t('footer.lastUpdated')} {lastUpdatedText}</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className={freshness.degraded ? 'text-amber-300' : 'text-emerald-300'}>
                  {freshness.degraded
                    ? l({ en: 'Verification signal degraded', kn: 'ಪರಿಶೀಲನಾ ಸೂಚನೆ ಕುಗ್ಗಿದೆ', hi: 'वेरिफिकेशन सिग्नल कमजोर है', ta: 'சரிபார்ப்பு சிக்னல் பலவீனமானது' })
                    : l({ en: 'Verified recently', kn: 'ಇತ್ತೀಚೆಗೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ', hi: 'हाल में सत्यापित', ta: 'சமீபத்தில் சரிபார்க்கப்பட்டது' })}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <nav className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" role="navigation" aria-label="Footer navigation">
              {footerGroups.map((group, index) => (
                <section
                  key={group.title}
                  className="footer-panel kwin-fade-up rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-4 md:p-5"
                  style={{ animationDelay: `${0.22 + index * 0.05}s` }}
                >
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5A623]">
                    {group.title}
                  </h4>
                  <div className="mt-3 space-y-1">
                    {group.links.map((link) => (
                      <FooterNavLink key={`${group.title}-${link.href}`} link={link} />
                    ))}
                  </div>
                </section>
              ))}
            </nav>
          </div>
        </section>

        <section className="mt-8">
          <article className={`footer-panel kwin-fade-up rounded-[1.8rem] border p-5 md:p-6 ${
            freshness.degraded
              ? 'border-amber-300/45 bg-[linear-gradient(145deg,rgba(245,158,11,0.16),rgba(251,191,36,0.08),rgba(14,116,144,0.18))]'
              : 'border-emerald-300/35 bg-[linear-gradient(145deg,rgba(16,185,129,0.16),rgba(14,165,233,0.12),rgba(6,95,70,0.18))]'
          }`} style={{ animationDelay: '0.24s' }}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/85">
                  {l({ en: 'Freshness command center', kn: 'ತಾಜಾತನ ಕಮಾಂಡ್ ಸೆಂಟರ್', hi: 'फ्रेशनैस कमांड सेंटर', ta: 'புதியமை கட்டளை மையம்' })}
                </p>
                <h4 className="mt-2 text-xl font-extrabold tracking-tight text-white md:text-2xl">
                  {freshness.degraded
                    ? l({ en: 'Verification signal needs attention', kn: 'ಪರಿಶೀಲನಾ ಸೂಚನೆಗೆ ಗಮನ ಬೇಕಿದೆ', hi: 'वेरिफिकेशन सिग्नल को ध्यान चाहिए', ta: 'சரிபார்ப்பு சிக்னலுக்கு கவனம் தேவை' })
                    : l({ en: 'Verification signal is strong', kn: 'ಪರಿಶೀಲನಾ ಸೂಚನೆ ಬಲವಾಗಿದೆ', hi: 'वेरिफिकेशन सिग्नल मजबूत है', ta: 'சரிபார்ப்பு சிக்னல் வலுவாக உள்ளது' })}
                </h4>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  {freshness.degraded
                    ? l({ en: 'We publish with visible confidence bands. Some freshness rails are above target and are being refreshed.', kn: 'ನಾವು ದೃಶ್ಯ ವಿಶ್ವಾಸ ಮಟ್ಟಗಳೊಂದಿಗೆ ಪ್ರಕಟಿಸುತ್ತೇವೆ. ಕೆಲವು ತಾಜಾತನ ಮಾನದಂಡಗಳು ಗುರಿಗಿಂತ ಹೆಚ್ಚಾಗಿವೆ ಮತ್ತು ಈಗ ನವೀಕರಣ ನಡೆಯುತ್ತಿದೆ.', hi: 'हम दृश्य कॉन्फिडेंस बैंड्स के साथ प्रकाशित करते हैं। कुछ फ्रेशनैस रेल लक्ष्य से ऊपर हैं और रीफ्रेश हो रहे हैं।', ta: 'காட்சிப்படுத்தப்பட்ட நம்பிக்கை அளவுகளுடன் வெளியிடுகிறோம். சில புதியமை குறிகாட்டிகள் இலக்கை மீறியுள்ளன; அவை புதுப்பிக்கப்படுகின்றன.' })
                    : l({ en: 'All freshness rails are within target windows for content, factual audit, and execution status.', kn: 'ವಿಷಯ, ವಾಸ್ತವ ಪರಿಶೀಲನೆ ಮತ್ತು ಕಾರ್ಯಗತ ಸ್ಥಿತಿ ಕುರಿತ ಎಲ್ಲಾ ತಾಜಾತನ ಮಾನದಂಡಗಳು ಗುರಿ ಮಿತಿಗಳಲ್ಲಿವೆ.', hi: 'कंटेंट, तथ्य ऑडिट और एग्जिक्यूशन स्टेटस के लिए सभी फ्रेशनैस रेल लक्षित विंडो में हैं।', ta: 'உள்ளடக்கம், உண்மை ஆய்வு, செயலாக்க நிலை ஆகிய அனைத்தும் இலக்கு வரம்பிற்குள் உள்ளன.' })}
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-black/15 px-4 py-3 min-w-[220px]">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/75">
                  {l({ en: 'Freshness SLA', kn: 'ತಾಜಾತನ SLA', hi: 'फ्रेशनैस SLA', ta: 'புதியமை SLA' })}
                </p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-extrabold text-white">{freshnessScore}</span>
                  <span className="mb-1 text-sm font-semibold text-white/80">/ 100</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
                  <div
                    className={`h-full rounded-full ${freshness.degraded ? 'bg-amber-300' : 'bg-emerald-300'}`}
                    style={{ width: `${freshnessScore}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/15 bg-black/10 p-3.5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/70">Content baseline</p>
                <p className="mt-1 text-lg font-bold text-white">{freshness.content.ageDays}d</p>
                <p className="text-xs text-white/75">{l({ en: 'Target ≤ 3 days', kn: 'ಗುರಿ ≤ 3 ದಿನ', hi: 'लक्ष्य ≤ 3 दिन', ta: 'இலக்கு ≤ 3 நாள்' })}</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-black/10 p-3.5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/70">Factual audit</p>
                <p className="mt-1 text-lg font-bold text-white">{freshness.factualAudit.ageDays}d</p>
                <p className="text-xs text-white/75">{l({ en: 'Target ≤ 14 days', kn: 'ಗುರಿ ≤ 14 ದಿನ', hi: 'लक्ष्य ≤ 14 दिन', ta: 'இலக்கு ≤ 14 நாள்' })}</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-black/10 p-3.5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/70">Execution status</p>
                <p className="mt-1 text-lg font-bold text-white">{freshness.executionStatus.ageDays}d</p>
                <p className="text-xs text-white/75">{l({ en: 'Target ≤ 14 days', kn: 'ಗುರಿ ≤ 14 ದಿನ', hi: 'लक्ष्य ≤ 14 दिन', ta: 'இலக்கு ≤ 14 நாள்' })}</p>
              </div>
            </div>
          </article>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {trustCards.map((card, index) => (
            <article
              key={card.title}
              className="footer-panel kwin-fade-up rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5"
              style={{ animationDelay: `${0.28 + index * 0.05}s` }}
            >
              <div className={`mb-4 h-1.5 w-16 rounded-full bg-gradient-to-r ${card.accent}`} />
              <h4 className="text-base font-bold text-white">{card.title}</h4>
              <p className="mt-2 text-sm leading-6 text-[#9CB1C8]">{card.body}</p>
              <div className="mt-4">
                <Link
                  href={card.link.href}
                  className="footer-action-link inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-[#DCE8F4] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  {card.link.label}
                  <span aria-hidden="true" className="footer-action-arrow">→</span>
                </Link>
              </div>
            </article>
          ))}
        </section>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-[#6C819A]">
              <a href="https://baja.kwin-city.com" className="text-[#8AA1BA] transition-colors hover:text-white hover:underline">© {year} BAJA Associates</a>
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-white/20" />
              <a
                href="https://ai-aarti.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8AA1BA] underline decoration-white/20 underline-offset-2 transition-colors hover:text-white hover:decoration-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                aria-label="Aarti S Ravikumar website (opens in a new tab)"
              >
                Aarti S Ravikumar
              </a>
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-white/20" />
              <span>{l({ en: 'Evidence-first publishing', kn: 'ಸಾಕ್ಷ್ಯ-ಪ್ರಥಮ ಪ್ರಕಟಣೆ', hi: 'एविडेंस-फर्स्ट पब्लिशिंग', ta: 'ஆதார-முன்னுரிமை வெளியீடு' })}</span>
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-white/20" />
              <time
                dateTime={SITE_CONFIG.lastUpdatedISO}
                title={l({ en: 'Last site content update', kn: 'ಕೊನೆಯ ಸೈಟ್ ವಿಷಯ ನವೀಕರಣ', hi: 'अंतिम साइट सामग्री अपडेट', ta: 'கடைசி தள உள்ளடக்கப் புதுப்பிப்பு' })}
                className="text-[#536A84]"
              >
                {t('footer.lastUpdated')} {lastUpdatedText}
              </time>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-[#6C819A]">
              <span>{t('footer.openData')}</span>
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-white/20" />
              <span className="text-[#91A8C0]">
                {l({ en: 'Factual audit', kn: 'ವಾಸ್ತವ ಪರಿಶೀಲನೆ', hi: 'तथ्य ऑडिट', ta: 'உண்மைச் சரிபார்ப்பு' })}: {freshness.factualAudit.ageDays}d
              </span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <Link href="/terms" className="text-[#91A8C0] hover:text-white transition-colors">{t('common.terms')}</Link>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <Link href="/sources" className="text-[#91A8C0] hover:text-white transition-colors">{t('common.sources')}</Link>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <Link href="/contact" className="text-[#91A8C0] hover:text-white transition-colors">{t('common.contact')}</Link>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <SocialFooterLink href={SITE_CONFIG.socialLinks.x} label="X">
                <XIcon />
              </SocialFooterLink>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <SocialFooterLink href={SITE_CONFIG.socialLinks.facebook} label="Facebook">
                <FacebookIcon />
              </SocialFooterLink>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <SocialFooterLink href={SITE_CONFIG.socialLinks.instagram} label="Instagram">
                <InstagramIcon />
              </SocialFooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
