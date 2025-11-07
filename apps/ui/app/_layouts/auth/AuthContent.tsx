'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { AuthMain } from '@/_layouts/auth/AuthMain';
import { cn } from '@/_libs';

interface Props
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [ 'flex flex-row flex-1', ],
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
