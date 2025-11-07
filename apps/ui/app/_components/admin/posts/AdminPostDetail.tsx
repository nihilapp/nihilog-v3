'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { AsyncBoundary } from '@/_components/common/AsyncBoundary';
import { useGetPostByNo } from '@/_entities/posts/hooks';
import { cn } from '@/_libs';

interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
  postNo: number;
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AdminPostDetail({ className, postNo, ...props }: Props) {
  const { response, loading, done, } = useGetPostByNo(postNo);

  return (
    <AsyncBoundary
      loading={loading}
      done={done}
      className={cn(
        cssVariants({}),
        className
      )}
      loadingMessage='포스트를 불러오는 중...'
      {...props}
    >
      {response?.data && (
        <div>
          {/* 포스트 상세 내용 */}
          <h1>{response.data.pstTtl}</h1>
          {response.data.category && (
            <div>카테고리: {response.data.category.ctgryNm}</div>
          )}
        </div>
      )}
    </AsyncBoundary>
  );
}
