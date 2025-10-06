import type { Prisma } from '@prisma/client';

export type CategoryInfoType = Prisma.CtgryInfoGetPayload<Record<string, never>>;

export type SelectCategoryType = Prisma.CtgryInfoGetPayload<{
  include: {
    parentCategory: true;
    childCategories: true;
  };
}>;

export type SelectCategoryListItemType = SelectCategoryType & {
  totalCnt: number;
  rowNo: number;
};
