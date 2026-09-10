import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Radio, 
  Zap, 
  Building2, 
  Car, 
  Droplets, 
  Bell, 
  BellRing, 
  ShieldCheck, 
  Filter, 
  TrendingUp, 
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { INFRASTRUCTURE_MILESTONES, REALTIME_SIGNALS, MilestoneItem, LiveSignalLog } from '../data/milestone-data';

interface MilestoneSignalTrackerProps {
  onNavigateToTool?: (toolId: string) => void;
}

export const MilestoneSignalTracker: React.FC<MilestoneSignalTrackerProps> = ({ onNavigateToTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kwin_milestone_alerts') === 'true';
    } catch {
      return false;
    }
  });
  const [showToast, setShowToast] = useState<boolean>(false);
  const [activeSignalIndex, setActiveSignalIndex] = useState<number>(0);

  // Filtered milestones
  const filteredMilestones = INFRASTRUCTURE_MILESTONES.filter((ms) => {
    if (selectedCategory === 'all') return true;
    return ms.category === selectedCategory;
  });

  // Cycle real-time ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSignalIndex((prev) => (prev + 1) % REALTIME_SIGNALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleSubscribe = () => {
    const nextState = !isSubscribed;
    setIsSubscribed(nextState);
    try {
      localStorage.setItem('kwin_milestone_alerts', nextState ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const activeSignal = REALTIME_SIGNALS[activeSignalIndex];

  return (
    <div className="space-y-6">
      
      {/* Live Ground Telemetry & Velocity Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900 p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Live Dynamic Infrastructure Signal Feed
              </span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700/60">
                Ground Reality & EPC Tracker
              </span>
            </div>
            <h3 className="mt-1 font-['Cinzel',serif] text-xl sm:text-2xl font-bold text-white">
              Ground Execution Velocity & Milestone Radar
            </h3>
            <p className="text-xs text-slate-300 font-light mt-0.5">
              Continuous empirical tracking of civil work packages, power grid tie-ins, and statutory land handovers.
            </p>
          </div>

          {/* Subscribe Alert Action */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleToggleSubscribe}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border shadow-sm ${
                isSubscribed
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {isSubscribed ? (
                <>
                  <BellRing className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                  <span>Alerts Active (Subscribed)</span>
                </>
              ) : (
                <>
                  <Bell className="w-3.5 h-3.5 text-slate-400" />
                  <span>Notify on Milestone Delivery</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Signal Telemetry Stream Ticker */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2 text-emerald-400 shrink-0 mt-0.5 sm:mt-0">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
                  {activeSignal.categoryLabel}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {activeSignal.timestamp}
                </span>
                <span className="text-[10px] text-slate-400 hidden md:inline">
                  · {activeSignal.source}
                </span>
              </div>
              <p className="text-xs text-slate-200 font-medium">
                {activeSignal.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            {activeSignal.telemetryValue && (
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-500/30">
                {activeSignal.telemetryValue}
              </span>
            )}
            <div className="flex items-center gap-1">
              {REALTIME_SIGNALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSignalIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeSignalIndex === i ? 'bg-emerald-400 w-3' : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to signal ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 4 Execution Pillar Stats */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Phase 1 Trunk Velocity</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-['Cinzel',serif] text-xl font-bold text-emerald-400">42.8%</span>
              <span className="text-[10px] text-emerald-400 font-mono">+3.4% MoM</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">2,000 Acres Under Active Civil Pour</span>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Active Heavy Machinery</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-['Cinzel',serif] text-xl font-bold text-teal-300">342 Units</span>
              <span className="text-[10px] text-teal-400 font-mono">GPS Telemetry</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Graders, Dozers & Slipform Pavers</span>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Concrete Output Rate</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-['Cinzel',serif] text-xl font-bold text-cyan-300">12,450 m³</span>
              <span className="text-[10px] text-cyan-400 font-mono">Per Week</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">RMC Batching Plants Operational</span>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Next Major Inauguration</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-['Cinzel',serif] text-xl font-bold text-amber-300">48 Days</span>
              <span className="text-[10px] text-amber-400 font-mono">STRR Pkg-3</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Doddaballapur Bypass Opening</span>
          </div>
        </div>

      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter by Package:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
              selectedCategory === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All Work Packages ({INFRASTRUCTURE_MILESTONES.length})
          </button>
          <button
            onClick={() => setSelectedCategory('transport')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
              selectedCategory === 'transport'
                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Arterial Transport & Roads
          </button>
          <button
            onClick={() => setSelectedCategory('energy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
              selectedCategory === 'energy'
                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Solar PV & Smart Grid
          </button>
          <button
            onClick={() => setSelectedCategory('health_edu')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
              selectedCategory === 'health_edu'
                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Health & Universities
          </button>
          <button
            onClick={() => setSelectedCategory('water')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
              selectedCategory === 'water'
                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Zero-Discharge Water
          </button>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Showing {filteredMilestones.length} Active Packages
        </span>
      </div>

      {/* Dynamic Milestones Execution Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMilestones.map((ms) => {
          return (
            <div
              key={ms.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                
                {/* Card Top Pill Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                    {ms.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                    {ms.phase}
                  </span>
                </div>

                {/* Milestone Title */}
                <h4 className="mt-3 font-['Cinzel',serif] text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {ms.title}
                </h4>

                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed font-light">
                  {ms.description}
                </p>

                {/* Progress Bar & Status */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Physical Progress</span>
                    <span className="font-mono font-bold text-emerald-400">{ms.progressPercent}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-700"
                      style={{ width: `${ms.progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-400">{ms.statusLabel}</span>
                    {ms.daysRemaining !== null && (
                      <span className="font-mono text-amber-300">
                        {ms.daysRemaining} days to target
                      </span>
                    )}
                  </div>
                </div>

                {/* Contractor & Investment Row */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 block font-mono">EPC Contractor:</span>
                    <span className="text-slate-200 font-medium truncate block">{ms.contractorOrAgency}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-mono">Investment:</span>
                    <span className="text-emerald-300 font-semibold">{ms.investmentINR}</span>
                  </div>
                </div>

                {/* Key Metrics Badges */}
                <div className="mt-3 grid grid-cols-3 gap-1.5 pt-2">
                  {ms.keyMetrics.map((km, i) => (
                    <div key={i} className="p-1.5 rounded bg-slate-950/60 border border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 block truncate">{km.label}</span>
                      <span className="text-[10px] font-semibold text-slate-200 font-mono block">{km.value}</span>
                    </div>
                  ))}
                </div>

                {/* Latest Ground Dispatch */}
                <div className="mt-3 rounded-lg bg-slate-950/80 border border-slate-800 p-2.5 text-[11px] text-slate-300">
                  <span className="text-[10px] font-mono text-emerald-400 block font-semibold">Latest Ground Dispatch:</span>
                  <span className="line-clamp-2 mt-0.5">{ms.latestUpdate}</span>
                </div>

              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono text-[10px] text-slate-500">Hash: {ms.verificationHash}</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Target: {ms.targetDate} →
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Subscription Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-emerald-500/50 text-emerald-200 text-xs shadow-2xl animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>
            {isSubscribed
              ? 'Milestone alerts enabled: You will receive live notifications on ground completions.'
              : 'Milestone notifications turned off.'}
          </span>
        </div>
      )}

    </div>
  );
};
