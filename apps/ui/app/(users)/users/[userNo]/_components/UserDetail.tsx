'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/(common)/_components/ui/card';
import { useAdminGetUserByNo } from '@/_entities/admin/users/hooks';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  userNo: number;
}

const cssVariants = cva(
  [ 'container mx-auto py-10', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function UserDetail({ userNo, className, ...props }: Props) {
  const { data: user, isLoading: loading, error, } = useAdminGetUserByNo(userNo);

  if (loading) {
    return (
      <div className={cssVariants({})}>
        <div className='animate-pulse space-y-4'>
          <div className='h-8 bg-muted rounded w-1/4' />
          <div className='h-4 bg-muted rounded w-1/2' />
          <div className='h-4 bg-muted rounded w-3/4' />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={cssVariants({})}>
        <div className='text-center'>
          <p className='text-muted-foreground'>
            사용자 정보를 불러올 수 없습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cssVariants({ className, })} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{user.data?.userNm}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Email:
            {user.data?.emlAddr}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
