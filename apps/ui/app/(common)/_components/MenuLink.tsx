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
}

const cssVariants = cva(
  [ 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground', ],
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border bg-background shadow-xs hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-2 gap-1.5 px-3',
        lg: 'h-10 rounded-2 px-6',
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
  ...props
}: Props) {
  return (
    <Button
      asChild
      className={cn(
        cssVariants({
          variant,
          size,
        }),
        className
      )}
    >
      <Link href={href} {...props}>
        {Icon && <Icon />}
        {label}
      </Link>
    </Button>
  );
}
