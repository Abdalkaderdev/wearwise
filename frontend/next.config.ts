import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Enable static exports
  basePath: '/wearwise', // Replace with your repository name
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable server-side features since we're doing static export
  trailingSlash: true,
};

export default nextConfig;
