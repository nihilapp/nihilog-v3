'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { AsyncBoundary } from '@/_components/common/AsyncBoundary';
import { Button } from '@/_components/ui/button';
import { useGetSession } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';
import type { Menu, ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'nav'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  beforeSignInMenu: Menu[];
  afterSignInMenu: Menu[];
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FrameAuthButtons({ className, beforeSignInMenu, afterSignInMenu, ...props }: Props) {
  const { response, loading, done, } = useGetSession();

  const isVisible = (menuData: Menu) => {
    // role 배열이 없으면 모든 사용자에게 보임
    if (!menuData.role) {
      return true;
    }
    // role 배열이 있고 사용자 역할이 있으면 해당 역할인지 확인
    if (response?.data?.userRole) {
      return menuData.role.includes(response.data.userRole);
    }
    // 로그인하지 않은 경우 role이 있으면 보이지 않음
    return false;
  };

  // 로그인 상태: response가 있고 data가 있는 경우
  const isLoggedIn = !!response?.data;

  return (
    <AsyncBoundary
      loading={loading}
      done={done}
      mode='session'
    >
      <nav
        className={cn(
          cssVariants({}),
          className
        )}
        {...props}
      >
        <ul className='flex flex-col md:flex-row items-center gap-1 md:gap-2 text-sm md:text-base'>
          {!isLoggedIn && beforeSignInMenu.map((menu, index) => {
            if (!isVisible(menu)) {
              return null;
            }

            return (
              <li key={index}>
                {menu.url
                  ? (
                    <Button.Link
                      label={menu.name}
                      href={menu.url}
                    />
                  )
                  : menu.action
                    ? (
                      <Button.Action
                        label={menu.name}
                        onClick={menu.action}
                      />
                    )
                    : null}
              </li>
            );
          })}
          {isLoggedIn && afterSignInMenu.map((menu, index) => {
            if (!isVisible(menu)) {
              return null;
            }

            return (
              <li key={index}>
                {menu.url
                  ? (
                    <Button.Link
                      label={menu.name}
                      href={menu.url}
                    />
                  )
                  : menu.action
                    ? (
                      <Button.Action
                        label={menu.name}
                        onClick={menu.action}
                      />
                    )
                    : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </AsyncBoundary>
  );
}
