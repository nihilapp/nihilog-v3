'use client';

import React from 'react';

import { AdminContent } from '@/_layouts/admin/AdminContent';
import { AdminFooter } from '@/_layouts/admin/AdminFooter';
import { AdminHeader } from '@/_layouts/admin/AdminHeader';

interface Props {
  children: React.ReactNode;
}

export function AdminLayout({ children, }: Props) {
  return (
    <>
      <AdminHeader />
      <AdminContent>
        {children}
      </AdminContent>
      <AdminFooter />
    </>
  );
}
