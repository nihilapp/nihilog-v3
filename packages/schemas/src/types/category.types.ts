import type { Prisma } from '@nihilog/db';

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

// 카테고리 통계 관련 타입

/**
 * @description 카테고리 분석 통계 (시간대별 합산) - 9개 지표 통합
 * - ctgryNo 없으면 전체, 있으면 해당 카테고리만
 */
export type AnalyzeCategoryStatItemType = {
  dateStart: string;
  dateEnd: string;
  // 카테고리 생성/삭제 통계
  newCategoryCount: number; // 신규 카테고리 생성 수
  deleteCategoryCount: number; // 카테고리 삭제 수
  activeCategoryCount: number; // 활성 카테고리 수
  // 카테고리 구독 통계
  subscriberIncreaseCount: number; // 구독자 증가 수
  subscriberDecreaseCount: number; // 구독 해제 수
  activeSubscriberCount: number; // 활성 구독자 수
  // 카테고리 사용 통계
  postCount: number; // 카테고리별 포스트 수
  viewCount: number; // 카테고리별 조회수 합계
  bookmarkCount: number; // 카테고리별 북마크 수
  shareCount: number; // 카테고리별 공유 수
  commentCount: number; // 카테고리별 댓글 수
};

// 파생 지표 타입 (10개)

/**
 * @description 1. 카테고리 인기도 분석 (4개)
 * 카테고리별 인기 지수 TOP N (조회 + 북마크 + 공유 가중치 합산)
 */
export type TopPopularCategoryItemType = {
  ctgryNo: number;
  ctgryNm: string;
  popularityIndex: number; // 조회수 + 북마크수 + 공유수 가중치 합산
  viewCount: number;
  bookmarkCount: number;
  shareCount: number;
  subscriberCount: number;
  lastUsedDate: string;
};

/**
 * @description 구독자 많은 카테고리 TOP N
 */
export type TopCategoriesBySubscriberItemType = {
  ctgryNo: number;
  ctgryNm: string;
  subscriberCount: number;
  postCount: number;
  lastSubscriberDate: string;
};

/**
 * @description 평균 북마크 수 / 카테고리
 */
export type AverageBookmarkPerCategoryItemType = {
  dateStart: string;
  dateEnd: string;
  avgBookmarkCount: number;
};

/**
 * @description 카테고리별 평균 조회수
 */
export type AverageViewPerCategoryItemType = {
  dateStart: string;
  dateEnd: string;
  avgViewCount: number;
};

/**
 * @description 2. 카테고리 계층 분석 (3개)
 * 계층별 카테고리 분포 (상위/하위 카테고리 비율)
 */
export type CategoryHierarchyDistributionItemType = {
  hierarchyLevel: 'ROOT' | 'CHILD';
  count: number;
  ratio: number;
};

/**
 * @description 계층별 포스트 분포
 */
export type CategoryHierarchyPostDistributionItemType = {
  hierarchyLevel: 'ROOT' | 'CHILD';
  postCount: number;
  ratio: number;
};

/**
 * @description 계층별 구독자 분포
 */
export type CategoryHierarchySubscriberDistributionItemType = {
  hierarchyLevel: 'ROOT' | 'CHILD';
  subscriberCount: number;
  ratio: number;
};

/**
 * @description 3. 카테고리 관리 통계 (3개)
 * 카테고리 상태별 분포 (활성/비활성/삭제된 카테고리 비율)
 */
export type CategoryStatusDistributionItemType = {
  status: 'ACTIVE' | 'INACTIVE' | 'DELETED';
  count: number;
  ratio: number;
};

/**
 * @description 카테고리 생성자별 통계
 */
export type CategoryCreatorStatItemType = {
  creatorNo: number;
  creatorName: string;
  categoryCount: number;
  activeCategoryCount: number;
  lastCreateDate: string;
};

/**
 * @description 미사용 카테고리 목록 (포스트가 없는 카테고리)
 */
export type UnusedCategoryItemType = {
  ctgryNo: number;
  ctgryNm: string;
  createDate: string;
  daysSinceCreation: number;
};

/**
 * @description 4. 카테고리 구독 분석 (2개 추가)
 * 카테고리별 구독자 성장률 (시계열)
 */
export type CategorySubscriberGrowthRateItemType = {
  dateStart: string;
  dateEnd: string;
  ctgryNo: number;
  ctgryNm: string;
  subscriberCount: number;
  previousSubscriberCount: number;
  growthRate: number; // (현재 - 이전) / 이전 * 100
};

/**
 * @description 구독자 없는 카테고리 목록
 */
export type CategoriesWithoutSubscribersItemType = {
  ctgryNo: number;
  ctgryNm: string;
  postCount: number;
  createDate: string;
  daysSinceCreation: number;
};
