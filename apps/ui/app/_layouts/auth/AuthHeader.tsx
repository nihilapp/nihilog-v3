'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Logo } from '@/_components/common/Logo';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
}

const cssVariants = cva(
  [ 'layout-header', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const navItems: NavItem[] = [
  {
    label: '비밀번호를 잊었어요',
    href: '/auth/forgot-password',
  },
  {
    label: '회원가입',
    href: '/auth/subscribe',
  },
  {
    label: '로그인',
    href: '/auth/signin',
  },
];

export function AuthHeader({ className, ...props }: Props) {
  const pathname = usePathname();

  // 현재 경로가 아닌 항목만 필터링
  const visibleItems = navItems.filter((item) => item.href !== pathname);

  return (
    <header
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <Logo />

      {visibleItems.length > 0 && (
        <nav>
          <ul className='flex flex-row gap-2'>
            {visibleItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
