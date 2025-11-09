'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { Logo } from '@/_components/common/Logo';
import { AdminNav } from '@/_layouts/admin/AdminNav';
import { AuthButtons } from '@/_layouts/common/AuthButtons';
import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'header'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [ 'frame-header flex-col md:flex-row gap-2 md:gap-0', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

// TODO: 1. 카테고리에 포스트 관리 가장 먼저 생성
// TODO: 2. 어드민 레이아웃 상단바 메뉴 조정

export function AdminHeader({ className, ...props }: Props) {
  return (
    <header
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <Logo text='NIHILOG ADMIN' />

      <div className='flex flex-col md:flex-row gap-2 md:gap-5 items-center'>
        <AdminNav />
        <div className='hidden md:block w-[2px] h-[15px] bg-black-300' />
        <AuthButtons />
      </div>
    </header>
  );
}
