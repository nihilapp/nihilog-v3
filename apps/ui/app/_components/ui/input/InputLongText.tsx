'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'textarea'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [ 'border border-black-300 rounded-2 p-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function InputLongText({ className, ...props }: Props) {
  return (
    <textarea
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    />
  );
}
