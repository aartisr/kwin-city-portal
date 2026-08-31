import { useState, useEffect, useRef, FormEvent } from 'react';
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Folder,
  FileCode,
  Layers,
  Terminal,
  Search,
  BookOpen,
  MessageSquare,
  Send,
  Loader2,
  FileText,
  Star,
  ExternalLink,
  Cpu,
  RefreshCw,
  Award,
  ListTodo,
  Info,
  Check,
  Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RepoStats {
  totalFiles: number;
  totalDirs: number;
  totalLines: number;
  typescriptFiles: number;
  javascriptFiles: number;
  cssFiles: number;
  markdownFiles: number;
  testFiles: number;
  configs: string[];
}

interface AuditDimension {
  name: string;
  score: number;
  details: string;
  pros: string[];
  cons: string[];
}

interface AuditedFile {
  path: string;
  rating: number;
  critique: string;
}

interface EvaluationResponse {
  stats: RepoStats;
  isDefault: boolean;
  repoUrl: string;
  noApiKey: boolean;
  score: number;
  summary: string;
  dimensions: AuditDimension[];
  keyStrengths: string[];
  areasForImprovement: string[];
  filesAudited: AuditedFile[];
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export default function App() {
  const [repoInput, setRepoInput] = useState('https://github.com/aartisr/kwin-city-portal.git');
  const [currentRepo, setCurrentRepo] = useState('https://github.com/aartisr/kwin-city-portal.git');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<EvaluationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'gates' | 'files' | 'chat'>('summary');
  
  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isSendingChat, setIsSendingChat] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Trigger evaluation on initial render
  useEffect(() => {
    fetchEvaluation('https://github.com/aartisr/kwin-city-portal.git');
  }, []);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const fetchEvaluation = async (repoUrl: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/evaluate?repo=${encodeURIComponent(repoUrl)}`);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to analyze repository. Make sure the URL is a public GitHub repository.');
      }
      const evalData: EvaluationResponse = await res.json();
      setData(evalData);
      setCurrentRepo(repoUrl);
      
      // Seed initial chat message based on repo
      setChatMessages([
        {
          role: 'model',
          text: `Hello! I have completed auditing the **${repoUrl.split('/').pop()?.replace(/\.git$/, '')}** repository. 

Our static analyzer and server-side Gemini auditor scanned the directory structure, configurations, and core quality documents. Ask me anything about its architecture, custom pre-merge gates, test suites, or files!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during evaluation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!repoInput.trim()) return;
    fetchEvaluation(repoInput.trim());
  };

  const handleSendChat = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isSendingChat) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updatedMessages = [
      ...chatMessages,
      { role: 'user' as const, text: userMsg, timestamp }
    ];
    setChatMessages(updatedMessages);
    setIsSendingChat(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: updatedMessages.map(m => ({ role: m.role, text: m.text })),
          repoUrl: currentRepo
        })
      });

      if (!res.ok) throw new Error('Failed to fetch response');
      const chatData = await res.json();

      setChatMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: chatData.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: 'Oops, I encountered an error while processing that question. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsSendingChat(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9.0) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 7.5) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 5.0) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const getScoreFill = (score: number) => {
    if (score >= 9.0) return 'bg-emerald-600';
    if (score >= 7.5) return 'bg-blue-600';
    if (score >= 5.0) return 'bg-amber-600';
    return 'bg-rose-600';
  };

  const defaultGates = [
    {
      id: 'type-check',
      name: 'TypeScript Compilation Gate',
      command: 'npm run type-check',
      desc: 'Enforces flawless compilation on top of highly strict tsconfig settings.',
      details: 'Ensures there are no loose any imports, incorrect type castings, or missing interfaces.',
      status: 'verified'
    },
    {
      id: 'lint',
      name: 'Zero-Warning ESLint Gate',
      command: 'npm run lint',
      desc: 'Replaces generic next lint with a full-project eslint rule validation.',
      details: 'Blocks codebase edits with even a single lint warning pre-release.',
      status: 'verified'
    },
    {
      id: 'facts',
      name: 'Content & Factual Integrity Gate',
      command: 'npm run quality:verify-facts',
      desc: 'An automated validator scanning files for factual, regional and legal claims.',
      details: 'Prevents merge violations (e.g. blocking stale acreage claims like 465-acre and solar footprint errors).',
      status: 'special'
    },
    {
      id: 'doc-sync',
      name: 'Live Document Matcher Gate',
      command: 'npm run quality:verify-doc',
      desc: 'Validates that QUALITY_STANDARDS.md matches the actual test counts and routes.',
      details: 'Matches specified pass numbers (e.g. 286 tests, 45 routes) against live script outputs in CI.',
      status: 'special'
    },
    {
      id: 'e2e-smoke',
      name: 'Playwright Smoke & Layout Contracts',
      command: 'npm run e2e:smoke',
      desc: 'Runs full mobile-first contract audits across 45 canonical routes.',
      details: 'Validates orientation progressive disclosure, a11y contrast rules, and spatial map interactions.',
      status: 'verified'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900 pb-16">
      {/* Top Banner */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100 shadow-sm">
              <Shield className="h-6 w-6" id="header-shield-icon" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
                GitHub Codebase Auditor
                <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                  Full-Stack v1.0
                </span>
              </h1>
              <p className="text-xs text-slate-500">Automated quality gates & multi-dimensional Gemini audits</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Server Ready
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Repo Search and Presets */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-8" id="search-section">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Auditor Workspace</h2>
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Paste public GitHub repository HTTPS URL (e.g., https://github.com/owner/repo)"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !repoInput.trim()}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              id="analyze-repo-button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Cpu className="h-4 w-4" />
                  Audit Codebase
                </>
              )}
            </button>
          </form>

          {/* Preset Buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Quick Presets:</span>
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                currentRepo === 'https://github.com/aartisr/kwin-city-portal.git'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
              }`}
              onClick={() => {
                setRepoInput('https://github.com/aartisr/kwin-city-portal.git');
                fetchEvaluation('https://github.com/aartisr/kwin-city-portal.git');
              }}
              disabled={isLoading}
            >
              ⭐ kwin-city-portal (Aarti S Ravikumar)
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                currentRepo === 'https://github.com/aartisr/spectral_urbanism_boston.git'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
              }`}
              onClick={() => {
                setRepoInput('https://github.com/aartisr/spectral_urbanism_boston.git');
                fetchEvaluation('https://github.com/aartisr/spectral_urbanism_boston.git');
              }}
              disabled={isLoading}
            >
              spectral-urbanism (Geospatial & Thermal)
            </button>
          </div>
        </section>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-800 flex items-start gap-3 mb-8 animate-fade-in" id="error-card">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm">Evaluation Failure</h3>
              <p className="text-sm mt-1 text-red-700">{error}</p>
              <button
                onClick={() => fetchEvaluation(currentRepo)}
                className="mt-3 px-3 py-1 bg-white border border-red-300 rounded text-xs font-medium hover:bg-red-100 transition-colors flex items-center gap-1.5 text-red-800"
              >
                <RefreshCw className="h-3 w-3" /> Retry Audit
              </button>
            </div>
          </div>
        )}

        {/* Loading Spinner Over Main Dashboard */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
            <Loader2 className="h-10 w-10 text-emerald-600 animate-spin mb-4" />
            <h3 className="text-lg font-semibold text-slate-800">Reviewing Repository Codebase</h3>
            <p className="text-sm text-slate-500 max-w-md text-center mt-2 px-4">
              Cloning public files, running automated file structure walking, compiling statistics, and calling server-side Gemini to analyze quality standards.
            </p>
          </div>
        ) : data ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Overarching Rating & Stats */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Overall Rating Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden" id="rating-card">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-8 -mt-8 -z-10 opacity-50"></div>
                
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-4 inline-flex items-center gap-1">
                  <Award className="h-3 w-3" /> Comprehensive Quality Rank
                </span>

                <div className="relative flex items-center justify-center my-4">
                  {/* Gauge indicator */}
                  <div className="w-36 h-36 rounded-full border-8 border-slate-100 flex items-center justify-center flex-col shadow-inner">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                      {data.score}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                      of 10.0
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mt-2">
                  {data.score >= 9.0 ? 'Elite Software Rigor' : data.score >= 7.5 ? 'Excellent Quality' : 'Standard Baseline'}
                </h3>
                
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {data.isDefault 
                    ? 'Evaluated using reproduclible quality gates, factual validations, and strict continuous deployment controls.'
                    : 'Codebase audited based on repository layout, configurations, complexity and core files.'}
                </p>

                {data.noApiKey && (
                  <div className="w-full mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-left">
                    <p className="text-xs text-amber-800 flex gap-1.5 items-start">
                      <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Gemini Live Audit Disabled:</strong> Add a <strong>GEMINI_API_KEY</strong> in <strong>Settings &gt; Secrets</strong> to unlock personalized AI multi-dimensional audit reports.
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Repo Stats */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm" id="stats-card">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Terminal className="h-4 w-4" /> Codebase Inventory
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                    <span className="text-xs text-slate-500 block">Total Lines (LOC)</span>
                    <span className="text-lg font-bold text-slate-800 block mt-1">
                      {data.stats.totalLines.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                    <span className="text-xs text-slate-500 block">Test Files Found</span>
                    <span className="text-lg font-bold text-emerald-600 block mt-1 flex items-center gap-1">
                      {data.stats.testFiles}
                      {data.stats.testFiles > 0 && <CheckCircle2 className="h-4 w-4 text-emerald-500 inline" />}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                    <span className="text-xs text-slate-500 block">TypeScript Files</span>
                    <span className="text-lg font-bold text-slate-800 block mt-1 flex items-center gap-1.5">
                      <FileCode className="h-4 w-4 text-blue-500 shrink-0" />
                      {data.stats.typescriptFiles}
                    </span>
                  </div>
                  <span className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                    <span className="text-xs text-slate-500 block">JavaScript Files</span>
                    <span className="text-lg font-bold text-slate-800 block mt-1 flex items-center gap-1.5">
                      <Code className="h-4 w-4 text-amber-500 shrink-0" />
                      {data.stats.javascriptFiles}
                    </span>
                  </span>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 col-span-2 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Total Directory Entities</span>
                      <span className="text-sm font-semibold text-slate-700 mt-1 block">
                        {data.stats.totalFiles} files in {data.stats.totalDirs} directories
                      </span>
                    </div>
                    <Folder className="h-6 w-6 text-slate-400" />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Detected Configurations</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {data.stats.configs.map((cfg) => (
                      <span key={cfg} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded text-xs font-mono">
                        {cfg}
                      </span>
                    ))}
                    {data.stats.configs.length === 0 && (
                      <span className="text-xs text-slate-400 italic">No standard configurations found</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Active Repository Info */}
              <div className="bg-slate-900 text-slate-100 rounded-xl p-6 shadow-sm border border-slate-800" id="repository-manifest-card">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Audited Repository</h3>
                <div className="flex items-start gap-2.5">
                  <BookOpen className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-white truncate">
                      {currentRepo.split('/').pop()?.replace(/\.git$/, '')}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{currentRepo}</p>
                    <a
                      href={currentRepo.replace(/\.git$/, '')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold mt-2 inline-flex items-center gap-1 transition-colors"
                    >
                      View on GitHub <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Tab Area (Summary, Gates, File Critique, Chat) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Tab Selector */}
              <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex" id="dashboard-tabs">
                {(['summary', 'gates', 'files', 'chat'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-center rounded-lg text-sm font-semibold tracking-wide transition-all uppercase ${
                      activeTab === tab
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {tab === 'summary' && 'Audit Summary'}
                    {tab === 'gates' && 'Automated Gates'}
                    {tab === 'files' && 'File critique'}
                    {tab === 'chat' && 'AI Sandbox Chat'}
                  </button>
                ))}
              </div>

              {/* Tabs Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6"
                >
                  
                  {/* Summary Tab */}
                  {activeTab === 'summary' && (
                    <div className="space-y-6">
                      
                      {/* Overall Summary Critique */}
                      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Executive Summary</h3>
                        <div className="prose prose-slate max-w-none text-slate-600 text-base leading-relaxed">
                          {data.summary}
                        </div>
                      </div>

                      {/* Multidimensional Breakdowns */}
                      <div className="grid grid-cols-1 gap-6">
                        {data.dimensions.map((dim) => (
                          <div key={dim.name} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
                              <h4 className="font-bold text-base text-slate-800 flex items-center gap-2">
                                <span className={`inline-block w-2.5 h-2.5 rounded-full ${getScoreFill(dim.score)}`}></span>
                                {dim.name}
                              </h4>
                              <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getScoreColor(dim.score)}`}>
                                {dim.score.toFixed(1)} / 10.0
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mb-4">{dim.details}</p>
                            
                            {/* Pros & Cons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                                  <Check className="h-3.5 w-3.5 text-emerald-600" /> Key Merits
                                </h5>
                                <ul className="space-y-1.5">
                                  {dim.pros.map((p, idx) => (
                                    <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                                      <span className="text-emerald-500 shrink-0 mt-0.5">•</span>
                                      <span>{p}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                                  <Info className="h-3.5 w-3.5 text-slate-400" /> Observations / Limitations
                                </h5>
                                <ul className="space-y-1.5">
                                  {dim.cons.map((c, idx) => (
                                    <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                                      <span className="text-slate-400 shrink-0 mt-0.5">•</span>
                                      <span>{c}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Strengths and Weaknesses bento-style card */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                          <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            Primary Strengths
                          </h3>
                          <ul className="space-y-3">
                            {data.keyStrengths.map((str, idx) => (
                              <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                <span className="p-0.5 bg-emerald-50 text-emerald-600 rounded-full mt-0.5">
                                  <Check className="h-3.5 w-3.5" />
                                </span>
                                <span>{str}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                          <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            Actionable Opportunities
                          </h3>
                          <ul className="space-y-3">
                            {data.areasForImprovement.map((area, idx) => (
                              <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                <span className="p-0.5 bg-amber-50 text-amber-600 rounded-full mt-0.5">
                                  <Info className="h-3.5 w-3.5" />
                                </span>
                                <span>{area}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Gates Tab */}
                  {activeTab === 'gates' && (
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Automated Quality Gates Analysis</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6">
                          Modern code repositories use pre-merge CI assertions to guarantee technical debt doesn't turn into operational debt. Below are the verified gates implemented in this project workspace:
                        </p>

                        <div className="space-y-6">
                          {defaultGates.map((gate) => (
                            <div key={gate.id} className="relative p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-200/60 pb-3 mb-3">
                                <div>
                                  <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                                    {gate.name}
                                    {gate.status === 'special' && (
                                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                        Factual Rigor
                                      </span>
                                    )}
                                  </h4>
                                  <span className="text-xs text-slate-400 block mt-0.5">Configured target: <code className="bg-slate-200/80 text-slate-700 px-1 py-0.5 rounded font-mono text-[11px]">{gate.command}</code></span>
                                </div>
                                <span className="px-2.5 py-0.5 bg-emerald-500 text-white rounded-full text-xs font-semibold flex items-center gap-1 self-start sm:self-auto">
                                  <CheckCircle2 className="h-3.5 w-3.5" /> Enforced in CI
                                </span>
                              </div>
                              <p className="text-sm font-semibold text-slate-700">{gate.desc}</p>
                              <p className="text-xs text-slate-500 mt-2 leading-relaxed bg-white border border-slate-200/50 p-2.5 rounded">{gate.details}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Files Tab */}
                  {activeTab === 'files' && (
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Detailed File Audit logs</h3>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                          Surgical analysis of core infrastructural, documentation, and logic components in the codebase workspace:
                        </p>

                        <div className="space-y-4">
                          {data.filesAudited.map((file) => (
                            <div key={file.path} className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-shadow flex items-start gap-4">
                              <div className="p-2.5 bg-slate-50 border border-slate-200 text-slate-500 rounded-lg shrink-0">
                                <FileText className="h-5 w-5" />
                              </div>
                              <div className="min-w-0 flex-grow">
                                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2 mb-2">
                                  <span className="font-mono text-sm text-slate-800 font-bold truncate">{file.path}</span>
                                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold rounded flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                    {file.rating}/10
                                  </span>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">{file.critique}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Chat Tab */}
                  {activeTab === 'chat' && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[550px]" id="chat-tab-container">
                      {/* Header */}
                      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-emerald-600 animate-pulse" />
                          <div>
                            <h3 className="font-bold text-sm text-slate-800">AI Code Auditor Sandbox</h3>
                            <p className="text-xs text-slate-500">Ask deep questions grounded in real files from the workspace</p>
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded border border-slate-300">
                          Server Session
                        </span>
                      </div>

                      {/* Messages Area */}
                      <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50/50">
                        {chatMessages.map((msg, index) => (
                          <div
                            key={index}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed shadow-sm border ${
                                msg.role === 'user'
                                  ? 'bg-emerald-600 text-white border-emerald-700 rounded-tr-none'
                                  : 'bg-white text-slate-800 border-slate-200 rounded-tl-none'
                              }`}
                            >
                              <div className="whitespace-pre-line prose prose-sm max-w-none prose-invert">
                                {msg.text}
                              </div>
                              <span
                                className={`text-[10px] block mt-1.5 text-right ${
                                  msg.role === 'user' ? 'text-emerald-200' : 'text-slate-400'
                                }`}
                              >
                                {msg.timestamp}
                              </span>
                            </div>
                          </div>
                        ))}
                        {isSendingChat && (
                          <div className="flex justify-start">
                            <div className="bg-white text-slate-800 border border-slate-200 rounded-xl rounded-tl-none px-4 py-3 text-sm shadow-sm flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                              <span className="text-xs text-slate-500 italic">Auditor is analyzing files...</span>
                            </div>
                          </div>
                        )}
                        <div ref={chatEndRef} />
                      </div>

                      {/* Footer Inputs */}
                      <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex gap-2">
                        <input
                          type="text"
                          placeholder="Ask about vitest suites, fact checking, sitemaps, directories, or next.js configuration..."
                          className="flex-grow bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white focus:border-emerald-500 transition-all placeholder-slate-400"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          disabled={isSendingChat}
                        />
                        <button
                          type="submit"
                          disabled={!chatInput.trim() || isSendingChat}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          id="send-chat-message"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
            <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-800">No Evaluation Loaded</h3>
            <p className="text-sm text-slate-500 mt-2">Enter a public repository above to perform a codebase audit.</p>
          </div>
        )}
      </main>
    </div>
  );
}
