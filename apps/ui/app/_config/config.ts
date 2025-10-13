export const siteConfig = {
  site: {
    title: '니힐로그',
    description: '초보 개발자의 개발 블로그',
    keywords: 'coding, 코딩, programming, 프로그래밍, 블로그, 개발, 개발자, developer',
    url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://nihilncunia.dev',
    type: 'website',
    version: '1.0.0',
  },
  author: {
    name: 'NIHILncunia',
    url: 'https://github.com/nihilncunia',
  },
  images: {
    cover: {
      link: '/opengraph-image.png',
      alt: '니힐로그 로고 이미지',
    },
    logo: '/logo.png',
    darkLogo: '/logo-dark.png',
  },
  google: {
    verification: '',
    adSrc: '',
    analyticsId: '',
  },
  backEnd: {
    development: 'http://localhost:8000',
    production: 'https://api.nihilncunia.dev',
    default: 'http://localhost:8000',
  },
  api: {
    // Next.js rewrites 프록시를 통해 요청 (WSL2 네트워크 및 CORS 문제 해결)
    route: '/api',
  },
};
