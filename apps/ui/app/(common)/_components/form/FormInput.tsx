'use client';

import { type VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { fieldContainerVariants, inputVariants, itemVariants, labelVariants } from '@/(common)/_components/form/form-input.cva';
import { Button } from '@/(common)/_components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/(common)/_components/ui/form';
import { Input } from '@/(common)/_components/ui/input';
import { cn } from '@/_libs';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'form' | 'size'>,
  VariantProps<typeof itemVariants> {
  className?: string;
  form: UseFormReturn<any>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  type?: string;
  labelClassName?: string;
  inputClassName?: string;
  layout?: 'vertical' | 'horizontal';
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'error' | 'disabled';
}

export function FormInput({
  className,
  form,
  label,
  name,
  required = false,
  disabled = false,
  placeholder,
  autoComplete,
  type = 'text',
  size,
  variant,
  labelClassName,
  inputClassName,
  layout = 'vertical',
  ...props
}: Props) {
  const isDisabled = disabled || form.formState.isSubmitting;
  const [ showPassword, setShowPassword, ] = useState(false);

  // 비밀번호 타입인지 확인
  const isPasswordType = type === 'password';

  // 실제 입력 타입 결정
  const inputType = isPasswordType && showPassword
    ? 'text'
    : type;

  return (
    <FormField
      control={form.control}
      name={name!}
      render={({ field, fieldState, }) => {
        const hasError = !!fieldState.error;

        return (
          <FormItem className={cn(
            itemVariants({}),
            className
          )}
          >
            <div className={cn(
              fieldContainerVariants({ layout, })
            )}
            >
              <FormLabel className={cn(
                labelVariants({
                  layout,
                  disabled: isDisabled,
                }),
                labelClassName
              )}
              >
                {label}
                {required && <span className='text-destructive'>*</span>}
              </FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    {...field}
                    type={inputType}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    disabled={isDisabled}
                    className={cn(
                      inputVariants({
                        variant: hasError
                          ? 'error'
                          : isDisabled
                            ? 'disabled'
                            : variant || 'default',
                        size: size || 'default',
                      }),
                      // 비밀번호 타입인 경우 우측 패딩 추가
                      isPasswordType && 'pr-10',
                      inputClassName
                    )}
                    {...props}
                  />
                  {isPasswordType && (
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 hover:bg-transparent'
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isDisabled}
                    >
                      {showPassword
                        ? (
                          <FiEyeOff className='h-4 w-4 text-muted-foreground' />
                        )
                        : (
                          <FiEye className='h-4 w-4 text-muted-foreground' />
                        )}
                    </Button>
                  )}
                </div>
              </FormControl>
            </div>
            <FormMessage className='ml-auto' />
          </FormItem>
        );
      }}
    />
  );
}
