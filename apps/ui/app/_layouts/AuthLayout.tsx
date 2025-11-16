'use client';

import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';

import { Frame } from '@/_components/ui/frame';
import type { Menu } from '@/_types';

interface Props {
  children?: React.ReactNode;
}

const navMenu: Menu[] = [
  {
    icon: <Icon icon='mdi:lock-reset' />,
    name: '비밀번호를 잊었어요',
    url: '/auth/forgot-password',
  },
  {
    icon: <Icon icon='mdi:user-add' />,
    name: '회원가입',
    url: '/auth/subscribe',
  },
  {
    icon: <Icon icon='uiw:login' />,
    name: '로그인',
    url: '/auth/signin',
  },
];

export function AuthLayout({ children, }: Props) {
  const pathname = usePathname();

  // 현재 경로가 아닌 항목만 필터링
  const visibleMenu = navMenu.filter((item) => item.url !== pathname);

  return (
    <>
      <Frame.Header text='NIHILOG' href='/'>
        {visibleMenu.length > 0 && (
          <Frame.Nav menu={visibleMenu} />
        )}
      </Frame.Header>
      <Frame.Content>
        <Frame.Main>
          {children}
        </Frame.Main>
      </Frame.Content>
      <Frame.Footer />
    </>
  );
}
