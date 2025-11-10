'use client';

import { Icon } from '@iconify/react';

interface Props {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  sidePosition?: 'left' | 'right';
}

export function FrameSideToggleButton({ isCollapsed, onToggleCollapse, sidePosition = 'left', }: Props) {
  const getIcon = () => {
    if (sidePosition === 'right') {
      return isCollapsed
        ? 'ri:expand-left-line'
        : 'ri:expand-right-line';
    }
    return isCollapsed
      ? 'ri:expand-right-line'
      : 'ri:expand-left-line';
  };

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
        icon={getIcon()}
        className='size-5 border-2 border-black-900 rounded-1'
      />
    </button>
  );
}
