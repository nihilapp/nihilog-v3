'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends React.ThHTMLAttributes<HTMLTableCellElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'text-justify p-2 border-b border-black-100', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function TableTitle({ className, ...props }: Props) {
  return (
    <th
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    />
  );
}
