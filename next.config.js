/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'accelstore.up.railway.app',
        pathname: '**',
        protocol: 'https',
      },
      {
        hostname: 'localhost',
        pathname: '**',
        port: "3000",
        protocol: 'http',
      },
    ],
  },
};

module.exports = nextConfig;
