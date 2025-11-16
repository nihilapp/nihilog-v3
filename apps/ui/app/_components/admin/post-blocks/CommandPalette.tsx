'use client';

import { Icon } from '@iconify/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';
import type { Block } from '@/_types/posts.types';

interface BlockCommand {
  type: Block['type'];
  label: string;
  icon: string;
  description: string;
}

const blockCommands: BlockCommand[] = [
  {
    type: 'text',
    label: '텍스트',
    icon: 'material-symbols:text-fields',
    description: '일반 텍스트 블록',
  },
  {
    type: 'image',
    label: '이미지',
    icon: 'material-symbols:image',
    description: '이미지 블록',
  },
  {
    type: 'code',
    label: '코드',
    icon: 'material-symbols:code',
    description: '코드 블록',
  },
  {
    type: 'quote',
    label: '인용',
    icon: 'material-symbols:format-quote',
    description: '인용 블록',
  },
  {
    type: 'list',
    label: '목록',
    icon: 'material-symbols:list',
    description: '목록 블록',
  },
  {
    type: 'table',
    label: '표',
    icon: 'material-symbols:table',
    description: '표 블록',
  },
  {
    type: 'divider',
    label: '구분선',
    icon: 'material-symbols:horizontal-rule',
    description: '구분선 블록',
  },
];

interface Props
  extends Omit<ReactElementProps<'div'>, 'onSelect' | 'onClose'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  isOpen: boolean;
  onSelect: (type: Block['type']) => void;
  onClose: () => void;
  position?: {
    top: number;
    left: number;
  };
  custom?: {
    container?: string | string[];
    item?: string | string[];
  };
}

const cssVariants = cva(
  [
    'absolute z-50 bg-white border border-black-300 rounded-2 shadow-lg',
    'max-h-[300px] overflow-y-auto',
    'flex flex-col gap-1 p-1',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CommandPalette({ className, isOpen, onSelect, onClose, position, custom, ...props }: Props) {
  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(0);
  const [
    filteredCommands,
    setFilteredCommands,
  ] = useState(blockCommands);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(
    () => {
      if (isOpen) {
        setSelectedIndex(0);
        setFilteredCommands(blockCommands);
      }
    },
    [ isOpen, ]
  );

  useEffect(
    () => {
      if (!isOpen) {
        return;
      }

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        }
        else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        }
        else if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            onSelect(filteredCommands[selectedIndex].type);
            onClose();
          }
        }
        else if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      };

      window.addEventListener(
        'keydown',
        onKeyDown
      );

      return () => {
        window.removeEventListener(
          'keydown',
          onKeyDown
        );
      };
    },
    [
      isOpen,
      selectedIndex,
      filteredCommands,
      onSelect,
      onClose,
    ]
  );

  useEffect(
    () => {
      if (isOpen && itemRefs.current[selectedIndex]) {
        itemRefs.current[selectedIndex]?.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    },
    [
      isOpen,
      selectedIndex,
    ]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        cssVariants({}),
        className,
        custom?.container
      )}
      style={position
        ? {
          top: `${position.top}px`,
          left: `${position.left}px`,
        }
        : undefined}
      {...props}
    >
      {filteredCommands.map((command, index) => (
        <button
          key={command.type}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          type='button'
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-1 text-left',
            'hover:bg-black-100 transition-colors',
            selectedIndex === index && 'bg-blue-50 border border-blue-300',
            custom?.item
          )}
          onClick={() => {
            onSelect(command.type);
            onClose();
          }}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          <Icon
            icon={command.icon}
            className='size-5 text-black-600 shrink-0'
          />
          <div className='flex flex-col flex-1 min-w-0'>
            <span className='text-sm font-medium text-black-900'>
              {command.label}
            </span>
            <span className='text-xs text-black-500 truncate'>
              {command.description}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
