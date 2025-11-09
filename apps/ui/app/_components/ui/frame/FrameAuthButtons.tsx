'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { AsyncBoundary } from '@/_components/common/AsyncBoundary';
import { Button } from '@/_components/ui/button';
import { useGetSession, useSignOut } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';
import type { ReactElementProps, UserRoleType } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'nav'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FrameAuthButtons({ className, ...props }: Props) {
  const { response, loading, done, } = useGetSession();

  const isVisible = (role: UserRoleType) => {

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
          {!isLoggedIn && (
            <>
              <li>
                <Button.Link
                  label='구독'
                  href='/auth/subscribe'
                />
              </li>
              <li>
                <Button.Link
                  label='로그인'
                  href='/auth/signin'
                />
              </li>
            </>
          )}
          {isLoggedIn && response.data && (
            <>
              {response.data.userRole === 'USER' && (
                <li>
                  <Button.Link
                    label='구독 정보'
                    href='/profile'
                  />
                </li>
              )}
              {response.data.userRole === 'ADMIN' && (
                <li>
                  <Button.Link
                    label='관리자 페이지'
                    href='/admin/dashboard'
                  />
                </li>
              )}
              <li>
                <Button.Action
                  label='로그아웃'
                  onClick={onClickSignOut}
                />
              </li>
            </>
          )}
        </ul>
      </nav>
    </AsyncBoundary>
  );
}
