'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  direction?: 'horizontal' | 'vertical';
  layout?: 'flex' | 'grid';
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {
      layout: {
        flex: [ 'flex', ],
        grid: [ 'grid', ],
      },
      direction: {
        horizontal: [ '', ],
        vertical: [ '', ],
      },
    },
    defaultVariants: {
      layout: 'flex',
      direction: 'horizontal',
    },
    compoundVariants: [
      {
        layout: 'flex',
        direction: 'horizontal',
        class: [ 'flex-row', ],
      },
      {
        layout: 'flex',
        direction: 'vertical',
        class: [ 'flex-col', ],
      },
      {
        layout: 'grid',
        direction: 'horizontal',
        class: [ 'grid-cols-12', ],
      },
      {
        layout: 'grid',
        direction: 'vertical',
        class: [ 'grid-rows-12', ],
      },
    ],
  }
);

export function BoxDivider({ className, direction = 'horizontal', layout = 'flex', children, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({
          direction,
          layout,
        }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
