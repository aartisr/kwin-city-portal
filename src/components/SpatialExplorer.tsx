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
  ExternalLink,
  Search,
  Building2,
  Sun,
  Activity,
  Check
} from 'lucide-react';
import { SPATIAL_LAYERS } from '../data/value-add-data';
import { DISTRICTS, KWIN_META } from '../data/kwin-data';
import { SpatialLayer } from '../types';
import { CADASTRAL_VILLAGES, generate28VillagesGeoJSON, VillageCadastralRecord } from '../data/cadastralVillages';

export const SpatialExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cadastral-villages' | 'district-zones'>('cadastral-villages');
  const [selectedPhase, setSelectedPhase] = useState<'all' | 'phase-1' | 'phase-2' | 'phase-3'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'zoning' | 'transport' | 'utilities'>('all');
  const [activeLayer, setActiveLayer] = useState<SpatialLayer>(SPATIAL_LAYERS[0]);
  const [selectedVillage, setSelectedVillage] = useState<VillageCadastralRecord>(CADASTRAL_VILLAGES[0]);
  const [villageSearch, setVillageSearch] = useState('');
  const [selectedHobli, setSelectedHobli] = useState<string>('all');
  const [bufferRadiusKm, setBufferRadiusKm] = useState<number>(10);
  const [showHighways, setShowHighways] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [downloadedGeoJson, setDownloadedGeoJson] = useState(false);

  const filteredLayers = SPATIAL_LAYERS.filter((layer) => {
    const phaseMatch = selectedPhase === 'all' || layer.phase === selectedPhase;
    const catMatch = selectedCategory === 'all' || layer.category === selectedCategory;
    return phaseMatch && catMatch;
  });

  const filteredVillages = CADASTRAL_VILLAGES.filter((v) => {
    const matchSearch = v.villageName.toLowerCase().includes(villageSearch.toLowerCase()) ||
                        v.kannadaName.includes(villageSearch) ||
                        v.surveyNumbersRange.toLowerCase().includes(villageSearch.toLowerCase()) ||
                        v.assignedZone.toLowerCase().includes(villageSearch.toLowerCase());
    const matchHobli = selectedHobli === 'all' || v.hobli.toLowerCase().includes(selectedHobli.toLowerCase());
    return matchSearch && matchHobli;
  });

  const handleDownloadMasterGeoJSON = () => {
    const geojson = generate28VillagesGeoJSON();
    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'KWIN_City_28_Villages_Cadastral_Master_2026.geojson';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadedGeoJson(true);
    setTimeout(() => setDownloadedGeoJson(false), 3000);
  };

  const handleDownloadSingleVillageGeoJSON = (village: VillageCadastralRecord) => {
    const singleGeoJson = {
      type: 'Feature',
      id: village.villageId,
      properties: {
        village_name: village.villageName,
        kannada_name: village.kannadaName,
        hobli: village.hobli,
        taluk: village.taluk,
        district: village.district,
        notified_acreage: village.totalAcreageNotified,
        survey_range: village.surveyNumbersRange,
        sample_surveys: village.sampleSurveyNumbers,
        kiadb_phase: village.kiadbPhase,
        sec_28_status: village.kiadbSec28Status,
        gazette_no: village.gazetteNotificationNo,
        gazette_date: village.gazetteDate,
        guidance_value_lakhs: village.guidanceValuePerAcreLakhs,
        market_rate_lakhs: village.marketRatePerAcreLakhs,
        assigned_zone: village.assignedZone
      },
      geometry: village.geojsonPolygon
    };

    const blob = new Blob([JSON.stringify(singleGeoJson, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${village.villageName.replace(/\s+/g, '_')}_Cadastral_Boundary.geojson`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              P2: Spatial & Cadastral GIS Engine
            </span>
            <span className="text-xs text-slate-400">
              28 Revenue Villages · 5,800 Acres Demarcation
            </span>
          </div>
          <h2 className="mt-2 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white">
            KWIN City Spatial & Cadastral Architecture
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Survey-level cadastral boundary GIS covering all 28 notified revenue villages across Doddaballapur, Nelamangala & Sompura taluks with full RFC 7946 GeoJSON export.
          </p>
        </div>

        {/* Top Controls: Mode Switcher & GeoJSON Master Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex rounded-xl border border-slate-800 bg-slate-900 p-1 text-xs">
            <button
              onClick={() => setActiveTab('cadastral-villages')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${activeTab === 'cadastral-villages' ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>28-Village Cadastral GIS</span>
            </button>
            <button
              onClick={() => setActiveTab('district-zones')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${activeTab === 'district-zones' ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>4-District Masterplan</span>
            </button>
          </div>

          <button
            onClick={handleDownloadMasterGeoJSON}
            className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
            title="Download full 28-Village Cadastral FeatureCollection (.geojson)"
          >
            {downloadedGeoJson ? <Check className="h-4 w-4 text-emerald-400" /> : <Download className="h-4 w-4" />}
            <span>{downloadedGeoJson ? 'GeoJSON Exported!' : 'Export 28-Village GeoJSON'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODE 1: 28-VILLAGE CADASTRAL BOUNDARY GEOJSON EXPLORER */}
      {/* ============================================================ */}
      {activeTab === 'cadastral-villages' ? (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive 28-Village SVG Cadastral Map */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 shadow-2xl">
              
              {/* Overlay Badges & Stats */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                <span className="rounded-lg border border-slate-800 bg-slate-900/95 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur-md">
                  28 Revenue Villages Notified
                </span>
                <span className="hidden sm:inline-flex rounded-lg border border-slate-800 bg-slate-900/90 px-2.5 py-1 text-xs text-slate-300">
                  Doddaballapur · Nelamangala
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/90 p-1 backdrop-blur-md">
                <button
                  onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2.0))}
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

              {/* Interactive Vector Grid of 28 Revenue Villages */}
              <div className="relative mt-10 flex items-center justify-center min-h-[460px] sm:min-h-[540px] overflow-hidden rounded-xl border border-slate-900 bg-slate-950">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full max-h-[540px] transition-transform duration-300"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <defs>
                    <pattern id="cad-grid" width="5" height="5" patternUnits="userSpaceOnUse">
                      <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#1e293b" strokeWidth="0.2" strokeDasharray="1,1" />
                    </pattern>
                  </defs>

                  <rect width="100" height="100" fill="url(#cad-grid)" />

                  {/* Highway Alignment Corridors */}
                  {showHighways && (
                    <>
                      {/* STRR NH-648 Alignment */}
                      <path
                        d="M 2 52 Q 50 48 98 52"
                        fill="none"
                        stroke="#06B6D4"
                        strokeWidth="1.8"
                        strokeDasharray="2,1"
                        opacity="0.8"
                      />
                      <text x="6" y="50" fill="#67E8F9" fontSize="2.2" fontWeight="bold">
                        STRR (NH-648) 8-LANE CORRIDOR
                      </text>

                      {/* Doddaballapur - Yelahanka Link */}
                      <path
                        d="M 62 2 L 62 98"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="1.4"
                        strokeDasharray="2,1"
                        opacity="0.7"
                      />
                      <text x="64" y="8" fill="#6EE7B7" fontSize="2.0" fontWeight="bold">
                        SH-9 TO BENGALURU AIRPORT
                      </text>
                    </>
                  )}

                  {/* Render 28 Cadastral Village Polygonal Plots */}
                  {CADASTRAL_VILLAGES.map((village, idx) => {
                    // Map lat/lng (13.20 - 13.40, 77.20 - 77.58) into SVG coordinates (0 - 100)
                    const [lat, lng] = village.coordinatesCentroid;
                    const svgX = ((lng - 77.20) / (77.58 - 77.20)) * 90 + 5;
                    const svgY = 95 - ((lat - 13.20) / (13.40 - 13.20)) * 90;
                    const isSelected = selectedVillage.villageId === village.villageId;

                    let fillHex = '#3B82F6';
                    if (village.assignedZone.includes('Knowledge')) fillHex = '#3B82F6';
                    else if (village.assignedZone.includes('Health')) fillHex = '#10B981';
                    else if (village.assignedZone.includes('Innovation')) fillHex = '#8B5CF6';
                    else if (village.assignedZone.includes('Deep-Tech')) fillHex = '#F59E0B';
                    else if (village.assignedZone.includes('Solar')) fillHex = '#EAB308';
                    else fillHex = '#06B6D4';

                    const radius = Math.sqrt(village.totalAcreageNotified) / 4.8;

                    return (
                      <g
                        key={village.villageId}
                        className="cursor-pointer transition-all hover:opacity-100"
                        onClick={() => setSelectedVillage(village)}
                      >
                        {/* Village Boundary Cell */}
                        <circle
                          cx={svgX}
                          cy={svgY}
                          r={radius}
                          fill={fillHex}
                          fillOpacity={isSelected ? 0.65 : 0.25}
                          stroke={isSelected ? '#10B981' : fillHex}
                          strokeWidth={isSelected ? 1.6 : 0.6}
                          strokeDasharray={village.kiadbSec28Status.includes('Preliminary') ? '1,1' : 'none'}
                        />

                        {/* Centroid Dot */}
                        <circle
                          cx={svgX}
                          cy={svgY}
                          r={isSelected ? 1.6 : 0.8}
                          fill={isSelected ? '#FFFFFF' : fillHex}
                        />

                        {/* Village Label */}
                        <text
                          x={svgX}
                          y={svgY - radius - 1.2}
                          textAnchor="middle"
                          fill={isSelected ? '#FFFFFF' : '#CBD5E1'}
                          fontSize={isSelected ? '2.4' : '1.8'}
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          className="pointer-events-none drop-shadow-sm"
                        >
                          {village.villageName}
                        </text>

                        {/* Acreage Tag */}
                        <text
                          x={svgX}
                          y={svgY + radius + 2.2}
                          textAnchor="middle"
                          fill={isSelected ? '#34D399' : '#94A3B8'}
                          fontSize="1.5"
                          className="pointer-events-none font-mono"
                        >
                          {village.totalAcreageNotified} Ac
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Cadastral Legend & Stats */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500/80"></div>
                  <span className="text-slate-300">Knowledge Belt (1,500 Ac)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-slate-300">Health Sanctuary (1,400 Ac)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500/80"></div>
                  <span className="text-slate-300">Innovation & AI (1,600 Ac)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                  <span className="text-slate-300">Solar & STRR (1,300 Ac)</span>
                </div>
              </div>

            </div>

            {/* Quick Village Carousel / List Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Quick Filter by Revenue Village ({filteredVillages.length} Villages)</span>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedHobli}
                    onChange={(e) => setSelectedHobli(e.target.value)}
                    className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-300"
                  >
                    <option value="all">All Hoblis</option>
                    <option value="tubagere">Tubagere Hobli</option>
                    <option value="kasaba">Kasaba Hobli</option>
                    <option value="sompura">Sompura Hobli</option>
                    <option value="sasalu">Sasalu Hobli</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {filteredVillages.map((v) => (
                  <button
                    key={v.villageId}
                    onClick={() => setSelectedVillage(v)}
                    className={`flex-shrink-0 rounded-xl border p-2.5 text-left transition-all ${
                      selectedVillage.villageId === v.villageId
                        ? 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-mono uppercase text-slate-400">{v.hobli}</div>
                    <div className="text-xs font-bold text-slate-200">{v.villageName}</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">{v.totalAcreageNotified} Acres · {v.surveyCount} Surveys</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Selected Village Cadastral Dossier */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm shadow-xl">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                  Village Cadastral Record
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  {selectedVillage.kiadbPhase}
                </span>
              </div>

              <div className="mt-4">
                <div className="text-xs text-slate-400">{selectedVillage.kannadaName}</div>
                <h3 className="font-['Cinzel',serif] text-2xl font-bold text-white">
                  {selectedVillage.villageName}
                </h3>
                <p className="mt-1 text-xs font-semibold text-cyan-400">
                  {selectedVillage.assignedZone} · {selectedVillage.hobli}
                </p>
              </div>

              {/* Status Badge */}
              <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{selectedVillage.kiadbSec28Status}</span>
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                  Gazette: <span className="text-slate-200 font-mono">{selectedVillage.gazetteNotificationNo}</span> ({selectedVillage.gazetteDate})
                </div>
              </div>

              {/* Survey Bounds & Acreage Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Notified Acreage</div>
                  <div className="mt-1 text-lg font-bold text-white font-mono">{selectedVillage.totalAcreageNotified} <span className="text-xs text-slate-400 font-normal">Acres</span></div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Survey Parcels</div>
                  <div className="mt-1 text-lg font-bold text-emerald-400 font-mono">{selectedVillage.surveyCount} <span className="text-xs text-slate-400 font-normal">Plots</span></div>
                </div>
              </div>

              {/* Survey Numbers Range */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                <div className="text-[10px] font-mono text-slate-500 uppercase">Cadastral Survey Range</div>
                <div className="mt-1 text-xs font-semibold text-slate-200 font-mono">
                  {selectedVillage.surveyNumbersRange}
                </div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Sample Notified Surveys:
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {selectedVillage.sampleSurveyNumbers.map((s, i) => (
                    <span key={i} className="rounded-md border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                      Sy {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Valuation Benchmarks */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Govt Guidance Value:</span>
                  <span className="font-mono text-slate-200">₹{selectedVillage.guidanceValuePerAcreLakhs} Lakhs/Acre</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Market Acquisition Benchmark:</span>
                  <span className="font-mono font-bold text-emerald-400">₹{selectedVillage.marketRatePerAcreLakhs} Lakhs/Acre</span>
                </div>
                <div className="flex justify-between text-slate-400 border-t border-slate-800/80 pt-2">
                  <span>Taluk & District:</span>
                  <span className="text-slate-200">{selectedVillage.taluk}, {selectedVillage.district}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>GPS Centroid:</span>
                  <span className="font-mono text-slate-300 text-[11px]">{selectedVillage.coordinatesCentroid[0]}° N, {selectedVillage.coordinatesCentroid[1]}° E</span>
                </div>
              </div>

              {/* Export GeoJSON Action */}
              <div className="mt-6">
                <button
                  onClick={() => handleDownloadSingleVillageGeoJSON(selectedVillage)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                >
                  <Download className="h-4 w-4" />
                  <span>Download {selectedVillage.villageName} GeoJSON</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* ============================================================ */
        /* MODE 2: 4-DISTRICT MASTERPLAN ZONING */
        /* ============================================================ */
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 shadow-2xl">
              
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
              </div>

              {/* SVG 4-District Masterplan */}
              <div className="relative mt-8 flex items-center justify-center min-h-[420px] sm:min-h-[500px] overflow-hidden rounded-xl border border-slate-900 bg-slate-950/90">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full max-h-[520px] transition-transform duration-300"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.3" strokeDasharray="1,1" />
                    </pattern>
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

                  {showGrid && <rect width="100" height="100" fill="url(#grid)" />}

                  {/* District 1 */}
                  <g className="cursor-pointer transition-all hover:opacity-90" onClick={() => setActiveLayer(SPATIAL_LAYERS[0])}>
                    <rect x="12" y="12" width="36" height="36" rx="2" fill="url(#grad-knowledge)" stroke={activeLayer.id === 'layer-knowledge-core' ? '#60A5FA' : '#3B82F6'} strokeWidth="1.2" />
                    <text x="30" y="28" textAnchor="middle" fill="#93C5FD" fontSize="3.2" fontWeight="bold">KNOWLEDGE DISTRICT</text>
                    <text x="30" y="33" textAnchor="middle" fill="#BFDBFE" fontSize="2.2">1,500 Acres · Higher Ed & AI</text>
                  </g>

                  {/* District 2 */}
                  <g className="cursor-pointer transition-all hover:opacity-90" onClick={() => setActiveLayer(SPATIAL_LAYERS[1])}>
                    <rect x="52" y="12" width="36" height="36" rx="2" fill="url(#grad-health)" stroke={activeLayer.id === 'layer-health-sanctuary' ? '#34D399' : '#10B981'} strokeWidth="1.2" />
                    <text x="70" y="28" textAnchor="middle" fill="#A7F3D0" fontSize="3.2" fontWeight="bold">HEALTH & LIFE SCIENCES</text>
                    <text x="70" y="33" textAnchor="middle" fill="#D1FAE5" fontSize="2.2">1,400 Acres · MedTech & Bio</text>
                  </g>

                  {/* District 3 */}
                  <g className="cursor-pointer transition-all hover:opacity-90" onClick={() => setActiveLayer(SPATIAL_LAYERS[2])}>
                    <rect x="12" y="52" width="36" height="36" rx="2" fill="url(#grad-innovation)" stroke={activeLayer.id === 'layer-innovation-park' ? '#C084FC' : '#8B5CF6'} strokeWidth="1.2" />
                    <text x="30" y="68" textAnchor="middle" fill="#E9D5FF" fontSize="3.2" fontWeight="bold">INNOVATION DISTRICT</text>
                    <text x="30" y="73" textAnchor="middle" fill="#F3E8FF" fontSize="2.2">1,600 Acres · Semiconductor & Space</text>
                  </g>

                  {/* District 4 */}
                  <g className="cursor-pointer transition-all hover:opacity-90" onClick={() => setActiveLayer(SPATIAL_LAYERS[3])}>
                    <rect x="52" y="52" width="36" height="36" rx="2" fill="url(#grad-research)" stroke={activeLayer.id === 'layer-research-aerospace' ? '#FCD34D' : '#F59E0B'} strokeWidth="1.2" />
                    <text x="70" y="68" textAnchor="middle" fill="#FDE68A" fontSize="3.2" fontWeight="bold">RESEARCH DISTRICT</text>
                    <text x="70" y="73" textAnchor="middle" fill="#FEF3C7" fontSize="2.2">1,300 Acres · Advanced Engineering</text>
                  </g>

                  {/* Solar Array */}
                  <g className="cursor-pointer transition-all hover:opacity-90" onClick={() => setActiveLayer(SPATIAL_LAYERS[4])}>
                    <circle cx="50" cy="50" r="8.5" fill="url(#grad-solar)" stroke="#F59E0B" strokeWidth="1" className="animate-pulse" />
                    <text x="50" y="49" textAnchor="middle" fill="#1E293B" fontSize="2.2" fontWeight="bold">465-ACRE</text>
                    <text x="50" y="52.5" textAnchor="middle" fill="#1E293B" fontSize="1.8" fontWeight="bold">SOLAR MICROGRID</text>
                  </g>

                  {showHighways && (
                    <>
                      <line x1="2" y1="50" x2="98" y2="50" stroke="#06B6D4" strokeWidth="1.8" strokeDasharray="3,1" />
                      <text x="8" y="47" fill="#67E8F9" fontSize="2.2" fontWeight="bold">STRR (NH-648) EXPRESSWAY</text>
                    </>
                  )}
                </svg>
              </div>

              {/* Buffer Slider */}
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
              </div>

            </div>
          </div>

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
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
