import { cva } from 'class-variance-authority';

export const buttonCva = cva(
  [
    'button-base',
    'rounded-2',
    'font-medium',
  ],
  {
    variants: {
      display: {
        inline: [ '', ],
        block: [ 'w-full', ],
      },
      textSize: {
        sm: [ 'text-sm', ],
        md: [ 'text-md', ],
        lg: [ 'text-lg', ],
      },
    },
    defaultVariants: {
      display: 'inline',
      textSize: 'sm',
    },
  }
);

export const labelCva = [ 'flex items-center justify-center', ];

export const iconCva = cva(
  [ 'flex items-center justify-center shrink-0', ],
  {
    variants: {
      textSize: {
        sm: [ 'size-4', ],
        md: [ 'size-5', ],
        lg: [ 'size-6', ],
      },
    },
    defaultVariants: {
      textSize: 'sm',
    },
  }
);
