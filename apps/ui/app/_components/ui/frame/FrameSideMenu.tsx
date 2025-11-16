'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { Button } from '@/_components/ui/button';
import { cn } from '@/_libs';
import type { Menu } from '@/_types';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'nav'>, VariantProps<typeof cssVariants> {
  menu: Menu[];
  custom?: {
    nav?: string | string[];
    ul?: string | string[];
    li?: string | string[];
    button?: string | string[];
    subMenu?: string | string[];
  };
}

const cssVariants = cva(
  [ 'flex flex-col gap-1 text-md', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

function MenuItem({ item, custom, level = 0, }: { item: Menu;
  custom?: Props['custom'];
  level?: number; }) {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li
      className={cn([
        'flex flex-col',
        custom?.li,
      ])}
    >
      {item.render && item.render()}
      {item.url && (
        <Button.Link
          icon={item.icon}
          label={item.name}
          href={item.url}
          display='block'
          className={cn([
            'button-ghost-black-700',
            'justify-start',
            'hover:bg-black-100!',
            item.classNames,
            custom?.button,
          ])}
        />
      )}
      {item.action && (
        <Button.Action
          icon={item.icon}
          label={item.name}
          onClick={item.action}
          display='block'
          className={cn([
            'button-ghost-black-700',
            'justify-start',
            'hover:bg-black-100!',
            item.classNames,
            custom?.button,
          ])}
        />
      )}
      {hasChildren && (
        <Button.Category
          label={item.name}
          icon={item.icon}
          display='block'
          className={cn([
            'button-ghost-black-700',
            'hover:bg-black-100!',
            item.classNames,
          ])}
        >
          <ul
            className={cn([
              'flex flex-col gap-1',
              custom?.subMenu,
            ])}
          >
            {item.children?.map((childItem) => (
              <MenuItem
                key={childItem.name}
                item={childItem}
                custom={custom}
                level={level + 1}
              />
            ))}
          </ul>
        </Button.Category>
      )}
    </li>
  );
}

export function FrameSideMenu({ custom, menu, ...props }: Props) {
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
          <MenuItem
            key={item.name}
            item={item}
            custom={custom}
          />
        ))}
      </ul>
    </nav>
  );
}
