import type { UserInfo } from '@prisma/client';

// 단일 사용자 조회
export type SelectUserInfoType = UserInfo;

// 목록 조회 항목 (페이징 정보 포함)
export type SelectUserInfoListItemType = UserInfo & {
  totalCnt: number;
  rowNo: number;
};
