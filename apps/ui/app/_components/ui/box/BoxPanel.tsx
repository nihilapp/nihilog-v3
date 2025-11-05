'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  mode?: 'div' | 'section' | 'main' | 'aside';
  colspan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  rowspan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const cssVariants = cva(
  [ 'flex flex-col gap-2 p-2 bg-white rounded-2 shadow-md border border-black-100', ],
  {
    variants: {
      Mode: {
        div: [ 'flex-1', ],
        section: [ 'flex-1', ],
        main: [ 'flex-1', ],
        aside: [ '', ],
      },
      colspan: {
        1: [ 'col-span-1', ],
        2: [ 'col-span-2', ],
        3: [ 'col-span-3', ],
        4: [ 'col-span-4', ],
        5: [ 'col-span-5', ],
        6: [ 'col-span-6', ],
        7: [ 'col-span-7', ],
        8: [ 'col-span-8', ],
        9: [ 'col-span-9', ],
        10: [ 'col-span-10', ],
        11: [ 'col-span-11', ],
        12: [ 'col-span-12', ],
      },
      rowspan: {
        1: [ 'row-span-1', ],
        2: [ 'row-span-2', ],
        3: [ 'row-span-3', ],
        4: [ 'row-span-4', ],
        5: [ 'row-span-5', ],
        6: [ 'row-span-6', ],
        7: [ 'row-span-7', ],
        8: [ 'row-span-8', ],
        9: [ 'row-span-9', ],
        10: [ 'row-span-10', ],
        11: [ 'row-span-11', ],
        12: [ 'row-span-12', ],
      },
    },
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function BoxPanel({
  className,
  mode: Mode = 'div',
  colspan,
  rowspan,
  children,
  ...props
}: Props) {
  return (
    <Mode
      className={cn(
        cssVariants({
          Mode,
          colspan,
          rowspan,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Mode>
  );
}
