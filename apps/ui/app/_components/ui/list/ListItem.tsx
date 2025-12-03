'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'div'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  checked?: boolean;
  onChange?: () => void;
}

const cssVariants = cva(
  [ 'flex-row-1 border border-black-300 rounded-2 transition-all duration-200 ease-in-out hover:border-black-300 hover:shadow-sm bg-white p-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function ListItem({
  className,
  children,
  checked,
  onChange,
  ...props
}: Props) {
  return (
    <div
      className={cn([
        cssVariants({ }),
        className,
      ])}
      {...props}
    >
      <div className='shrink-0'>
        <button
          type='button'
          onClick={onChange}
          className='cursor-pointer flex items-center justify-center'
        >
          {checked && <MdCheckBox className='size-5' />}
          {!checked && <MdCheckBoxOutlineBlank className='size-5' />}
        </button>
      </div>
      <div className='shrink-0 flex-1 flex flex-col gap-2'>
        {children}
      </div>
    </div>
  );
}
