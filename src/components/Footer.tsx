import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  Github, 
  Send, 
  Sparkles, 
  Command, 
  Mail, 
  Layers, 
  TrendingUp, 
  ShieldAlert, 
  Satellite, 
  Radio, 
  Briefcase,
  ChevronDown,
  Compass,
  FileCheck,
  Calculator,
  Activity,
  ArrowUpRight
} from 'lucide-react';

interface FooterProps {
  onNavigateToTool: (toolId: string) => void;
}

interface FooterSectionItem {
  id: string;
  name: string;
  badge?: string;
  icon: React.ElementType;
}

interface FooterSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  accentColor: 'emerald' | 'cyan' | 'purple';
  items: FooterSectionItem[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    id: 'spatial',
    title: 'Spatial Intelligence',
    subtitle: 'GIS, valuation & earth observation',
    icon: MapPin,
    accentColor: 'emerald',
    items: [
      { id: 'spatial', name: 'Spatial Masterplan Explorer', badge: 'GIS 3D', icon: Compass },
      { id: 'valuation', name: 'Econometric Valuation Index', badge: 'CAGR', icon: TrendingUp },
      { id: 'satellite', name: 'Satellite Earth Observation', badge: 'Sentinel-2', icon: Satellite },
      { id: 'insights', name: 'OpenCity Data Insights', badge: 'Live Feed', icon: Activity },
    ],
  },
  {
    id: 'governance',
    title: 'Governance & Audits',
    subtitle: 'Statutory rules, title & land feasibility',
    icon: Layers,
    accentColor: 'cyan',
    items: [
      { id: 'regulatory', name: 'Statutory Regulatory Clearinghouse', badge: 'KIADB', icon: ShieldCheck },
      { id: 'risks', name: 'Risk & Land Title Scanner', badge: 'Security', icon: ShieldAlert },
      { id: 'evidence', name: 'Cryptographic Evidence Vault', badge: 'SHA-256', icon: FileCheck },
      { id: 'feasibility', name: 'Survey Land Feasibility & ROI', badge: 'Model', icon: Calculator },
    ],
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem & Connect',
    subtitle: 'Tenders, media feeds & inquiry desk',
    icon: Briefcase,
    accentColor: 'purple',
    items: [
      { id: 'opportunities', name: 'PPP Concessions & Tenders', badge: 'Global', icon: Briefcase },
      { id: 'news', name: 'Official Gazette Chronicle', badge: 'Realtime', icon: Radio },
      { id: 'social', name: 'Social Trend & Content Studio', badge: 'AI Gen', icon: Sparkles },
      { id: 'contact', name: 'Contact & Inquiry Desk', badge: 'Priority', icon: Mail },
    ],
  },
];

