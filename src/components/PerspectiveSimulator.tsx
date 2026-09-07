import React from 'react';
import { Sliders, RotateCcw, UserCheck, Shield, HelpCircle } from 'lucide-react';
import { PERSONA_PRESETS, EVALUATION_CATEGORIES } from '../data/evaluationData';

interface PerspectiveSimulatorProps {
  activePersonaId: string;
  onSelectPersona: (id: string) => void;
  customCategoryScores: Record<string, number>;
  onUpdateCategoryScore: (categoryId: string, newScore: number) => void;
  onResetScores: () => void;
  compositeScore: number;
}

export const PerspectiveSimulator: React.FC<PerspectiveSimulatorProps> = ({
  activePersonaId,
  onSelectPersona,
  customCategoryScores,
  onUpdateCategoryScore,
  onResetScores,
  compositeScore,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Sliders className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Interactive 1 to 10 Evaluation Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Toggle stakeholder archetypes or manually adjust individual 1–10 criterion scores to see real-time recalculated verdicts.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={onResetScores}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Standard</span>
          </button>
        </div>
      </div>

      {/* Preset Persona Selector Tabs */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
          Step 1: Choose Evaluation Perspective / Stakeholder Lens
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PERSONA_PRESETS.map((persona) => {
            const isSelected = activePersonaId === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => onSelectPersona(persona.id)}
                className={`p-3.5 rounded-xl text-left border transition-all relative ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>
                    {persona.name}
                  </span>
                  {isSelected && <UserCheck className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-1">
                  {persona.role}
                </p>
                <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2">
                  {persona.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Slider Adjustments */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Step 2: Fine-Tune Individual Criterion Scores (1.0 to 10.0)
          </label>
          <span className="text-xs font-semibold text-slate-600">
            Calculated Output: <strong className="text-indigo-700 font-mono text-sm">{compositeScore.toFixed(2)}/10</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EVALUATION_CATEGORIES.map((cat) => {
            const val = customCategoryScores[cat.id] ?? cat.score;
            return (
              <div
                key={cat.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/40 space-y-2 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">
                    {cat.shortTitle}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-mono font-bold text-slate-900">
                      {val.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-slate-400">/10</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-400 font-mono">1.0</span>
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.1"
                    value={val}
                    onChange={(e) => onUpdateCategoryScore(cat.id, parseFloat(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <span className="text-[10px] text-slate-400 font-mono">10.0</span>
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-0.5">
                  <span className="truncate pr-2">{cat.summary.slice(0, 65)}...</span>
                  <button
                    onClick={() => onUpdateCategoryScore(cat.id, cat.score)}
                    className="text-[10px] text-indigo-600 hover:underline shrink-0"
                    title="Reset to default score"
                  >
                    Default ({cat.score})
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
