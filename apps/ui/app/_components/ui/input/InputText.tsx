'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'input', 'type'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  type?: 'text' | 'number' | 'email' | 'password';
}

const cssVariants = cva(
  [ 'border border-black-300 rounded-2 p-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function InputText({ className, type = 'text', ...props }: Props) {
  return (
    <input
      type={type}
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    />
  );
}
