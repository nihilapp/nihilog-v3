'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  mode?: 'div' | 'section' | 'main' | 'aside';
  modal?: boolean;
  width?: number;
  height?: number;
}

const cssVariants = cva(
  [ 'flex flex-col gap-2 p-2 bg-white rounded-2 shadow-md border border-black-100', ],
  {
    variants: {
      modal: {
        true: [ 'm-auto', ],
        false: [ 'w-full h-full', ],
      },
    },
    defaultVariants: {
      modal: false,
    },
    compoundVariants: [],
  }
);

export function BoxPanel({
  className,
  mode: Component = 'div',
  modal = false,
  width,
  height,
  children,
  ...props
}: Props) {
  const modalSize: React.CSSProperties = width || height
    ? {
      width: `${width}px`,
      height: `${height}px`,
    }
    : {};

  return (
    <Component
      className={cn(
        cssVariants({ modal, }),
        className
      )}
      style={modalSize}
      {...props}
    >
      {children}
    </Component>
  );
}
