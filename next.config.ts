/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sistemas.atu.gob.pe",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'source-map';
    }
    return config;
  },
};

export default nextConfig;
