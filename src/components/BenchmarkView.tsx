import React from 'react';
import { BENCHMARKS, TARGET_WEBSITE } from '../data/evaluationData';
import { Trophy, CheckCircle, AlertCircle, Building, ExternalLink, ShieldCheck } from 'lucide-react';

export const BenchmarkView: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
            <Trophy className="w-4 h-4" />
          </span>
          <h3 className="text-lg font-bold text-slate-900">
            Comparative Benchmark: How kwin-city.com Stacks Up
          </h3>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Benchmarked against official statutory smart city portals and commercial Indian real estate trackers on a standardized 1 to 10 scale.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <th className="p-3.5 sm:p-4">Platform / Portal</th>
              <th className="p-3.5 sm:p-4">Type</th>
              <th className="p-3.5 sm:p-4 text-center">Composite Score</th>
              <th className="p-3.5 sm:p-4 text-center">Transparency</th>
              <th className="p-3.5 sm:p-4 text-center">UI / Speed</th>
              <th className="p-3.5 sm:p-4 text-center">Investor Utility</th>
              <th className="p-3.5 sm:p-4">Key Assessment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {BENCHMARKS.map((b, idx) => {
              const isTarget = b.name.includes('kwin-city.com');
              return (
                <tr
                  key={idx}
                  className={`${
                    isTarget ? 'bg-indigo-50/40 font-medium' : 'hover:bg-slate-50/50'
                  } transition-colors`}
                >
                  <td className="p-3.5 sm:p-4">
                    <div className="flex items-center gap-2">
                      {isTarget && (
                        <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0" />
                      )}
                      <div>
                        <span className={`text-slate-900 ${isTarget ? 'font-bold' : ''}`}>
                          {b.name}
                        </span>
                        {isTarget && (
                          <span className="block text-[10px] text-indigo-700 font-mono">
                            Target of this Audit
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-600">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {b.type === 'independent_portal' && 'Civil / Research'}
                      {b.type === 'official_gov' && 'Official Govt Agency'}
                      {b.type === 'commercial_aggregator' && 'Broker / Aggregator'}
                    </span>
                  </td>
                  <td className="p-3.5 sm:p-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center font-bold px-2.5 py-1 rounded-md text-xs border ${
                        b.overallScore >= 8.0
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : b.overallScore >= 7.0
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {b.overallScore.toFixed(1)} / 10
                    </span>
                  </td>
                  <td className="p-3.5 sm:p-4 text-center font-mono text-slate-700">
                    {b.transparency.toFixed(1)}
                  </td>
                  <td className="p-3.5 sm:p-4 text-center font-mono text-slate-700">
                    {b.uiUx.toFixed(1)}
                  </td>
                  <td className="p-3.5 sm:p-4 text-center font-mono text-slate-700">
                    {b.investorUtility.toFixed(1)}
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-600 max-w-xs leading-relaxed">
                    {b.highlight}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Strategic Takeaway Card */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          Key Benchmark Takeaway
        </h4>
        <p className="leading-relaxed text-slate-600">
          <strong className="text-slate-800">kwin-city.com</strong> occupies a unique, high-value sweet spot in India’s urbanism landscape. While official government portals often suffer from cumbersome navigation, PDF-only dumps, and lack of critical project realism, and commercial real-estate aggregators are plagued by aggressive broker sales pitches, <strong className="text-slate-800">kwin-city.com</strong> delivers modern, objective open-access civil intelligence. Its primary competitive gap is simply clarifying its non-governmental status and offering regional Kannada translation.
        </p>
      </div>
    </div>
  );
};
