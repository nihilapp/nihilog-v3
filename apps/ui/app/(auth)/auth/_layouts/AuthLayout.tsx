'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { AuthLeft } from '@/(auth)/auth/_layouts/AuthLeft';
import { AuthRight } from '@/(auth)/auth/_layouts/AuthRight';
import { cn } from '@/_libs';

interface Props
  extends VariantProps<typeof cssVariants> {
  className?: string;
  children: React.ReactNode;
}

const cssVariants = cva(
  [ 'h-screen flex overflow-hidden', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AuthLayout({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <AuthLeft>
        {children}
      </AuthLeft>
      <AuthRight />
    </div>
  );
}
