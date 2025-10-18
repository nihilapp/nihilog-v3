'use client';

import { ColumnDef } from '@tanstack/react-table';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { DataTable } from '@/(common)/_components/DataTable';
import { Button } from '@/(common)/_components/ui/button';
import { cn } from '@/_libs';
import { CommonHelper } from '@/_libs/tools';
import type { SelectPostType } from '@/_types';

import { useAdminCreatePost } from '@/_entities/admin/posts/hooks';
import { useGetPostsForAdmin } from '@/_entities/posts/hooks/use-get-posts';

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
    },
    {
      accessorKey: 'pstStts',
      header: '상태',
    },
    {
      accessorKey: 'crtDt',
      header: '생성일',
    },
  ];

  const createPost = useAdminCreatePost();
  const { response: posts, done, } = useGetPostsForAdmin({
    searchParams: {
      page: 1,
      strtRow: 0,
      endRow: 10,
    },
  });

  // 디버깅용 로그
  console.log(
    'posts response:',
    posts
  );
  console.log(
    'posts data:',
    posts?.data
  );
  console.log(
    'posts list:',
    posts?.data?.list
  );

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
          <div>
            <Button onClick={onCreatePost}>
              새 포스트
            </Button>
          </div>

          <DataTable
            columns={columns}
            data={posts?.data?.list || []}
            message='포스트가 없습니다.'
          />
        </>
      )}
    </div>
  );
}
