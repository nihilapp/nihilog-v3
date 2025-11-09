import type { Prisma, TagInfo } from '@nihilog/db';

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

// 태그 통계 관련 타입

/**
 * @description 태그 분석 통계 (시간대별 합산) - 9개 지표 통합
 * - tagNo 없으면 전체, 있으면 해당 태그만
 */
export type AnalyzeTagStatItemType = {
  dateStart: string;
  dateEnd: string;
  // 태그 생성/삭제 통계
  newTagCount: number; // 신규 태그 생성 수
  deleteTagCount: number; // 태그 삭제 수
  activeTagCount: number; // 활성 태그 수
  // 태그 사용 통계
  tagMappingCount: number; // 태그 매핑 수
  tagMappingDeleteCount: number; // 태그 매핑 삭제 수
  activeTagMappingCount: number; // 활성 태그 매핑 수
  // 태그 구독 통계
  subscriberIncreaseCount: number; // 구독자 증가 수
  subscriberDecreaseCount: number; // 구독 해제 수
  activeSubscriberCount: number; // 활성 구독자 수
};

// 파생 지표 타입 (12개)

/**
 * @description 1. 사용량 분석 (3개)
 * 태그별 사용 횟수 TOP N
 */
export type TopUsedTagItemType = {
  tagNo: number;
  tagNm: string;
  usageCount: number;
  subscriberCount: number;
  lastUsedDate: string;
};

/**
 * @description 태그별 사용 추이
 */
export type TagUsageTrendItemType = {
  dateStart: string;
  dateEnd: string;
  tagNo: number;
  tagNm: string;
  usageCount: number;
};

/**
 * @description 미사용 태그 목록
 */
export type UnusedTagItemType = {
  tagNo: number;
  tagNm: string;
  createDate: string;
  daysSinceCreation: number;
};

/**
 * @description 2. 구독 분석 (3개)
 * 태그별 구독자 수 TOP N
 */
export type TopTagsBySubscriberItemType = {
  tagNo: number;
  tagNm: string;
  subscriberCount: number;
  usageCount: number;
  lastSubscriberDate: string;
};

/**
 * @description 태그별 구독자 성장률
 */
export type TagSubscriberGrowthRateItemType = {
  dateStart: string;
  dateEnd: string;
  tagNo: number;
  tagNm: string;
  subscriberCount: number;
  growthRate: number;
  previousSubscriberCount: number;
};

/**
 * @description 구독자 없는 태그 목록
 */
export type TagWithoutSubscribersItemType = {
  tagNo: number;
  tagNm: string;
  usageCount: number;
  createDate: string;
};

/**
 * @description 3. 효율성 분석 (3개)
 * 태그별 사용 효율성
 */
export type TagUsageEfficiencyItemType = {
  tagNo: number;
  tagNm: string;
  usageCount: number;
  subscriberCount: number;
  efficiencyRatio: number; // 사용 횟수 / 구독자 수
};

/**
 * @description 태그별 평균 사용 빈도
 */
export type TagAverageUsageFrequencyItemType = {
  tagNo: number;
  tagNm: string;
  totalUsageCount: number;
  activeDays: number;
  averageFrequency: number; // 총 사용 횟수 / 활성 기간
};

/**
 * @description 태그 생명주기 분석
 */
export type TagLifecycleItemType = {
  tagNo: number;
  tagNm: string;
  createDate: string;
  lastUsedDate: string | null;
  lifecycleDays: number | null;
  isActive: boolean;
};

/**
 * @description 4. 관리 통계 (3개)
 * 태그 상태별 분포
 */
export type TagStatusDistributionItemType = {
  status: 'ACTIVE' | 'INACTIVE' | 'DELETED';
  count: number;
  ratio: number;
};

/**
 * @description 태그 생성자별 통계
 */
export type TagCreatorStatItemType = {
  creatorNo: number;
  creatorName: string;
  tagCount: number;
  activeTagCount: number;
  lastCreateDate: string;
};

/**
 * @description 태그 정리 필요도
 */
export type TagCleanupRecommendationItemType = {
  tagNo: number;
  tagNm: string;
  createDate: string;
  lastUsedDate: string | null;
  daysUnused: number;
  recommendation: 'KEEP' | 'ARCHIVE' | 'DELETE';
};
