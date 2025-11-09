'use client';

import type React from 'react';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props extends ReactElementProps<'div'> {
  className?: string | string[];
  children?: React.ReactNode;
}

export function Done({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
}
