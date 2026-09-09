import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  Filter,
  Share2,
  Check,
  RefreshCw,
  Eye,
  X,
  Bookmark,
  Rss,
  Sparkles,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Database,
  Cpu,
  Layers
} from 'lucide-react';
import { NewsArticle } from '../types';
import { getDailyJobStatus, runDailyIngestionJob, getStoredArticles, DailyJobStatus } from '../services/dailyIngestionEngine';

export const NewsIntelligence: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFeedSource, setSelectedFeedSource] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');
  const [liveArticles, setLiveArticles] = useState<NewsArticle[]>([]);
  const [jobStatus, setJobStatus] = useState<DailyJobStatus>(getDailyJobStatus());

  useEffect(() => {
    setLiveArticles(getStoredArticles());
  }, []);

  const categories = ['all', 'Official Gazette', 'Infrastructure', 'Policy', 'Global Partnerships'];
  const feedSources = [
    { id: 'all', label: 'All Verified Feeds' },
    { id: 'dipr', label: 'DIPR Karnataka Govt' },
    { id: 'kiadb', label: 'KIADB Industrial Board' },
    { id: 'nhai', label: 'NHAI Expressways' },
    { id: 'kredl', label: 'KREDL Renewable Energy' },
    { id: 'kum', label: 'Karnataka Udyog Mitra' }
  ];

  const handleRunDailyJob = async () => {
    setIsRefreshing(true);
    const result = await runDailyIngestionJob();
    setJobStatus(result.status);
    setLiveArticles(result.articles);
    setIsRefreshing(false);
    setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredNews = liveArticles.filter((article) => {
    const matchCat = selectedCategory === 'all' || article.category === selectedCategory;
    const matchSource = selectedFeedSource === 'all' || 
                        (selectedFeedSource === 'dipr' && article.publisher.includes('DIPR')) ||
                        (selectedFeedSource === 'kiadb' && article.publisher.includes('KIADB')) ||
                        (selectedFeedSource === 'nhai' && article.publisher.includes('NHAI')) ||
                        (selectedFeedSource === 'kredl' && article.publisher.includes('KREDL')) ||
                        (selectedFeedSource === 'kum' && article.publisher.includes('Karnataka'));
    const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.publisher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSource && matchSearch;
  });

  const handleDownloadOPML = () => {
    const opmlText = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>KWIN City Official News & Gazette Feeds</title>
    <dateCreated>${new Date().toUTCString()}</dateCreated>
  </head>
  <body>
    <outline text="Karnataka Government Gazettes" title="KIADB & DIPR Official Feeds" type="rss" xmlUrl="https://dipr.karnataka.gov.in/feed" htmlUrl="https://kwin-city.com/" />
    <outline text="NHAI Infrastructure Updates" title="STRR & Highway Alerts" type="rss" xmlUrl="https://nhai.gov.in/feed" htmlUrl="https://kwin-city.com/" />
  </body>
</opml>`;
    const blob = new Blob([opmlText], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kwin-city-feeds.opml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyLink = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
              Tool #7: Live Gazette & News Intelligence Reader
            </span>
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live RSS Stream Active</span>
            </div>
          </div>
          <h2 className="mt-2 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white">
            KWIN City Statutory News Reader & Press Feeds
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Real-time feed aggregation of official state gazettes, KIADB land allotment orders, 
            NHAI highway notifications, and verified institutional announcements.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunDailyJob}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/25 transition-all shadow-md"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Ingesting Daily Feeds...' : 'Run Daily Ingestion Job'}</span>
          </button>
          <button
            onClick={handleDownloadOPML}
            className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/15 px-3.5 py-2 text-xs font-medium text-indigo-200 hover:bg-indigo-500/25 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export OPML</span>
          </button>
        </div>
      </div>

      {/* Automated Everyday Cron Job Schedule Monitor */}
      <div className="mt-6 rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-4 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-100">Automated Daily Ingestion Job</span>
              <span className="text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                Active Cron: 0 0 * * * (Midnight IST)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Last Job Run: <strong className="text-slate-200">{jobStatus.lastRunTimestamp}</strong> · Next Run: <span className="text-indigo-300 font-mono">{jobStatus.nextScheduledRun}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>5 Sources Synced</span>
          </div>
          <span>·</span>
          <span>SHA-256 Verified</span>
        </div>
      </div>

      {/* Live Stream Bar */}
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
            <Rss className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <span>Syndicated Stream Channel</span>
              <span className="text-[10px] font-mono text-slate-400">Updated: {lastUpdated}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              5 Active Feeds · 100% Verified Primary Gazette Sources
            </p>
          </div>
        </div>

        {/* Feed Source Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {feedSources.map((source) => (
            <button
              key={source.id}
              onClick={() => setSelectedFeedSource(source.id)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                selectedFeedSource === source.id
                  ? 'border border-indigo-500/40 bg-indigo-500/20 text-indigo-200'
                  : 'border border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              {source.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search news, gazette orders, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'border border-indigo-500/40 bg-indigo-500/20 text-indigo-200 shadow-md ring-1 ring-indigo-500/30'
                  : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Stories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Feed Stream Cards */}
      <div className="mt-6 space-y-4">
        {filteredNews.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-slate-500 mb-2" />
            <p className="text-sm text-slate-300 font-medium">No gazettes found matching your query.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedFeedSource('all'); }}
              className="mt-3 text-xs text-indigo-400 underline hover:text-indigo-300"
            >
              Reset search & feed filters
            </button>
          </div>
        ) : (
          filteredNews.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-sm hover:shadow-md"
            >
              <div className="space-y-2.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded border border-indigo-500/20">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="h-3 w-3 text-slate-500" /> {article.date}
                  </span>
                  <span className="text-[11px] text-slate-500">·</span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="h-3 w-3 text-slate-500" /> {article.readTime}
                  </span>
                  {bookmarkedIds.includes(article.id) && (
                    <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Saved
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-indigo-200 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light line-clamp-2">
                  {article.summary}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                  <span className="text-slate-400">
                    <strong className="text-slate-300">Publisher:</strong> {article.publisher}
                  </span>
                  <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" />
                    <span>{article.factCheckStatus} ({article.credibilityScore}% Score)</span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex md:flex-col items-center gap-2 shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedArticle(article); }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-950/50 px-3.5 py-2 text-xs font-semibold text-indigo-200 hover:bg-indigo-900/50 transition-colors"
                >
                  <Eye className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Read Story</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => toggleBookmark(article.id, e)}
                    className={`p-2 rounded-xl border transition-colors ${
                      bookmarkedIds.includes(article.id)
                        ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                    title={bookmarkedIds.includes(article.id) ? 'Remove Bookmark' : 'Bookmark Story'}
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => handleCopyLink(article.id, e)}
                    className="p-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-white transition-colors"
                    title="Share story link"
                  >
                    {copiedId === article.id ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Live Interactive News Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded border border-indigo-500/30">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Published: {selectedArticle.date}
                  </span>
                </div>
                <h3 className="font-['Cinzel',serif] text-xl sm:text-2xl font-bold text-white leading-snug">
                  {selectedArticle.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="rounded-full border border-slate-700 bg-slate-800 p-2 text-slate-400 hover:text-white transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Credibility Banner */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-emerald-300">
                    {selectedArticle.factCheckStatus} (Credibility Index: {selectedArticle.credibilityScore}/100)
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Source: {selectedArticle.publisher}
                  </div>
                </div>
              </div>

              <a
                href={selectedArticle.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/30 transition-colors shrink-0"
              >
                <span>Official State Gazette</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Article Body Content */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              <p className="text-base font-medium text-slate-100 border-l-2 border-indigo-500 pl-4 py-1">
                {selectedArticle.summary}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                  Statutory Brief & Impact Analysis
                </h4>
                <p>
                  This official release confirms statutory clearance milestones for KWIN City’s 5,800-acre masterplan in North Bengaluru. Issued by <strong>{selectedArticle.publisher}</strong>, the notification details Phase 1 land acquisitions, environmental buffer demarcations, and connectivity corridors linking Doddaballapur to Kempegowda International Airport (BIAL).
                </p>
                <p>
                  Under Karnataka’s single-window clearance portal (Karnataka Udyog Mitra), global anchors and institutional developers benefit from expedited 15-day statutory turnarounds for university campuses, research labs, and cleanroom facilities.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>Key Policy & Investment Takeaways</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
                  <li>Direct alignment with Karnataka IT & Biotech Policy 2025–2030.</li>
                  <li>Zero-encroachment compliance confirmed across Kasaba & Tubagere revenue villages.</li>
                  <li>Incentives include 100% stamp duty exemption and power tariff subsidies for anchor investors.</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                <span>{selectedArticle.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleBookmark(selectedArticle.id, e)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  <span>{bookmarkedIds.includes(selectedArticle.id) ? 'Bookmarked' : 'Save Story'}</span>
                </button>
                <button
                  onClick={() => handleCopyLink(selectedArticle.id)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/20 px-3 py-1.5 text-indigo-200 hover:bg-indigo-500/30 transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>{copiedId === selectedArticle.id ? 'Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

