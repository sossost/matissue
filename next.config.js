/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "eliceproject.s3.amazonaws.com",
      "eliceproject.s3.ap-northeast-2.amazonaws.com",
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 281],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
};

module.exports = nextConfig;
