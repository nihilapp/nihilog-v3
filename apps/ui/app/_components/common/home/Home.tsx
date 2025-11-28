'use client';

import type { SelectCategoryType, SelectPostListItemType } from '@nihilog/schemas';
import { DateTime } from 'luxon';
import { useState } from 'react';

import { AsyncBoundary } from '@/_components/common/AsyncBoundary';
import { Box } from '@/_components/ui/box';
import { Button } from '@/_components/ui/button';
import { List } from '@/_components/ui/list';
import { useAlert } from '@/_hooks/common/use-alert';
import { useGetPostList } from '@/_hooks/posts';
import { defineColumns } from '@/_libs/defineColumns';

interface Props {
  className?: string | string[];
}

export function Home({ }: Props) {
  const [
    listSelectedItems,
    setListSelectedItems,
  ] = useState<Set<string>>(new Set());

  const { triggerInfo, triggerError, triggerWarn, triggerConfirm, } = useAlert();

  const { response, loading, done, } = useGetPostList({
    endRow: 10,
    orderBy: 'LATEST',
    // 릴리즈 Y인 데이터를 가져오는데 최초 등록 상태인 데이터가 Y로 나옴.
    rlsYn: 'Y',
  });

  const { tableColumn, } = defineColumns<SelectPostListItemType>();

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
      key: 'pstTtl',
      label: '제목',
      align: 'justify',
      render: (row, value, _index) => {
        const title = value as string;

        return (
          <Button.Link
            href={`/posts/${row.pstCd}`}
            display='block'
            className='button-ghost-blue-600'
            label={title}
          />
        );
      },
    }),
    tableColumn({
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
    tableColumn({
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

  const onListSelectionChange = (selectedItems: Set<string> | string[]) => {
    setListSelectedItems(selectedItems as Set<string>);
  };

  const onInfoClick = () => {
    triggerInfo('정보 메시지입니다.');
  };

  const onErrorClick = () => {
    triggerError('오류 메시지입니다.');
  };

  const onWarnClick = () => {
    triggerWarn('경고 메시지입니다.');
  };

  const onConfirmClick = () => {
    triggerConfirm(
      '정말 삭제하시겠습니까?',
      () => {
        console.log('확인 버튼 클릭됨');
      }
    );
  };

  return (
    <AsyncBoundary
      loading={loading}
      done={done}
    >
      <Box.Top
        title='최근 10개 게시글'
      />
      <Box.Content>
        <div className='flex flex-row gap-2 p-4 mb-4 border-b border-black-300'>
          <Button.Action
            label='Info 알림'
            onClick={onInfoClick}
            display='inline'
            className='button-normal-blue-600'
          />
          <Button.Action
            label='Error 알림'
            onClick={onErrorClick}
            display='inline'
            className='button-normal-red-600'
          />
          <Button.Action
            label='Warn 알림'
            onClick={onWarnClick}
            display='inline'
            className='button-normal-orange-600'
          />
          <Button.Action
            label='Confirm 모달'
            onClick={onConfirmClick}
            display='inline'
            className='button-normal-black-600'
          />
        </div>
        <List.Template
          columns={columns}
          data={response?.data?.list ?? []}
          selectLabel='선택'
          selectionMode='multiple'
          emptyMessage='게시글이 없습니다.'
          rowKey='pstNo'
          selectedItems={listSelectedItems}
          onSelectionChange={onListSelectionChange}
        />
      </Box.Content>
    </AsyncBoundary>
  );
}
