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
  [ 'p-2 rounded-2 transition-colors duration-200', ],
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
        black: [ 'bg-stone-600 text-white hover:bg-stone-700', ],
        white: [ '', ],
        grey: [ '', ],
      },
    },
    defaultVariants: {
      mode: 'normal',
      color: 'black',
    },
    compoundVariants: [],
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
    },
    defaultVariants: {
      type: 'link',
      mode: 'ghost',
      color: 'black',
    },
    compoundVariants: [],
  }
);

const labelCva = cva(
  [ 'flex flex-row gap-1 items-center justify-center p-1', ],
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
