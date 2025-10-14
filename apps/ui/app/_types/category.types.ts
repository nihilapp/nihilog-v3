// 카테고리 관련 타입 정의 (기본 구조)

export interface CategoryInfoType {
  ctgryNo: number;
  ctgryNm: string;
  ctgryExpln?: string;
  ctgryColr?: string;
  ctgryStp: number;
  upCtgryNo: number;
  useYn: 'Y' | 'N';
  delYn: 'Y' | 'N';
  crtNo?: number;
  crtDt: string;
  updtNo?: number;
  updtDt: string;
  delNo?: number;
  delDt?: string;
}

export type SelectCategoryType = CategoryInfoType;
export type SelectCategoryListItemType = CategoryInfoType & {
  totalCnt: number;
  rowNo: number;
};

// 통계 관련 타입들 (기본 구조)
export interface AnalyzeCategoryStatItemType {
  dateStart: string;
  dateEnd: string;
  categoryCount: number;
  postCount: number;
  subscriberCount: number;
}

export interface TopPopularCategoryItemType {
  ctgryNo: number;
  ctgryNm: string;
  postCount: number;
  viewCount: number;
}

export interface TopCategoriesBySubscriberItemType {
  ctgryNo: number;
  ctgryNm: string;
  subscriberCount: number;
}

export interface AverageBookmarkPerCategoryItemType {
  ctgryNo: number;
  ctgryNm: string;
  averageBookmarks: number;
}

export interface AverageViewPerCategoryItemType {
  ctgryNo: number;
  ctgryNm: string;
  averageViews: number;
}

export interface CategoryHierarchyDistributionItemType {
  level: number;
  count: number;
  ratio: number;
}

export interface CategoryHierarchyPostDistributionItemType {
  level: number;
  postCount: number;
  ratio: number;
}

export interface CategoryHierarchySubscriberDistributionItemType {
  level: number;
  subscriberCount: number;
  ratio: number;
}

export interface CategoryStatusDistributionItemType {
  status: string;
  count: number;
  ratio: number;
}

export interface CategoryCreatorStatItemType {
  userNo: number;
  userName: string;
  categoryCount: number;
}

export interface UnusedCategoryItemType {
  ctgryNo: number;
  ctgryNm: string;
  lastUsedDate?: string;
}

export interface CategorySubscriberGrowthRateItemType {
  dateStart: string;
  dateEnd: string;
  growthRate: number;
}

export interface CategoriesWithoutSubscribersItemType {
  ctgryNo: number;
  ctgryNm: string;
  postCount: number;
}
