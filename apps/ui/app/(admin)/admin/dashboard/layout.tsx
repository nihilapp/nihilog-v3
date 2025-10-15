import React from 'react';

import { AdminContent } from '@/(admin)/admin/_layouts/AdminContent';
import { AdminHeader } from '@/(admin)/admin/_layouts/AdminHeader';
import { SidebarProvider } from '@/(common)/_components/ui/sidebar';

interface Props {
  children: React.ReactNode;
}

export default function layout({ children, }: Props) {
  return (
    <SidebarProvider className='h-full w-full overflow-hidden'>
      <div className='h-full w-full flex flex-col overflow-hidden'>
        <AdminHeader />
        <AdminContent>
          {children}
        </AdminContent>
      </div>
    </SidebarProvider>
  );
}
