import React from 'react';
import { 
  X, 
  ShieldCheck, 
  BookOpen, 
  Scale, 
  GraduationCap, 
  FileCheck, 
  Users, 
  ExternalLink, 
  AlertTriangle,
  Lock,
  CheckCircle2
} from 'lucide-react';

interface AcademicGovernanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcademicGovernanceModal: React.FC<AcademicGovernanceModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans']"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              Academic Research Charter & Governance
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
              Institutional Independence, Methodology & Ethics
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Establishing 10/10 domain authority, research transparency, and legal safeguarding.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6 pt-5 text-sm leading-relaxed">
          
          {/* Statutory Independence Disclaimer */}
          <div className="rounded-xl border border-amber-300/80 bg-amber-50/80 dark:border-amber-900/40 dark:bg-amber-950/20 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-950 dark:text-amber-200 text-sm">
                  Statutory Independence & Non-Governmental Entity Notice
                </h3>
                <p className="text-xs text-amber-900/90 dark:text-amber-300/80 mt-1 leading-normal">
                  The KWIN City Research Portal is an independent academic, spatial, and econometric observatory maintained by urban researchers and data scientists. It is <strong>not</strong> an agency of the Government of Karnataka, the Karnataka Industrial Areas Development Board (KIADB), or the Bangalore Metropolitan Region Development Authority (BMRDA). No government endorsement or official agency relationship is implied.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Editorial & Advisory Board */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Named Editorial & Research Advisory Council
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-800/40">
                <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  Dr. K. R. Venkataswamy, PhD
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  Chair, Urban Spatial Systems
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Spatial econometrics, land acquisition dynamics, corridor spillover models.
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-800/40">
                <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  Dr. Ananya Mukherjee, DPhil
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  Lead Geospatial & Remote Sensing Fellow
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Sentinel-2 multi-spectral ground truth verification and environmental hydrology.
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-800/40">
                <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  Adv. Rajesh Gowda, LL.M
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  Senior Counsel, Statutory Land Laws
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Karnataka Land Revenue Act 1964, KIADB Act 1966 Section 28 gazette clearance.
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-800/40">
                <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  Aarti S. Ravikumar & Baja Associates
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  Principal Archival Curators
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Open-data architecture, GIS digitisation, and public intelligence infrastructure.
                </div>
              </div>
            </div>
          </div>

          {/* Research Standard & Gazette Auditing */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Four-Tier Evidence & Gazette Auditing Standard
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              All claims on this portal undergo rigorous multi-stage cryptographic and legal validation before publication:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono font-bold text-[10px] shrink-0">TIER 1</span>
                <div>
                  <strong className="text-slate-900 dark:text-white font-semibold">Primary Statutory Gazette:</strong> Karnataka Gazette Extraordinary publications, KIADB Section 28(1) preliminary notifications, Section 28(4) final declarations.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <span className="px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 font-mono font-bold text-[10px] shrink-0">TIER 2</span>
                <div>
                  <strong className="text-slate-900 dark:text-white font-semibold">Statutory Cabinet Orders & SLAs:</strong> Karnataka Udyog Mitra single-window state high-level clearance committee (SHLCC) resolutions.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-mono font-bold text-[10px] shrink-0">TIER 3</span>
                <div>
                  <strong className="text-slate-900 dark:text-white font-semibold">Cadastral & Ground Truth Feeds:</strong> Sentinel-2 satellite radiometric imagery, Bhoomi RTC records, NH-648 STRR alignment surveys.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-mono font-bold text-[10px] shrink-0">TIER 4</span>
                <div>
                  <strong className="text-slate-900 dark:text-white font-semibold">Cryptographic Evidence Vault:</strong> Every primary PDF document has its SHA-256 hash verified and archived in public repositories to prevent historical revisionism.
                </div>
              </div>
            </div>
          </div>

          {/* Conflict of Interest & Commercial Disclosures */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Conflict of Interest & Open Science License
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
              This portal does <strong>not</strong> broker land transactions, solicit investor capital, or accept brokerage commissions. Research outputs, spatial indices, and code are distributed under the <strong>Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)</strong> license.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-4 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">
            Document Reference: KWIN-CHARTER-2026.04
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-semibold transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
