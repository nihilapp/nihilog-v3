import React from 'react';

import { PostEditor } from '@/(admin)/admin/dashboard/posts/_components/PostEditor';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '새 게시글 작성',
  url: '/admin/dashboard/posts/new/edit',
});

interface Props {
  searchParams: {
    slug?: string;
  };
}

export default function NewPostPage({ searchParams, }: Props) {
  const slug = searchParams.slug || 'new';
  return <PostEditor postCd={slug} />;
}
