/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "accelstore.up.railway.app"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "accelstore.up.railway.app",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
