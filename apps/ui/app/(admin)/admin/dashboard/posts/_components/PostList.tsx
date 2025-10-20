'use client';

import { ColumnDef } from '@tanstack/react-table';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { DataTable } from '@/(common)/_components/DataTable';
import { Badge } from '@/(common)/_components/ui/badge';
import { Button } from '@/(common)/_components/ui/button';
import { useAdminCreatePost } from '@/_entities/admin/posts/hooks';
import { useGetPostList } from '@/_entities/posts/hooks';
import { cn } from '@/_libs';
import { CommonHelper } from '@/_libs/tools';
import type { SelectPostType } from '@/_types';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function PostList({ className, ...props }: Props) {
  const columns: ColumnDef<SelectPostType>[] = [
    {
      accessorKey: 'pstNo',
      header: '번호',
    },
    {
      accessorKey: 'pstTtl',
      header: '제목',
    },
    {
      accessorKey: 'ctgryNo',
      header: '카테고리',
      cell({ row, }) {
        return (
          <Badge variant='outline'>
            {row.original.ctgryNo
              ? row.original.category?.ctgryNm
              : '미분류'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'pstStts',
      header: '상태',
      cell({ row, }) {
        return (
          <Badge variant='outline'>
            {row.original.pstStts}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'crtDt',
      header: '생성일',
    },
  ];

  // TODO: 어드민 페이지 토큰 관련 내용 확인 필요.

  const createPost = useAdminCreatePost();
  const { response: posts, done, } = useGetPostList({
    params: {
      page: 1,
      strtRow: 0,
      endRow: 10,
    },
  });

  const onCreatePost = () => {
    createPost.mutate({
      pstTtl: '새 포스트',
      pstMtxt: '',
      pstCd: CommonHelper.uuid(),
      pstStts: 'EMPTY',
    });
  };

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {done && (
        <>
          <div className='flex items-center justify-end'>
            <Button onClick={onCreatePost}>
              새 포스트
            </Button>
          </div>

          <DataTable
            columns={columns}
            data={posts?.data?.list || []}
            totalCnt={posts?.data?.totalCnt || 0}
            message='포스트가 없습니다.'
          />
        </>
      )}
    </div>
  );
}
