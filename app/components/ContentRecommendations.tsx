'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface RecommendedContent {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  relevanceScore: number;
}

interface ContentRecommendationsProps {
  currentPage?: string;
  currentTags?: string[];
  maxRecommendations?: number;
}

export default function ContentRecommendations({
  currentPage = '',
  currentTags = [],
  maxRecommendations = 4,
}: ContentRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendedContent[]>([]);

  useEffect(() => {
    // Build recommendation engine based on browse history and current page
    const generateRecommendations = () => {
      const contentLibrary: RecommendedContent[] = [
        {
          id: '1',
          title: 'Development Timeline',
          description: 'Comprehensive timeline of KWIN City phases and milestones',
          category: 'Planning',
          href: '/timeline',
          relevanceScore: 0,
        },
        {
          id: '2',
          title: 'Sector Overview',
          description: 'Explore the three pillars: Knowledge, Wellbeing, Innovation',
          category: 'Sectors',
          href: '/sectors',
          relevanceScore: 0,
        },
        {
          id: '3',
          title: 'Evidence Vault',
          description: 'Complete source documentation and verification tiers',
          category: 'Research',
          href: '/evidence',
          relevanceScore: 0,
        },
        {
          id: '4',
          title: 'Regional Map',
          description: 'Interactive map showing location and infrastructure',
          category: 'Geography',
          href: '/region',
          relevanceScore: 0,
        },
        {
          id: '5',
          title: 'Sustainability Goals',
          description: 'Environmental and social sustainability initiatives',
          category: 'Impact',
          href: '/sustainability',
          relevanceScore: 0,
        },
        {
          id: '6',
          title: 'FAQ',
          description: 'Answers to common questions from investors, residents, and researchers',
          category: 'Support',
          href: '/faq',
          relevanceScore: 0,
        },
      ];

      // Boost scores based on current page and tags
      return contentLibrary
        .map((item) => {
          let score = Math.random() * 2;

          // Match by relevant tags
          if (currentTags.some((tag) => item.description.toLowerCase().includes(tag))) {
            score += 3;
          }
          if (
            currentTags.some((tag) =>
              item.category.toLowerCase().includes(tag) ||
              item.title.toLowerCase().includes(tag)
            )
          ) {
            score += 2;
          }

          // Bonus for different content type than current page
          if (currentPage && !currentPage.includes(item.href)) {
            score += 1;
          }

          return { ...item, relevanceScore: score };
        })
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, maxRecommendations);
    };

    setRecommendations(generateRecommendations());

    // Track page view in localStorage for future improvements
    if (typeof window !== 'undefined') {
      const visitedPages = JSON.parse(localStorage.getItem('visitedPages') || '[]');
      if (currentPage && !visitedPages.includes(currentPage)) {
        visitedPages.push(currentPage);
        localStorage.setItem('visitedPages', JSON.stringify(visitedPages.slice(-10)));
      }
    }
  }, [currentPage, currentTags, maxRecommendations]);

  if (recommendations.length === 0) return null;

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link href={item.href}>
              <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer h-full">
                <div className="flex items-start justify-between mb-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">Based on your interests</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
