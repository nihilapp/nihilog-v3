'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { Logo } from '@/_components/common/Logo';
import { AuthButtons } from '@/_layouts/common/AuthButtons';
import { CommonNav } from '@/_layouts/common/CommonNav';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'layout-header', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CommonHeader({ className, ...props }: Props) {
  return (
    <header
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <Logo />

      <div className='flex flex-row gap-5 items-center'>
        <CommonNav />
        <div className='w-[2px] h-[15px] bg-black-200' />
        <AuthButtons />
      </div>
    </header>
  );
}
