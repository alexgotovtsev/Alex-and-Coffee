/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  images: {
    domains: ['globalassets.starbucks.com', 'www.digitalassets.starbucks.eu'],
  },
};

module.exports = nextConfig;
