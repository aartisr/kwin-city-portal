import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ExternalLink, 
  Building2, 
  Globe, 
  GraduationCap, 
  Activity, 
  UserCheck, 
  ArrowRight,
  ShieldCheck,
  Download
} from 'lucide-react';
import { REGULATORY_PERSONAS, REGULATORY_STEPS } from '../data/value-add-data';
import { RegulatoryStep } from '../types';

export const RegulatoryNavigator: React.FC = () => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(REGULATORY_PERSONAS[0].id);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const currentSteps = REGULATORY_STEPS[selectedPersonaId] || REGULATORY_STEPS['global-investor'];
  const currentPersona = REGULATORY_PERSONAS.find(p => p.id === selectedPersonaId) || REGULATORY_PERSONAS[0];

  const totalDays = currentSteps.reduce((acc, step) => acc + step.timelineDays, 0);
  const completedCount = currentSteps.filter(s => completedSteps[s.id]).length;
  const progressPct = Math.round((completedCount / currentSteps.length) * 100);

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              Tool #3: Statutory Regulatory Navigator
            </span>
            <span className="text-xs text-slate-400">
              Karnataka Single-Window Clearances & Statutory Compliance
            </span>
          </div>
          <h2 className="mt-2 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white">
            Single-Window Clearance & Approval Blueprint
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Interactive statutory checklists customized by stakeholder persona, detailing required documents, 
            official department portals, and statutory SLAs.
          </p>
        </div>

        {/* Progress Bar Badge */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-slate-400">Approval Readiness</div>
            <div className="text-base font-bold text-cyan-400 font-mono">{progressPct}% Complete</div>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-cyan-500/30 flex items-center justify-center font-bold text-xs text-cyan-300">
            {completedCount}/{currentSteps.length}
          </div>
        </div>
      </div>

      {/* Persona Selection Strip */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {REGULATORY_PERSONAS.map((persona) => {
          const isSelected = persona.id === selectedPersonaId;
          return (
            <button
              key={persona.id}
              onClick={() => setSelectedPersonaId(persona.id)}
              className={`flex flex-col text-left rounded-xl p-3.5 transition-all border ${
                isSelected
                  ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-500/30 shadow-lg'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-100">{persona.label}</span>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {persona.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Steps Timeline & Department Information */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Steps List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Statutory Sequence ({currentSteps.length} Total Steps)</span>
            <span className="font-mono">Estimated SLA: ~{totalDays} Working Days</span>
          </div>

          <div className="space-y-3">
            {currentSteps.map((step, idx) => {
              const isChecked = !!completedSteps[step.id];
              return (
                <div
                  key={step.id}
                  className={`rounded-xl border p-5 transition-all ${
                    isChecked
                      ? 'border-cyan-500/30 bg-cyan-950/20 text-slate-300'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleStep(step.id)}
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                          isChecked
                            ? 'border-cyan-400 bg-cyan-500 text-slate-950'
                            : 'border-slate-700 bg-slate-950 text-transparent hover:border-cyan-500'
                        }`}
                        title="Mark step completed"
                      >
                        <CheckCircle2 className="h-4 w-4 fill-current" />
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                            Step {step.stepNumber}: {step.category}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                            <Clock className="h-3 w-3 text-slate-400" /> ~{step.timelineDays} Days
                          </span>
                        </div>

                        <h4 className="mt-1.5 text-sm sm:text-base font-bold text-slate-100">
                          {step.title}
                        </h4>

                        <div className="mt-1 text-xs text-slate-400">
                          <span className="text-slate-500">Approving Body:</span> {step.authority}
                        </div>
                      </div>
                    </div>

                    <a
                      href={step.onlinePortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] text-cyan-300 hover:bg-slate-700 transition-colors"
                    >
                      <span>Portal Link</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  {/* Required Documents Matrix */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Mandatory Submission Dossier:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.requiredDocuments.map((doc, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 rounded-md bg-slate-950/60 px-2.5 py-1.5 text-xs text-slate-300">
                          <FileText className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Single-Window Concierge Info Box */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
            <h3 className="font-['Cinzel',serif] text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-cyan-400" />
              <span>Karnataka Single-Window Act</span>
            </h3>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed font-light">
              Under the <strong className="text-slate-100">Karnataka Industries (Facilitation) Act 2002 (Amended 2020)</strong>, all industrial projects with investments exceeding ₹15 Cr receive statutory deemed clearance if decisions are not delivered within prescribed SLAs.
            </p>

            <div className="mt-4 space-y-2.5 text-xs border-t border-slate-800 pt-4">
              <div className="flex justify-between text-slate-400">
                <span>Nodal Authority:</span>
                <span className="font-medium text-slate-200">Karnataka Udyog Mitra (KUM)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Deemed Approval SLA:</span>
                <span className="font-mono text-emerald-400 font-bold">30 Business Days</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Stamp Duty Exemption:</span>
                <span className="font-mono text-cyan-300">100% in Zone 3</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Power Tariff Rebate:</span>
                <span className="font-mono text-cyan-300">₹2.00 / unit for 5 Yrs</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <a
                href="https://kum.karnataka.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-600/20 py-2.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-600/30 transition-all"
              >
                <span>Access Official KUM Portal</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-400 leading-relaxed">
            <div className="font-semibold text-slate-200 mb-1">KIADB Fast-Track Allotment</div>
            Industrial and educational plots in KWIN City are leased on a 99-year lease-cum-sale basis with clear statutory freehold conversion provisions upon commercial operation.
          </div>

        </div>

      </div>

    </div>
  );
};
