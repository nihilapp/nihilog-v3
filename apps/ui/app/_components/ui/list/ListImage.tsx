'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [ 'size-[300px]', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function ListImage({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      content
    </div>
  );
}
