import React, { useState } from "react";
import { Claim, Evidence, CategoryType } from "../types";
import { ShieldCheck, Calendar, CheckCircle2, HelpCircle, Flame, FileText, ExternalLink, Plus, MapPin } from "lucide-react";

interface ClaimsVaultProps {
  claims: Claim[];
  setClaims: React.Dispatch<React.SetStateAction<Claim[]>>;
}

export default function ClaimsVault({ claims, setClaims }: ClaimsVaultProps) {
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(claims[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "All">("All");

  // Form states to add unverified claim/query
  const [newUnverifiedQuery, setNewUnverifiedQuery] = useState("");
  
  // Form states to propose evidence
  const [propEvidenceSource, setPropEvidenceSource] = useState("");
  const [propEvidenceType, setPropEvidenceType] = useState<Evidence["type"]>("official_document");
  const [propEvidenceDesc, setPropEvidenceDesc] = useState("");
  const [propEvidenceUrl, setPropEvidenceUrl] = useState("");

  const categories: (CategoryType | "All")[] = [
    "All",
    "Knowledge",
    "Wellbeing",
    "Innovation",
    "Transit & Infrastructure",
    "Land & Environment"
  ];

  const activeClaim = claims.find(c => c.id === selectedClaimId);

  const filteredClaims = selectedCategory === "All"
    ? claims
    : claims.filter(c => c.category === selectedCategory);

  const getStatusBadge = (status: Claim["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-50" />
            Verified Confirmed
          </span>
        );
      case "proposed":
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            Proposed Plan
          </span>
        );
      case "debated":
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            Active Debate / Dispute
          </span>
        );
    }
  };

  const getCategoryTheme = (cat: CategoryType) => {
    switch (cat) {
      case "Knowledge": return "text-indigo-600 bg-indigo-50 border-indigo-100";
      case "Wellbeing": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "Innovation": return "text-purple-600 bg-purple-50 border-purple-100";
      case "Transit & Infrastructure": return "text-amber-600 bg-amber-50 border-amber-100";
      case "Land & Environment": return "text-teal-600 bg-teal-50 border-teal-100";
    }
  };

  const handleClaimUpvote = (claimId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClaims(prev => prev.map(c => c.id === claimId ? { ...c, upvotes: c.upvotes + 1 } : c));
  };

  const handleAddUnverifiedQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClaimId || !newUnverifiedQuery.trim()) return;

    setClaims(prev => prev.map(c => {
      if (c.id === selectedClaimId) {
        return {
          ...c,
          unverifiedClaims: [...(c.unverifiedClaims || []), newUnverifiedQuery]
        };
      }
      return c;
    }));

    setNewUnverifiedQuery("");
  };

  const handleProposeEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClaimId || !propEvidenceSource.trim() || !propEvidenceDesc.trim()) return;

    const newEv: Evidence = {
      id: `ev-${Date.now()}`,
      sourceName: propEvidenceSource,
      type: propEvidenceType,
      description: propEvidenceDesc,
      url: propEvidenceUrl || undefined,
      verifiedAt: "Pending Mod Review"
    };

    setClaims(prev => prev.map(c => {
      if (c.id === selectedClaimId) {
        return {
          ...c,
          evidenceList: [...c.evidenceList, newEv]
        };
      }
      return c;
    }));

    // Reset
    setPropEvidenceSource("");
    setPropEvidenceDesc("");
    setPropEvidenceUrl("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="claims-vault-container">
      {/* List Panel */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Category Filter */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Audit Claims by Topic
          </h2>
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedClaimId(null);
                }}
                className={`text-[10px] font-bold px-2 py-1 rounded-md border transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Claims List */}
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px]">
          {filteredClaims.map((claim) => {
            const isSelected = claim.id === selectedClaimId;
            return (
              <div
                key={claim.id}
                id={`claim-card-${claim.id}`}
                onClick={() => setSelectedClaimId(claim.id)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? "bg-slate-50 border-emerald-500 shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${getCategoryTheme(claim.category)}`}>
                    {claim.category}
                  </span>
                  {getStatusBadge(claim.status)}
                </div>

                <h3 className="text-xs font-bold text-slate-950 leading-snug">
                  {claim.statement}
                </h3>

                <div className="flex justify-between items-center text-[10px] text-slate-400 mt-4 border-t border-slate-50 pt-2">
                  <span className="font-medium text-emerald-600">
                    {claim.evidenceList.length} Verified Sources
                  </span>
                  <button
                    onClick={(e) => handleClaimUpvote(claim.id, e)}
                    className="flex items-center gap-1 hover:text-emerald-600 cursor-pointer"
                  >
                    <span>Upvote audit importance ({claim.upvotes})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Panel */}
      <div className="lg:col-span-7">
        {activeClaim ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full" id="active-claim-panel">
            {/* Claim Header */}
            <div className="bg-slate-50 p-5 border-b border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getCategoryTheme(activeClaim.category)}`}>
                  {activeClaim.category}
                </span>
                {getStatusBadge(activeClaim.status)}
              </div>
              <h2 className="text-sm font-bold text-slate-900 leading-snug">
                {activeClaim.statement}
              </h2>
              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                {activeClaim.description}
              </p>
            </div>

            {/* Official Evidence section */}
            <div className="p-5 border-b border-slate-100 bg-white flex-1 overflow-y-auto max-h-[300px]">
              <h3 className="text-xs font-bold text-slate-800 mb-3.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified Evidence Vault Documents ({activeClaim.evidenceList.length})
              </h3>

              <div className="flex flex-col gap-3">
                {activeClaim.evidenceList.map((ev) => (
                  <div key={ev.id} className="bg-slate-50/50 p-3 rounded-lg border border-slate-200 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-800 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        {ev.sourceName}
                      </span>
                      <span className="text-[9px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded-md">
                        Checked: {ev.verifiedAt}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {ev.description}
                    </p>
                    {ev.url && (
                      <a
                        href={ev.url}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="text-[10px] text-emerald-600 font-bold hover:underline flex items-center gap-0.5 mt-1 self-start"
                      >
                        View Official Record Document
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Citizen Concerns / Pending verification list */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  Citizen Concerns & Claims Awaiting Evidence ({activeClaim.unverifiedClaims?.length || 0})
                </h3>
                <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">
                  These represent questions, claims, or rumors raised by citizens on the ground that haven't been linked to an official regulatory or judicial document yet.
                </p>

                <div className="flex flex-col gap-1.5">
                  {activeClaim.unverifiedClaims?.map((un, index) => (
                    <div key={index} className="bg-amber-50/30 border border-amber-100/60 p-2.5 rounded-lg text-[11px] text-slate-700 leading-snug">
                      • {un}
                    </div>
                  ))}
                </div>

                {/* Raise concern form */}
                <form onSubmit={handleAddUnverifiedQuery} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Submit a pending claim or local rumor related to this topic..."
                    value={newUnverifiedQuery}
                    onChange={(e) => setNewUnverifiedQuery(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-emerald-600"
                  />
                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Submit Query
                  </button>
                </form>
              </div>
            </div>

            {/* Propose Evidence Form */}
            <form onSubmit={handleProposeEvidence} className="p-5 bg-white border-t border-slate-100 flex flex-col gap-3">
              <div className="border-b border-slate-100 pb-1.5">
                <h4 className="text-xs font-bold text-slate-800">Propose Supporting Record or Gazette</h4>
                <p className="text-[10px] text-slate-500">Submit an official government PDF, map, index number or media clipping to back this claim.</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-medium text-slate-500 mb-1">Source Name / Agency</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karnataka High Court Order No. 41"
                    value={propEvidenceSource}
                    onChange={(e) => setPropEvidenceSource(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-slate-500 mb-1">Source Record Type</label>
                  <select
                    value={propEvidenceType}
                    onChange={(e) => setPropEvidenceType(e.target.value as Evidence["type"])}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                  >
                    <option value="official_document">Official Govt Document / Gazette</option>
                    <option value="court_filing">Court Filing / Legal Suit</option>
                    <option value="news_report">Reputable Investigative News Report</option>
                    <option value="academic_study">Scientific / Academic study</option>
                    <option value="satellite_imagery">Satellite Imagery / GIS dataset</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1">
                <div>
                  <label className="block text-[10px] font-medium text-slate-500 mb-1">Evidence URL / Reference Link (optional)</label>
                  <input
                    type="url"
                    placeholder="https://e-gazette.karnataka.gov.in"
                    value={propEvidenceUrl}
                    onChange={(e) => setPropEvidenceUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Extract Summary (What does this confirm?)</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Explain exactly how this document validates or disproves the claim..."
                  value={propEvidenceDesc}
                  onChange={(e) => setPropEvidenceDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 rounded-lg cursor-pointer transition-all"
              >
                Propose Document for Verification
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center flex flex-col items-center justify-center h-full">
            <ShieldCheck className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-sm font-bold text-slate-800">No Claim Selected</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Select a project claim from the sidebar to inspect its verified status, access the source vault, and propose supporting materials.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
