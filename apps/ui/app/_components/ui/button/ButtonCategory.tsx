'use client';

import { Icon } from '@iconify/react';
import { type VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import type React from 'react';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { buttonCva, iconCva, labelCva } from './button.cva';

interface Props
  extends ReactElementProps<'div', 'color'>, VariantProps<typeof buttonCva> {
  label: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string | string[];
  custom?: {
    div?: string | string[];
    button?: string | string[];
    label?: string | string[];
    icon?: string | string[];
    children?: string | string[];
  };
}

export function ButtonCategory(props: Props) {
  const {
    label,
    icon,
    children,
    defaultOpen = false,
    display = 'block',
    textSize = 'sm',
    className,
    custom,
    ...divProps
  } = props;

  const [
    isOpen,
    setIsOpen,
  ] = useState(defaultOpen);

  const onToggleCategory = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={cn(
        'flex flex-col',
        custom?.div
      )}
      {...divProps}
    >
      <button
        type='button'
        onClick={onToggleCategory}
        className={cn(
          buttonCva({
            display,
            textSize,
          }),
          'justify-start',
          'cursor-pointer',
          className,
          custom?.button
        )}
      >
        {icon || (
          <span
            className={cn(
              iconCva({
                textSize,
              }),
              custom?.icon
            )}
          >
            <Icon
              icon={isOpen
                ? 'mdi:folder-open'
                : 'mdi:folder'}
            />
          </span>
        )}
        <span
          className={cn(
            labelCva,
            custom?.label
          )}
        >
          {label}
        </span>
      </button>
      {isOpen && children && (
        <div
          className={cn(
            'flex flex-col',
            custom?.children
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
