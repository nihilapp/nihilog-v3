import React from 'react';

import { DashboardHome } from '@/(admin)/admin/dashboard/_components/DashboardHome';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '관리자 대시보드',
  url: '/admin/dashboard',
});

export default function page() {
  return (
    <DashboardHome />
  );
}
