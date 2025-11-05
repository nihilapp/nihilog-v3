import React from 'react';

import { CommonLayout } from '@/_layouts/common/CommonLayout';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children, }: Props) {
  return (
    <CommonLayout>
      {children}
    </CommonLayout>
  );
}
