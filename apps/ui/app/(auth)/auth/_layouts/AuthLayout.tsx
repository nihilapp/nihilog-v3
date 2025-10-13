'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { AuthLeft } from '@/(auth)/auth/_layouts/AuthLeft';
import { AuthRight } from '@/(auth)/auth/_layouts/AuthRight';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/(common)/_components/ui/resizable';
import { cn } from '@/_libs';

interface Props
  extends VariantProps<typeof cssVariants> {
  className?: string;
  children: React.ReactNode;
}

const cssVariants = cva(
  [ 'flex h-full text-md', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AuthLayout({ className, children, ...props }: Props) {
  return (
    <ResizablePanelGroup
      direction='horizontal'
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <ResizablePanel defaultSize={60}>
        <AuthLeft>
          {children}
        </AuthLeft>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={40}>
        <AuthRight />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
