'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [ 'w-full flex flex-row items-center justify-center p-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AuthMain({ className, children, ...props }: Props) {
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
