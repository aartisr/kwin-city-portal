import React from 'react';
import { 
  Compass, 
  Calculator, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Building, 
  Coins, 
  Users, 
  Plane,
  Sparkles,
  Award,
  ArrowLeftRight
} from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface PlatformHeroProps {
  language: Language;
  onExploreMap: () => void;
  onOpenCalculator: () => void;
  onOpenAuditReport: () => void;
  onOpenComparison?: () => void;
}

export const PlatformHero: React.FC<PlatformHeroProps> = ({
  language,
  onExploreMap,
  onOpenCalculator,
  onOpenAuditReport,
  onOpenComparison,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b15_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Badges */}
      <div className="relative z-10 flex flex-wrap items-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          {t.heroTagline}
        </span>

        <button
          onClick={onOpenAuditReport}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition-all cursor-pointer"
        >
          <Award className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.auditScoreBadge}</span>
        </button>

        {onOpenComparison && (
          <button
            onClick={onOpenComparison}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/30 transition-all cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
            <span>Before vs After View</span>
          </button>
        )}

        <span className="text-xs text-slate-400 hidden sm:inline">
          Doddaballapur - Dabaspet Corridor • Bengaluru Rural
        </span>
      </div>

      {/* Headline & Subhead */}
      <div className="relative z-10 max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {t.heroHeadline}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {t.heroSubhead}
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="relative z-10 flex flex-wrap items-center gap-3 pt-1">
        <button
          onClick={onExploreMap}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>{t.heroCtasExploreMap}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenCalculator}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm transition-all"
        >
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span>{t.heroCtasIncentives}</span>
        </button>

        {onOpenComparison && (
          <button
            onClick={onOpenComparison}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 font-bold text-xs sm:text-sm transition-all"
          >
            <ArrowLeftRight className="w-4 h-4 text-amber-400" />
            <span>Inspect Before vs After</span>
          </button>
        )}
      </div>

      {/* 4 Anchor Proof Statistics Bar */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
        <div className="p-3.5 rounded-2xl bg-slate-800/50 backdrop-blur-xs border border-slate-700/60">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Acreage Masterplan
          </span>
          <span className="text-xl font-mono font-bold text-white mt-0.5 block">5,800 Acres</span>
          <span className="text-[11px] text-slate-400">Contiguous zoning</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/50 backdrop-blur-xs border border-slate-700/60">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Projected Outlay
          </span>
          <span className="text-xl font-mono font-bold text-emerald-400 mt-0.5 block">₹40,000 Cr</span>
          <span className="text-[11px] text-slate-400">Public & private capital</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/50 backdrop-blur-xs border border-slate-700/60">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Targeted Employment
          </span>
          <span className="text-xl font-mono font-bold text-indigo-400 mt-0.5 block">100,000+</span>
          <span className="text-[11px] text-slate-400">High-tech & clinical jobs</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/50 backdrop-blur-xs border border-slate-700/60">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Airport Transit
          </span>
          <span className="text-xl font-mono font-bold text-sky-400 mt-0.5 block">45 Minutes</span>
          <span className="text-[11px] text-slate-400">Direct via STRR (NH-648)</span>
        </div>
      </div>

    </div>
  );
};
