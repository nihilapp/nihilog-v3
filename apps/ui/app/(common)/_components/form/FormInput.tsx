'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/(common)/_components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/(common)/_components/ui/form';
import { Input } from '@/(common)/_components/ui/input';
import { Textarea } from '@/(common)/_components/ui/textarea';
import { cn } from '@/_libs';

type InputType = 'text' | 'number' | 'email' | 'password' | 'textarea';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof itemVariants> {
  fieldName: string;
  label: string;
  type?: InputType;
  classNames?: {
    container: string;
    label: string;
    input: string;
    toggle: string;
  };
  autoComplete?: string;
}

const itemVariants = cva(
  [ 'flex flex-col gap-2', ],
  {
    variants: {
      variant: {
        default: '',
        error: 'text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const labelVariants = cva(
  [ 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', ],
  {
    variants: {
      variant: {
        default: 'text-foreground',
        error: 'text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const inputVariants = cva(
  [ 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', ],
  {
    variants: {
      variant: {
        default: 'border-input',
        error: 'border-destructive focus-visible:ring-destructive',
      },
      hasPasswordToggle: {
        true: 'pr-10',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      hasPasswordToggle: false,
    },
  }
);

export function FormInput({
  fieldName,
  label,
  type = 'text',
  classNames,
  variant,
  autoComplete,
  ...props
}: Props) {
  const form = useFormContext();
  const [
    showPassword,
    setShowPassword,
  ] = useState(false);
  const isPasswordType = type === 'password';
  const isTextareaType = type === 'textarea';
  const actualInputType = isPasswordType
    ? (
      showPassword
        ? 'text'
        : 'password'
    )
    : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field, fieldState, }) => {
        const hasError = !!fieldState.error;
        const currentVariant = hasError
          ? 'error'
          : variant;

        return (
          <FormItem className={cn(
            itemVariants({ variant: currentVariant, }),
            classNames?.container
          )}
          >
            <FormLabel className={cn(
              labelVariants({ variant: currentVariant, }),
              classNames?.label
            )}
            >
              {label}
            </FormLabel>
            <FormControl>
              {isTextareaType
                ? (
                  <Textarea
                    className={cn(
                      inputVariants({
                        variant: currentVariant,
                        hasPasswordToggle: false,
                      }),
                      classNames?.input
                    )}
                    {...field}
                  />
                )
                : (
                  <div className='relative'>
                    <Input
                      type={actualInputType}
                      className={cn(
                        inputVariants({
                          variant: currentVariant,
                          hasPasswordToggle: isPasswordType,
                        }),
                        classNames?.input
                      )}
                      {...field}
                      autoComplete={autoComplete}
                      {...props}
                    />
                    {isPasswordType && (
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className={cn(
                          'absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent',
                          classNames?.toggle
                        )}
                        onClick={togglePasswordVisibility}
                        tabIndex={-1}
                      >
                        {showPassword
                          ? (
                            <EyeOff className='h-4 w-4 text-muted-foreground' />
                          )
                          : (
                            <Eye className='h-4 w-4 text-muted-foreground' />
                          )}
                      </Button>
                    )}
                  </div>
                )}
            </FormControl>
            {hasError && (
              <FormMessage className='italic font-900' />
            )}
          </FormItem>
        );
      }}
    />
  );
}
