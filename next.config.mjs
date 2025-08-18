/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/dieIdee',
        destination: '/dieidee',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
