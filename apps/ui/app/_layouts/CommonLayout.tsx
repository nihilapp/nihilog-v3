'use client';

import { useEffect, useState } from 'react';
import {
  MdHome,
  MdArticle,
  MdTag,
  MdArchive,
  MdPersonAdd,
  MdAccountCircle,
  MdSettings,
  MdLogin,
  MdLogout
} from 'react-icons/md';

import { Frame } from '@/_components/ui/frame';
import { useAdminGetCategoryList } from '@/_hooks/admin/categories';
import { useGetSession, useSignOut } from '@/_hooks/auth';
import { useResponsive } from '@/_hooks/common';
import { cn } from '@/_libs';
import type { Menu } from '@/_types';

// 기본값은 HTMLDivElement, 'className'
interface Props {
  children?: React.ReactNode;
}

export function CommonLayout({ children, }: Props) {
  // 세션 동기화 (서버에서 세션 정보 가져오기)
  useGetSession();

  const { isMoSm, } = useResponsive();
  const { } = useAdminGetCategoryList({
    upCtgryNo: null,
  });

  const signOut = useSignOut();

  const [
    isCollapsed,
    setIsCollapsed,
  ] = useState(false);

  useEffect(
    () => {
      if (isMoSm) {
        setIsCollapsed(true);
      }
      else {
        setIsCollapsed(false);
      }
    },
    [ isMoSm, ]
  );

  const onToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };
  const classNames = cn([
    'data-[selected=true]:menu-underline-black-900',
    'hover:menu-underline-blue-500!',
  ]);

  const navMenu: Menu[] = [
    {
      icon: <MdHome className='size-5' />,
      name: '홈',
      url: '/',
      classNames: classNames,
    },
    {
      icon: <MdArticle className='size-5' />,
      name: '포스트',
      url: '/posts',
      classNames: classNames,
    },
    {
      icon: <MdTag className='size-5' />,
      name: '태그 클라우드',
      url: '/tags',
      classNames: classNames,
    },
    {
      icon: <MdArchive className='size-5' />,
      name: '아카이브',
      url: '/archive',
      classNames: classNames,
    },
  ];

  const beforeSignInMenu: Menu[] = [
    {
      icon: <MdPersonAdd className='size-5' />,
      name: '구독',
      url: '/auth/subscribe',
      classNames: cn([ 'button-outline-black-900 hover:button-normal-blue-500', ]),
    },
    {
      icon: <MdPersonAdd className='size-5' />,
      name: '관리자 생성',
      url: '/auth/admin/signup',
      visible: process.env.NODE_ENV === 'development',
      classNames: cn([ 'button-outline-black-900 hover:button-normal-blue-500', ]),
    },
    {
      icon: <MdLogin className='size-5' />,
      name: '로그인',
      url: '/auth/signin',
      classNames: 'hover:button-normal-black-900',
    },
  ];

  const afterSignInMenu: Menu[] = [
    {
      icon: <MdAccountCircle className='size-5' />,
      name: '프로필',
      url: '/profile',
      role: [ 'USER', ],
      classNames: cn([ 'button-outline-black-900 hover:button-normal-blue-500', ]),
    },
    {
      icon: <MdSettings className='size-5' />,
      name: '관리자 페이지',
      url: '/admin/dashboard',
      role: [ 'ADMIN', ],
      classNames: cn([ 'button-outline-black-900 hover:button-normal-blue-500', ]),
    },
    {
      icon: <MdLogout className='size-5' />,
      name: '로그아웃',
      action: () => {
        signOut.mutate();
      },
      classNames: 'hover:button-normal-black-900',
    },
  ];

  return (
    <>
      <Frame.Header
        text='NIHILOG'
        href='/'
        toggleButton={(
          <Frame.Side.ToggleButton
            isCollapsed={isCollapsed}
            onToggleCollapse={onToggleCollapse}
            sidePosition='left'
          />
        )}
      >
        <Frame.Nav menu={navMenu} />
        <div className='frame-nav-saparator' />
        <Frame.AuthButtons
          beforeSignInMenu={beforeSignInMenu}
          afterSignInMenu={afterSignInMenu}
        />
      </Frame.Header>
      <Frame.Content>
        <Frame.Side.Container
          sidePosition='left'
          title='메뉴'
          isCollapsed={isCollapsed}
        >
          <Frame.Side.Menu menu={[]} />
        </Frame.Side.Container>
        <Frame.Main>
          {children}
        </Frame.Main>
      </Frame.Content>
      <Frame.Footer />
    </>
  );
}
