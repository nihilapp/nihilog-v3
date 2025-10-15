'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { DateTime } from 'luxon';
import React from 'react';
import { FaCopyright } from 'react-icons/fa';

import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'text-xs text-sidebar-foreground/70', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CommonFooter({ className, ...props }: Props) {
  const startYear = 2025;
  const endYear = DateTime.now().year;

  const year = startYear === endYear
    ? startYear
    : `${startYear}-${endYear}`;

  return (
    <footer
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <small className='flex flex-row items-center gap-1'>
        <FaCopyright size={16} />
        <span>Copyright {year} NIHILncunia. All rights reserved.</span>
      </small>
    </footer>
  );
}
