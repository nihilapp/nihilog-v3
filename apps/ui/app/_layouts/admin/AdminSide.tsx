'use client';

import { useState } from 'react';

import { Box } from '@/_components/ui/box';
import { SideToggleButton } from '@/_layouts/common/SideToggleButton';
import { cn } from '@/_libs';

export function AdminSide() {
  const [
    isCollapsed,
    setIsCollapsed,
  ] = useState(false);

  const onToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Box.Panel
      mode='aside'
      className={cn(
        'relative transition-all duration-300 overflow-y-auto',
        isCollapsed
          ? 'w-full md:w-[60px]'
          : 'w-full md:w-[300px]'
      )}
    >
      <Box.Top showTitle={!isCollapsed} title='메뉴'>
        <Box.Action>
          <SideToggleButton
            isCollapsed={isCollapsed}
            onToggleCollapse={onToggleCollapse}
          />
        </Box.Action>
      </Box.Top>

      <Box.Content className={cn(
        'transition-opacity duration-300',
        isCollapsed && 'opacity-0 overflow-hidden'
      )}
      >
        content
      </Box.Content>
    </Box.Panel>
  );
}
