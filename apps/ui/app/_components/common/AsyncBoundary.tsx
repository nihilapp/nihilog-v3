'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { Done } from './Done';
import { Loading } from './Loading';

interface Props
  extends ReactElementProps<'div'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  loading: boolean;
  done: boolean;
  mode?: 'normal' | 'session';
  loadingMessage?: string;
  Loading?: React.ComponentType<ReactElementProps<'div'> & { message?: string;
    className?: string | string[]; }>;
  Done?: React.ComponentType<ReactElementProps<'div'> & { className?: string | string[] }>;
  children?: React.ReactNode;
  custom?: {
    loading?: string | string[];
    done?: string | string[];
  };
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
  loadingMessage,
  Loading: LoadingComponent = Loading,
  Done: DoneComponent = Done,
  children,
  custom,
  ...props
}: Props) {
  if (loading) {
    return (
      <LoadingComponent
        className={cn(
          cssVariants({}),
          custom?.loading
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
          custom?.done
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
          custom?.done
        )}
        {...props}
      >
        {children}
      </DoneComponent>
    );
  }

  return null;
}
