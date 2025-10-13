'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  classNames?: {
    container: string;
    main: string;
    aside: string;
  };
}

const cssVariants = cva(
  [ 'flex flex-row gap-5 text-md', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CommonContent({ children, classNames, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        classNames?.container
      )}
      {...props}
    >
      <aside
        className={cn(
          '',
          classNames?.aside
        )}
      >
        categories
      </aside>
      <main
        className={cn(
          '',
          classNames?.main
        )}
      >
        {children}
      </main>
    </div>
  );
}
