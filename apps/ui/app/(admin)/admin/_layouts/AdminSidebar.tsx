'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import type { IconType } from 'react-icons';
import {
  FaChartBar,
  FaEdit,
  FaFolder,
  FaTags,
  FaComments,
  FaUsers,
  FaBell,
  FaCog,
  FaTachometerAlt,
  FaList
} from 'react-icons/fa';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
  href?: string;
  children?: Menu[];
};

const adminMenu: Menu[] = [
  {
    icon: FaTachometerAlt,
    label: '대시보드',
    href: '/admin/dashboard',
  },
  {
    icon: FaEdit,
    label: '콘텐츠 관리',
    children: [
      {
        icon: FaList,
        label: '포스트 관리',
        href: '/admin/dashboard/posts',
      },
      {
        icon: FaFolder,
        label: '카테고리 관리',
        href: '/admin/dashboard/categories',
      },
      {
        icon: FaTags,
        label: '태그 관리',
        href: '/admin/dashboard/tags',
      },
      {
        icon: FaComments,
        label: '댓글 관리',
        href: '/admin/dashboard/comments',
      },
    ],
  },
  {
    icon: FaUsers,
    label: '사용자 관리',
    href: '/admin/dashboard/users',
  },
  {
    icon: FaBell,
    label: '구독 관리',
    children: [
      {
        label: '사용자 구독 현황',
        href: '/admin/dashboard/subscriptions/users',
      },
      {
        label: '카테고리 구독 관리',
        href: '/admin/dashboard/subscriptions/categories',
      },
      {
        label: '태그 구독 관리',
        href: '/admin/dashboard/subscriptions/tags',
      },
    ],
  },
  {
    icon: FaChartBar,
    label: '분석 통계',
    children: [
      {
        label: '포스트 통계',
        href: '/admin/dashboard/analytics/posts',
      },
      {
        label: '카테고리 통계',
        href: '/admin/dashboard/analytics/categories',
      },
      {
        label: '태그 통계',
        href: '/admin/dashboard/analytics/tags',
      },
      {
        label: '댓글 통계',
        href: '/admin/dashboard/analytics/comments',
      },
      {
        label: '사용자 통계',
        href: '/admin/dashboard/analytics/users',
      },
      {
        label: '구독 통계',
        href: '/admin/dashboard/analytics/subscriptions',
      },
    ],
  },
  {
    icon: FaCog,
    label: '시스템 관리',
    children: [
      {
        label: '프로필 관리',
        href: '/admin/profile',
      },
      {
        label: '권한 관리',
        href: '/admin/permissions',
      },
      {
        label: '시스템 로그',
        href: '/admin/logs',
      },
    ],
  },
];

export function AdminSidebar({ className, ...props }: Props) {
  const pathname = usePathname();
  const { open, } = useSidebar();

  const renderMenuItems = (items: Menu[]) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.label}>
        {item.children
          ? (
            // 부모 메뉴 (하위 메뉴가 있는 경우)
            <div>
              <div className='px-2 py-1 text-sm font-medium text-gray-500 uppercase tracking-wider'>
                {item.icon && <item.icon className='inline w-4 h-4 mr-2' />}
                {item.label}
              </div>
              <SidebarMenu>
                {item.children.map((child) => (
                  <SidebarMenuItem key={child.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === child.href}
                      className={cn(
                        'transition-all duration-200 ease-in-out ml-4',
                        'hover:bg-blue-50 hover:text-blue-600',
                        'data-[active=true]:bg-blue-500 data-[active=true]:text-white',
                        'data-[active=true]:hover:bg-blue-600'
                      )}
                    >
                      <Link href={child.href || '#'}>
                        {child.icon && <child.icon />}
                        <span>{child.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          )
          : (
            // 단일 메뉴 항목
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
              <Link href={item.href || '#'}>
                {item.icon && <item.icon />}
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          )}
      </SidebarMenuItem>
    ));
  };

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
              {renderMenuItems(adminMenu)}
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
