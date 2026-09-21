import React from 'react';
import { 
  TrendingUp, 
  Layers, 
  Activity, 
  ShieldAlert, 
  Briefcase, 
  Radio, 
  Satellite, 
  FileCheck2, 
  ArrowRight, 
  CheckCircle2, 
  Share2, 
  MapPin, 
  Compass, 
  ShieldCheck, 
  Search, 
  Download, 
  Scale, 
  Building2, 
  HelpCircle,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { DISTRICTS } from '../data/kwin-data';
import { InteractiveSpatialMapPreview } from './InteractiveSpatialMapPreview';
import { MilestoneSignalTracker } from './MilestoneSignalTracker';

interface OverviewDashboardProps {
  onNavigateToTool: (toolId: string) => void;
  onOpenDueDiligencePDF?: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ 
  onNavigateToTool,
  onOpenDueDiligencePDF 
}) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      {/* ============================================================ */}
      {/* CORE VALUE PROPOSITION: ZERO BROKER JARGON                    */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/80 p-6 sm:p-8 shadow-sm">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                Un-Brokered Independent Research
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Official Karnataka Gazettes & Ground Data
              </span>
            </div>
            <h2 className="mt-2 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              What This Platform Delivers (Zero Broker Hype)
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Real estate in North Bengaluru is plagued by speculative broker claims and unverified promises. This portal provides transparent, mathematical, and statutory clarity on the 5,800-acre KWIN City corridor so you can make informed land decisions.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateToTool('feasibility')}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Verify Survey Number</span>
            </button>
          </div>
        </div>

        {/* 4 Concrete Practical Value Pillars */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Pillar 1: Cadastral Title & Acquisition Audit */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  <Compass className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  Title & Buffer Audit
                </span>
              </div>
              <h3 className="mt-3 font-['Cinzel',serif] text-base font-bold text-slate-900 dark:text-white">
                Survey Number Clearance
              </h3>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
                <p>
                  <strong className="text-slate-900 dark:text-white">The Problem:</strong> Brokers sell parcels without disclosing pending KIADB acquisition notices or lake/forest buffers.
                </p>
                <p>
                  <strong className="text-emerald-800 dark:text-emerald-400 font-bold">What you get:</strong> Search any survey number across Doddaballapur & Nelamangala to check Section 28(1) / 28(4) notification status and green-belt restrictions.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigateToTool('feasibility')}
              className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center justify-between group cursor-pointer"
            >
              <span>Audit Survey Number</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Pillar 2: Land Valuation & Compensation Math */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-5 flex flex-col justify-between hover:border-teal-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300">
                  <Scale className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase text-teal-800 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                  Valuation Math
                </span>
              </div>
              <h3 className="mt-3 font-['Cinzel',serif] text-base font-bold text-slate-900 dark:text-white">
                Fair Valuation vs. Payout
              </h3>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
                <p>
                  <strong className="text-slate-900 dark:text-white">The Problem:</strong> Asking prices are inflated by 200%, while statutory compensation formulas are hidden from landowners.
                </p>
                <p>
                  <strong className="text-teal-800 dark:text-teal-400 font-bold">What you get:</strong> Compare official Sub-Registrar Guidance Values, statutory KIADB acquisition awards (2x-4x Solatium), and verified market transactions.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigateToTool('valuation')}
              className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 flex items-center justify-between group cursor-pointer"
            >
              <span>Calculate Valuation & Payout</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Pillar 3: Ground Reality Progress Radar */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-800 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800">
                  Ground Execution
                </span>
              </div>
              <h3 className="mt-3 font-['Cinzel',serif] text-base font-bold text-slate-900 dark:text-white">
                Actual Physical Milestones
              </h3>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
                <p>
                  <strong className="text-slate-900 dark:text-white">The Problem:</strong> Marketing materials promise unrealistic timelines with zero physical evidence.
                </p>
                <p>
                  <strong className="text-cyan-800 dark:text-cyan-400 font-bold">What you get:</strong> Empirical tracking of STRR Package 3 bypasses, 465-acre solar PV grid connections, and university land handovers with civil contractor citations.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigateToTool('spatial')}
              className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 flex items-center justify-between group cursor-pointer"
            >
              <span>Track Construction Milestones</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Pillar 4: Due Diligence Dossiers */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-5 flex flex-col justify-between hover:border-indigo-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-800 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                  Audit-Grade Export
                </span>
              </div>
              <h3 className="mt-3 font-['Cinzel',serif] text-base font-bold text-slate-900 dark:text-white">
                Bank-Ready PDF Dossiers
              </h3>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
                <p>
                  <strong className="text-slate-900 dark:text-white">The Problem:</strong> Banks, lawyers, and investment committees require cited, structured documentation before releasing capital.
                </p>
                <p>
                  <strong className="text-indigo-800 dark:text-indigo-400 font-bold">What you get:</strong> Generate complete PDF dossiers containing GPS boundary coordinates, title clearances, environmental zoning, and valuation comps.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                if (onOpenDueDiligencePDF) {
                  onOpenDueDiligencePDF();
                } else {
                  onNavigateToTool('feasibility');
                }
              }}
              className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-indigo-700 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center justify-between group cursor-pointer"
            >
              <span>Download Due Diligence PDF</span>
              <Download className="h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Who Uses This Platform (Practical Roles) */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">For Landowners & Farmers</span>
              <span className="text-slate-600 dark:text-slate-400 mt-0.5 block">
                Find out if your ancestral land is notified for KIADB acquisition and calculate the exact statutory compensation you are legally entitled to receive.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-md bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-400 shrink-0 mt-0.5">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">For Investors & Buyers</span>
              <span className="text-slate-600 dark:text-slate-400 mt-0.5 block">
                Verify clear title and check buffer zone restrictions before putting down non-refundable token advances on North Bengaluru land parcels.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-400 shrink-0 mt-0.5">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">For Enterprises & Planners</span>
              <span className="text-slate-600 dark:text-slate-400 mt-0.5 block">
                Inspect 4-district masterplan zoning, STRR highway connectivity, power/water infrastructure, and Karnataka 45-day single-window approvals.
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Polish Feature 1: Embedded Interactive Spatial Map Canvas */}
      <InteractiveSpatialMapPreview 
        onNavigateToFullGIS={() => onNavigateToTool('spatial')} 
      />

      {/* Real-Time Signal Feeds Feature 2: Dynamic Infrastructure Milestone Tracker */}
      <MilestoneSignalTracker 
        onNavigateToTool={onNavigateToTool} 
      />

      {/* Section: The 4 Core Districts Showcase */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Masterplan Zones
            </span>
            <h2 className="mt-1 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              The Four Metropolitan Districts
            </h2>
          </div>
          <button
            onClick={() => onNavigateToTool('spatial')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Launch Spatial GIS Engine</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DISTRICTS.map((dist) => {
            return (
              <div
                key={dist.id}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 p-5 shadow-xs hover:shadow-md hover:border-emerald-500/50 hover:bg-slate-50/90 dark:hover:bg-slate-900 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {dist.acreage} Acres
                    </span>
                    <span className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-[10px] font-mono text-slate-700 dark:text-slate-300">
                      {dist.expectedInvestment}
                    </span>
                  </div>

                  <h3 className="mt-3 font-['Cinzel',serif] text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    {dist.name}
                  </h3>
                  <div className="text-xs text-cyan-800 dark:text-cyan-400 font-semibold">
                    {dist.tagline}
                  </div>

                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {dist.description}
                  </p>

                  <div className="mt-4 space-y-1">
                    <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Key Anchor Components:
                    </div>
                    {dist.keyAnchors.slice(0, 2).map((anchor, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">{anchor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Target Jobs: <strong className="text-slate-900 dark:text-slate-200">{dist.projectedJobs}</strong></span>
                  <button
                    onClick={() => onNavigateToTool('spatial')}
                    className="text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 font-bold cursor-pointer"
                  >
                    View Zone →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Direct Research & Verification Tools */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              Analysis & Verification Tools
            </span>
            <h2 className="mt-1 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Specialized Research & Due Diligence Tools
            </h2>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            8 Independent Verification Tools
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Valuation Simulator */}
          <div 
            onClick={() => onNavigateToTool('valuation')}
            className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 p-6 shadow-xs hover:shadow-md hover:border-teal-500/50 hover:bg-slate-50/90 dark:hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-teal-100 dark:bg-teal-500/10 p-2.5 text-teal-700 dark:text-teal-400 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-800 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-500/20 font-bold">
                  Valuation
                </span>
              </div>
              <h3 className="mt-4 font-['Cinzel',serif] text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                Land Valuation & Return Simulator
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Model parcel land appreciation from ₹1,400/sq.ft to ₹3,800/sq.ft. Interactive ROI estimator across STRR and NH-44 corridors.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-teal-700 dark:text-teal-400 font-bold pt-3 border-t border-slate-200 dark:border-slate-800">
              <span>Launch Valuation Simulator</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Regulatory Clearances */}
          <div 
            onClick={() => onNavigateToTool('regulatory')}
            className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 p-6 shadow-xs hover:shadow-md hover:border-cyan-500/50 hover:bg-slate-50/90 dark:hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-cyan-100 dark:bg-cyan-500/10 p-2.5 text-cyan-700 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                  <Layers className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-800 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-500/20 font-bold">
                  Statutory Law
                </span>
              </div>
              <h3 className="mt-4 font-['Cinzel',serif] text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                Government Approvals & Clearances
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Karnataka single-window clearances, KUM timelines, KIADB lease-cum-sale workflows, and 100% stamp duty exemption rules.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-cyan-700 dark:text-cyan-400 font-bold pt-3 border-t border-slate-200 dark:border-slate-800">
              <span>View Clearance Steps</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Data Insights */}
          <div 
            onClick={() => onNavigateToTool('insights')}
            className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 p-6 shadow-xs hover:shadow-md hover:border-blue-500/50 hover:bg-slate-50/90 dark:hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-blue-100 dark:bg-blue-500/10 p-2.5 text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-800 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/20 font-bold">
                  Civic Data
                </span>
              </div>
              <h3 className="mt-4 font-['Cinzel',serif] text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                Public Infrastructure Datasets
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Official statistics on airport passenger traffic, taluk groundwater table depths, and technical workforce distribution.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-blue-700 dark:text-blue-400 font-bold pt-3 border-t border-slate-200 dark:border-slate-800">
              <span>Examine Data Charts</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Risk Check Engine */}
          <div 
            onClick={() => onNavigateToTool('risks')}
            className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 p-6 shadow-xs hover:shadow-md hover:border-amber-500/50 hover:bg-slate-50/90 dark:hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-amber-100 dark:bg-amber-500/10 p-2.5 text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-500/20 font-bold">
                  Risk Scanner
                </span>
              </div>
              <h3 className="mt-4 font-['Cinzel',serif] text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                Title, Flood & Legal Risk Scanner
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Search survey boundaries against Section 28(4) acquisition limits, lake catchment buffers, and rainwater recharge zones.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-bold pt-3 border-t border-slate-200 dark:border-slate-800">
              <span>Scan Risk Vectors</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Public Tenders & Allotments */}
          <div 
            onClick={() => onNavigateToTool('opportunities')}
            className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 p-6 shadow-xs hover:shadow-md hover:border-purple-500/50 hover:bg-slate-50/90 dark:hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-purple-100 dark:bg-purple-500/10 p-2.5 text-purple-700 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-800 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-500/20 font-bold">
                  Tenders & PPP
                </span>
              </div>
              <h3 className="mt-4 font-['Cinzel',serif] text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                Public Tenders & Commercial Allotments
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Official KIADB expression of interest (EoI) announcements, institutional land parcels, and public-private concession tenders.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-purple-700 dark:text-purple-400 font-bold pt-3 border-t border-slate-200 dark:border-slate-800">
              <span>Browse Active Tenders</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Evidence & Gazette Archive */}
          <div 
            onClick={() => onNavigateToTool('evidence')}
            className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 p-6 shadow-xs hover:shadow-md hover:border-indigo-500/50 hover:bg-slate-50/90 dark:hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-indigo-100 dark:bg-indigo-500/10 p-2.5 text-indigo-700 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-800 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/20 font-bold">
                  Gazette Archive
                </span>
              </div>
              <h3 className="mt-4 font-['Cinzel',serif] text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                Official Gazette & Evidence Archive
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Original Karnataka Government Gazette notifications, KIADB executive orders, and verified cabinet approvals.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-indigo-700 dark:text-indigo-400 font-bold pt-3 border-t border-slate-200 dark:border-slate-800">
              <span>Inspect Gazette Records</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
