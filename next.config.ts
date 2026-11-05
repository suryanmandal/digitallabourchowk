import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.resolve(__dirname),
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "https://jobs.dlc.org.in/projects",
        permanent: false,
      },
      {
        source: "/projects/:path*",
        destination: "https://jobs.dlc.org.in/projects",
        permanent: false,
      },
      {
        source: "/onboarding",
        destination: "https://onboarding.digitallabourchowk.com/login",
        permanent: false,
      },
      {
        source: "/onboarding/:path*",
        destination: "https://onboarding.digitallabourchowk.com/login",
        permanent: false,
      },
    ];
  },
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
