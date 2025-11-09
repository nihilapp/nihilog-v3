'use client';

import { Icon } from '@iconify/react';

import { Frame } from '@/_components/ui/frame';
import { useSignOut } from '@/_entities/auth/hooks';
import type { Menu } from '@/_types';

interface Props {
  children?: React.ReactNode;
}

const navMenu: Menu[] = [
  {
    icon: <Icon icon='mdi:home' />,
    name: '홈',
    url: '/',
  },
  {
    icon: <Icon icon='mdi:post-outline' />,
    name: '포스트',
    url: '/posts',
  },
  {
    icon: <Icon icon='mdi:tag' />,
    name: '태그 클라우드',
    url: '/tags',
  },
  {
    icon: <Icon icon='mdi:archive' />,
    name: '아카이브',
    url: '/archive',
  },
];

export function AdminLayout({ children, }: Props) {
  const signOut = useSignOut();

  const afterSignInMenu: Menu[] = [
    {
      icon: <Icon icon='mdi:user-circle' />,
      name: '프로필',
      url: '/profile',
      role: [ 'USER', ],
    },
    {
      icon: <Icon icon='mdi:cog' />,
      name: '관리자 페이지',
      url: '/admin/dashboard',
      role: [ 'ADMIN', ],
    },
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
        <Frame.Side>
          content
        </Frame.Side>
        <Frame.Main>
          {children}
        </Frame.Main>
      </Frame.Content>
      <Frame.Footer />
    </>
  );
}
