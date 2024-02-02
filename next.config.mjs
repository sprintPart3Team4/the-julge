/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bootcamp-project-api.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/token",
        destination: "https://bootcamp-api.codeit.kr/api/2-4/the-julge/token",
      },
      {
        source: "/users/:path*",
        destination: "https://bootcamp-api.codeit.kr/api/2-4/the-julge/users/:path*",
      },
      {
        source: "/shops/:path*",
        destination: "https://bootcamp-api.codeit.kr/api/2-4/the-julge/shops/:path*",
      },
      {
        source: "/notices/:path*",
        destination: "https://bootcamp-api.codeit.kr/api/2-4/the-julge/notices/:path*",
      },
      {
        source: "/images",
        destination: "https://bootcamp-api.codeit.kr/api/2-4/the-julge/images",
      },
    ];
  },
};

export default nextConfig;
