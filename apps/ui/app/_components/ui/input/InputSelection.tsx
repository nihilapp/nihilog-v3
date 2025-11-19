'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { useInputSelectContext } from './InputSelectContext';

interface Props
  extends ReactElementProps<'button'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  placeholder?: string;
  displayValue?: (value: string) => string;
  custom?: {
    button?: string | string[];
    icon?: string | string[];
  };
}

const cssVariants = cva(
  [
    'flex items-center justify-between gap-2',
    'border border-black-300 rounded-2 p-2 bg-white',
    'transition-colors duration-200 ease-in-out',
    'focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-300',
    'hover:border-black-400',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function InputSelection({ className, placeholder = '선택하세요', displayValue, custom, ...props }: Props) {
  const { value, isOpen, onToggle, } = useInputSelectContext();

  const displayText = value
    ? (
      displayValue
        ? displayValue(value)
        : value
    )
    : placeholder;

  return (
    <button
      type='button'
      onClick={onToggle}
      className={cn(
        cssVariants({}),
        className,
        custom?.button
      )}
      aria-expanded={isOpen}
      aria-haspopup='listbox'
      {...props}
    >
      <span className='flex-1 text-left'>
        {displayText}
      </span>
      {isOpen
        ? (
          <MdKeyboardArrowUp className={cn(
            'size-5 shrink-0 transition-transform duration-200',
            custom?.icon
          )}
          />
        )
        : (
          <MdKeyboardArrowDown className={cn(
            'size-5 shrink-0 transition-transform duration-200',
            custom?.icon
          )}
          />
        )}
    </button>
  );
}
