'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { Button } from '@/_components/ui/button';
import { useGetSession } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';
import { useSession } from '@/_stores/auth.store';
import type { Menu, ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'nav'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  beforeSignInMenu: Menu[];
  afterSignInMenu: Menu[];
}

const cssVariants = cva(
  [ 'text-md', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FrameAuthButtons({ className, beforeSignInMenu, afterSignInMenu, ...props }: Props) {
  // 로딩 상태 확인 (세션 동기화 중인지 확인)
  const { loading, } = useGetSession();
  const session = useSession();

  const isVisible = (menuData: Menu) => {
    // role 배열이 없으면 모든 사용자에게 보임
    if (!menuData.role) {
      return true;
    }
    // role 배열이 있고 사용자 역할이 있으면 해당 역할인지 확인
    if (session?.userRole) {
      return menuData.role.includes(session.userRole);
    }
    // 로그인하지 않은 경우 role이 있으면 보이지 않음
    return false;
  };

  // 로그인 상태: session이 있는 경우
  const isLoggedIn = !!session;

  // 로딩 중일 때 스켈레톤 표시
  if (loading) {
    return (
      <nav
        className={cn(
          cssVariants({}),
          className
        )}
        {...props}
      >
        <div className='h-full w-[200px] bg-black-200 rounded-2 animate-pulse' />
      </nav>
    );
  }

  return (
    <nav
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <ul className='flex flex-col md:flex-row items-center gap-1 md:gap-2 text-md'>
        {!isLoggedIn && beforeSignInMenu.map((menu, index) => {
          if (!isVisible(menu)) {
            return null;
          }

          return (
            <li key={index}>
              {menu.render && menu.render()}
              {menu.url && (
                <Button.Link
                  icon={menu.icon}
                  label={menu.name}
                  href={menu.url}
                  className={menu.classNames}
                />
              )}
              {menu.action && (
                <Button.Action
                  icon={menu.icon}
                  label={menu.name}
                  onClick={menu.action}
                  className={menu.classNames}
                />
              )}
            </li>
          );
        })}
        {isLoggedIn && afterSignInMenu.map((menu, index) => {
          if (!isVisible(menu)) {
            return null;
          }

          return (
            <li key={index}>
              {menu.render && menu.render()}
              {menu.url && (
                <Button.Link
                  icon={menu.icon}
                  label={menu.name}
                  href={menu.url}
                  className={menu.classNames}
                />
              )}
              {menu.action && (
                <Button.Action
                  icon={menu.icon}
                  label={menu.name}
                  onClick={menu.action}
                  className={menu.classNames}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
