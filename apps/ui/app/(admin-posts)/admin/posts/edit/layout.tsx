import React from 'react';

import { PostEditTopMenu } from '@/(admin-posts)/admin/posts/edit/_layouts/PostEditTopMenu';

interface Props {
  children: React.ReactNode;
}

export default function PostEditLayout({ children, }: Props) {
  return (
    <>
      <PostEditTopMenu />
    </>
  );
}
