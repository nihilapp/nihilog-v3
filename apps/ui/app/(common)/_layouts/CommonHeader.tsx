'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import React from 'react';
import { FaHome } from 'react-icons/fa';

import { MenuLink } from '@/(common)/_components/MenuLink';
import { AuthButtons } from '@/(common)/_layouts/AuthButtons';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'text-md', ],
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
      <h1 className='flex items-center gap-2 p-2 border-b border-black-100'>
        <Image
          src='/images/nihil-logo.png'
          alt='logo'
          width={40}
          height={40}
          priority
        />
        <span className='text-md font-900'>NIHILOG</span>
      </h1>

      <div className='flex flex-row items-center justify-between p-2'>
        <nav>
          <ul>
            <li>
              <MenuLink href='/' label='Home' icon={FaHome} />
            </li>
          </ul>
        </nav>

        <AuthButtons />
      </div>
    </header>
  );
}
