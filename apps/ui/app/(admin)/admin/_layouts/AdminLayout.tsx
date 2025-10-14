'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { AdminSide } from '@/(admin)/admin/_layouts/AdminSide';
import { SidebarProvider, SidebarTrigger } from '@/(common)/_components/ui/sidebar';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AdminLayout({ className, children, ...props }: Props) {
  return (
    <>
      <SidebarProvider>
        <AdminSide />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
