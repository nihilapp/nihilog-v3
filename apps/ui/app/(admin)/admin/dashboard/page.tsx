import React from 'react';

import { setMeta } from '@/_libs';

interface Props {}

export const metadata = setMeta({
  title: '대시보드',
  url: '/admin/dashboard',
});

export default function page() {
  return (
    <div>content</div>
  );
}
