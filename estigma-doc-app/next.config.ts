import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['placehold.co', 'testauth.meapp.com.ar'],
  },
};

export default nextConfig;
