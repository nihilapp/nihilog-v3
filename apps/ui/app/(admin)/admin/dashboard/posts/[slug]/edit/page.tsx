import React from 'react';

import { PostEditor } from '@/(admin)/admin/dashboard/posts/_components/PostEditor';
import { setMeta } from '@/_libs';

interface Props {
  params: {
    slug: string;
  };
}

export const metadata = setMeta({
  title: '게시글 편집',
  url: '/admin/dashboard/posts/edit',
});

export default function EditPostPage({ params, }: Props) {
  return <PostEditor postCd={params.slug} />;
}
