'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader } from '@/(common)/_components/ui/card';
import { useGetSession } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  children: React.ReactNode;
}

const cssVariants = cva([
  'min-h-screen bg-muted/40',
], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

export function ProfileLayout({ children, className, ...props }: Props) {
  const { session, isPending, } = useGetSession();

  if (isPending) {
    return (
      <div className={cn(cssVariants({}), className)} {...props}>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex justify-center'>
            <Card className='w-full max-w-2xl'>
              <CardContent className='p-6'>
                <div className='animate-pulse space-y-4'>
                  <div className='h-4 bg-muted rounded w-1/4' />
                  <div className='h-4 bg-muted rounded w-1/2' />
                  <div className='h-4 bg-muted rounded w-3/4' />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={cn(cssVariants({}), className)} {...props}>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex justify-center'>
            <Card className='w-full max-w-md'>
              <CardHeader>
                <h1 className='text-xl font-semibold text-center'>접근 제한</h1>
              </CardHeader>
              <CardContent className='text-center space-y-4'>
                <p className='text-muted-foreground'>
                  이 페이지에 접근하려면 로그인이 필요합니다.
                </p>
                <Button asChild>
                  <Link href='/auth/signin'>로그인하기</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(cssVariants({}), className)} {...props}>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-center'>
          <Card className='w-full max-w-2xl'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold'>마이페이지</h1>
                <Button variant='outline' size='sm' asChild>
                  <Link href='/'>홈으로</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className='p-6'>
              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
