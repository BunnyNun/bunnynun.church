import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    allowedDevOrigins: [
      "localhost:3000",
      "bunnynun.local:3000",
      "www.bunnynun.local:3000",
      "tithe.bunnynun.local:3000",        // NEW
      "business.bunnynun.local:3000",     // NEW
      "solomon.bunnynun.local:3000",      // NEW
      "lab.bunnynun.local:3000",
      "library.bunnynun.local:3000",
      "confessional.bunnynun.local:3000"  // Changed from confess -> confessional
    ],
  },
  images: {
    remotePatterns: [
      { hostname: "cms.bunnynun.church" },
    ],
  },
};

export default nextConfig;