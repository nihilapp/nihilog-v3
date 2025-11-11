'use client';

import { Icon } from '@iconify/react';

import { Frame } from '@/_components/ui/frame';
import { useAdminCreatePost } from '@/_entities/admin/posts/hooks';
import { useSignOut } from '@/_entities/auth/hooks';
import type { Menu } from '@/_types';

interface Props {
  children?: React.ReactNode;
}

// TODO: 어드민 메뉴 조정 필요.

export function AdminLayout({ children, }: Props) {
  const createPost = useAdminCreatePost();
  const signOut = useSignOut();

  const newPost = () => {
    createPost.mutate({
      pstTtl: '새 포스트',
      pstMtxt: '새 포스트 내용',
    });
  };

  const navMenu: Menu[] = [
    {
      icon: <Icon icon='pajamas:doc-new' />,
      name: '새 포스트',
      action: newPost,
    },
  ];

  const afterSignInMenu: Menu[] = [
    {
      icon: <Icon icon='uiw:logout' />,
      name: '로그아웃',
      action: () => {
        signOut.mutate();
      },
    },
  ];

  const sideMenu: Menu[] = [
    {
      icon: <Icon icon='mdi:home' />,
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
  ];

  return (
    <>
      <Frame.Header text='NIHILOG ADMIN' href='/admin/dashboard'>
        <Frame.Nav menu={navMenu} />
        <div className='frame-nav-saparator' />
        <Frame.AuthButtons
          beforeSignInMenu={[]}
          afterSignInMenu={afterSignInMenu}
        />
      </Frame.Header>
      <Frame.Content
        withSide
        sidePosition='left'
        sideMenu={sideMenu}
        sideTitle='메뉴'
      >
        {children}
      </Frame.Content>
      <Frame.Footer />
    </>
  );
}
