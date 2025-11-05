'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { CommonMain } from '@/_layouts/common/CommonMain';
import { CommonSide } from '@/_layouts/common/CommonSide';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'flex flex-row flex-1 p-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CommonContent({ className, children, ...props }: Props) {
  return (
    <section
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <CommonSide />
      <CommonMain>
        {children}
      </CommonMain>
    </section>
  );
}
