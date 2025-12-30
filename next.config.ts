import type { NextConfig } from "next";

const nextConfig = {
  // 1. Allow your local domains
  experimental: {
    allowedDevOrigns: [
      "localhost:3000",
      "bunnynun.local:3000",
      "lab.bunnynun.local:3000"
    ],
  },
  // 2. Ensure images work if you use external sources
  images: {
    remotePatterns: [
      { hostname: "cms.bunnynun.church" },
    ],
  },
};

export default nextConfig;