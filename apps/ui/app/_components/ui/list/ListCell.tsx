'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
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
}

const cssVariants = cva(
  [ 'flex flex-col rounded-2 gap-2', ],
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
        left: [ 'text-left', ],
        center: [ 'text-center', ],
        right: [ 'text-right', ],
        justify: [ 'text-justify', ],
      },
    },
    defaultVariants: {
      columnSize: 1,
      align: 'left',
    },
    compoundVariants: [],
  }
);

const itemNameCva = cva(
  [ 'text-xs text-gray-500 bg-black-50 p-1 rounded-2 border border-black-200', ],
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
    compoundVariants: [],
  }
);

export function ListCell({ className, checkbox, checked, columnSize, align, onChange, itemName, itemValue, selectLabel, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({
          columnSize,
        }),
        className
      )}
      {...props}
    >
      <React.Fragment>
        <span className={cn(itemNameCva({
          align,
        }))}
        >
          {itemName || selectLabel}
        </span>
        {checkbox
          ? (
            <button
              type='button'
              onClick={onChange}
              className='cursor-pointer mx-auto'
            >
              {checked
                ? (
                  <MdCheckBox className='size-6' />
                )
                : (
                  <MdCheckBoxOutlineBlank className='size-6' />
                )}
            </button>
          )
          : (
            <span className='text-black-900'>{itemValue}</span>
          )}

      </React.Fragment>
    </div>
  );
}
