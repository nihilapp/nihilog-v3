import type { Prisma } from '@nihilog/db';

/**
 * @description 단일 태그 구독 조회 (tag 정보 포함)
 */
export type SelectTagSbcrMpngType = Prisma.TagSbcrMpngGetPayload<{
  include: {
    tag: {
      select: {
        tagNm: true;
      };
    };
  };
}>;

/**
 * @description 목록 조회 항목 (페이징 정보 포함)
 */
export type SelectTagSbcrMpngListItemType = SelectTagSbcrMpngType & {
  totalCnt: number;
  rowNo: number;
};
