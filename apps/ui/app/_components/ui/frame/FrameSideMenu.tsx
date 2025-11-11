'use client';

import { Icon } from '@iconify/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import type React from 'react';

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
  [ 'frame-side-menu flex flex-col gap-1 text-md', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

function MenuItem({ item, custom, level = 0, }: { item: Menu;
  custom?: Props['custom'];
  level?: number; }) {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const onToggleSubMenu = (e?: React.MouseEvent) => {
    if (hasChildren) {
      e?.preventDefault();
      e?.stopPropagation();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <li
      className={cn([
        'flex flex-col',
        custom?.li,
      ])}
    >
      {hasChildren
        ? (
          <Button.Action
            icon={(
              <Icon
                icon={isOpen
                  ? 'mdi:folder-open'
                  : 'mdi:folder'}
              />
            )}
            label={item.name}
            onClick={onToggleSubMenu}
            size='block'
            mode='ghost'
            color='black'
            className={cn([
              'justify-start',
              custom?.button,
            ])}
          />
        )
        : item.url
          ? (
            <Button.Link
              icon={item.icon}
              label={item.name}
              href={item.url}
              size='block'
              mode='ghost'
              color='black'
              className={cn([
                'justify-start',
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
                size='block'
                mode='ghost'
                color='black'
                className={cn([
                  'justify-start',
                  custom?.button,
                ])}
              />
            )
            : null}

      {hasChildren && isOpen && (
        <ul
          className={cn([
            'flex flex-col gap-1 mt-1 ml-4',
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
