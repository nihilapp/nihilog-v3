// 카테고리 구독 관련 타입 정의 (기본 구조)

export interface CategorySubscribeMappingType {
  ctgrySbcrNo: number;
  sbcrNo: number;
  ctgryNo: number;
  useYn: 'Y' | 'N';
  delYn: 'Y' | 'N';
  crtNo?: number;
  crtDt: string;
  updtNo?: number;
  updtDt: string;
  delNo?: number;
  delDt?: string;
}

export type SelectCategorySubscribeMappingType = CategorySubscribeMappingType;
export type SelectCategorySubscribeMappingListItemType = CategorySubscribeMappingType & {
  totalCnt: number;
  rowNo: number;
};
