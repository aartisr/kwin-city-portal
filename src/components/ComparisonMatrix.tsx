import React from 'react';
import { Check, X, Minus, HelpCircle } from 'lucide-react';
import { PORTAL_COMPARISONS } from '../data/evaluationData';

export const ComparisonMatrix: React.FC = () => {
  const renderStatus = (status: 'yes' | 'partial' | 'no') => {
    switch (status) {
      case 'yes':
        return (
          <span className="inline-flex items-center gap-1 text-emerald-950 bg-emerald-50 border border-emerald-300 dark:text-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-800/40 px-2 py-0.5 rounded-md text-xs font-bold">
            <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Full
          </span>
        );
      case 'partial':
        return (
          <span className="inline-flex items-center gap-1 text-amber-950 bg-amber-50 border border-amber-300 dark:text-amber-300 dark:bg-amber-950/60 dark:border-amber-800/40 px-2 py-0.5 rounded-md text-xs font-bold">
            <Minus className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" /> Partial
          </span>
        );
      case 'no':
        return (
          <span className="inline-flex items-center gap-1 text-rose-950 bg-rose-50 border border-rose-300 dark:text-rose-300 dark:bg-rose-950/60 dark:border-rose-800/40 px-2 py-0.5 rounded-md text-xs font-bold">
            <X className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" /> None
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white font-serif">
            Comparative Benchmark Analysis
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal">
            How <strong className="text-emerald-800 dark:text-teal-400 font-bold">kwin-city.com</strong> stacks against Official Government Channels and Commercial Property Aggregators.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs">
        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-slate-900 dark:text-slate-200">
              <th className="py-3.5 px-4 font-bold w-1/4">Evaluation Parameter</th>
              <th className="py-3.5 px-4 font-bold w-1/4 text-emerald-950 dark:text-teal-300 bg-emerald-50/60 dark:bg-teal-950/20 border-x border-emerald-200 dark:border-teal-900/40">
                kwin-city.com (Subject)
              </th>
              <th className="py-3.5 px-4 font-bold w-1/4">
                Official Govt (KIADB / State)
              </th>
              <th className="py-3.5 px-4 font-bold w-1/4">
                Property Portals (Aggregators)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/70">
            {PORTAL_COMPARISONS.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-4 px-4 align-top">
                  <div className="font-bold text-slate-950 dark:text-slate-200">{row.feature}</div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5 font-semibold">
                    {row.category}
                  </div>
                </td>

                {/* kwin-city.com Column */}
                <td className="py-4 px-4 align-top bg-emerald-50/30 dark:bg-teal-950/10 border-x border-emerald-100 dark:border-teal-900/30 space-y-1.5">
                  <div className="flex items-center gap-2">
                    {renderStatus(row.kwinCityCom.status)}
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-normal">
                    {row.kwinCityCom.notes}
                  </p>
                </td>

                {/* Official Govt Column */}
                <td className="py-4 px-4 align-top space-y-1.5">
                  <div className="flex items-center gap-2">
                    {renderStatus(row.officialGov.status)}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {row.officialGov.notes}
                  </p>
                </td>

                {/* Commercial Realtors Column */}
                <td className="py-4 px-4 align-top space-y-1.5">
                  <div className="flex items-center gap-2">
                    {renderStatus(row.realtorPortals.status)}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {row.realtorPortals.notes}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-400 flex items-start gap-2.5 shadow-2xs">
        <HelpCircle className="w-4 h-4 text-emerald-700 dark:text-teal-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-950 dark:text-white">Key Takeaway:</strong> <code className="text-emerald-900 dark:text-teal-300 font-bold bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded">kwin-city.com</code> fills a valuable vacuum in spatial synthesis and UX that traditional government websites lack. However, it cannot replace government gazettes for title verification or statutory boundaries.
        </div>
      </div>
    </div>
  );
};
