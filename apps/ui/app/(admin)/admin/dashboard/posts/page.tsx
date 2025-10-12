import React from 'react';

import { PostsList } from '@/(admin)/admin/dashboard/posts/_components/PostsList';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '게시글 관리',
  url: '/admin/dashboard/posts',
});

export default function PostsPage() {
  return <PostsList />;
}
