'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'div'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [ 'flex gap-2', ],
  {
    variants: {
      direction: {
        horizontal: [ 'flex-row', ],
        vertical: [ 'flex-col', ],
      },
    },
    defaultVariants: {
      direction: 'horizontal',
    },
    compoundVariants: [],
  }
);

export function BoxAction({ className, direction, children, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({ direction, }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
