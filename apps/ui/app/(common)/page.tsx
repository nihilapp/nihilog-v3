import React from 'react';

import { Home } from '@/(common)/_components/Home';
import { setMeta } from '@/_libs';

// interface Props {}

export const metadata = setMeta({
  title: '홈',
  url: '/',
});

export default function page() {
  return (
    <Home />
  );
}
