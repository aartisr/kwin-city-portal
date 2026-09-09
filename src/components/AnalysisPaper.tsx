import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, Flame, Users, BookOpen } from "lucide-react";

export default function AnalysisPaper() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" id="analysis-paper-container">
      {/* Banner */}
      <div className="bg-slate-900 p-6 text-white border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">Strategic Feasibility Study</span>
        </div>
        <h2 className="text-base font-bold tracking-tight text-white">
          KWIN City Portal: Community Feasibility & Architecture Proposal
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Analysis of kwin-city.com and blueprint for an evidence-first civic conversation system
        </p>
      </div>

      {/* Rationale Body */}
      <div className="p-6 md:p-8 flex flex-col gap-6 text-left">
        {/* Section 1: Strategic Feasibility */}
        <div>
          <h3 className="text-sm font-bold text-slate-950 border-b border-slate-100 pb-2 mb-3 flex items-center gap-2">
            <span className="bg-slate-100 text-slate-700 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold">1</span>
            Strategic Feasibility: Does a KWIN Community Make Sense?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            <strong>Yes, absolutely, but with strict architectural constraints.</strong> KWIN City is not just a standard residential suburb; it is a massive 5,800-acre smart city representing ₹40,000 crore of capital, 500k future residents, and a massive institutional mix (higher education, biotech, future mobility, and healthcare). 
          </p>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Traditional developer sites function as unidirectional brochures, but the <strong>KWIN City Portal (kwin-city.com)</strong> has positioned itself differently: as a civic, evidence-first portal separating verified claims from unverified context. Introducing a community under this philosophy is highly valuable for several reasons:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Opportunities & Drivers
              </h4>
              <ul className="flex flex-col gap-1.5 text-[11px] text-slate-600">
                <li>• <strong>Investor Diligence:</strong> High-ticket healthcare/biotech investors need crowdsourced ground truth about STRR and electricity readiness before buying land.</li>
                <li>• <strong>Institutional Trust:</strong> Academics from around the world (e.g. IISc partners) need transparent dialogue lines to coordinate long-term research infrastructure.</li>
                <li>• <strong>Grassroots Alignment:</strong> Provides a release valve and formal engagement path for local communities affected by acquisitions.</li>
              </ul>
            </div>

            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
              <h4 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                Critical Risks to Counter
              </h4>
              <ul className="flex flex-col gap-1.5 text-[11px] text-slate-600">
                <li>• <strong>Hype & Misinformation:</strong> Traditional forums quickly degenerate into speculative real estate spam or unfounded political mudslinging.</li>
                <li>• <strong>Social Unrest Friction:</strong> Tensions regarding compensation and displacement require a high-trust, neutral, objective discourse standard rather than reactive rants.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Best Lightweight Idea */}
        <div>
          <h3 className="text-sm font-bold text-slate-950 border-b border-slate-100 pb-2 mb-3 flex items-center gap-2">
            <span className="bg-slate-100 text-slate-700 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold">2</span>
            Our Best Idea: The "Civic Discourse & Evidence Lab"
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Instead of standard chatrooms or chronological message boards (which suffer from quick dilution), the ideal community for KWIN City must be a <strong>Lightweight, Evidence-Anchored Dialogue Space</strong>. 
          </p>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            We propose structuring conversations not around individuals, but around <strong>specific civic claims or infrastructure proposals</strong>. This structure completely neutralizes generic noise, turning community members into collaborative auditors of the smart city’s progress.
          </p>

          <div className="flex flex-col gap-3 mt-4">
            <div className="flex gap-3">
              <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs">
                1
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Structured Discourse Tagging</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Comments are not just plain text; users must categorize their input as <em>Adding Evidence</em> (accompanied by official file links), <em>Seeking Verification</em>, or <em>Sharing Perspectives</em>.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs">
                2
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">The "Trust Score" Algorithmic Weighting</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Every thread has an "Evidence Score" reflecting the quantity and quality of verified official attachments (gazettes, MoUs, maps) linked inside the replies, rewarding accuracy over empty rhetoric.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs">
                3
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Grounded AI Moderation and Navigation</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  An inline Gemini AI assistant, strictly grounded in the official masterplan specifications, acts as an automated "Truth Guard." It does not censor, but automatically appends objective context boxes to controversial claims.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Technical Blueprint */}
        <div>
          <h3 className="text-sm font-bold text-slate-950 border-b border-slate-100 pb-2 mb-3 flex items-center gap-2">
            <span className="bg-slate-100 text-slate-700 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold">3</span>
            Implementation Blueprint & Tech Stack
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            The source code of the KWIN City Portal is designed as a modular web application. Integrating this lightweight discourse lab seamlessly fits within their existing stack:
          </p>

          <table className="w-full text-left text-[11px] border border-slate-200 rounded-lg overflow-hidden mt-3">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-2.5 font-bold">Component</th>
                <th className="p-2.5 font-bold">Tech Choice</th>
                <th className="p-2.5 font-bold">Benefit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-2.5 font-bold">Frontend Framework</td>
                <td className="p-2.5">React 19 / Vite</td>
                <td className="p-2.5">Lightweight footprint, responsive rendering, fast updates.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Data Persistence</td>
                <td className="p-2.5">Firestore (Firebase)</td>
                <td className="p-2.5">Real-time sync of comments, collaborative upvotes, off-line caching.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Verification Engine</td>
                <td className="p-2.5">Gemini 3.8 Flash via @google/genai</td>
                <td className="p-2.5">Real-time contextual grounding, summarizing complex gazettes for citizens.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Styling System</td>
                <td className="p-2.5">Tailwind CSS</td>
                <td className="p-2.5">Consistent mathematical scale, highly accessible layout.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
