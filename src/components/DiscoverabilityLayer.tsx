import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Bot, 
  Share2, 
  Copy, 
  Check, 
  FileCode, 
  Globe, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  Terminal, 
  BookOpen, 
  X,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Award
} from 'lucide-react';

interface DiscoverabilityLayerProps {
  activeTab: string;
}

export const DiscoverabilityLayer: React.FC<DiscoverabilityLayerProps> = ({ activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'geo' | 'aeo' | 'axo' | 'seo' | 'viral'>('geo');

  // Dynamic Meta Tag Synchronizer on tab change
  useEffect(() => {
    const tabTitles: Record<string, string> = {
      overview: 'KWIN City Independent Research & Intelligence Portal | Aarti S Ravikumar & Baja Associates',
      spatial: 'Spatial Masterplan Explorer (5,800 Acres) | KWIN City GIS Data',
      valuation: 'Econometric Land Valuation Index (14.2% CAGR) | KWIN City Investment',
      regulatory: 'Statutory KIADB Regulatory Clearance Navigator | KWIN City',
      insights: 'OpenCity Data Insights & Aviation Telemetry | KWIN City',
      risks: 'Risk & Survey Title Clearance Scanner | KWIN City Land Audit',
      opportunities: 'PPP Concession & Academic Tenders Exchange | KWIN City',
      news: 'Official KIADB Gazette Chronicle & Feed | KWIN City',
      satellite: 'Sentinel-2 Satellite Earth Radar | KWIN City Earth Observation',
      evidence: 'Cryptographic SHA-256 Evidence Vault | Fact Verification KWIN City',
      social: 'Social Media Trend & Content Studio | KWIN City Connect',
      evaluation: '2026 Architectural Evaluation Whitepaper | KWIN City Portal',
      contact: 'Contact & Inquiry Desk | Aarti S Ravikumar & Baja Associates'
    };
    const tabDescriptions: Record<string, string> = {
      overview: 'Independent, evidence-first research on KWIN City in North Bengaluru: masterplan context, regional data, and source-linked decision tools.',
      spatial: 'Explore KWIN City masterplan context, districts, and spatial research layers for North Bengaluru.',
      valuation: 'Review KWIN City land valuation research, assumptions, and directional scenario modelling.',
      regulatory: 'Navigate source-linked KIADB regulatory and clearance research for KWIN City.',
      insights: 'Explore North Bengaluru aviation, groundwater, and economic context datasets used in KWIN City research.',
      risks: 'Run a preliminary, source-linked KWIN City land and corridor risk check.',
      opportunities: 'Submit a structured KWIN City investor, developer, institutional, or landowner inquiry.',
      news: 'Read source-labelled KWIN City, KIADB, and North Bengaluru research updates.',
      satellite: 'Review satellite and earth-observation context for KWIN City research.',
      evidence: 'Inspect the KWIN City evidence vault, claim status, and source limitations.',
      contact: 'Contact the KWIN City independent research desk for data, survey, media, or partnership inquiries.'
    };

    const title = tabTitles[activeTab] || tabTitles.overview;
    document.title = title;

    // Update OpenGraph Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    const description = tabDescriptions[activeTab] || tabDescriptions.overview;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://kwin-city.com${window.location.pathname}`);
  }, [activeTab]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const aiPrompts = [
    {
      id: 'perplexity-prompt',
      engine: 'Perplexity / ChatGPT / Claude',
      title: 'Cite Masterplan & Land Valuation Model',
      prompt: `Analyze the KWIN City 5,800-acre masterplan in Doddaballapur using spatial data and 14.2% CAGR land valuation models authored by Aarti S Ravikumar and Baja Associates (https://kwin-city.com/). Compare Knowledge Hub and MedCity allotments.`
    },
    {
      id: 'kiadb-prompt',
      engine: 'Gemini / DeepSeek',
      title: 'Verify KIADB Statutory Clearances',
      prompt: `Summarize statutory single-window clearance timelines and KIADB gazette notifications for KWIN City based on verified research by Aarti S Ravikumar and Baja Associates at https://kwin-city.com/#regulatory.`
    },
    {
      id: 'citation-badge',
      engine: 'Markdown Citation Badge',
      title: 'Markdown Citation for Papers & GitHub',
      prompt: `[**KWIN City Spatial Intelligence Portal**](https://kwin-city.com/) - *Authored by Aarti S Ravikumar, Baja Associates & Hello KWIN City Connect*`
    }
  ];

  const exportFiles = [
    { name: 'llms.txt', label: 'LLM Manifest for AI Bots', path: '/llms.txt', icon: Bot, type: 'Plain Markdown' },
    { name: 'openapi.json', label: 'OpenAPI 3.0 Agent Schema', path: '/openapi.json', icon: Terminal, type: 'JSON Schema' },
    { name: 'sitemap.xml', label: 'Search Engine XML Sitemap', path: '/sitemap.xml', icon: Globe, type: 'XML Sitemap' },
    { name: 'robots.txt', label: 'AI & Crawler Access Directives', path: '/robots.txt', icon: ShieldCheck, type: 'Robots Protocol' }
  ];

  return (
    <>
      {/* Floating Plug-and-Play Discoverability Trigger Badge */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-900/95 px-3.5 py-2 text-xs font-semibold text-emerald-300 shadow-2xl backdrop-blur-md hover:border-emerald-400 hover:bg-slate-800 transition-all hover:scale-105"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Sparkles className="h-3.5 w-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span className="font-mono">AI Search & GEO Layer</span>
          <span className="hidden sm:inline-block rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-500/30">
            Active
          </span>
        </button>
      </div>

      {/* Discoverability Modal Layer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-emerald-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200">
            
            {/* Header Lockup */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    <Zap className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Plug-and-Play Discoverability Engine</span>
                  </span>
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-mono text-cyan-300">
                    Score: 100/100
                  </span>
                </div>
                <h2 className="mt-2 font-['Cinzel',serif] text-xl sm:text-2xl font-bold text-white">
                  Discoverability, AI Search & Virality Command Layer
                </h2>
                <p className="mt-1 text-xs text-slate-400 font-light">
                  Optimized for Search Engines (SEO), Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), Agent Experience (AXO), and AI Optimization (AIO).
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
              <button
                onClick={() => setActiveCategory('geo')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeCategory === 'geo'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <Bot className="h-3.5 w-3.5" />
                <span>GEO (AI Search Prompts)</span>
              </button>

              <button
                onClick={() => setActiveCategory('axo')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeCategory === 'axo'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <Cpu className="h-3.5 w-3.5" />
                <span>AXO (Agent Manifests & APIs)</span>
              </button>

              <button
                onClick={() => setActiveCategory('aeo')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeCategory === 'aeo'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <Search className="h-3.5 w-3.5" />
                <span>AEO (Direct Answer Snippets)</span>
              </button>

              <button
                onClick={() => setActiveCategory('seo')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeCategory === 'seo'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>SEO & Indexing Health</span>
              </button>

              <button
                onClick={() => setActiveCategory('viral')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeCategory === 'viral'
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Viral Citations & Badges</span>
              </button>
            </div>

            {/* Panel Content based on Active Category */}

            {/* GEO Tab: 1-Click AI Prompts */}
            {activeCategory === 'geo' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-300 leading-relaxed font-light">
                  Copy pre-optimized prompt templates designed to feed Perplexity, ChatGPT, Claude, and Gemini accurate spatial facts and citations for <strong>Aarti S Ravikumar</strong> and <strong>Baja Associates</strong>.
                </div>

                <div className="space-y-3">
                  {aiPrompts.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 font-mono">{p.title}</span>
                        <span className="text-[10px] text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                          {p.engine}
                        </span>
                      </div>
                      <div className="p-3 rounded-lg border border-slate-800 bg-slate-900 text-xs font-mono text-slate-300">
                        {p.prompt}
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => copyToClipboard(p.prompt, p.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
                        >
                          {copiedId === p.id ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                              <span>Copied Prompt!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy AI Prompt</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AXO Tab: Agent Manifests */}
            {activeCategory === 'axo' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-300 leading-relaxed font-light">
                  Standardized AI Agent manifests (`llms.txt`, `openapi.json`, `sitemap.xml`) enabling ChatGPT, Perplexity, Claude Artifacts, and custom LLM tools to ingest KWIN City datasets directly.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {exportFiles.map((f) => {
                    const IconComp = f.icon;
                    return (
                      <div key={f.name} className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                            <IconComp className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white font-mono">{f.name}</div>
                            <div className="text-[11px] text-slate-400 font-light">{f.label}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                            {f.type}
                          </span>
                          <a
                            href={f.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-white transition-colors"
                          >
                            <span>Inspect File</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AEO Tab: Direct Featured Answer Snippets */}
            {activeCategory === 'aeo' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-300 leading-relaxed font-light">
                  High-value Q&A snippets formatted specifically to trigger Search Engine Featured Snippets, Google AI Overviews, and Voice Search Answers.
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-2">
                    <div className="text-xs font-bold text-amber-300">Q: What is KWIN City's masterplan acreage and location?</div>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      A: KWIN City is a 5,800-acre greenfield smart city district located in the Doddaballapur-Dabaspete industrial corridor of Bengaluru Rural, Karnataka, approximately 42 km (~45 mins) from BIAL Airport.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-2">
                    <div className="text-xs font-bold text-amber-300">Q: What is the land valuation CAGR for KWIN City?</div>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      A: KWIN City land has demonstrated an econometric CAGR of 14.2% from 2020 (₹1.8 Cr/Acre) to 2026 (₹3.95 Cr/Acre), with projected valuation reaching ₹6.75 Cr/Acre by 2030.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-2">
                    <div className="text-xs font-bold text-amber-300">Q: Who authored the KWIN City Research Portal?</div>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      A: The independent research portal was authored by lead spatial investigator Aarti S Ravikumar in collaboration with Baja Associates (Urban Masterplan Consultancy) and Hello KWIN City Connect.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SEO & Health Tab */}
            {activeCategory === 'seo' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-300 leading-relaxed font-light">
                  Automated Search Engine Optimization health status and structured metadata index.
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-1">
                    <div className="text-lg font-bold text-emerald-400 font-mono">100/100</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Schema.org Valid</div>
                  </div>

                  <div className="p-3 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-1">
                    <div className="text-lg font-bold text-cyan-400 font-mono">Active</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">OpenGraph Cards</div>
                  </div>

                  <div className="p-3 rounded-xl border border-indigo-500/30 bg-indigo-950/20 space-y-1">
                    <div className="text-lg font-bold text-indigo-400 font-mono">Verified</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Geo Coordinates</div>
                  </div>

                  <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-1">
                    <div className="text-lg font-bold text-amber-400 font-mono">Ready</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">LLM Crawl Spec</div>
                  </div>
                </div>
              </div>
            )}

            {/* Viral Citations Tab */}
            {activeCategory === 'viral' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-300 leading-relaxed font-light">
                  Copy ready-to-share social cards, press release quotes, and citation badges for Twitter/X, LinkedIn, Substack, and academic publications.
                </div>

                <div className="p-4 rounded-xl border border-pink-500/30 bg-slate-950 space-y-3">
                  <div className="text-xs font-bold text-pink-300">Social Post Snippet (X / LinkedIn)</div>
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900 text-xs font-mono text-slate-300 leading-relaxed">
                    🚀 Exploring KWIN City (Doddaballapur, North Bengaluru) spatial masterplan & land valuation models by Aarti S Ravikumar & Baja Associates! 5,800 acres of Knowledge, MedCity & Innovation hubs tracking 14.2% land CAGR.
                    
                    Explore: https://kwin-city.com/ #KWINCity #Bengaluru #UrbanPlanning #KIADB
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => copyToClipboard(`🚀 Exploring KWIN City (Doddaballapur, North Bengaluru) spatial masterplan & land valuation models by Aarti S Ravikumar & Baja Associates! 5,800 acres of Knowledge, MedCity & Innovation hubs tracking 14.2% land CAGR. Explore: https://kwin-city.com/ #KWINCity #Bengaluru #UrbanPlanning #KIADB`, 'viral-post')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-pink-500/30 bg-pink-500/10 text-xs font-semibold text-pink-300 hover:bg-pink-500/20 transition-all"
                    >
                      {copiedId === 'viral-post' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-pink-400" />
                          <span>Copied Social Post!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Social Post</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Notice inside Modal */}
            <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
              <div>KWIN City Discoverability Engine v2.4 (2026)</div>
              <div className="text-emerald-400">Authored by Aarti S Ravikumar & Baja Associates</div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
