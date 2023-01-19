/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'links.papareact.com',
      'lh3.googleusercontent.com',
      'post-app-images-dev.s3.amazonaws.com'
    ]
  },
  webpack : (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  }
}

module.exports = nextConfig
