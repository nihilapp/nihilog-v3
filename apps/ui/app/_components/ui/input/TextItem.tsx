'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { MdClose } from 'react-icons/md';

import { cn, getColorByName } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'div'>, VariantProps<typeof itemCva> {
  text: string;
  icon?: ReactNode;
  onDelete?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  className?: string | string[];
  color?: string;
  custom?: {
    item?: string | string[];
    icon?: string | string[];
    text?: string | string[];
    deleteButton?: string | string[];
  };
  style?: React.CSSProperties;
}

const itemCva = cva(
  [ 'button-base inline-flex gap-1 rounded-2 bg-black-100 text-black-900 text-sm cursor-pointer', ],
  {
    variants: {
      clickable: {
        true: [ 'cursor-pointer', ],
        false: [],
      },
    },
    defaultVariants: {
      clickable: false,
    },
    compoundVariants: [],
  }
);

const iconCva = cva(
  [ 'shrink-0 text-black-700', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const deleteButtonCva = cva(
  [
    'flex items-center justify-center p-0.5 rounded-1 text-black-700 cursor-pointer',
    'hover:text-black-900 hover:bg-black-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-500',
    'transition-colors duration-200 ease-in-out',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function TextItem({
  text,
  icon,
  onDelete,
  onClick,
  className,
  color,
  custom,
  style,
  clickable,
  ...props
}: Props) {
  const onDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(e);
  };

  const colorPalette = color
    ? getColorByName(color)
    : undefined;

  const itemStyle: React.CSSProperties = {
    ...style,
  };

  const iconStyle: React.CSSProperties = {};

  return (
    <div
      className={cn(
        itemCva({ clickable: clickable ?? !!onClick, }),
        colorPalette
          ? colorPalette.value
          : 'button-normal-black-100 hover:button-normal-black-200 hover:text-black-900',
        className,
        custom?.item
      )}
      onClick={onClick}
      style={itemStyle}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            iconCva({}),
            custom?.icon
          )}
          style={iconStyle}
        >
          {icon}
        </span>
      )}
      <span
        className={cn(
          'text-sm flex-1',
          custom?.text
        )}
      >
        {text}
      </span>
      {onDelete && (
        <button
          type='button'
          className={cn(
            deleteButtonCva({}),
            custom?.deleteButton
          )}
          onClick={onDeleteClick}
          aria-label={`${text} 제거`}
        >
          <MdClose className='size-5' />
        </button>
      )}
    </div>
  );
}
