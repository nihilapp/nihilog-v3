'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { InputText } from './InputText';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends Omit<ReactElementProps<'div'>, 'onChange'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  custom?: {
    div?: string | string[];
    input?: string | string[];
    item?: string | string[];
    itemText?: string | string[];
    itemButton?: string | string[];
  };
}

const cssVariants = cva(
  [ 'flex flex-col gap-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function InputTextArray({ className, value = [], onChange, placeholder = '입력 후 Enter를 누르세요', maxItems = 20, custom, ...props }: Props) {
  const [
    inputValue,
    setInputValue,
  ] = useState('');

  const onAddItem = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      return;
    }

    if (value.length >= maxItems) {
      return;
    }

    if (value.includes(trimmedValue)) {
      setInputValue('');
      return;
    }

    onChange?.([
      ...value,
      trimmedValue,
    ]);
    setInputValue('');
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onAddItem();
    }
  };

  const onRemoveItem = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange?.(newValue);
  };

  return (
    <div
      className={cn(
        cssVariants({}),
        className,
        custom?.div
      )}
      {...props}
    >
      <InputText
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onInputKeyDown}
        placeholder={placeholder}
        disabled={value.length >= maxItems}
        className={custom?.input}
      />
      {value.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {value.map((item, index) => (
            <div
              key={index}
              className={cn([
                'flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-900 rounded-2 text-sm',
                custom?.item,
              ])}
            >
              <span className={cn([ custom?.itemText, ])}>
                {item}
              </span>
              <button
                type='button'
                onClick={() => onRemoveItem(index)}
                className={cn([
                  'flex items-center justify-center text-blue-700 hover:text-blue-900 hover:bg-blue-200 rounded-1 p-0.5 transition-colors',
                  'focus:outline-none focus:ring focus:ring-blue-500',
                  custom?.itemButton,
                ])}
                aria-label={`${item} 삭제`}
              >
                <MdClose className='size-4' />
              </button>
            </div>
          ))}
        </div>
      )}
      {value.length >= maxItems && (
        <div className='text-xs text-black-500'>
          최대 {maxItems}개까지 추가할 수 있습니다.
        </div>
      )}
    </div>
  );
}
