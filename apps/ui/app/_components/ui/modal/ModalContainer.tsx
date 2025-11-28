'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends ReactElementProps<'div'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  custom?: {
    div?: string | string[];
    backdrop?: string | string[];
  };
  width?: number;
  height?: number;
  open: boolean;
  onClose: () => void;
}

const cssVariants = cva(
  [ 'flex flex-col overflow-hidden', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const backdropVariants = cva(
  [
    'fixed inset-0 z-50 flex items-center justify-center',
    'bg-black/50 backdrop-blur-sm',
    'transition-opacity duration-200',
  ],
  {
    variants: {
      open: {
        true: 'opacity-100 pointer-events-auto',
        false: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

const modalVariants = cva(
  [
    'bg-white dark:bg-gray-900',
    'rounded-2 shadow-lg',
    'transition-transform duration-200',
  ],
  {
    variants: {
      open: {
        true: 'scale-100',
        false: 'scale-95',
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

export function ModalContainer({
  className,
  width = 500,
  height = 0,
  open,
  onClose,
  custom,
  ...props
}: Props) {
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onBackdropKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const onModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!open) return null;

  return (
    <div
      tabIndex={-1}
      className={cn(
        backdropVariants({ open, }),
        custom?.backdrop
      )}
      onClick={onBackdropClick}
      onKeyDown={onBackdropKeyDown}
    >
      <div
        className={cn(
          cssVariants({}),
          modalVariants({ open, }),
          className
        )}
        style={{
          width: `${width}px`,
          height: height > 0
            ? `${height}px`
            : 'auto',
          ...props.style,
        }}
        onClick={onModalClick}
        {...props}
      >
        {props.children}
      </div>
    </div>
  );
}
