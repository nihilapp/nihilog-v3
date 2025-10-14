import React, { use } from 'react';

import { PostEdit } from '@/(admin-posts)/admin/posts/edit/_components/PostEdit';
import { setMeta } from '@/_libs';

interface Props {
  searchParams: Promise<{
    pstCd: string;
  }>;
}

export const metadata = setMeta({
  title: '새로운 포스트',
  url: '/admin/posts/edit',
});

export default function PostEditPage({ searchParams, }: Props) {
  const { pstCd, } = use(searchParams);

  return (
    <PostEdit pstCd={pstCd} />
  );
}
