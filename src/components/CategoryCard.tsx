import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileBadge, 
  LayoutGrid, 
  Scale, 
  Leaf, 
  TrendingUp, 
  Globe,
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ChevronDown, 
  ChevronUp,
  Info
} from 'lucide-react';
import { EvaluationCategory } from '../types';

interface CategoryCardProps {
  category: EvaluationCategory;
  customScore?: number;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  FileBadge: <FileBadge className="w-5 h-5" />,
  LayoutGrid: <LayoutGrid className="w-5 h-5" />,
  Scale: <Scale className="w-5 h-5" />,
  Leaf: <Leaf className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, customScore }) => {
  const [expanded, setExpanded] = useState(false);
  const displayScore = customScore !== undefined ? customScore : category.score;

  const getScoreBadge = (score: number) => {
    if (score >= 8.0) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (score >= 7.0) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (score >= 6.0) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all">
      {/* Top Banner / Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
              {ICON_MAP[category.icon] || <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {category.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Weight: {(category.weight * 100).toFixed(0)}% of standard composite
              </p>
            </div>
          </div>

          {/* Big Pillar Score Pill */}
          <div className="flex flex-col items-end shrink-0">
            <div className={`px-3 py-1 rounded-lg border font-bold text-base flex items-baseline gap-0.5 ${getScoreBadge(displayScore)}`}>
              <span>{displayScore.toFixed(1)}</span>
              <span className="text-xs font-medium opacity-70">/10</span>
            </div>
          </div>
        </div>

        {/* Short Summary & Editorial Verdict */}
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          {category.summary}
        </p>

        <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs text-slate-700">
          <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-slate-900">Auditor Verdict: </strong>
            <span>{category.verdict}</span>
          </div>
        </div>

        {/* Strengths & Weaknesses Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1 mb-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Key Strengths
            </span>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {category.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-emerald-500 font-bold shrink-0">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1 mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Audit Gaps & Risks
            </span>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {category.weaknesses.map((weak, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-amber-500 font-bold shrink-0">•</span>
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Accordion Toggle for Sub-criteria Checklist */}
      <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-2.5 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">
          {category.subCriteria.length} detailed audit criteria inspected
        </span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <span>{expanded ? 'Hide Sub-criteria' : 'View Sub-criteria & Evidence'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Sub-criteria Section */}
      {expanded && (
        <div className="p-5 border-t border-slate-200 bg-slate-50/70 space-y-4">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Granular Criterion Breakdown
            </h4>

            {category.subCriteria.map((sub) => (
              <div
                key={sub.id}
                className="p-3 rounded-lg bg-white border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {sub.status === 'passed' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {sub.status === 'warning' && (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    {sub.status === 'needs_improvement' && (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-slate-900">{sub.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-6">{sub.comment}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pl-6 sm:pl-0">
                  <span className="text-xs text-slate-400 font-mono">Weight: {(sub.weight * 100).toFixed(0)}%</span>
                  <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${(sub.score / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-800 font-mono w-10 text-right">
                    {sub.score.toFixed(1)}/10
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Primary Evidence Citation */}
          <div className="p-3 rounded-lg bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-900">
            <strong className="font-semibold">Documented Evidence: </strong>
            <span className="text-indigo-800">{category.keyEvidence}</span>
          </div>
        </div>
      )}
    </div>
  );
};
