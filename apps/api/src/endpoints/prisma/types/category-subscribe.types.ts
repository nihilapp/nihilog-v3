import type { Prisma } from '@prisma/client';

// 단일 카테고리 구독 조회 (category 정보 포함)
export type SelectCtgrySbcrMpngType = Prisma.CtgrySbcrMpngGetPayload<{
  include: {
    category: {
      select: {
        ctgryNm: true;
      };
    };
  };
}>;

// 목록 조회 항목 (페이징 정보 포함)
export type SelectCtgrySbcrMpngListItemType = SelectCtgrySbcrMpngType & {
  totalCnt: number;
  rowNo: number;
};
