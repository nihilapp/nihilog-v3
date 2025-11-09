'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { AuthMain } from '@/_layouts/auth/AuthMain';
import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'div'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [ 'flex flex-row flex-1 min-h-0 overflow-y-hidden', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AuthContent({ className, children, ...props }: Props) {
  return (
    <section
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <AuthMain>
        {children}
      </AuthMain>
    </section>
  );
}
