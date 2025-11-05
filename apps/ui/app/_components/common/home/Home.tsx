'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { PostTable } from '@/_components/admin/posts/PostTable';
import { AsyncBoundary } from '@/_components/common/AsyncBoundary';
import { useGetPostList } from '@/_entities/posts/hooks';
import { cn } from '@/_libs';
import { defineColumns } from '@/_libs/defineColumns';
import type { SelectPostListItemType } from '@/_types';

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

export function Home({ className, ...props }: Props) {
  const { response, loading, done, } = useGetPostList({});

  const column = defineColumns<SelectPostListItemType>();

  const columns = [
    column({
      key: 'category',
      label: '카테고리',
      render: (_row, value, _index) => {
        if (value && typeof value === 'object' && 'ctgryNm' in value) {
          return value.ctgryNm ?? '미분류';
        }
        return '미분류';
      },
    }),
    column({
      key: 'pstTtl',
      label: '제목',
      render: (_row, value, _index) => {
        return String(value ?? '');
      },
    }),
  ];

  return (
    <AsyncBoundary
      loading={loading}
      done={done}
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <PostTable
        columns={columns}
        data={response?.data?.list ?? []}
        totalCnt={response?.data?.totalCnt ?? 0}
        emptyMessage='게시글이 없습니다.'
      />
    </AsyncBoundary>
  );
}
