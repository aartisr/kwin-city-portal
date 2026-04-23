import Link from 'next/link';
import DeferredNewsletterSignup from '@/components/DeferredNewsletterSignup';
import FooterNavLink from '@/components/footer/FooterNavLink';
import { buildFooterContent } from '@/components/footer/content';
import {
  pickLocalizedValue,
  translate,
  type Locale,
} from '@/lib/i18n/messages';

export default function Footer({ locale }: { locale: Locale }) {
  const t = (key: string) => translate(locale, key);
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);
  const year = new Date().getFullYear();
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
              <span className="text-[#8AA1BA]">© {year} BAJA Associates</span>
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-white/20" />
              <span>Aarti S Ravikumar</span>
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-white/20" />
              <span>{l({ en: 'Evidence-first publishing', kn: 'ಸಾಕ್ಷ್ಯ-ಪ್ರಥಮ ಪ್ರಕಟಣೆ', hi: 'एविडेंस-फर्स्ट पब्लिशिंग', ta: 'ஆதார-முன்னுரிமை வெளியீடு' })}</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-[#6C819A]">
              <span>{t('footer.openData')}</span>
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-white/20" />
              <Link href="/terms" className="text-[#91A8C0] hover:text-white transition-colors">{t('common.terms')}</Link>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <Link href="/sources" className="text-[#91A8C0] hover:text-white transition-colors">{t('common.sources')}</Link>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <Link href="/contact" className="text-[#91A8C0] hover:text-white transition-colors">{t('common.contact')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
