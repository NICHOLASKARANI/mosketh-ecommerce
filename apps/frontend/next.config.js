/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL || 'https://mosketh-backend.vercel.app',
  },
}

module.exports = nextConfig
