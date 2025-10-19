'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { Button } from '@/(common)/_components/ui/button';
import { Skeleton } from '@/(common)/_components/ui/skeleton';
import { useGetSession, useSignOut } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {}

const cssVariants = cva([ 'flex items-center gap-2', ]);

export function AuthButtons({ className, ...props }: Props) {
  const { response, isPending, } = useGetSession();

  const { mutate: signOut, } = useSignOut();

  const handleSignOut = () => {
    signOut(null);
  };

  if (isPending) {
    return <Skeleton className='h-10 w-48' />;
  }

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {response?.data
        ? (
          <>
            <Button variant='outline' asChild>
              <Link href='/profile'>마이페이지</Link>
            </Button>
            <Button variant='outline' asChild>
              <Link href='/admin/dashboard'>관리자 대시보드</Link>
            </Button>
            <Button onClick={handleSignOut}>
              로그아웃
            </Button>
          </>
        )
        : (
          <>
            <Button variant='outline' asChild>
              <Link href='/auth/signin'>로그인</Link>
            </Button>
            <Button asChild>
              <Link href='/auth/signup'>구독</Link>
            </Button>
            {process.env.NODE_ENV === 'development' && (
              <Button asChild>
                <Link href='/admin/signup'>관리자 계정생성</Link>
              </Button>
            )}
          </>
        )}
    </div>
  );
}
