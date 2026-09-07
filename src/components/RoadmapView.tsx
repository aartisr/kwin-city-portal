import React from 'react';
import { ROADMAP_TO_PERFECTION } from '../data/evaluationData';
import { ArrowUpRight, CheckCircle, Sparkles, AlertCircle, Compass } from 'lucide-react';

export const RoadmapView: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Compass className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Roadmap: How kwin-city.com Can Reach a 9.5+ / 10
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Specific, high-impact architectural and editorial enhancements to bridge the 1.7-point gap to absolute excellence.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Potential Score: 9.6 / 10</span>
        </div>
      </div>

      <div className="space-y-4">
        {ROADMAP_TO_PERFECTION.map((item) => (
          <div
            key={item.step}
            className="p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-indigo-200 bg-white hover:bg-indigo-50/20 transition-all shadow-2xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-xs">
                  {item.step}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.priority === 'High'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : item.priority === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {item.priority} Priority
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md text-emerald-700 text-xs font-bold">
                <span>+{item.expectedScoreBump.toFixed(1)} pts</span>
              </div>
            </div>

            {/* Actionable Implementation Specification */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 pl-11">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs text-slate-700">
                <strong className="text-slate-900 font-semibold">Recommended Implementation: </strong>
                <span>{item.actionableRecommendation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
