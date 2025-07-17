// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ✅ required for SSR + Prisma
}

module.exports = nextConfig
