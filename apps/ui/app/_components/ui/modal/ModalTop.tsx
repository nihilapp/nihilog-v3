'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { MdClose } from 'react-icons/md';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends ReactElementProps<'div', 'title'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  title: string;
  custom?: {
    div?: string | string[];
    button?: string | string[];
  };
  onClose?: () => void;
}

const cssVariants = cva(
  [ 'flex flex-row items-center shrink-0 rounded-t-2 border-b border-black-300 bg-black-100 p-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function ModalTop({ className, title, onClose, custom, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <h2 className='text-h6 font-bold flex-1'>{title}</h2>
      {onClose && (
        <button
          type='button'
          onClick={onClose}
          className={cn(
            'p-1 rounded-4 bg-black-700 text-white hover:bg-black-900',
            'transition-colors duration-200 ease-in-out',
            custom?.button
          )}
        >
          <MdClose className='size-6' />
        </button>
      )}
    </div>
  );
}
