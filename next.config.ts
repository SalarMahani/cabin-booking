import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        'https://wrzcgucmhurzdylzohjl.supabase.co/storage/v1/object/public/cabin-images/**',
      ),
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // WARNING: Skips type checking during build
    ignoreBuildErrors: true,
  },
}

export default nextConfig
