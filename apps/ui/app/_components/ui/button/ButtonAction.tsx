'use client';

import { type VariantProps } from 'class-variance-authority';
import type { IconType } from 'react-icons/lib';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { buttonCva, iconCva, labelCva } from './button.cva';

interface Props
  extends ReactElementProps<'button', 'children' | 'color'>,
  VariantProps<typeof buttonCva> {
  label: string;
  icon?: IconType;
  className?: string | string[];
  custom?: {
    label?: string | string[];
    icon?: string | string[];
  };
}

export function ButtonAction(props: Props) {
  const {
    label,
    icon: Icon,
    mode,
    color,
    size,
    className,
    custom,
    ...buttonProps
  } = props;

  return (
    <button
      className={cn(
        buttonCva({
          mode,
          color: color as 'red' | 'blue' | 'orange' | 'black' | 'white' | 'grey' | null | undefined,
          size,
        }),
        className
      )}
      {...buttonProps}
    >
      {Icon && (
        <Icon
          className={cn(
            iconCva,
            custom?.icon
          )}
        />
      )}
      <span
        className={cn(
          labelCva,
          custom?.label
        )}
      >
        {label}
      </span>
    </button>
  );
}
