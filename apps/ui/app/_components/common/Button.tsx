'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';
import type { IconType } from 'react-icons/lib';

import { cn } from '@/_libs';

type BaseProps = {
  label: string;
  icon?: IconType;
  labelClassName?: string;
  iconClassName?: string;
  mode?: 'normal' | 'ghost' | 'outline';
  color?: 'red' | 'blue' | 'orange' | 'black' | 'white' | 'grey';
  size?: 'line' | 'block';
};

type ButtonProps = BaseProps & {
  type?: 'button';
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children'>
& VariantProps<typeof buttonCva> & {
  className?: string;
};

type LinkProps = BaseProps & {
  type: 'link' | 'menu';
  href: string;
} & Omit<React.ComponentProps<typeof Link>, 'href' | 'children' | 'className'>
& VariantProps<typeof linkCva> & {
  className?: string;
};

type Props = ButtonProps | LinkProps;

const buttonCva = cva(
  [ 'py-1 px-2 rounded-2 transition-colors duration-200', ],
  {
    variants: {
      mode: {
        normal: [ '', ],
        ghost: [ '', ],
        outline: [ '', ],
      },
      color: {
        red: [ '', ],
        blue: [ '', ],
        orange: [ '', ],
        black: [ '', ],
        white: [ '', ],
        grey: [ '', ],
      },
      size: {
        line: [ 'inline-block', ],
        block: [ 'block w-full', ],
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
        className: 'bg-red-500 text-white hover:bg-red-600',
      },
      {
        mode: 'ghost',
        color: 'red',
        className: 'text-red-600 hover:bg-red-50',
      },
      {
        mode: 'outline',
        color: 'red',
        className: 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
      },
      // blue
      {
        mode: 'normal',
        color: 'blue',
        className: 'bg-blue-500 text-white hover:bg-blue-600',
      },
      {
        mode: 'ghost',
        color: 'blue',
        className: 'text-blue-600 hover:bg-blue-50',
      },
      {
        mode: 'outline',
        color: 'blue',
        className: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      },
      // orange
      {
        mode: 'normal',
        color: 'orange',
        className: 'bg-orange-500 text-white hover:bg-orange-600',
      },
      {
        mode: 'ghost',
        color: 'orange',
        className: 'text-orange-600 hover:bg-orange-50',
      },
      {
        mode: 'outline',
        color: 'orange',
        className: 'border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white',
      },
      // black
      {
        mode: 'normal',
        color: 'black',
        className: 'bg-stone-600 text-white hover:bg-stone-700',
      },
      {
        mode: 'ghost',
        color: 'black',
        className: 'text-stone-600 hover:bg-stone-50',
      },
      {
        mode: 'outline',
        color: 'black',
        className: 'border border-stone-600 text-stone-600 hover:bg-stone-600 hover:text-white',
      },
      // white
      {
        mode: 'normal',
        color: 'white',
        className: 'bg-white text-black-900 border border-black-200 hover:bg-black-50',
      },
      {
        mode: 'ghost',
        color: 'white',
        className: 'text-white hover:bg-white/10',
      },
      {
        mode: 'outline',
        color: 'white',
        className: 'border border-white text-white hover:bg-white hover:text-black-900',
      },
      // grey
      {
        mode: 'normal',
        color: 'grey',
        className: 'bg-gray-500 text-white hover:bg-gray-600',
      },
      {
        mode: 'ghost',
        color: 'grey',
        className: 'text-gray-600 hover:bg-gray-50',
      },
      {
        mode: 'outline',
        color: 'grey',
        className: 'border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white',
      },
    ],
  }
);

const linkCva = cva(
  [ '', ],
  {
    variants: {
      type: {
        link: [ '', ],
        menu: [ '', ],
      },
      mode: {
        normal: [ '', ],
        ghost: [ '', ],
        outline: [ '', ],
      },
      color: {
        red: [ '', ],
        blue: [ '', ],
        orange: [ '', ],
        black: [ '', ],
        white: [ '', ],
        grey: [ '', ],
      },
      size: {
        line: [ 'inline-block', ],
        block: [ 'block w-full', ],
      },
    },
    defaultVariants: {
      type: 'link',
      mode: 'ghost',
      color: 'black',
      size: 'line',
    },
    compoundVariants: [
      // red
      {
        mode: 'normal',
        color: 'red',
        className: 'bg-red-500 text-white hover:bg-red-600',
      },
      {
        mode: 'ghost',
        color: 'red',
        className: 'text-red-600 hover:bg-red-50',
      },
      {
        mode: 'outline',
        color: 'red',
        className: 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
      },
      // blue
      {
        mode: 'normal',
        color: 'blue',
        className: 'bg-blue-500 text-white hover:bg-blue-600',
      },
      {
        mode: 'ghost',
        color: 'blue',
        className: 'text-blue-600 hover:bg-blue-50',
      },
      {
        mode: 'outline',
        color: 'blue',
        className: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      },
      // orange
      {
        mode: 'normal',
        color: 'orange',
        className: 'bg-orange-500 text-white hover:bg-orange-600',
      },
      {
        mode: 'ghost',
        color: 'orange',
        className: 'text-orange-600 hover:bg-orange-50',
      },
      {
        mode: 'outline',
        color: 'orange',
        className: 'border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white',
      },
      // black
      {
        mode: 'normal',
        color: 'black',
        className: 'bg-stone-600 text-white hover:bg-stone-700',
      },
      {
        mode: 'ghost',
        color: 'black',
        className: 'text-stone-600 hover:bg-stone-50',
      },
      {
        mode: 'outline',
        color: 'black',
        className: 'border border-stone-600 text-stone-600 hover:bg-stone-600 hover:text-white',
      },
      // white
      {
        mode: 'normal',
        color: 'white',
        className: 'bg-white text-black-900 border border-black-200 hover:bg-black-50',
      },
      {
        mode: 'ghost',
        color: 'white',
        className: 'text-white hover:bg-white/10',
      },
      {
        mode: 'outline',
        color: 'white',
        className: 'border border-white text-white hover:bg-white hover:text-black-900',
      },
      // grey
      {
        mode: 'normal',
        color: 'grey',
        className: 'bg-gray-500 text-white hover:bg-gray-600',
      },
      {
        mode: 'ghost',
        color: 'grey',
        className: 'text-gray-600 hover:bg-gray-50',
      },
      {
        mode: 'outline',
        color: 'grey',
        className: 'border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white',
      },
    ],
  }
);

const labelCva = cva(
  [ 'flex flex-row gap-1 items-center justify-center', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const iconCva = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

function ButtonContent({
  label,
  icon: Icon,
  labelClassName,
  iconClassName,
}: BaseProps) {
  return (
    <span
      className={cn(
        labelCva({}),
        labelClassName
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            iconCva({}),
            iconClassName
          )}
        />
      )}
      {label}
    </span>
  );
}

export function Button(props: Props) {
  const {
    label,
    icon,
    labelClassName,
    iconClassName,
    type = 'button',
    mode,
    color,
    size,
  } = props;

  const content = (
    <ButtonContent
      label={label}
      icon={icon}
      labelClassName={labelClassName}
      iconClassName={iconClassName}
    />
  );

  if (type === 'button') {
    const {
      className,
      ...buttonProps
    } = props as ButtonProps;

    return (
      <button
        className={cn(
          buttonCva({
            mode,
            color,
            size,
          }),
          className
        )}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }

  const {
    href,
    className,
    ...linkProps
  } = props as LinkProps;

  return (
    <Link
      className={cn(
        linkCva({
          type,
          mode,
          color,
          size,
        }),
        className
      )}
      href={href}
      {...linkProps}
    >
      {content}
    </Link>
  );
}
