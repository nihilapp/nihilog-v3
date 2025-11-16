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
  [ 'flex flex-row gap-2 items-center justify-end shrink-0 bg-black-100 rounded-b-2 border-t border-black-300 p-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function ModalBottom({ className, ...props }: Props) {
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
