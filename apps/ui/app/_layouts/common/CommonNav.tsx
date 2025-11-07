'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { Button } from '@/_components/common/Button';
import { cn } from '@/_libs';

interface Props
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

interface NavItem {
  label: string;
  href: string;
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const navItems: NavItem[] = [
  {
    label: '홈',
    href: '/',
  },
  {
    label: '포스트',
    href: '/posts',
  },
  {
    label: '태그 클라우드',
    href: '/tags',
  },
  {
    label: '아카이브',
    href: '/archive',
  },
];

export function CommonNav({ className, ...props }: Props) {
  return (
    <nav
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <ul className='flex flex-col md:flex-row gap-1 md:gap-2 text-sm md:text-base'>
        {navItems.map((item) => (
          <li key={item.href}>
            <Button
              type='menu'
              label={item.label}
              href={item.href}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
