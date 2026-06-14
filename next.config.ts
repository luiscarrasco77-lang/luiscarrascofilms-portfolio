import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
