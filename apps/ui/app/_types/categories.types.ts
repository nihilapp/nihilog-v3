import type { SelectCategoryListItemType, SelectCategoryType } from '@nihilog/schemas';

export type CategoryItem = {
  level: number;
  category: SelectCategoryType | SelectCategoryListItemType;
};
