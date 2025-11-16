'use client';

import { Icon } from '@iconify/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, useState } from 'react';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

export interface Props
  extends ReactElementProps<'input', 'type'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  type?: 'text' | 'number' | 'email' | 'password';
}

const cssVariants = cva(
  [
    'border border-black-300 rounded-2 p-2 bg-white transition-colors duration-200 ease-in-out',
    'focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-300',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export const InputText = forwardRef<HTMLInputElement, Props>(function InputText({ className, type = 'text', ...props }, ref) {
  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword
    ? 'text'
    : type;

  return (
    <div className='relative w-full'>
      <input
        ref={ref}
        type={inputType}
        className={cn(
          cssVariants({}),
          'w-full',
          isPassword && 'pr-10',
          className
        )}
        {...props}
      />
      {isPassword && (
        <button
          type='button'
          onClick={() => setShowPassword((prev) => !prev)}
          className='absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center text-stone-600 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 rounded-1 p-1'
          aria-label={showPassword
            ? '비밀번호 숨기기'
            : '비밀번호 보기'}
        >
          <Icon
            icon={showPassword
              ? 'mdi:eye-off'
              : 'mdi:eye'}
            className='size-5'
          />
        </button>
      )}
    </div>
  );
});
