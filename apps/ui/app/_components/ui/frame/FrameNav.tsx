'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { usePathname } from 'next/navigation';

import { Button } from '@/_components/ui/button';
import { cn } from '@/_libs';
import type { Menu } from '@/_types';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'nav'>, VariantProps<typeof cssVariants> {
  custom?: {
    nav?: string | string[];
    ul?: string | string[];
    li?: string | string[];
    button?: string | string[];
  };
  menu: Menu[];
}

const cssVariants = cva(
  [ 'frame-nav flex flex-col md:flex-row text-md', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FrameNav({ custom, menu, ...props }: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        cssVariants({}),
        custom?.nav
      )}
      {...props}
    >
      <ul className={cn([
        'flex flex-col md:flex-row text-md',
        custom?.ul,
      ])}
      >
        {menu?.map((item) => (
          item.url && (
            <li
              className={cn([
                '',
                custom?.li,
              ])}
              key={item.name}
            >
              <Button.Menu
                icon={item.icon}
                label={item.name}
                href={item.url}
                data-selected={pathname === item.url}
                className={cn([
                  item.classNames,
                  custom?.button,
                ])}
              />
            </li>
          )
        ))}
      </ul>
    </nav>
  );
}
