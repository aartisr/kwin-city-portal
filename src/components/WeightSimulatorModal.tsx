import React from 'react';
import { X, RotateCcw, Sliders, Check } from 'lucide-react';
import { EvaluationPillar } from '../types';

interface WeightSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  pillars: EvaluationPillar[];
  weights: Record<string, number>;
  onUpdateWeight: (id: string, weight: number) => void;
  onResetWeights: () => void;
}

export const WeightSimulatorModal: React.FC<WeightSimulatorModalProps> = ({
  isOpen,
  onClose,
  pillars,
  weights,
  onUpdateWeight,
  onResetWeights,
}) => {
  if (!isOpen) return null;

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg font-bold text-white">Customize Scoring Weights</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Different stakeholders weight dimensions differently. For instance, a land investor requires high legal transparency, whereas a web developer prioritizes PWA execution and performance.
          </p>

          {/* Weight Sum Indicator */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-300 font-medium">Total Allocated Weight:</span>
            <span
              className={`font-mono font-bold ${
                totalWeight === 100
                  ? 'text-emerald-400'
                  : totalWeight > 100
                  ? 'text-rose-400'
                  : 'text-amber-400'
              }`}
            >
              {totalWeight}% {totalWeight === 100 ? '(Normalized)' : '(Will auto-normalize)'}
            </span>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            {pillars.map((p) => {
              const currentW = weights[p.id] ?? p.defaultWeight;
              return (
                <div key={p.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{p.name}</span>
                    <span className="font-mono font-bold text-teal-400">{currentW}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={currentW}
                    onChange={(e) => onUpdateWeight(p.id, parseInt(e.target.value, 10))}
                    className="w-full accent-teal-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Base Score: {p.score.toFixed(1)}/10</span>
                    <span>Default: {p.defaultWeight}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onResetWeights}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm transition"
          >
            <Check className="w-3.5 h-3.5" /> Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
