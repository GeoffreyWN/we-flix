/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"]
  },
  experimental: {
    // fontLoaders: [
    //   { loader: '@next/font/google', options: { subsets: ['latin'] }}
    // ],
    appDir: true,
    enableUndici: true //incase node version < 18
  }
}

module.exports = nextConfig
