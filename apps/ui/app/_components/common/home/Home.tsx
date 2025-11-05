'use client';

import { DateTime } from 'luxon';

import { AsyncBoundary } from '@/_components/common/AsyncBoundary';
import { Button } from '@/_components/common/Button';
import { Box } from '@/_components/ui/box';
import { Table } from '@/_components/ui/table';
import { useGetPostList } from '@/_entities/posts/hooks';
import { defineColumns } from '@/_libs/defineColumns';
import type { SelectCategoryType, SelectPostListItemType } from '@/_types';

interface Props {
  className?: string;
}

export function Home({}: Props) {
  const { response, loading, done, } = useGetPostList({
    endRow: 10,
    orderBy: 'LATEST',
    // 릴리즈 Y인 데이터를 가져오는데 최초 등록 상태인 데이터가 Y로 나옴.
    rlsYn: 'Y',
  });

  const column = defineColumns<SelectPostListItemType>();

  const columns = [
    column({
      key: 'rowNo',
      label: 'No.',
      thAlign: 'center',
      tdAlign: 'center',
      className: 'w-[60px]',
      render: (_row, value, _index) => {
        return value as number;
      },
    }),
    column({
      key: 'pstTtl',
      label: '제목',
      thAlign: 'center',
      tdAlign: 'justify',
      render: (row, value, _index) => {
        const title = value as string;

        return (
          <Button
            mode='ghost'
            type='link'
            href={`/posts/${row.pstNo}`}
            size='block'
            label={title}
          />
        );
      },
    }),
    column({
      key: 'category',
      label: '카테고리',
      thAlign: 'center',
      tdAlign: 'center',
      className: 'w-[10%]',
      render: (_row, value, _index) => {
        const categoryNm = (value as SelectCategoryType)?.ctgryNm;

        return (
          <Button mode='outline' color='black' size='block' label={categoryNm || '미분류'} />
        );
      },
    }),
    column({
      key: 'publDt',
      label: '발행일',
      thAlign: 'center',
      tdAlign: 'center',
      className: 'w-[25%]',
      render: (_row, value, _index) => {
        const publishedDate = DateTime.fromISO(value as string).toFormat('yyyy년 MM월 dd일 HH:mm:ss');

        return publishedDate;
      },
    }),
  ];

  return (
    <AsyncBoundary
      loading={loading}
      done={done}
    >
      <Box.Top
        title='최근 10개 게시글'
      />
      <Box.Content>
        <Table.Template
          columns={columns}
          data={response?.data?.list ?? []}
          emptyMessage='게시글이 없습니다.'
        />
      </Box.Content>
    </AsyncBoundary>
  );
}