export const Footer: React.FC<FooterProps> = ({ onNavigateToTool }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  // Mobile accordion state (default: all expanded for quick access, or collapsible per user choice)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    spatial: true,
    governance: true,
    ecosystem: true,
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  const getAccentStyles = (accent: 'emerald' | 'cyan' | 'purple') => {
    switch (accent) {
      case 'emerald':
        return {
          iconColor: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          hoverBg: 'hover:bg-emerald-950/30 hover:border-emerald-500/40',
          activeBg: 'active:bg-emerald-900/40',
          activeBorder: 'border-emerald-500/30',
        };
      case 'cyan':
        return {
          iconColor: 'text-cyan-400',
          badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          hoverBg: 'hover:bg-cyan-950/30 hover:border-cyan-500/40',
          activeBg: 'active:bg-cyan-900/40',
          activeBorder: 'border-cyan-500/30',
        };
      case 'purple':
        return {
          iconColor: 'text-purple-400',
          badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
          hoverBg: 'hover:bg-purple-950/30 hover:border-purple-500/40',
          activeBg: 'active:bg-purple-900/40',
          activeBorder: 'border-purple-500/30',
        };
    }
  };

  return (
    <footer className="relative border-t border-slate-800/90 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-400 text-xs overflow-hidden">
      
      {/* Decorative Top Accent Glow Bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-emerald-500 via-cyan-500 via-indigo-500 to-amber-500 opacity-80" />

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10 sm:space-y-12">
        
        {/* Top Section: Operational Telemetry Bar & Newsletter Subscription */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 backdrop-blur-md flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          
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
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="Subscribe for KIADB Gazette & Spatial Digest..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-950 pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs font-bold text-white hover:brightness-110 active:scale-[0.98] transition-all shadow-md shrink-0 cursor-pointer min-h-[44px] sm:min-h-0"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Join Digest</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Core Navigation & Attribution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Brand, Research Principals & Disclaimer Column */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Logo & Brand Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 text-slate-950 font-['Cinzel',serif] font-black text-lg shadow-lg shadow-emerald-500/20">
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
            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 space-y-2">
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

          {/* Dynamic Interactive Navigation Sections (Spatial, Governance, Ecosystem) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {FOOTER_SECTIONS.map((section) => {
              const styles = getAccentStyles(section.accentColor);
              const isOpen = openSections[section.id];
              const SectionIcon = section.icon;

              return (
                <div 
                  key={section.id}
                  className={`rounded-2xl border border-slate-800/90 bg-slate-900/60 sm:bg-transparent sm:border-0 p-3 sm:p-0 transition-all ${
                    isOpen ? 'ring-1 ring-slate-700/50 sm:ring-0' : ''
                  }`}
                >
                  {/* Category Header (Interactive accordion button on mobile, clean header on desktop) */}
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between gap-2 text-left sm:cursor-default py-1.5 focus:outline-none group"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg bg-slate-900 border border-slate-800 ${styles.iconColor} group-hover:scale-105 transition-transform`}>
                        <SectionIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold uppercase tracking-wider text-slate-200 text-xs block">
                          {section.title}
                        </span>
                        <span className="text-[10px] text-slate-500 block font-light sm:hidden">
                          {section.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Accordion Chevron */}
                    <div className="sm:hidden text-slate-400 p-1 rounded-lg bg-slate-950 border border-slate-800">
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`} 
                      />
                    </div>
                  </button>

                  {/* Section Tool Items List (Collapsible on mobile with touch-friendly cards, clean list on desktop) */}
                  <div className={`mt-3 space-y-1.5 sm:block ${isOpen ? 'block' : 'hidden'}`}>
                    {section.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isContact = item.id === 'contact';

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => onNavigateToTool(item.id)}
                          className={`w-full group text-left flex items-center justify-between gap-2 p-2.5 sm:px-2 sm:py-1.5 rounded-xl border border-slate-800/70 bg-slate-950/70 sm:bg-transparent sm:border-transparent ${styles.hoverBg} ${styles.activeBg} transition-all active:scale-[0.98] min-h-[44px] sm:min-h-0 cursor-pointer`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <ItemIcon className={`h-3.5 w-3.5 shrink-0 ${isContact ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'} transition-colors`} />
                            <span className={`text-xs truncate ${isContact ? 'font-semibold text-white group-hover:text-emerald-300' : 'text-slate-300 group-hover:text-white'} transition-colors`}>
                              {item.name}
                            </span>
                          </div>

                          {/* Quick Badge / Arrow */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            {item.badge && (
                              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md border ${styles.badgeBg}`}>
                                {item.badge}
                              </span>
                            )}
                            <ArrowUpRight className="h-3 w-3 text-slate-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all hidden sm:inline-block" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Official Directory Badges Row */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="text-slate-500 font-mono uppercase text-[10px] w-full sm:w-auto">Verified External Directories:</span>
            <a
              href="https://kiadb.karnataka.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 transition-all active:scale-[0.98]"
            >
              <span>KIADB Govt Portal</span>
              <ExternalLink className="h-3 w-3 text-slate-500" />
            </a>
            <a
              href="https://kum.karnataka.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 transition-all active:scale-[0.98]"
            >
              <span>Karnataka Udyog Mitra</span>
              <ExternalLink className="h-3 w-3 text-slate-500" />
            </a>
            <a
              href="https://data.opencity.in/dataset/kwin-city-documents"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 transition-all active:scale-[0.98]"
            >
              <span>OpenCity KWIN Documents</span>
              <ExternalLink className="h-3 w-3 text-slate-500" />
            </a>
            <a
              href="https://github.com/aartisr/kwin-city-portal.git"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 transition-all active:scale-[0.98]"
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono transition-all active:scale-[0.98]"
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
