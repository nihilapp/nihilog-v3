'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'type' | 'className'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  type?: 'text' | 'number' | 'email' | 'password';
  as?: 'input' | 'textarea';
}

const cssVariants = cva(
  [ 'border border-black-300 rounded-2 p-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export const InputText = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  Props
>(({ className, type = 'text', as = 'input', ...props }, ref) => {
  if (as === 'textarea') {
    return (
      <textarea
        ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
        className={cn(
          cssVariants({}),
          className
        )}
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }

  return (
    <input
      ref={ref as React.ForwardedRef<HTMLInputElement>}
      type={type}
      className={cn(
        cssVariants({}),
        className
      )}
      {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  );
});

InputText.displayName = 'InputText';
