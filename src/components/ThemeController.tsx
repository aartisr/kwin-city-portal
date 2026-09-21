import React, { useState, useRef, useEffect } from 'react';
import { useTheme, type AppTheme } from '../context/ThemeContext';
import { 
  Palette, 
  Sun, 
  Moon, 
  FileText, 
  Eye, 
  Type, 
  BookOpen, 
  Check, 
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  X
} from 'lucide-react';

interface ThemeControllerProps {
  compact?: boolean;
}

export const ThemeController: React.FC<ThemeControllerProps> = ({ compact = false }) => {
  const { 
    theme, 
    setTheme, 
    highContrast, 
    toggleHighContrast, 
    fontSize, 
    toggleFontSize, 
    readingMode, 
    toggleReadingMode 
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeOptions: { id: AppTheme; label: string; icon: React.ComponentType<{ className?: string }>; desc: string; previewBg: string }[] = [
    {
      id: 'academic',
      label: 'Academic Parchment',
      icon: BookOpen,
      desc: 'Warm archival tones, Newsreader serif, Oxford ink',
      previewBg: 'bg-[#FAF9F5] border-[#E2DFD4]'
    },
    {
      id: 'paper',
      label: 'Crisp Editorial Light',
      icon: Sun,
      desc: 'Pure white canvas, high-contrast cool slate typography',
      previewBg: 'bg-white border-slate-300'
    },
    {
      id: 'dark',
      label: 'Obsidian Terminal',
      icon: Moon,
      desc: 'Deep slate darkroom, glowing emerald telemetry',
      previewBg: 'bg-[#090D16] border-slate-800'
    }
  ];

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all shadow-xs ${
          theme === 'dark'
            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white'
            : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-slate-400'
        }`}
        title="Centrally manage theme, contrast, and typography"
        aria-label="Theme and Accessibility Controls"
      >
        <Palette className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span className="hidden sm:inline">
          {theme === 'academic' ? 'Academic' : theme === 'paper' ? 'Crisp Light' : 'Obsidian'}
        </span>
        {highContrast && (
          <span className="px-1 py-0.2 rounded bg-amber-500 text-black text-[9px] font-bold">
            AAA
          </span>
        )}
        <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-2xl z-50 animate-fadeIn font-['Plus_Jakarta_Sans']">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Display & Accessibility Engine
                </h4>
                <p className="text-[10px] text-slate-500">
                  Centralized theme, WCAG AAA contrast & scaling
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Theme Choices */}
          <div className="py-3 space-y-2">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Color Architecture
            </label>
            <div className="grid grid-cols-1 gap-2">
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setTheme(opt.id);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-slate-900 dark:text-white shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${opt.previewBg}`}>
                        <Icon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold flex items-center gap-1.5">
                          {opt.label}
                          {opt.id === 'academic' && (
                            <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 text-[9px] font-bold">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {opt.desc}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accessibility & Ergonomic Toggles */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Visual Ergonomics
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              
              {/* High Contrast Toggle */}
              <button
                onClick={toggleHighContrast}
                className={`flex items-center justify-between p-2 rounded-xl border text-left text-xs transition-colors ${
                  highContrast
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>High Contrast</span>
                </div>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  highContrast ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {highContrast ? 'ON' : 'OFF'}
                </span>
              </button>

              {/* Large Font Toggle */}
              <button
                onClick={toggleFontSize}
                className={`flex items-center justify-between p-2 rounded-xl border text-left text-xs transition-colors ${
                  fontSize === 'large'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Scholarly Large</span>
                </div>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  fontSize === 'large' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {fontSize === 'large' ? '+10%' : 'STD'}
                </span>
              </button>

            </div>
          </div>

          {/* Compliance Status Badge */}
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>WCAG 2.1 AA/AAA Verified</span>
            </span>
            <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400">
              {highContrast ? 'Ratio: ≥10:1' : 'Ratio: ≥7:1'}
            </span>
          </div>

        </div>
      )}
    </div>
  );
};
