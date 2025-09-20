import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/_libs/cn';

const loadingVariants = cva(
  'flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary-foreground',
        muted: 'text-muted-foreground',
      },
      size: {
        default: 'h-6 w-6',
        sm: 'h-4 w-4',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      fullScreen: {
        true: 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullScreen: false,
    },
  }
);

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof loadingVariants> {
  text?: string;
  showSpinner?: boolean;
}

export function Loading({
  className,
  variant,
  size,
  fullScreen,
  text,
  showSpinner = true,
  ...props
}: LoadingProps) {
  return (
    <div
      className={cn(loadingVariants({
        variant, size: fullScreen
          ? 'xl'
          : size, fullScreen,
      }), className)}
      {...props}
    >
      <div className='flex flex-col items-center gap-2'>
        {showSpinner && (
          <Loader2
            className={cn(
              'animate-spin',
              fullScreen
                ? 'h-12 w-12'
                : size === 'sm'
                  ? 'h-4 w-4'
                  : size === 'lg'
                    ? 'h-8 w-8'
                    : 'h-6 w-6'
            )}
          />
        )}
        {text && (
          <p className={cn(
            'text-center font-medium',
            fullScreen
              ? 'text-lg'
              : 'text-sm'
          )}
          >
            {text}
          </p>
        )}
      </div>
    </div>
  );
}
