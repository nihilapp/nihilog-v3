'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends ReactElementProps<'label'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  label?: string;
  custom?: {
    label?: string | string[];
    span?: string | string[];
  };
}

const cssVariants = cva(
  [ 'group flex gap-2', ],
  {
    variants: {
      direction: {
        horizontal: [ 'flex-row items-start', ],
        vertical: [ 'flex-col', ],
      },
    },
    defaultVariants: {
      direction: 'vertical',
    },
    compoundVariants: [],
  }
);

export function InputLabel({ className, children, id, label, custom, direction, ...props }: Props) {
  return (
    <>
      {children && (
        <label
          htmlFor={id}
          className={cn(
            cssVariants({ direction, }),
            className,
            custom?.label
          )}
          {...props}
        >
          <span className={cn([
            'font-900 text-sm',
            direction === 'horizontal' && 'w-[200px] shrink-0',
            custom?.span,
          ])}
          >
            {label}
          </span>
          {children}
        </label>
      )}
    </>
  );
}
