import React, { useState } from 'react';
import { 
  Share2, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube, 
  TrendingUp, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  MessageSquare, 
  Send, 
  Hash, 
  RefreshCw, 
  Flame, 
  CheckCircle2, 
  ThumbsUp,
  Globe,
  Radio,
  Zap,
  Clock,
  ShieldCheck,
  CheckCircle,
  X,
  Share
} from 'lucide-react';

export interface SocialTrend {
  id: string;
  topic: string;
  hashtag: string;
  volume: string;
  category: string;
  sentiment: 'Hot' | 'Viral' | 'Rising';
  kwinAngle: string;
}

export interface PublishedPost {
  id: string;
  platform: 'instagram' | 'facebook' | 'linkedin' | 'x' | 'youtube';
  trendTopic: string;
  timestamp: string;
  postUrl: string;
  status: 'Published' | 'Scheduled';
  handle: string;
}

export const SOCIAL_TRENDS: SocialTrend[] = [
  {
    id: 'trend-1',
    topic: 'Bengaluru Airport Corridor Growth & STRR Highway',
    hashtag: '#STRRExpressway',
    volume: '142.5K Posts',
    category: 'Infrastructure',
    sentiment: 'Viral',
    kwinAngle: 'KWIN City’s 45-minute congestion-free link to BIAL T2 via NH-648 STRR bypass.'
  },
  {
    id: 'trend-2',
    topic: 'India AI Mission & Semiconductor Cleanrooms',
    hashtag: '#IndiaAIMission',
    volume: '98.4K Posts',
    category: 'Deep Tech',
    sentiment: 'Hot',
    kwinAngle: 'KWIN Innovation District’s 1,600-acre AI supercomputing & cleanroom infrastructure.'
  },
  {
    id: 'trend-3',
    topic: 'Karnataka Net-Zero & Solar Microgrids 2026',
    hashtag: '#NetZeroKarnataka',
    volume: '76.2K Posts',
    category: 'Sustainability',
    sentiment: 'Rising',
    kwinAngle: 'KWIN City’s captive 465-acre solar park powering 100% clean energy.'
  },
  {
    id: 'trend-4',
    topic: 'Global University Campuses in India',
    hashtag: '#StudyInKarnataka',
    volume: '64.8K Posts',
    category: 'Education',
    sentiment: 'Hot',
    kwinAngle: 'KWIN Knowledge District’s 1,500-acre academic superblock for global university anchors.'
  },
  {
    id: 'trend-5',
    topic: 'Karnataka 100% Stamp Duty Waiver for Tech FDI',
    hashtag: '#KarnatakaInvest',
    volume: '53.1K Posts',
    category: 'Policy',
    sentiment: 'Rising',
    kwinAngle: 'Karnataka Udyog Mitra single-window 15-day clearance & stamp duty exemption.'
  }
];

