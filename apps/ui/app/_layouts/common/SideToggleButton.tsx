'use client';

import { Icon } from '@iconify/react';

interface Props {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function SideToggleButton({ isCollapsed, onToggleCollapse, }: Props) {
  return (
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
  );
}
