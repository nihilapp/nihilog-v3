'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { Logo } from '@/_components/common/Logo';
import { AuthButtons } from '@/_layouts/common/AuthButtons';
import { CommonNav } from '@/_layouts/common/CommonNav';
import { cn } from '@/_libs';

interface Props
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [ 'layout-header flex-col md:flex-row gap-2 md:gap-0', ],
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

      <div className='flex flex-col md:flex-row gap-2 md:gap-5 items-center'>
        <CommonNav />
        <div className='hidden md:block w-[2px] h-[15px] bg-black-300' />
        <AuthButtons />
      </div>
    </header>
  );
}
