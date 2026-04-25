import type { RefObject } from 'react';
import Link from 'next/link';
import { NAV_TONES } from '@/components/header/navigation';
import type { HeaderStory } from '@/components/header/config';
import type { NavGroup } from '@/components/header/types';

type DesktopNavProps = {
  menuGroups: NavGroup[];
  desktopNavRef: RefObject<HTMLDivElement | null>;
  activeDesktopMenu: NavGroup | null;
  desktopStory: HeaderStory | null;
  desktopColumns: NavGroup['items'][];
  activeGroupLabel: (group: NavGroup) => string;
  isActive: (href: string) => boolean;
  isGroupActive: (group: NavGroup) => boolean;
  onOpenGroup: (key: string) => void;
  onToggleGroup: (key: string) => void;
  onCloseMenu: () => void;
};

export default function DesktopNav({
  menuGroups,
  desktopNavRef,
  activeDesktopMenu,
  desktopStory,
  desktopColumns,
  activeGroupLabel,
  isActive,
  isGroupActive,
  onOpenGroup,
  onToggleGroup,
  onCloseMenu,
}: DesktopNavProps) {
  return (
    <div className="hidden min-w-0 items-center justify-center min-[1200px]:flex">
      <div ref={desktopNavRef as RefObject<HTMLDivElement>} className="relative z-[320] flex min-w-0 max-w-[648px] flex-1 justify-center">
        <div className="flex items-center gap-1 rounded-full border border-slate-300/90 bg-white/95 px-1 py-1 shadow-[0_12px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl">
          {menuGroups.map((group) => {
            const isOpen = activeDesktopMenu?.key === group.key;
            const menuId = `menu-${group.key}`;

            return (
              <button
                key={group.key}
                type="button"
                onMouseEnter={() => onOpenGroup(group.key)}
                onFocus={() => onOpenGroup(group.key)}
                onClick={() => onToggleGroup(group.key)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-controls={menuId}
                className={`group inline-flex h-9 items-center gap-1.5 rounded-full px-3 py-2 text-[0.92rem] whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${activeGroupLabel(group)} ${
                  isOpen ? 'bg-slate-950 text-white shadow-[0_10px_22px_rgba(15,23,42,0.14)] ring-0 hover:text-white' : ''
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                    isOpen ? 'bg-[#F5C050]' : isGroupActive(group) ? 'bg-[#E8A020]' : 'bg-slate-400'
                  }`}
                  aria-hidden="true"
                />
                <span>{group.label}</span>
                <svg
                  className="h-3 w-3 flex-shrink-0 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            );
          })}
        </div>

        {activeDesktopMenu && desktopStory ? (
          <div
            id={`menu-${activeDesktopMenu.key}`}
            role="menu"
            aria-label={`${activeDesktopMenu.label} menu`}
            className="absolute left-1/2 top-full z-[360] w-[min(980px,calc(100vw-3rem))] -translate-x-1/2 pt-4 pointer-events-auto"
          >
            <div className="overflow-hidden rounded-[24px] border border-slate-300 bg-white shadow-[0_28px_72px_rgba(2,6,23,0.16)] ring-1 ring-slate-200/90">
              <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
                <div className={`relative overflow-hidden border-b border-slate-200 lg:border-b-0 lg:border-r ${desktopStory.accent}`}>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.94))]" aria-hidden="true" />
                  <div className="relative px-5 pt-5 pb-4 lg:px-6 lg:pt-6 lg:pb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A96A00]">{desktopStory.eyebrow}</p>
                    <h3 className="mt-2.5 max-w-sm text-[1.5rem] font-extrabold leading-tight tracking-tight text-slate-950">
                      {desktopStory.title}
                    </h3>
                    <p className="mt-2.5 max-w-md text-[0.92rem] leading-6 text-slate-700">
                      {desktopStory.body}
                    </p>

                    <div className="mt-4 grid gap-2.5">
                      {activeDesktopMenu.items.slice(0, 2).map((item) => (
                        <Link
                          key={`${activeDesktopMenu.key}-${item.href}-featured`}
                          href={item.href}
                          className="group rounded-[18px] border border-slate-200 bg-white px-3.5 py-3 transition-all duration-200 hover:border-amber-200 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
                          onClick={onCloseMenu}
                        >
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                            {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
                            <span>{item.label}</span>
                          </div>
                          {item.desc ? <p className="mt-1 text-xs leading-5 text-slate-600">{item.desc}</p> : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 lg:p-5">
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {desktopColumns.map((column, columnIndex) => (
                      <div key={`${activeDesktopMenu.key}-col-${columnIndex}`} className="space-y-2">
                        {column.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onCloseMenu}
                            className={`group flex min-h-[74px] items-start gap-3 rounded-[18px] border px-3.5 py-3 transition-all duration-200 ${
                              isActive(item.href)
                                ? 'border-amber-200 bg-amber-50 shadow-[0_8px_20px_rgba(245,166,35,0.10)]'
                                : 'border-transparent bg-slate-50 hover:border-slate-200 hover:bg-white hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)]'
                            }`}
                          >
                            {item.icon ? (
                              <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white text-base shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
                                {item.icon}
                              </span>
                            ) : (
                              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-[#E8A020] to-cyan-400" />
                            )}
                            <div className="min-w-0">
                              <div className={`text-[0.95rem] font-bold leading-5 ${isActive(item.href) ? NAV_TONES.dropdownActive : NAV_TONES.dropdownIdle}`}>
                                {item.label}
                              </div>
                              {item.desc ? <div className="mt-0.5 text-[0.76rem] leading-5 text-slate-600">{item.desc}</div> : null}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
