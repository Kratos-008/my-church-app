// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ✅ required for dynamic SSR pages
  experimental: {
    serverActions: true // or other features you're using
  }
}

module.exports = nextConfig
