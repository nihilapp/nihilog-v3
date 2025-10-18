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

export function AdminAuthButtons({ className, ...props }: Props) {
  const { isPending, } = useGetSession();

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
      <Button variant='outline' asChild>
        <Link href='/admin/profile'>관리자 프로필</Link>
      </Button>
      <Button variant='outline' asChild>
        <Link href='/'>사용자 페이지</Link>
      </Button>
      <Button onClick={handleSignOut}>
        로그아웃
      </Button>
    </div>
  );
}
