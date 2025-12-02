'use client';

import { type VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import type React from 'react';
import { MdFolder, MdFolderOpen, MdChevronRight, MdKeyboardArrowDown } from 'react-icons/md';

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
    rightIcon?: string | string[];
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
            {isOpen
              ? <MdFolderOpen className='size-5' />
              : <MdFolder className='size-5' />}
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
        <span
          className={cn(
            iconCva({
              textSize,
            }),
            'ml-auto',
            custom?.rightIcon
          )}
        >
          {isOpen
            ? <MdKeyboardArrowDown className='size-5' />
            : <MdChevronRight className='size-5' />}
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