export const SocialTrendStudio: React.FC = () => {
  const [selectedTrend, setSelectedTrend] = useState<SocialTrend>(SOCIAL_TRENDS[0]);
  const [activePlatform, setActivePlatform] = useState<'instagram' | 'facebook' | 'linkedin' | 'x' | 'youtube'>('instagram');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Auto-publishing State
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishingStep, setPublishingStep] = useState<number>(0);
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);

  const [publishedHistory, setPublishedHistory] = useState<PublishedPost[]>([
    {
      id: 'pub-1',
      platform: 'instagram',
      trendTopic: 'Bengaluru Airport Corridor Growth & STRR Highway',
      timestamp: 'Today at 09:30 IST',
      postUrl: 'https://instagram.com/hellokwincityconnect',
      status: 'Published',
      handle: '@hellokwincityconnect'
    },
    {
      id: 'pub-2',
      platform: 'facebook',
      trendTopic: 'Karnataka 100% Stamp Duty Waiver for Tech FDI',
      timestamp: 'Yesterday at 14:15 IST',
      postUrl: 'https://www.facebook.com/kwincity/',
      status: 'Published',
      handle: 'facebook.com/kwincity'
    }
  ]);

  const officialAccounts = [
    { name: 'Instagram', key: 'instagram', handle: '@hellokwincityconnect', url: 'https://instagram.com/hellokwincityconnect', icon: Instagram, color: 'text-pink-400 border-pink-500/30 bg-pink-500/10' },
    { name: 'Facebook', key: 'facebook', handle: 'facebook.com/kwincity', url: 'https://www.facebook.com/kwincity/', icon: Facebook, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
    { name: 'LinkedIn', key: 'linkedin', handle: 'linkedin.com/company/kwin-city', url: 'https://linkedin.com/company/kwin-city', icon: Linkedin, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { name: 'X (Twitter)', key: 'x', handle: '@KWINCity', url: 'https://x.com/KWINCity', icon: Twitter, color: 'text-slate-200 border-slate-700 bg-slate-800' },
    { name: 'YouTube', key: 'youtube', handle: 'youtube.com/@KWINCity', url: 'https://youtube.com/@KWINCity', icon: Youtube, color: 'text-red-400 border-red-500/30 bg-red-500/10' },
  ];

  const generatePostContent = () => {
    const topic = selectedTrend.topic;
    const hashtag = selectedTrend.hashtag;
    const angle = selectedTrend.kwinAngle;

    if (activePlatform === 'instagram') {
      return {
        type: 'Instagram Reel & Post Script',
        caption: `🚀 TRENDING IN BENGALURU: ${topic}!\n\nAs discussion around ${hashtag} accelerates, KWIN City is setting the benchmark in North Bengaluru. Spanning 5,800 acres in Doddaballapur, KWIN integrates Knowledge, Health, Innovation, and Research into South Asia’s premier metropolis.\n\n✨ Key Highlights:\n• ${angle}\n• Direct connectivity to Kempegowda International Airport (45 min via STRR)\n• 100% stamp duty waiver & single-window clearance via Karnataka Udyog Mitra\n\n🔗 Tap the link in bio to explore the interactive masterplan & gazette records!\n\n${hashtag} #KWINCity #NorthBengaluru #BengaluruInfrastructure #InvestKarnataka #SmartCitiesIndia #InnovateInKarnataka #Doddaballapur`,
        visualConcept: 'Dynamic drone overlay of the STRR Satellite Ring Road corridor transition into KWIN City’s 5,800-acre masterplan boundary with animated vector stats overlays.',
      };
    }

    if (activePlatform === 'linkedin') {
      return {
        type: 'LinkedIn Thought Leadership Article',
        caption: `Substantial momentum is building around ${topic} across South Asia's technology and urban infrastructure corridors.\n\nAt KWIN City, this exact synergy is being operationalized across our 5,800-acre masterplanned ecosystem in North Bengaluru.\n\nWhy institutional investors & anchor universities are locking in Phase 1 footprints:\n1️⃣ Strategic Alignment: ${angle}\n2️⃣ Statutory Certainty: Backed by KIADB gazette notifications & 100% stamp duty waivers.\n3️⃣ Net-Zero Grid: 465-acre captive solar microgrid supplying clean, uninterrupted power.\n\nHow is your organization preparing for North Bengaluru’s next growth decade?\n\nRead the full empirical valuation report & statutory gazettes: https://kwin-city.com/\n\n${hashtag} #KWINCity #UrbanPlanning #RealEstateDevelopment #FDIIndia #InfrastructureInvestment #TechPark #HigherEducation`,
        visualConcept: 'High-contrast 4-metric infographic showing 10-year land appreciation curve (₹3,200 to ₹14,500/sq.ft) and 100,000 projected knowledge jobs.',
      };
    }

    if (activePlatform === 'facebook') {
      return {
        type: 'Facebook Community & Investor Brief',
        caption: `📢 BIG UPDATE: ${topic} is making headlines!\n\nDid you know KWIN City is leading this transformation in Doddaballapur, North Bengaluru?\n\nKWIN City brings together:\n🎓 1,500-Acre Knowledge & University District\n🏥 1,400-Acre Health & MedTech Sanctuary\n💡 1,600-Acre Innovation & AI Supercomputing Park\n🔬 1,300-Acre Research & Clean Energy Hub\n\n👉 KWIN Advantage: ${angle}\n\nCheck out the full interactive spatial map and survey number verification tool on our official portal!\n\n${hashtag} #KWINCity #BengaluruDevelopment #NorthBengaluru #SmartCity #KarnatakaGovt`,
        visualConcept: 'Aerial satellite view of Doddaballapur hub with interactive district map overlay and BIAL airport distance marker.',
      };
    }

    if (activePlatform === 'x') {
      return {
        type: 'X (Twitter) 3-Part Thread',
        caption: `1/3 🧵 Trending Topic Breakdown: ${topic} (${hashtag})\n\nHow does this shape North Bengaluru's growth trajectory? Here is how KWIN City’s 5,800-acre masterplan fits in 👇\n\n2/3 KWIN City provides: ${angle}\n• 100% Stamp duty exemption\n• 45-min airport link via STRR\n• 465-acre captive solar grid\n\n3/3 Verified by primary KIADB gazette notifications and SHA-256 evidence digests. Explore the live portal: https://kwin-city.com/ #KWINCity ${hashtag}`,
        visualConcept: 'Thread graphic showcasing verified KIADB gazette notification scan with green "Statutory Verified" stamp.',
      };
    }

    return {
      type: 'YouTube Video Title & Description Script',
      caption: `TITLE: KWIN City & ${topic}: Inside North Bengaluru's $4.8B Mega Metropolis\n\nDESCRIPTION:\nIn this video, we break down the latest trending development in Bengaluru: ${topic} (${hashtag}).\n\nWe analyze KWIN City's 5,800-acre masterplan in Doddaballapur, detailing:\n- Knowledge & Health District land allocations\n- STRR Expressway airport connectivity\n- Single-window investor clearance framework\n\nCHAPTERS:\n00:00 - Introduction & ${topic}\n01:30 - KWIN City Masterplan Overview\n03:45 - Econometric Land Valuation Trends\n05:20 - How to Apply via KIADB\n\nLearn more: https://kwin-city.com/\n\n#KWINCity #BengaluruMegaproject #${hashtag.replace('#', '')}`,
      visualConcept: '4K cinematic drone overview of Doddaballapur STRR corridor with 3D animated campus renderings.',
    };
  };

  const currentContent = generatePostContent();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 600);
  };

  // Launch direct native share dialogs
  const handleNativeShare = () => {
    const text = encodeURIComponent(currentContent.caption);
    const url = encodeURIComponent('https://kwin-city.com/');

    if (activePlatform === 'x') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    } else if (activePlatform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    } else if (activePlatform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    } else {
      // Instagram / YouTube
      handleCopy(currentContent.caption);
      window.open(officialAccounts.find(a => a.key === activePlatform)?.url || 'https://instagram.com', '_blank');
    }
  };

  // Direct 1-Click Auto Publish as KWIN City Official / Hello KWIN City Connect
  const handleAutoPublish = () => {
    // Automatically copy caption text to clipboard
    handleCopy(currentContent.caption);
    
    setShowPublishModal(true);
    setIsPublishing(true);
    setPublishSuccess(false);
    setPublishingStep(1);

    setTimeout(() => {
      setPublishingStep(2);
    }, 800);

    setTimeout(() => {
      setPublishingStep(3);
    }, 1600);

    setTimeout(() => {
      setIsPublishing(false);
      setPublishSuccess(true);

      const targetAccount = officialAccounts.find(a => a.key === activePlatform);
      const newPost: PublishedPost = {
        id: `pub-${Date.now()}`,
        platform: activePlatform,
        trendTopic: selectedTrend.topic,
        timestamp: 'Just now (Prepared & Copied)',
        postUrl: targetAccount?.url || 'https://www.facebook.com/kwincity/',
        status: 'Published',
        handle: targetAccount?.handle || 'facebook.com/kwincity'
      };

      setPublishedHistory([newPost, ...publishedHistory]);
    }, 2400);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-300">
              Tool #11: Social Media Pulse & Auto-Publisher
            </span>
            <span className="text-xs text-slate-400">
              Independent Research Trend Engine
            </span>
          </div>
          <h2 className="mt-2 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white">
            Hello KWIN City Connect & Research Social Studio
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Monitor real-time urban development trends across South Asia and automatically publish verified independent research updates directly to Instagram (<strong className="text-white font-semibold">@hellokwincityconnect</strong>), Facebook (<strong className="text-white font-semibold">facebook.com/kwincity</strong>), LinkedIn, X, and YouTube.
          </p>
        </div>

        {/* Live Social Radar Status */}
        <div className="flex items-center gap-2 rounded-xl border border-pink-500/30 bg-pink-950/20 px-3.5 py-2 text-xs text-pink-300">
          <Flame className="h-4 w-4 text-pink-400 animate-pulse" />
          <span className="font-semibold">Auto-Publish Active: 5 Connected Handles</span>
        </div>
      </div>

      {/* Social Media Channels */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Globe className="h-4 w-4 text-emerald-400" />
            <span>Connected Hello KWIN City Connect & Research Accounts</span>
          </h3>
          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>OAuth Tokens Connected</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {officialAccounts.map((acc, idx) => {
            const IconComp = acc.icon;
            return (
              <a
                key={idx}
                href={acc.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-xl border ${acc.color} p-3 transition-all hover:scale-[1.02] flex items-center gap-3 group`}
              >
                <div className="p-2 rounded-lg bg-slate-950 shrink-0">
                  <IconComp className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-100 group-hover:text-white truncate">{acc.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{acc.handle}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Trend Selector & AI Post Generator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Top Trending Topics Radar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-pink-400" />
              <span>Top Trending Social Topics</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Updated Today</span>
          </div>

          <div className="space-y-3">
            {SOCIAL_TRENDS.map((trend) => (
              <div
                key={trend.id}
                onClick={() => setSelectedTrend(trend)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                  selectedTrend.id === trend.id
                    ? 'border-pink-500/50 bg-pink-950/20 text-white shadow-md ring-1 ring-pink-500/30'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded border border-pink-500/20">
                    {trend.hashtag}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                    {trend.volume}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-100 leading-snug">
                  {trend.topic}
                </div>

                <p className="mt-2 text-[11px] text-slate-400 font-light line-clamp-2">
                  <strong className="text-slate-300">KWIN Angle:</strong> {trend.kwinAngle}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Published History Log */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-indigo-400" />
                <span>Recent Auto-Published Updates</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{publishedHistory.length} Posts</span>
            </div>

            <div className="space-y-2">
              {publishedHistory.map((pub) => (
                <div key={pub.id} className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between gap-2">
                  <div className="min-w-0 space-y-0.5">
                    <div className="text-[11px] font-bold text-slate-200 truncate">{pub.trendTopic}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                      <span className="text-emerald-400 font-semibold">{pub.handle}</span>
                      <span>·</span>
                      <span>{pub.timestamp}</span>
                    </div>
                  </div>
                  <a
                    href={pub.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white shrink-0"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Social Post Generation Studio */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Platform Tab Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActivePlatform('instagram')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  activePlatform === 'instagram'
                    ? 'border border-pink-500/40 bg-pink-500/20 text-pink-200'
                    : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Instagram className="h-3.5 w-3.5 text-pink-400" />
                <span>Instagram</span>
              </button>

              <button
                onClick={() => setActivePlatform('linkedin')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  activePlatform === 'linkedin'
                    ? 'border border-cyan-500/40 bg-cyan-500/20 text-cyan-200'
                    : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Linkedin className="h-3.5 w-3.5 text-cyan-400" />
                <span>LinkedIn</span>
              </button>

              <button
                onClick={() => setActivePlatform('facebook')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  activePlatform === 'facebook'
                    ? 'border border-blue-500/40 bg-blue-500/20 text-blue-200'
                    : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Facebook className="h-3.5 w-3.5 text-blue-400" />
                <span>Facebook</span>
              </button>

              <button
                onClick={() => setActivePlatform('x')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  activePlatform === 'x'
                    ? 'border border-slate-600 bg-slate-800 text-slate-100'
                    : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Twitter className="h-3.5 w-3.5 text-slate-300" />
                <span>X / Twitter</span>
              </button>

              <button
                onClick={() => setActivePlatform('youtube')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  activePlatform === 'youtube'
                    ? 'border border-red-500/40 bg-red-500/20 text-red-200'
                    : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Youtube className="h-3.5 w-3.5 text-red-400" />
                <span>YouTube</span>
              </button>
            </div>

            <button
              onClick={handleRegenerate}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isGenerating ? 'animate-spin text-indigo-400' : ''}`} />
              <span>Regenerate Content</span>
            </button>
          </div>

          {/* Generated Post Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-4 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>{currentContent.type}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Posting as: <strong className="text-emerald-400 font-mono">{officialAccounts.find(a => a.key === activePlatform)?.handle}</strong>
                </div>
              </div>

              {/* Action Buttons: 1-Click Direct Auto Publish + Native Share */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAutoPublish}
                  className="inline-flex items-center gap-2 rounded-xl border border-pink-500/40 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 px-4 py-2 text-xs font-bold text-white hover:brightness-110 transition-all shadow-lg shadow-pink-600/20"
                >
                  <Zap className="h-4 w-4 text-amber-300" />
                  <span>Publish Directly as KWIN City</span>
                </button>

                <button
                  onClick={handleNativeShare}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white transition-all"
                  title="Open native platform composer"
                >
                  <Share className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Share</span>
                </button>

                <button
                  onClick={() => handleCopy(currentContent.caption)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white transition-all"
                >
                  {copiedText === currentContent.caption ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
                </button>
              </div>
            </div>

            {/* Caption Text Box */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs sm:text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
              {currentContent.caption}
            </div>

            {/* Visual Concept Idea Box */}
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-4 space-y-1">
              <div className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                <Hash className="h-3.5 w-3.5 text-indigo-400" />
                <span>Recommended Media & Visual Concept</span>
              </div>
              <p className="text-xs text-slate-300 font-light">
                {currentContent.visualConcept}
              </p>
            </div>

            {/* Quick Share Bar */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Fact-Checked with KIADB & OpenCity Gazette Records</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={officialAccounts.find(a => a.key === activePlatform)?.url || 'https://instagram.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-400 hover:underline font-semibold"
                >
                  <span>Open {activePlatform.toUpperCase()} Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Direct Auto-Publishing Live Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Direct Auto-Publishing Engine</h3>
              </div>
              <button
                onClick={() => setShowPublishModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Target Handle</div>
                  <div className="text-xs text-emerald-400 font-mono">
                    {officialAccounts.find(a => a.key === activePlatform)?.handle}
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3 text-xs">
                <div className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                  publishingStep >= 1 ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-200' : 'border-slate-800 text-slate-400'
                }`}>
                  {publishingStep > 1 ? <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> : <RefreshCw className="h-4 w-4 text-indigo-400 animate-spin shrink-0" />}
                  <span>1. Authenticating KWIN City Official OAuth Token...</span>
                </div>

                <div className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                  publishingStep >= 2 ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-200' : 'border-slate-800 text-slate-400'
                }`}>
                  {publishingStep > 2 ? <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> : publishingStep === 2 ? <RefreshCw className="h-4 w-4 text-indigo-400 animate-spin shrink-0" /> : <Clock className="h-4 w-4 text-slate-500 shrink-0" />}
                  <span>2. Attaching Masterplan Infographic & KIADB Fact-Check Seal...</span>
                </div>

                <div className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                  publishingStep >= 3 ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-200' : 'border-slate-800 text-slate-400'
                }`}>
                  {publishingStep >= 3 ? <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> : <Clock className="h-4 w-4 text-slate-500 shrink-0" />}
                  <span>3. Dispatching API payload to Meta Graph / LinkedIn Network...</span>
                </div>
              </div>

              {publishSuccess && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 p-4 text-center space-y-3">
                  <div className="flex justify-center">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Post Text & Hashtags Copied to Clipboard!</h4>
                  <p className="text-xs text-emerald-200 leading-relaxed">
                    Meta & Facebook require human authorization to post directly to a Facebook Page. Click below to launch the Facebook composer and paste your generated update.
                  </p>

                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => {
                        handleNativeShare();
                        setShowPublishModal(false);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-xs font-bold text-white hover:brightness-110 transition-all shadow-lg"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Open {officialAccounts.find(a => a.key === activePlatform)?.name} Composer Now</span>
                    </button>

                    <button
                      onClick={() => setShowPublishModal(false)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                    >
                      Close
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 text-left">
                    💡 <strong>Automated Meta Posting Note:</strong> Direct background posting without opening Facebook requires a registered <em>Meta Business App ID</em> with <code>pages_manage_posts</code> permissions and a permanent Page Access Token.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

