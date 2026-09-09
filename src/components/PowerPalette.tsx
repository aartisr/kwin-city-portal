import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  Compass,
  Layers, 
  Activity, 
  ShieldAlert, 
  Briefcase, 
  Radio, 
  Satellite, 
  FileCheck2, 
  Award,
  ArrowRight,
  Sparkles,
  Share2,
  Mail
} from 'lucide-react';

interface PowerPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (toolId: string) => void;
}

export const PowerPalette: React.FC<PowerPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTool
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle palette
        if (isOpen) {
          onClose();
        } else {
          // Handled in parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tools = [
    { id: 'spatial', label: 'Spatial Masterplan Explorer', icon: MapPin, desc: '5,800-acre district layout & buffer GIS' },
    { id: 'valuation', label: 'Econometric Valuation Index', icon: TrendingUp, desc: 'Land CAGR models & interactive ROI estimator' },
    { id: 'feasibility', label: 'Survey Feasibility & KIADB Compensation Calculator', icon: Compass, desc: 'Doddaballapur survey lookup, KIADB payout rates & Govt stamp duty' },
    { id: 'regulatory', label: 'Statutory Regulatory Navigator', icon: Layers, desc: 'Single-window Karnataka clearances & SLAs' },
    { id: 'insights', label: 'OpenCity Data Insights Hub', icon: Activity, desc: 'Aviation traffic, groundwater & jobs data' },
    { id: 'risks', label: 'Risk & Governance Scanner', icon: ShieldAlert, desc: 'Title, water table & environmental compliance' },
    { id: 'opportunities', label: 'Opportunity & Tender Exchange', icon: Briefcase, desc: 'PPP concessions & academic partnerships' },
    { id: 'news', label: 'Gazette & News Chronicle', icon: Radio, desc: 'Official government publications & verified feeds' },
    { id: 'social', label: 'Social Media & Trend Studio', icon: Share2, desc: 'Official accounts, trend pulse & content generator' },
    { id: 'satellite', label: 'Satellite & Earth Observation', icon: Satellite, desc: 'Milestone tracking via Sentinel-2 & drones' },
    { id: 'evidence', label: 'Cryptographic Evidence Vault', icon: FileCheck2, desc: 'Fact-checking registry with SHA-256 proofs' },
    { id: 'contact', label: 'Contact & Inquiry Desk', icon: Mail, desc: 'Send research inquiries & survey verification requests' },
  ];

  const filteredTools = tools.filter(t => 
    t.label.toLowerCase().includes(query.toLowerCase()) ||
    t.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-800 p-4">
          <Search className="absolute left-6 top-5 h-5 w-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type a tool name, dataset, or regulation (or ESC to cancel)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredTools.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  onSelectTool(t.id);
                  onClose();
                }}
                className="w-full flex items-center justify-between rounded-xl p-3 text-left hover:bg-slate-800/80 hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-slate-800 p-2 text-emerald-400 group-hover:bg-emerald-500/20">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white">
                      {t.label}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {t.desc}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </button>
            );
          })}
          {filteredTools.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching intelligence tools found.
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="border-t border-slate-800 bg-slate-950/80 px-4 py-2.5 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with mouse or arrow keys</span>
          <span className="font-mono">KWIN City World-Class OS</span>
        </div>

      </div>
    </div>
  );
};
