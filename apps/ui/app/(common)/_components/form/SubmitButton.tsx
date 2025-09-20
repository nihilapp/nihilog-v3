'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { Button } from '@/(common)/_components/ui/button';
import { cn } from '@/_libs';

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  isPending?: boolean;
}

const cssVariants = cva(
  [
    `w-full min-h-[40px] cursor-pointer mt-6`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function SubmitButton({ children, className, isPending, ...props }: Props) {
  return (
    <Button
      type='submit'
      className={cn(
        cssVariants({}),
        className
      )}
      disabled={isPending}
      {...props}
    >
      {children}
    </Button>
  );
}
