/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  images: {
    domains: ['casta.md', 'e1.edimdoma.ru'],
  },
};

module.exports = nextConfig;
