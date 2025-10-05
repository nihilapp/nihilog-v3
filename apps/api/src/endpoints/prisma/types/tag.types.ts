import type { PstTagMpng, TagInfo } from '@prisma/client';

export type SelectTagInfoType = TagInfo;

export type SelectTagInfoListItemType = SelectTagInfoType & {
  rowNo: number;
  totalCnt: number;
};

export type SelectPstTagMpngType = PstTagMpng;

export type SelectPstTagMpngListItemType = SelectPstTagMpngType & {
  rowNo: number;
  totalCnt: number;
};
