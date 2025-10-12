import React from 'react';

import { NewPost } from '@/(admin)/admin/dashboard/posts/new/_components/NewPost';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '새로운 포스트',
  url: '/admin/dashboard/posts/new',
});

export default function page() {
  return (
    <NewPost />
  );
}
