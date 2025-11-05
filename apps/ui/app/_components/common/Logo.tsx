'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  width?: number;
  height?: number;
}

const cssVariants = cva(
  [ 'flex flex-row items-center gap-1', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function Logo({ className, width = 25, height = 25, ...props }: Props) {
  return (
    <Link href='/'>
      <h1
        className={cn(
          cssVariants({}),
          className
        )}
        {...props}
      >
        <Image
          src='/images/nihil-logo.png'
          alt='NIHILOG Logo'
          width={width}
          height={height}
          priority
          className='block object-contain'
        />

        <span className='text-lg font-900'>NIHILOG</span>
      </h1>
    </Link>
  );
}
