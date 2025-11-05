import React from 'react';

import { AdminPostList } from '@/_components/admin/posts/AdminPostList';
import { setMeta } from '@/_libs';

interface Props {}

export const metadata = setMeta({
  title: '포스트 관리',
  url: '/admin/dashboard/posts',
});

export default function page() {
  return (
    <AdminPostList />
  );
}
