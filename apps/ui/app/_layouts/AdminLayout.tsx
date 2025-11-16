'use client';

import { Icon } from '@iconify/react';

import { Frame } from '@/_components/ui/frame';
import { useAdminCreatePost } from '@/_entities/admin/posts/hooks';
import { useGetSession, useSignOut } from '@/_entities/auth/hooks';
import { useSession } from '@/_stores/auth.store';
import type { Menu } from '@/_types';

interface Props {
  children?: React.ReactNode;
}

// TODO: 어드민 메뉴 조정 필요.

export function AdminLayout({ children, }: Props) {
  // 세션 동기화 (서버에서 세션 정보 가져오기)
  useGetSession();

  const createPost = useAdminCreatePost();
  const signOut = useSignOut();
  const session = useSession();

  const newPost = () => {
    if (!session?.userNo) {
      return;
    }

    createPost.mutate({
      userNo: session.userNo,
      pstTtl: '새 포스트',
      pstMtxt: '[]',
    });
  };

  const afterSignInMenu: Menu[] = [
    {
      icon: <Icon icon='pajamas:doc-new' />,
      name: '새 포스트',
      action: newPost,
      classNames: [
        'button-outline-black-900',
        'hover:button-normal-blue-500',
      ],
    },
    {
      icon: <Icon icon='uiw:logout' />,
      name: '로그아웃',
      action: () => {
        signOut.mutate();
      },
      classNames: 'hover:button-normal-black-900',
    },
  ];

  const sideMenu: Menu[] = [
    {
      icon: <Icon icon='mdi:home' />,
      name: '홈',
      url: '/',
    },
    {
      icon: <Icon icon='mdi:view-dashboard' />,
      name: '대시보드',
      url: '/admin/dashboard',
    },
    {
      name: '포스트 관리',
      children: [
        {
          icon: <Icon icon='mdi:post-outline' />,
          name: '포스트 목록',
          url: '/admin/dashboard/posts',
        },
        {
          icon: <Icon icon='pajamas:doc-new' />,
          name: '새 포스트',
          action: newPost,
        },
      ],
    },
    {
      name: '카테고리 관리',
      children: [
        {
          icon: <Icon icon='mdi:tag' />,
          name: '카테고리 목록',
          url: '/admin/dashboard/categories',
        },
      ],
    },
  ];

  return (
    <>
      <Frame.Header text='NIHILOG ADMIN' href='/admin/dashboard'>
        <Frame.AuthButtons
          beforeSignInMenu={[]}
          afterSignInMenu={afterSignInMenu}
        />
      </Frame.Header>
      <Frame.Content>
        <Frame.Side
          sidePosition='left'
          title='메뉴'
        >
          <Frame.SideMenu
            menu={sideMenu}
            custom={{
              subMenu: 'ml-4',
            }}
          />
        </Frame.Side>
        <Frame.Main>
          {children}
        </Frame.Main>
      </Frame.Content>
      <Frame.Footer />
    </>
  );
}
