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
}

const cssVariants = cva(
  [ 'frame-header flex-col md:flex-row gap-2 md:gap-0', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FrameHeader({ className, text, children, ...props }: Props) {
  return (
    <header
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <Logo text={text} />

      {children}
    </header>
  );
}
