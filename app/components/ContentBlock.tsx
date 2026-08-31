import { ContentBlock } from '@/lib/content-manager';
import Link from 'next/link';

interface ContentBlockProps {
  data: ContentBlock;
  title?: string;
  content?: string;
  cta?: {
    label: string;
    href: string;
    variant?: string;
  };
}

/**
 * Generic Content Block Component
 * Renders text content with optional CTA button
 * Easily extensible for different content types
 */
export default function ContentBlockComponent({
  data,
  title = data.title,
  content = data.content,
  cta = data.cta,
}: ContentBlockProps) {
  return (
    <section
      className={`container mx-auto px-6 py-16 ${
        data.theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            {title}
          </h2>
        )}
        {content && (
          <p className="text-lg leading-relaxed opacity-90 mb-8">
            {content}
          </p>
        )}
        {cta && (
          <div className="pt-4">
            <Link
              href={cta.href}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                cta.variant === 'outline'
                  ? 'border-2 border-current hover:bg-current hover:text-white'
                  : cta.variant === 'secondary'
                  ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  : 'bg-gradient-to-r from-[#F5A623] to-[#E8A020] text-white hover:shadow-lg'
              }`}
            >
              {cta.label}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
