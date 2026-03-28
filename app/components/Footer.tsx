'use client';

import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site.config';
import NewsletterSignup from '@/components/NewsletterSignup';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { getLocaleDefinition, pickLocalizedValue } from '@/lib/i18n/messages';

export default function Footer() {
  const { t, locale } = useI18n();
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);
  const year = new Date().getFullYear();
  const lastUpdatedText = new Date(SITE_CONFIG.lastUpdatedISO).toLocaleDateString(getLocaleDefinition(locale).htmlLang, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <footer
      className="border-t border-white/6 bg-[linear-gradient(180deg,#040714_0%,#061027_52%,#040714_100%)]"
      role="contentinfo"
    >
      {/* CTA banner */}
      <div
        className="border-b border-white/6 bg-[rgba(245,166,35,0.07)]"
      >
        <div className="container py-8 md:py-10">
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-6 py-8 md:px-9 md:py-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-7">
            <div>
              <p className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase text-[#F5A623] mb-3">{t('footer.ctaEyebrow')}</p>
              <h3 className="text-2xl font-extrabold text-white mb-3 leading-tight">
                {t('footer.ctaTitle')}
              </h3>
              <p className="text-[#9BAEC6] text-[15px] md:text-sm leading-7 max-w-xl">
                {t('footer.ctaBody')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <Link href="/about" className="btn btn-primary text-center">{t('footer.exploreKwin')}</Link>
              <Link href="/sources" className="btn btn-outline-light text-center">{t('footer.viewSources')}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Link grid */}
      <div className="container pt-16 md:pt-20 pb-14">
        <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 pt-2 md:pt-3 mb-12" role="navigation">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xl text-[#040714] bg-[linear-gradient(135deg,#F5A623,#E8A020)]"
              >
                K
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">KWIN City</span>
            </div>
            <p className="text-[15px] md:text-sm text-[#7C8EA6] leading-7 max-w-xs">
                {l({
                  en: 'A research portal for KWIN City, North Bengaluru. Built with transparent sourcing, structured for every type of visitor, and updated to reflect the best available evidence.',
                  kn: 'ಉತ್ತರ ಬೆಂಗಳೂರಿನ KWIN Cityಗಾಗಿ ಸಂಶೋಧನಾ ಪೋರ್ಟಲ್. ಪಾರದರ್ಶಕ ಮೂಲೋಕ್ತಿಯೊಂದಿಗೆ ನಿರ್ಮಿತವಾಗಿದ್ದು, ಎಲ್ಲ ರೀತಿಯ ಭೇಟಿದಾರರಿಗಾಗಿ ರಚಿಸಲ್ಪಟ್ಟಿದೆ ಮತ್ತು ಲಭ್ಯವಿರುವ ಉತ್ತಮ ಸಾಕ್ಷ್ಯಕ್ಕೆ ಅನುಗುಣವಾಗಿ ನವೀಕರಿಸಲಾಗುತ್ತದೆ.',
                  hi: 'नॉर्थ बेंगलुरु के KWIN City के लिए एक शोध पोर्टल। पारदर्शी स्रोतों के साथ निर्मित, हर प्रकार के आगंतुक के लिए संरचित, और उपलब्ध सर्वोत्तम साक्ष्य के अनुसार अपडेट किया गया।',
                  ta: 'வட பெங்களூருவிலுள்ள KWIN Cityக்கான ஆய்வு தளம். வெளிப்படையான மூலங்களுடன் உருவாக்கப்பட்டு, அனைத்து வகை பார்வையாளர்களுக்கும் ஏற்ப அமைக்கப்பட்டு, கிடைக்கக்கூடிய சிறந்த ஆதாரங்களின் அடிப்படையில் புதுப்பிக்கப்படுகிறது.',
                })}
            </p>
            <p className="text-[12px] text-[#4F6280] mt-4 tracking-[0.04em]">
              13°13&apos;N 77°32&apos;E · Doddaballapura, Karnataka
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-5" id="explore-nav">{t('header.groups.Discover')}</h4>
            <ul className="space-y-3 text-[15px] md:text-sm leading-7" aria-labelledby="explore-nav">
              <li><Link href="/about"                className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./about.label')}</Link></li>
              <li><Link href="/why-north-bengaluru"  className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./why-north-bengaluru.label')}</Link></li>
              <li><Link href="/timeline"             className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./timeline.label')}</Link></li>
              <li><Link href="/updates"              className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./updates.label')}</Link></li>
              <li><Link href="/faq"                  className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./faq.label')}</Link></li>
              <li><Link href="/sectors"              className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./sectors.label')}</Link></li>
            </ul>
          </div>

          {/* Research */}
          <div>
            <h4 className="text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-5" id="research-nav">{t('header.groups.Research')}</h4>
            <ul className="space-y-3 text-[15px] md:text-sm leading-7" aria-labelledby="research-nav">
              <li><Link href="/sustainability"      className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./sustainability.label')}</Link></li>
              <li><Link href="/data-insights"       className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./data-insights.label')}</Link></li>
              <li><Link href="/trust"               className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./trust.label')}</Link></li>
              <li><Link href="/sectors/comparison"  className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{l({ en: 'Sector Comparison', kn: 'ಕ್ಷೇತ್ರ ಹೋಲಿಕೆ', hi: 'सेक्टर तुलना', ta: 'துறை ஒப்பீடு' })}</Link></li>
              <li><Link href="/region-map"          className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{l({ en: 'Interactive Map', kn: 'ಇಂಟರಾಕ್ಟಿವ್ ನಕ್ಷೆ', hi: 'इंटरैक्टिव मानचित्र', ta: 'இணையாடல் வரைபடம்' })}</Link></li>
              <li><Link href="/evidence-library"    className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{l({ en: 'Evidence Library', kn: 'ಸಾಕ್ಷ್ಯ ಗ್ರಂಥಾಲಯ', hi: 'एविडेंस लाइब्रेरी', ta: 'ஆதார நூலகம்' })}</Link></li>
              <li><Link href="/news-intelligence"   className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./news-intelligence.label')}</Link></li>
              <li><Link href="/news-reader"         className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./news-reader.label')}</Link></li>
              <li><Link href="/evidence"            className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./evidence.label')}</Link></li>
              <li><Link href="/sources"             className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./sources.label')}</Link></li>
              <li><Link href="/downloads"           className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./downloads.label')}</Link></li>
              <li><Link href="/search"              className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('common.search')}</Link></li>
              <li><Link href="/contact"             className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('common.contact')}</Link></li>
              <li><Link href="/for"                 className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./for.label')}</Link></li>
              <li>
                <Link href="/download" className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">
                  📱 {t('header.items./download.label')}
                </Link>
              </li>
              <li>
                <a href="https://kiadb.karnataka.gov.in/" target="_blank" rel="noopener noreferrer" aria-label={l({ en: 'KIADB Portal (opens in new window)', kn: 'KIADB ಪೋರ್ಟಲ್ (ಹೊಸ ಕಿಟಕಿಯಲ್ಲಿ ತೆರೆಯುತ್ತದೆ)', hi: 'KIADB पोर्टल (नई विंडो में खुलेगा)', ta: 'KIADB தளம் (புதிய சாளரத்தில் திறக்கும்)' })} className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">
                  {l({ en: 'KIADB Portal ↗', kn: 'KIADB ಪೋರ್ಟಲ್ ↗', hi: 'KIADB पोर्टल ↗', ta: 'KIADB தளம் ↗' })}
                </a>
              </li>
            </ul>
          </div>

          {/* Context */}
          <div>
            <h4 className="text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-5" id="audience-nav">{t('header.groups.Audiences')}</h4>
            <ul className="space-y-3 text-[15px] md:text-sm leading-7" aria-labelledby="audience-nav">
              <li><Link href="/for/investor"         className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./for/investor.label')}</Link></li>
              <li><Link href="/for/resident"         className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./for/resident.label')}</Link></li>
              <li><Link href="/for/researcher"       className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./for/researcher.label')}</Link></li>
              <li><Link href="/for/journalist"       className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./for/journalist.label')}</Link></li>
              <li><Link href="/for/curious-citizens" className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">{t('header.items./for/curious-citizens.label')}</Link></li>
            </ul>
          </div>

          {/* Open Data */}
          <div>
            <h4 className="text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-5" id="data-nav">{l({ en: 'Open Data', kn: 'ಮುಕ್ತ ಡೇಟಾ', hi: 'ओपन डेटा', ta: 'திறந்த தரவு' })}</h4>
            <ul className="space-y-3 text-[15px] md:text-sm leading-7" aria-labelledby="data-nav">
              <li>
                <a href="https://data.opencity.in/dataset/bengaluru-aviation-traffic-data" target="_blank" rel="noopener noreferrer" aria-label={l({ en: 'Aviation Data (opens in new window)', kn: 'ವಿಮಾನ ಡೇಟಾ (ಹೊಸ ಕಿಟಕಿಯಲ್ಲಿ ತೆರೆಯುತ್ತದೆ)', hi: 'एविएशन डेटा (नई विंडो में खुलेगा)', ta: 'விமானத் தரவு (புதிய சாளரத்தில் திறக்கும்)' })} className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">
                  {l({ en: 'Aviation Data ↗', kn: 'ವಿಮಾನ ಡೇಟಾ ↗', hi: 'एविएशन डेटा ↗', ta: 'விமானத் தரவு ↗' })}
                </a>
              </li>
              <li>
                <a href="https://data.opencity.in/dataset/bengaluru-strr-via-bannerughatta-national-park-documents" target="_blank" rel="noopener noreferrer" aria-label={l({ en: 'STRR Documents (opens in new window)', kn: 'STRR ದಾಖಲೆಗಳು (ಹೊಸ ಕಿಟಕಿಯಲ್ಲಿ ತೆರೆಯುತ್ತದೆ)', hi: 'STRR दस्तावेज़ (नई विंडो में खुलेगा)', ta: 'STRR ஆவணங்கள் (புதிய சாளரத்தில் திறக்கும்)' })} className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">
                  {l({ en: 'STRR Documents ↗', kn: 'STRR ದಾಖಲೆಗಳು ↗', hi: 'STRR दस्तावेज़ ↗', ta: 'STRR ஆவணங்கள் ↗' })}
                </a>
              </li>
              <li>
                <a href="https://data.opencity.in/dataset/economic-survey-of-karnataka-2025-26" target="_blank" rel="noopener noreferrer" aria-label={l({ en: 'Economic Survey (opens in new window)', kn: 'ಆರ್ಥಿಕ ಸಮೀಕ್ಷೆ (ಹೊಸ ಕಿಟಕಿಯಲ್ಲಿ ತೆರೆಯುತ್ತದೆ)', hi: 'आर्थिक सर्वेक्षण (नई विंडो में खुलेगा)', ta: 'பொருளாதார ஆய்வு (புதிய சாளரத்தில் திறக்கும்)' })} className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">
                  {l({ en: 'Economic Survey ↗', kn: 'ಆರ್ಥಿಕ ಸಮೀಕ್ಷೆ ↗', hi: 'आर्थिक सर्वेक्षण ↗', ta: 'பொருளாதார ஆய்வு ↗' })}
                </a>
              </li>
              <li>
                <a href="https://data.opencity.in/dataset/bengaluru-lakes-and-their-maintainers" target="_blank" rel="noopener noreferrer" aria-label={l({ en: 'Lakes Governance (opens in new window)', kn: 'ಸರೋವರ ಆಡಳಿತ (ಹೊಸ ಕಿಟಕಿಯಲ್ಲಿ ತೆರೆಯುತ್ತದೆ)', hi: 'झील प्रशासन (नई विंडो में खुलेगा)', ta: 'ஏரி நிர்வாகம் (புதிய சாளரத்தில் திறக்கும்)' })} className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">
                  {l({ en: 'Lakes Governance ↗', kn: 'ಸರೋವರ ಆಡಳಿತ ↗', hi: 'झील प्रशासन ↗', ta: 'ஏரி நிர்வாகம் ↗' })}
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div id="newsletter" className="border-t border-white/10 pt-10 pb-2">
          <NewsletterSignup variant="footer" />
        </div>

        {/* ── Trust & Certification Badges ── */}
        <div className="border-t border-white/6 py-7">
          <p className="text-center text-[10px] font-bold tracking-[0.2em] uppercase text-[#475569] mb-5">
            {l({ en: 'Certifications & Trust', kn: 'ಪ್ರಮಾಣಪತ್ರಗಳು ಮತ್ತು ವಿಶ್ವಾಸ', hi: 'प्रमाणन और भरोसा', ta: 'சான்றிதழ்கள் மற்றும் நம்பிக்கை' })}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {([
              { icon: '🔒', label: l({ en: 'SSL / TLS Secured', kn: 'SSL / TLS ಸುರಕ್ಷಿತ', hi: 'SSL / TLS सुरक्षित', ta: 'SSL / TLS பாதுகாப்பு' }), href: 'https://www.ssllabs.com/ssltest/analyze.html?d=kwin-city.com' },
              { icon: '✓',  label: l({ en: 'Schema.org Rich Results', kn: 'Schema.org ಸಮೃದ್ಧ ಫಲಿತಾಂಶಗಳು', hi: 'Schema.org रिच रिज़ल्ट्स', ta: 'Schema.org செறிந்த முடிவுகள்' }), href: 'https://search.google.com/test/rich-results?url=https%3A%2F%2Fkwin-city.com' },
              { icon: '🔍', label: l({ en: 'Bing Webmaster Verified', kn: 'Bing ವೆಬ್‌ಮಾಸ್ಟರ್ ಪರಿಶೀಲಿತ', hi: 'Bing वेबमास्टर सत्यापित', ta: 'Bing வெப்மாஸ்டர் சரிபார்க்கப்பட்டது' }), href: 'https://kwin-city.com/BingSiteAuth.xml' },
              { icon: '🛡️', label: l({ en: 'HSTS Protected', kn: 'HSTS ರಕ್ಷಿತ', hi: 'HSTS संरक्षित', ta: 'HSTS பாதுகாப்பில்' }), href: 'https://hstspreload.org/?domain=kwin-city.com' },
              { icon: '📊', label: l({ en: 'Open Data', kn: 'ಮುಕ್ತ ಡೇಟಾ', hi: 'ओपन डेटा', ta: 'திறந்த தரவு' }), href: 'https://data.opencity.in/' },
              { icon: '🌐', label: l({ en: 'Google Search Console', kn: 'Google ಹುಡುಕಾಟ ಕನ್ಸೋಲ್', hi: 'Google सर्च कंसोल', ta: 'Google தேடல் கன்சோல்' }), href: 'https://search.google.com/search-console' },
              { icon: '⚡', label: l({ en: 'Next.js 15', kn: 'Next.js 15', hi: 'Next.js 15', ta: 'Next.js 15' }), href: 'https://nextjs.org' },
              { icon: '🚀', label: l({ en: 'Deployed on Netlify', kn: 'Netlify ನಲ್ಲಿ ನಿಯೋಜಿತ', hi: 'Netlify पर तैनात', ta: 'Netlify இல் வெளியிடப்பட்டது' }), href: 'https://netlify.com' },
            ] as { icon: string; label: string; href: string }[]).map((b) => (
              <a
                key={b.label}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                title={b.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] text-[#94A3B8] hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all"
              >
                <span aria-hidden="true">{b.icon}</span>
                <span>{b.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 mt-2 px-5 py-5 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left — copyright + author inline */}
          <div className="flex items-center gap-2.5 text-[11px] text-[#64748B]">
            <span className="text-[#475569]">© {year} BAJA Associates</span>
            <span className="w-px h-3 bg-white/10" />
            <span>Aarti S Ravikumar</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="hidden sm:inline">{l({ en: 'Content protected by copyright', kn: 'ವಿಷಯವು ಕಾಪಿರೈಟ್ ರಕ್ಷಿತವಾಗಿದೆ', hi: 'सामग्री कॉपीराइट से संरक्षित है', ta: 'உள்ளடக்கம் பதிப்புரிமையால் பாதுகாக்கப்படுகிறது' })}</span>
          </div>
          {/* Right — links + tagline */}
          <div className="flex items-center gap-2.5 text-[11px] text-[#64748B]">
            <span className="hidden md:inline">{t('footer.openData')}</span>
            <span className="hidden md:inline w-px h-3 bg-white/10" />
            <span className="hidden md:inline">{t('footer.lastUpdated')}</span>
            <time className="hidden md:inline text-[#4F6280]" dateTime={SITE_CONFIG.lastUpdatedISO}>{lastUpdatedText}</time>
            <span className="hidden md:inline w-px h-3 bg-white/10" />
            <Link href="/terms" className="text-[#4F6280] hover:text-white transition-colors">{t('common.terms')}</Link>
            <span className="w-px h-3 bg-white/10" />
            <Link href="/sources" className="text-[#4F6280] hover:text-white transition-colors">{t('common.sources')}</Link>
            <span className="w-px h-3 bg-white/10" />
            <Link href="/contact" className="text-[#4F6280] hover:text-white transition-colors">{t('common.contact')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
