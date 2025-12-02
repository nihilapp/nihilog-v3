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
  toggleButton?: React.ReactNode;
}

const cssVariants = cva(
  [ 'frame-header flex-col md:flex-row gap-2 md:gap-0 text-sm', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FrameHeader({ className, text, href, toggleButton, children, ...props }: Props) {
  return (
    <header
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <div className='flex flex-row gap-2 items-center'>
        {toggleButton}
        <Logo text={text} href={href} />
      </div>

      <div className='flex flex-row gap-2 items-stretch justify-end'>
        {children}
      </div>
    </header>
  );
}
