'use client';

import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site.config';
import NewsletterSignup from '@/components/NewsletterSignup';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function Footer() {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();
  const localeMap: Record<string, string> = {
    en: 'en-IN',
    kn: 'kn-IN',
    hi: 'hi-IN',
  };
  const lastUpdatedText = new Date(SITE_CONFIG.lastUpdatedISO).toLocaleDateString(localeMap[locale] ?? 'en-IN', {
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
              A research portal for KWIN City, North Bengaluru. Built with transparent sourcing, structured for
              every type of visitor, and updated to reflect the best available evidence.
            </p>
            <p className="text-[12px] text-[#4F6280] mt-4 tracking-[0.04em]">
              13°13&apos;N 77°32&apos;E · Doddaballapura, Karnataka
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-5" id="explore-nav">Explore</h4>
            <ul className="space-y-3 text-[15px] md:text-sm leading-7" aria-labelledby="explore-nav">
              <li><Link href="/about"                className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">About KWIN</Link></li>
              <li><Link href="/why-north-bengaluru"  className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Why North Bengaluru</Link></li>
              <li><Link href="/timeline"             className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Development Timeline</Link></li>
              <li><Link href="/updates"              className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Updates Feed</Link></li>
              <li><Link href="/faq"                  className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">FAQ</Link></li>
              <li><Link href="/sectors"              className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Industry Sectors</Link></li>
            </ul>
          </div>

          {/* Research */}
          <div>
            <h4 className="text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-5" id="research-nav">Research</h4>
            <ul className="space-y-3 text-[15px] md:text-sm leading-7" aria-labelledby="research-nav">
              <li><Link href="/sustainability"      className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Sustainability</Link></li>
              <li><Link href="/data-insights"       className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Data Insights Lab</Link></li>
              <li><Link href="/trust"               className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Trust Center</Link></li>
              <li><Link href="/sectors/comparison"  className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Sector Comparison</Link></li>
              <li><Link href="/region-map"          className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Interactive Map</Link></li>
              <li><Link href="/evidence-library"    className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Evidence Library</Link></li>
              <li><Link href="/news-intelligence"   className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">News Intelligence</Link></li>
              <li><Link href="/news-reader"         className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">OPML News Reader</Link></li>
              <li><Link href="/evidence"            className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Evidence Vault</Link></li>
              <li><Link href="/sources"             className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Sources & Claims</Link></li>
              <li><Link href="/downloads"           className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Document Downloads</Link></li>
              <li><Link href="/search"              className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Search</Link></li>
              <li><Link href="/contact"             className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Contact Us</Link></li>
              <li><Link href="/for"                 className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">Persona Views</Link></li>
              <li>
                <Link href="/download" className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">
                  📱 Get the App
                </Link>
              </li>
              <li>
                <a href="https://kiadb.karnataka.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="KIADB Portal (opens in new window)" className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">
                  KIADB Portal ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Context */}
          <div>
            <h4 className="text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-5" id="audience-nav">By Audience</h4>
            <ul className="space-y-3 text-[15px] md:text-sm leading-7" aria-labelledby="audience-nav">
              <li><Link href="/for/investor"         className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">For Investors</Link></li>
              <li><Link href="/for/resident"         className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">For Residents</Link></li>
              <li><Link href="/for/researcher"       className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">For Researchers</Link></li>
              <li><Link href="/for/journalist"       className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">For Journalists</Link></li>
              <li><Link href="/for/curious-citizens" className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">For Curious Citizens</Link></li>
            </ul>
          </div>

          {/* Open Data */}
          <div>
            <h4 className="text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-5" id="data-nav">Open Data</h4>
            <ul className="space-y-3 text-[15px] md:text-sm leading-7" aria-labelledby="data-nav">
              <li>
                <a href="https://data.opencity.in/dataset/bengaluru-aviation-traffic-data" target="_blank" rel="noopener noreferrer" aria-label="Aviation Data (opens in new window)" className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">
                  Aviation Data ↗
                </a>
              </li>
              <li>
                <a href="https://data.opencity.in/dataset/bengaluru-strr-via-bannerughatta-national-park-documents" target="_blank" rel="noopener noreferrer" aria-label="STRR Documents (opens in new window)" className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">
                  STRR Documents ↗
                </a>
              </li>
              <li>
                <a href="https://data.opencity.in/dataset/economic-survey-of-karnataka-2025-26" target="_blank" rel="noopener noreferrer" aria-label="Economic Survey (opens in new window)" className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">
                  Economic Survey ↗
                </a>
              </li>
              <li>
                <a href="https://data.opencity.in/dataset/bengaluru-lakes-and-their-maintainers" target="_blank" rel="noopener noreferrer" aria-label="Lakes Governance (opens in new window)" className="text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded">
                  Lakes Governance ↗
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
            Certifications &amp; Trust
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {([
              { icon: '🔒', label: 'SSL / TLS Secured',          href: 'https://www.ssllabs.com/ssltest/analyze.html?d=kwin-city.com' },
              { icon: '✓',  label: 'Schema.org Rich Results',     href: 'https://search.google.com/test/rich-results?url=https%3A%2F%2Fkwin-city.com' },
              { icon: '🔍', label: 'Bing Webmaster Verified',     href: 'https://kwin-city.com/BingSiteAuth.xml' },
              { icon: '🛡️', label: 'HSTS Protected',             href: 'https://hstspreload.org/?domain=kwin-city.com' },
              { icon: '📊', label: 'Open Data',                   href: 'https://data.opencity.in/' },
              { icon: '🌐', label: 'Google Search Console',       href: 'https://search.google.com/search-console' },
              { icon: '⚡', label: 'Next.js 15',                  href: 'https://nextjs.org' },
              { icon: '🚀', label: 'Deployed on Netlify',         href: 'https://netlify.com' },
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
            <span className="hidden sm:inline">Content protected by copyright</span>
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
