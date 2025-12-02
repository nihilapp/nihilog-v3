'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'div'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  checkbox?: boolean;
  checked?: boolean;
  onChange?: () => void;
  itemName?: string;
  itemValue?: React.ReactNode;
  selectLabel?: string;
  icon?: React.ReactNode;
  isHeader?: boolean;
}

const cssVariants = cva(
  [ 'flex items-center rounded-2', ],
  {
    variants: {
      columnSize: {
        1: [ 'flex-1', ],
        2: [ 'flex-2', ],
        3: [ 'flex-3', ],
        4: [ 'flex-4', ],
        5: [ 'flex-5', ],
        6: [ 'flex-6', ],
        7: [ 'flex-7', ],
        8: [ 'flex-8', ],
        9: [ 'flex-9', ],
        10: [ 'flex-10', ],
        11: [ 'flex-11', ],
        12: [ 'flex-12', ],
      },
      align: {
        left: [ 'text-left justify-start', ],
        center: [ 'text-center justify-center', ],
        right: [ 'text-right justify-end', ],
        justify: [ 'text-justify justify-between', ],
      },
    },
    defaultVariants: {
      columnSize: 1,
      align: 'left',
    },
    compoundVariants: [],
  }
);

const headerCva = cva(
  [ 'text-sm font-medium text-gray-600 flex items-center gap-1 px-3 py-2 w-full', ],
  {
    variants: {
      align: {
        left: [ 'justify-start', ],
        center: [ 'justify-center', ],
        right: [ 'justify-end', ],
        justify: [ 'justify-between', ],
      },
    },
    defaultVariants: {
      align: 'left',
    },
    compoundVariants: [],
  }
);

const itemValueCva = cva(
  [ 'text-black-900 flex items-center h-full px-3 py-2 w-full', ],
  {
    variants: {
      align: {
        left: [ 'text-left', ],
        center: [ 'text-center', ],
        right: [ 'text-right', ],
        justify: [ 'text-justify', ],
      },
    },
    defaultVariants: {
      align: 'left',
    },
  }
);

export function ListCell({ className, checkbox, checked, columnSize, align, onChange, itemName, itemValue, selectLabel, icon, isHeader = false, ...props }: Props) {
  if (isHeader) {
    return (
      <div
        className={cn(
          cssVariants({
            columnSize,
            align,
          }),
          className
        )}
        {...props}
      >
        <span className={cn(headerCva({ align, }))}>
          {icon && (
            <span className='shrink-0 flex items-center'>
              {icon}
            </span>
          )}
          {itemName || selectLabel}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        cssVariants({
          columnSize,
          align,
        }),
        className
      )}
      {...props}
    >
      {checkbox
        ? (
          <button
            type='button'
            onClick={onChange}
            className='cursor-pointer mx-auto h-full flex items-center justify-center'
          >
            {checked
              ? (
                <MdCheckBox className='size-5' />
              )
              : (
                <MdCheckBoxOutlineBlank className='size-5' />
              )}
          </button>
        )
        : (
          <span className={cn(itemValueCva({ align, }))}>
            {itemValue}
          </span>
        )}
    </div>
  );
}
