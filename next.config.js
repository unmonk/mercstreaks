/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.espncdn.com/**",
      },
    ],
  },
};

module.exports = nextConfig;
