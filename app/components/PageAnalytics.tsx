'use client';

import { useEffect } from 'react';

export default function PageAnalytics() {
  useEffect(() => {
    // Track page view
    if (typeof window === 'undefined') return;

    const pageView = {
      path: window.location.pathname,
      title: document.title,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
    };

    // Store in localStorage (limited to last 100 views)
    const analytics = JSON.parse(localStorage.getItem('pageAnalytics') || '[]') as typeof pageView[];
    analytics.push(pageView);
    localStorage.setItem('pageAnalytics', JSON.stringify(analytics.slice(-100)));

    // Track scroll depth
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      maxScroll = Math.max(maxScroll, scrollPercent);
    };
    window.addEventListener('scroll', trackScrollDepth);

    // Track time on page
    const startTime = Date.now();
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      // Store engagement metrics
      const engagement = {
        path: window.location.pathname,
        timeOnPage,
        scrollDepth: Math.round(maxScroll),
        timestamp: new Date().toISOString(),
      };
      
      const metrics = JSON.parse(localStorage.getItem('engagementMetrics') || '[]') as typeof engagement[];
      metrics.push(engagement);
      localStorage.setItem('engagementMetrics', JSON.stringify(metrics.slice(-100)));
    };
  }, []);

  return null; // This component only tracks, doesn't render
}
