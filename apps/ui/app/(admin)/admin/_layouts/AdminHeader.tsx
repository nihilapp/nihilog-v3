'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { AdminAuthButtons } from '@/(admin)/admin/_layouts/AdminAuthButtons';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'text-md flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-200 bg-white', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AdminHeader({ className, ...props }: Props) {
  return (
    <header
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <h1>
        <Link href='/admin/dashboard' className='flex items-center gap-1'>
          <Image
            src='/images/nihil-logo.png'
            alt='logo'
            width={32}
            height={32}
            priority
          />
          <span className='text-lg font-900 text-black-base'>NIHILOG ADMIN</span>
        </Link>
      </h1>

      <AdminAuthButtons />
    </header>
  );
}
