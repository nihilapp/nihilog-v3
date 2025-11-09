'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { Frame } from '@/_components/ui/frame';
import { useResponsive } from '@/_entities/common/hooks';
import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'div'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  withSide?: boolean;
  sidePosition?: 'left' | 'right';
  custom?: {
    div?: string | string[];
  };
}

const cssVariants = cva(
  [ 'flex flex-col md:flex-row gap-2 overflow-y-hidden flex-1 p-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FrameContent({ className, withSide = false, sidePosition = 'left', ...props }: Props) {
  const { isMoSm, } = useResponsive();

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {withSide && (
        <Frame.Side
          className={cn(
            !isMoSm && sidePosition === 'left' && 'order-1',
            !isMoSm && sidePosition === 'right' && 'order-2',
            isMoSm && 'order-2'
          )}
        >
          side
        </Frame.Side>
      )}

      <Frame.Main
        className={cn(
          !isMoSm && sidePosition === 'left' && 'order-2',
          !isMoSm && sidePosition === 'right' && 'order-1',
          isMoSm && 'order-1'
        )}
      >
        main
      </Frame.Main>
    </div>
  );
}
