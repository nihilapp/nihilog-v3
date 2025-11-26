'use client';

import { type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { buttonCva, iconCva, labelCva } from './button.cva';

interface Props
  extends ReactElementProps<typeof Link, 'children' | 'color'>,
  VariantProps<typeof buttonCva> {
  label: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href: string;
  className?: string | string[];
  custom?: {
    label?: string | string[];
    icon?: string | string[];
    rightIcon?: string | string[];
  };
}

export function ButtonLink(props: Props) {
  const {
    label,
    icon,
    rightIcon,
    href,
    display,
    textSize,
    className,
    custom,
    ...linkProps
  } = props;

  return (
    <Link
      className={cn(
        buttonCva({
          display,
          textSize,
        }),
        className
      )}
      href={href}
      {...linkProps}
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
    </Link>
  );
}
