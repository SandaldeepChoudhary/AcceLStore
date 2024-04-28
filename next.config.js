/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "accelstore.up.railway.app"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
        port: "3000",
      },
      {
        hostname: "accelstore.up.railway.app",
      },
    ],
  },
};

module.exports = nextConfig;
