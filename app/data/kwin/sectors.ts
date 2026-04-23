import type { Sector } from '@/types/kwin';

export const KWIN_SECTORS: Sector[] = [
  {
    id: 'semiconductor',
    name: 'Semiconductor Manufacturing',
    description: 'Advanced chip manufacturing and semiconductor design facilities',
    industryFocus: ['Microelectronics', 'Wafer Manufacturing', 'Design Services'],
    expectedJobs: 25000,
    expectedInvestment: '₹8,000+ Crore [pending verification]',
  },
  {
    id: 'aerospace',
    name: 'Aerospace & Defence',
    description: 'Aircraft manufacturing and aerospace component assembly [Details pending verification]',
    industryFocus: ['Aircraft Parts', 'Avionics', 'Defence Systems'],
    expectedJobs: 15000,
    expectedInvestment: '₹5,000+ Crore [pending verification]',
  },
  {
    id: 'healthcare',
    name: 'Health-Tech & Medical',
    description: 'Advanced healthcare services, medical research, and biotech innovation',
    industryFocus: ['Biotech Research', 'Medical Devices', 'Telemedicine'],
    expectedJobs: 20000,
    expectedInvestment: '₹6,000+ Crore [pending verification]',
  },
  {
    id: 'ict',
    name: 'Information & Communication Tech',
    description: 'Software development, AI/ML, and digital services centers',
    industryFocus: ['Cloud Computing', 'AI/ML', 'Software Development'],
    expectedJobs: 30000,
    expectedInvestment: '₹12,000+ Crore [pending verification]',
  },
  {
    id: 'renewable',
    name: 'Renewable Energy & Green Tech',
    description: 'Solar manufacturing, energy storage, and green technology innovation',
    industryFocus: ['Solar Manufacturing', 'Battery Tech', 'EV Components'],
    expectedJobs: 10000,
    expectedInvestment: '₹4,000+ Crore [pending verification]',
  },
];
