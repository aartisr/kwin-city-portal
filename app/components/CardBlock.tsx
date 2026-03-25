'use client';

import { ContentBlock }  from '@/lib/content-manager';

interface CardBlockProps {
  data: ContentBlock;
}

/**
 * Generic Card Block Component
 * Renders content in a card format with optional image and CTA
 */
export default function CardBlock({ data }: CardBlockProps) {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items?.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {item.image && (
              <div className="h-40 bg-gray-200 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              )}
              {item.url && (
                <a
                  href={item.url}
                  className="inline-flex text-[#E8A020] font-semibold hover:underline"
                >
                  Learn more →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
