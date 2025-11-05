'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLTableRowElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'border-b border-black-100', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function TableRow({ className, ...props }: Props) {
  return (
    <tr
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    />
  );
}
