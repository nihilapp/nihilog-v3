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
  [ 'flex-row-2 border border-gray-200 rounded-2 transition-all duration-200 ease-in-out', ],
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
    compoundVariants: [
      {
        direction: 'row',
        class: [ 'hover:border-gray-300 hover:shadow-sm bg-white', ],
      },
    ],
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
