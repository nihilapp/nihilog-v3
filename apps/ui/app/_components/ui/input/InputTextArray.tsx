'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends Omit<ReactElementProps<'div'>, 'onChange'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  items?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  custom?: {
    container?: string | string[];
    input?: string | string[];
    item?: string | string[];
    itemText?: string | string[];
    itemButton?: string | string[];
  };
}

const cssVariants = cva(
  [
    'flex flex-wrap gap-2 p-2 border border-black-300 rounded-2',
    'bg-white transition-colors duration-200 ease-in-out',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const itemCva = cva(
  [
    'inline-flex items-center gap-1 px-2 py-2 rounded-2',
    'bg-black-100 text-black-900 text-sm',
    'transition-colors duration-200 ease-in-out',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const itemButtonCva = cva(
  [
    'flex items-center justify-center p-0.5 rounded-1',
    'text-black-700 hover:text-black-900 hover:bg-black-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-500',
    'transition-colors duration-200 ease-in-out',
    'cursor-pointer',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const inputCva = cva(
  [
    'flex-1 min-w-[120px] border border-black-300 rounded-2 p-2 bg-white',
    'text-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-300',
    'transition-colors duration-200 ease-in-out',
    'placeholder:text-black-400',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function InputTextArray({
  items = [], onChange, placeholder, maxItems = 1, custom,
}: Props) {
  const [
    inputValue,
    setInputValue,
  ] = useState('');

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedValue = inputValue.trim();

      if (!trimmedValue) {
        return;
      }

      // 중복 체크
      if (items.includes(trimmedValue)) {
        setInputValue('');
        return;
      }

      // maxItems 체크
      if (maxItems && items.length >= maxItems) {
        setInputValue('');
        return;
      }

      // 새 태그 추가
      const newValue = [
        ...items,
        trimmedValue,
      ];
      onChange?.(newValue);
      setInputValue('');
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onRemoveItem = (index: number) => {
    const newValue = items.filter((_, i) => i !== index);
    onChange?.(newValue);
  };

  return (
    <div className={cn([
      cssVariants({}),
      custom?.container,
    ])}
    >
      {items?.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className={cn([
            itemCva({}),
            custom?.item,
          ])}
        >
          <span className={cn([
            'text-sm',
            custom?.itemText,
          ])}
          >
            {item}
          </span>
          <button
            type='button'
            onClick={() => onRemoveItem(index)}
            className={cn([
              itemButtonCva({}),
              custom?.itemButton,
            ])}
            aria-label={`${item} 태그 제거`}
          >
            <MdClose className='size-4' />
          </button>
        </div>
      ))}
      {items.length < maxItems && (
        <input
          type='text'
          placeholder={placeholder}
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          className={cn([
            inputCva({}),
            custom?.input,
          ])}
        />
      )}
    </div>
  );
}
