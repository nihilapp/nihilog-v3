'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [ 'flex-row-2 border border-black-300 rounded-4 p-2 shadow-sm transition-colors duration-200 ease-in-out', ],
  {
    variants: {
      direction: {
        row: [ 'flex-row', ],
        col: [ 'flex-col', ],
      },
    },
    defaultVariants: {
      direction: 'row',
    },
    compoundVariants: [],
  }
);

export function ListItem({ className, children, direction, ...props }: Props) {
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
