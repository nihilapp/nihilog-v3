import type { PstBkmrkMpng } from '@prisma/client';

export type SelectPostBookmarkType = PstBkmrkMpng;

export type SelectPostBookmarkListItemType = PstBkmrkMpng & {
  totalCnt: number;
  rowNo: number;
};
