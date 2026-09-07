import React, { useState } from 'react';
import { Sparkles, Check, CheckCircle2, RotateCcw, ArrowRight, Layers, SlidersHorizontal } from 'lucide-react';
import { ROADMAP_TO_PERFECTION } from '../data/evaluationData';

interface InteractiveAuditorProps {
  baseScore: number;
}

export const InteractiveAuditor: React.FC<InteractiveAuditorProps> = ({ baseScore }) => {
  const [implementedFeatures, setImplementedFeatures] = useState<number[]>([]);

  const toggleFeature = (step: number) => {
    if (implementedFeatures.includes(step)) {
      setImplementedFeatures(implementedFeatures.filter((s) => s !== step));
    } else {
      setImplementedFeatures([...implementedFeatures, step]);
    }
  };

  const resetSimulation = () => {
    setImplementedFeatures([]);
  };

  const addedPoints = implementedFeatures.reduce((total, step) => {
    const item = ROADMAP_TO_PERFECTION.find((r) => r.step === step);
    return total + (item ? item.expectedScoreBump : 0);
  }, 0);

  const simulatedScore = Math.min(10.0, baseScore + addedPoints);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <SlidersHorizontal className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Live Improvement Simulator (What Takes it to a 10/10?)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Toggle speculative feature implementations to simulate how targeted improvements elevate the rating from 7.8.
          </p>
        </div>

        <button
          onClick={resetSimulation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors self-end sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Simulator</span>
        </button>
      </div>

      {/* Dynamic Score Tracker Hero */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-indigo-300 uppercase">
            Simulated Project Rating
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-black text-white">
              {simulatedScore.toFixed(1)}
            </span>
            <span className="text-lg text-slate-400 font-bold">/ 10</span>
            {addedPoints > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                +{addedPoints.toFixed(1)} boost
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 mt-1">
            {implementedFeatures.length === 0
              ? 'Currently reflecting live baseline audit (7.8 / 10)'
              : `Applied ${implementedFeatures.length} architectural upgrades`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-400 block">Status Level</span>
            <span className="text-xs font-bold text-indigo-200">
              {simulatedScore >= 9.5
                ? 'Exemplary Gold Standard'
                : simulatedScore >= 8.5
                ? 'Comprehensive Tier-1'
                : 'Strong Baseline Tracker'}
            </span>
          </div>
          <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xl border border-white/20">
            {simulatedScore >= 9.0 ? 'A+' : simulatedScore >= 8.0 ? 'A' : 'B+'}
          </div>
        </div>
      </div>

      {/* Interactive Toggle List */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Select Recommended Upgrades to Apply:
        </label>

        {ROADMAP_TO_PERFECTION.map((item) => {
          const isToggled = implementedFeatures.includes(item.step);
          return (
            <div
              key={item.step}
              onClick={() => toggleFeature(item.step)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                isToggled
                  ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600/30'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition-colors ${
                    isToggled
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isToggled && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {item.actionableRecommendation}
                  </p>
                </div>
              </div>

              <span className="shrink-0 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                +{item.expectedScoreBump.toFixed(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
