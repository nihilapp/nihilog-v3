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
  const { session, isPending, } = useGetSession();

  const { mutate: signOut, } = useSignOut();

  const handleSignOut = () => {
    signOut(null);
  };

  if (isPending) {
    return <Skeleton className='h-10 w-48' />;
  }

  return (
    <div
      className={cn(cssVariants({}), className)}
      {...props}
    >
      {session
        ? (
          <>
            <span className='hidden text-sm font-medium sm:inline'>
              {session.data?.userNm || session.data?.emlAddr}
              님
            </span>
            <Button variant='ghost' asChild>
              <Link href='/profile'>마이페이지</Link>
            </Button>
            <Button variant='ghost' onClick={handleSignOut}>
              로그아웃
            </Button>
          </>
        )
        : (
          <>
            <Button variant='ghost' asChild>
              <Link href='/auth/signin'>로그인</Link>
            </Button>
            <Button asChild>
              <Link href='/auth/signup'>회원가입</Link>
            </Button>
          </>
        )}
    </div>
  );
}
