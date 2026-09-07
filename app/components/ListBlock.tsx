'use client';

import { ContentBlock, ContentItem } from '@/lib/content-manager';
import { motion } from 'framer-motion';

interface ListBlockProps {
  data: ContentBlock;
  items?: ContentItem[];
}

/**
 * Generic List Block Component
 * Renders items in a vertical list with optional icons or images
 * Useful for FAQs, steps, features, etc.
 */
export default function ListBlock({
  data,
  items = data.items,
}: ListBlockProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-6 py-16">
      {data.title && (
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-2">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-xl text-gray-600">{data.subtitle}</p>
          )}
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {item.icon && (
              <div className="text-2xl flex-shrink-0 mt-1">
                {item.icon}
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              {item.description && (
                <p className="text-gray-600">{item.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
