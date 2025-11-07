'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  title: string;
}

const cssVariants = cva(
  [ 'flex flex-col gap-2 mb-5', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function BoxTop({ className, title, children, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <h2 className='text-h6 font-bold'>{title}</h2>
      {children}
    </div>
  );
}
