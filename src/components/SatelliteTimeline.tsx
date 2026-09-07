import React from 'react';
import { 
  Radio, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Satellite, 
  Layers, 
  AlertCircle 
} from 'lucide-react';
import { 
  SATELLITE_TIMELINE_DATA 
} from '../data/kwinPlatformData';
import { 
  TRANSLATIONS, 
  Language 
} from '../data/translations';

interface SatelliteTimelineProps {
  language: Language;
}

export const SatelliteTimeline: React.FC<SatelliteTimelineProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div id="satellite-timeline" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Satellite className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Satellite Ground-Truth Telemetry
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Independent optical & radar verification (Sentinel-2 & Cartosat-3) comparing planned milestones with ground reality.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-mono font-bold">
            <Radio className="w-3 h-3 text-emerald-400 animate-ping" />
            Telemetry Synced Q2 2026
          </span>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="space-y-4">
        {SATELLITE_TIMELINE_DATA.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-50/60 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs">
                  {item.quarter} {item.year}
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {item.plannedMilestone}
                </span>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  item.satelliteVerificationStatus === '100% Completed'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : item.satelliteVerificationStatus === 'In Physical Progress'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                {item.satelliteVerificationStatus === '100% Completed' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                )}
                {item.satelliteVerificationStatus}
              </span>
            </div>

            {/* Content & Specs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8 space-y-1.5 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 block">Ground Truth Reality on Earth:</span>
                  <p className="text-slate-900 leading-relaxed">{item.groundTruthReality}</p>
                </div>
                <p className="text-slate-500 italic text-[11px]">{item.notes}</p>
              </div>

              <div className="md:col-span-4 bg-white p-3 rounded-lg border border-slate-200 space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Vegetation Health (NDVI):</span>
                  <span className="font-mono font-bold text-emerald-700">{item.ndviVegetationIndex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Built Footprint:</span>
                  <span className="font-mono font-bold text-slate-800">{item.builtUpFootprintAcres} Acres</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
