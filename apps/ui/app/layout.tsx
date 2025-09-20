import { GoogleAnalytics } from '@next/third-parties/google';
import { type Metadata } from 'next';
import Script from 'next/script';

import { siteConfig } from '@/_config/config';

import { Providers } from './_layouts';

import '@/_styles/tailwind.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.site.url),
  title: {
    template: `%s - ${siteConfig.site.title}`,
    default: siteConfig.site.title,
  },
  description: siteConfig.site.description,
  keywords: siteConfig.site.keywords,
  authors: {
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
  generator: 'Jetbrains Webstorm',
  openGraph: {
    title: 'home',
    description: siteConfig.site.description,
    locale: 'ko_KR',
    type: 'website',
    siteName: siteConfig.site.title,
    url: siteConfig.site.url,
    images: [
      {
        url: `${siteConfig.site.url}/opengraph-image.png`,
        width: 1920,
        height: 1080,
        alt: 'site image',
      },
      {
        url: `${siteConfig.site.url}/twitter-image.png`,
        width: 1920,
        height: 1080,
        alt: 'twitter site image',
      },
    ],
  },
  alternates: {
    canonical: siteConfig.site.url,
  },
  other: {
    'google-site-verification': siteConfig.google.verification,
    'version': siteConfig.site.version,
  },
};

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children, }: Props) {
  return (
    <html lang='ko'>
      <head>
        {siteConfig.google.adSrc && (
          <Script async src={siteConfig.google.adSrc} crossOrigin='anonymous' />
        )}
        {siteConfig.google.analyticsId && (
          <GoogleAnalytics gaId={siteConfig.google.analyticsId} />
        )}
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
