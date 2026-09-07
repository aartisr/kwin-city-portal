import React, { useState } from 'react';
import { X, Copy, Check, Printer, FileText } from 'lucide-react';
import { TARGET_WEBSITE, EVALUATION_CATEGORIES } from '../data/evaluationData';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  compositeScore: number;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  compositeScore,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const reportText = `=====================================================
EXECUTIVE EVALUATION REPORT: kwin-city.com
Standardized 1 to 10 Multi-Pillar Rating
=====================================================
Target URL: https://kwin-city.com
Classification: Independent Open-Access Intelligence Repository
Subject: KWIN City (Knowledge, Wellbeing & Innovation City), Karnataka, India
Scope: 5,800 Acres | ₹40,000 Cr Outlay | Doddaballapur-Dabaspet Corridor
Audit Date: September 2026

OVERALL RATING: ${compositeScore.toFixed(1)} / 10.0 (Grade B+ / Very Strong Independent Platform)

EXECUTIVE VERDICT:
kwin-city.com is an exceptionally well-constructed, fact-checked civic intelligence
portal that systematically separates verified Karnataka Cabinet/KIADB notifications
from promotional real-estate marketing. It achieves high marks for technical speed,
non-commercial objectivity, and environmental critique, but requires a visible non-governmental
header disclaimer and native Kannada localization to achieve top-tier status.

CATEGORY BREAKDOWN (1 to 10 Scale):
1. Content Credibility & Evidence Rigor: 8.4 / 10
   - Strengths: Primary gazette citations, verified decision tracking, zero broker lead-gen.
   - Areas for Improvement: More statistical models for secondary economic multipliers.

2. Transparency & Official Status Clarity: 6.8 / 10
   - Strengths: Honest open-access civil research statement in footer and about pages.
   - Areas for Improvement: Needs immediate header badge stating it is NOT an official state organ.

3. Information Architecture, UI & Web Speed: 8.3 / 10
   - Strengths: Sub-1.2s page load, clean Three-Pillar navigation, zero invasive popups.
   - Areas for Improvement: Static layout diagrams instead of dynamic vector GIS maps.

4. Project Realism & Infrastructure Feasibility: 7.4 / 10
   - Strengths: Objective analysis of water security, STRR highway timeline, and transit sheds.
   - Areas for Improvement: Expand on Doddaballapur taluk land acquisition legal notices.

5. Sustainability & Ecological Framework: 8.5 / 10
   - Strengths: In-depth tracking of lake cascades (kere network) and green buffer zones.

6. Investor, Talent & Enterprise Utility: 8.1 / 10
   - Strengths: High utility for GCCs, universities, and healthcare conglomerates.

7. Language Inclusivity & Regional Accessibility: 6.2 / 10
   - Critical Deficiency: English-only; lacking native Kannada (ಕನ್ನಡ) for local landowners.

TOP 3 ACTIONABLE RECOMMENDATIONS TO REACH 9.5+ / 10:
1. Add Persistent Non-Governmental Header Banner (+0.5 pts)
2. Deploy Full Bilingual Kannada Language Toggle (+0.6 pts)
3. Embed Interactive Vector GIS Zoning Layer (+0.4 pts)

Generated via KWIN City Evaluation Suite
=====================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Executive Evaluation Brief (Print / Export)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-mono text-xs text-slate-700 bg-slate-50/50">
          <pre className="whitespace-pre-wrap leading-relaxed font-mono select-all bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            {reportText}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
