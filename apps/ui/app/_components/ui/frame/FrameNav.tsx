'use client';

import { cva, type VariantProps } from 'class-variance-authority';

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
  [ 'frame-nav flex flex-col md:flex-row gap-1 md:gap-2 text-md', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FrameNav({ custom, menu, ...props }: Props) {
  return (
    <nav
      className={cn(
        cssVariants({}),
        custom?.nav
      )}
      {...props}
    >
      <ul className={cn([
        'flex flex-col md:flex-row gap-1 md:gap-2 text-md',
        custom?.ul,
      ])}
      >
        {menu?.map((item) => (
          <li
            className={cn([
              '',
              custom?.li,
            ])}
            key={item.name}
          >
            {item.url
              ? (
                <Button.Link
                  icon={item.icon}
                  label={item.name}
                  href={item.url}
                  className={cn([
                    '',
                    custom?.button,
                  ])}
                />
              )
              : item.action
                ? (
                  <Button.Action
                    icon={item.icon}
                    label={item.name}
                    onClick={item.action}
                    className={cn([
                      '',
                      custom?.button,
                    ])}
                  />
                )
                : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
