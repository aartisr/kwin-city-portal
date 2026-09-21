import React from 'react';
import { ShieldAlert, ExternalLink, Sliders, Copy, Check, Sparkles, Scale } from 'lucide-react';

interface ScorecardHeaderProps {
  compositeScore: number;
  totalPillars: number;
  onOpenWeights: () => void;
  onCopyReport: () => void;
  copied: boolean;
  activeArchetype: string;
  onSelectArchetype: (id: string) => void;
}

export const ScorecardHeader: React.FC<ScorecardHeaderProps> = ({
  compositeScore,
  totalPillars,
  onOpenWeights,
  onCopyReport,
  copied,
  activeArchetype,
  onSelectArchetype,
}) => {
  // Score interpretation with high-contrast light and dark classes
  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-emerald-800 bg-emerald-50 border-emerald-500 dark:text-emerald-400 dark:border-emerald-500/50 dark:bg-emerald-950/40';
    if (score >= 7.0) return 'text-teal-800 bg-teal-50 border-teal-500 dark:text-teal-400 dark:border-teal-500/50 dark:bg-teal-950/40';
    if (score >= 5.5) return 'text-amber-900 bg-amber-50 border-amber-500 dark:text-amber-400 dark:border-amber-500/50 dark:bg-amber-950/40';
    return 'text-rose-900 bg-rose-50 border-rose-500 dark:text-rose-400 dark:border-rose-500/50 dark:bg-rose-950/40';
  };

  const getGrade = (score: number) => {
    if (score >= 9.0) return 'A+ (Exceptional)';
    if (score >= 8.0) return 'A- (High Standard)';
    if (score >= 7.0) return 'B+ (Good / Informative)';
    if (score >= 6.0) return 'B- (Adequate / Caveats)';
    if (score >= 5.0) return 'C (Substantial Risks)';
    return 'D (Critical Warning)';
  };

  const archetypes = [
    { id: 'balanced', label: 'Balanced Overall' },
    { id: 'investor', label: 'Land & Real Estate Investor' },
    { id: 'researcher', label: 'Urban Policy Researcher' },
    { id: 'technologist', label: 'Tech & PWA Evaluator' },
  ];

  return (
    <header className="relative border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md pt-8 pb-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Disclaimer Warning Banner - High Contrast */}
        <div className="rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-950/20 px-4 py-3.5 text-sm text-amber-950 dark:text-amber-200/90 flex items-start gap-3 shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold text-amber-950 dark:text-amber-300">Independent Academic Review:</span>{' '}
            <code className="text-amber-950 dark:text-amber-200 font-mono bg-amber-200/70 dark:bg-amber-950/60 px-1.5 py-0.5 rounded text-xs font-bold">kwin-city.com</code>{' '}
            is an <strong>independent research clearinghouse</strong>. It is <strong>NOT</strong> an official Government of Karnataka, KIADB, or BMRDA state portal. All land, statutory, and investment actions require primary verification on official state portals.
          </div>
          <a
            href="https://kwin-city.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-amber-950 dark:text-amber-300 hover:underline bg-amber-200/60 hover:bg-amber-200 dark:bg-amber-900/50 dark:hover:bg-amber-800/60 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 transition"
          >
            Visit URL <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Main Title & Score Block */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-teal-800 dark:text-teal-300">
              <Sparkles className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
              Comprehensive Web Intelligence Audit
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 dark:text-white font-serif">
              Evaluation: <span className="text-emerald-800 dark:text-emerald-400">https://kwin-city.com/</span>
            </h1>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
              In-depth independent audit across 7 critical dimensions: Technical Architecture (PWA), Spatial Content Depth, UI/UX Design, Domain Authority & Official Affiliation Clarity, Commercial Disclosures, and Investor Decision Utility.
            </p>
          </div>

          {/* Primary Score Badge */}
          <div className="flex items-center gap-4 bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm dark:shadow-xl shrink-0">
            <div
              className={`flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-2 shadow-2xs ${getScoreColor(
                compositeScore
              )}`}
            >
              <div className="text-[10px] uppercase tracking-wider font-bold opacity-80">Rating</div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
                {compositeScore.toFixed(1)}
              </div>
              <div className="text-[11px] font-semibold opacity-80">out of 10</div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Grade & Verdict</div>
              <div className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">{getGrade(compositeScore)}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 max-w-[210px] leading-tight">
                High information value & PWA execution, moderated by critical official attribution gaps.
              </div>
              <div className="text-[11px] text-teal-800 dark:text-teal-400 font-bold pt-1">
                Audited across {totalPillars} core dimensions
              </div>
            </div>
          </div>
        </div>

        {/* Archetype Quick-Weight Selector & Tools */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5 mr-1">
              <Scale className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" /> Perspective:
            </span>
            {archetypes.map((arch) => (
              <button
                key={arch.id}
                onClick={() => onSelectArchetype(arch.id)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition font-bold ${
                  activeArchetype === arch.id
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 dark:bg-teal-500/20 dark:border-teal-500/50 dark:text-teal-300 shadow-2xs'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {arch.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenWeights}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition shadow-2xs"
              title="Customize evaluation pillar weightings"
            >
              <Sliders className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" /> Adjust Weights
            </button>
            <button
              onClick={onCopyReport}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs transition"
              title="Copy markdown executive summary"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Brief' : 'Export Audit'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
