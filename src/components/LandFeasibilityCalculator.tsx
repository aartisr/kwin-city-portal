import React, { useState } from 'react';
import { 
  Calculator, 
  MapPin, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Building2, 
  Scale, 
  Download, 
  FileText, 
  ShieldCheck, 
  Zap, 
  DollarSign, 
  Layers, 
  Sparkles, 
  BarChart3, 
  Copy, 
  Check,
  BookmarkPlus,
  BookmarkCheck,
  Crown
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { DueDiligencePDFModal } from './DueDiligencePDFModal';
import { PricingAndCheckoutModal } from './PricingAndCheckoutModal';

export const LandFeasibilityCalculator: React.FC = () => {
  const { addToWatchlist, isParcelInWatchlist, tier } = useUser();
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [watchlistSuccess, setWatchlistSuccess] = useState(false);

  // Survey Lookup Form State
  const [village, setVillage] = useState('Tubagere Hobli');
  const [surveyNo, setSurveyNo] = useState('142/2A');
  const [acreage, setAcreage] = useState<number>(2.5);
  const [selectedZone, setSelectedZone] = useState('Knowledge & Higher Education District');
  const [hasCalculated, setHasCalculated] = useState(false);
  const [copiedDossier, setCopiedDossier] = useState(false);

  // ROI Investment Simulator State
  const [investmentYears, setInvestmentYears] = useState<number>(5);
  const [capitalINR, setCapitalINR] = useState<number>(50); // In Lakhs

  // Village data mappings
  const villageData: Record<string, { guidanceVal: number; kiadbCompensationVal: number; kiadbStatus: string; zoneFit: string }> = {
    'Tubagere Hobli': { guidanceVal: 45, kiadbCompensationVal: 180, kiadbStatus: 'Phase 1 Final Notification Issued (KIADB Cleared)', zoneFit: 'Knowledge & Higher Education District' },
    'Kasaba Hobli (Doddaballapur)': { guidanceVal: 65, kiadbCompensationVal: 240, kiadbStatus: 'Phase 2 Preliminary Gazetted', zoneFit: 'Health & Life Sciences District' },
    'Hosahalli Corridor': { guidanceVal: 50, kiadbCompensationVal: 200, kiadbStatus: 'Direct Industrial Allotment Zone', zoneFit: 'Innovation & Smart Enterprise District' },
    'Dabaspet Industrial Node': { guidanceVal: 40, kiadbCompensationVal: 160, kiadbStatus: 'Phase 1 Possession Handover in Progress', zoneFit: 'Eco-Housing & Logistics Buffer' }
  };

  const currentVillage = villageData[village] || villageData['Tubagere Hobli'];

  // Calculations
  const guidanceTotal = (currentVillage.guidanceVal * acreage); // in Lakhs
  const kiadbCompensationTotal = (currentVillage.kiadbCompensationVal * acreage); // in Lakhs
  const marketValuation2026 = (395 * acreage); // in Lakhs (₹3.95 Cr / Acre base)
  const stampDuty = marketValuation2026 * 0.05; // 5%
  const registrationFee = marketValuation2026 * 0.01; // 1%
  const cessSurcharge = stampDuty * 0.12; // 12% of stamp duty
  const totalGovernmentTax = stampDuty + registrationFee + cessSurcharge;

  // ROI Calculations
  const baseCAGR = 0.142; // 14.2%
  const projectedFutureVal = (capitalINR * Math.pow(1 + baseCAGR, investmentYears));
  const netProfit = projectedFutureVal - capitalINR;

  const handleInspect = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
  };

  const dossierText = `🏛️ KWIN CITY LAND FEASIBILITY & COMPENSATORY DOSSIER
==================================================
📍 Survey Number: ${surveyNo} (${village})
📐 Land Extent: ${acreage} Acres
🏛️ Target Masterplan Zone: ${selectedZone}
📜 KIADB Acquisition Status: ${currentVillage.kiadbStatus}

💰 FINANCIAL & STAMP DUTY BREAKDOWN:
- Govt Guidance Value: ₹${guidanceTotal.toFixed(2)} Lakhs (₹${currentVillage.guidanceVal} Lakhs/Acre)
- Estimated KIADB Compensation Payout: ₹${kiadbCompensationTotal.toFixed(2)} Lakhs
- 2026 Market Valuation Benchmark: ₹${marketValuation2026.toFixed(2)} Lakhs (₹3.95 Cr/Acre)
- Estimated Karnataka Govt Stamp Duty & Tax: ₹${totalGovernmentTax.toFixed(2)} Lakhs

🔬 Research Authors: Aarti S Ravikumar & Baja Associates
🌐 Verified Portal: https://kwin-city.com/`;

  const copyDossier = () => {
    navigator.clipboard.writeText(dossierText);
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2500);
  };

  const benchmarkCities = [
    { name: 'KWIN City (North Bengaluru)', airport: '38 km (~45 mins)', landCost: '₹3.95 Cr / Acre', sla: '45 Days Guaranteed', anchor: 'IISc, MedCity & Global AI Hub', cagr: '14.2% YoY', highlight: true },
    { name: 'GIFT City (Gujarat)', airport: '18 km (~25 mins)', landCost: '₹6.20 Cr / Acre', sla: '60 Days', anchor: 'NSE-IX & Offshore Banking', cagr: '11.8% YoY', highlight: false },
    { name: 'Dholera SIR (Gujarat)', airport: '110 km (~120 mins)', landCost: '₹1.85 Cr / Acre', sla: '90 Days', anchor: 'Semiconductor Fab & Solar Park', cagr: '9.4% YoY', highlight: false },
    { name: 'HYD Pharma City (Telangana)', airport: '45 km (~50 mins)', landCost: '₹3.10 Cr / Acre', sla: '60 Days', anchor: 'Bulk Drug Manufacturing', cagr: '10.5% YoY', highlight: false }
  ];

  return (
    <section className="py-12 bg-slate-950 text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
            <Calculator className="h-4 w-4 text-emerald-400" />
            <span>Interactive Feasibility & ROI Engine</span>
          </div>
          <h2 className="font-['Cinzel',serif] text-2xl sm:text-4xl font-bold text-white tracking-wide">
            Survey Land Feasibility & Investment Calculator
          </h2>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            Instantly evaluate Doddaballapur land survey numbers, KIADB compensation rates, Karnataka stamp duties, and investment ROI projections for KWIN City.
          </p>
        </div>

        {/* Section 1: Survey Number Inspector Form & Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 5 Cols: Input Form */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Search className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Inspect Survey Land Parcel</h3>
            </div>

            <form onSubmit={handleInspect} className="space-y-4 text-xs">
              
              {/* Village Selection */}
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Select Village / Hobli Area
                </label>
                <select
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Tubagere Hobli">Tubagere Hobli (Knowledge District Core)</option>
                  <option value="Kasaba Hobli (Doddaballapur)">Kasaba Hobli (MedCity Core)</option>
                  <option value="Hosahalli Corridor">Hosahalli Corridor (AI Tech Zone)</option>
                  <option value="Dabaspet Industrial Node">Dabaspet Industrial Node (Logistics)</option>
                </select>
              </div>

              {/* Survey Number Input */}
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Survey Number / Hissa No.
                </label>
                <input
                  type="text"
                  required
                  value={surveyNo}
                  onChange={(e) => setSurveyNo(e.target.value)}
                  placeholder="e.g. Sy. 142/2A, Sy. 88"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>

              {/* Acreage Input */}
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Land Area (in Acres)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="100"
                  required
                  value={acreage}
                  onChange={(e) => setAcreage(parseFloat(e.target.value) || 0.1)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>

              {/* Target Masterplan Zone */}
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Proposed Masterplan Allocation
                </label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Knowledge & Higher Education District">Knowledge & Higher Education District</option>
                  <option value="Health & Life Sciences MedCity">Health & Life Sciences MedCity</option>
                  <option value="Innovation & Smart Tech Zone">Innovation & Smart Tech Zone</option>
                  <option value="Green Housing & Residential Hub">Green Housing & Residential Hub</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 text-xs font-bold text-slate-950 hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
              >
                <Sparkles className="h-4 w-4 text-slate-950" />
                <span>Calculate Land Feasibility Dossier</span>
              </button>

            </form>
          </div>

          {/* Right 7 Cols: Calculations Output & Dossier */}
          <div className="lg:col-span-7 space-y-6">
            
            {hasCalculated ? (
              <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/95 p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in duration-300">
                
                {/* Dossier Header */}
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Verified Survey Analysis Report
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-white font-['Cinzel',serif]">
                      Sy. No. {surveyNo} — {village}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setIsPDFModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md shadow-emerald-900/40 transition-all"
                      title="Download Official Audit PDF"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export Audit PDF</span>
                    </button>

                    <button
                      onClick={() => {
                        addToWatchlist({
                          surveyNo,
                          village,
                          hobli: village.split(' ')[0],
                          taluk: 'Doddaballapur',
                          acreage,
                          zone: selectedZone,
                          guidanceRatePerAcreLakhs: currentVillage.guidanceVal,
                          marketRatePerAcreLakhs: 395,
                          kiadbStatus: currentVillage.kiadbStatus,
                          riskRating: 'Low',
                          alerts: {
                            gazetteNotification: true,
                            guidanceRevision: true,
                            reraFilings: false,
                          },
                          notes: `Zone: ${selectedZone}. Evaluated on ${new Date().toLocaleDateString('en-IN')}`,
                        });
                        setWatchlistSuccess(true);
                        setTimeout(() => setWatchlistSuccess(false), 2000);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-500/40 bg-indigo-500/10 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all"
                    >
                      {isParcelInWatchlist(surveyNo, village) || watchlistSuccess ? (
                        <>
                          <BookmarkCheck className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Tracked in Watchlist</span>
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="h-3.5 w-3.5 text-indigo-400" />
                          <span>Track Parcel</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={copyDossier}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-all"
                    >
                      {copiedDossier ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* KIADB Status Box */}
                <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-1">
                  <div className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" />
                    <span>KIADB Acquisition Clearance Status</span>
                  </div>
                  <div className="text-sm font-semibold text-white pt-1">
                    {currentVillage.kiadbStatus}
                  </div>
                </div>

                {/* Grid Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                    <div className="text-[11px] text-slate-400 uppercase font-medium">Govt Guidance Value</div>
                    <div className="text-xl font-bold text-amber-300 font-mono">
                      ₹{guidanceTotal.toFixed(2)} Lakhs
                    </div>
                    <div className="text-[10px] text-slate-500">₹{currentVillage.guidanceVal} Lakhs / Acre</div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                    <div className="text-[11px] text-slate-400 uppercase font-medium">Est. KIADB Compensation</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono">
                      ₹{kiadbCompensationTotal.toFixed(2)} Lakhs
                    </div>
                    <div className="text-[10px] text-emerald-400/80">3x – 4x Guidance Award Multiplier</div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                    <div className="text-[11px] text-slate-400 uppercase font-medium">2026 Market Valuation</div>
                    <div className="text-xl font-bold text-teal-300 font-mono">
                      ₹{marketValuation2026.toFixed(2)} Lakhs
                    </div>
                    <div className="text-[10px] text-slate-500">Based on ₹3.95 Cr / Acre Benchmark</div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                    <div className="text-[11px] text-slate-400 uppercase font-medium">Govt Stamp Duty & Taxes</div>
                    <div className="text-xl font-bold text-purple-300 font-mono">
                      ₹{totalGovernmentTax.toFixed(2)} Lakhs
                    </div>
                    <div className="text-[10px] text-slate-500">5% Stamp + 1% Reg + 12% Surcharge</div>
                  </div>
                </div>

                {/* Institutional Audit & Bhoomi Integration Upsell */}
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/40">
                      <Crown className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Need Bhoomi Karnataka Title EC & Mutation Audit?</span>
                        {tier !== 'free' && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {tier.toUpperCase()} UNLOCKED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Access 30-year mutation history, Section 28 gazette dispatch logs, and unwatermarked vector PDF dossiers.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPricingModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold whitespace-nowrap transition shadow-xs"
                  >
                    {tier === 'free' ? 'Upgrade Plan' : 'Manage Subscription'}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-800">
                  *Note: Feasibility ratings generated from spatial models authored by Aarti S Ravikumar and Baja Associates. Final awards subject to official KIADB Gazette verification.
                </p>

              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 text-center space-y-3">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-emerald-400">
                  <Calculator className="h-8 w-8" />
                </div>
                <h4 className="text-base font-bold text-white">Enter Survey Details to Inspect</h4>
                <p className="text-xs text-slate-400 max-w-md">
                  Select a village hobli, enter your survey number, and click 'Calculate' to generate an instant KIADB compensation and stamp duty dossier.
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Section 2: ROI Investment Simulator */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white font-['Cinzel',serif]">
                  Land Capital Appreciation & ROI Simulator
                </h3>
              </div>
              <p className="text-xs text-slate-400 pt-0.5">
                Simulate capital growth based on KWIN City's historical 14.2% land CAGR benchmark.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-emerald-300">
              Benchmark CAGR: +14.2% YoY
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Sliders */}
            <div className="space-y-6">
              
              {/* Capital Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Initial Capital Investment:</span>
                  <span className="font-mono font-bold text-emerald-400">₹{capitalINR} Lakhs (₹{(capitalINR / 100).toFixed(2)} Cr)</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={capitalINR}
                  onChange={(e) => setCapitalINR(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>₹10 Lakhs</span>
                  <span>₹500 Lakhs</span>
                  <span>₹1,000 Lakhs (₹10 Cr)</span>
                </div>
              </div>

              {/* Years Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Holding Horizon:</span>
                  <span className="font-mono font-bold text-cyan-400">{investmentYears} Years (Exit in {2026 + investmentYears})</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={investmentYears}
                  onChange={(e) => setInvestmentYears(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 Year</span>
                  <span>5 Years</span>
                  <span>10 Years (2036)</span>
                </div>
              </div>

            </div>

            {/* Simulated ROI Results Card */}
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-slate-950 space-y-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Simulated Exit Valuation ({2026 + investmentYears})
              </div>

              <div className="space-y-1">
                <div className="text-3xl font-bold text-white font-mono">
                  ₹{projectedFutureVal.toFixed(2)} Lakhs
                </div>
                <div className="text-xs text-emerald-400 font-semibold font-mono">
                  +₹{netProfit.toFixed(2)} Lakhs Net Return ({((netProfit / capitalINR) * 100).toFixed(1)}% total gain)
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500">Initial Capital</div>
                  <div className="font-mono font-bold text-slate-300">₹{capitalINR} Lakhs</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Compounded Rate</div>
                  <div className="font-mono font-bold text-emerald-400">14.2% p.a.</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Smart City Benchmarking Matrix */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white font-['Cinzel',serif]">
                Greenfield Smart City Benchmarking Matrix
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Comparative analysis evaluating KWIN City against India's primary mega-industrial corridors.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="py-3 px-4">Smart City Hub</th>
                  <th className="py-3 px-4">Airport Distance</th>
                  <th className="py-3 px-4">Land Cost Benchmark</th>
                  <th className="py-3 px-4">Statutory SLA</th>
                  <th className="py-3 px-4">Land CAGR</th>
                  <th className="py-3 px-4">Anchor Ecosystem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-light">
                {benchmarkCities.map((c, i) => (
                  <tr
                    key={i}
                    className={`transition-colors ${
                      c.highlight
                        ? 'bg-emerald-500/10 border-l-2 border-emerald-400 text-white font-medium'
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                      {c.highlight && <Sparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                      <span>{c.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">{c.airport}</td>
                    <td className="py-3.5 px-4 font-mono">{c.landCost}</td>
                    <td className="py-3.5 px-4 font-mono text-cyan-300">{c.sla}</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">{c.cagr}</td>
                    <td className="py-3.5 px-4">{c.anchor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Due Diligence PDF Generation Modal */}
      <DueDiligencePDFModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        initialData={{
          village,
          surveyNo,
          hobli: village.split(' ')[0],
          taluk: 'Doddaballapur',
          acreage,
          guidanceRatePerAcreLakhs: currentVillage.guidanceVal,
          marketRatePerAcreLakhs: 395,
          kiadbStatus: currentVillage.kiadbStatus,
          selectedZone,
        }}
        onOpenPricing={() => setIsPricingModalOpen(true)}
      />

      {/* Pricing & Checkout Modal */}
      <PricingAndCheckoutModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </section>
  );
};
