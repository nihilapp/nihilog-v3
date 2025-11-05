'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

import { Done } from './Done';
import { Loading } from './Loading';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  loading: boolean;
  done: boolean;
  mode?: 'normal' | 'session';
  loadingClassName?: string;
  doneClassName?: string;
  loadingMessage?: string;
  Loading?: React.ComponentType<React.HTMLAttributes<HTMLDivElement> & { message?: string }>;
  Done?: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
  children?: React.ReactNode;
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AsyncBoundary({
  loading,
  done,
  mode = 'normal',
  loadingClassName,
  doneClassName,
  loadingMessage,
  Loading: LoadingComponent = Loading,
  Done: DoneComponent = Done,
  children,
  ...props
}: Props) {
  if (loading) {
    return (
      <LoadingComponent
        className={cn(
          cssVariants({}),
          loadingClassName
        )}
        message={loadingMessage}
        {...props}
      />
    );
  }

  if (done) {
    return (
      <DoneComponent
        className={cn(
          cssVariants({}),
          doneClassName
        )}
        {...props}
      >
        {children}
      </DoneComponent>
    );
  }

  // session 모드일 때는 done이 false여도 컨텐츠를 보여줌
  if (mode === 'session' && !loading) {
    return (
      <DoneComponent
        className={cn(
          cssVariants({}),
          doneClassName
        )}
        {...props}
      >
        {children}
      </DoneComponent>
    );
  }

  return null;
}
