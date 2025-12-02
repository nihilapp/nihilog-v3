'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MdChevronRight, MdFolder, MdFolderOpen } from 'react-icons/md';

import { Frame } from '@/_components/ui/frame';
import { cn } from '@/_libs';
import type { Menu } from '@/_types';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'li'>, VariantProps<typeof cssVariants> {
  className?: string | string[];
  item: Menu;
  custom?: {
    name?: string | string[];
    icon?: string | string[];
    li?: string | string[];
    itemContainer?: string | string[];
    childrenContainer?: string | string[];
    ul?: string | string[];
  };
}

const cssVariants = cva(
  [ 'cursor-pointer select-none', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function SideMenuItem({ item, custom, className, ...props }: Props) {
  const [
    isToggled,
    setIsToggled,
  ] = useState(false);

  const pathname = usePathname();

  const hasChildren = item.children && item.children.length > 0;

  function onClickItem() {
    if (hasChildren) {
      setIsToggled(!isToggled);
    }
  }

  function onClickSubMenu(event: React.MouseEvent<HTMLUListElement>) {
    event.stopPropagation();
  }

  const containerClassName = cn([
    'flex-row-1 items-center p-2 border border-black-200 rounded-2 hover:border-black-600 hover:bg-black-600 hover:text-white transition-colors duration-200 ease-in-out',
    pathname === item.url && 'border-black-600 bg-black-600 text-white cursor-default',
    custom?.itemContainer,
  ]);

  const iconElement = hasChildren
    ? (
      <span>
        {isToggled
          ? <MdFolderOpen className='size-5' />
          : <MdFolder className='size-5' />}
      </span>
    )
    : (
      item.icon && (
        <span className={cn([
          'shrink-0 size-5',
          custom?.icon,
        ])}
        >
          {item.icon}
        </span>
      )
    );

  const nameElement = (
    <span className={cn([
      'flex-1',
      custom?.name,
    ])}
    >
      {item.name}
    </span>
  );

  return (
    <li
      className={cn(
        cssVariants({}),
        custom?.li,
        className
      )}
      onClick={onClickItem}
      {...props}
    >
      {!hasChildren
        ? (
          <Link
            href={item.url as string}
            className={containerClassName}
          >
            {iconElement}
            {nameElement}
          </Link>
        )
        : (
          <div className={containerClassName}>
            {iconElement}
            {nameElement}
            <MdChevronRight
              className={cn(
                'size-5 transition-transform duration-300',
                isToggled && 'rotate-90'
              )}
            />
          </div>
        )}
      {hasChildren && item.children && (
        <ul
          className={cn([
            'hidden',
            isToggled && 'pl-4 flex flex-col gap-1',
            custom?.childrenContainer,
          ])}
          onClick={onClickSubMenu}
        >
          {item.children.map((childItem) => (
            <Frame.Side.MenuItem
              key={childItem.name}
              item={childItem}
              className='first:mt-1'
            />
          ))}
        </ul>
      )}
    </li>
  );
}
