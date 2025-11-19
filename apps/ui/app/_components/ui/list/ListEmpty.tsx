'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { MdSearch } from 'react-icons/md';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'div'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  emptyMessage?: string;
}

const cssVariants = cva(
  [ 'flex-row-2 items-center justify-center', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function ListEmpty({ className, emptyMessage, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <MdSearch className='size-5' />
      <span className='text-gray-500 text-center'>{emptyMessage}</span>
    </div>
  );
}
