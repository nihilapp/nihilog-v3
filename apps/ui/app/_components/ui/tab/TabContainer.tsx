'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useState } from 'react';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { TabContext } from './TabContext';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends ReactElementProps<'div'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  defaultTab?: string;
  custom?: {
    div?: string | string[];
  };
}

const cssVariants = cva(
  [ 'flex flex-col w-full ', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function TabContainer({ className, defaultTab, ...props }: Props) {
  const [
    selectedTab,
    setSelectedTab,
  ] = useState<string | null>(defaultTab ?? null);

  return (
    <TabContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
      }}
    >
      <div
        className={cn(
          cssVariants({}),
          className
        )}
        {...props}
      />
    </TabContext.Provider>
  );
}
