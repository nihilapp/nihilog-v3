'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import type { IconType } from 'react-icons';
import { FaArchive, FaHome, FaTag } from 'react-icons/fa';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/(common)/_components/ui/sidebar';
import { CommonFooter } from '@/(common)/_layouts/CommonFooter';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'h-full transition-all duration-300 ease-in-out overflow-hidden border-r border-black-100', ],
  {
    variants: {
      isOpen: {
        true: 'w-80 opacity-100',
        false: 'w-0 opacity-0',
      },
    },
    defaultVariants: {
      isOpen: true,
    },
    compoundVariants: [],
  }
);

type Menu = {
  icon?: IconType;
  label: string;
  href: string;
};

const mainMenu: Menu[] = [
  {
    icon: FaHome,
    label: '홈',
    href: '/',
  },
  {
    icon: FaArchive,
    label: '아카이브',
    href: '/archive',
  },
  {
    icon: FaTag,
    label: '태그 클라우드',
    href: '/tags',
  },
];

export function CommonSidebar({ className, ...props }: Props) {
  const pathname = usePathname();
  const { open, } = useSidebar();

  return (
    <Sidebar
      collapsible='none'
      className={cn(
        cssVariants({ isOpen: open, }),
        className
      )}
      {...props}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenu.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      'transition-all duration-200 ease-in-out',
                      'hover:bg-blue-50 hover:text-blue-600',
                      'data-[active=true]:bg-blue-500 data-[active=true]:text-white',
                      'data-[active=true]:hover:bg-blue-600'
                    )}
                  >
                    <Link href={item.href}>
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>카테고리</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* TODO: 카테고리 목록을 API에서 가져와서 동적으로 렌더링 */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/category/1'}
                  className={cn(
                    'transition-all duration-200 ease-in-out',
                    'hover:bg-blue-50 hover:text-blue-600',
                    'data-[active=true]:bg-blue-500 data-[active=true]:text-white',
                    'data-[active=true]:hover:bg-blue-600'
                  )}
                >
                  <Link href='/category/1'>
                    <span>개발</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/category/2'}
                  className={cn(
                    'transition-all duration-200 ease-in-out',
                    'hover:bg-blue-50 hover:text-blue-600',
                    'data-[active=true]:bg-blue-500 data-[active=true]:text-white',
                    'data-[active=true]:hover:bg-blue-600'
                  )}
                >
                  <Link href='/category/2'>
                    <span>일상</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <CommonFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
