/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    // ✅ build paytida ESLint xatolarni inkor qiladi
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ agar TypeScript xatolari bo‘lsa ham build to‘xtamasin
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
};

module.exports = nextConfig;
