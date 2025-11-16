'use client';

import { type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { menuCva, menuIconCva, menuLabelCva } from './menu.cva';

interface Props
  extends ReactElementProps<typeof Link, 'children'>,
  VariantProps<typeof menuCva> {
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
    display,
    textSize,
    className,
    custom,
    ...linkProps
  } = props;

  return (
    <Link
      className={cn(
        menuCva({
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
            menuIconCva({
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
          menuLabelCva,
          custom?.label
        )}
      >
        {label}
      </span>
    </Link>
  );
}
