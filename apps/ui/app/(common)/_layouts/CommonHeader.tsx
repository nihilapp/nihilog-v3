'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { AuthButtons } from '@/(common)/_layouts/AuthButtons';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {}

const cssVariants = cva([ 'flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6', ]);

export function CommonHeader({ className, ...props }: Props) {
  return (
    <header className={cn(cssVariants({}), className)} {...props}>
      <Link href='/' className='flex items-center gap-2'>
        <div className='flex items-center gap-2'>
          <div className='h-8 w-8 rounded-lg bg-primary flex items-center justify-center'>
            <span className='text-primary-foreground font-bold text-sm'>N</span>
          </div>
          <span className='font-bold text-lg text-foreground'>Nihil Turbo</span>
        </div>
      </Link>
      <AuthButtons />
    </header>
  );
}
