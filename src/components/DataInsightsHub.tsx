import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Plane, 
  Droplets, 
  Briefcase, 
  Layers, 
  Download, 
  FileSpreadsheet, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { OPENCITY_DATA_RECORDS } from '../data/kwin-data';

export const DataInsightsHub: React.FC = () => {
  const [activeDataset, setActiveDataset] = useState<'aviation' | 'groundwater' | 'jobs' | 'lakes'>('aviation');

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (activeDataset === 'aviation') {
      csvContent += "Year,Total_Passengers,Growth_Pct,Cargo_Tons\n";
      OPENCITY_DATA_RECORDS.aviationTraffic.forEach(r => {
        csvContent += `${r.year},${r.passengers},${r.growthPct},${r.cargoTons}\n`;
      });
    } else if (activeDataset === 'groundwater') {
      csvContent += "Taluk,Pre_Monsoon_Depth_m,Post_Monsoon_Depth_m,Status\n";
      OPENCITY_DATA_RECORDS.groundwaterDepth.forEach(r => {
        csvContent += `${r.taluk},${r.preMonsoonDepthM},${r.postMonsoonDepthM},${r.status}\n`;
      });
    } else if (activeDataset === 'jobs') {
      csvContent += "Sector,Projected_Jobs,Percentage\n";
      OPENCITY_DATA_RECORDS.projectedJobsBySector.forEach(r => {
        csvContent += `${r.sector},${r.jobs},${r.percentage}\n`;
      });
    }
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kwin_${activeDataset}_dataset.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
              Tool #4: OpenCity Data Insights Hub
            </span>
            <span className="text-xs text-slate-400">
              Public Dataset Visualizations & Real Empirical Baselines
            </span>
          </div>
          <h2 className="mt-2 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white">
            Open Data Intelligence & Regional Benchmarks
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Corroborated time-series datasets from OpenCity.in, BIAL Aviation Reports, and Central Ground Water Board (CGWB).
          </p>
        </div>

        {/* Export & Provenance Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-blue-400" />
            <span>Export Active CSV</span>
          </button>
          <a
            href="https://data.opencity.in/dataset/kwin-city-documents"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3.5 py-2 text-xs font-medium text-blue-300 hover:bg-blue-500/20 transition-colors"
          >
            <span>OpenCity Catalog</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Dataset Selector Tabs */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveDataset('aviation')}
          className={`flex items-center gap-3 rounded-xl p-3.5 text-left transition-all border ${
            activeDataset === 'aviation'
              ? 'border-blue-500/50 bg-blue-950/40 text-blue-200 ring-1 ring-blue-500/30 shadow-lg'
              : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <div className="rounded-lg bg-blue-500/20 p-2 text-blue-400">
            <Plane className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100">Airport Traffic Growth</div>
            <div className="text-[10px] text-slate-400">BIAL North Bengaluru Engine</div>
          </div>
        </button>

        <button
          onClick={() => setActiveDataset('groundwater')}
          className={`flex items-center gap-3 rounded-xl p-3.5 text-left transition-all border ${
            activeDataset === 'groundwater'
              ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-500/30 shadow-lg'
              : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <div className="rounded-lg bg-cyan-500/20 p-2 text-cyan-400">
            <Droplets className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100">Groundwater Depth</div>
            <div className="text-[10px] text-slate-400">Taluk Hydrology Baseline</div>
          </div>
        </button>

        <button
          onClick={() => setActiveDataset('jobs')}
          className={`flex items-center gap-3 rounded-xl p-3.5 text-left transition-all border ${
            activeDataset === 'jobs'
              ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500/30 shadow-lg'
              : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100">Projected Jobs (100k)</div>
            <div className="text-[10px] text-slate-400">Knowledge Sector Split</div>
          </div>
        </button>

        <button
          onClick={() => setActiveDataset('lakes')}
          className={`flex items-center gap-3 rounded-xl p-3.5 text-left transition-all border ${
            activeDataset === 'lakes'
              ? 'border-indigo-500/50 bg-indigo-950/40 text-indigo-200 ring-1 ring-indigo-500/30 shadow-lg'
              : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <div className="rounded-lg bg-indigo-500/20 p-2 text-indigo-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100">Blue-Green Ecology</div>
            <div className="text-[10px] text-slate-400">Regional Lake Stewardship</div>
          </div>
        </button>
      </div>

      {/* Main Chart Visualization Box */}
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
        
        {/* Active View Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
              {activeDataset === 'aviation' && 'Bengaluru International Airport Passenger Movements (2015 – 2026)'}
              {activeDataset === 'groundwater' && 'Karnataka Taluk-Wise Pre & Post Monsoon Groundwater Table (Meters)'}
              {activeDataset === 'jobs' && 'KWIN City Knowledge Economy Projected Employment by Sector'}
              {activeDataset === 'lakes' && 'Bengaluru Lake Network Custody by Maintaining Agency'}
            </span>
            <h3 className="mt-1 font-['Cinzel',serif] text-xl font-bold text-white">
              {activeDataset === 'aviation' && 'Air Traffic Demand Curve Anchoring North Bengaluru'}
              {activeDataset === 'groundwater' && 'Hydrological Stress & Water Table Depth by Taluk'}
              {activeDataset === 'jobs' && 'Sectoral Job Generation Target (100,000 Total)'}
              {activeDataset === 'lakes' && 'Institutional Stewardship for Blue-Green Infrastructure'}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>OpenCity.in Verified Records</span>
          </div>
        </div>

        {/* Interactive Chart Container */}
        <div className="mt-6 h-80 sm:h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            
            {activeDataset === 'aviation' ? (
              <AreaChart data={OPENCITY_DATA_RECORDS.aviationTraffic}>
                <defs>
                  <linearGradient id="colorPax" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#f8fafc' }}
                  formatter={(value: any) => [`${(Number(value) / 1000000).toFixed(1)} Million Passengers`, 'Annual Traffic']}
                />
                <Area type="monotone" dataKey="passengers" name="Passengers" stroke="#3B82F6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPax)" />
              </AreaChart>
            ) : activeDataset === 'groundwater' ? (
              <BarChart data={OPENCITY_DATA_RECORDS.groundwaterDepth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="taluk" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(val) => `${val}m`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#f8fafc' }}
                  formatter={(value: any) => [`${value} meters depth`, 'Water Table']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="preMonsoonDepthM" name="Pre-Monsoon Depth (m)" fill="#06B6D4" radius={[6, 6, 0, 0]} />
                <Bar dataKey="postMonsoonDepthM" name="Post-Monsoon Depth (m)" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : activeDataset === 'jobs' ? (
              <BarChart data={OPENCITY_DATA_RECORDS.projectedJobsBySector} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis dataKey="sector" type="category" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} width={160} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#f8fafc' }}
                  formatter={(value: any) => [`${Number(value).toLocaleString()} Jobs`, 'Target Employment']}
                />
                <Bar dataKey="jobs" name="High-Tech Employment" fill="#10B981" radius={[0, 6, 6, 0]}>
                  {OPENCITY_DATA_RECORDS.projectedJobsBySector.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={OPENCITY_DATA_RECORDS.lakesStewardship}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="agency"
                  label={(entry) => `${entry.agency} (${entry.pct}%)`}
                >
                  <Cell fill="#3B82F6" />
                  <Cell fill="#06B6D4" />
                  <Cell fill="#10B981" />
                  <Cell fill="#8B5CF6" />
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#f8fafc' }}
                  formatter={(value: any) => [`${value} Lakes Managed`, 'Custody Count']}
                />
              </PieChart>
            )}

          </ResponsiveContainer>
        </div>

        {/* Dataset Key Contextual Findings */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs text-slate-300 leading-relaxed">
          <strong className="text-emerald-400">Key Contextual Insight: </strong>
          {activeDataset === 'aviation' && 'North Bengaluru airport passenger movements surged past 42 Million in 2024 following Terminal 2 commissioning, creating an unprecedented international transit hub within 45 minutes of the KWIN perimeter.'}
          {activeDataset === 'groundwater' && 'Groundwater table depths in Doddaballapur reach 42.8m pre-monsoon, necessitating KWIN’s mandatory 50% rainwater harvesting and piped water infrastructure to prevent localized ecological depletion.'}
          {activeDataset === 'jobs' && 'KWIN City allocates 32,000 jobs to AI & Software, 28,000 to Higher Education & Academia, 24,000 to BioTech/Life Sciences, and 16,000 to CleanTech Engineering.'}
          {activeDataset === 'lakes' && 'Integrated blue-green infrastructure stewardship connects regional lake networks, maintaining ecological retention basins across all 4 districts.'}
        </div>

      </div>

    </div>
  );
};
