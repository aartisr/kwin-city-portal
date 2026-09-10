import React, { useState } from 'react';
import { 
  Layers, 
  MapPin, 
  Navigation, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sun, 
  Car, 
  Droplets, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Maximize2,
  Activity,
  CheckCircle2,
  Building2,
  HeartPulse,
  Cpu,
  Compass
} from 'lucide-react';
import { DISTRICTS, KWIN_META } from '../data/kwin-data';

interface InteractiveSpatialMapPreviewProps {
  onNavigateToFullGIS: () => void;
}

export const InteractiveSpatialMapPreview: React.FC<InteractiveSpatialMapPreviewProps> = ({
  onNavigateToFullGIS,
}) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('innovation');
  const [activeLayers, setActiveLayers] = useState<{
    districts: boolean;
    highways: boolean;
    solar: boolean;
    waterBuffer: boolean;
    grid: boolean;
    radar: boolean;
  }>({
    districts: true,
    highways: true,
    solar: true,
    waterBuffer: true,
    grid: true,
    radar: false,
  });
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredCoordinate, setHoveredCoordinate] = useState<{ x: number; y: number } | null>(null);

  const selectedDistrict = DISTRICTS.find((d) => d.id === selectedDistrictId) || DISTRICTS[0];

  const toggleLayer = (layerKey: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setHoveredCoordinate({ x, y });
  };

  const handleSvgMouseLeave = () => {
    setHoveredCoordinate(null);
  };

  // Convert SVG coordinates to rough real-world GPS coordinates
  const getGpsString = (x: number, y: number) => {
    const lat = (13.2980 + (50 - y) * 0.0015).toFixed(4);
    const lng = (77.5420 + (x - 50) * 0.0018).toFixed(4);
    return `${lat}° N, ${lng}° E`;
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:p-7 shadow-2xl overflow-hidden relative">
      
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Interactive Spatial GIS
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              5,800-Acre Masterplan Vector Engine
            </span>
          </div>
          <h3 className="mt-1.5 font-['Cinzel',serif] text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>Spatial Zoning & Strategic Land Corridors</span>
          </h3>
          <p className="text-xs text-slate-300 font-light mt-0.5">
            Click districts or toggle spatial layers to inspect 465-acre solar arrays, STRR arterials, and cadastral survey zones.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={onNavigateToFullGIS}
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Launch Full GIS Engine</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Layer Toggles & Interactive Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5 py-2 border-b border-slate-800/60">
        
        {/* Layer Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-mono text-slate-500 mr-1 flex items-center gap-1">
            <Layers className="h-3 w-3" /> Layers:
          </span>
          <button
            onClick={() => toggleLayer('districts')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
              activeLayers.districts 
                ? 'bg-blue-950/60 border-blue-500/40 text-blue-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            4 Districts
          </button>
          <button
            onClick={() => toggleLayer('highways')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
              activeLayers.highways 
                ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            STRR & Arterials
          </button>
          <button
            onClick={() => toggleLayer('solar')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
              activeLayers.solar 
                ? 'bg-amber-950/60 border-amber-500/40 text-amber-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            465-Ac Solar Farm
          </button>
          <button
            onClick={() => toggleLayer('waterBuffer')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
              activeLayers.waterBuffer 
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            Eco Buffer
          </button>
          <button
            onClick={() => toggleLayer('radar')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
              activeLayers.radar 
                ? 'bg-purple-950/60 border-purple-500/40 text-purple-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            Sentinel-2 Radar
          </button>
        </div>

        {/* Zoom & View Reset */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            {hoveredCoordinate ? getGpsString(hoveredCoordinate.x, hoveredCoordinate.y) : KWIN_META.coordinates}
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.6))}
            title="Zoom In"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
            title="Zoom Out"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            title="Reset Zoom"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

      {/* Main Map + District Telemetry Grid */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: The Interactive Vector GIS Canvas */}
        <div className="lg:col-span-8 relative rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-center justify-center p-3 select-none">
          
          {/* Compass Rose */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-slate-950/80 border border-slate-800/80 rounded-lg px-2.5 py-1 text-[10px] font-mono text-slate-300 backdrop-blur-md">
            <Compass className="h-3.5 w-3.5 text-emerald-400" />
            <span>N 0° TRUE</span>
          </div>

          {/* Scale Legend */}
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 bg-slate-950/80 border border-slate-800/80 rounded-lg px-2.5 py-1 text-[10px] font-mono text-slate-300 backdrop-blur-md">
            <div className="w-10 h-1 bg-emerald-400 rounded-full" />
            <span>2.5 km (KIADB Cadastre)</span>
          </div>

          {/* Interactive SVG Stage */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full max-h-[440px] transition-transform duration-300 cursor-crosshair"
            style={{ transform: `scale(${zoomLevel})` }}
            onMouseMove={handleSvgMouseMove}
            onMouseLeave={handleSvgMouseLeave}
          >
            <defs>
              {/* Cadastral Grid */}
              <pattern id="gisGrid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#1e293b" strokeWidth="0.2" strokeDasharray="0.5,1" />
              </pattern>

              {/* District Gradients */}
              <linearGradient id="gradKnowledge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.75" />
              </linearGradient>

              <linearGradient id="gradHealth" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.75" />
              </linearGradient>

              <linearGradient id="gradInnovation" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.75" />
              </linearGradient>

              <linearGradient id="gradResearch" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0.75" />
              </linearGradient>

              {/* Solar Array Pattern */}
              <pattern id="solarGrid" width="3" height="3" patternUnits="userSpaceOnUse">
                <rect width="2.5" height="2.5" fill="#f59e0b" fillOpacity="0.25" rx="0.3" />
                <path d="M 0 1.25 L 2.5 1.25 M 1.25 0 L 1.25 2.5" stroke="#fbbf24" strokeWidth="0.15" />
              </pattern>

              {/* Glowing Filters */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Cadastral Grid Layer */}
            {activeLayers.grid && (
              <rect x="0" y="0" width="100" height="100" fill="url(#gisGrid)" opacity="0.8" />
            )}

            {/* Radar Heatmap Simulation */}
            {activeLayers.radar && (
              <g opacity="0.3" className="animate-pulse">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="#a855f7" strokeWidth="0.3" />
                <line x1="50" y1="5" x2="50" y2="95" stroke="#a855f7" strokeWidth="0.3" />
              </g>
            )}

            {/* Environmental Buffer Catchment Zone */}
            {activeLayers.waterBuffer && (
              <g opacity="0.85">
                <path
                  d="M 5 65 Q 25 75 45 68 T 85 80 T 95 90 L 95 98 L 5 98 Z"
                  fill="#064e3b"
                  fillOpacity="0.3"
                  stroke="#10b981"
                  strokeWidth="0.4"
                  strokeDasharray="1,1"
                />
                <text x="12" y="92" fill="#34d399" fontSize="2.4" fontFamily="monospace" letterSpacing="0.2">
                  HESARAGHATTA RAIN RECHARGE CATCHMENT BUFFER (50% QUOTA)
                </text>
              </g>
            )}

            {/* 4 Core Districts Polygons */}
            {activeLayers.districts && (
              <g>
                {/* 1. Knowledge District (North-West) */}
                <polygon
                  points="12,18 45,15 42,48 10,45"
                  fill="url(#gradKnowledge)"
                  stroke={selectedDistrictId === 'knowledge' ? '#60A5FA' : '#3B82F6'}
                  strokeWidth={selectedDistrictId === 'knowledge' ? '1.2' : '0.6'}
                  filter={selectedDistrictId === 'knowledge' ? 'url(#glow)' : undefined}
                  className="transition-all duration-200 hover:fill-opacity-90 cursor-pointer"
                  onClick={() => setSelectedDistrictId('knowledge')}
                />
                <text x="15" y="25" fill="#93c5fd" fontSize="3" fontWeight="bold" fontFamily="'Cinzel', serif">
                  KNOWLEDGE (1,500 Ac)
                </text>
                <text x="15" y="30" fill="#cbd5e1" fontSize="2" fontFamily="sans-serif">
                  Global Universities & AI Labs
                </text>

                {/* 2. Health & Lifesciences District (North-East) */}
                <polygon
                  points="48,15 88,18 85,48 45,46"
                  fill="url(#gradHealth)"
                  stroke={selectedDistrictId === 'health' ? '#34D399' : '#10B981'}
                  strokeWidth={selectedDistrictId === 'health' ? '1.2' : '0.6'}
                  filter={selectedDistrictId === 'health' ? 'url(#glow)' : undefined}
                  className="transition-all duration-200 hover:fill-opacity-90 cursor-pointer"
                  onClick={() => setSelectedDistrictId('health')}
                />
                <text x="51" y="25" fill="#6ee7b7" fontSize="3" fontWeight="bold" fontFamily="'Cinzel', serif">
                  HEALTH (1,400 Ac)
                </text>
                <text x="51" y="30" fill="#cbd5e1" fontSize="2" fontFamily="sans-serif">
                  Tertiary Med & Genomic Labs
                </text>

                {/* 3. Innovation District (South-West) */}
                <polygon
                  points="10,48 44,50 42,82 14,80"
                  fill="url(#gradInnovation)"
                  stroke={selectedDistrictId === 'innovation' ? '#C084FC' : '#8B5CF6'}
                  strokeWidth={selectedDistrictId === 'innovation' ? '1.2' : '0.6'}
                  filter={selectedDistrictId === 'innovation' ? 'url(#glow)' : undefined}
                  className="transition-all duration-200 hover:fill-opacity-90 cursor-pointer"
                  onClick={() => setSelectedDistrictId('innovation')}
                />
                <text x="14" y="58" fill="#d8b4fe" fontSize="3" fontWeight="bold" fontFamily="'Cinzel', serif">
                  INNOVATION (1,600 Ac)
                </text>
                <text x="14" y="63" fill="#cbd5e1" fontSize="2" fontFamily="sans-serif">
                  DeepTech & Silicon Prototyping
                </text>

                {/* 4. Research & Defense District (South-East) */}
                <polygon
                  points="46,50 88,48 84,80 44,82"
                  fill="url(#gradResearch)"
                  stroke={selectedDistrictId === 'research' ? '#FBBF24' : '#F59E0B'}
                  strokeWidth={selectedDistrictId === 'research' ? '1.2' : '0.6'}
                  filter={selectedDistrictId === 'research' ? 'url(#glow)' : undefined}
                  className="transition-all duration-200 hover:fill-opacity-90 cursor-pointer"
                  onClick={() => setSelectedDistrictId('research')}
                />
                <text x="50" y="58" fill="#fde68a" fontSize="3" fontWeight="bold" fontFamily="'Cinzel', serif">
                  RESEARCH (1,300 Ac)
                </text>
                <text x="50" y="63" fill="#cbd5e1" fontSize="2" fontFamily="sans-serif">
                  Aerospace & CleanTech Park
                </text>
              </g>
            )}

            {/* 465-Acre Solar Farm Overlay */}
            {activeLayers.solar && (
              <g>
                <rect
                  x="68"
                  y="62"
                  width="18"
                  height="14"
                  fill="url(#solarGrid)"
                  stroke="#f59e0b"
                  strokeWidth="0.6"
                  rx="1"
                />
                <text x="69" y="66" fill="#fbbf24" fontSize="2" fontWeight="bold">
                  465-AC SOLAR PV
                </text>
                <text x="69" y="69" fill="#fef3c7" fontSize="1.6">
                  250MWp / 50MWh BESS
                </text>
              </g>
            )}

            {/* Transport Arterials (STRR & NH Corridors) */}
            {activeLayers.highways && (
              <g>
                {/* STRR Ring Highway */}
                <path
                  d="M 2 30 Q 45 4 98 28"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1.2"
                  strokeDasharray="2,1"
                  filter="url(#glow)"
                />
                <text x="35" y="10" fill="#22d3ee" fontSize="2.2" fontFamily="monospace" fontWeight="bold">
                  SATELLITE TOWN RING ROAD (STRR NH-948A)
                </text>

                {/* Doddaballapur-Dabaspet 6-Lane Expressway */}
                <line
                  x1="45"
                  y1="2"
                  x2="43"
                  y2="98"
                  stroke="#38bdf8"
                  strokeWidth="1.4"
                />
                <text x="46" y="88" fill="#7dd3fc" fontSize="2" fontFamily="monospace" transform="rotate(88, 46, 88)">
                  DODDABALLAPUR-DABASPET CENTRAL METRO SPINE
                </text>

                {/* Suburb Rail Transit Feeder */}
                <path
                  d="M 5 55 L 95 55"
                  stroke="#e2e8f0"
                  strokeWidth="0.8"
                  strokeDasharray="1,1"
                />
                <text x="60" y="53" fill="#94a3b8" fontSize="1.8" fontFamily="monospace">
                  BIAL SUBURBAN RAIL FEEDER (28 MINS TO AIRPORT)
                </text>
              </g>
            )}

            {/* Central Master Multi-Modal Hub */}
            <circle cx="44" cy="49" r="2.5" fill="#10b981" stroke="#ffffff" strokeWidth="0.6" filter="url(#glow)" />
            <text x="48" y="50" fill="#ffffff" fontSize="2.2" fontWeight="bold">
              KWIN CENTRAL INTERCHANGE
            </text>
          </svg>

        </div>

        {/* Right 4 Cols: Selected District Intelligence Card */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-sm">
            
            {/* District Category Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                Active Zone Inspector
              </span>
              <span className="font-mono text-xs text-slate-300 font-bold">
                {selectedDistrict.acreage.toLocaleString()} Acres
              </span>
            </div>

            {/* District Title */}
            <h4 className="mt-3 font-['Cinzel',serif] text-lg font-bold text-white leading-tight">
              {selectedDistrict.name}
            </h4>
            <div className="text-xs text-cyan-400 font-medium mt-0.5">
              {selectedDistrict.tagline}
            </div>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed font-light">
              {selectedDistrict.description}
            </p>

            {/* District Metrics Grid */}
            <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-slate-800 text-xs">
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block font-mono">Investment Envelope</span>
                <span className="font-semibold text-emerald-300">{selectedDistrict.expectedInvestment}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block font-mono">Projected Tech Jobs</span>
                <span className="font-semibold text-teal-300">{selectedDistrict.projectedJobs.toLocaleString()}</span>
              </div>
            </div>

            {/* Key Anchor Facilities */}
            <div className="mt-4 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Zoned Key Anchors:
              </span>
              {selectedDistrict.keyAnchors.map((anchor, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{anchor}</span>
                </div>
              ))}
            </div>

            {/* Quick District Selectors */}
            <div className="mt-5 pt-3 border-t border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Quick Zone Select:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {DISTRICTS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDistrictId(d.id)}
                    className={`px-2 py-1.5 rounded-lg text-left text-xs transition-all cursor-pointer border ${
                      selectedDistrictId === d.id
                        ? 'bg-slate-800 border-emerald-500/50 text-emerald-300 font-semibold shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="truncate block">{d.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-slate-500 font-mono block">{d.acreage} Ac</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
