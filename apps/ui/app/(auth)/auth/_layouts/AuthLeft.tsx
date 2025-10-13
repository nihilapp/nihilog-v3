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
  [ 'h-full overflow-y-auto p-5', ],
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
      <Card className='h-full'>
        <CardHeader>
          <CardTitle>{authCardHeader.title}</CardTitle>
          <CardDescription>{authCardHeader.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </main>
  );
}
