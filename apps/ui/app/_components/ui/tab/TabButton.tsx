'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { useTabContext } from './TabContext';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends ReactElementProps<'button'>, VariantProps<typeof cssVariants> {
  tabId: string;
  className?: string | string[];
  custom?: {
    button?: string | string[];
  };
}

const cssVariants = cva(
  [ 'cursor-pointer px-2 py-1 border border-t-0 border-black-300 flex-1 rounded-2 rounded-t-0 hover:bg-black-900 hover:border-black-900 hover:text-white transition-colors duration-200 ease-in-out', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function TabButton({ tabId, className, onClick, ...props }: Props) {
  const { setSelectedTab, selectedTab, } = useTabContext();

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTab(tabId);
    onClick?.(e);
  };

  return (
    <button
      type='button'
      onClick={onButtonClick}
      className={cn(
        cssVariants({}),
        selectedTab === tabId && 'border-t-2 border-black-900 bg-black-900 text-white',
        selectedTab !== tabId && 'border-t-2 border-t-black-900',
        className
      )}
      {...props}
    />
  );
}
