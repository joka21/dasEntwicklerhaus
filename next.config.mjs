/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['images.unsplash.com', 'dasentwicklerhaus.de'],
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/site.webmanifest',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },

  // 301 für alle entfernten Seiten (statusCode statt permanent, das wäre 308).
  // Next.js vergleicht Pfade ohne Rücksicht auf Groß-/Kleinschreibung, damit
  // ist /dieIdee über /dieidee mit abgedeckt.
  async redirects() {
    return [
      { source: '/projects', destination: '/referenzen', statusCode: 301 },
      { source: '/projects/:path*', destination: '/referenzen', statusCode: 301 },
      { source: '/blog', destination: '/', statusCode: 301 },
      { source: '/blog/:path*', destination: '/', statusCode: 301 },
      { source: '/ai-literacy', destination: '/', statusCode: 301 },
      { source: '/dieidee', destination: '/', statusCode: 301 },
      { source: '/ki-deutschland', destination: '/', statusCode: 301 },
      { source: '/ki-startups', destination: '/', statusCode: 301 },
      { source: '/contact', destination: '/kontakt', statusCode: 301 },
    ]
  },
};

export default nextConfig;
