'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

interface Props<TFieldValues extends FieldValues = FieldValues>
  extends ReactElementProps<'form', 'onSubmit'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  form: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
}

const cssVariants = cva(
  [ 'flex flex-col gap-4', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FormContainer<TFieldValues extends FieldValues = FieldValues>({
  className,
  children,
  form,
  onSubmit,
  ...props
}: Props<TFieldValues>) {
  return (
    <FormProvider {...form}>
      <form
        className={cn(
          cssVariants({}),
          className
        )}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}
