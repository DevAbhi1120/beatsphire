import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: isDev
              ? `
                default-src 'self';
                script-src 'self' 'unsafe-inline' 'unsafe-eval';
                style-src 'self' 'unsafe-inline';
                img-src 'self' data:;
                connect-src 'self' ws:;
              `.replace(/\s+/g, " ").trim()
              : `
                default-src 'self';
                script-src 'self';
                style-src 'self' 'unsafe-inline';
                img-src 'self' data:;
                connect-src 'self';
              `.replace(/\s+/g, " ").trim(),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
