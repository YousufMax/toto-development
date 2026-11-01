const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  cleanDistDir: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/services/paid-advertising',
        destination: '/services/paid-ads/',
        permanent: true,
      },
      {
        source: '/services/graphic-design',
        destination: '/services/brand-design/',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
