'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends ReactElementProps<'div'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  custom?: {
    div?: string | string[];
  };
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function EditorForm({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      content
    </div>
  );
}
