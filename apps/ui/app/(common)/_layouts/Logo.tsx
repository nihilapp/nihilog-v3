'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/_libs';
import { webConfig } from '@/config';

interface Props
  extends React.HTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  href?: string;
}

const cssVariants = cva([ '', ], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

export function Logo({ href = '/', className, ...props }: Props) {
  return (
    <Link href={href} className={cn(cssVariants({}), className)} {...props}>
      <Image
        src={webConfig.logo}
        alt='nihilapps logo'
        width={100}
        height={100}
        priority
        className='size-[50px]'
      />
    </Link>
  );
}
