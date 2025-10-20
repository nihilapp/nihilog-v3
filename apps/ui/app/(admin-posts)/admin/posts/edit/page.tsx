import React, { use } from 'react';

import { PostEdit } from '@/(admin-posts)/admin/posts/edit/_components/PostEdit';
import { setMeta } from '@/_libs';

interface Props {
  searchParams: Promise<{
    pstNo: string;
  }>;
}

export const metadata = setMeta({
  title: '새로운 포스트',
  url: '/admin/posts/edit',
});

export default function PostEditPage({ searchParams, }: Props) {
  const { pstNo, } = use(searchParams);

  return (
    <PostEdit pstNo={pstNo} />
  );
}
