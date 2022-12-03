/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.URI_STRAPI,
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
