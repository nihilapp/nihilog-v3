'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/_components/common/Logo';
import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

interface NavItem {
  label: string;
  href: string;
}

const cssVariants = cva(
  [ 'layout-header flex-col md:flex-row gap-2 md:gap-0', ],
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
          <ul className='flex flex-col md:flex-row gap-1 md:gap-2 text-sm md:text-base'>
            {visibleItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className='block p-1 md:p-0'
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
