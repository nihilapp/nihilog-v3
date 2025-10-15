'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { Button } from '@/(common)/_components/ui/button';
import { useAdminCreatePost } from '@/_entities/admin/posts/hooks';
import { useGetPostsForAdmin } from '@/_entities/posts/hooks/use-get-posts';
import { cn } from '@/_libs';
import { CommonHelper } from '@/_libs/tools';

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
  const createPost = useAdminCreatePost();
  const { response: posts, isPending, isSuccess, } = useGetPostsForAdmin();

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
      <Button onClick={onCreatePost}>
        {createPost.isPending
          ? '게시글 생성중...'
          : '게시글 생성'}
      </Button>

      {isPending && <div>로딩중...</div>}
      {isSuccess && <div>성공</div>}
      {posts && <div>{posts.data?.list.length}</div>}
    </div>
  );
}
