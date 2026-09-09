import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Download, 
  Compass, 
  Eye, 
  Info, 
  ShieldCheck, 
  FileText, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Navigation,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { SPATIAL_LAYERS } from '../data/value-add-data';
import { DISTRICTS, KWIN_META } from '../data/kwin-data';
import { SpatialLayer } from '../types';

export const SpatialExplorer: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<'all' | 'phase-1' | 'phase-2' | 'phase-3'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'zoning' | 'transport' | 'utilities'>('all');
  const [activeLayer, setActiveLayer] = useState<SpatialLayer>(SPATIAL_LAYERS[0]);
  const [bufferRadiusKm, setBufferRadiusKm] = useState<number>(10);
  const [showHighways, setShowHighways] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredLayers = SPATIAL_LAYERS.filter((layer) => {
    const phaseMatch = selectedPhase === 'all' || layer.phase === selectedPhase;
    const catMatch = selectedCategory === 'all' || layer.category === selectedCategory;
    return phaseMatch && catMatch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              Tool #1: Spatial Masterplan Explorer
            </span>
            <span className="text-xs text-slate-400">
              5,800-Acre Master Layout & Buffer GIS
            </span>
          </div>
          <h2 className="mt-2 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white">
            KWIN City Spatial & District Architecture
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Interactive masterplan layout demarcating the 4 core anchor districts, 465-acre solar array, 
            STRR ring highway corridors, and KIADB statutory planning layers.
          </p>
        </div>

        {/* Quick Controls Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-slate-800 bg-slate-900 p-1 text-xs">
            <button
              onClick={() => setSelectedPhase('all')}
              className={`rounded px-2.5 py-1 transition-all ${selectedPhase === 'all' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              All Phases
            </button>
            <button
              onClick={() => setSelectedPhase('phase-1')}
              className={`rounded px-2.5 py-1 transition-all ${selectedPhase === 'phase-1' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Phase 1 (2024-27)
            </button>
            <button
              onClick={() => setSelectedPhase('phase-2')}
              className={`rounded px-2.5 py-1 transition-all ${selectedPhase === 'phase-2' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Phase 2 (2027-30)
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Map & Details Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Vector Canvas Stage */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 shadow-2xl">
            
            {/* Canvas Toolbar Overlays */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
              <span className="rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md">
                13.293° N, 77.418° E · North Bengaluru
              </span>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${showGrid ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300' : 'border-slate-800 bg-slate-900 text-slate-400'}`}
              >
                1km Grid
              </button>
              <button
                onClick={() => setShowHighways(!showHighways)}
                className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${showHighways ? 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300' : 'border-slate-800 bg-slate-900 text-slate-400'}`}
              >
                Corridors (STRR / NH-44)
              </button>
            </div>

            {/* Canvas Zoom Controls */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/90 p-1 backdrop-blur-md">
              <button
                onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 1.8))}
                className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                title="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.8))}
                className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                title="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                title="Reset zoom"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Interactive SVG Masterplan Stage */}
            <div className="relative mt-8 flex items-center justify-center min-h-[420px] sm:min-h-[500px] overflow-hidden rounded-xl border border-slate-900 bg-slate-950/90">
              
              <svg
                viewBox="0 0 100 100"
                className="h-full w-full max-h-[520px] transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <defs>
                  {/* Grid Pattern */}
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.3" strokeDasharray="1,1" />
                  </pattern>

                  {/* Linear Gradients */}
                  <linearGradient id="grad-knowledge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.6" />
                  </linearGradient>

                  <linearGradient id="grad-health" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.6" />
                  </linearGradient>

                  <linearGradient id="grad-innovation" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#5B21B6" stopOpacity="0.6" />
                  </linearGradient>

                  <linearGradient id="grad-research" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#B45309" stopOpacity="0.6" />
                  </linearGradient>

                  <linearGradient id="grad-solar" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#D97706" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Base Background Grid */}
                {showGrid && <rect width="100" height="100" fill="url(#grid)" />}

                {/* Outer Site Demarcation Perimeter (5,800 Acres Polygon) */}
                <polygon
                  points="10,10 90,10 92,90 8,88"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                />

                {/* District 1: Knowledge (Top-Left 1,500 Acres) */}
                <g 
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setActiveLayer(SPATIAL_LAYERS[0])}
                >
                  <rect
                    x="12"
                    y="12"
                    width="36"
                    height="36"
                    rx="2"
                    fill="url(#grad-knowledge)"
                    stroke={activeLayer.id === 'layer-knowledge-core' ? '#60A5FA' : '#3B82F6'}
                    strokeWidth={activeLayer.id === 'layer-knowledge-core' ? '1.5' : '0.6'}
                  />
                  <text x="30" y="28" textAnchor="middle" fill="#93C5FD" fontSize="3.2" fontWeight="bold">
                    KNOWLEDGE DISTRICT
                  </text>
                  <text x="30" y="33" textAnchor="middle" fill="#BFDBFE" fontSize="2.2">
                    1,500 Acres · Higher Ed & AI
                  </text>
                </g>

                {/* District 2: Health & Life Sciences (Top-Right 1,400 Acres) */}
                <g 
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setActiveLayer(SPATIAL_LAYERS[1])}
                >
                  <rect
                    x="52"
                    y="12"
                    width="36"
                    height="36"
                    rx="2"
                    fill="url(#grad-health)"
                    stroke={activeLayer.id === 'layer-health-sanctuary' ? '#34D399' : '#10B981'}
                    strokeWidth={activeLayer.id === 'layer-health-sanctuary' ? '1.5' : '0.6'}
                  />
                  <text x="70" y="28" textAnchor="middle" fill="#A7F3D0" fontSize="3.2" fontWeight="bold">
                    HEALTH & LIFE SCIENCES
                  </text>
                  <text x="70" y="33" textAnchor="middle" fill="#D1FAE5" fontSize="2.2">
                    1,400 Acres · MedTech & Bio
                  </text>
                </g>

                {/* District 3: Innovation & AI (Bottom-Left 1,600 Acres) */}
                <g 
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setActiveLayer(SPATIAL_LAYERS[2])}
                >
                  <rect
                    x="12"
                    y="52"
                    width="36"
                    height="36"
                    rx="2"
                    fill="url(#grad-innovation)"
                    stroke={activeLayer.id === 'layer-innovation-park' ? '#C084FC' : '#8B5CF6'}
                    strokeWidth={activeLayer.id === 'layer-innovation-park' ? '1.5' : '0.6'}
                  />
                  <text x="30" y="68" textAnchor="middle" fill="#E9D5FF" fontSize="3.2" fontWeight="bold">
                    INNOVATION DISTRICT
                  </text>
                  <text x="30" y="73" textAnchor="middle" fill="#F3E8FF" fontSize="2.2">
                    1,600 Acres · Semiconductor & Space
                  </text>
                </g>

                {/* District 4: Research & CleanTech (Bottom-Right 1,300 Acres) */}
                <g 
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setActiveLayer(SPATIAL_LAYERS[3])}
                >
                  <rect
                    x="52"
                    y="52"
                    width="36"
                    height="36"
                    rx="2"
                    fill="url(#grad-research)"
                    stroke={activeLayer.id === 'layer-research-aerospace' ? '#FCD34D' : '#F59E0B'}
                    strokeWidth={activeLayer.id === 'layer-research-aerospace' ? '1.5' : '0.6'}
                  />
                  <text x="70" y="68" textAnchor="middle" fill="#FDE68A" fontSize="3.2" fontWeight="bold">
                    RESEARCH DISTRICT
                  </text>
                  <text x="70" y="73" textAnchor="middle" fill="#FEF3C7" fontSize="2.2">
                    1,300 Acres · Advanced Engineering
                  </text>
                </g>

                {/* Central Captive Solar Farm (465 Acres) */}
                <g 
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setActiveLayer(SPATIAL_LAYERS[4])}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="8.5"
                    fill="url(#grad-solar)"
                    stroke="#F59E0B"
                    strokeWidth="1"
                    className="animate-pulse"
                  />
                  <text x="50" y="49" textAnchor="middle" fill="#1E293B" fontSize="2.2" fontWeight="bold">
                    465-ACRE
                  </text>
                  <text x="50" y="52.5" textAnchor="middle" fill="#1E293B" fontSize="1.8" fontWeight="bold">
                    SOLAR MICROGRID
                  </text>
                </g>

                {/* Highway Arterials (STRR & NH-44 Fast Link) */}
                {showHighways && (
                  <>
                    {/* STRR Ring Road Horizontal Alignment */}
                    <line
                      x1="2"
                      y1="50"
                      x2="98"
                      y2="50"
                      stroke="#06B6D4"
                      strokeWidth="1.8"
                      strokeDasharray="3,1"
                    />
                    <text x="8" y="47" fill="#67E8F9" fontSize="2.2" fontWeight="bold">
                      STRR (NH-648) EXPRESSWAY
                    </text>

                    {/* NH-44 Airport Link Vertical Alignment */}
                    <line
                      x1="50"
                      y1="2"
                      x2="50"
                      y2="98"
                      stroke="#10B981"
                      strokeWidth="1.8"
                      strokeDasharray="3,1"
                    />
                    <text x="53" y="8" fill="#6EE7B7" fontSize="2.2" fontWeight="bold">
                      TO BENGALURU AIRPORT (45m)
                    </text>
                  </>
                )}

                {/* Dynamic Buffer Radius Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={bufferRadiusKm * 1.8}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="0.6"
                  strokeDasharray="2,2"
                  opacity="0.7"
                />
              </svg>

            </div>

            {/* Interactive Buffer Slider */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-medium text-slate-300">
                  Spatial Influence Buffer: <span className="font-bold text-emerald-400 font-mono">{bufferRadiusKm} km</span>
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-[10px] text-slate-500 font-mono">5km</span>
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={bufferRadiusKm}
                  onChange={(e) => setBufferRadiusKm(Number(e.target.value))}
                  className="h-1.5 w-36 sm:w-48 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="text-[10px] text-slate-500 font-mono">25km</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Encompasses Doddaballapur, Dabaspet & NH-44 Corridor
              </div>
            </div>

          </div>

          {/* Quick Layer Switcher Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SPATIAL_LAYERS.slice(0, 4).map((layer) => {
              const isActive = activeLayer.id === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer)}
                  className={`rounded-xl border p-2.5 text-left transition-all ${
                    isActive
                      ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-200'
                      : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase text-slate-500">{layer.phase}</div>
                  <div className="text-xs font-bold truncate text-slate-200">{layer.title}</div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Column: Layer Inspector & Statutory Provenance */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                Layer Specification
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                {activeLayer.phase}
              </span>
            </div>

            <h3 className="mt-4 font-['Cinzel',serif] text-xl font-bold text-white">
              {activeLayer.title}
            </h3>
            <p className="mt-1 text-xs font-medium text-cyan-400">
              {activeLayer.zone}
            </p>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed font-light">
              {activeLayer.description}
            </p>

            {/* Provenance & Citation Verification Box */}
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <span>Statutory Source & OpenCity Record</span>
              </div>
              <div className="mt-2 text-xs text-slate-300">
                <span className="text-slate-500">Source:</span> {activeLayer.provenance.sourceName}
              </div>
              
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap gap-2">
                {activeLayer.provenance.downloads && activeLayer.provenance.downloads.length > 0 ? (
                  activeLayer.provenance.downloads.map((d, i) => (
                    <a
                      key={i}
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                    >
                      <Download className="h-3 w-3" />
                      <span>{d.label}</span>
                    </a>
                  ))
                ) : (
                  <a
                    href={activeLayer.provenance.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400 hover:underline"
                  >
                    <span>View Primary Government Gazette</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            {/* District Quick Facts List */}
            <div className="mt-6 space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-400">
                <span>Location Sector:</span>
                <span className="font-medium text-slate-200">Doddaballapur-Dabaspet Link</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-400">
                <span>Total Project Extent:</span>
                <span className="font-medium text-slate-200">5,800 Acres</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-400">
                <span>Catchment Expressway:</span>
                <span className="font-medium text-slate-200">STRR (NH-648) 8-Lane</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-400">
                <span>Water Retention:</span>
                <span className="font-medium text-emerald-400">50% Rainwater Quota</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
