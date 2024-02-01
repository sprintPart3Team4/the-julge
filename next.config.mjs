/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos", // TODO 이거 해결해야됨
      },
    ],
  },
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://bootcamp-api.codeit.kr/api/2-4/the-julge/:path*",
      },
    ];
  },
};

export default nextConfig;
