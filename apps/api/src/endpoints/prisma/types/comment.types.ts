import type { Prisma } from '@prisma/client';

export type SelectCommentType = Prisma.CmntInfoGetPayload<{
  include: {
    post: {
      select: {
        pstNo: true;
      };
    };
    parentComment: true;
    replies: true;
    creator: {
      select: {
        userNo: true;
      };
    };
  };
}>;

export type SelectCommentListItemType = SelectCommentType & {
  totalCnt: number;
  rowNo: number;
};
