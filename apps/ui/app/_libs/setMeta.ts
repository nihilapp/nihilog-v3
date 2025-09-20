import { type Metadata } from 'next';

import { siteConfig } from '@/_config/config';
import type { OpenGraphType, SiteMetadata } from '@/_entities/common/common.types';

export const setMeta = (meta: SiteMetadata): Metadata => {
  const siteDescription = meta.description || siteConfig.site.description;
  const siteKeywords = meta.keywords
    ? `${siteConfig.site.keywords}, ${meta.keywords}`
    : siteConfig.site.keywords;
  const siteUrl = `${siteConfig.site.url}${meta.url}`;
  const siteImageLink = meta.imageLink
    ? `${siteConfig.site.url}${meta.imageLink}`
    : `${siteConfig.site.url}${siteConfig.images.cover.link}`;
  const siteImageAlt = meta.imageAlt || siteConfig.images.cover.alt;
  const siteType = meta.type || (siteConfig.site.type as OpenGraphType);

  return {
    metadataBase: new URL(siteConfig.site.url),
    title: meta.title,
    description: siteDescription,
    keywords: siteKeywords,
    robots: meta.robots || 'index, follow',
    authors: {
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    openGraph: {
      title: meta.title,
      description: siteDescription,
      locale: 'ko_KR',
      type: siteType,
      siteName: siteConfig.site.title,
      url: siteUrl,
      images: [
        {
          url: siteImageLink,
          width: 1920,
          height: 1080,
          alt: siteImageAlt,
        },
      ],
    },
    alternates: {
      canonical: siteUrl,
    },
    other: {
      'google-site-verification': siteConfig.google.verification,
      'version': siteConfig.site.version,
    },
  };
};
