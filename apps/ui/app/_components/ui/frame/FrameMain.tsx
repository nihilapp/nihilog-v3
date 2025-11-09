'use client';

import { Box } from '@/_components/ui/box';
import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'main', 'ref'> {
  className?: string | string[];
  custom?: {
    div?: string | string[];
  };
}

export function FrameMain({ className, children, ...props }: Props) {
  return (
    <Box.Panel
      mode='main'
      className={cn([
        'overflow-y-auto p-2 md:p-4',
        className,
      ])}
      {...props}
    >
      {children}
    </Box.Panel>
  );
}
