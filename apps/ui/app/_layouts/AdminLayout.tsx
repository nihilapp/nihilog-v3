'use client';

import {
  MdHome,
  MdDashboard,
  MdArticle,
  MdAdd,
  MdTag,
  MdLocalOffer,
  MdPeople,
  MdComment,
  MdNotifications,
  MdLogout,
  MdBarChart
} from 'react-icons/md';

import { Frame } from '@/_components/ui/frame';
import { useAdminCreatePost } from '@/_hooks/admin/posts';
import { useGetSession, useSignOut } from '@/_hooks/auth';
import { useSession } from '@/_stores/auth.store';
import type { Menu } from '@/_types';

interface Props {
  children?: React.ReactNode;
}

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
      icon: <MdAdd />,
      name: '새 포스트',
      action: newPost,
      classNames: [
        'button-outline-black-900',
        'hover:button-normal-blue-500',
      ],
    },
    {
      icon: <MdLogout />,
      name: '로그아웃',
      action: () => {
        signOut.mutate();
      },
      classNames: 'hover:button-normal-black-900',
    },
  ];

  const sideMenu: Menu[] = [
    {
      icon: <MdHome />,
      name: '홈',
      url: '/',
    },
    {
      icon: <MdDashboard />,
      name: '대시보드',
      url: '/admin/dashboard',
    },
    {
      name: '콘텐츠 관리',
      children: [
        {
          name: '포스트 관리',
          children: [
            {
              icon: <MdArticle />,
              name: '포스트 목록',
              url: '/admin/dashboard/posts',
            },
            {
              icon: <MdBarChart />,
              name: '포스트 통계',
              url: '/admin/dashboard/posts/statistics',
            },
          ],
        },
        {
          name: '댓글 관리',
          children: [
            {
              icon: <MdComment />,
              name: '댓글 목록',
              url: '/admin/dashboard/comments',
            },
            {
              icon: <MdBarChart />,
              name: '댓글 통계',
              url: '/admin/dashboard/comments/statistics',
            },
          ],
        },
        {
          name: '카테고리 관리',
          children: [
            {
              icon: <MdTag />,
              name: '카테고리 목록',
              url: '/admin/dashboard/categories',
            },
            {
              icon: <MdBarChart />,
              name: '카테고리 통계',
              url: '/admin/dashboard/categories/statistics',
            },
          ],
        },
        {
          name: '태그 관리',
          children: [
            {
              icon: <MdLocalOffer />,
              name: '태그 목록',
              url: '/admin/dashboard/tags',
            },
            {
              icon: <MdBarChart />,
              name: '태그 통계',
              url: '/admin/dashboard/tags/statistics',
            },
          ],
        },
      ],
    },
    {
      name: '사용자 관리',
      children: [
        {
          name: '사용자 관리',
          children: [
            {
              icon: <MdPeople />,
              name: '사용자 목록',
              url: '/admin/dashboard/users',
            },
            {
              icon: <MdBarChart />,
              name: '사용자 통계',
              url: '/admin/dashboard/users/statistics',
            },
          ],
        },
      ],
    },
    {
      name: '구독 관리',
      children: [
        {
          name: '카테고리 구독 관리',
          children: [
            {
              icon: <MdNotifications />,
              name: '카테고리 구독 목록',
              url: '/admin/dashboard/category-subscribe',
            },
            {
              icon: <MdBarChart />,
              name: '카테고리 구독 통계',
              url: '/admin/dashboard/category-subscribe/statistics',
            },
          ],
        },
        {
          name: '태그 구독 관리',
          children: [
            {
              icon: <MdNotifications />,
              name: '태그 구독 목록',
              url: '/admin/dashboard/tag-subscribe',
            },
            {
              icon: <MdBarChart />,
              name: '태그 구독 통계',
              url: '/admin/dashboard/tag-subscribe/statistics',
            },
          ],
        },
        {
          name: '사용자 구독 관리',
          children: [
            {
              icon: <MdNotifications />,
              name: '사용자 구독 목록',
              url: '/admin/dashboard/user-subscribe',
            },
            {
              icon: <MdBarChart />,
              name: '사용자 구독 통계',
              url: '/admin/dashboard/user-subscribe/statistics',
            },
          ],
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
