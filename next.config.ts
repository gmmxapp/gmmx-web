import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    resolveAlias: {
      "motion-dom": "./lib/motion-dom-shim.ts"
    }
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
