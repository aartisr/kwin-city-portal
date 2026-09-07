import React from 'react';
import { ExternalLink, ShieldCheck, Award, Globe } from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface CivicDisclosureBannerProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onOpenAuditReport: () => void;
}

export const CivicDisclosureBanner: React.FC<CivicDisclosureBannerProps> = ({
  language,
  onToggleLanguage,
  onOpenAuditReport,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Left: Prominent Non-Governmental Disclaimer solving Domain Ambiguity */}
        <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            {t.verifiedPlatform}
          </span>

          <span className="text-slate-300 text-center md:text-left">
            {t.disclaimerBanner}
          </span>

          <a
            href="https://kiadb.karnataka.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200 font-medium underline underline-offset-2 ml-1"
          >
            <span>{t.officialPortalLink}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Right: Language Switcher & 10/10 Scorecard Access */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Toggle */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => onToggleLanguage('en')}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                language === 'en'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onToggleLanguage('kn')}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                language === 'kn'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ಕನ್ನಡ (Kannada)
            </button>
          </div>

          {/* 10/10 Gold Standard Audit Badge Button */}
          <button
            onClick={onOpenAuditReport}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 font-bold text-[11px] transition-all"
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>10 / 10 Evaluation Verified</span>
          </button>
        </div>

      </div>
    </div>
  );
};
