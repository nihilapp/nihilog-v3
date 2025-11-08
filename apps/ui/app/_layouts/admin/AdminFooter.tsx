'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { FaRegCopyright } from 'react-icons/fa';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [ 'layout-footer', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AdminFooter({ className, ...props }: Props) {
  const [
    year,
    setYear,
  ] = useState<string>('2025');
  const startYear = 2025;

  useEffect(
    () => {
      const currentYear = DateTime.now().year;
      const yearString = currentYear - startYear
        ? `${startYear} - ${currentYear}`
        : String(startYear);
      setYear(yearString);
    },
    []
  );

  return (
    <footer
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <small className='flex flex-row gap-1 items-center justify-center text-xs md:text-sm'>
        <span>
          <FaRegCopyright />
          <span className='sr-only'>Copyright</span>
        </span>
        <span>{year}. NIHILncunia</span>
      </small>
    </footer>
  );
}
