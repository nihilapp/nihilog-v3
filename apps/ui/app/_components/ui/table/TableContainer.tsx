'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLTableElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'w-full bg-white border border-black-100', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function TableContainer({ className, children, ...props }: Props) {
  return (
    <table
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {children}
    </table>
  );
}
