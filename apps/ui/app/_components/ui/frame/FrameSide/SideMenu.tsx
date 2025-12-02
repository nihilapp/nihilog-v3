'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { Frame } from '@/_components/ui/frame';
import { cn } from '@/_libs';
import type { Menu } from '@/_types';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'nav'>, VariantProps<typeof cssVariants> {
  menu: Menu[];
  custom?: {
    nav?: string | string[];
    ul?: string | string[];
  };
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function SideMenu({ custom, menu, ...props }: Props) {
  return (
    <nav
      className={cn(
        cssVariants({}),
        custom?.nav
      )}
      {...props}
    >
      <ul className={cn([
        'flex flex-col gap-1',
        custom?.ul,
      ])}
      >
        {menu?.map((item) => (
          <Frame.Side.MenuItem
            key={item.name}
            item={item}
            custom={custom}
          />
        ))}
      </ul>
    </nav>
  );
}
