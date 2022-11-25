/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"]
  },
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] }}
    ]
  }
}

module.exports = nextConfig
