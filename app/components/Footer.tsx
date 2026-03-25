'use client';

import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/6 bg-[#040714]"
    >
      {/* CTA banner */}
      <div
        className="border-b border-white/6 bg-[rgba(245,166,35,0.06)]"
      >
        <div className="container py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#F5A623] mb-2">The definitive KWIN resource</p>
            <h3 className="text-2xl font-extrabold text-white mb-2">
              Everything KWIN. One place.
            </h3>
            <p className="text-[#94A3B8] text-sm max-w-xl">
              This portal exists so that anyone — investor, resident, researcher, journalist, or curious citizen — can
              understand KWIN City with complete confidence in what&apos;s known and what&apos;s still being confirmed.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/about" className="btn btn-primary">Explore KWIN</Link>
            <Link href="/sources" className="btn btn-outline-light">View Sources</Link>
          </div>
        </div>
      </div>

      {/* Link grid */}
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xl text-[#040714] bg-[linear-gradient(135deg,#F5A623,#E8A020)]"
              >
                K
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">KWIN City</span>
            </div>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-xs">
              A research portal for KWIN City, North Bengaluru. Built with transparent sourcing, structured for
              every type of visitor, and updated to reflect the best available evidence.
            </p>
            <p className="text-xs text-[#334155] mt-4">
              13°13&apos;N 77°32&apos;E · Doddaballapura, Karnataka
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-5">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about"                className="text-[#94A3B8] hover:text-white transition-colors">About KWIN</Link></li>
              <li><Link href="/why-north-bengaluru"  className="text-[#94A3B8] hover:text-white transition-colors">Why North Bengaluru</Link></li>
              <li><Link href="/timeline"             className="text-[#94A3B8] hover:text-white transition-colors">Development Timeline</Link></li>
              <li><Link href="/sectors"              className="text-[#94A3B8] hover:text-white transition-colors">Industry Sectors</Link></li>
            </ul>
          </div>

          {/* Research */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-5">Research</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/sustainability"  className="text-[#94A3B8] hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/data-insights"   className="text-[#94A3B8] hover:text-white transition-colors">Data Insights Lab</Link></li>
              <li><Link href="/evidence"        className="text-[#94A3B8] hover:text-white transition-colors">Evidence Vault</Link></li>
              <li><Link href="/sources"         className="text-[#94A3B8] hover:text-white transition-colors">Sources & Claims</Link></li>
              <li><Link href="/for"             className="text-[#94A3B8] hover:text-white transition-colors">Persona Views</Link></li>
              <li>
                <a href="https://kiadb.karnataka.gov.in/" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-white transition-colors">
                  KIADB Portal ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Context */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-5">By Audience</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/for/investor"         className="text-[#94A3B8] hover:text-white transition-colors">For Investors</Link></li>
              <li><Link href="/for/resident"         className="text-[#94A3B8] hover:text-white transition-colors">For Residents</Link></li>
              <li><Link href="/for/researcher"       className="text-[#94A3B8] hover:text-white transition-colors">For Researchers</Link></li>
              <li><Link href="/for/journalist"       className="text-[#94A3B8] hover:text-white transition-colors">For Journalists</Link></li>
              <li><Link href="/for/curious-citizens" className="text-[#94A3B8] hover:text-white transition-colors">For Curious Citizens</Link></li>
            </ul>
          </div>

          {/* Open Data */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-5">Open Data</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://data.opencity.in/dataset/bengaluru-aviation-traffic-data" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-white transition-colors">
                  Aviation Data ↗
                </a>
              </li>
              <li>
                <a href="https://data.opencity.in/dataset/bengaluru-strr-via-bannerughatta-national-park-documents" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-white transition-colors">
                  STRR Documents ↗
                </a>
              </li>
              <li>
                <a href="https://data.opencity.in/dataset/economic-survey-of-karnataka-2025-26" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-white transition-colors">
                  Economic Survey ↗
                </a>
              </li>
              <li>
                <a href="https://data.opencity.in/dataset/bengaluru-lakes-and-their-maintainers" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-white transition-colors">
                  Lakes Governance ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-7 px-4 py-4 rounded-xl bg-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <div className="inline-block rounded-lg bg-[#0B122B] px-3 py-2 border border-white/10">
              <p className="text-sm font-semibold text-white">Copyright &copy; {year} BAJA Associates. All rights reserved.</p>
              <p className="mt-1 text-sm font-semibold text-white">Author: Aarti S Ravikumar.</p>
            </div>
            <p className="mt-2 text-xs text-[#94A3B8]">Original site content, design, and compilation are protected by copyright law.</p>
          </div>
          <div className="text-xs text-[#94A3B8] text-center md:text-right">
            <p>Built on open data · Every claim is sourced · Updated continuously</p>
            <p className="mt-1">
              <Link href="/terms" className="text-[#CBD5E1] hover:text-white transition-colors">Terms of Use</Link>
              {' · '}
              <Link href="/sources" className="text-[#CBD5E1] hover:text-white transition-colors">Sources & Claims</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
