'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [ 'w-full h-full min-h-0 flex flex-row items-center justify-center p-2 md:p-4 overflow-y-auto', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AuthMain({ className, children, ...props }: Props) {
  return (
    <main
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
