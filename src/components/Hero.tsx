import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Layers, 
  TrendingUp, 
  Compass, 
  Sparkles, 
  FileCheck2,
  Cpu,
  GraduationCap,
  Activity
} from 'lucide-react';
import { KWIN_META } from '../data/kwin-data';
import { Badge, Button } from './ui';

interface HeroProps {
  onNavigateToTool: (toolId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToTool }) => {
  return (
    <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 py-12 lg:py-16">
      
      {/* Background Subtle Tech Grid Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07] pointer-events-none" />
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="emerald" pulse size="md">
            Independent Research & Spatial Analytics Portal
          </Badge>

          <Badge variant="cyan" size="md">
            Covering Govt of Karnataka Approved KWIN City Masterplan
          </Badge>

          <Badge variant="slate" icon={ShieldCheck} size="md">
            Evidence-First Intelligence Architecture
          </Badge>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="mt-6 max-w-4xl">
          <h1 className="font-['Cinzel',serif] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            KWIN CITY <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">RESEARCH PORTAL</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            An independent research, spatial analytics, and empirical intelligence portal tracking South Asia’s premier 5,800-acre Knowledge, Wellbeing, and Innovation metropolis in North Bengaluru. Providing open-access spatial masterplans, econometric valuation indices, statutory regulatory workflows, and ground data.
          </p>
        </div>

        {/* Core Statistical Pillars Grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="text-xs font-medium text-slate-400">Total Scale</div>
            <div className="mt-1 font-['Cinzel',serif] text-2xl font-bold text-emerald-400">
              {KWIN_META.totalAcreage.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400">Acres (4 Districts)</div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="text-xs font-medium text-slate-400">Target Outlay</div>
            <div className="mt-1 font-['Cinzel',serif] text-2xl font-bold text-teal-300">
              {KWIN_META.projectedInvestmentINR}
            </div>
            <div className="text-[11px] text-slate-400">{KWIN_META.projectedInvestmentUSD} Est.</div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="text-xs font-medium text-slate-400">Knowledge Jobs</div>
            <div className="mt-1 font-['Cinzel',serif] text-2xl font-bold text-cyan-300">
              100,000
            </div>
            <div className="text-[11px] text-slate-400">Projected High-Tech</div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="text-xs font-medium text-slate-400">Airport Catchment</div>
            <div className="mt-1 font-['Cinzel',serif] text-2xl font-bold text-blue-400">
              {KWIN_META.airportTravelTimeMin}m
            </div>
            <div className="text-[11px] text-slate-400">To BIAL Terminal 2</div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="text-xs font-medium text-slate-400">Single-Window SLA</div>
            <div className="mt-1 font-['Cinzel',serif] text-2xl font-bold text-indigo-400">
              45 Days
            </div>
            <div className="text-[11px] text-slate-400">KIADB Fast-Track</div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="text-xs font-medium text-slate-400">Land CAGR (2020-26)</div>
            <div className="mt-1 font-['Cinzel',serif] text-2xl font-bold text-purple-400">
              +14.2%
            </div>
            <div className="text-[11px] text-slate-400">Annual Appreciation</div>
          </div>
        </div>

        {/* Quick Access CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            variant="emerald"
            size="md"
            icon={MapPin}
            onClick={() => onNavigateToTool('spatial')}
          >
            Launch 5,800-Acre Masterplan Explorer
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={TrendingUp}
            onClick={() => onNavigateToTool('valuation')}
          >
            Econometric Valuation Index
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={Compass}
            onClick={() => onNavigateToTool('feasibility')}
          >
            Survey Feasibility & ROI Engine
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={Layers}
            onClick={() => onNavigateToTool('regulatory')}
          >
            Statutory Regulatory Navigator
          </Button>
        </div>

      </div>
    </div>
  );
};
