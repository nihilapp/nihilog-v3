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
  api: {
    route: process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000'
      : 'https://api.nihilncunia.dev',
  },
};
