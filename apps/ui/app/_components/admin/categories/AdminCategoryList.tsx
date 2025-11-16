'use client';

import type { SelectCategoryListItemType } from '@nihilog/schemas';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { NewCategoryForm } from '@/_components/admin/categories/NewCategoryForm';
import { Loading } from '@/_components/common/Loading';
import { Box } from '@/_components/ui/box';
import { Button } from '@/_components/ui/button';
import { useAdminGetCategoryList } from '@/_entities/admin/categories/hooks';
import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends ReactElementProps<'div'>, VariantProps<typeof _cssVariants> {
  className?: string | string[];
  custom?: {
    div?: string | string[];
  };
}

const _cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const categoryItemVariants = cva(
  [
    'flex flex-row items-center gap-2 p-2 rounded-4',
    'hover:bg-gray-100 dark:hover:bg-gray-800',
    'transition-colors',
  ],
  {
    variants: {
      level: {
        0: [ 'pl-2', ],
        1: [ 'pl-8', ],
        2: [ 'pl-14', ],
      },
    },
    defaultVariants: {
      level: 0,
    },
  }
);

interface CategoryItemProps {
  category: SelectCategoryListItemType;
  level: number;
}

function CategoryItem({ category, level, }: CategoryItemProps) {
  const hasChildren = category.childCategories && category.childCategories.length > 0;

  return (
    <>
      <div
        className={cn(categoryItemVariants({
          level: level as 0 | 1 | 2,
        }))}
      >
        <Link
          href={`/admin/dashboard/categories/${category.ctgryNo}`}
          className='flex-1 text-left'
        >
          <span className='font-medium'>{category.ctgryNm}</span>
        </Link>
        {hasChildren && (
          <span className='text-sm text-gray-500'>
            ({category.childCategories?.length})
          </span>
        )}
      </div>
      {hasChildren && category.childCategories?.map((child) => (
        <CategoryItem
          key={child.ctgryNo}
          category={child as SelectCategoryListItemType}
          level={level + 1}
        />
      ))}
    </>
  );
}

export function AdminCategoryList({ }: Props) {
  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  const { response, loading, done, } = useAdminGetCategoryList({});

  const rootCategories = useMemo(
    () => {
      if (!response?.data?.list) return [];

      return response.data.list.filter((category) => category.upCtgryNo === null);
    },
    [ response, ]
  );

  const onOpenModal = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  // TODO: 카테고리 리스트 구조 개선 필요.

  return (
    <Box.Panel panel={false}>
      <Box.Top title='카테고리 목록'>
        <Box.Action>
          <Button.Action
            label='카테고리 추가'
            onClick={onOpenModal}
          />
        </Box.Action>
      </Box.Top>
      <Box.Content>
        {loading && (
          <Loading message='카테고리 목록을 불러오는 중...' />
        )}
        {done && (
          <div className='flex flex-col gap-1'>
            {rootCategories.length === 0
              ? (
                <div className='p-4 text-center text-gray-500'>
                  카테고리가 없습니다.
                </div>
              )
              : (
                rootCategories.map((category) => (
                  <CategoryItem
                    key={category.ctgryNo}
                    category={category}
                    level={0}
                  />
                ))
              )}
          </div>
        )}
      </Box.Content>

      <NewCategoryForm
        open={modalOpen}
        onClose={onCloseModal}
      />
    </Box.Panel>
  );
}
