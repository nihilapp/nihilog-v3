'use client';

import type { SelectCategoryListItemType, SelectCategoryType } from '@nihilog/schemas';
import { useMutation } from '@tanstack/react-query';
import { cva, type VariantProps } from 'class-variance-authority';
import { useState } from 'react';

import { AddChildCategoryForm } from '@/_components/admin/categories/AddChildCategoryForm';
import { CategoryItem } from '@/_components/admin/categories/CategoryItem';
import { NewCategoryForm } from '@/_components/admin/categories/NewCategoryForm';
import { UpdateCategoryForm } from '@/_components/admin/categories/UpdateCategoryForm';
import { Loading } from '@/_components/common/Loading';
import { Box } from '@/_components/ui/box';
import { Button } from '@/_components/ui/button';
import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import { useAdminGetCategoryList } from '@/_entities/admin/categories/hooks';
import { useAlert } from '@/_entities/common/hooks/use-alert';
import { Api } from '@/_libs';
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

export function AdminCategoryList({ }: Props) {
  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);
  const [
    updateModalOpen,
    setUpdateModalOpen,
  ] = useState(false);
  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<SelectCategoryListItemType | null>(null);
  const [
    addChildModalOpen,
    setAddChildModalOpen,
  ] = useState(false);
  const [
    parentCategoryNo,
    setParentCategoryNo,
  ] = useState<number | null>(null);
  const [
    expandedCategories,
    setExpandedCategories,
  ] = useState<Set<number>>(new Set());

  // 전체 카테고리 목록을 가져와서 계층 구조 구성
  const { response, loading, done, refetch, } = useAdminGetCategoryList({});
  const invalidateCache = useInvalidateAdminCategoriesCache();
  const { triggerConfirm, } = useAlert();

  const deleteCategoryMutation = useMutation({
    mutationFn: async (ctgryNo: number) => {
      return await Api.deleteQuery<boolean>(`admin/categories/${ctgryNo}`);
    },
    onSuccess() {
      invalidateCache();
      refetch();
    },
  });

  const onOpenModal = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  const onOpenUpdateModal = (category: SelectCategoryType) => {
    // SelectCategoryType을 SelectCategoryListItemType으로 변환
    // totalCnt와 rowNo는 기본값으로 설정
    const categoryWithListInfo: SelectCategoryListItemType = {
      ...category,
      totalCnt: 0,
      rowNo: 0,
    };
    setSelectedCategory(categoryWithListInfo);
    setUpdateModalOpen(true);
  };

  const onCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedCategory(null);
  };

  const onOpenAddChildModal = (category: SelectCategoryType) => {
    setParentCategoryNo(category.ctgryNo);
    setAddChildModalOpen(true);
  };

  const onCloseAddChildModal = () => {
    setAddChildModalOpen(false);
    setParentCategoryNo(null);
  };

  const onDeleteCategory = (category: SelectCategoryType) => {
    triggerConfirm(
      `카테고리 "${category.ctgryNm}"을(를) 삭제하시겠습니까?`,
      () => {
        deleteCategoryMutation.mutate(category.ctgryNo);
      }
    );
  };

  const onToggleCategoryExpand = (ctgryNo: number) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ctgryNo)) {
        newSet.delete(ctgryNo);
      }
      else {
        newSet.add(ctgryNo);
      }
      return newSet;
    });
  };

  const isCategoryExpanded = (ctgryNo: number) => {
    return expandedCategories.has(ctgryNo);
  };

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
        {done && response && (
          <div className='flex flex-col gap-2'>
            {response.data.list.map((category) => (
              <CategoryItem
                key={category.ctgryNo}
                item={{
                  level: category.ctgryLvl ?? 0,
                  category,
                }}
                onEdit={onOpenUpdateModal}
                onDelete={onDeleteCategory}
                onAddChild={onOpenAddChildModal}
                isExpanded={isCategoryExpanded(category.ctgryNo)}
                onToggleExpand={onToggleCategoryExpand}
                isCategoryExpanded={isCategoryExpanded}
              />
            ))}
          </div>
        )}
      </Box.Content>

      {response && (
        <NewCategoryForm
          open={modalOpen}
          onClose={onCloseModal}
          categoryList={response.data.list}
        />
      )}

      {selectedCategory && response && (
        <UpdateCategoryForm
          open={updateModalOpen}
          onClose={onCloseUpdateModal}
          category={selectedCategory}
          categoryList={response.data.list}
        />
      )}

      {parentCategoryNo !== null && response && (
        <AddChildCategoryForm
          open={addChildModalOpen}
          onClose={onCloseAddChildModal}
          parentCtgryNo={parentCategoryNo}
          categoryList={response.data.list}
        />
      )}
    </Box.Panel>
  );
}
