'use client';

import { Icon } from '@iconify/react';

import { Frame } from '@/_components/ui/frame';
import { useSignOut } from '@/_entities/auth/hooks';
import type { Menu } from '@/_types';

interface Props {
  children?: React.ReactNode;
}

// TODO: 어드민 메뉴 조정 필요.

export function AdminLayout({ children, }: Props) {
  const signOut = useSignOut();

  const navMenu: Menu[] = [
    {
      icon: <Icon icon='mdi:post-outline' />,
      name: '새 포스트',
      url: '/admin/posts/new',
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

  return (
    <>
      <Frame.Header text='NIHILOG ADMIN'>
        <Frame.Nav menu={navMenu} />
        <div className='hidden md:block w-[2px] h-[15px] bg-black-300' />
        <Frame.AuthButtons
          beforeSignInMenu={[]}
          afterSignInMenu={afterSignInMenu}
        />
      </Frame.Header>
      <Frame.Content withSide sidePosition='left'>
        {children}
      </Frame.Content>
      <Frame.Footer />
    </>
  );
}
