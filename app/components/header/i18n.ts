import type { NavItem } from '@/components/header/types';

export type HeaderTranslateFn = (key: string) => string;

export function translateGroupLabel(t: HeaderTranslateFn, label: string): string {
  return t(`header.groups.${label}`);
}

export function getTranslatedText(t: HeaderTranslateFn, key: string, fallback?: string): string {
  const translated = t(key);
  return translated === key ? fallback ?? key : translated;
}

export function translateNavItem(t: HeaderTranslateFn, item: NavItem): NavItem {
  return {
    ...item,
    label: getTranslatedText(t, `header.items.${item.href}.label`, item.label),
    desc: item.desc
      ? getTranslatedText(t, `header.items.${item.href}.desc`, item.desc)
      : undefined,
  };
}
