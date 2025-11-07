'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { AsyncBoundary } from '@/_components/common/AsyncBoundary';
import { Button } from '@/_components/common/Button';
import { useGetSession, useSignOut } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';

interface Props
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className'>,
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

export function AuthButtons({ className, ...props }: Props) {
  const { response, loading, done, } = useGetSession();

  const signOut = useSignOut();

  const onClickSignOut = () => {
    signOut.mutate();
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
                <Button
                  type='link'
                  label='구독'
                  href='/auth/subscribe'
                />
              </li>
              <li>
                <Button
                  type='link'
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
                  <Button
                    type='link'
                    label='구독 정보'
                    href='/profile'
                  />
                </li>
              )}
              {response.data.userRole === 'ADMIN' && (
                <li>
                  <Button
                    type='link'
                    label='관리자 페이지'
                    href='/admin/dashboard'
                  />
                </li>
              )}
              <li>
                <Button
                  type='button'
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
