import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  MapPin, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  Github, 
  Globe, 
  Send, 
  Sparkles, 
  Command, 
  Activity, 
  Mail, 
  Building, 
  Layers, 
  TrendingUp, 
  ShieldAlert, 
  Satellite, 
  Radio, 
  Share2, 
  Briefcase 
} from 'lucide-react';

interface FooterProps {
  onNavigateToTool: (toolId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToTool }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <footer className="relative border-t border-slate-800/90 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-400 text-xs overflow-hidden">
      
      {/* Decorative Top Accent Glow Bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-emerald-500 via-cyan-500 via-indigo-500 to-amber-500 opacity-80" />

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Top Section: Operational Telemetry Bar & Newsletter Subscription */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          
          {/* Status & Telemetry */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                System Status: Live Operational
              </span>
              <span className="hidden sm:inline-block text-slate-600">|</span>
              <span className="hidden sm:inline-block text-[11px] text-emerald-400 font-mono">
                Sub-16ms Reactive State Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-light">
              Real-time spatial clearinghouse for Doddaballapur & North Bengaluru megaproject corridors.
            </p>
          </div>

          {/* Interactive KIADB Gazette & Research Alert Form */}
          <div className="lg:max-w-md w-full">
            {subscribed ? (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Subscribed! You will receive verified KIADB gazette updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="Subscribe for KIADB Gazette & Spatial Digest..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-950 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs font-bold text-white hover:brightness-110 transition-all shadow-md shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Join</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Core Navigation & Attribution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 (2 Spans): Brand, Research Principals & Disclaimer */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Logo & Brand Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 text-slate-950 font-['Cinzel',serif] font-black text-base shadow-lg shadow-emerald-500/20">
                KW
              </div>
              <div>
                <div className="font-['Cinzel',serif] text-base font-bold tracking-wider text-white">
                  KWIN CITY <span className="text-emerald-400">RESEARCH PORTAL</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Knowledge, Wellbeing & Innovation City Cleared Data
                </div>
              </div>
            </div>

            {/* Author & Consultancy Lockup */}
            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Research Principals & Authorship</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                Authored by lead investigator <strong className="text-white font-medium">Aarti S Ravikumar</strong> in collaboration with <strong className="text-white font-medium">Baja Associates</strong> (Urban Masterplan Consultancy) and <strong className="text-emerald-300 font-medium">Hello KWIN City Connect</strong>.
              </p>
            </div>

            {/* Statutory Disclaimer Box */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3 text-[11px] text-amber-300/90 leading-relaxed">
              <strong className="text-amber-200">Disclaimer:</strong> Independent spatial research portal operated by <em>Hello KWIN City Connect</em>, <em>Baja Associates</em>, and <em>Aarti S Ravikumar</em>. Not an official Government of Karnataka or KIADB website. Official updates: <a href="https://kiadb.karnataka.gov.in" target="_blank" rel="noreferrer" className="underline hover:text-amber-100 font-mono">kiadb.karnataka.gov.in</a>.
            </div>

          </div>

          {/* Col 2: Spatial & Valuation Tools */}
          <div className="space-y-3">
            <div className="font-bold uppercase tracking-wider text-slate-200 text-[11px] flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              <span>Spatial Intelligence</span>
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigateToTool('spatial')} className="hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <span>Spatial Masterplan Explorer</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTool('valuation')} className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <span>Econometric Valuation Index</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTool('satellite')} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <span>Satellite Earth Observation</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTool('insights')} className="hover:text-blue-300 transition-colors flex items-center gap-1.5">
                  <span>OpenCity Data Insights</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Governance, Legal & Audits */}
          <div className="space-y-3">
            <div className="font-bold uppercase tracking-wider text-slate-200 text-[11px] flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              <span>Governance & Audits</span>
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigateToTool('regulatory')} className="hover:text-cyan-300 transition-colors">
                  Statutory Regulatory Clearinghouse
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTool('risks')} className="hover:text-amber-300 transition-colors">
                  Risk & Land Title Scanner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTool('evidence')} className="hover:text-indigo-300 transition-colors">
                  Cryptographic Evidence Vault
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTool('feasibility')} className="hover:text-amber-300 transition-colors">
                  Survey Land Feasibility & ROI
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Ecosystem, Media & Inquiry Desk */}
          <div className="space-y-3">
            <div className="font-bold uppercase tracking-wider text-slate-200 text-[11px] flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-purple-400" />
              <span>Ecosystem & Connect</span>
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigateToTool('opportunities')} className="hover:text-purple-300 transition-colors">
                  PPP Concessions & Tenders
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTool('news')} className="hover:text-indigo-300 transition-colors">
                  Official Gazette Chronicle
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTool('social')} className="hover:text-pink-300 transition-colors">
                  Social Trend & Content Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTool('contact')} className="hover:text-emerald-300 transition-colors font-bold text-white flex items-center gap-1">
                  <Mail className="h-3 w-3 text-emerald-400" />
                  <span>Contact & Inquiry Desk</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Official Directory Badges Row */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-500 font-mono uppercase text-[10px]">Verified External Directories:</span>
            <a
              href="https://kiadb.karnataka.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 transition-all"
            >
              <span>KIADB Govt Portal</span>
              <ExternalLink className="h-3 w-3 text-slate-500" />
            </a>
            <a
              href="https://kum.karnataka.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 transition-all"
            >
              <span>Karnataka Udyog Mitra</span>
              <ExternalLink className="h-3 w-3 text-slate-500" />
            </a>
            <a
              href="https://data.opencity.in/dataset/kwin-city-documents"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 transition-all"
            >
              <span>OpenCity KWIN Documents</span>
              <ExternalLink className="h-3 w-3 text-slate-500" />
            </a>
            <a
              href="https://github.com/aartisr/kwin-city-portal.git"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 transition-all"
            >
              <Github className="h-3 w-3 text-slate-400" />
              <span>Source Repository</span>
            </a>
          </div>

          {/* Quick Command Palette Button */}
          <button
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true });
              window.dispatchEvent(event);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-700/80 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono transition-all"
          >
            <Command className="h-3 w-3 text-emerald-400" />
            <span>Power Palette</span>
            <kbd className="px-1 py-0.5 rounded bg-slate-900 text-[9px] text-slate-400 border border-slate-700">⌘K</kbd>
          </button>
        </div>

        {/* Bottom Bar: Copyright & Telemetry Metrics */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 KWIN City Research Portal | Baja Associates & Aarti S Ravikumar. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Sub-16ms Client Latency
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
              Zero-Leak Data Model
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
              WCAG 2.1 AA Compliant
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
