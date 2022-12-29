/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_MOCKING: "enabled",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    eslint: true
  },
}

module.exports = nextConfig
