import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spotmiesstorage.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
      // --- FIX: Added the new storage domain here ---
      {
        protocol: 'https',
        hostname: 'reaidystorage.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.thiings.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;