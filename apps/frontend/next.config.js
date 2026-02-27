// apps/frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'your-storage-domain.com'],
  },
  // Ensure environment variables are available
  env: {
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Disable static generation for problematic pages if needed
  // output: 'standalone', // Uncomment if you need standalone output
}

module.exports = nextConfig