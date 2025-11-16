'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { useInputSelectContext } from './InputSelectContext';

interface Props
  extends ReactElementProps<'div'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  custom?: {
    div?: string | string[];
  };
}

const cssVariants = cva(
  [
    'absolute top-full left-0 right-0 z-50 mt-1',
    'flex flex-col',
    'border border-black-300 rounded-2 bg-white',
    'shadow-lg max-h-60 overflow-auto',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function InputSelect({ className, children, custom, ...props }: Props) {
  const { isOpen, } = useInputSelectContext();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role='listbox'
      className={cn(
        cssVariants({}),
        className,
        custom?.div
      )}
      {...props}
    >
      {children}
    </div>
  );
}
