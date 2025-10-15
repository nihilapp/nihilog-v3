import React from 'react';

import { AdminDashboard } from '@/(admin)/admin/dashboard/_components/AdminDashboard';
import { setMeta } from '@/_libs';

interface Props {}

export const metadata = setMeta({
  title: '관리자 대시보드',
  url: '/admin/dashboard',
});

export default function page() {
  return (
    <AdminDashboard />
  );
}
