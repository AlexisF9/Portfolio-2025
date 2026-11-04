import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Nécessaire avec plusieurs layouts racines (app/(fr) et app/en)
    globalNotFound: true,
  },
};

export default nextConfig;
