'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { useGetSession } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'container mx-auto px-4 py-8', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function Home({ className, ...props }: Props) {
  const { session, isPending, } = useGetSession();

  if (isPending) {
    return (
      <div className={cn(cssVariants({}), className)} {...props}>
        <div className='flex items-center justify-center min-h-[400px]'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4' />
            <p className='text-muted-foreground'>로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(cssVariants({}), className)} {...props}>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold tracking-tight mb-4'>
            Nihil Turbo Fullstack Template
          </h1>
          <p className='text-xl text-muted-foreground mb-8'>
            Next.js 15, NestJS, Drizzle, React Query를 활용한 풀스택 템플릿
          </p>
        </div>

        <Card className='mb-12'>
          <CardHeader>
            <CardTitle>시작 가이드</CardTitle>
            <CardDescription>
              이 템플릿을 사용하여 개발을 시작하는 방법입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='font-semibold'>1. 의존성 설치</h3>
              <p className='text-sm text-muted-foreground'>
                프로젝트 루트에서 다음 명령어를 실행하여 모든 의존성을 설치합니다.
              </p>
              <code className='block bg-muted p-2 rounded-md mt-2 text-sm'>pnpm install</code>
            </div>
            <div>
              <h3 className='font-semibold'>2. 데이터베이스 설정</h3>
              <p className='text-sm text-muted-foreground'>
                `apps/api/.env` 파일을 생성하고 데이터베이스 URL을 설정하세요.
              </p>
            </div>
            <div>
              <h3 className='font-semibold'>3. Drizzle 스키마 생성</h3>
              <p className='text-sm text-muted-foreground'>
                Drizzle 스키마를 기반으로 데이터베이스 클라이언트를 생성합니다.
              </p>
              <code className='block bg-muted p-2 rounded-md mt-2 text-sm'>pnpm db:generate --filter=api</code>
            </div>
            <div>
              <h3 className='font-semibold'>4. 데이터베이스 마이그레이션</h3>
              <p className='text-sm text-muted-foreground'>
                데이터베이스 스키마를 최신 상태로 마이그레이션합니다.
              </p>
              <code className='block bg-muted p-2 rounded-md mt-2 text-sm'>pnpm db:migrate --filter=api</code>
            </div>
            <div>
              <h3 className='font-semibold'>
                <span className='line-through'>5. 최초 관리자 계정 생성</span>
              </h3>
              <p className='text-sm text-muted-foreground line-through'>
                개발용 최초 관리자 계정을 생성합니다. 계정 정보는
                {' '}
                <code className='text-xs'>packages/config/server.config.ts</code>
                {' '}
                파일에서 수정할 수 있습니다.
              </p>
              <code className='block bg-muted p-2 rounded-md mt-2 text-sm line-through'>pnpm --filter=api exec prisma db seed</code>
              <p className='text-sm text-muted-foreground mt-2'>
                <strong>현재 시딩 기능이 구현되지 않았습니다.</strong>
              </p>
            </div>
            <div>
              <h3 className='font-semibold'>6. 개발 서버 실행</h3>
              <p className='text-sm text-muted-foreground'>
                프론트엔드와 백엔드 개발 서버를 동시에 시작합니다.
              </p>
              <code className='block bg-muted p-2 rounded-md mt-2 text-sm'>pnpm dev</code>
            </div>
          </CardContent>
        </Card>

        {session
          ? (
            // 로그인된 사용자를 위한 콘텐츠
            <div className='grid gap-6 md:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>환영합니다!</CardTitle>
                  <CardDescription>
                    {session.data?.userNm || session.data?.emlAddr}
                    님, 안녕하세요!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className='w-full'>
                    <Link href='/profile'>마이페이지</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>사용자 관리</CardTitle>
                  <CardDescription>
                    전체 사용자 목록을 확인하고 관리하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/users'>사용자 목록</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )
          : (
          // 비로그인 사용자를 위한 콘텐츠
            <div className='grid gap-6 md:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>시작하기</CardTitle>
                  <CardDescription>
                    계정을 만들고 모든 기능을 사용해보세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className='w-full'>
                    <Link href='/auth/signup'>회원가입</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>이미 계정이 있나요?</CardTitle>
                  <CardDescription>
                    로그인하여 개인화된 경험을 즐기세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/auth/signin'>로그인</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

        <div className='mt-16 text-center'>
          <h2 className='text-2xl font-semibold mb-6'>주요 기능</h2>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='p-4 border rounded-lg'>
              <h3 className='font-medium mb-2'>Next.js 15</h3>
              <p className='text-sm text-muted-foreground'>App Router와 최신 기능</p>
            </div>
            <div className='p-4 border rounded-lg'>
              <h3 className='font-medium mb-2'>NestJS</h3>
              <p className='text-sm text-muted-foreground'>강력한 백엔드 프레임워크</p>
            </div>
            <div className='p-4 border rounded-lg'>
              <h3 className='font-medium mb-2'>Drizzle</h3>
              <p className='text-sm text-muted-foreground'>타입 안전한 데이터베이스 ORM</p>
            </div>
            <div className='p-4 border rounded-lg'>
              <h3 className='font-medium mb-2'>React Query</h3>
              <p className='text-sm text-muted-foreground'>효율적인 서버 상태 관리</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
