import { cva } from 'class-variance-authority';

export const buttonCva = cva(
  [ 'p-2 py-1 rounded-2 transition-colors duration-200 box-border items-center gap-1 [&_svg]:mt-[2px]', ],
  {
    variants: {
      size: {
        line: [ 'inline-flex', ],
        block: [ 'flex w-full', ],
      },
      mode: {
        normal: [ 'text-white', ],
        ghost: [ '', ],
        outline: [ 'border', ],
      },
      color: {
        red: [ '', ],
        blue: [ '', ],
        orange: [ '', ],
        black: [ '', ],
        white: [ '', ],
        grey: [ '', ],
      },
    },
    defaultVariants: {
      mode: 'normal',
      color: 'black',
      size: 'line',
    },
    compoundVariants: [
      // red
      {
        mode: 'normal',
        color: 'red',
        className: 'bg-red-500 hover:bg-red-600',
      },
      {
        mode: 'ghost',
        color: 'red',
        className: 'text-red-600 hover:bg-red-50',
      },
      {
        mode: 'outline',
        color: 'red',
        className: 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
      },
      // blue
      {
        mode: 'normal',
        color: 'blue',
        className: 'bg-blue-500 hover:bg-blue-600',
      },
      {
        mode: 'ghost',
        color: 'blue',
        className: 'text-blue-600 hover:bg-blue-50',
      },
      {
        mode: 'outline',
        color: 'blue',
        className: 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      },
      // orange
      {
        mode: 'normal',
        color: 'orange',
        className: 'bg-orange-500 hover:bg-orange-600',
      },
      {
        mode: 'ghost',
        color: 'orange',
        className: 'text-orange-600 hover:bg-orange-50',
      },
      {
        mode: 'outline',
        color: 'orange',
        className: 'border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white',
      },
      // black
      {
        mode: 'normal',
        color: 'black',
        className: 'bg-stone-600 hover:bg-stone-700',
      },
      {
        mode: 'ghost',
        color: 'black',
        className: 'text-stone-600 hover:bg-stone-50',
      },
      {
        mode: 'outline',
        color: 'black',
        className: 'border-stone-600 text-stone-600 hover:bg-stone-600 hover:text-white',
      },
      // white
      {
        mode: 'normal',
        color: 'white',
        className: 'bg-white text-black-900 border border-black-300 hover:bg-black-50',
      },
      {
        mode: 'ghost',
        color: 'white',
        className: 'text-white hover:bg-white/10',
      },
      {
        mode: 'outline',
        color: 'white',
        className: 'border-white text-white hover:bg-white hover:text-black-900',
      },
      // grey
      {
        mode: 'normal',
        color: 'grey',
        className: 'bg-gray-500 hover:bg-gray-600',
      },
      {
        mode: 'ghost',
        color: 'grey',
        className: 'text-gray-600 hover:bg-gray-50',
      },
      {
        mode: 'outline',
        color: 'grey',
        className: 'border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white',
      },
    ],
  }
);

export const labelCva = [ 'flex flex-row gap-1 items-center justify-center', ];

export const iconCva = [ '', ];
