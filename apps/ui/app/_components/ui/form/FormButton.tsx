'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'button', 'type'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  type?: 'submit' | 'reset';
  label: string;
  onClick?: () => void;
}

const cssVariants = cva(
  [ 'p-2 flex-1 rounded-2 cursor-pointer transition-colors duration-200', ],
  {
    variants: {
      type: {
        submit: [ 'bg-stone-600 text-white hover:bg-stone-700', ],
        reset: [ 'bg-red-500 text-white hover:bg-red-600', ],
      },
    },
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FormButton({ className, type = 'submit', label, onClick, ...props }: Props) {
  return (
    <button
      className={cn(
        cssVariants({ type, }),
        className
      )}
      type={type}
      {...(onClick && { onClick, })}
      {...props}
    >
      {label}
    </button>
  );
}
