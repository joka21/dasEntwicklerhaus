/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // next dev soll keine AGENTS.md im Projekt anlegen
  agentRules: false,

  // Image optimization
  images: {
    formats: ['image/webp'], // AVIF aus: Sicherheitslücke in der Bildoptimierung von Next < 15.5.24
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // images.domains ist seit Next 16 veraltet
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'dasentwicklerhaus.de' },
    ],
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
    // Redirects/Rewrites groß-/kleinschreibungsgenau vergleichen. Next 16 vergleicht
    // sonst ohne Rücksicht darauf, und /dieIdee -> /dieidee leitet auf sich selbst um.
    caseSensitiveRoutes: true,
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
      // Kundenportal: nicht indexieren (auch Route-Handler und Weiterleitungen)
      {
        source: '/login/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/portal/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      // Entwürfe werden im iframe auf der eigenen Seite angezeigt; überschreibt
      // das DENY von oben (bei gleichem Header gewinnt der letzte Eintrag).
      {
        source: '/portal/:projekt/entwurf/:variante',
        headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }],
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

  async redirects() {
    return [
      {
        source: '/dieIdee',
        destination: '/dieidee',
        permanent: true,
      },
    ]
  },

  async rewrites() {
    return [
      // exakt /dieIdee und /dieIdee/ → /dieidee
      { source: '/dieIdee', destination: '/dieidee' },
      { source: '/dieIdee/', destination: '/dieidee' },
      // falls später Unterseiten: /dieIdee/* → /dieidee/*
      { source: '/dieIdee/:path*', destination: '/dieidee/:path*' },
    ];
  },
};

export default nextConfig;
