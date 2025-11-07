'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import { cn } from '@/_libs';

interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  message?: string;
}

const cssVariants = cva(
  [ 'flex items-center justify-center gap-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function Loading({ className, message = '로딩중...', ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <FaSpinner className='size-4 animate-spin' />
      <span>{message}</span>
    </div>
  );
}
