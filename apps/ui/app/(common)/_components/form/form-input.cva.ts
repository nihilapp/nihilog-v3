import { cva } from 'class-variance-authority';

// FormItem의 레이아웃을 제어하는 CVA
export const itemVariants = cva(
  [
    `transition-all duration-200`,
  ],
  {
    variants: {
      layout: {
        vertical: `flex flex-col gap-1`,
        horizontal: `flex flex-row items-center gap-1`,
      },
    },
    defaultVariants: {
      layout: 'vertical',
    },
  }
);

// FormLabel과 Input을 묶는 컨테이너의 CVA
export const fieldContainerVariants = cva(
  [
    `transition-all duration-200`,
  ],
  {
    variants: {
      layout: {
        vertical: `flex flex-col gap-2`,
        horizontal: `flex flex-row items-center gap-4`,
      },
    },
    defaultVariants: {
      layout: 'vertical',
    },
  }
);

// FormLabel의 스타일을 제어하는 CVA
export const labelVariants = cva(
  [
    `flex items-center gap-1 transition-all duration-200`,
  ],
  {
    variants: {
      layout: {
        vertical: `text-sm font-medium`,
        horizontal: `min-w-[80px] flex-shrink-0 text-sm font-medium`,
      },
      disabled: {
        true: `opacity-60`,
        false: `opacity-100`,
      },
    },
    defaultVariants: {
      layout: 'vertical',
      disabled: false,
    },
  }
);

// Input의 스타일을 제어하는 CVA
export const inputVariants = cva(
  [
    `transition-all duration-200 min-h-[40px] border-2`,
  ],
  {
    variants: {
      variant: {
        default: `border-black-200 focus-visible:border-ring`,
        error: `!border-red-400 focus-visible:border-destructive`,
        disabled: `!border-black-100 bg-muted cursor-not-allowed opacity-60`,
      },
      size: {
        default: `h-9 px-3 py-1`,
        sm: `h-8 px-2 py-1 text-sm`,
        lg: `h-10 px-4 py-2`,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        variant: 'disabled',
        className: 'cursor-not-allowed pointer-events-none',
      },
    ],
  }
);
