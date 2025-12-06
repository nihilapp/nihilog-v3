'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'h1'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  text?: string;
  width?: number;
  height?: number;
  href?: string;
}

const cssVariants = cva(
  [ 'flex flex-row items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function Logo({ className, text = 'NIHILOG', width = 25, height = 25, href = '/', ...props }: Props) {
  return (
    <Link href={href}>
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

        <span className='text-lg font-900'>{text}</span>
      </h1>
    </Link>
  );
}
