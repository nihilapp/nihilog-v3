'use client';

import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { badgeCva, badgeIconCva, badgeLabelCva } from './badge.cva';

interface Props
  extends ReactElementProps<'div', 'color'>,
  VariantProps<typeof badgeCva> {
  label: string;
  icon?: React.ReactNode;
  className?: string | string[];
  custom?: {
    label?: string | string[];
    icon?: string | string[];
  };
}

export function Badge(props: Props) {
  const {
    label,
    icon,
    display,
    textSize,
    color,
    className,
    custom,
    ...divProps
  } = props;

  return (
    <div
      className={cn(
        badgeCva({
          display,
          textSize,
          color: color as 'red' | 'blue' | 'orange' | 'green' | 'gray' | 'black' | 'white' | null | undefined,
        }),
        className
      )}
      {...divProps}
    >
      {icon && (
        <span
          className={cn(
            badgeIconCva({
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
          badgeLabelCva,
          custom?.label
        )}
      >
        {label}
      </span>
    </div>
  );
}
