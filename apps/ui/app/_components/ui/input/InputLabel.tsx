'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { InputErrorMessage } from '@/_components/ui/input/InputErrorMessage';
import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends ReactElementProps<'label'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  label?: string | ReactNode;
  showErrorMessage?: boolean;
  errorMessage?: string;
  icon?: ReactNode;
  custom?: {
    label?: string | string[];
    span?: string | string[];
    icon?: string | string[];
  };
}

const cssVariants = cva(
  [ 'group flex gap-2', ],
  {
    variants: {
      direction: {
        horizontal: [ 'flex-row items-start', ],
        vertical: [ 'flex-col', ],
      },
    },
    defaultVariants: {
      direction: 'vertical',
    },
    compoundVariants: [],
  }
);

export function InputLabel({ className, children, id, label, errorMessage, icon, custom, direction, showErrorMessage = true, ...props }: Props) {
  return (
    <>
      <label
        htmlFor={id}
        className={cn(
          cssVariants({ direction, }),
          className,
          custom?.label
        )}
        {...props}
      >
        <span className={cn([
          'font-900 text-sm flex items-center gap-1',
          direction === 'horizontal' && 'w-[200px] shrink-0',
          custom?.span,
        ])}
        >
          {icon && (
            <span className={cn([
              'shrink-0',
              custom?.icon,
            ])}
            >
              {icon}
            </span>
          )}
          {label}
        </span>
        {children}
      </label>
      {showErrorMessage && (
        <InputErrorMessage isError={!!errorMessage} className='-mt-3 w-full'>
          {errorMessage}
        </InputErrorMessage>
      )}
    </>
  );
}
