import React, { useState, useEffect } from "react";
import Discussions from "./Discussions";
import ClaimsVault from "./ClaimsVault";
import AIAssistant from "./AIAssistant";
import AnalysisPaper from "./AnalysisPaper";
import { initialThreads, initialClaims } from "../data/discourse-data";
import { Thread, Claim } from "../types";
import { MessageSquare, ShieldCheck, Sparkles, BookOpen, AlertCircle } from "lucide-react";

export default function DiscourseLab() {
  const [subTab, setSubTab] = useState<string>("discussions");

  // State for threads and claims with optimistic local storage fallback
  const [threads, setThreads] = useState<Thread[]>(() => {
    const cached = localStorage.getItem("kwin_threads");
    return cached ? JSON.parse(cached) : initialThreads;
  });

  const [claims, setClaims] = useState<Claim[]>(() => {
    const cached = localStorage.getItem("kwin_claims");
    return cached ? JSON.parse(cached) : initialClaims;
  });

  // Pull initial state from backend full-stack API on mount
  useEffect(() => {
    fetch("/api/discourse/threads")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to load threads");
      })
      .then((data) => {
        setThreads(data);
        localStorage.setItem("kwin_threads", JSON.stringify(data));
      })
      .catch((err) => console.warn("Using local cache. Backend sync offline or loading:", err));

    fetch("/api/discourse/claims")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to load claims");
      })
      .then((data) => {
        setClaims(data);
        localStorage.setItem("kwin_claims", JSON.stringify(data));
      })
      .catch((err) => console.warn("Using local cache. Backend sync offline or loading:", err));
  }, []);

  // Universal State Mutators that execute optimistic state changes and trigger background API sync
  const updateThreadsAndSync = (action: React.SetStateAction<Thread[]>) => {
    setThreads((prev) => {
      const next = typeof action === "function" ? (action as Function)(prev) : action;
      
      // Perform background network save
      fetch("/api/discourse/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next)
      }).catch((err) => console.error("Error syncing threads to server database:", err));

      // Cache locally
      localStorage.setItem("kwin_threads", JSON.stringify(next));
      return next;
    });
  };

  const updateClaimsAndSync = (action: React.SetStateAction<Claim[]>) => {
    setClaims((prev) => {
      const next = typeof action === "function" ? (action as Function)(prev) : action;

      // Perform background network save
      fetch("/api/discourse/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next)
      }).catch((err) => console.error("Error syncing claims to server database:", err));

      // Cache locally
      localStorage.setItem("kwin_claims", JSON.stringify(next));
      return next;
    });
  };

  const tabs = [
    { id: "discussions", label: "Civic Inquiries", icon: MessageSquare, desc: "Community dialogue boards" },
    { id: "claims", label: "Evidence Vault", icon: ShieldCheck, desc: "Audit masterplan assertions" },
    { id: "ai-assistant", label: "Grounded AI Guide", icon: Sparkles, desc: "Interact with Gemini Guide" },
    { id: "analysis", label: "Strategic Analysis", icon: BookOpen, desc: "Feasibility and rationale study" },
  ];

  const renderContent = () => {
    switch (subTab) {
      case "discussions":
        return <Discussions threads={threads} setThreads={updateThreadsAndSync} />;
      case "claims":
        return <ClaimsVault claims={claims} setClaims={updateClaimsAndSync} />;
      case "ai-assistant":
        return <AIAssistant />;
      case "analysis":
        return <AnalysisPaper />;
      default:
        return <Discussions threads={threads} setThreads={updateThreadsAndSync} />;
    }
  };


  return (
    <div className="space-y-6" id="discourse-lab-root">
      {/* Dynamic Tab Bar Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-bold">Interactive Prototype</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              KWIN City Civic Discourse Lab
            </h2>
            <p className="text-xs text-slate-400 max-w-xl mt-1 leading-relaxed">
              An evidence-first dialogue platform designed to facilitate collaboration, factual audits, and direct verification between citizens, investors, and urban planners.
            </p>
          </div>

          {/* Sub-tab navigation */}
          <div className="flex flex-wrap gap-2 shrink-0 bg-slate-950/80 border border-slate-800 p-1.5 rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = subTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`subtab-trigger-${tab.id}`}
                  onClick={() => setSubTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stakeholder Notice Info Box */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-white">Discourse Mechanics:</span> To solve typical forum noise, this workspace demands that comments be categorized under <strong>Discourse Tags</strong>. Adding links or referencing official documents increases a thread's crowdsourced <strong>Evidence Score</strong>.
        </div>
      </div>

      {/* Primary Tab Viewport */}
      <div className="relative mt-2" id="discourse-subtab-viewport">
        {renderContent()}
      </div>
    </div>
  );
}
