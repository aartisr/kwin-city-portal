import type { Pillar } from '@/types/kwin';

export const KWIN_PILLARS: Pillar[] = [
  {
    id: 'knowledge',
    title: 'Knowledge',
    subtitle: 'Research & Innovation Hub',
    description: 'Dedicated zones for higher education, research institutions, and innovation centers. featuring collaborations with international universities and research bodies [MoUs pending verification].',
    icon: '🎓',
    features: [
      'Research and Development Centers',
      'University Collaboration Zones',
      'Innovation Incubation Hubs',
      'STEM Education Facilities',
      'Post-Doctoral Research Programs',
    ],
    keyPartners: [
      'University partners [pending verification]',
      'Global research institutions',
      'Tech startups and accelerators',
    ],
    color: '#3b82f6',
  },
  {
    id: 'wellbeing',
    title: 'Wellbeing',
    subtitle: 'Health, Sustainability & Living',
    description: 'Integrated health infrastructure, green spaces, and sustainable living environments designed for holistic citizen wellbeing.',
    icon: '🌿',
    features: [
      'World-class Healthcare Facilities [pending verification]',
      '10 Interconnected Lakes [pending verification]',
      'Green Cover (40%+ target)',
      'Urban Parks and Recreation',
      'Health-Tech Innovation Hub',
      'Water Recycling Systems',
    ],
    keyPartners: [
      'Healthcare providers [pending verification]',
      'Environmental organizations',
      'Urban planning agencies',
    ],
    color: '#10b981',
  },
  {
    id: 'innovation',
    title: 'Innovation',
    subtitle: 'Industry Clusters & Tech',
    description: 'Specialized industrial clusters including semiconductor manufacturing, aerospace, renewable energy, and advanced R&D facilities [Details pending verification].',
    icon: '⚡',
    features: [
      'Semiconductor Park [465 acres dedicated]',
      'Aerospace Cluster [pending verification]',
      'Solar Farm (465 acres) [pending verification]',
      'Advanced Manufacturing Zones',
      'Digital Innovation Hubs',
      'Logistics and Supply Chain Centers',
    ],
    keyPartners: [
      'Technology corporations [pending verification]',
      'Semiconductor manufacturers',
      'Aerospace companies',
    ],
    color: '#f59e0b',
  },
];
