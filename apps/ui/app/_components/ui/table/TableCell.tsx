'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends React.TdHTMLAttributes<HTMLTableCellElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'p-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function TableCell({ className, ...props }: Props) {
  return (
    <td
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    />
  );
}
