'use client';

import type { SelectCategoryType, SelectPostListItemType } from '@nihilog/schemas';
import { useMutation } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdTitle, MdFolder, MdSchedule, MdEdit, MdDelete } from 'react-icons/md';

import { Loading } from '@/_components/common/Loading';
import { Box } from '@/_components/ui/box';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { List } from '@/_components/ui/list';
import { useAlert } from '@/_hooks/common/use-alert';
import { useGetPostList } from '@/_hooks/posts';
import { useInvalidateAdminPostsCache } from '@/_keys/admin/posts/admin-posts.keys';
import { Api } from '@/_libs';
import { defineColumns } from '@/_libs/defineColumns';
import { usePostActions } from '@/_stores/posts.store';

interface Props {}

export function AdminPostList({ }: Props) {
  const router = useRouter();
  const [
    selectedItems,
    setSelectedItems,
  ] = useState<Set<string>>(new Set());

  const { response, loading, done, refetch, } = useGetPostList({
    endRow: 10,
    orderBy: 'LATEST',
  });
  const { triggerConfirm, } = useAlert();
  const { setEditMode, } = usePostActions();
  const invalidateCache = useInvalidateAdminPostsCache();

  const deletePostMutation = useMutation({
    mutationFn: async (pstNo: number) => {
      return await Api.deleteQuery<boolean>(`admin/posts/${pstNo}`);
    },
    onSuccess() {
      invalidateCache();
      refetch();
    },
  });

  const { tableColumn, customColumn, } = defineColumns<SelectPostListItemType>();

  const columns = [
    tableColumn({
      key: 'pstTtl',
      label: '제목',
      align: 'left',
      icon: <MdTitle />,
      render: (row, value, _index) => {
        const title = value as string;

        return (
          <Button.Link
            href={`/admin/dashboard/posts/${row.pstNo}`}
            display='block'
            className='button-ghost-blue-600 justify-start hover:bg-blue-50!'
            label={title}
          />
        );
      },
    }),
    tableColumn({
      key: 'category',
      label: '카테고리',
      align: 'center',
      icon: <MdFolder />,
      className: 'w-[10%]',
      render: (_row, value, _index) => {
        const categoryNm = (value as SelectCategoryType)?.ctgryNm;

        return (
          <Input.TextItem
            text={categoryNm || '미분류'}
            custom={{
              item: 'w-full',
              text: 'text-center',
            }}
          />
        );
      },
    }),
    tableColumn({
      key: 'publDt',
      label: '발행일',
      align: 'center',
      icon: <MdSchedule />,
      className: 'w-[25%]',
      render: (_row, value, _index) => {
        const publishedDate = DateTime.fromISO(value as string).toFormat('yyyy-MM-dd HH:mm');

        return publishedDate;
      },
    }),
    customColumn({
      key: 'manage',
      label: '관리',
      align: 'center',
      className: 'w-[15%]',
      render: (row, _value, _index) => {
        const post = row as SelectPostListItemType;

        const onEditClick = () => {
          setEditMode('update');
          router.push(`/admin/posts/editor?pstNo=${post.pstNo}`);
        };

        const onDeleteClick = () => {
          triggerConfirm(
            `포스트 "${post.pstTtl}"을(를) 삭제하시겠습니까?`,
            () => {
              deletePostMutation.mutate(post.pstNo);
            }
          );
        };

        return (
          <div className='flex items-center justify-center gap-2'>
            <Button.Action
              icon={<MdEdit />}
              label='수정'
              onClick={onEditClick}
              className='hover:button-normal-black-900'
            />
            <Button.Action
              icon={<MdDelete />}
              label='삭제'
              onClick={onDeleteClick}
              className='button-normal-red-500 hover:button-normal-red-600'
            />
          </div>
        );
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
            showSelectIcon
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
