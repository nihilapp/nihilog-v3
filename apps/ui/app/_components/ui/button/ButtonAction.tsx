'use client';

import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { buttonCva, iconCva, labelCva } from './button.cva';

interface Props
  extends ReactElementProps<'button', 'children' | 'color'>,
  VariantProps<typeof buttonCva> {
  label: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string | string[];
  custom?: {
    label?: string | string[];
    icon?: string | string[];
    rightIcon?: string | string[];
  };
}

export function ButtonAction(props: Props) {
  const {
    label,
    icon,
    rightIcon,
    display,
    textSize,
    className,
    custom,
    ...buttonProps
  } = props;

  return (
    <button
      className={cn(
        buttonCva({
          display,
          textSize,
        }),
        className
      )}
      {...buttonProps}
    >
      {icon && (
        <span
          className={cn(
            iconCva({
              textSize,
            }),
            custom?.icon
          )}
        >
          {icon}
        </span>
      )}
      <span
        className={cn(
          labelCva,
          custom?.label
        )}
      >
        {label}
      </span>
      {rightIcon && (
        <span
          className={cn(
            iconCva({
              textSize,
            }),
            'ml-auto',
            custom?.rightIcon
          )}
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
}
