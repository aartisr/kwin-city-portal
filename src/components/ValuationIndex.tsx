import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Calculator, 
  PieChart as PieIcon, 
  ArrowUpRight, 
  ShieldCheck, 
  Info, 
  Layers, 
  HelpCircle 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { VALUATION_ZONES } from '../data/value-add-data';
import { ValuationZone } from '../types';

export const ValuationIndex: React.FC = () => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(VALUATION_ZONES[0].id);
  const [parcelSizeAcres, setParcelSizeAcres] = useState<number>(5);
  const [holdingPeriodYears, setHoldingPeriodYears] = useState<number>(5);
  const [sectorMultiplier, setSectorMultiplier] = useState<number>(1.15); // AI/Tech anchor premium

  const currentZone = useMemo(() => {
    return VALUATION_ZONES.find(z => z.id === selectedZoneId) || VALUATION_ZONES[0];
  }, [selectedZoneId]);

  // 1 Acre = 43,560 sq.ft
  const parcelSqFt = parcelSizeAcres * 43560;
  const initialCostINR = parcelSqFt * currentZone.currentRate;
  
  // Future estimated rate calculation with CAGR and Sector anchor multiplier
  const effectiveCAGR = (currentZone.fiveYearCAGR / 100) * (sectorMultiplier >= 1 ? sectorMultiplier : 1);
  const projectedFutureRate = Math.round(currentZone.currentRate * Math.pow(1 + effectiveCAGR, holdingPeriodYears));
  const projectedTotalValueINR = parcelSqFt * projectedFutureRate;
  const projectedAppreciationINR = projectedTotalValueINR - initialCostINR;
  const roiMultiplier = (projectedTotalValueINR / initialCostINR).toFixed(2);

  // Formatter for INR Crores / Lakhs
  const formatINR = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-300">
              Tool #2: Econometric Valuation Index
            </span>
            <span className="text-xs text-slate-400">
              Land Rates, CAGR Projections & ROI Estimator
            </span>
          </div>
          <h2 className="mt-2 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white">
            KWIN City Land Appreciation & Valuation Index
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Evidence-backed land economics modeling historical trends from 2021 to 2025 and projecting capital growth 
            through the 2035 masterplan lifecycle.
          </p>
        </div>

        {/* Zone Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {VALUATION_ZONES.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZoneId(zone.id)}
              className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                zone.id === selectedZoneId
                  ? 'border border-teal-500/40 bg-teal-500/20 text-teal-200 shadow-md ring-1 ring-teal-500/30'
                  : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {zone.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Simulation Controls & Chart Display */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive ROI Calculator Controls */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
            <h3 className="font-['Cinzel',serif] text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="h-5 w-5 text-teal-400" />
              <span>Investment Simulator</span>
            </h3>

            {/* Current Corridor Info */}
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                Active Valuation Corridor
              </div>
              <div className="mt-1 text-sm font-bold text-slate-100">
                {currentZone.name}
              </div>
              <div className="mt-1 text-xs text-teal-400">
                Current Market: <span className="font-mono font-bold">₹{currentZone.currentRate.toLocaleString()}/sq.ft</span>
              </div>
              <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                {currentZone.driverSummary}
              </p>
            </div>

            {/* Slider 1: Parcel Size in Acres */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Parcel Extent:</span>
                <span className="font-mono font-bold text-teal-300">{parcelSizeAcres} Acres ({parcelSqFt.toLocaleString()} sq.ft)</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="50"
                step="0.5"
                value={parcelSizeAcres}
                onChange={(e) => setParcelSizeAcres(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.5 Ac (21,780 sq.ft)</span>
                <span>25 Ac</span>
                <span>50 Ac</span>
              </div>
            </div>

            {/* Slider 2: Investment Horizon */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Holding Period:</span>
                <span className="font-mono font-bold text-teal-300">{holdingPeriodYears} Years ({2026 + holdingPeriodYears} Horizon)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={holdingPeriodYears}
                onChange={(e) => setHoldingPeriodYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 Year (2027)</span>
                <span>5 Years (2031)</span>
                <span>10 Years (2036)</span>
              </div>
            </div>

            {/* Sector Cluster Premium Selector */}
            <div className="mt-5 space-y-2">
              <label className="text-xs text-slate-300 font-medium block">
                Target Sector / Use Case:
              </label>
              <select
                value={sectorMultiplier}
                onChange={(e) => setSectorMultiplier(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-teal-500 focus:outline-none"
              >
                <option value={1.15}>AI & DeepTech (High Premium: +15% CAGR)</option>
                <option value={1.12}>Biotech & Clinical Research (+12% CAGR)</option>
                <option value={1.08}>Higher Education Campus (+8% CAGR)</option>
                <option value={1.0}>CleanTech & Advanced Logistics (Baseline)</option>
              </select>
            </div>

          </div>

          {/* Projection Calculation Result Card */}
          <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-950/40 via-slate-900 to-slate-950 p-6 shadow-xl">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-400">
              Econometric Forecast ({2026 + holdingPeriodYears})
            </div>
            
            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span>Initial Capital Outlay:</span>
                <span className="font-mono font-bold text-slate-100">{formatINR(initialCostINR)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span>Projected Rate at Exit:</span>
                <span className="font-mono font-bold text-teal-300">₹{projectedFutureRate.toLocaleString()}/sq.ft</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span>Estimated Value at Year {holdingPeriodYears}:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{formatINR(projectedTotalValueINR)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span>Net Capital Gain:</span>
                <span className="font-mono font-bold text-cyan-300">+{formatINR(projectedAppreciationINR)}</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-300">
                <span>ROI Multiple:</span>
                <span className="font-mono font-extrabold text-amber-400 text-sm">{roiMultiplier}x Capital Return</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Historical & Projected Valuation Chart */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-400">
                  Time-Series Valuation Curve
                </span>
                <h3 className="mt-1 font-['Cinzel',serif] text-xl font-bold text-white">
                  Market Rate vs. Government Guidance (₹/sq.ft)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-400" /> Market Price
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-slate-400 ml-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Guidance Value
                </span>
              </div>
            </div>

            {/* Recharts Area Chart Component */}
            <div className="mt-6 h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentZone.historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorGuidance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(val) => `₹${val}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#f8fafc' }}
                    formatter={(value: any) => [`₹${Number(value).toLocaleString()}/sq.ft`, '']}
                  />
                  <Area type="monotone" dataKey="marketRate" name="Market Rate" stroke="#14b8a6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMarket)" />
                  <Area type="monotone" dataKey="guidanceRate" name="Guidance Value" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorGuidance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Multi-Corridor Comparative Table */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                North Bengaluru Corridor Comparison Matrix
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="px-3 py-2.5">Corridor / Zone</th>
                      <th className="px-3 py-2.5">Current Rate</th>
                      <th className="px-3 py-2.5">5-Yr CAGR</th>
                      <th className="px-3 py-2.5">2035 Target</th>
                      <th className="px-3 py-2.5">Primary Catalyst</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {VALUATION_ZONES.map((z) => (
                      <tr key={z.id} className={z.id === selectedZoneId ? 'bg-teal-950/20 text-teal-200' : 'hover:bg-slate-900/40'}>
                        <td className="px-3 py-3 font-semibold">{z.name}</td>
                        <td className="px-3 py-3 font-mono">₹{z.currentRate}/sq.ft</td>
                        <td className="px-3 py-3 font-mono text-emerald-400">+{z.fiveYearCAGR}%</td>
                        <td className="px-3 py-3 font-mono text-teal-300">₹{z.tenYearProjected}/sq.ft</td>
                        <td className="px-3 py-3 text-slate-400">{z.corridor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
