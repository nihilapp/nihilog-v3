'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { Logo } from '@/_components/common/Logo';
import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'header'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  custom?: {
    div?: string | string[];
  };
  text?: string;
  href?: string;
}

const cssVariants = cva(
  [ 'frame-header flex-col md:flex-row gap-2 md:gap-0', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FrameHeader({ className, text, href, children, ...props }: Props) {
  return (
    <header
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <Logo text={text} href={href} />

      <div className='flex flex-row gap-2 items-center justify-end'>
        {children}
      </div>
    </header>
  );
}
