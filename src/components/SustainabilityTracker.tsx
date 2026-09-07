import React from 'react';
import { 
  Droplets, 
  Sun, 
  Trees, 
  ShieldCheck, 
  Wind, 
  Activity, 
  CheckCircle2 
} from 'lucide-react';
import { 
  LAKE_HYDROLOGY_DATA 
} from '../data/kwinPlatformData';
import { 
  TRANSLATIONS, 
  Language 
} from '../data/translations';

interface SustainabilityTrackerProps {
  language: Language;
}

export const SustainabilityTracker: React.FC<SustainabilityTrackerProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div id="lake-hydrology" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Droplets className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {t.ecologyTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.ecologySubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Zero-Liquid Discharge Certified
          </span>
        </div>
      </div>

      {/* 4 Environmental Pillars Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Trees className="w-3.5 h-3.5 text-emerald-600" />
            Preserved Green Spine
          </span>
          <span className="text-lg font-bold text-slate-900 font-mono">1,000 Acres</span>
          <span className="text-[11px] text-slate-500 block">Strict non-construction sanctuary</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-sky-600" />
            STP Reclaimed Water
          </span>
          <span className="text-lg font-bold text-slate-900 font-mono">65% Recycled</span>
          <span className="text-[11px] text-slate-500 block">Dedicated dual plumbing lines</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Sun className="w-3.5 h-3.5 text-amber-600" />
            Solar Rooftop Mandate
          </span>
          <span className="text-lg font-bold text-slate-900 font-mono">100% On-Site</span>
          <span className="text-[11px] text-slate-500 block">Mandatory for all commercial plots</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Wind className="w-3.5 h-3.5 text-teal-600" />
            Carbon Neutrality Target
          </span>
          <span className="text-lg font-bold text-slate-900 font-mono">Net-Zero 2035</span>
          <span className="text-[11px] text-slate-500 block">Microgrid + EV-only feeder routes</span>
        </div>
      </div>

      {/* Lake Cascade Protection Matrix */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Rural Doddaballapur Lake Cascade Safeguard Status:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LAKE_HYDROLOGY_DATA.map((lake) => (
            <div
              key={lake.id}
              className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h5 className="text-sm font-bold text-slate-900">
                    {language === 'kn' ? lake.lakeNameKn : lake.lakeName}
                  </h5>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Catchment: {lake.catchmentAcres} Acres
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                  {lake.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Buffer Zone Width:</span>
                  <span className="font-mono font-bold text-slate-800">{lake.bufferZoneMeters} meters</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Water Quality:</span>
                  <span className="font-semibold text-emerald-700">{lake.currentWaterQuality}</span>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Hydrological Integrity</span>
                    <span className="font-mono font-bold text-indigo-600">{lake.rejuvenationProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${lake.rejuvenationProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
