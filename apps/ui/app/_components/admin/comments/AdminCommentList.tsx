'use client';

import type { SelectCommentListItemType } from '@nihilog/schemas';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

import { Loading } from '@/_components/common/Loading';
import { Box } from '@/_components/ui/box';
import { Button } from '@/_components/ui/button';
import { List } from '@/_components/ui/list';
import { useGetCommentList } from '@/_hooks/comments';
import { defineColumns } from '@/_libs/defineColumns';

interface Props {}

export function AdminCommentList({ }: Props) {
  const [
    selectedItems,
    setSelectedItems,
  ] = useState<Set<string>>(new Set());

  const { response, loading, done, } = useGetCommentList({
    endRow: 10,
  });

  const { tableColumn, customColumn, } = defineColumns<SelectCommentListItemType>();

  const columns = [
    tableColumn({
      key: 'rowNo',
      label: 'No.',
      align: 'center',
      className: '',
      render: (_row, value, _index) => {
        return value as number;
      },
    }),
    tableColumn({
      key: 'cmntCntnt',
      label: '댓글 내용',
      align: 'justify',
      render: (_row, value, _index) => {
        const content = value as string;

        return (
          <Button.Action
            display='block'
            className='button-ghost-blue-600'
            label={content || '(내용 없음)'}
            onClick={() => {
              // TODO: 댓글 상세 페이지로 이동
            }}
          />
        );
      },
    }),
    tableColumn({
      key: 'post',
      label: '포스트',
      align: 'center',
      className: 'w-[20%]',
      render: (row, _value, _index) => {
        const post = row.post as { pstTtl?: string;
          pstNo?: number; } | null;
        const postTitle = post?.pstTtl;

        return (
          <Button.Action
            display='block'
            className='button-outline-stone-600'
            label={postTitle || '(제목 없음)'}
          />
        );
      },
    }),
    tableColumn({
      key: 'creator',
      label: '작성자',
      align: 'center',
      className: 'w-[15%]',
      render: (row, _value, _index) => {
        const creator = row.creator as { userNm?: string } | null;
        const userName = creator?.userNm;

        return userName || '(이름 없음)';
      },
    }),
    tableColumn({
      key: 'crtDt',
      label: '작성일',
      align: 'center',
      className: 'w-[20%]',
      render: (_row, value, _index) => {
        const createdDate = DateTime.fromISO(value as string).toFormat('yyyy-MM-dd HH:mm');

        return createdDate;
      },
    }),
    customColumn({
      key: 'manage',
      label: '관리',
      align: 'center',
      className: 'w-[15%]',
      render: (_row, _value, _index) => {
        const onEditClick = () => {
          // TODO: 수정 페이지로 이동
        };

        const onDeleteClick = () => {
          // TODO: 삭제 처리
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
      <Box.Top title='댓글 목록'>
        <Box.Action></Box.Action>
      </Box.Top>

      <Box.Content>
        {loading && (
          <Loading
            message='댓글 목록을 불러오는 중입니다...'
          />
        )}
        {done && (
          <List.Template
            columns={columns}
            data={response?.data.list || []}
            rowKey='cmntNo'
            selectLabel='선택'
            selectionMode='multiple'
            emptyMessage='댓글이 없습니다.'
            selectedItems={selectedItems}
            onSelectionChange={onListSelectionChange}
          />
        )}
      </Box.Content>
    </Box.Panel>
  );
}
