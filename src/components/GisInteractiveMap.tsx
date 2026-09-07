import React, { useState } from 'react';
import { 
  MASTERPLAN_DISTRICTS, 
  MasterplanDistrict 
} from '../data/kwinPlatformData';
import { 
  TRANSLATIONS, 
  Language 
} from '../data/translations';
import { 
  Layers, 
  MapPin, 
  Navigation, 
  Droplets, 
  Zap, 
  ShieldCheck, 
  Compass, 
  Maximize2, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';

interface GisInteractiveMapProps {
  language: Language;
}

export const GisInteractiveMap: React.FC<GisInteractiveMapProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [selectedDistrict, setSelectedDistrict] = useState<MasterplanDistrict>(MASTERPLAN_DISTRICTS[0]);
  const [showZoning, setShowZoning] = useState(true);
  const [showTransit, setShowTransit] = useState(true);
  const [showEcology, setShowEcology] = useState(true);

  return (
    <div id="gis-map" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
      
      {/* Title & Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Navigation className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {t.mapTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.mapSubtitle}
          </p>
        </div>

        {/* GIS Layer Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowZoning(!showZoning)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              showZoning
                ? 'bg-blue-50 text-blue-800 border-blue-200 shadow-2xs'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.mapLayerDistricts}</span>
          </button>

          <button
            onClick={() => setShowTransit(!showTransit)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              showTransit
                ? 'bg-amber-50 text-amber-800 border-amber-200 shadow-2xs'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.mapLayerTransit}</span>
          </button>

          <button
            onClick={() => setShowEcology(!showEcology)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              showEcology
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-2xs'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>{t.mapLayerEcology}</span>
          </button>
        </div>
      </div>

      {/* Map Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left / Center: Interactive Vector GIS Canvas */}
        <div className="lg:col-span-8 bg-slate-900 rounded-xl p-4 sm:p-6 overflow-hidden border border-slate-800 relative shadow-inner">
          
          {/* Top Status HUD */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-white text-[11px]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono">KWIN-GIS Vector v3.2 • Doddaballapur - Dabaspet Corridor</span>
          </div>

          <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 bg-slate-800/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-slate-300 text-[10px]">
            <span className="font-semibold text-white">Scale:</span> 1:15,000 (5,800 Total Acres)
          </div>

          {/* SVG Map Canvas */}
          <div className="w-full aspect-[4/3] flex items-center justify-center pt-8">
            <svg viewBox="0 0 600 580" className="w-full h-full select-none">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                </pattern>
                <linearGradient id="strrGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Grid Background */}
              <rect width="600" height="580" fill="#0f172a" />
              <rect width="600" height="580" fill="url(#grid)" />

              {/* Masterplan Districts (Interactive Rects) */}
              {showZoning &&
                MASTERPLAN_DISTRICTS.map((district) => {
                  const isSelected = selectedDistrict.id === district.id;
                  return (
                    <g
                      key={district.id}
                      onClick={() => setSelectedDistrict(district)}
                      className="cursor-pointer transition-all duration-300"
                    >
                      <rect
                        x={district.coords.x}
                        y={district.coords.y}
                        width={district.coords.width}
                        height={district.coords.height}
                        rx={district.coords.rx || 12}
                        fill={district.color}
                        fillOpacity={isSelected ? 0.85 : 0.35}
                        stroke={isSelected ? '#ffffff' : district.color}
                        strokeWidth={isSelected ? 3 : 1.5}
                        strokeDasharray={isSelected ? 'none' : 'none'}
                        className="transition-all duration-200 hover:fill-opacity-70"
                      />
                      <text
                        x={district.coords.x + 14}
                        y={district.coords.y + 26}
                        fill="#ffffff"
                        fontSize="12"
                        fontWeight="bold"
                        className="pointer-events-none"
                      >
                        {district.name.split(' ')[0]} {district.name.split(' ')[1]}
                      </text>
                      <text
                        x={district.coords.x + 14}
                        y={district.coords.y + 44}
                        fill="#cbd5e1"
                        fontSize="10"
                        fontFamily="monospace"
                        className="pointer-events-none"
                      >
                        {district.acres} ACRES • {district.phase.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}

              {/* Transit & Arterial Spines (STRR NH-648 & Doddaballapur Rail Line) */}
              {showTransit && (
                <g className="pointer-events-none">
                  {/* STRR NH-648 Expressway Route */}
                  <path
                    d="M 30 300 Q 300 240 570 300"
                    fill="none"
                    stroke="url(#strrGlow)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 30 300 Q 300 240 570 300"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                  />
                  <text x="350" y="270" fill="#fbbf24" fontSize="11" fontWeight="bold">
                    STRR (NH-648) 6-Lane Expressway
                  </text>

                  {/* Doddaballapur Railway Siding */}
                  <line
                    x1="40"
                    y1="40"
                    x2="560"
                    y2="40"
                    stroke="#94a3b8"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                  />
                  <text x="210" y="32" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                    Rail Corridor (Doddaballapur - Yelahanka - Bengaluru)
                  </text>

                  {/* Airport Highway Spur */}
                  <path
                    d="M 500 280 L 570 120"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="4"
                    strokeDasharray="4 4"
                  />
                  <text x="470" y="110" fill="#38bdf8" fontSize="10" fontWeight="bold">
                    To BLR Int'l Airport (45 min) ↗
                  </text>
                </g>
              )}

              {/* Ecological Green Spine & Lake Cascades */}
              {showEcology && (
                <g className="pointer-events-none">
                  {/* Lake Amanikere Basin */}
                  <ellipse cx="160" cy="495" rx="55" ry="24" fill="#0284c7" fillOpacity="0.7" />
                  <text x="125" y="498" fill="#e0f2fe" fontSize="9" fontWeight="bold">
                    Amanikere Basin
                  </text>

                  {/* Dabaspet Reservoir Link */}
                  <ellipse cx="420" cy="495" rx="65" ry="26" fill="#0284c7" fillOpacity="0.7" />
                  <text x="375" y="498" fill="#e0f2fe" fontSize="9" fontWeight="bold">
                    Dabaspet Wetland
                  </text>

                  {/* Inter-lake bioswale stream */}
                  <path
                    d="M 215 495 C 280 470, 310 520, 355 495"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                  />
                </g>
              )}
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-slate-400 text-xs">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              {t.mapClickPrompt}
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              Coordinates: 13.2983° N, 77.5367° E
            </span>
          </div>
        </div>

        {/* Right: Selected Parcel Inspector Card */}
        <div className="lg:col-span-4 bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Selected Zoning District
              </span>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {language === 'kn' ? selectedDistrict.nameKn : selectedDistrict.name}
              </h4>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-white text-indigo-700 border border-slate-200 shadow-2xs font-mono">
              {selectedDistrict.acres} Acres
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {selectedDistrict.description}
          </p>

          {/* Technical Specs Metric List */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-400 font-semibold block">Floor Space Index</span>
              <span className="text-xs font-bold text-slate-900 font-mono">{selectedDistrict.fsiRatio}</span>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-400 font-semibold block">Phasing Schedule</span>
              <span className="text-xs font-bold text-indigo-700">{selectedDistrict.phase.split(' ')[0]}</span>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-400 font-semibold block flex items-center gap-1">
                <Droplets className="w-3 h-3 text-sky-500" /> Water Quota
              </span>
              <span className="text-xs font-bold text-slate-900 font-mono">{selectedDistrict.waterQuotaDaily}</span>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-400 font-semibold block flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" /> Substation Load
              </span>
              <span className="text-xs font-bold text-slate-900 font-mono">{selectedDistrict.powerLoadMVA} MVA</span>
            </div>
          </div>

          {/* Permitted Land Uses */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              Permitted Land Uses:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedDistrict.allowedUses.map((use, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-white text-slate-700 border border-slate-200 shadow-2xs"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>

          {/* Verification Badge */}
          <div className="p-3 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">Statutory Status:</span>
            </div>
            <span className="font-bold font-mono">{selectedDistrict.evidenceBadge}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
