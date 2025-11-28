'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useEffect, useRef } from 'react';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { InputSelectProvider, useInputSelectContext } from './InputSelectContext';

interface InputSelectContainerProps
  extends ReactElementProps<'div'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  value?: string;
  onValueChange?: (value: string) => void;
  custom?: {
    div?: string | string[];
  };
}

const cssVariants = cva(
  [ 'relative flex flex-col', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface InputSelectContainerInnerProps
  extends ReactElementProps<'div'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  children?: React.ReactNode;
  custom?: {
    div?: string | string[];
  };
}

function InputSelectContainerInner({ className, children, custom, ...props }: InputSelectContainerInnerProps) {
  const { isOpen, setIsOpen, } = useInputSelectContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const onClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener(
          'mousedown',
          onClickOutside
        );
      }

      return () => {
        document.removeEventListener(
          'mousedown',
          onClickOutside
        );
      };
    },
    [
      isOpen,
      setIsOpen,
    ]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        cssVariants({}),
        className,
        custom?.div
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function InputSelectContainer({ className, value = '', onValueChange, children, ...props }: InputSelectContainerProps) {
  return (
    <InputSelectProvider
      value={value}
      onValueChange={onValueChange}
    >
      <InputSelectContainerInner
        className={className}
        {...props}
      >
        {children}
      </InputSelectContainerInner>
    </InputSelectProvider>
  );
}
