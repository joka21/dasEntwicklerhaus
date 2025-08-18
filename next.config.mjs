/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
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
