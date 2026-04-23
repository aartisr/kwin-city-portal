import Link from 'next/link';
import type { FooterLinkItem } from '@/components/footer/types';

export default function FooterNavLink({ link }: { link: FooterLinkItem }) {
  const baseClassName = link.accent ? 'text-amber-300 hover:text-amber-200' : 'text-[#A7B8CC] hover:text-white';
  const className =
    'footer-nav-link group flex items-start gap-3 rounded-2xl px-3 py-3 transition-all duration-200 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500';
  const content = (
    <>
      <span className="footer-nav-link-dot mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-[#F5A623] to-[#06B6D4] opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
      <span className="min-w-0">
        <span className={`footer-nav-link-label block text-sm font-semibold transition-colors duration-200 ${baseClassName}`}>
          {link.label}
          {link.external ? ' ↗' : ''}
        </span>
        {link.desc ? <span className="mt-1 block text-xs leading-5 text-[#60738E]">{link.desc}</span> : null}
      </span>
    </>
  );

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  );
}
