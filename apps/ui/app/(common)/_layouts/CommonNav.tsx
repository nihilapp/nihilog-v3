'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { Button } from '@/(common)/_components/ui/button';
import { useGetSession } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva([
  'border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

export function CommonNav({ className, ...props }: Props) {
  const { session, isPending, } = useGetSession();

  if (isPending) {
    return null;
  }

  const user = session?.data;

  return (
    <nav className={cn(cssVariants({}), className)} {...props}>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex h-12 items-center justify-between'>
          <div className='flex items-center gap-6'>
            <Link href='/'>
              <Button variant='ghost' size='sm'>
                홈
              </Button>
            </Link>
            <Link href='/users'>
              <Button variant='ghost' size='sm'>
                사용자 목록
              </Button>
            </Link>

            {user && (
              <Link href='/profile'>
                <Button variant='ghost' size='sm'>
                  마이페이지
                </Button>
              </Link>
            )}
          </div>

          <div className='flex items-center gap-2'>
            {/* 추가 네비게이션 아이템들이 들어갈 수 있는 공간 */}
          </div>
        </div>
      </div>
    </nav>
  );
}
