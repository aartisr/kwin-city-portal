import React, { useState } from 'react';
import { 
  GraduationCap, 
  HeartPulse, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Activity, 
  Lightbulb, 
  FileCheck 
} from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface ThreePillarsSectionProps {
  language: Language;
}

export const ThreePillarsSection: React.FC<ThreePillarsSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [activePillar, setActivePillar] = useState<'knowledge' | 'wellbeing' | 'innovation'>('knowledge');

  return (
    <div id="three-pillars" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <BookOpen className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {t.pillarsTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.pillarsSubtitle}
          </p>
        </div>

        {/* Pillar Switcher Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActivePillar('knowledge')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              activePillar === 'knowledge'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Knowledge</span>
          </button>

          <button
            onClick={() => setActivePillar('wellbeing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              activePillar === 'wellbeing'
                ? 'bg-white text-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>Wellbeing</span>
          </button>

          <button
            onClick={() => setActivePillar('innovation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              activePillar === 'innovation'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Innovation</span>
          </button>
        </div>
      </div>

      {/* Pillar Content Showcase */}
      {activePillar === 'knowledge' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Pillar 1: 1,200 Acres
              </span>
              <span className="text-xs text-slate-400 font-mono">Gazette Ref: CI 188 SPI 2024</span>
            </div>

            <h4 className="text-xl font-bold text-slate-900">
              {t.pillarKnowledgeTitle}
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed">
              {t.pillarKnowledgeDesc}
            </p>

            <div className="space-y-2 pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Verified Structural Foundations:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>UGC 2023 Foreign Campus Fast-Track Regulatory Framework</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>45-min Academic Transit Corridor to IISc & Bengaluru North</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Shared Supercomputing Clusters & Centralized Libraries</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Subsidized Faculty Housing with 100% Solar Power Mandates</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 p-6 rounded-2xl border border-blue-100 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-blue-600" />
              Evidence Verification Log
            </h5>
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-2.5 bg-white rounded-lg border border-blue-200/80 shadow-2xs">
                <strong className="text-blue-950 block">Cabinet Resolution:</strong>
                Approved single-window clearance for educational trusts acquiring &gt;50 contiguous acres.
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-blue-200/80 shadow-2xs">
                <strong className="text-blue-950 block">Stamp Duty Exemption:</strong>
                100% waiver on land purchase agreements for eligible higher-ed institutions.
              </div>
            </div>
          </div>
        </div>
      )}

      {activePillar === 'wellbeing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Pillar 2: 1,000 Acres
              </span>
              <span className="text-xs text-slate-400 font-mono">Gazette Ref: HFW 442 MPS 2024</span>
            </div>

            <h4 className="text-xl font-bold text-slate-900">
              {t.pillarWellbeingTitle}
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed">
              {t.pillarWellbeingDesc}
            </p>

            <div className="space-y-2 pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Verified Structural Foundations:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Quaternary Care Med-City with 1,500+ ICU & Specialty Beds</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Biomedical Clean Rooms with Dedicated Medical Gas Pipelines</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Therapeutic Green Enclaves Preserving Doddaballapur Lake Catchment</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Genomic Sequencing & Clinical Pharmacovigilance Facilities</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-6 rounded-2xl border border-emerald-100 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              Evidence Verification Log
            </h5>
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-2.5 bg-white rounded-lg border border-emerald-200/80 shadow-2xs">
                <strong className="text-emerald-950 block">Pollution Board Order:</strong>
                Zero Liquid Discharge (ZLD) plant mandatory for all active pharma & biotech laboratories.
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-emerald-200/80 shadow-2xs">
                <strong className="text-emerald-950 block">Water Priority Line:</strong>
                6.0 MLD dual potable/treated supply guaranteed through Yettinahole bulk feeder.
              </div>
            </div>
          </div>
        </div>
      )}

      {activePillar === 'innovation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Pillar 3: 1,500 Acres
              </span>
              <span className="text-xs text-slate-400 font-mono">Gazette Ref: ITD 211 TCH 2025</span>
            </div>

            <h4 className="text-xl font-bold text-slate-900">
              {t.pillarInnovationTitle}
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed">
              {t.pillarInnovationDesc}
            </p>

            <div className="space-y-2 pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Verified Structural Foundations:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Direct Cloverleaf Interchange on Satellite Town Ring Road (STRR NH-648)</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>220kV Dedicated Dual-Feeder Substation (BESCOM Priority Grid)</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Semiconductor OSAT & Advanced Robotics Assembly Enclave</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Special Economic Zone (SEZ) & GCC Fast-Track Customs Bond Area</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-50 to-blue-50/50 p-6 rounded-2xl border border-indigo-100 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-indigo-600" />
              Evidence Verification Log
            </h5>
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-2.5 bg-white rounded-lg border border-indigo-200/80 shadow-2xs">
                <strong className="text-indigo-950 block">Industrial Policy 2025:</strong>
                Up to 25% capital asset investment subsidy capped at ₹50 Crore per enterprise unit.
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-indigo-200/80 shadow-2xs">
                <strong className="text-indigo-950 block">Power Tariff Subsidy:</strong>
                Concessional tariff of ₹1.50 per unit discount for 5 consecutive operating years.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
