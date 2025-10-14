'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Sidebar } from 'lucide-react';
import React from 'react';

import { SidebarHeader } from '@/(common)/_components/ui/sidebar';
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

export function AdminSide({ className, ...props }: Props) {
  return (
    <Sidebar>
      <SidebarHeader />
    </Sidebar>
  );
}
