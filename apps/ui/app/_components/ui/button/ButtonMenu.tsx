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
  href: string;
  className?: string | string[];
  custom?: {
    label?: string | string[];
    icon?: string | string[];
  };
}

export function ButtonMenu(props: Props) {
  const {
    label,
    icon,
    href,
    mode,
    color,
    size,
    className,
    custom,
    ...linkProps
  } = props;

  return (
    <Link
      className={cn(
        buttonCva({
          mode: mode ?? 'ghost',
          color: color as 'red' | 'blue' | 'orange' | 'black' | 'white' | 'grey' | null | undefined,
          size,
        }),
        className
      )}
      href={href}
      {...linkProps}
    >
      {icon && (
        <span className={cn(
          iconCva,
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
    </Link>
  );
}
