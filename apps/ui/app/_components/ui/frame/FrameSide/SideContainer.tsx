'use client';

import { useEffect, useState } from 'react';

import { Box } from '@/_components/ui/box';
import { useResponsive } from '@/_hooks/common';
import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'aside', 'ref'> {
  className?: string | string[];
  title?: string;
  sidePosition?: 'left' | 'right';
  isCollapsed?: boolean;
}

export function SideContainer({ className, title = '메뉴', sidePosition = 'left', isCollapsed: externalIsCollapsed, children, ...props }: Props) {
  const { isMoSm, } = useResponsive();

  const [
    internalIsCollapsed,
    setInternalIsCollapsed,
  ] = useState(false);

  useEffect(
    () => {
      if (externalIsCollapsed === undefined && isMoSm) {
        setInternalIsCollapsed(true);
      }
      else if (externalIsCollapsed === undefined) {
        setInternalIsCollapsed(false);
      }
    },
    [
      isMoSm,
      externalIsCollapsed,
    ]
  );

  const isCollapsed = externalIsCollapsed !== undefined
    ? externalIsCollapsed
    : internalIsCollapsed;

  return (
    <Box.Panel
      mode='aside'
      className={cn(
        'relative transition-all duration-300 overflow-y-auto shrink-0',
        isCollapsed
          ? 'w-[60px]'
          : 'w-[300px]',
        className
      )}
      {...props}
    >
      <Box.Top
        showTitle={!isCollapsed}
        title={title}
        className={cn(sidePosition === 'right' && 'flex-row-reverse')}
      />

      <Box.Content className={cn(
        'transition-opacity duration-300',
        isCollapsed && 'opacity-0 overflow-hidden'
      )}
      >
        {children}
      </Box.Content>
    </Box.Panel>
  );
}
