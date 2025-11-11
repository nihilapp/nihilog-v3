'use client';

import type { SelectCategoryType, SelectPostListItemType } from '@nihilog/schemas';
import { cva, type VariantProps } from 'class-variance-authority';
import { DateTime } from 'luxon';
import { useState } from 'react';

import { Box } from '@/_components/ui/box';
import { Button } from '@/_components/ui/button';
import { List } from '@/_components/ui/list';
import { cn } from '@/_libs';
import { defineColumns } from '@/_libs/defineColumns';
import type { ReactElementProps } from '@/_types/common.types';

interface Props
  extends ReactElementProps<'div'>,
  VariantProps<typeof cssVariants> {
  className?: string | string[];
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AdminPostList({ className, ...props }: Props) {
  const [
    selectedItems,
    setSelectedItems,
  ] = useState<Set<string>>(new Set());

  const onListSelectionChange = (selectedItems: Set<string> | string[]) => {
    setSelectedItems(selectedItems as Set<string>);
  };

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
          <Button.Link
            mode='ghost'
            color='blue'
            href={`/posts/${row.pstCd}`}
            size='block'
            label={title}
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
            mode='outline'
            color='black'
            size='block'
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

  return (
    <Box.Panel panel={false}>
      <Box.Top title='포스트 목록'>
        <Box.Action></Box.Action>
      </Box.Top>

      <Box.Content>
        <List.Template
          columns={columns}
          data={[]}
          rowKey='pstNo'
          selectLabel='선택'
          selectionMode='multiple'
          emptyMessage='게시글이 없습니다.'
          selectedItems={selectedItems}
          onSelectionChange={onListSelectionChange}
        />
      </Box.Content>
    </Box.Panel>
  );
}
