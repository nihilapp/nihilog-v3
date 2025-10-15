'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { AdminSidebar } from '@/(admin)/admin/_layouts/AdminSidebar';
import { SidebarTrigger, useSidebar } from '@/(common)/_components/ui/sidebar';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  classNames?: {
    container: string;
    main: string;
  };
}

const cssVariants = cva(
  [ 'flex flex-1 flex-row overflow-hidden h-full', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AdminContent({ children, classNames, ...props }: Props) {
  const { toggleSidebar, } = useSidebar();

  const onToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <div
      className={cn(
        cssVariants({}),
        classNames?.container
      )}
      {...props}
    >
      <AdminSidebar />
      <div className='flex flex-row flex-1 transition-all duration-300 ease-in-out'>
        <div className='pt-4 pl-4'>
          <SidebarTrigger onClick={onToggleSidebar} />
        </div>
        <main
          className={cn(
            'flex-1 overflow-auto p-4 h-full transition-all duration-300 ease-in-out',
            classNames?.main
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
