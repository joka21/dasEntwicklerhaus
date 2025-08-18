/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
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
    ];
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
