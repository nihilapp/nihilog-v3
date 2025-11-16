import { type NextConfig } from 'next';

import { siteConfig } from './app/_config/config';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  reactCompiler: true,
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
  pageExtensions: [
    'tsx',
    'ts',
  ],
  distDir: 'build',
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // 개발 서버 포트 설정
  env: {
    PORT: '3000',
  },
  // API 프록시 설정 (WSL2 네트워크 문제 해결)
  async rewrites() {
    // 환경 변수로 백엔드 URL 설정 가능 (Docker, 다양한 환경 지원)
    const apiUrl = process.env.BACKEND_URL || (
      process.env.NODE_ENV === 'development'
        ? siteConfig.backEnd.development
        : siteConfig.backEnd.production
    );

    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
