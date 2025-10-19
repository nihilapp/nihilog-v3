'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { useAuthCardHeader } from '@/_entities/auth/auth.store';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'flex-1 flex flex-col justify-center px-8 py-12 lg:px-12 xl:px-16 overflow-hidden', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AuthLeft({ className, children, ...props }: Props) {
  const authCardHeader = useAuthCardHeader();

  return (
    <main
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <Card className='shadow-xl rounded-8 flex flex-col max-h-full'>
        <CardHeader className='flex-shrink-0'>
          <CardTitle>{authCardHeader.title}</CardTitle>
          <CardDescription>{authCardHeader.description}</CardDescription>
        </CardHeader>
        <CardContent className='flex-1 overflow-y-auto'>
          {children}
        </CardContent>
      </Card>
    </main>
  );
}
