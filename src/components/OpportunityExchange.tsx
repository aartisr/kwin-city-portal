import React, { useState } from 'react';
import { 
  Briefcase, 
  Send, 
  CheckCircle2, 
  Filter, 
  Calendar, 
  Layers, 
  Sparkles, 
  FileCheck2, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { OPPORTUNITY_LISTINGS } from '../data/value-add-data';
import { OpportunityListing } from '../types';

export const OpportunityExchange: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [listings, setListings] = useState<OpportunityListing[]>(OPPORTUNITY_LISTINGS);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  // Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadRole, setLeadRole] = useState('Global Tech Investor');
  const [leadDistrict, setLeadDistrict] = useState('District 1: Knowledge');
  const [leadRequirement, setLeadRequirement] = useState('');
  const [leadBudget, setLeadBudget] = useState('₹50 Cr - ₹250 Cr');

  const types = ['all', 'PPP Tender', 'Academic Joint Venture', 'Industrial Allotment', 'Clinical Trial Hub'];

  const filteredListings = listings.filter((item) => {
    return selectedType === 'all' || item.type === selectedType;
  });

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    // Simulate match recording
    const newListing: OpportunityListing = {
      id: `opp-custom-${Date.now()}`,
      title: `${leadName} - ${leadRole} Proposal for ${leadDistrict}`,
      type: leadRole.includes('University') ? 'Academic Joint Venture' : 'Industrial Allotment',
      district: leadDistrict,
      allotmentSize: 'Custom Proposal Envelope',
      incentives: ['Single-Window Fast Track Clearance', '100% Stamp Duty Rebate'],
      deadline: '2026-12-31',
      status: 'open',
    };

    setListings([newListing, ...listings]);
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
      setShowSubmitModal(false);
      // Reset
      setLeadName('');
      setLeadEmail('');
      setLeadRequirement('');
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
              Tool #6: Opportunity & Tender Exchange
            </span>
            <span className="text-xs text-slate-400">
              PPP Concessions, Land Allotments & Joint Ventures
            </span>
          </div>
          <h2 className="mt-2 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white">
            KWIN City RFP & Investment Opportunities
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Live institutional pipeline for university satellite campuses, healthcare super-specialties, 
            solar microgrid concessions, and AI innovation cleanrooms.
          </p>
        </div>

        {/* Submit Expression of Interest Button */}
        <button
          onClick={() => setShowSubmitModal(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-600/25 px-4 py-2.5 text-xs font-semibold text-purple-200 hover:bg-purple-600/35 transition-all shadow-lg shrink-0"
        >
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span>Submit Expression of Interest (EoI)</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
              selectedType === t
                ? 'border border-purple-500/40 bg-purple-500/20 text-purple-200 shadow-md ring-1 ring-purple-500/30'
                : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {t === 'all' ? 'All Opportunities' : t}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-purple-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded border border-purple-500/20">
                  {item.type}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-slate-500" /> Closes: {item.deadline}
                </span>
              </div>

              <h3 className="mt-3 font-semibold text-sm sm:text-base text-slate-100">
                {item.title}
              </h3>

              <div className="mt-2 text-xs text-cyan-400">
                <span className="text-slate-500">Zone:</span> {item.district} · <span className="text-slate-500">Parcel:</span> {item.allotmentSize}
              </div>

              {/* Incentives List */}
              <div className="mt-4 space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Fiscal & Policy Incentives:
                </div>
                {item.incentives.map((inc, iIdx) => (
                  <div key={iIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-medium">
                Status: Active Allotment Window
              </span>
              <button
                onClick={() => setShowSubmitModal(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                <span>Express Interest</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal Dialog */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400">
                  Investor & Partner Concierge
                </span>
                <h3 className="text-lg font-bold text-white">
                  Submit Expression of Interest (EoI)
                </h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                ✕
              </button>
            </div>

            {submissionSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-white">EoI Registered Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Your interest docket has been appended to the KWIN single-window pipeline. Karnataka Udyog Mitra concierge reference dispatched.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block">Organization / Institutional Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oxford Genomics Institute / Global Biotech Corp"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block">Official Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="concierge@institution.org"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block">Stakeholder Persona</label>
                    <select
                      value={leadRole}
                      onChange={(e) => setLeadRole(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
                    >
                      <option>Global Tech Investor</option>
                      <option>University / Higher Ed</option>
                      <option>Biotech / Pharma Lab</option>
                      <option>CleanTech EPC Operator</option>
                      <option>Local Developer</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block">Target District</label>
                    <select
                      value={leadDistrict}
                      onChange={(e) => setLeadDistrict(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
                    >
                      <option>District 1: Knowledge (1500 Ac)</option>
                      <option>District 2: Health (1400 Ac)</option>
                      <option>District 3: Innovation (1600 Ac)</option>
                      <option>District 4: Research (1300 Ac)</option>
                      <option>Utilities / Solar Corridor (465 Ac)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block">Project Requirements & Timeline</label>
                  <textarea
                    rows={3}
                    placeholder="Describe acreage required, power/water requirements, and estimated capital infusion..."
                    value={leadRequirement}
                    onChange={(e) => setLeadRequirement(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl border border-purple-500/40 bg-purple-600 px-5 py-2 text-xs font-semibold text-white hover:bg-purple-500 transition-all flex items-center gap-1.5 shadow-lg"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit to KIADB Single Window</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
