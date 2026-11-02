import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.resolve(__dirname),
  async rewrites() {
    return [
      {
        source: "/hire-skilled-construction-workers-delhi-ncr",
        destination: "/business",
      },
      {
        source: "/top-construction-jobs-delhi-ncr",
        destination: "/worker",
      },
      {
        source: "/contact-us-2",
        destination: "/contact",
      },
      {
        source: "/media-coverage",
        destination: "/for-collaboration",
      },
      {
        source: "/top-construction-blog-digital-labour-chowk",
        destination: "/blogs",
      },
    ];
  },
};

export default nextConfig;
