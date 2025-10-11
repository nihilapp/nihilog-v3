// 태그 구독 관련 타입 정의 (기본 구조)

export interface TagSubscribeMappingType {
  mappingNo: number;
  userNo: number;
  tagNo: number;
  useYn: 'Y' | 'N';
  delYn: 'Y' | 'N';
  crtNo?: number;
  crtDt: string;
  updtNo?: number;
  updtDt: string;
  delNo?: number;
  delDt?: string;
}

export type SelectTagSubscribeMappingType = TagSubscribeMappingType;
export type SelectTagSubscribeMappingListItemType = TagSubscribeMappingType & {
  totalCnt: number;
  rowNo: number;
};
