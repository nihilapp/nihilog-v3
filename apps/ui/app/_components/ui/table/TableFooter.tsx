'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLTableSectionElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function TableFooter({ className, ...props }: Props) {
  return (
    <tfoot
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    />
  );
}
