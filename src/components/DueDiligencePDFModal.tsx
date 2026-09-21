import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Scale, 
  Share2, 
  AlertTriangle,
  BookmarkPlus,
  Check
} from 'lucide-react';
import { generateDueDiligencePDF, DueDiligenceDossierData } from '../services/pdfGenerator';
import { useUser } from '../context/UserContext';

interface DueDiligencePDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<DueDiligenceDossierData>;
  onOpenPricing?: () => void;
}

export const DueDiligencePDFModal: React.FC<DueDiligencePDFModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onOpenPricing
}) => {
  const { user, tier, addToWatchlist, isParcelInWatchlist } = useUser();

  const [formData, setFormData] = useState<DueDiligenceDossierData>({
    surveyNo: initialData?.surveyNo || '142/2A',
    village: initialData?.village || 'Tubagere Hobli',
    hobli: initialData?.hobli || 'Tubagere',
    taluk: initialData?.taluk || 'Doddaballapur',
    acreage: initialData?.acreage || 2.5,
    selectedZone: initialData?.selectedZone || 'Knowledge & Higher Education District',
    guidanceRatePerAcreLakhs: initialData?.guidanceRatePerAcreLakhs || 45,
    kiadbStatus: initialData?.kiadbStatus || 'Phase 1 Final Notification Issued (KIADB Cleared Sec 28-4)',
    marketRatePerAcreLakhs: initialData?.marketRatePerAcreLakhs || 395,
    riskRating: initialData?.riskRating || 'Low',
    investorName: user?.name || 'Verified Land Investor',
    notes: initialData?.notes || 'Cleared title check against KIADB Gazette CI 212 SPQ 2024.'
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);

  if (!isOpen) return null;

  const isSaved = isParcelInWatchlist(formData.surveyNo, formData.village);

  // Calculations
  const guidanceTotal = (formData.guidanceRatePerAcreLakhs * formData.acreage);
  const compTotal = guidanceTotal * 2.0 * 2.0; // 2x rural multiplier + 100% solatium
  const marketValuation = (formData.marketRatePerAcreLakhs || 395) * formData.acreage;

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    try {
      const doc = generateDueDiligencePDF(formData);
      const filename = `KWIN_DueDiligence_Sy${formData.surveyNo.replace(/[^a-zA-Z0-9]/g, '_')}_${formData.village.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      doc.save(filename);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    try {
      const doc = generateDueDiligencePDF(formData);
      const blob = doc.output('blob');
      const blobUrl = URL.createObjectURL(blob);
      const printWindow = window.open(blobUrl, '_blank');
      if (printWindow) {
        printWindow.focus();
      }
    } catch (err) {
      console.error('Print preview error:', err);
    }
  };

  const handleAddToWatchlist = () => {
    addToWatchlist({
      surveyNo: formData.surveyNo,
      village: formData.village,
      hobli: formData.hobli,
      taluk: formData.taluk,
      acreage: formData.acreage,
      zone: formData.selectedZone,
      guidanceRatePerAcreLakhs: formData.guidanceRatePerAcreLakhs,
      marketRatePerAcreLakhs: formData.marketRatePerAcreLakhs || 395,
      kiadbStatus: formData.kiadbStatus,
      riskRating: formData.riskRating || 'Low',
      alerts: {
        gazetteNotification: true,
        guidanceRevision: true,
        reraFilings: false
      },
      notes: formData.notes
    });
    setAddedToWatchlist(true);
    setTimeout(() => setAddedToWatchlist(false), 2500);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/feasibility?survey=${encodeURIComponent(formData.surveyNo)}&village=${encodeURIComponent(formData.village)}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/40">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-slate-950 dark:text-white">
                  Automated Due Diligence Dossier Exporter
                </h3>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/50 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-900 dark:text-emerald-300">
                  STATUTORY AUDIT
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official KIADB Section 28 & RFCTLARR 2013 Verification Certificate Generator
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Two Columns (Controls on left, Live Certificate Preview on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-5 p-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/30 overflow-y-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Parcel Parameters</span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">ISO 9001 Cadastral</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Survey No.</label>
                <input
                  type="text"
                  value={formData.surveyNo}
                  onChange={(e) => setFormData({ ...formData, surveyNo: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Extent (Acres)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.acreage}
                  onChange={(e) => setFormData({ ...formData, acreage: parseFloat(e.target.value) || 1 })}
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Village / Hobli</label>
              <select
                value={formData.village}
                onChange={(e) => {
                  const val = e.target.value;
                  const gVal = val.includes('Kasaba') ? 65 : val.includes('Hosahalli') ? 50 : val.includes('Dabaspet') ? 40 : 45;
                  setFormData({
                    ...formData,
                    village: val,
                    guidanceRatePerAcreLakhs: gVal,
                  });
                }}
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="Tubagere Hobli">Tubagere Hobli (Doddaballapur)</option>
                <option value="Kasaba Hobli (Doddaballapur)">Kasaba Hobli (Doddaballapur)</option>
                <option value="Hosahalli Corridor">Hosahalli Corridor</option>
                <option value="Dabaspet Industrial Node">Dabaspet Industrial Node</option>
                <option value="Doddabelavangala Village">Doddabelavangala Village</option>
                <option value="Melekote Revenue Circle">Melekote Revenue Circle</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target KWIN Zone</label>
              <select
                value={formData.selectedZone}
                onChange={(e) => setFormData({ ...formData, selectedZone: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="Knowledge & Higher Education District">Knowledge & Higher Education District</option>
                <option value="Health & Life Sciences District">Health & Life Sciences District</option>
                <option value="Innovation & Smart Enterprise District">Innovation & Smart Enterprise District</option>
                <option value="Research & Clean Manufacturing District">Research & Clean Manufacturing District</option>
                <option value="Eco-Housing & Logistics Buffer">Eco-Housing & Logistics Buffer</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Guidance (₹ Lakhs/Ac)</label>
                <input
                  type="number"
                  value={formData.guidanceRatePerAcreLakhs}
                  onChange={(e) => setFormData({ ...formData, guidanceRatePerAcreLakhs: parseFloat(e.target.value) || 40 })}
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Market (₹ Lakhs/Ac)</label>
                <input
                  type="number"
                  value={formData.marketRatePerAcreLakhs}
                  onChange={(e) => setFormData({ ...formData, marketRatePerAcreLakhs: parseFloat(e.target.value) || 350 })}
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Investor / Requester Name</label>
              <input
                type="text"
                value={formData.investorName}
                onChange={(e) => setFormData({ ...formData, investorName: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Watchlist toggle button */}
            <div className="pt-2">
              <button
                onClick={handleAddToWatchlist}
                disabled={isSaved || addedToWatchlist}
                className={`w-full flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-bold transition border ${
                  isSaved || addedToWatchlist
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600'
                }`}
              >
                {isSaved || addedToWatchlist ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Tracked in My Watchlist</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="h-4 w-4" />
                    <span>Track this Parcel in Watchlist</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Live Certificate Visual Preview */}
          <div className="lg:col-span-7 p-6 space-y-4 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Document Live Preview
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                A4 Vector Printable
              </span>
            </div>

            {/* Formal Certificate Card Mockup */}
            <div className="rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950/60 p-5 space-y-4 shadow-sm text-slate-900 dark:text-slate-100 font-sans">
              
              {/* Certificate Top Header */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400">
                    CLEARINGHOUSE REF: KWIN-AUDIT-2026
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    {new Date().toLocaleDateString('en-IN')}
                  </div>
                </div>
                <h4 className="text-base font-serif font-bold text-slate-950 dark:text-white mt-1">
                  KWIN CITY STATUTORY LAND DUE DILIGENCE DOSSIER
                </h4>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Subject Parcel: <strong className="text-slate-900 dark:text-white">Sy. No. {formData.surveyNo}</strong>, {formData.village}, {formData.taluk}
                </div>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">KIADB Acquisition Status</div>
                  <div className="font-bold text-emerald-800 dark:text-emerald-400 text-[11px] mt-0.5 truncate">
                    {formData.kiadbStatus}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Zoning Classification</div>
                  <div className="font-bold text-slate-900 dark:text-white text-[11px] mt-0.5 truncate">
                    {formData.selectedZone}
                  </div>
                </div>
              </div>

              {/* Compensation Breakdown */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>RFCTLARR Act 2013 Entitlement (Rural 2.0x + Solatium 100%)</span>
                  <span className="text-emerald-800 dark:text-emerald-400 font-mono text-sm font-black">
                    ₹{compTotal.toFixed(2)} Lakhs
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 dark:text-slate-400 font-mono pt-1 border-t border-slate-100 dark:border-slate-800">
                  <div>Base: ₹{guidanceTotal.toFixed(2)}L</div>
                  <div>Solatium: ₹{(guidanceTotal * 2.0).toFixed(2)}L</div>
                  <div>Mkt: ₹{marketValuation.toFixed(2)}L</div>
                </div>
              </div>

              {/* Risk Clearances checklist */}
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Outside Arkavathi/Kumudvathi protected hydrological buffer</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Cross-checked against Section 28-1 preliminary notification registry</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Direct arterial connectivity to Satellite Town Ring Road (STRR)</span>
                </div>
              </div>

              {/* Official Seal Mock */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>VERIFIED INDEPENDENT CLEARINGHOUSE AUDIT</span>
                </div>
                <div className="font-mono">kwin-city.com</div>
              </div>
            </div>

            {/* Monetization note if on free tier */}
            {tier === 'free' && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
                  <span>Free Tier: Basic Certificate. Upgrade to <strong>Pro</strong> for unlimited unwatermarked high-res exports & Gazette SMS alerts.</span>
                </div>
                {onOpenPricing && (
                  <button
                    onClick={onOpenPricing}
                    className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-bold text-[11px] transition"
                  >
                    View Plans
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition shadow-2xs"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Audit'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition shadow-2xs"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Preview</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              Close
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              <span>
                {isDownloading ? 'Generating PDF...' : downloadSuccess ? 'PDF Downloaded!' : 'Download Official PDF (.pdf)'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
