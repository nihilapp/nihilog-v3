'use client';

import { DashboardSideBar } from '@/(admin)/admin/dashboard/_layouts/DashboardSideBar';
import { SidebarProvider, SidebarTrigger } from '@/(common)/_components/ui/sidebar';

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children, }: Props) {
  return (
    <SidebarProvider>
      <DashboardSideBar />
      <main className='flex-1 overflow-auto'>
        <div className='p-6'>
          <div className='flex items-center gap-2 mb-6'>
            <SidebarTrigger />
            <h2 className='text-2xl font-bold'>관리자 대시보드</h2>
          </div>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
