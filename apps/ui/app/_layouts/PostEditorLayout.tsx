'use client';

import { Icon } from '@iconify/react';

import { Frame } from '@/_components/ui/frame';
import type { Menu } from '@/_types/common.types';

// 기본값은 HTMLDivElement, 'className'
interface Props {
  children?: React.ReactNode;
}

const menuItems: Menu[] = [
  {
    icon: <Icon icon='material-symbols:save' />,
    name: '저장',
    url: '/post-editor/save',
  },
];

// TODO: 포스트 에디터 상단 메뉴 구성 사이드바 메뉴 구상.

export function PostEditorLayout({ children, }: Props) {
  return (
    <>
      <Frame.Header text='NIHILOG POST EDITOR'>
        <Frame.AuthButtons
          beforeSignInMenu={[]}
          afterSignInMenu={[]}
        />
        <Frame.Nav menu={menuItems} />
      </Frame.Header>
      <Frame.Content withSide sidePosition='right'>
        {children}
      </Frame.Content>
      <Frame.Footer />
    </>
  );
}
