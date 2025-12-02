'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends ReactElementProps<'div'>, VariantProps<typeof cssVariants> {
  isError?: boolean;
  className?: string | string[];
  children?: ReactNode;
  custom?: {
    div?: string | string[];
  };
}

const cssVariants = cva(
  [ 'text-red-500 text-sm italic', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function InputErrorMessage({ className, children, custom, isError, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        'w-full min-w-0 overflow-hidden',
        className,
        custom?.div
      )}
      {...props}
    >
      {isError && (
        <span className='flex items-center gap-1 text-red-500 text-sm italic w-full min-w-0'>
          <FaTimes className='size-5 shrink-0' />
          <span className='wrap-break-word min-w-0 flex-1 overflow-hidden'>
            {children}
          </span>
        </span>
      )}
      {!isError && (
        <span className='text-green-500 text-sm italic'>
          <FaCheck className='size-5 ml-auto' />
        </span>
      )}
    </div>
  );
}
