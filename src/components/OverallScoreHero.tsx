import React from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  TrendingUp, 
  CheckCircle, 
  Sparkles, 
  Info, 
  Layers, 
  MapPin, 
  Building2,
  ChevronRight
} from 'lucide-react';
import { TARGET_WEBSITE } from '../data/evaluationData';

interface OverallScoreHeroProps {
  score: number;
  activePersonaName: string;
  onSelectTab: (tab: string) => void;
}

export const OverallScoreHero: React.FC<OverallScoreHeroProps> = ({
  score,
  activePersonaName,
  onSelectTab,
}) => {
  // Qualitative label based on 1 to 10 scale
  const getVerdictLabel = (val: number) => {
    if (val >= 9.0) return { label: 'Exceptional (A+)', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
    if (val >= 8.0) return { label: 'Very Strong (A)', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
    if (val >= 7.0) return { label: 'Good / High Utility (B+)', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' };
    if (val >= 6.0) return { label: 'Moderate / Needs Work (B-)', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' };
    if (val >= 5.0) return { label: 'Marginal (C)', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' };
    return { label: 'Substandard (D/F)', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' };
  };

  const verdict = getVerdictLabel(score);
  const percentage = Math.min(100, Math.max(0, (score / 10) * 100));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Big Score Dial & Qualitative Rank */}
        <div className="lg:col-span-4 flex flex-col items-center text-center lg:border-r lg:border-slate-100 lg:pr-8">
          <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">
            Overall Composite Rating
          </span>
          
          {/* Circular / Radial Score Graphic */}
          <div className="relative w-44 h-44 flex items-center justify-center my-2">
            {/* SVG Background Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                className="text-slate-100"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                className="text-indigo-600 transition-all duration-700 ease-out"
                strokeWidth="10"
                strokeDasharray={314.159}
                strokeDashoffset={314.159 - (314.159 * percentage) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex items-baseline">
                <span className="text-5xl font-black text-slate-900 tracking-tight">
                  {score.toFixed(1)}
                </span>
                <span className="text-xl font-bold text-slate-400 ml-1">/10</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                Scale: 1.0 — 10.0
              </span>
            </div>
          </div>

          <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold border ${verdict.bg} ${verdict.color}`}>
            {verdict.label}
          </div>

          <p className="text-xs text-slate-500 mt-2">
            Evaluated under: <strong className="text-slate-700 font-medium">{activePersonaName}</strong>
          </p>
        </div>

        {/* Right Column: Executive Summary & Highlights */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                <Sparkles className="w-3 h-3" />
                Comprehensive Audit Verdict
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Audit Target: https://kwin-city.com
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              An exceptionally well-researched, objective intelligence portal that separates fact from real estate hype, scored at <span className="text-indigo-700 underline decoration-indigo-200 decoration-4">7.8 / 10</span>.
            </h2>

            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Unlike generic promotional builder blogs, <strong className="text-slate-800">kwin-city.com</strong> provides evidence-backed tracking of Karnataka’s 5,800-acre Knowledge, Wellbeing and Innovation City. It excels in journalistic integrity, page speed, and environmental critique, but is capped below an 8.5+ score due to the absence of a prominent non-governmental banner and missing native Kannada language localization.
            </p>
          </div>

          {/* 4 Key Pillar Snapshots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 mt-0.5">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">High Evidence Rigor (8.4/10)</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Distinct gazette tags separate confirmed Cabinet approvals from aspirational private MOUs.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 mt-0.5">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Modern Architecture (8.3/10)</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Sub-1.2s load speed, zero ads or deceptive lead-capture popups, clean responsive layout.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 mt-0.5">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Domain Ambiguity (6.8/10)</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  The domain mirrors the city project identically; requires a persistent header disclaimer.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 mt-0.5">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Linguistic Inclusivity (6.2/10)</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  English-only; misses native Kannada for local farmers and rural Bengaluru stakeholders.
                </p>
              </div>
            </div>
          </div>

          {/* Target Metadata Bar */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Doddaballapur - Dabaspet (Bengaluru Rural)
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                5,800 Acres • ₹40,000 Cr Target
              </span>
            </div>

            <button
              onClick={() => onSelectTab('roadmap')}
              className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <span>See 5-Step Path to 9.5/10</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
