import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.lungshan.org.tw",
        pathname: "/fortune_sticks/images/**",
      },
    ],
  },
};

export default nextConfig;
