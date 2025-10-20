'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';
import { type IconType } from 'react-icons';

import { Button } from '@/(common)/_components/ui/button';
import { cn } from '@/_libs';

interface Props
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  href: string;
  label: string;
  icon?: IconType;
  isActive?: boolean;
  asChild?: boolean;
}

const cssVariants = cva(
  [ 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground', ],
  {
    variants: {
      variant: {
        'default': 'bg-primary text-primary-foreground hover:bg-primary/90',
        'ghost': 'hover:bg-accent hover:text-accent-foreground',
        'outline': 'border bg-background shadow-xs hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-foreground',
        'secondary': 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        'sidebar': 'w-full justify-start gap-2 px-2 py-1.5 text-sm transition-all bg-transparent text-black-base hover:bg-blue-100 hover:text-blue-700 data-[active=true]:bg-blue-500 data-[active=true]:text-white data-[active=true]:hover:bg-blue-600',
        'sidebar-indent': 'w-[calc(100%-1rem)] ml-4 justify-start gap-2 px-2 py-1.5 text-sm transition-all bg-transparent text-black-base hover:bg-blue-100 hover:text-blue-700 data-[active=true]:bg-blue-500 data-[active=true]:text-white data-[active=true]:hover:bg-blue-600',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-2 gap-1.5 px-3',
        lg: 'h-10 rounded-2 px-6',
        sidebar: 'h-auto px-2 py-1.5',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
    },
  }
);

export function MenuLink({
  className,
  href,
  label,
  icon: Icon,
  variant,
  size,
  isActive = false,
  asChild = false,
  ...props
}: Props) {
  const buttonProps = {
    'className': cn(
      cssVariants({
        variant,
        size,
      }),
      className
    ),
    'data-active': isActive,
    ...props,
  };

  if (asChild) {
    return (
      <Button asChild {...(buttonProps as any)}>
        <Link href={href}>
          {Icon && <Icon />}
          {label}
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild {...(buttonProps as any)}>
      <Link href={href}>
        {Icon && <Icon />}
        {label}
      </Link>
    </Button>
  );
}
