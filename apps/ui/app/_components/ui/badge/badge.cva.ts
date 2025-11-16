import { cva } from 'class-variance-authority';

export const badgeCva = cva(
  [
    'flex items-center gap-1',
    'px-2 py-1 rounded-2',
    'font-medium',
  ],
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
      color: {
        red: [ 'bg-red-100 text-red-600', ],
        blue: [ 'bg-blue-100 text-blue-600', ],
        orange: [ 'bg-orange-100 text-orange-600', ],
        green: [ 'bg-green-100 text-green-600', ],
        gray: [ 'bg-gray-100 text-gray-600', ],
        black: [ 'bg-stone-100 text-stone-700', ],
        white: [ 'bg-white text-stone-900 border border-stone-300', ],
      },
    },
    defaultVariants: {
      display: 'inline',
      textSize: 'sm',
      color: 'gray',
    },
  }
);

export const badgeIconCva = cva(
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

export const badgeLabelCva = [ 'flex items-center justify-center', ];
