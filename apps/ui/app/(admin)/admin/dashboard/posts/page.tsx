import React from 'react';

import { PostList } from '@/(admin)/admin/dashboard/posts/_components/PostList';
import { setMeta } from '@/_libs';

// interface Props {}

export const metadata = setMeta({
  title: '포스트 목록',
  url: '/admin/dashboard/posts',
});

export default function page() {
  return (
    <PostList />
  );
}
