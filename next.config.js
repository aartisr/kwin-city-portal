const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  
  // ============= PERFORMANCE OPTIMIZATIONS =============
  
  // Optimize bundle
  productionBrowserSourceMaps: false, // Disable source maps in prod (smaller bundles)
  compress: true,
  
  // Image optimization - critical for performance
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.mapbox.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache images for 90 days in production
    minimumCacheTTL: 60 * 60 * 24 * 90,
  },
  
  // Security + SEO headers
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          // Content Security Policy - prevents XSS attacks
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://maps.googleapis.com", // unsafe-inline needed for Framer Motion, Next.js inline styles
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com",
              "font-src 'self' https://fonts.gstatic.com https://api.mapbox.com",
              "img-src 'self' data: https: blob:",
              "media-src 'self' https:",
              "frame-src 'self' https:",
              "connect-src 'self' https: wss:", // WebSockets for real-time features
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          // Prevent MIME type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Prevent clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent XSS (browser built-in protection)
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Referrer policy
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Permissions policy (formerly Feature-Policy)
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=(), payment=()' },
          // Strict-Transport-Security: tell browsers/Google to always use HTTPS
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      // Sitemap and robots.txt must never be cached so crawlers always get fresh data
      {
        source: '/(sitemap.xml|robots.txt)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }],
      },
      // Cache static assets (JS, CSS) for 1 year (they have hash in filename)
      {
        source: '/(.*)\\.(js|css|woff|woff2|ttf|eot)$',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Cache images for 30 days
      {
        source: '/images/(.*)\\.(jpg|jpeg|png|gif|webp|avif)$',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, must-revalidate' }],
      },
      // No cache for dynamic content
      {
        source: '/api/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }],
      },
    ];
  },
  
  // Redirects for old URLs (if needed)
  redirects: async () => {
    return [];
  },
  
  // Rewrites for API routes
  rewrites: async () => {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },
  
  // Keep Next.js' default client chunking. Overriding splitChunks here can break
  // App Router CSS asset generation in development and lead to /_next/static/css 404s.
  webpack: (config) => config,
};

module.exports = (phase) => ({
  ...baseConfig,
  // Keep dev and prod artifacts isolated to avoid cache/runtime manifest corruption.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  
  // Development-specific optimizations
  ...(phase === PHASE_DEVELOPMENT_SERVER && {
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 5,
    },
  }),
});
