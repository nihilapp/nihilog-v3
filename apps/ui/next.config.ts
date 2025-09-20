import { type NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  experimental: {
    esmExternals: true,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [ '@svgr/webpack', ],
        as: '*.js',
      },
    },
    resolveAlias: {
      '@': './app',
    },
  },
  pageExtensions: [ 'tsx', 'ts', ],
  distDir: 'build',
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: [ '@repo/shadcn', '@repo/message', ],
  eslint: {
    dirs: [],
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // 개발 서버 포트 설정
  env: {
    PORT: '3000',
  },
};

export default nextConfig;
