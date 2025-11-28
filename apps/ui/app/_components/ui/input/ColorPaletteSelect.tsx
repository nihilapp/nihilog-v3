'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { ALL_COLOR_PALETTE } from '@/_libs';
import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

import { InputSelect } from './InputSelect';
import { InputSelectContainer } from './InputSelectContainer';
import { InputSelection } from './InputSelection';
import { InputSelectItem } from './InputSelectItem';

interface Props
  extends ReactElementProps<'div', 'onChange'>, VariantProps<typeof cssVariants> {
  value?: string;
  onChange?: (value: string | undefined) => void;
  className?: string | string[];
  custom?: {
    container?: string | string[];
    selection?: string | string[];
    select?: string | string[];
    item?: string | string[];
    colorPreview?: string | string[];
  };
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const colorPreviewCva = cva(
  [ 'w-6 h-6 rounded-1 shrink-0', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function ColorPaletteSelect({
  value,
  onChange,
  className,
  custom,
  ...props
}: Props) {
  const onValueChange = (newValue: string) => {
    if (newValue === '') {
      onChange?.(undefined);
    }
    else {
      onChange?.(newValue);
    }
  };

  const displayValue = (val: string) => {
    return val;
  };

  const getColorPreviewStyle = (val: string): React.CSSProperties | undefined => {
    const match = val.match(/button-normal-(\w+)-(\d+)/);
    if (!match) {
      return undefined;
    }
    const [
      , colorName,
      level,
    ] = match;
    // CSS 변수를 사용하여 색상 값 가져오기
    const cssVarName = `--color-${colorName}-${level}`;
    return {
      backgroundColor: `var(${cssVarName})`,
    };
  };

  return (
    <div
      className={cn(
        cssVariants({}),
        className,
        custom?.container
      )}
      {...props}
    >
      <InputSelectContainer
        value={value ?? ''}
        onValueChange={onValueChange}
        className={cn(custom?.selection)}
      >
        <InputSelection
          placeholder='색상 선택'
          displayValue={displayValue}
          custom={{
            button: custom?.selection,
          }}
        />
        <InputSelect
          className={cn(custom?.select)}
        >
          <InputSelectItem
            value=''
            custom={{
              div: custom?.item,
            }}
          >
            <div className='flex items-center gap-2'>
              <div
                className={cn(
                  colorPreviewCva({}),
                  'bg-black-100 border border-black-300',
                  custom?.colorPreview
                )}
              />
              <span>색상 없음</span>
            </div>
          </InputSelectItem>
          {ALL_COLOR_PALETTE.map((color) => {
            const colorStyle = getColorPreviewStyle(color.value);
            return (
              <InputSelectItem
                key={color.name}
                value={color.name}
                custom={{
                  div: custom?.item,
                }}
              >
                <div className='flex items-center gap-2'>
                  <div
                    className={cn(
                      colorPreviewCva({}),
                      'border border-black-300',
                      custom?.colorPreview
                    )}
                    style={colorStyle}
                  />
                  <span>{color.name}</span>
                </div>
              </InputSelectItem>
            );
          })}
        </InputSelect>
      </InputSelectContainer>
    </div>
  );
}
