import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { GROUP_STORIES, type HeaderLabels } from '@/components/header/config';
import { getToolIntentSections, getToolQuickActions } from '@/components/header/tools-intents';
import type { AuthUser, NavGroup } from '@/components/header/types';
import type { Locale } from '@/lib/i18n/locales';

type MobileMenuSheetProps = {
  menuGroups: NavGroup[];
  labels: HeaderLabels;
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  currentUser: AuthUser | null;
  mobileOpenGroup: string | null;
  isActive: (href: string) => boolean;
  isGroupActive: (group: NavGroup) => boolean;
  onToggleGroup: (key: string) => void;
  onCloseMenu: () => void;
  onOpenSearch: () => void;
};

export default function MobileMenuSheet({
  menuGroups,
  labels,
  locale,
  setLocale,
  currentUser,
  mobileOpenGroup,
  isActive,
  isGroupActive,
  onToggleGroup,
  onCloseMenu,
  onOpenSearch,
}: MobileMenuSheetProps) {
  return (
    <div data-testid="header-menu-sheet" className="px-1 pt-3 md:flex md:justify-end">
      <div className="max-h-[calc(100vh_-_var(--kwin-header-height)_-_1rem)] overflow-y-auto rounded-[30px] border border-slate-200/90 bg-white/98 p-4 shadow-[0_28px_80px_rgba(2,6,23,0.18)] backdrop-blur-2xl md:w-[min(620px,100%)]">
        <div className="rounded-[24px] border border-slate-300/90 bg-[linear-gradient(135deg,rgba(255,247,237,0.98),rgba(240,249,255,0.98))] p-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#6F3F00]">Navigation</p>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
            A clearer route structure, inspired by the strongest current web headers: fewer decisions up front, richer context after the first click.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onOpenSearch();
                onCloseMenu();
              }}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700"
            >
              <span aria-hidden="true">⌘</span>
              <span>{labels.search}</span>
            </button>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#F5A623,#E8A020)] px-3 py-3 text-sm font-bold text-[#040714]"
              onClick={onCloseMenu}
            >
              <span>{labels.contact}</span>
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <LanguageSwitcher compact label={labels.language} locale={locale} onLocaleChange={setLocale} />
        </div>

        {currentUser ? (
          <Link
            href="/account"
            className="mt-4 flex items-center justify-between rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3.5"
            onClick={onCloseMenu}
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">{labels.signedIn}</p>
              <p className="mt-1 truncate text-sm font-bold text-slate-900">{currentUser.name}</p>
            </div>
            <span className="text-xs font-semibold text-slate-700">{labels.account}</span>
          </Link>
        ) : null}

        <div className="mt-4 space-y-3">
          {menuGroups.map((group) => {
            const isOpen = mobileOpenGroup === group.key;
            const groupStory = GROUP_STORIES[group.key] ?? GROUP_STORIES.discover;
            const toolIntentSections = group.key === 'tools' ? getToolIntentSections(group.items) : [];
            const toolQuickActions = group.key === 'tools' ? getToolQuickActions(group.items) : [];

            return (
              <section
                key={group.key}
                className={`overflow-hidden rounded-[26px] border transition-all duration-200 ${
                  isOpen ? 'border-slate-200 bg-slate-50/80 shadow-[0_18px_48px_rgba(15,23,42,0.08)]' : 'border-slate-200/80 bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onToggleGroup(group.key)}
                  className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6F3F00]">{groupStory.eyebrow}</p>
                    <p className={`mt-1 truncate text-sm font-bold ${isGroupActive(group) ? 'text-[#6F3F00]' : 'text-slate-950'}`}>{group.label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-700">{groupStory.title}</p>
                  </div>
                  <svg className={`mt-1 h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen ? (
                  <div className="border-t border-slate-200 px-3 pb-3 pt-2">
                    {group.key === 'tools' ? (
                      <div className="space-y-2.5">
                        <section className="rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,rgba(245,250,255,0.94),rgba(255,250,240,0.94))] p-3">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#6F3F00]">Quick Actions</h4>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">Fast launch</p>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            {toolQuickActions.map((action) => (
                              <Link
                                key={action.key}
                                href={action.href}
                                onClick={onCloseMenu}
                                className={`rounded-xl border px-2.5 py-2 text-left transition-all duration-200 ${
                                  isActive(action.href)
                                    ? 'border-amber-200 bg-amber-50 text-[#6F3F00]'
                                    : 'border-slate-200 bg-white text-slate-900 hover:border-amber-200'
                                }`}
                              >
                                <div className="flex items-center gap-1.5 text-xs font-bold">
                                  <span aria-hidden="true">{action.icon}</span>
                                  <span className="truncate">{action.title}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </section>

                        {toolIntentSections.map((section) => (
                          <section key={section.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#6F3F00]">{section.title}</h4>
                            <p className="mt-1 text-xs leading-5 text-slate-700">{section.summary}</p>
                            <div className="mt-2 space-y-1">
                              {section.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className={`flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors ${
                                    isActive(item.href) ? 'bg-amber-50 text-[#6F3F00]' : 'bg-white hover:bg-slate-100 text-slate-900'
                                  }`}
                                  onClick={onCloseMenu}
                                >
                                  {item.icon ? (
                                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                                      {item.icon}
                                    </span>
                                  ) : (
                                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-[#E8A020] to-cyan-400" />
                                  )}
                                  <span className="min-w-0">
                                    <span className="block text-sm font-semibold">{item.label}</span>
                                    {item.desc ? <span className="mt-1 block text-xs leading-5 text-slate-700">{item.desc}</span> : null}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </section>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors ${
                              isActive(item.href) ? 'bg-amber-50 text-[#6F3F00]' : 'hover:bg-white text-slate-900'
                            }`}
                            onClick={onCloseMenu}
                          >
                            {item.icon ? (
                              <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                                {item.icon}
                              </span>
                            ) : (
                              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-[#E8A020] to-cyan-400" />
                            )}
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold">{item.label}</span>
                              {item.desc ? <span className="mt-1 block text-xs leading-5 text-slate-700">{item.desc}</span> : null}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
