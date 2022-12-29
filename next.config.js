/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_MOCKING: "disabled",
    // NEXT_PUBLIC_API_MOCKING: "enabled",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    eslint: true
  },
}

module.exports = nextConfig
