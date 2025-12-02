'use client';

import type { SelectCategoryType } from '@nihilog/schemas';
import { cva, type VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import { MdFolder, MdEdit, MdFolderOpen, MdDelete, MdAdd } from 'react-icons/md';

import { Button } from '@/_components/ui/button';
import { cn } from '@/_libs';
import type { CategoryItem } from '@/_types';
import type { ReactElementProps } from '@/_types/common.types';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends ReactElementProps<'div'>, VariantProps<typeof cssVariants> {
  item: CategoryItem;
  onEdit?: (category: SelectCategoryType) => void;
  onDelete?: (category: SelectCategoryType) => void;
  onAddChild?: (category: SelectCategoryType) => void;
  isExpanded?: boolean;
  onToggleExpand?: (ctgryNo: number) => void;
  isCategoryExpanded?: (ctgryNo: number) => boolean;
  className?: string | string[];
  custom?: {
    div?: string | string[];
  };
}

const cssVariants = cva(
  [ 'border-2 border-black-300 rounded-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CategoryItem({ item, onEdit, onDelete, onAddChild, isExpanded: controlledIsExpanded, onToggleExpand: controlledOnToggleExpand, isCategoryExpanded, className, ...props }: Props) {
  const { category, } = item;
  // DB의 ctgryLvl을 우선 사용, 없으면 item.level 사용 (하위 호환성)
  const level = category.ctgryLvl ?? item.level ?? 0;
  const [
    localIsExpanded,
    setLocalIsExpanded,
  ] = useState(false);

  // controlled 모드 (부모에서 상태 관리) 또는 uncontrolled 모드 (로컬 상태 관리)
  const isExpanded = controlledIsExpanded !== undefined
    ? controlledIsExpanded
    : localIsExpanded;

  const onToggleExpand = controlledOnToggleExpand
    ? () => controlledOnToggleExpand(category.ctgryNo)
    : () => {
      setLocalIsExpanded((prev) => !prev);
    };

  return (
    <>
      <div
        className={cn(
          cssVariants({}),
          className
        )}
        {...props}
      >
        <div className='p-2 flex flex-row items-center justify-between gap-2 select-none'>
          <div className='flex flex-row items-center gap-2'>
            {category.childCategories && category.childCategories.length > 0
              ? (
                <span
                  className='button-base p-1 rounded-2 button-ghost-black-900 bg-black-200! hover:bg-black-300! cursor-pointer'
                  onClick={onToggleExpand}
                  title={isExpanded
                    ? '접기'
                    : '펼치기'}
                >
                  {isExpanded
                    ? <MdFolderOpen className='size-5' />
                    : <MdFolder className='size-5' />}
                </span>
              )
              : (
                <span className='p-1'>
                  <MdFolder className='size-5' />
                </span>
              )}
            <span>{category.ctgryNm} ({category.childCategories?.length ?? 0})</span>
          </div>
          <div className='text-black-500 text-xs text-left flex-1'>
            {category.ctgryExpln}
          </div>
          <div className='flex flex-row items-center gap-1'>
            {onAddChild && (() => {
              const onAddChildClick = () => {
                onAddChild(category);
              };

              return (
                <Button.Action
                  icon={<MdAdd className='size-5' />}
                  label='하위 카테고리 추가'
                  onClick={onAddChildClick}
                  className='hover:button-normal-black-900'
                />
              );
            })()}
            {onEdit && (() => {
              const onEditClick = () => {
                onEdit(category);
              };

              return (
                <Button.Action
                  icon={<MdEdit className='size-5' />}
                  label='수정'
                  onClick={onEditClick}
                  className='hover:button-normal-black-900'
                />
              );
            })()}
            {onDelete && (() => {
              const onDeleteClick = () => {
                onDelete(category);
              };

              return (
                <Button.Action
                  icon={<MdDelete className='size-5' />}
                  label='삭제'
                  onClick={onDeleteClick}
                  className='button-normal-red-500 hover:button-normal-red-600'
                />
              );
            })()}
          </div>
        </div>
      </div>
      {isExpanded && category.childCategories && category.childCategories.length > 0 && level < 3 && (
        <div className='ml-5 flex flex-col gap-2'>
          {category.childCategories.map((childCategory) => {
            const childLevel = (childCategory as SelectCategoryType).ctgryLvl ?? level + 1;
            // 레벨이 3을 초과하면 렌더링하지 않음
            if (childLevel > 3) {
              return null;
            }
            return (
              <CategoryItem
                key={childCategory.ctgryNo}
                item={{
                  level: childLevel,
                  category: childCategory as SelectCategoryType,
                }}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddChild={onAddChild}
                isExpanded={isCategoryExpanded
                  ? isCategoryExpanded(childCategory.ctgryNo)
                  : undefined}
                onToggleExpand={controlledOnToggleExpand}
                isCategoryExpanded={isCategoryExpanded}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
