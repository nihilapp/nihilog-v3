import { Suspense } from 'react';

import { PostEditorLayout } from '@/_layouts/PostEditorLayout';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children, }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostEditorLayout>
        {children}
      </PostEditorLayout>
    </Suspense>
  );
}
