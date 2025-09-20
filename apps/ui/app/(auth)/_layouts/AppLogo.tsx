'use client';

import Link from 'next/link';

import { siteConfig } from '@/_config/config';

export function AppLogo() {
  return (
    <Link href='/' className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
      {/* 로고 이미지가 들어갈 곳. */}
      <div className='w-12 h-12 rounded-8 bg-primary' />

      <div className='space-y-1'>
        <h1 className='text-h5 font-bold text-foreground leading-tight'>
          {siteConfig.site.title}
        </h1>
        <p className='text-sm text-muted-foreground leading-tight'>
          {siteConfig.site.description}
        </p>
      </div>
    </Link>
  );
}
