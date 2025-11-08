/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'localhost:3000',
      },
      {
        protocol: 'https',
        hostname: 'hometown-backend.onrender.com',
      },
      {
        protocol: 'https',
        hostname: '*.onrender.com',
      },
    ],
  },

  reactStrictMode: false,

  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig;
