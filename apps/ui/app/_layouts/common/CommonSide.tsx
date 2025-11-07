'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';

import { Box } from '@/_components/ui/box';
import { cn } from '@/_libs';

export function CommonSide() {
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
      <div className='flex flex-row justify-end items-center mb-2'>
        <button
          type='button'
          onClick={onToggleCollapse}
          className='p-1 hover:bg-black-50 rounded-2 transition-colors'
          aria-label={isCollapsed
            ? '사이드바 펼치기'
            : '사이드바 접기'}
        >
          <Icon
            icon={isCollapsed
              ? 'ri:expand-right-line'
              : 'ri:expand-left-line'}
            className='size-5 border-2 border-black-base rounded-1'
          />
        </button>
      </div>
      <div
        className={cn(
          'transition-opacity duration-300',
          isCollapsed && 'opacity-0 overflow-hidden'
        )}
      >
        content
      </div>
    </Box.Panel>
  );
}
