// 카테고리 관련 타입 정의 (기본 구조)

export interface CategoryInfoType {
  ctgrNo: number;
  ctgrNm: string;
  ctgrDesc?: string;
  prntCtgrNo?: number;
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
  ctgrNo: number;
  ctgrNm: string;
  postCount: number;
  viewCount: number;
}

export interface TopCategoriesBySubscriberItemType {
  ctgrNo: number;
  ctgrNm: string;
  subscriberCount: number;
}

export interface AverageBookmarkPerCategoryItemType {
  ctgrNo: number;
  ctgrNm: string;
  averageBookmarks: number;
}

export interface AverageViewPerCategoryItemType {
  ctgrNo: number;
  ctgrNm: string;
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
  ctgrNo: number;
  ctgrNm: string;
  lastUsedDate?: string;
}

export interface CategorySubscriberGrowthRateItemType {
  dateStart: string;
  dateEnd: string;
  growthRate: number;
}

export interface CategoriesWithoutSubscribersItemType {
  ctgrNo: number;
  ctgrNm: string;
  postCount: number;
}
