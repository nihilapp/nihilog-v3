import type { Prisma } from '@prisma/client';

// 단일 구독 정보 조회
export type SelectUserSbcrInfoType = Prisma.UserSbcrInfoGetPayload<{
  include: {
    user: {
      select: {
        userNm: true;
        emlAddr: true;
      };
    };
  };
}>;

// 목록 조회 항목 (페이징 정보 포함)
export type SelectUserSbcrInfoListItemType = SelectUserSbcrInfoType & {
  totalCnt: number;
  rowNo: number;
};
