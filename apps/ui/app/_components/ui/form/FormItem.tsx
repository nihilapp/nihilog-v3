'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Controller, type ControllerProps, type FieldPath, type FieldValues, useFormContext } from 'react-hook-form';

import { cn } from '@/_libs';

interface FormItemProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<ControllerProps<TFieldValues>, 'name' | 'control'>,
  VariantProps<typeof cssVariants> {
  className?: string;
  label?: string;
  name: FieldPath<TFieldValues>;
}

const cssVariants = cva(
  [ 'flex gap-2', ],
  {
    variants: {
      direction: {
        horizontal: [ 'flex-row', ],
        vertical: [ 'flex-col', ],
      },
    },
    defaultVariants: {
      direction: 'vertical',
    },
    compoundVariants: [],
  }
);

export function FormItem<TFieldValues extends FieldValues = FieldValues>({
  className,
  label,
  name,
  render,
  direction,
  ...controllerProps
}: FormItemProps<TFieldValues>) {
  const { control, } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={(field) => {
        const error = field.fieldState.error;

        return (
          <>
            <label
              className={cn(
                cssVariants({ direction, }),
                className
              )}
            >
              {label && <span>{label}</span>}
              {render({
                ...field,
                fieldState: field.fieldState,
                formState: field.formState,
              })}
            </label>
            {error && (
              <span className='text-red-500 text-sm italic'>
                {error.message}
              </span>
            )}
          </>
        );
      }}
      {...controllerProps}
    />
  );
}
