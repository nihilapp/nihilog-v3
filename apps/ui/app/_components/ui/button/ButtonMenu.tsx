'use client';

import { type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import type { IconType } from 'react-icons/lib';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { buttonCva, iconCva, labelCva } from './button.cva';

interface Props
  extends ReactElementProps<typeof Link, 'children' | 'color'>,
  VariantProps<typeof buttonCva> {
  label: string;
  icon?: IconType;
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
    icon: Icon,
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
    </Link>
  );
}
