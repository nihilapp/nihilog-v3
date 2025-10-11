// 태그 관련 타입 정의 (기본 구조)

export interface TagInfoType {
  tagNo: number;
  tagNm: string;
  tagDesc?: string;
  useYn: 'Y' | 'N';
  delYn: 'Y' | 'N';
  crtNo?: number;
  crtDt: string;
  updtNo?: number;
  updtDt: string;
  delNo?: number;
  delDt?: string;
}

export interface PostTagMappingType {
  mappingNo: number;
  postNo: number;
  tagNo: number;
  crtDt: string;
}

export type SelectPostTagMappingType = PostTagMappingType;
export type SelectTagInfoType = TagInfoType;
export type SelectTagInfoListItemType = TagInfoType & {
  totalCnt: number;
  rowNo: number;
};

export type SelectPostTagMappingListItemType = PostTagMappingType & {
  totalCnt: number;
  rowNo: number;
};

// 통계 관련 타입들 (기본 구조)
export interface AnalyzeTagStatItemType {
  dateStart: string;
  dateEnd: string;
  tagCount: number;
  usageCount: number;
  subscriberCount: number;
}

export interface TopUsedTagItemType {
  tagNo: number;
  tagNm: string;
  usageCount: number;
}

export interface TagUsageTrendItemType {
  date: string;
  usageCount: number;
}

export interface UnusedTagItemType {
  tagNo: number;
  tagNm: string;
  lastUsedDate?: string;
}

export interface TopTagsBySubscriberItemType {
  tagNo: number;
  tagNm: string;
  subscriberCount: number;
}

export interface TagSubscriberGrowthRateItemType {
  dateStart: string;
  dateEnd: string;
  growthRate: number;
}

export interface TagWithoutSubscribersItemType {
  tagNo: number;
  tagNm: string;
  usageCount: number;
}

export interface TagUsageEfficiencyItemType {
  tagNo: number;
  tagNm: string;
  efficiency: number;
}

export interface TagAverageUsageFrequencyItemType {
  tagNo: number;
  tagNm: string;
  averageFrequency: number;
}

export interface TagLifecycleItemType {
  tagNo: number;
  tagNm: string;
  lifecycle: string;
}

export interface TagStatusDistributionItemType {
  status: string;
  count: number;
  ratio: number;
}

export interface TagCreatorStatItemType {
  userNo: number;
  userName: string;
  tagCount: number;
}

export interface TagCleanupRecommendationItemType {
  tagNo: number;
  tagNm: string;
  reason: string;
}
