'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const personas = [
  { label: 'Investor', href: '/for/investor', icon: '📈', desc: 'Opportunity & risk briefing' },
  { label: 'Resident', href: '/for/resident', icon: '🏡', desc: 'Livability & community' },
  { label: 'Researcher', href: '/for/researcher', icon: '🔬', desc: 'Data & methodology' },
  { label: 'Journalist', href: '/for/journalist', icon: '📰', desc: 'Verified story angles' },
  { label: 'Curious Citizen', href: '/for/curious-citizens', icon: '🌏', desc: 'Plain-language explainer' },
];

const menuItems = [
  { label: 'About', href: '/about' },
  { label: 'Region', href: '/why-north-bengaluru' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Data Insights', href: '/data-insights' },
  { label: 'Evidence', href: '/evidence' },
  { label: 'Sources', href: '/sources' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePersonaOpen, setMobilePersonaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [personaDropOpen, setPersonaDropOpen] = useState(false);
  const personaRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close persona dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (personaRef.current && !personaRef.current.contains(e.target as Node)) {
        setPersonaDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const activeLink = (href: string) =>
    isActive(href)
      ? scrolled
        ? 'text-[#E8A020] font-extrabold'
        : 'text-[#F5A623] font-extrabold'
      : scrolled
      ? 'text-gray-600 hover:text-gray-900 font-semibold'
      : 'text-white/75 hover:text-white font-semibold';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl shadow-sm border-b border-gray-100'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="container flex items-center justify-between h-[70px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xl text-[#040714] shadow-md bg-[linear-gradient(135deg,#F5A623,#E8A020)]">
            K
          </div>
          <div className="leading-none">
            <span className={`font-extrabold text-lg tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              KWIN
            </span>
            <span className={`ml-1 text-sm transition-colors ${scrolled ? 'text-gray-500' : 'text-white/55'}`}>
              City
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {/* By Persona dropdown */}
          <div ref={personaRef} className="relative">
            <button
              onClick={() => setPersonaDropOpen((p) => !p)}
              className={`flex items-center gap-1 text-sm transition-colors duration-200 ${
                isActive('/for')
                  ? scrolled ? 'text-[#E8A020] font-extrabold' : 'text-[#F5A623] font-extrabold'
                  : scrolled ? 'text-gray-600 hover:text-gray-900 font-semibold' : 'text-white/75 hover:text-white font-semibold'
              }`}
            >
              By Persona
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${personaDropOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {personaDropOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                  onClick={() => setPersonaDropOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400">Choose your view</p>
                  </div>
                  <div className="p-2">
                    {personas.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group ${
                          isActive(p.href) ? 'bg-amber-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-xl leading-none">{p.icon}</span>
                        <div>
                          <div className={`text-sm font-bold ${isActive(p.href) ? 'text-[#E8A020]' : 'text-gray-800'}`}>
                            {p.label}
                          </div>
                          <div className="text-xs text-gray-500">{p.desc}</div>
                        </div>
                        {isActive(p.href) && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E8A020]" />
                        )}
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                    <Link href="/for" className="text-xs font-bold text-[#E8A020] hover:underline">
                      View all audiences →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Regular items */}
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm transition-colors duration-200 ${activeLink(item.href)}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-[#040714] bg-[linear-gradient(135deg,#F5A623,#E8A020)]"
          >
            Explore KWIN
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="lg:hidden flex flex-col gap-[5px] focus:outline-none p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-gray-900' : 'bg-white'} ${mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-gray-900' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-gray-900' : 'bg-white'} ${mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-gray-100 shadow-xl"
          >
            <div className="container py-5 flex flex-col gap-1">
              {/* By Persona accordion */}
              <button
                onClick={() => setMobilePersonaOpen((p) => !p)}
                className={`flex items-center justify-between w-full text-sm font-semibold px-1 py-2.5 rounded-lg transition-colors ${
                  isActive('/for') ? 'text-[#E8A020] bg-amber-50' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                By Persona
                <svg className={`w-4 h-4 transition-transform ${mobilePersonaOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {mobilePersonaOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-3 border-l-2 border-amber-200 ml-1 mb-1"
                  >
                    {personas.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className={`flex items-center gap-2 text-sm py-2 px-2 rounded-lg transition-colors ${
                          isActive(p.href) ? 'text-[#E8A020] font-bold' : 'text-gray-600 hover:text-gray-900'
                        }`}
                        onClick={() => { setMobileMenuOpen(false); setMobilePersonaOpen(false); }}
                      >
                        <span>{p.icon}</span>
                        {p.label}
                      </Link>
                    ))}
                    <Link
                      href="/for"
                      className="block text-xs font-bold text-[#E8A020] px-2 pt-1 pb-2"
                      onClick={() => { setMobileMenuOpen(false); setMobilePersonaOpen(false); }}
                    >
                      All audiences →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm px-1 py-2.5 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'text-[#E8A020] font-extrabold bg-amber-50'
                      : 'text-gray-700 font-semibold hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/about"
                className="mt-3 w-full text-center btn btn-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore KWIN
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
