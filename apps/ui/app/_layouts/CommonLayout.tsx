'use client';

import { Icon } from '@iconify/react';

import { Frame } from '@/_components/ui/frame';
import { useGetSession, useSignOut } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';
import type { Menu } from '@/_types';

// 기본값은 HTMLDivElement, 'className'
interface Props {
  children?: React.ReactNode;
}

export function CommonLayout({ children, }: Props) {
  // 세션 동기화 (서버에서 세션 정보 가져오기)
  useGetSession();

  const signOut = useSignOut();
  const classNames = cn([
    'data-[selected=true]:menu-underline-black-900',
    'hover:menu-underline-blue-500!',
  ]);

  const navMenu: Menu[] = [
    {
      icon: <Icon icon='mdi:home' />,
      name: '홈',
      url: '/',
      classNames: classNames,
    },
    {
      icon: <Icon icon='mdi:post-outline' />,
      name: '포스트',
      url: '/posts',
      classNames: classNames,
    },
    {
      icon: <Icon icon='mdi:tag' />,
      name: '태그 클라우드',
      url: '/tags',
      classNames: classNames,
    },
    {
      icon: <Icon icon='mdi:archive' />,
      name: '아카이브',
      url: '/archive',
      classNames: classNames,
    },
  ];

  const beforeSignInMenu: Menu[] = [
    {
      icon: <Icon icon='mdi:user-add' />,
      name: '구독',
      url: '/auth/subscribe',
      classNames: cn([ 'button-outline-black-900 hover:button-normal-blue-500', ]),
    },
    {
      icon: <Icon icon='mdi:user-add' />,
      name: '관리자 생성',
      url: '/auth/admin/signup',
      visible: process.env.NODE_ENV === 'development',
      classNames: cn([ 'button-outline-black-900 hover:button-normal-blue-500', ]),
    },
    {
      icon: <Icon icon='uiw:login' />,
      name: '로그인',
      url: '/auth/signin',
      classNames: 'hover:button-normal-black-900',
    },
  ];

  const afterSignInMenu: Menu[] = [
    {
      icon: <Icon icon='mdi:user-circle' />,
      name: '프로필',
      url: '/profile',
      role: [ 'USER', ],
      classNames: cn([ 'button-outline-black-900 hover:button-normal-blue-500', ]),
    },
    {
      icon: <Icon icon='mdi:cog' />,
      name: '관리자 페이지',
      url: '/admin/dashboard',
      role: [ 'ADMIN', ],
      classNames: cn([ 'button-outline-black-900 hover:button-normal-blue-500', ]),
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
  return (
    <>
      <Frame.Header text='NIHILOG' href='/'>
        <Frame.Nav menu={navMenu} />
        <div className='frame-nav-saparator' />
        <Frame.AuthButtons
          beforeSignInMenu={beforeSignInMenu}
          afterSignInMenu={afterSignInMenu}
        />
      </Frame.Header>
      <Frame.Content>
        <Frame.Side sidePosition='left' title='메뉴'>
          <Frame.SideMenu menu={[]} />
        </Frame.Side>
        <Frame.Main>
          {children}
        </Frame.Main>
      </Frame.Content>
      <Frame.Footer />
    </>
  );
}
