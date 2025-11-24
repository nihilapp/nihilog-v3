'use client';

import { useEffect, useState } from 'react';

import { Box } from '@/_components/ui/box';
import { Frame } from '@/_components/ui/frame';
import { useResponsive } from '@/_hooks/common';
import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'aside', 'ref'> {
  className?: string | string[];
  title?: string;
  sidePosition?: 'left' | 'right';
}

export function FrameSide({ className, title = '메뉴', sidePosition = 'left', children, ...props }: Props) {
  const { isMoSm, } = useResponsive();

  const [
    isCollapsed,
    setIsCollapsed,
  ] = useState(false);

  useEffect(
    () => {
      if (isMoSm) {
        setIsCollapsed(true);
      }
      else {
        setIsCollapsed(false);
      }
    },
    [ isMoSm, ]
  );

  const onToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

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
      >
        <Box.Action>
          <Frame.SideToggle
            isCollapsed={isCollapsed}
            onToggleCollapse={onToggleCollapse}
            sidePosition={sidePosition}
          />
        </Box.Action>
      </Box.Top>

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
