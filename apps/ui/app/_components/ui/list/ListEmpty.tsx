'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  emptyMessage?: string;
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function ListEmpty({ className, emptyMessage, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <span className='text-gray-500'>{emptyMessage}</span>
    </div>
  );
}
