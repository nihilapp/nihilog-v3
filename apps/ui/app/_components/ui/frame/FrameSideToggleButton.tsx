'use client';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface Props {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  sidePosition?: 'left' | 'right';
}

export function FrameSideToggleButton({ isCollapsed, onToggleCollapse, sidePosition = 'left', }: Props) {
  const getIcon = () => {
    if (sidePosition === 'right') {
      return isCollapsed
        ? <MdChevronLeft className='size-5 border-2 border-black-900 rounded-1' />
        : <MdChevronRight className='size-5 border-2 border-black-900 rounded-1' />;
    }
    return isCollapsed
      ? <MdChevronRight className='size-5 border-2 border-black-900 rounded-1' />
      : <MdChevronLeft className='size-5 border-2 border-black-900 rounded-1' />;
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
      {getIcon()}
    </button>
  );
}
