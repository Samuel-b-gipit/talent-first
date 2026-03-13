import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Keep dynamic-route RSC payloads in the client router cache for 30s.
    // Without this Next.js 15 defaults to 0, meaning every back-navigation
    // triggers a full server round-trip and shows the loading spinner again.
    staleTimes: {
      dynamic: 30,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
