import React, { useState } from 'react';
import { Sparkles, TrendingUp, ShieldCheck, MapPin, Radio, Share2, Flame, ArrowRight } from 'lucide-react';
import { ViralInfraCardModal } from './ViralInfraCardModal';

interface ViralTickerBarProps {
  onNavigateToTool?: (toolId: string) => void;
}

export const ViralTickerBar: React.FC<ViralTickerBarProps> = ({ onNavigateToTool }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ticks = [
    { text: '⚡ 5,800-ACRE GREENFIELD MASTERPLAN APPROVED', color: 'text-emerald-400' },
    { text: '📈 LAND CAGR BENCHMARK: +14.2% YoY (2020–2026)', color: 'text-teal-300' },
    { text: '📍 DODDABALLAPUR-DABASPETE CORRIDOR (~45 MINS TO BIAL)', color: 'text-cyan-300' },
    { text: '🏛️ KIADB GAZETTE NOTIFICATION READY & SEIAA CLEARED', color: 'text-indigo-300' },
    { text: '🎓 IISC EXTENSION + GLOBAL UNIVERSITY CAMPUSES ALLOTTED', color: 'text-purple-300' },
    { text: '🛰️ SENTINEL-2 EARTH OBSERVATION RADAR LIVE', color: 'text-emerald-400' },
    { text: '✍️ RESEARCH INVESTIGATOR: AARTI S RAVIKUMAR', color: 'text-amber-300' },
    { text: '🏛️ URBAN CONSULTANCY: BAJA ASSOCIATES', color: 'text-cyan-300' }
  ];

  return (
    <>
      <div className="relative z-30 overflow-hidden border-b border-emerald-500/30 bg-slate-950/90 text-slate-200 text-xs py-2 backdrop-blur-md shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Left Live Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="inline-flex items-center gap-1 font-mono font-bold text-[11px] text-emerald-400 uppercase tracking-wider">
              <Flame className="h-3.5 w-3.5 text-amber-400 animate-bounce" />
              <span className="hidden sm:inline">KWIN City Live Intelligence Pulse</span>
              <span className="sm:hidden">KWIN Live</span>
            </span>
          </div>

          {/* Center Ticker Marquee */}
          <div className="flex-1 overflow-hidden relative">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[11px] font-mono">
              {[...ticks, ...ticks].map((tick, idx) => (
                <span key={idx} className={`inline-flex items-center gap-2 ${tick.color}`}>
                  <span>{tick.text}</span>
                  <span className="text-slate-700">|</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right Action: Share Viral Infra Card */}
          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 px-3 py-1 text-[11px] font-bold text-emerald-300 hover:border-emerald-400 hover:bg-emerald-500/20 transition-all shadow-sm hover:scale-105"
            >
              <Sparkles className="h-3 w-3 text-amber-300" />
              <span className="hidden sm:inline">Share Viral Infra Card</span>
              <span className="sm:hidden">Share Card</span>
            </button>
          </div>

        </div>
      </div>

      {/* Modal */}
      <ViralInfraCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
