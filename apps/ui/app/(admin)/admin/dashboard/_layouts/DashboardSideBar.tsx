'use client';

import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/(common)/_components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/(common)/_components/ui/sidebar';
import { useAdminCreatePost } from '@/_entities/admin/posts/hooks/use-admin-create-post';

const sidebarItems = [
  {
    title: '대시보드',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: '게시글 관리',
    href: '/admin/dashboard/posts',
    icon: FileText,
  },
  {
    title: '사용자 관리',
    href: '/admin/dashboard/users',
    icon: Users,
  },
  {
    title: '설정',
    href: '/admin/dashboard/settings',
    icon: Settings,
  },
];

export function DashboardSideBar() {
  const pathname = usePathname();

  // 새 포스트 생성 훅
  const {
    mutate: createPost,
    isPending: isCreating,
  } = useAdminCreatePost();

  const handleCreateNewPost = async () => {
    try {
      // 빈 포스트 생성
      createPost({
        pstTtl: '',
        pstMtxt: '',
        pstStts: 'EMPTY',
      });
    }
    catch {
      toast.error('게시글 생성에 실패했습니다.');
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className='p-6'>
          <h1 className='text-xl font-semibold'>관리자 대시보드</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <Icon className='h-4 w-4' />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className='p-4 space-y-2'>
          <Button
            onClick={handleCreateNewPost}
            disabled={isCreating}
            className='w-full'
            size='sm'
          >
            <Plus className='mr-2 h-4 w-4' />
            {isCreating
              ? '생성 중...'
              : '새 게시글'}
          </Button>
          <Button variant='outline' className='w-full' size='sm'>
            <LogOut className='mr-2 h-4 w-4' />
            로그아웃
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
