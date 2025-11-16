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
  [
    'group flex gap-2 items-start bg-black-100 p-2 rounded-2 border border-black-200 transition-colors duration-200 ease-in-out',
    '[&:has(input:focus)]:border-blue-300 [&:has(textarea:focus)]:border-blue-300',
    '[&:has(input:focus)]:bg-blue-50 [&:has(textarea:focus)]:bg-blue-50',
  ],
  {
    variants: {
      direction: {
        horizontal: [ 'flex-row', ],
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
            'font-900 border border-black-300 bg-white p-2 text-sm text-justify rounded-2 transition-colors duration-200 ease-in-out',
            'group-[&:has(input:focus)]:border-blue-300 group-[&:has(textarea:focus)]:border-blue-300',
            'group-[&:has(input:focus)]:bg-white group-[&:has(textarea:focus)]:bg-white',
            'group-[&:has(input:focus)]:text-blue-900 group-[&:has(textarea:focus)]:text-blue-900',
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
