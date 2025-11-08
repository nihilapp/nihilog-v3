'use client';

import React from 'react';

import { Box } from '@/_components/ui/box';
import { AdminMain } from '@/_layouts/admin/AdminMain';
import { AdminSide } from '@/_layouts/admin/AdminSide';

interface Props {
  children?: React.ReactNode;
}

export function AdminContent({ children, }: Props) {
  return (
    <Box.Divider layout='flex' className='flex-1 flex-col md:flex-row p-2 md:p-4 gap-2 overflow-y-hidden'>
      <AdminSide />
      <AdminMain>
        {children}
      </AdminMain>
    </Box.Divider>
  );
}
