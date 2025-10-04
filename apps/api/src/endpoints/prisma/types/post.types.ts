import type { PstInfo } from '~prisma/client';

// 단일 게시글 조회
export type SelectPostInfoType = PstInfo;

// 목록 조회 항목 (페이징 정보 포함)
export type SelectPostInfoListItemType = SelectPostInfoType & {
  totalCnt: number;
  rowNo: number;
};
