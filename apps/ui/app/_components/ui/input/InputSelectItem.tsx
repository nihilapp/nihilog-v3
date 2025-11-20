'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { useInputSelectContext } from './InputSelectContext';

interface Props
  extends ReactElementProps<'div'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  value: string;
  children?: React.ReactNode;
  custom?: {
    div?: string | string[];
  };
}

const cssVariants = cva(
  [
    'px-3 py-2 cursor-pointer',
    'transition-colors duration-200 ease-in-out',
    'hover:bg-blue-50 hover:text-blue-900',
    'focus:bg-blue-50 focus:text-blue-900 focus:outline-none',
  ],
  {
    variants: {
      selected: {
        true: [ 'bg-blue-100 text-blue-900', ],
        false: [ 'bg-white text-black-900', ],
      },
    },
    defaultVariants: {
      selected: false,
    },
    compoundVariants: [],
  }
);

export function InputSelectItem({ className, value, children, custom, ...props }: Props) {
  const { value: selectedValue, onSelect, } = useInputSelectContext();
  const isSelected = selectedValue === value;

  const onClickItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(value);
  };

  const onKeyDownItem = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onSelect(value);
    }
  };

  return (
    <div
      role='option'
      aria-selected={isSelected}
      onClick={onClickItem}
      onKeyDown={onKeyDownItem}
      tabIndex={0}
      className={cn(
        cssVariants({ selected: isSelected, }),
        className,
        custom?.div
      )}
      {...props}
    >
      {children || value}
    </div>
  );
}
