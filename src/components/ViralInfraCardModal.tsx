import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  Share2, 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  Layers, 
  Download, 
  Award, 
  ExternalLink,
  MessageCircle,
  Twitter,
  Linkedin
} from 'lucide-react';

interface ViralInfraCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ViralInfraCardModal: React.FC<ViralInfraCardModalProps> = ({ isOpen, onClose }) => {
  const [cardType, setCardType] = useState<'investor' | 'gazette' | 'spatial' | 'citation'>('investor');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const cardData = {
    investor: {
      tag: 'REAL ESTATE & LAND VALUATION SNAPSHOT',
      headline: 'KWIN City Land CAGR Benchmark: +14.2% YoY (2020–2026)',
      highlight: '₹3.95 Cr / Acre (2026 Base) → ₹6.75 Cr / Acre (2030 Proj)',
      bullets: [
        '📍 Location: Doddaballapur Hub, North Bengaluru (~45 mins to BIAL)',
        '🏛️ Masterplan Area: 5,800 Acres across 5 Special Economic Zones',
        '🔬 Authors: Aarti S Ravikumar & Baja Associates Research Desk'
      ],
      color: 'from-emerald-500/20 via-slate-900 to-slate-950 border-emerald-500/40 text-emerald-300'
    },
    gazette: {
      tag: 'STATUTORY KIADB GAZETTE SUMMARY',
      headline: 'Single-Window Clearance SLA: 45 Days Guaranteed',
      highlight: 'KIADB Phase 1 Land Acquisition Notifications Cleared',
      bullets: [
        '📜 Authority: Karnataka Industrial Areas Development Board (KIADB)',
        '⚖️ Environmental Clearance: SEIAA Category 7(a) Approved',
        '🔍 Verification Portal: https://kwin-city.com/#regulatory'
      ],
      color: 'from-cyan-500/20 via-slate-900 to-slate-950 border-cyan-500/40 text-cyan-300'
    },
    spatial: {
      tag: '5,800-ACRE SPATIAL MASTERPLAN MAP',
      headline: 'Knowledge, MedCity & AI Innovation Corridors',
      highlight: 'IISc Extension + 465-Acre Solar Buffer Allocated',
      bullets: [
        '🎓 Knowledge Hub: 1,450 Acres | 🏥 MedCity: 1,100 Acres',
        '⚡ AI Tech Hub: 1,250 Acres | 🌿 Green Housing: 1,200 Acres',
        '🛰️ Sentinel-2 Radar Satellite Monitoring Active'
      ],
      color: 'from-indigo-500/20 via-slate-900 to-slate-950 border-indigo-500/40 text-indigo-300'
    },
    citation: {
      tag: 'RESEARCH CITATION & PROVENANCE',
      headline: 'KWIN City Independent Spatial Intelligence Portal',
      highlight: 'Authored by Aarti S Ravikumar & Baja Associates',
      bullets: [
        '🌐 Official Portal: https://kwin-city.com/',
        '🛡️ Cryptographic Vault: SHA-256 Fact Verification Active',
        '📲 Connect Desk: Hello KWIN City Connect (@hellokwincityconnect)'
      ],
      color: 'from-amber-500/20 via-slate-900 to-slate-950 border-amber-500/40 text-amber-300'
    }
  };

  const current = cardData[cardType];

  const shareText = `🏛️ KWIN City (Doddaballapur, North Bengaluru) Spatial Intelligence & Land Valuation Model:
${current.headline}
👉 ${current.highlight}
Research by Aarti S Ravikumar & Baja Associates
Explore: https://kwin-city.com/ #KWINCity #Bengaluru #RealEstate #UrbanPlanning`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://kwin-city.com/')}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Cinzel',serif]">
                Generate Viral Infra Card
              </h3>
              <p className="text-xs text-slate-400">
                Shareable infographic snapshot for LinkedIn, WhatsApp, X, and Research Digests.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Card Type Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['investor', 'gazette', 'spatial', 'citation'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setCardType(type)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all border ${
                cardType === type
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {type === 'investor' && '📈 Land Valuation'}
              {type === 'gazette' && '📜 KIADB Gazette'}
              {type === 'spatial' && '🗺️ 5,800-Acre Map'}
              {type === 'citation' && '🔬 Author Citation'}
            </button>
          ))}
        </div>

        {/* Visual Infographic Card Preview */}
        <div className={`p-6 sm:p-8 rounded-2xl border bg-gradient-to-br ${current.color} shadow-2xl space-y-4`}>
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800">
              {current.tag}
            </span>
            <span className="text-[10px] font-mono text-slate-400">kwin-city.com</span>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white font-['Cinzel',serif] leading-tight">
              {current.headline}
            </h4>
            <div className="mt-2 text-xs font-mono font-bold text-emerald-300 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/30">
              {current.highlight}
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-300 font-light pt-1">
            {current.bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Authored by Aarti S Ravikumar & Baja Associates</span>
            <span>Hello KWIN City Connect</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={shareWhatsApp}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={shareTwitter}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs font-bold text-white transition-all border border-slate-700"
            >
              <Twitter className="h-4 w-4 text-cyan-400" />
              <span>X (Twitter)</span>
            </button>

            <button
              onClick={shareLinkedIn}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs font-bold text-white transition-all border border-slate-700"
            >
              <Linkedin className="h-4 w-4 text-blue-400" />
              <span>LinkedIn</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-bold text-slate-950 hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-slate-950" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-slate-950" />
                <span>Copy Shareable Text</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
