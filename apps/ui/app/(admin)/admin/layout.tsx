import React from 'react';

import { AdminLayout } from '@/_layouts/admin/AdminLayout';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children, }: Props) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
