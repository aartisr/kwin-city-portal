import React, { useState } from 'react';
import {
  ShieldAlert,
  Layers,
  Smartphone,
  LayoutGrid,
  FileCheck,
  TrendingUp,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { EvaluationPillar } from '../types';

interface PillarsBreakdownProps {
  pillars: EvaluationPillar[];
  weights: Record<string, number>;
  onScoreChange?: (id: string, score: number) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400" />,
  Layers: <Layers className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />,
  Smartphone: <Smartphone className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />,
  LayoutGrid: <LayoutGrid className="w-5 h-5 text-sky-700 dark:text-sky-400" />,
  FileCheck: <FileCheck className="w-5 h-5 text-rose-700 dark:text-rose-400" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-teal-700 dark:text-teal-400" />,
  Search: <Search className="w-5 h-5 text-purple-700 dark:text-purple-400" />,
};

export const PillarsBreakdown: React.FC<PillarsBreakdownProps> = ({ pillars, weights }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedPillars, setExpandedPillars] = useState<Record<string, boolean>>({
    'domain-authority': true,
    'content-depth': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedPillars((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = [
    { id: 'all', label: 'All Dimensions' },
    { id: 'trust', label: 'Trust & Governance' },
    { id: 'content', label: 'Masterplan Content' },
    { id: 'tech', label: 'Tech & Performance' },
    { id: 'ux', label: 'Design & UX' },
    { id: 'utility', label: 'Investor Utility' },
  ];

  const filteredPillars =
    selectedCategory === 'all'
      ? pillars
      : pillars.filter((p) => p.category === selectedCategory);

  const getVerdictBadge = (verdict: EvaluationPillar['verdict']) => {
    switch (verdict) {
      case 'Excellent':
        return 'bg-emerald-50 text-emerald-950 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40 font-bold';
      case 'Good':
        return 'bg-teal-50 text-teal-950 border-teal-300 dark:bg-teal-500/20 dark:text-teal-300 dark:border-teal-500/40 font-bold';
      case 'Fair':
      case 'Needs Improvement':
        return 'bg-amber-50 text-amber-950 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40 font-bold';
      case 'Critical Risk':
        return 'bg-rose-50 text-rose-950 border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/40 font-bold';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 font-bold';
    }
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 8.0) return 'bg-emerald-600 dark:bg-emerald-500';
    if (score >= 7.0) return 'bg-teal-600 dark:bg-teal-500';
    if (score >= 5.5) return 'bg-amber-600 dark:bg-amber-500';
    return 'bg-rose-600 dark:bg-rose-500';
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white font-serif flex items-center gap-2">
          Dimension Breakdown & Findings
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-300 dark:border-slate-700">
            {filteredPillars.length} Evaluated
          </span>
        </h2>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3 py-1.5 rounded-lg transition font-bold ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pillar Cards List */}
      <div className="space-y-4">
        {filteredPillars.map((pillar) => {
          const isExpanded = !!expandedPillars[pillar.id];
          const activeWeight = weights[pillar.id] ?? pillar.defaultWeight;

          return (
            <div
              key={pillar.id}
              id={`pillar-${pillar.id}`}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 overflow-hidden shadow-2xs"
            >
              {/* Header Bar */}
              <div
                onClick={() => toggleExpand(pillar.id)}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none bg-white hover:bg-slate-50/70 dark:bg-slate-900/40 dark:hover:bg-slate-800/30"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shrink-0">
                    {iconMap[pillar.iconName] || <Layers className="w-5 h-5 text-teal-700 dark:text-teal-400" />}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white tracking-tight font-serif">
                        {pillar.name}
                      </h3>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${getVerdictBadge(
                          pillar.verdict
                        )}`}
                      >
                        {pillar.verdict}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1 sm:line-clamp-none max-w-2xl font-normal">
                      {pillar.summary}
                    </p>
                  </div>
                </div>

                {/* Score & Weight Indicator */}
                <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800">
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-2xl font-black text-slate-950 dark:text-white font-serif">
                        {pillar.score.toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">/ 10</span>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold">
                      Weight: <strong className="text-slate-900 dark:text-slate-200">{activeWeight}%</strong>
                    </div>
                  </div>

                  {/* Visual mini bar */}
                  <div className="w-24 hidden lg:block">
                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${getScoreBarColor(pillar.score)} transition-all duration-300`}
                        style={{ width: `${pillar.score * 10}%` }}
                      />
                    </div>
                  </div>

                  <button
                    aria-label="Toggle details"
                    className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Deep-Dive Content */}
              {isExpanded && (
                <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 space-y-6">
                  {/* Summary Callout */}
                  <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs font-normal">
                    <strong className="text-slate-950 dark:text-white font-bold">Evaluation Summary: </strong>
                    {pillar.summary}
                  </div>

                  {/* Strengths and Weaknesses 2-Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-950/40 bg-emerald-50/60 dark:bg-emerald-950/10 space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> Strengths & Best Practices
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                        {pillar.strengths.map((st, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">•</span>
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Weaknesses & Critical Risks */}
                    <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-950/40 bg-rose-50/60 dark:bg-rose-950/10 space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-700 dark:text-rose-400" /> Vulnerabilities & Limitations
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                        {pillar.weaknesses.map((wk, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-700 dark:text-rose-400 font-bold">•</span>
                            <span>{wk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sub-metrics Breakdown Grid */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Component Metrics & Sub-Scores
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {pillar.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-2xs"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900 dark:text-slate-200">{m.label}</span>
                            <span className="font-mono font-bold text-teal-800 dark:text-teal-400">{m.score.toFixed(1)}/10</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full ${getScoreBarColor(m.score)}`}
                              style={{ width: `${m.score * 10}%` }}
                            />
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight pt-0.5">
                            {m.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actionable Recommendations */}
                  <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-950/50 bg-teal-50/60 dark:bg-teal-950/20 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-950 dark:text-teal-300 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-teal-700 dark:text-teal-400" /> Actionable Recommendations to Reach 9+/10
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                      {pillar.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-teal-700 dark:text-teal-400 font-bold">{i + 1}.</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
