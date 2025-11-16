'use client';

import type { SelectCategoryType, SelectPostListItemType } from '@nihilog/schemas';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Loading } from '@/_components/common/Loading';
import { Box } from '@/_components/ui/box';
import { Button } from '@/_components/ui/button';
import { List } from '@/_components/ui/list';
import { useGetPostList } from '@/_entities/posts/hooks';
import { defineColumns } from '@/_libs/defineColumns';
import { useEditMode, usePostActions } from '@/_stores/posts.store';

interface Props {}

export function AdminPostList({ }: Props) {
  const [
    selectedItems,
    setSelectedItems,
  ] = useState<Set<string>>(new Set());

  const router = useRouter();
  const editMode = useEditMode();
  const { setEditMode, } = usePostActions();

  const { response, loading, done, } = useGetPostList({
    endRow: 10,
    orderBy: 'LATEST',
  });

  const column = defineColumns<SelectPostListItemType>();

  const columns = [
    column({
      key: 'rowNo',
      label: 'No.',
      align: 'center',
      className: '',
      render: (_row, value, _index) => {
        return value as number;
      },
    }),
    column({
      key: 'pstTtl',
      label: '제목',
      align: 'justify',
      render: (row, value, _index) => {
        const title = value as string;

        return (
          <Button.Action
            display='block'
            className='button-ghost-blue-600'
            label={title}
            onClick={() => {
              if (editMode === 'create') {
                setEditMode('update');
              }

              router.push(`/admin/posts/editor?pstNo=${row.pstNo}`);
            }}
          />
        );
      },
    }),
    column({
      key: 'category',
      label: '카테고리',
      align: 'center',
      className: 'w-[10%]',
      render: (_row, value, _index) => {
        const categoryNm = (value as SelectCategoryType)?.ctgryNm;

        return (
          <Button.Action
            display='block'
            className='button-outline-stone-600'
            label={categoryNm || '미분류'}
          />
        );
      },
    }),
    column({
      key: 'publDt',
      label: '발행일',
      align: 'center',
      className: 'w-[25%]',
      render: (_row, value, _index) => {
        const publishedDate = DateTime.fromISO(value as string).toFormat('yyyy년 MM월 dd일 HH:mm:ss');

        return publishedDate;
      },
    }),
  ];

  const onListSelectionChange = (items: Set<string> | string[]) => {
    setSelectedItems(items as Set<string>);
  };

  return (
    <Box.Panel panel={false}>
      <Box.Top title='포스트 목록'>
        <Box.Action></Box.Action>
      </Box.Top>

      <Box.Content>
        {loading && (
          <Loading
            message='게시글 목록을 불러오는 중입니다...'
          />
        )}
        {done && (
          <List.Template
            columns={columns}
            data={response?.data.list || []}
            rowKey='pstNo'
            selectLabel='선택'
            selectionMode='multiple'
            emptyMessage='게시글이 없습니다.'
            selectedItems={selectedItems}
            onSelectionChange={onListSelectionChange}
          />
        )}
      </Box.Content>
    </Box.Panel>
  );
}
