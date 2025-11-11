'use client';

import { Icon } from '@iconify/react';
import React from 'react';

import { Frame } from '@/_components/ui/frame';
import { useGetPostByNo } from '@/_entities/posts/hooks';
import { useEditMode, usePostNo } from '@/_entities/posts/posts.store';
import type { Menu } from '@/_types';

// 기본값은 HTMLDivElement, 'className'
interface Props {
  children?: React.ReactNode;
}

// TODO: 포스트 에디터 상단 메뉴 구성 사이드바 메뉴 구상.

export function PostEditorLayout({ children, }: Props) {
  const postNo = usePostNo();
  const editMode = useEditMode();

  const { response, loading, done, } = useGetPostByNo(postNo);

  const savePost = () => {
    console.log('저장');
  };

  const publishPost = () => {
    console.log('발행');
  };

  const menuItems: Menu[] = [
    {
      icon: <Icon icon='material-symbols:save' />,
      name: '저장',
      action: savePost,
    },
    {
      icon: <Icon icon='material-symbols:publish' />,
      name: '발행',
      action: publishPost,
    },
  ];

  return (
    <>
      {loading && (
        <div></div>
      )}
      {response && done && (
        <React.Fragment>
          <Frame.Header text='NIHILOG POST EDITOR' href='/admin/dashboard'>
            <div>{response.data.pstStts}</div>
            <div className='frame-nav-saparator' />
            <Frame.Nav menu={menuItems} />
          </Frame.Header>
          <Frame.Content withSide sidePosition='right'>
            {children}
          </Frame.Content>
          <Frame.Footer />
        </React.Fragment>
      )}
    </>
  );
}
