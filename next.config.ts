import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "172.28.0.1",
    "*.local",
  ],
};

export default nextConfig;
