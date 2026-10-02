import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The root layout lives under app/[lang], so unmatched URLs need a standalone
  // 404 page (app/global-not-found.tsx).
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // AVIF at 60 is visually indistinguishable here and ~30% lighter than 75.
    qualities: [60],
    // Cache optimized images on the CDN for 1 year
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Static media never changes once published → cache hard at the edge & browser.
  headers: async () => {
    const immutable = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];
    return [
      { source: "/projects/:path*", headers: immutable },
      { source: "/videos/:path*", headers: immutable },
      { source: "/posters/:path*", headers: immutable },
    ];
  },
};

export default nextConfig;
