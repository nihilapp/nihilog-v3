import { cva } from 'class-variance-authority';

export const menuCva = cva(
  [ 'menu-base font-medium', ],
  {
    variants: {
      display: {
        inline: [ 'inline-flex', ],
        block: [ 'flex w-full', ],
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

export const menuLabelCva = [ 'flex items-center justify-center', ];

export const menuIconCva = cva(
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
