'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Separator } from '@/(common)/_components/ui/separator';
import { useGetSession } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {}

const cssVariants = cva([ 'space-y-6', ], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

export function ProfileView({ className, ...props }: Props) {
  const { session, isPending, } = useGetSession();

  if (isPending) {
    return (
      <div className={cn(cssVariants({}), className)} {...props}>
        <div className='animate-pulse space-y-4'>
          <div className='h-4 bg-muted rounded w-1/4' />
          <div className='h-4 bg-muted rounded w-1/2' />
          <div className='h-4 bg-muted rounded w-3/4' />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={cn(cssVariants({}), className)} {...props}>
        <p className='text-center text-muted-foreground'>
          세션 정보를 불러올 수 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className={cn(cssVariants({}), className)} {...props}>
      {/* 사용자 정보 카드 */}
      <Card>
        <CardHeader>
          <CardTitle>사용자 정보</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>이름</p>
              <p className='text-lg font-semibold'>{session.data?.userNm || '미설정'}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>이메일</p>
              <p className='text-lg font-semibold'>{session.data?.emlAddr}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>역할</p>
              <p className='text-lg font-semibold'>{session.data?.userRole || '사용자'}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>가입일</p>
              <p className='text-lg font-semibold'>
                {session.data?.crtDt
                  ? new Date(session.data.crtDt).toLocaleDateString('ko-KR')
                  : '알 수 없음'}
              </p>
            </div>
          </div>

          {/* 자기소개 */}
          {session.data?.userBiogp && (
            <div className='mt-4'>
              <p className='text-sm font-medium text-muted-foreground'>자기소개</p>
              <p className='text-base mt-1 p-3 bg-muted/50 rounded-md'>
                {session.data.userBiogp}
              </p>
            </div>
          )}

          {/* 프로필 이미지 */}
          {session.data?.proflImg && (
            <div className='mt-4'>
              <p className='text-sm font-medium text-muted-foreground'>프로필 이미지</p>
              <div className='mt-2'>
                <Image
                  src={session.data.proflImg}
                  alt='프로필 이미지'
                  width={96}
                  height={96}
                  className='w-24 h-24 rounded-full object-cover border'
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* 프로필 관리 링크 */}
      <Card>
        <CardHeader>
          <CardTitle>계정 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Button variant='outline' asChild className='h-auto p-4 flex flex-col items-start gap-2'>
              <Link href='/profile/edit'>
                <div className='font-semibold'>프로필 수정</div>
                <div className='text-sm text-muted-foreground'>이름, 이메일 등 기본 정보를 수정합니다</div>
              </Link>
            </Button>

            <Button variant='outline' asChild className='h-auto p-4 flex flex-col items-start gap-2'>
              <Link href='/profile/edit/change-password'>
                <div className='font-semibold'>비밀번호 변경</div>
                <div className='text-sm text-muted-foreground'>계정 보안을 위해 비밀번호를 변경합니다</div>
              </Link>
            </Button>

            <Button variant='outline' asChild className='h-auto p-4 flex flex-col items-start gap-2'>
              <Link href='/profile/withdraw'>
                <div className='font-semibold text-destructive'>회원 탈퇴</div>
                <div className='text-sm text-muted-foreground'>계정을 영구적으로 삭제합니다</div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
