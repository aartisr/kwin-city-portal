import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import DeferredNewsletterSignup from "@/components/DeferredNewsletterSignup";
import { SITE_CONFIG } from "@/config/site.config";
import { buildFooterContent } from "@/components/footer/content";
import type { FooterLinkItem } from "@/components/footer/types";
import type { SiteFreshnessStatus } from "@/lib/operations/site-freshness";
import {
  pickLocalizedValue,
  translate,
  type Locale,
} from "@/lib/i18n/messages";

function Arrow() {
  return (
    <span aria-hidden="true" className="text-lg leading-none">
      →
    </span>
  );
}

function SocialLink({
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
      className="footer-social-link inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/10 text-[#AFC1D4] transition hover:border-[#F5A623]/60 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
    >
      {children}
    </a>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="m13.9 10.5 7.4-8.5h-1.8l-6.4 7.4L8 2H2.1l7.8 11.3L2.1 22h1.8l6.8-7.7 5.4 7.7H22l-8.1-11.5Zm-2.4 2.7-.8-1.1L4.5 3.3h2.6l5 7.1.8 1.1 6.6 9.3h-2.6l-5.4-7.6Z"
      />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.6 22v-8.1h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.8-.1-1.6-.2-2.4-.2-2.5 0-4.2 1.5-4.2 4.3v2.4H7.5v3.2h2.8V22h3.3Z"
      />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FooterLink({ link }: { link: FooterLinkItem }) {
  const className = `footer-clean-link flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 text-sm font-medium transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] ${link.accent ? "text-[#F8C563]" : "text-[#B6C5D5]"}`;
  const content = (
    <>
      {link.label}
      <span aria-hidden="true" className="text-[#7289A1]">
        {link.external ? "↗" : "→"}
      </span>
    </>
  );
  return link.external ? (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  );
}

export default function Footer({
  locale,
  freshness,
}: {
  locale: Locale;
  freshness: SiteFreshnessStatus;
}) {
  const t = (key: string) => translate(locale, key);
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) =>
    pickLocalizedValue(locale, values);
  const year = new Date().getFullYear();
  const { lastUpdatedText, quickRoutes, footerGroups } =
    buildFooterContent(locale);
  const statusText = freshness.degraded
    ? l({
        en: "Freshness review in progress",
        kn: "ತಾಜಾತನ ಪರಿಶೀಲನೆ ನಡೆಯುತ್ತಿದೆ",
        hi: "फ्रेशनेस समीक्षा जारी है",
        ta: "புதியமை ஆய்வு நடந்து வருகிறது",
      })
    : l({
        en: "Recently verified",
        kn: "ಇತ್ತೀಚೆಗೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
        hi: "हाल में सत्यापित",
        ta: "சமீபத்தில் சரிபார்க்கப்பட்டது",
      });

  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 bg-[#040914] text-white"
      role="contentinfo"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.13),transparent_68%)]"
      />
      <div className="container relative py-12 md:py-16 lg:py-20">
        <section className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:gap-16 lg:pb-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5A623] text-xl font-black text-[#040914] shadow-[0_12px_32px_rgba(245,166,35,.25)]">
                K
              </span>
              <div>
                <p className="text-lg font-extrabold tracking-tight">
                  KWIN City
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#7E95AD]">
                  {l({
                    en: "North Bengaluru",
                    kn: "ಉತ್ತರ ಬೆಂಗಳೂರು",
                    hi: "नॉर्थ बेंगलुरु",
                    ta: "வட பெங்களூரு",
                  })}
                </p>
              </div>
            </div>
            <h2 className="mt-7 max-w-xl text-[2.15rem] font-extrabold leading-[1.02] tracking-[-.055em] md:text-5xl">
              {l({
                en: "Clarity for the city taking shape.",
                kn: "ರೂಪುಗೊಳ್ಳುತ್ತಿರುವ ನಗರಕ್ಕೆ ಸ್ಪಷ್ಟತೆ.",
                hi: "आकार ले रहे शहर के लिए स्पष्टता।",
                ta: "உருவாகும் நகரத்திற்கான தெளிவு.",
              })}
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-7 text-[#AFC1D4] md:text-base">
              {l({
                en: "A calm, evidence-led place to understand KWIN City — what is known, what is planned, and where to look next.",
                kn: "KWIN City ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಶಾಂತ, ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಸ್ಥಳ — ತಿಳಿದಿರುವುದು, ಯೋಜಿಸಿರುವುದು ಮತ್ತು ಮುಂದೆ ನೋಡುವ ಸ್ಥಳ.",
                hi: "KWIN City को समझने का शांत, प्रमाण-आधारित स्थान — क्या ज्ञात है, क्या नियोजित है और आगे कहाँ देखें।",
                ta: "KWIN Cityயை புரிந்துகொள்ள அமைதியான, ஆதார வழிநடத்தும் இடம் — தெரிந்தவை, திட்டமிடப்பட்டவை, அடுத்து பார்க்க வேண்டியவை.",
              })}
            </p>
            <div className="mt-7 grid gap-3 sm:flex">
              <Link
                href="/about"
                className="btn btn-primary min-h-12 justify-center px-5 text-center"
              >
                {t("footer.exploreKwin")} <Arrow />
              </Link>
              <Link
                href="/sources"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/[.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
              >
                {t("footer.viewSources")} <Arrow />
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[.045] p-5 sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#F5C15A]">
              {l({
                en: "Only the useful updates",
                kn: "ಉಪಯುಕ್ತ ನವೀಕರಣಗಳು ಮಾತ್ರ",
                hi: "केवल उपयोगी अपडेट",
                ta: "பயனுள்ள புதுப்பிப்புகள் மட்டும்",
              })}
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#B6C5D5]">
              {l({
                en: "Milestones and newly published research. No noise.",
                kn: "ಮೈಲಿಗಲ್ಲುಗಳು ಮತ್ತು ಹೊಸದಾಗಿ ಪ್ರಕಟಿತ ಸಂಶೋಧನೆ. ಅನಗತ್ಯ ಮಾಹಿತಿ ಇಲ್ಲ.",
                hi: "मील के पत्थर और नया प्रकाशित शोध। कोई शोर नहीं।",
                ta: "மைல்கற்கள் மற்றும் புதிதாக வெளியான ஆய்வு. தேவையற்ற தகவல் இல்லை.",
              })}
            </p>
            <div id="newsletter" className="mt-5">
              <DeferredNewsletterSignup />
            </div>
          </div>
        </section>
        <section className="py-9 md:py-12">
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#7890A8]">
            {l({
              en: "Start here",
              kn: "ಇಲ್ಲಿಂದ ಪ್ರಾರಂಭಿಸಿ",
              hi: "यहाँ से शुरू करें",
              ta: "இங்கே தொடங்குங்கள்",
            })}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {quickRoutes.slice(0, 4).map((link) => (
              <FooterLink key={link.href} link={link} />
            ))}
          </div>
        </section>
        <nav
          aria-label="Footer navigation"
          className="border-y border-white/10 py-2 md:py-8"
        >
          <div className="grid md:grid-cols-2 xl:grid-cols-4 md:gap-x-8">
            {footerGroups.map((group, index) => (
              <details
                key={group.title}
                className="footer-disclosure border-b border-white/10 py-1 last:border-b-0 md:border-0 md:py-0"
                open={index === 0}
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-sm font-bold text-white marker:content-none">
                  {group.title}
                  <span
                    className="footer-disclosure-icon text-[#F5A623] md:hidden"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="space-y-1 pb-3 md:pb-0">
                  {group.links.map((link) => (
                    <FooterLink
                      key={`${group.title}-${link.href}`}
                      link={link}
                    />
                  ))}
                </div>
              </details>
            ))}
          </div>
        </nav>
        <section className="flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-xs text-[#9CB0C5]">
            <span
              className={`h-2 w-2 rounded-full ${freshness.degraded ? "bg-amber-400" : "bg-emerald-400"}`}
              aria-hidden="true"
            />
            <span>{statusText}</span>
            <span className="text-[#627994]">·</span>
            <time dateTime={SITE_CONFIG.lastUpdatedISO}>
              {t("footer.lastUpdated")} {lastUpdatedText}
            </time>
          </div>
          <div className="flex gap-2">
            <SocialLink href={SITE_CONFIG.socialLinks.x} label="X">
              <XIcon />
            </SocialLink>
            <SocialLink
              href={SITE_CONFIG.socialLinks.facebook}
              label="Facebook"
            >
              <FacebookIcon />
            </SocialLink>
            <SocialLink
              href={SITE_CONFIG.socialLinks.instagram}
              label="Instagram"
            >
              <InstagramIcon />
            </SocialLink>
          </div>
        </section>
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-[#7890A8] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href="https://baja.kwin-city.com"
              className="transition hover:text-white"
            >
              © {year} BAJA Associates
            </a>
            <a
              href="https://ai-aarti.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Aarti S Ravikumar
            </a>
            <span>
              {l({
                en: "Evidence-first publishing",
                kn: "ಸಾಕ್ಷ್ಯ-ಪ್ರಥಮ ಪ್ರಕಟಣೆ",
                hi: "एविडेंस-फर्स्ट पब्लिशिंग",
                ta: "ஆதார-முன்னுரಿಮை வெளியீடு",
              })}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-3">
            <Link href="/terms" className="transition hover:text-white">
              {t("common.terms")}
            </Link>
            <Link href="/sources" className="transition hover:text-white">
              {t("common.sources")}
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              {t("common.contact")}
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-5 md:justify-end">
          <a
            href="https://launchnest.io/p/kwin-city"
            target="_blank"
            rel="noopener noreferrer"
            title="KWIN City on LaunchNest"
            className="rounded-lg opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
          >
              <Image
                src="/launch-nest-listed.svg"
                alt="KWIN City on LaunchNest"
                width={220}
                height={56}
                className="h-10 w-auto"
              />
          </a>
          <a
            href="https://launchbuff.com/products/kwin-city-portal-hy4ydg"
            target="_blank"
            rel="noopener noreferrer"
            title="Featured on LaunchBuff"
            className="rounded-lg opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
          >
            <Image
              src="https://launchbuff.com/badge-featured-dark.svg"
              alt="Featured on LaunchBuff"
              width={256}
              height={80}
              className="h-10 w-auto"
            />
          </a>
          <a
            href="https://www.producthunt.com/products/kwin-city-portal?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-kwin-city-portal"
            target="_blank"
            rel="noopener noreferrer"
            title="KWIN City Portal on Product Hunt"
            className="rounded-lg opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
          >
            <Image
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1237354&theme=light&t=1788268691950"
              alt="KWIN City Portal — knowledge, wellbeing, and innovation city. | Product Hunt"
              width={250}
              height={54}
              className="h-10 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
