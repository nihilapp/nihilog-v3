'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'flex-1', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CommonMain({ className, children, ...props }: Props) {
  return (
    <main
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
