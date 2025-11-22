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
  inputPosition?: 'top' | 'bottom';
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

export function InputTextArray({ className, value = [], onChange, placeholder = '입력 후 Enter를 누르세요', maxItems = 20, inputPosition = 'top', custom, ...props }: Props) {
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

  const onRemoveItem = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    // 버튼 자체가 클릭된 경우에만 삭제
    if (e.currentTarget === e.target || e.currentTarget.contains(e.target as Node)) {
      const newValue = value.filter((_, i) => i !== index);
      onChange?.(newValue);
    }
  };

  const inputElement = (
    <InputText
      type='text'
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={onInputKeyDown}
      placeholder={placeholder}
      disabled={value.length >= maxItems}
      className={custom?.input}
    />
  );

  const listElement = value.length > 0 && (
    <div className='flex flex-wrap gap-2'>
      {value.map((item, index) => (
        <div
          key={`item-${index}-${item}`}
          className={cn([
            'flex items-center gap-1 px-2 py-1 bg-black-100 text-black-900 rounded-2 text-sm',
            custom?.item,
          ])}
        >
          <span className={cn([ custom?.itemText, ])}>
            {item}
          </span>
          <button
            type='button'
            onClick={(e) => onRemoveItem(
              e,
              index
            )}
            className={cn([
              'flex items-center justify-center text-black-700 hover:text-black-900 hover:bg-black-200 rounded-1 p-0.5 transition-colors',
              'focus:outline-none focus:ring focus:ring-black-500',
              custom?.itemButton,
            ])}
            aria-label={`${item} 삭제`}
          >
            <MdClose className='size-4' />
          </button>
        </div>
      ))}
    </div>
  );

  const maxItemsMessage = value.length >= maxItems && (
    <div className='text-xs text-black-500'>
      최대 {maxItems}개까지 추가할 수 있습니다.
    </div>
  );

  const onContainerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // label 클릭 시 이벤트가 버블링되어 삭제 버튼이 클릭되는 것을 방지
    // 실제로 버튼이 클릭된 경우가 아니면 이벤트 전파 중단
    const target = e.target as HTMLElement;
    const isButtonClick = target.closest('button[type="button"]') !== null;
    if (!isButtonClick) {
      e.stopPropagation();
    }
  };

  return (
    <div
      className={cn(
        cssVariants({}),
        className,
        custom?.div
      )}
      onMouseDown={onContainerMouseDown}
      {...props}
    >
      {inputPosition === 'top' && inputElement}
      {listElement}
      {inputPosition === 'bottom' && inputElement}
      {maxItemsMessage}
    </div>
  );
}
