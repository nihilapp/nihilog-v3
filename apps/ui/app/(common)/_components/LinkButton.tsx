'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/(common)/_components/ui/button';
import { cn } from '@/_libs';

interface Props
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  href: string;
  children: React.ReactNode;
}

const cssVariants = cva(
  [ 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border', ],
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200',
        blue: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-800 hover:border-blue-300',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md gap-1.5 px-3',
        lg: 'h-10 rounded-md px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export function LinkButton({
  className,
  href,
  children,
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
        {children}
      </Link>
    </Button>
  );
}
