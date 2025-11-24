'use client';

import type { SelectCategoryListItemType } from '@nihilog/schemas';

import { Input } from '@/_components/ui/input';
import { useAdminGetCategoryList } from '@/_hooks/admin/categories';

interface Props {
  value?: number;
  onChange?: (value: number | undefined) => void;
}

interface CategoryItem {
  category: SelectCategoryListItemType;
  level: number;
}

export function PostCategorySelect({ value, onChange, }: Props) {
  const { response: categoryResponse, } = useAdminGetCategoryList({});

  // 계층 구조를 유지한 카테고리 목록
  const hierarchicalCategories = (() => {
    if (!categoryResponse?.data?.list) {
      return [];
    }

    // 카테고리를 정렬하는 함수
    const sortCategories = (categories: SelectCategoryListItemType[]): SelectCategoryListItemType[] => {
      return [ ...categories, ].sort((a, b) => {
        // 1. 정렬순서를 명시했을 경우 선순위
        const stpA = a.ctgryStp ?? 0;
        const stpB = b.ctgryStp ?? 0;
        if (stpA !== stpB) {
          return stpA - stpB;
        }

        // 2. 가장 마지막 기준이 생성일
        const dateA = a.crtDt ?? '';
        const dateB = b.crtDt ?? '';
        return dateA.localeCompare(dateB);
      });
    };

    // 계층 구조를 유지하면서 카테고리를 순회하여 평탄화하는 함수
    const buildHierarchicalList = (
      categories: SelectCategoryListItemType[],
      level: number = 0
    ): CategoryItem[] => {
      const result: CategoryItem[] = [];

      // 레벨이 3을 초과하면 더 이상 재귀하지 않음
      if (level > 3) {
        return result;
      }

      // 사용 중이고 삭제되지 않은 카테고리만 필터링
      const filteredCategories = categories.filter((c) => c.useYn === 'Y' && c.delYn === 'N');

      // 정렬된 카테고리 순회
      const sortedCategories = sortCategories(filteredCategories);

      sortedCategories.forEach((category) => {
        // 부모 카테고리를 먼저 추가
        result.push({
          category,
          level,
        });

        // 자식 카테고리가 있고 레벨이 3 미만이면 재귀적으로 추가
        if (category.childCategories && category.childCategories.length > 0 && level < 3) {
          const childItems = buildHierarchicalList(
            category.childCategories as SelectCategoryListItemType[],
            level + 1
          );
          result.push(...childItems);
        }
      });

      return result;
    };

    return buildHierarchicalList(categoryResponse.data.list);
  })();

  // 선택된 카테고리 이름 찾기
  const getCategoryName = (ctgryNo: number | undefined): string => {
    if (!ctgryNo) {
      return '';
    }
    const categoryItem = hierarchicalCategories.find((item) => item.category.ctgryNo === ctgryNo);
    return categoryItem?.category.ctgryNm ?? '';
  };

  return (
    <Input.SelectContainer
      value={value?.toString() ?? ''}
      onValueChange={(selectedValue) => {
        onChange?.(selectedValue === ''
          ? undefined
          : Number(selectedValue));
      }}
    >
      <Input.Selection
        placeholder='카테고리를 선택하세요'
        displayValue={(selectedValue) => {
          const ctgryNo = Number(selectedValue);
          return getCategoryName(ctgryNo) || selectedValue;
        }}
      />
      <Input.Select>
        {hierarchicalCategories.map((item) => {
          // 레벨에 따른 className 결정
          const getLevelClassName = (level: number): string => {
            if (level === 0) {
              return 'px-3 py-2';
            }
            if (level === 1) {
              return 'px-3 py-2 pl-5';
            }
            if (level === 2) {
              return 'px-3 py-2 pl-7';
            }
            if (level === 3) {
              return 'px-3 py-2 pl-9';
            }
            return 'px-3 py-2';
          };

          return (
            <Input.SelectItem
              key={item.category.ctgryNo}
              value={item.category.ctgryNo.toString()}
              className={getLevelClassName(item.level)}
            >
              {item.category.ctgryNm}
            </Input.SelectItem>
          );
        })}
      </Input.Select>
    </Input.SelectContainer>
  );
}
