import React, { useState } from 'react';
import { 
  Calculator, 
  Building2, 
  Coins, 
  Users, 
  Zap, 
  Plane, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface InvestmentCalculatorProps {
  language: Language;
}

type ProjectType = 'gcc' | 'university' | 'hospital' | 'semiconductor' | 'robotics';

export const InvestmentCalculator: React.FC<InvestmentCalculatorProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [projectType, setProjectType] = useState<ProjectType>('gcc');
  const [landAcres, setLandAcres] = useState<number>(30);
  const [jobsCount, setJobsCount] = useState<number>(1500);

  // Model calculations based on Karnataka Industrial Policy 2025-2030 & KWIN Special Incentives
  const getCalculations = () => {
    let baseInvestmentCr = 0;
    let subsidyCapCr = 0;
    let powerConcessionLakhs = 0;

    switch (projectType) {
      case 'gcc':
        baseInvestmentCr = landAcres * 8.5 + (jobsCount * 0.08);
        subsidyCapCr = Math.min(baseInvestmentCr * 0.20, 45); // Max 45 Cr subsidy
        powerConcessionLakhs = jobsCount * 0.45;
        break;
      case 'university':
        baseInvestmentCr = landAcres * 6.0 + (jobsCount * 0.05);
        subsidyCapCr = Math.min(baseInvestmentCr * 0.25, 50); // Max 50 Cr subsidy
        powerConcessionLakhs = landAcres * 4.0;
        break;
      case 'hospital':
        baseInvestmentCr = landAcres * 12.0 + (jobsCount * 0.12);
        subsidyCapCr = Math.min(baseInvestmentCr * 0.22, 60);
        powerConcessionLakhs = landAcres * 6.5;
        break;
      case 'semiconductor':
        baseInvestmentCr = landAcres * 20.0 + (jobsCount * 0.15);
        subsidyCapCr = Math.min(baseInvestmentCr * 0.30, 100);
        powerConcessionLakhs = landAcres * 12.0;
        break;
      case 'robotics':
        baseInvestmentCr = landAcres * 10.0 + (jobsCount * 0.10);
        subsidyCapCr = Math.min(baseInvestmentCr * 0.22, 50);
        powerConcessionLakhs = jobsCount * 0.55;
        break;
    }

    const stampDutyExemptionCr = (landAcres * 1.5 * 0.06); // 100% stamp duty waiver
    const clearanceCommittee = baseInvestmentCr > 100 ? 'State High-Level Clearance Committee (SHLCC)' : 'State Level Single Window (SLSWCC)';

    return {
      baseInvestmentCr: Math.round(baseInvestmentCr),
      subsidyCapCr: Math.round(subsidyCapCr * 10) / 10,
      stampDutyExemptionCr: Math.round(stampDutyExemptionCr * 10) / 10,
      powerConcessionLakhs: Math.round(powerConcessionLakhs),
      clearanceCommittee,
      airportTransitMinutes: 45,
    };
  };

  const calc = getCalculations();

  return (
    <div id="incentive-calculator" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Calculator className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {t.calcTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.calcSubtitle}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono">
          Karnataka Policy 2025-2030 Rules
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Project Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t.calcSelectType}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'gcc', label: 'Global Capability Center (GCC)' },
                { id: 'university', label: 'Global University' },
                { id: 'hospital', label: 'Quaternary Hospital' },
                { id: 'semiconductor', label: 'Semiconductor / OSAT' },
                { id: 'robotics', label: 'AI & Robotics R&D' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setProjectType(item.id as ProjectType)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                    projectType === item.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Land Acres Slider */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                {t.calcLandAcres}
              </span>
              <span className="font-mono font-bold text-indigo-700 text-sm">{landAcres} Acres</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={landAcres}
              onChange={(e) => setLandAcres(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>5 Acres</span>
              <span>100 Acres</span>
              <span>200 Acres</span>
            </div>
          </div>

          {/* Jobs Count Slider */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                {t.calcJobsCount}
              </span>
              <span className="font-mono font-bold text-indigo-700 text-sm">{jobsCount.toLocaleString()} Jobs</span>
            </div>
            <input
              type="range"
              min="200"
              max="10000"
              step="200"
              value={jobsCount}
              onChange={(e) => setJobsCount(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>200 Jobs</span>
              <span>5,000 Jobs</span>
              <span>10,000 Jobs</span>
            </div>
          </div>

        </div>

        {/* Right Computed Incentives Summary Card */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider block">
                Official Subsidy Estimates
              </span>
              <h4 className="text-base font-bold text-white">
                Project Capital Outlay: ~₹{calc.baseInvestmentCr} Cr
              </h4>
            </div>
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Coins className="w-5 h-5" />
            </span>
          </div>

          {/* Key Metric Rows */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
              <span className="text-[10px] text-slate-400 block font-semibold">State Capital Subsidy</span>
              <span className="text-lg font-bold font-mono text-emerald-400">₹{calc.subsidyCapCr} Cr</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Asset subsidy under KIP-2025</span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
              <span className="text-[10px] text-slate-400 block font-semibold">100% Stamp Duty Waiver</span>
              <span className="text-lg font-bold font-mono text-emerald-400">₹{calc.stampDutyExemptionCr} Cr</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Waived at land conveyance</span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
              <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> Power Tariff Rebate
              </span>
              <span className="text-lg font-bold font-mono text-amber-400">₹{calc.powerConcessionLakhs} L/yr</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">₹1.50/unit rebate for 5 yrs</span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
              <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                <Plane className="w-3 h-3 text-sky-400" /> Airport Commute
              </span>
              <span className="text-lg font-bold font-mono text-sky-400">45 Minutes</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">via STRR NH-648 to BLR</span>
            </div>
          </div>

          {/* Statutory Approval Pathway */}
          <div className="p-3 rounded-xl bg-indigo-900/40 border border-indigo-700/50 flex items-start gap-2.5 text-xs text-indigo-200">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold">Statutory Approval Pathway:</strong>
              Classified for fast-track clearance via <span className="text-amber-300 font-mono">{calc.clearanceCommittee}</span> with unified 30-day deemed approval.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
