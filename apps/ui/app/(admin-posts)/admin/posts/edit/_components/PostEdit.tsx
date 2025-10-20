'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useMemo } from 'react';

import { useGetPostByNo } from '@/_entities/posts/hooks';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  pstNo: string;
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function PostEdit({ className, pstNo, ...props }: Props) {
  const { response, loading, done, } = useGetPostByNo({ pstNo: +pstNo, });

  const post = useMemo(
    () => {
      return response?.data;
    },
    [ response, ]
  );

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {loading && <div>로딩중...</div>}
      {done && (
        <>
          <div>포스트 제목: {post?.pstTtl}</div>
          <div>포스트 요약: {post?.pstSmry}</div>
          <div>포스트 내용: {post?.pstMtxt}</div>
          <div>포스트 코드: {post?.pstCd}</div>
        </>
      )}
    </div>
  );
}
