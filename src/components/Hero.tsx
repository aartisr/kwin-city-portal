import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Layers, 
  TrendingUp, 
  Compass, 
  Building2,
  FileCheck2,
  Search,
  Award
} from 'lucide-react';
import { KWIN_META } from '../data/kwin-data';
import { Badge, Button } from './ui';

interface HeroProps {
  onNavigateToTool: (toolId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToTool }) => {
  return (
    <div className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-[#FAF9F5] dark:bg-gradient-to-b dark:from-slate-900/80 dark:via-slate-950 dark:to-slate-950 py-10 lg:py-14 transition-colors">
      
      {/* Background Subtle Scholarly Grid / Watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.07] pointer-events-none" />
      <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Clarity Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="emerald" pulse size="md" icon={ShieldCheck}>
            Independent Land Research • Zero Broker Bias
          </Badge>

          <Badge variant="cyan" size="md">
            Karnataka Govt. 5,800-Acre Masterplan & Gazettes
          </Badge>

          <Badge variant="slate" icon={FileCheck2} size="md">
            Cadastral Survey Number Audits & Valuation Math
          </Badge>
        </div>

        {/* Hero Title & Value-Focused Subtitle */}
        <div className="mt-5 max-w-4xl">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.15]">
            KWIN CITY <span className="text-emerald-800 dark:text-emerald-400">LAND INTELLIGENCE & AUDIT</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            An un-brokered, independent research platform for landowners, buyers, and enterprises evaluating North Bengaluru’s 5,800-acre Knowledge, Wellbeing, & Innovation City corridor. Search cadastral survey numbers against KIADB Section 28 acquisition gazettes, calculate government compensation versus market valuation, track physical infrastructure delivery, and export bank-grade due diligence reports.
          </p>
        </div>

        {/* Macro Core Metrics Grid - High Contrast */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-2xs">
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Total Scale</div>
            <div className="mt-1 font-serif text-2xl font-bold text-emerald-800 dark:text-emerald-400">
              {KWIN_META.totalAcreage.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Acres (4 Districts)</div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-2xs">
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Target Outlay</div>
            <div className="mt-1 font-serif text-2xl font-bold text-teal-800 dark:text-teal-300">
              {KWIN_META.projectedInvestmentINR}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{KWIN_META.projectedInvestmentUSD} Est.</div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-2xs">
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Knowledge Jobs</div>
            <div className="mt-1 font-serif text-2xl font-bold text-cyan-800 dark:text-cyan-300">
              100,000
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">High-Tech & Biotech</div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-2xs">
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Airport Link</div>
            <div className="mt-1 font-serif text-2xl font-bold text-blue-800 dark:text-blue-400">
              {KWIN_META.airportTravelTimeMin}m
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Via STRR / BIAL T2</div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-2xs">
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Single-Window SLA</div>
            <div className="mt-1 font-serif text-2xl font-bold text-indigo-800 dark:text-indigo-400">
              45 Days
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">KIADB Fast-Track</div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-2xs">
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Land CAGR (2020-26)</div>
            <div className="mt-1 font-serif text-2xl font-bold text-purple-800 dark:text-purple-400">
              +14.2%
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Annualized Index</div>
          </div>
        </div>

        {/* Action-Oriented CTA Buttons with Direct Value */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            size="md"
            icon={Compass}
            onClick={() => onNavigateToTool('feasibility')}
          >
            Check Survey Number & Acquisition Status
          </Button>

          <Button
            variant="outline"
            size="md"
            icon={MapPin}
            onClick={() => onNavigateToTool('spatial')}
          >
            Explore 5,800-Acre Masterplan GIS
          </Button>

          <Button
            variant="outline"
            size="md"
            icon={TrendingUp}
            onClick={() => onNavigateToTool('valuation')}
          >
            Calculate Land Value & Payout
          </Button>

          <Button
            variant="outline"
            size="md"
            icon={Layers}
            onClick={() => onNavigateToTool('regulatory')}
          >
            KIADB Rules & Stamp Duty Relief
          </Button>
        </div>

      </div>
    </div>
  );
};
