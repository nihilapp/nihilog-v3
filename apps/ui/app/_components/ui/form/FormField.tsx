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
  [ 'flex flex-col gap-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FormField({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
