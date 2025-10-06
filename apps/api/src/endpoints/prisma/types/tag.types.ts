import type { Prisma, TagInfo } from '@prisma/client';

export type SelectTagInfoType = TagInfo;

export type SelectTagInfoListItemType = SelectTagInfoType & {
  rowNo: number;
  totalCnt: number;
};

export type SelectPstTagMpngType = Prisma.PstTagMpngGetPayload<{
  include: {
    tag: {
      select: {
        tagNm: true;
      };
    };
  };
}>;

export type SelectPstTagMpngListItemType = SelectPstTagMpngType & {
  rowNo: number;
  totalCnt: number;
};
