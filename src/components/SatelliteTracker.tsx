import React, { useState } from 'react';
import { 
  Compass, 
  Satellite, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  Eye, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SATELLITE_MILESTONES } from '../data/value-add-data';
import { SatelliteMilestone } from '../types';

export const SatelliteTracker: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<SatelliteMilestone>(SATELLITE_MILESTONES[3]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              Tool #8: Satellite & Earth Observation Tracker
            </span>
            <span className="text-xs text-slate-400">
              Multi-Temporal Earth Observation & Drone Survey
            </span>
          </div>
          <h2 className="mt-2 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white">
            KWIN City Ground Truth & Physical Progress
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Corroborated Sentinel-2, Cartosat-3, and drone orthomosaic imagery tracking earthwork grading, 
            solar farm footing civil works, and arterial road paving.
          </p>
        </div>

        {/* Current Earthwork Composite Progress Badge */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-slate-400">Phase 1 Civil Completion</div>
            <div className="text-base font-bold text-emerald-400 font-mono">68% Earthwork Delivered</div>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-emerald-500/30 flex items-center justify-center font-bold text-xs text-emerald-300">
            <Satellite className="h-5 w-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Timeline Selector Tabs */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SATELLITE_MILESTONES.map((m) => {
          const isSelected = m.date === selectedMilestone.date;
          return (
            <button
              key={m.date}
              onClick={() => setSelectedMilestone(m)}
              className={`flex flex-col text-left rounded-xl p-3.5 transition-all border ${
                isSelected
                  ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500/30 shadow-lg'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                {m.quarter}
              </span>
              <span className="mt-1 font-bold text-xs text-slate-100 truncate">
                {m.title}
              </span>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Grading:</span>
                <span className="font-mono font-bold text-emerald-400">{m.earthworkCompletion}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Satellite Detail Card */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Earth Observation Visual Simulation Stage */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl min-h-[380px] flex flex-col justify-between">
            
            {/* Sensor Tag */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/90 px-3 py-1 text-xs text-slate-200">
                <Satellite className="h-3.5 w-3.5 text-cyan-400" />
                <span>{selectedMilestone.sensor}</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {selectedMilestone.quarter}
              </span>
            </div>

            {/* Earth Observation Vector Display */}
            <div className="my-6 flex flex-col items-center justify-center text-center space-y-3">
              <div className="relative h-44 w-44 rounded-full border-4 border-dashed border-emerald-500/30 bg-gradient-to-tr from-emerald-950/40 via-slate-900 to-teal-950/50 flex items-center justify-center p-4 shadow-inner">
                <div className="space-y-1">
                  <div className="font-['Cinzel',serif] text-3xl font-extrabold text-emerald-400 font-mono">
                    {selectedMilestone.earthworkCompletion}%
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Earthwork Paved</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-md">
                10-Band Multispectral Surface Reflectance analysis confirming active road corridor grading and solar grid footings.
              </p>
            </div>

            {/* Progress Bar Strip */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Civil Earthwork Execution Progress:</span>
                <span className="font-mono font-bold text-emerald-300">{selectedMilestone.earthworkCompletion}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${selectedMilestone.earthworkCompletion}%` }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Key Ground Truth Highlights */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
            <h3 className="font-['Cinzel',serif] text-lg font-bold text-white">
              {selectedMilestone.title}
            </h3>
            
            <div className="mt-2 text-xs text-cyan-400 font-mono">
              Survey Sensor: {selectedMilestone.sensor}
            </div>

            <div className="mt-5 space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                On-Ground Verified Observations:
              </div>
              {selectedMilestone.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2.5 rounded-lg border border-slate-800/80 bg-slate-950/60 p-3 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{h}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs">
              <span className="font-semibold text-emerald-400">Ecological Buffer Status:</span>
              <p className="mt-1 text-slate-400 leading-relaxed">
                {selectedMilestone.environmentalBufferStatus}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
