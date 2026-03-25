'use client';

import { ContentBlock, ContentItem } from '@/lib/content-manager';
import { motion } from 'framer-motion';

interface ResponsiveGridProps {
  data: ContentBlock;
  items?: ContentItem[];
  columns?: number;
}

/**
 * Generic Responsive Grid Component
 * Layouts items in a flexible grid with animation
 * Automatically responsive (1 col mobile, 2 col tablet, 3+ col desktop)
 */
export default function ResponsiveGrid({
  data,
  items = data.items,
  columns = 3,
}: ResponsiveGridProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'md:grid-cols-2 lg:grid-cols-3';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

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

      <motion.div
        className={`grid gap-6 ${gridColsClass}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="group relative bg-white rounded-xl border border-gray-100 p-6 hover:border-[#E8A020] hover:shadow-lg transition-all"
          >
            {item.icon && (
              <div className="text-4xl mb-4">{item.icon}</div>
            )}
            {item.image && (
              <div className="mb-4 h-40 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}
            <h3 className="text-xl font-bold mb-2 group-hover:text-[#E8A020] transition-colors">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-gray-600 mb-4">{item.description}</p>
            )}
            {item.tags && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-xs font-semibold bg-amber-50 text-[#E8A020] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {item.url && (
              <a
                href={item.url}
                className="absolute inset-0 rounded-xl"
                aria-label={`Learn more about ${item.title}`}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
