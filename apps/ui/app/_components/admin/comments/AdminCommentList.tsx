'use client';

import type { SelectCommentListItemType } from '@nihilog/schemas';
import { useMutation } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

import { Loading } from '@/_components/common/Loading';
import { Badge } from '@/_components/ui/badge';
import { Box } from '@/_components/ui/box';
import { Button } from '@/_components/ui/button';
import { List } from '@/_components/ui/list';
import { useGetCommentList } from '@/_hooks/comments';
import { useAlert } from '@/_hooks/common/use-alert';
import { useInvalidateCommentsCache } from '@/_keys/comments/comments.keys';
import { Api } from '@/_libs';
import { defineColumns } from '@/_libs/defineColumns';

import { UpdateCommentForm } from './UpdateCommentForm';

interface Props {}

export function AdminCommentList({ }: Props) {
  const [
    selectedItems,
    setSelectedItems,
  ] = useState<Set<string>>(new Set());
  const [
    updateModalOpen,
    setUpdateModalOpen,
  ] = useState(false);
  const [
    selectedComment,
    setSelectedComment,
  ] = useState<SelectCommentListItemType | null>(null);

  const { response, loading, done, refetch, } = useGetCommentList({
    endRow: 10,
  });
  const { triggerConfirm, } = useAlert();
  const invalidateCache = useInvalidateCommentsCache();

  const deleteCommentMutation = useMutation({
    mutationFn: async (cmntNo: number) => {
      return await Api.deleteQuery<boolean>(`comments/${cmntNo}`);
    },
    onSuccess() {
      invalidateCache();
      refetch();
    },
  });

  const { tableColumn, customColumn, } = defineColumns<SelectCommentListItemType>();

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'PENDING':
        return {
          label: '대기',
          color: 'orange' as const,
        };
      case 'APPROVED':
        return {
          label: '승인',
          color: 'green' as const,
        };
      case 'REJECTED':
        return {
          label: '거부',
          color: 'red' as const,
        };
      case 'SPAM':
        return {
          label: '스팸',
          color: 'red' as const,
        };
      default:
        return {
          label: status,
          color: 'gray' as const,
        };
    }
  };

  const columns = [
    tableColumn({
      key: 'cmntSts',
      label: '상태',
      align: 'center',
      className: 'w-[10%]',
      render: (_row, value, _index) => {
        const status = value as string;
        const statusInfo = getStatusInfo(status);

        return (
          <Badge
            label={statusInfo.label}
            color={statusInfo.color}
            textSize='sm'
            display='inline'
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
      label: '덧글이 달린 포스트',
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
      key: 'crtDt',
      label: '게시 날짜',
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
      render: (row, _value, _index) => {
        const comment = row as SelectCommentListItemType;

        const onEditClick = () => {
          setSelectedComment(comment);
          setUpdateModalOpen(true);
        };

        const onDeleteClick = () => {
          triggerConfirm(
            '댓글을 삭제하시겠습니까?',
            () => {
              deleteCommentMutation.mutate(comment.cmntNo);
            }
          );
        };

        return (
          <div className='flex items-center justify-center gap-2'>
            <Button.Action
              icon={<MdEdit className='size-5' />}
              label='수정'
              onClick={onEditClick}
              className='hover:button-normal-black-900'
            />
            <Button.Action
              icon={<MdDelete className='size-5' />}
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

  const onCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedComment(null);
  };

  return (
    <>
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

      {selectedComment && (
        <UpdateCommentForm
          open={updateModalOpen}
          onClose={onCloseUpdateModal}
          comment={selectedComment}
          onSuccess={() => {
            refetch();
          }}
        />
      )}
    </>
  );
}
