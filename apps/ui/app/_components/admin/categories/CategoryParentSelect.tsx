'use client';

import type { SelectCategoryListItemType } from '@nihilog/schemas';
import { useEffect, useState } from 'react';

import { Input } from '@/_components/ui/input';

interface Props {
  categoryList: SelectCategoryListItemType[];
  value?: number | string;
  onChange: (value: number | undefined) => void;
  excludeCategoryNo?: number;
}

export function CategoryParentSelect({ categoryList, value, onChange, excludeCategoryNo, }: Props) {
  // 모든 카테고리를 평탄화하는 함수
  const flattenCategories = (categories: SelectCategoryListItemType[]): SelectCategoryListItemType[] => {
    const result: SelectCategoryListItemType[] = [];

    const traverse = (items: SelectCategoryListItemType[]) => {
      items.forEach((item) => {
        result.push(item);
        if (item.childCategories && item.childCategories.length > 0) {
          traverse(item.childCategories as SelectCategoryListItemType[]);
        }
      });
    };

    traverse(categories);
    return result;
  };

  // 필터링된 카테고리 목록
  const filteredCategories = (() => {
    if (!categoryList || categoryList.length === 0) {
      return [];
    }

    // 모든 카테고리를 평탄화
    const allCategories = flattenCategories(categoryList);

    // 필터링: 사용 중이고 삭제되지 않은 카테고리만
    // 정렬 기준: 레벨(오름차순) -> 정렬순(오름차순) -> 생성일(오름차순)
    const filteredList = allCategories
      .filter((c) => c.useYn === 'Y' && c.delYn === 'N')
      .sort((a, b) => {
        // 1. 레벨 기준: 0이 선순위, 높으면 후순위
        const levelA = a.ctgryLvl ?? 0;
        const levelB = b.ctgryLvl ?? 0;
        if (levelA !== levelB) {
          return levelA - levelB;
        }

        // 2. 정렬순서를 명시했을 경우 선순위
        const stpA = a.ctgryStp ?? 0;
        const stpB = b.ctgryStp ?? 0;
        if (stpA !== stpB) {
          return stpA - stpB;
        }

        // 3. 가장 마지막 기준이 생성일
        const dateA = a.crtDt ?? '';
        const dateB = b.crtDt ?? '';
        return dateA.localeCompare(dateB);
      });

    // 제외할 카테고리 ID들 계산
    const excludedIds = new Set<number>();
    if (excludeCategoryNo !== undefined) {
      // 현재 카테고리와 그 하위 카테고리들을 찾는 함수
      const getDescendantIds = (
        categories: SelectCategoryListItemType[],
        parentId: number,
        result: number[] = []
      ): number[] => {
        result.push(parentId);
        const children = categories.filter((c) => c.upCtgryNo === parentId);
        children.forEach((child) => {
          getDescendantIds(
            categories,
            child.ctgryNo,
            result
          );
        });
        return result;
      };

      const descendantIds = getDescendantIds(
        filteredList,
        excludeCategoryNo
      );
      descendantIds.forEach((id) => excludedIds.add(id));
    }

    // 제외할 카테고리들을 필터링
    return filteredList.filter((c) => !excludedIds.has(c.ctgryNo));
  })();

  // 각 레벨별 선택된 카테고리 번호 (최대 4개)
  const [
    selectedLevel0,
    setSelectedLevel0,
  ] = useState<number | null>(null);
  const [
    selectedLevel1,
    setSelectedLevel1,
  ] = useState<number | null>(null);
  const [
    selectedLevel2,
    setSelectedLevel2,
  ] = useState<number | null>(null);
  const [
    selectedLevel3,
    setSelectedLevel3,
  ] = useState<number | null>(null);

  // value가 변경되면 각 레벨의 state를 업데이트
  useEffect(
    () => {
      if (value === undefined || value === '') {
        setSelectedLevel0(null);
        setSelectedLevel1(null);
        setSelectedLevel2(null);
        setSelectedLevel3(null);
        return;
      }

      const targetCtgryNo = typeof value === 'number'
        ? value
        : Number(value);

      // 선택된 카테고리부터 부모까지 경로를 역으로 구성
      const path: number[] = [];
      let current: SelectCategoryListItemType | undefined = filteredCategories.find((c) => c.ctgryNo === targetCtgryNo);

      while (current) {
        path.unshift(current.ctgryNo);
        if (current.upCtgryNo) {
          current = filteredCategories.find((c) => c.ctgryNo === current!.upCtgryNo);
        }
        else {
          break;
        }
      }

      // 경로를 각 레벨 state에 할당
      setSelectedLevel0(path[0] ?? null);
      setSelectedLevel1(path[1] ?? null);
      setSelectedLevel2(path[2] ?? null);
      setSelectedLevel3(path[3] ?? null);
    },
    [
      value,
      filteredCategories,
    ]
  );

  // 특정 부모의 자식 카테고리들 가져오기
  const getChildren = (parentCtgryNo: number | null) => {
    return filteredCategories.filter((cat) => {
      if (parentCtgryNo === null) {
        // 최상위 카테고리: upCtgryNo가 null이고 ctgryLvl이 0
        return !cat.upCtgryNo && (cat.ctgryLvl ?? 0) === 0;
      }
      return cat.upCtgryNo === parentCtgryNo;
    });
  };

  // 레벨 0: 최상위 카테고리 (ctgryLvl === 0)
  const level0Children = getChildren(null);
  const showLevel0 = true; // 항상 표시

  // 레벨 1: selectedLevel0의 자식들
  const level1Children = selectedLevel0 === null
    ? []
    : getChildren(selectedLevel0);
  const showLevel1 = selectedLevel0 !== null && level1Children.length > 0;

  // 레벨 2: selectedLevel1의 자식들
  const level2Children = selectedLevel1 === null
    ? []
    : getChildren(selectedLevel1);
  const showLevel2 = selectedLevel1 !== null && level2Children.length > 0;

  // 레벨 3: selectedLevel2의 자식들
  const level3Children = selectedLevel2 === null
    ? []
    : getChildren(selectedLevel2);
  const showLevel3 = selectedLevel2 !== null && level3Children.length > 0;

  return (
    <div
      className='flex flex-col gap-2'
      onMouseDown={(e) => {
        // label 클릭 시 포커스 이동 방지
        e.preventDefault();
      }}
      onClick={(e) => {
        // label 클릭 시 포커스 이동 방지
        e.stopPropagation();
      }}
    >
      {/* 레벨 0 셀렉트 */}
      {showLevel0 && (
        <Input.SelectContainer
          className='w-full'
          value={selectedLevel0?.toString() ?? ''}
          onValueChange={(newValue) => {
            const newSelected = newValue === ''
              ? null
              : Number(newValue);
            setSelectedLevel0(newSelected);
            setSelectedLevel1(null);
            setSelectedLevel2(null);
            setSelectedLevel3(null);

            // 최종 선택된 카테고리 번호를 onChange로 전달
            // setTimeout을 사용하여 포커스 이동 방지
            setTimeout(
              () => {
                onChange(newSelected ?? undefined);
              },
              0
            );
          }}
        >
          <Input.Selection
            placeholder='상위 카테고리를 선택하세요 (선택사항)'
            displayValue={(displayValue) => {
              if (!displayValue) {
                return '';
              }
              const selected = level0Children.find((cat) => cat.ctgryNo.toString() === displayValue);
              return selected
                ? selected.ctgryNm
                : displayValue;
            }}
          />
          <Input.Select>
            <Input.SelectItem value=''>
              (없음 - 최상위 카테고리)
            </Input.SelectItem>
            {level0Children.map((cat) => (
              <Input.SelectItem
                key={cat.ctgryNo}
                value={cat.ctgryNo.toString()}
              >
                {cat.ctgryNm}
              </Input.SelectItem>
            ))}
          </Input.Select>
        </Input.SelectContainer>
      )}

      {/* 레벨 1 셀렉트 */}
      {showLevel1 && (
        <Input.SelectContainer
          className='w-full'
          value={selectedLevel1?.toString() ?? ''}
          onValueChange={(newValue) => {
            const newSelected = newValue === ''
              ? null
              : Number(newValue);
            setSelectedLevel1(newSelected);
            setSelectedLevel2(null);
            setSelectedLevel3(null);

            // 최종 선택된 카테고리 번호를 onChange로 전달
            // setTimeout을 사용하여 포커스 이동 방지
            setTimeout(
              () => {
                onChange(newSelected ?? undefined);
              },
              0
            );
          }}
        >
          <Input.Selection
            placeholder='하위 카테고리를 선택하세요 (선택사항)'
            displayValue={(displayValue) => {
              if (!displayValue) {
                return '';
              }
              const selected = level1Children.find((cat) => cat.ctgryNo.toString() === displayValue);
              return selected
                ? selected.ctgryNm
                : displayValue;
            }}
          />
          <Input.Select>
            {level1Children.map((cat) => (
              <Input.SelectItem
                key={cat.ctgryNo}
                value={cat.ctgryNo.toString()}
              >
                {cat.ctgryNm}
              </Input.SelectItem>
            ))}
          </Input.Select>
        </Input.SelectContainer>
      )}

      {/* 레벨 2 셀렉트 */}
      {showLevel2 && (
        <Input.SelectContainer
          className='w-full'
          value={selectedLevel2?.toString() ?? ''}
          onValueChange={(newValue) => {
            const newSelected = newValue === ''
              ? null
              : Number(newValue);
            setSelectedLevel2(newSelected);
            setSelectedLevel3(null);

            // 최종 선택된 카테고리 번호를 onChange로 전달
            // setTimeout을 사용하여 포커스 이동 방지
            setTimeout(
              () => {
                onChange(newSelected ?? undefined);
              },
              0
            );
          }}
        >
          <Input.Selection
            placeholder='하위 카테고리를 선택하세요 (선택사항)'
            displayValue={(displayValue) => {
              if (!displayValue) {
                return '';
              }
              const selected = level2Children.find((cat) => cat.ctgryNo.toString() === displayValue);
              return selected
                ? selected.ctgryNm
                : displayValue;
            }}
          />
          <Input.Select>
            {level2Children.map((cat) => (
              <Input.SelectItem
                key={cat.ctgryNo}
                value={cat.ctgryNo.toString()}
              >
                {cat.ctgryNm}
              </Input.SelectItem>
            ))}
          </Input.Select>
        </Input.SelectContainer>
      )}

      {/* 레벨 3 셀렉트 */}
      {showLevel3 && (
        <Input.SelectContainer
          className='w-full'
          value={selectedLevel3?.toString() ?? ''}
          onValueChange={(newValue) => {
            const newSelected = newValue === ''
              ? null
              : Number(newValue);
            setSelectedLevel3(newSelected);

            // 최종 선택된 카테고리 번호를 onChange로 전달
            // setTimeout을 사용하여 포커스 이동 방지
            setTimeout(
              () => {
                onChange(newSelected ?? undefined);
              },
              0
            );
          }}
        >
          <Input.Selection
            placeholder='하위 카테고리를 선택하세요 (선택사항)'
            displayValue={(displayValue) => {
              if (!displayValue) {
                return '';
              }
              const selected = level3Children.find((cat) => cat.ctgryNo.toString() === displayValue);
              return selected
                ? selected.ctgryNm
                : displayValue;
            }}
          />
          <Input.Select>
            {level3Children.map((cat) => (
              <Input.SelectItem
                key={cat.ctgryNo}
                value={cat.ctgryNo.toString()}
              >
                {cat.ctgryNm}
              </Input.SelectItem>
            ))}
          </Input.Select>
        </Input.SelectContainer>
      )}
    </div>
  );
}
