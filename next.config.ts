import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.ophim.live',
        port: '',
        pathname: '/uploads/movies/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
