'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'button', 'onClick' | 'onChange'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  value: 'Y' | 'N';
  onChange: (value: 'Y' | 'N') => void;
  custom?: {
    button?: string | string[];
    icon?: string | string[];
  };
}

const cssVariants = cva(
  [
    'flex items-center justify-center',
    'cursor-pointer transition-colors duration-200',
    'outline-none focus:outline-none active:outline-none',
    'focus-visible:outline-none',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function InputSwitch({ className, value, onChange, custom, ...props }: Props) {
  const onToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(value === 'Y'
      ? 'N'
      : 'Y');
  };

  return (
    <button
      type='button'
      onClick={onToggle}
      className={cn(
        cssVariants({}),
        className,
        custom?.button
      )}
      style={{ WebkitTapHighlightColor: 'transparent', }}
      aria-checked={value === 'Y'}
      role='switch'
      {...props}
    >
      {value === 'Y'
        ? (
          <FaToggleOn className={cn([
            'size-8 text-blue-500',
            custom?.icon,
          ])}
          />
        )
        : (
          <FaToggleOff className={cn([
            'size-8 text-black-400',
            custom?.icon,
          ])}
          />
        )}
    </button>
  );
}
