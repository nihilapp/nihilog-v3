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
  [ 'flex-1 min-h-0 p-2 overflow-y-auto', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function ModalContent({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}
