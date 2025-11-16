'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'textarea'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [
    'flex-1 border border-black-300 rounded-2 p-2 bg-white transition-colors duration-200 ease-in-out',
    'focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-300',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export const InputLongText = forwardRef<HTMLTextAreaElement, Props>(function InputLongText({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    />
  );
});
