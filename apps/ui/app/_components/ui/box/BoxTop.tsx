'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  showTitle?: boolean;
  title: string;
}

const cssVariants = cva(
  [ 'flex flex-row gap-2 items-center justify-between mb-5', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function BoxTop({ className, showTitle = true, title, children, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {showTitle && <h2 className='text-h6 font-bold'>{title}</h2>}
      {children}
    </div>
  );
}
