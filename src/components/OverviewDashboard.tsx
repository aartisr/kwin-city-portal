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
  Award, 
  ArrowRight, 
  CheckCircle2,
  Share2
} from 'lucide-react';
import { DISTRICTS } from '../data/kwin-data';
import { SectionHeader, Card, Badge, Button } from './ui';

interface OverviewDashboardProps {
  onNavigateToTool: (toolId: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ onNavigateToTool }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      {/* Section 1: The 4 Core Districts Showcase */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Masterplan Anchors
            </span>
            <h2 className="mt-1 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white">
              The Four Metropolitan Districts
            </h2>
          </div>
          <button
            onClick={() => onNavigateToTool('spatial')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors self-start sm:self-auto"
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
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-slate-900 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {dist.acreage} Acres
                    </span>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                      {dist.expectedInvestment}
                    </span>
                  </div>

                  <h3 className="mt-3 font-['Cinzel',serif] text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {dist.name}
                  </h3>
                  <div className="text-xs text-cyan-400 font-medium">
                    {dist.tagline}
                  </div>

                  <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {dist.description}
                  </p>

                  <div className="mt-4 space-y-1">
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Anchor Components:
                    </div>
                    {dist.keyAnchors.slice(0, 2).map((anchor, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{anchor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Target Jobs: <strong className="text-slate-200">{dist.projectedJobs}</strong></span>
                  <button
                    onClick={() => onNavigateToTool('spatial')}
                    className="text-emerald-400 hover:text-emerald-300 font-medium"
                  >
                    View Zone →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Value-Add Tool Suites Grid */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-400">
              Cognitive Clearinghouse
            </span>
            <h2 className="mt-1 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white">
              Institutional Intelligence Modules
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            9 High-Performance Micro-Engines
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Valuation Index */}
          <div 
            onClick={() => onNavigateToTool('valuation')}
            className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-teal-500/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-teal-500/10 p-2.5 text-teal-400 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/20">
                  Tool #2
                </span>
              </div>
              <h3 className="mt-4 font-['Cinzel',serif] text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                Econometric Valuation Index
              </h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed font-light">
                Model parcel land appreciation from ₹1,400/sq.ft to ₹3,800/sq.ft. Interactive ROI estimator across STRR and NH-44 corridors.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-teal-400 font-semibold pt-3 border-t border-slate-800">
              <span>Launch Simulator</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Regulatory Navigator */}
          <div 
            onClick={() => onNavigateToTool('regulatory')}
            className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-cyan-500/10 p-2.5 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Layers className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                  Tool #3
                </span>
              </div>
              <h3 className="mt-4 font-['Cinzel',serif] text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                Statutory Regulatory Navigator
              </h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed font-light">
                Karnataka single-window clearances, KUM timelines, KIADB lease-cum-sale workflows, and 100% stamp duty exemption guides.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-cyan-400 font-semibold pt-3 border-t border-slate-800">
              <span>Explore Approvals</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: OpenCity Data Insights */}
          <div 
            onClick={() => onNavigateToTool('insights')}
            className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-blue-500/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400 group-hover:scale-110 transition-transform">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/20">
                  Tool #4
                </span>
              </div>
              <h3 className="mt-4 font-['Cinzel',serif] text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                OpenCity Data Insights Hub
              </h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed font-light">
                Public datasets on 42M+ airport passenger movements, taluk groundwater table depth, and knowledge job distribution.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-blue-400 font-semibold pt-3 border-t border-slate-800">
              <span>View Data Charts</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Risk Check Engine */}
          <div 
            onClick={() => onNavigateToTool('risks')}
            className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-amber-500/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/20">
                  Tool #5
                </span>
              </div>
              <h3 className="mt-4 font-['Cinzel',serif] text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                Risk & Governance Scanner
              </h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed font-light">
                Title search, environmental buffers, rainwater quota compliance, and Section 28(4) statutory acquisition boundaries.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-amber-400 font-semibold pt-3 border-t border-slate-800">
              <span>Scan Risk Vectors</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Opportunity Exchange */}
          <div 
            onClick={() => onNavigateToTool('opportunities')}
            className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-purple-500/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-400 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20">
                  Tool #6
                </span>
              </div>
              <h3 className="mt-4 font-['Cinzel',serif] text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                PPP & Opportunity Exchange
              </h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed font-light">
                Public-private concessions, university satellite campuses, healthcare hubs, and Expression of Interest (EoI) submissions.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-purple-400 font-semibold pt-3 border-t border-slate-800">
              <span>Browse Tenders</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Evidence & Fact Vault */}
          <div 
            onClick={() => onNavigateToTool('evidence')}
            className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-indigo-500/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-400 group-hover:scale-110 transition-transform">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">
                  Tool #9
                </span>
              </div>
              <h3 className="mt-4 font-['Cinzel',serif] text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                Cryptographic Evidence Vault
              </h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed font-light">
                Zero-noise fact check repository cross-referencing public project claims with primary gazettes and SHA-256 signatures.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-indigo-400 font-semibold pt-3 border-t border-slate-800">
              <span>Audit Claims</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 7: Social Media Pulse & Studio */}
          <div 
            onClick={() => onNavigateToTool('social')}
            className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-pink-500/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-pink-500/10 p-2.5 text-pink-400 group-hover:scale-110 transition-transform">
                  <Share2 className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded border border-pink-500/20">
                  Tool #11
                </span>
              </div>
              <h3 className="mt-4 font-['Cinzel',serif] text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                Social Media Studio & Trends
              </h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed font-light">
                Official Instagram, Facebook, LinkedIn & X channels with AI trend radar and 1-click post generator.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-pink-400 font-semibold pt-3 border-t border-slate-800">
              <span>Open Social Studio</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Section 3: Strategic Callout for 2026 Evaluation Whitepaper */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>World-Class Architectural Evaluation</span>
            </span>
          </div>
          <h3 className="mt-2 font-['Cinzel',serif] text-xl sm:text-2xl font-bold text-white">
            Full Technical & UX Audit of kwin-city.com
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Detailed evaluation covering sub-16ms latency design, cognitive clearinghouse data architectures, 
            WCAG 2.1 AA accessibility, and empirical land truth benchmarking.
          </p>
        </div>
        <button
          onClick={() => onNavigateToTool('evaluation')}
          className="rounded-xl border border-amber-500/40 bg-amber-500/20 px-5 py-3 text-xs font-bold text-amber-200 hover:bg-amber-500/30 transition-all flex items-center gap-2 shrink-0 shadow-lg"
        >
          <span>Read Comprehensive Evaluation</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
};
