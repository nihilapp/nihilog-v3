import { DateTime } from 'luxon';

import type {
  AnalyzeCategoryStatItemType,
  TopPopularCategoryItemType,
  TopCategoriesBySubscriberItemType,
  AverageBookmarkPerCategoryItemType,
  AverageViewPerCategoryItemType,
  CategoryHierarchyDistributionItemType,
  CategoryHierarchyPostDistributionItemType,
  CategoryHierarchySubscriberDistributionItemType,
  CategoryStatusDistributionItemType,
  CategoryCreatorStatItemType,
  UnusedCategoryItemType,
  CategorySubscriberGrowthRateItemType,
  CategoriesWithoutSubscribersItemType
} from '@nihilog/schemas';

import { timeToString } from './timeHelper';

export class CreateCategoryAnalyze {
  // 기본 통계 (11개 지표 통합)
  static analyzeCategory() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now),
      dateEnd: timeToString(now),
      // 카테고리 생성/삭제 통계
      newCategoryCount: 5,
      deleteCategoryCount: 1,
      activeCategoryCount: 15,
      // 카테고리 구독 통계
      subscriberIncreaseCount: 10,
      subscriberDecreaseCount: 2,
      activeSubscriberCount: 8,
      // 카테고리 사용 통계
      postCount: 25,
      viewCount: 1250,
      bookmarkCount: 85,
      shareCount: 32,
      commentCount: 140,
    } as AnalyzeCategoryStatItemType;
  }

  // 1. 인기도 분석 (4개)
  // 카테고리별 인기 지수 TOP N
  static topPopularCategory() {
    const now = DateTime.now();

    return {
      ctgryNo: 1,
      ctgryNm: '프론트엔드',
      popularityIndex: 2185, // (1250 * 1) + (85 * 3) + (32 * 5)
      viewCount: 1250,
      bookmarkCount: 85,
      shareCount: 32,
      subscriberCount: 45,
      lastUsedDate: timeToString(now.minus({ days: 1, })),
    } as TopPopularCategoryItemType;
  }

  // 구독자 많은 카테고리 TOP N
  static topCategoryBySubscriber() {
    const now = DateTime.now();

    return {
      ctgryNo: 2,
      ctgryNm: '백엔드',
      subscriberCount: 38,
      postCount: 42,
      lastSubscriberDate: timeToString(now.minus({ days: 2, })),
    } as TopCategoriesBySubscriberItemType;
  }

  // 평균 북마크 수 / 카테고리
  static averageBookmarkPerCategory() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now.minus({ days: 7, })),
      dateEnd: timeToString(now),
      avgBookmarkCount: 12.5,
    } as AverageBookmarkPerCategoryItemType;
  }

  // 카테고리별 평균 조회수
  static averageViewPerCategory() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now.minus({ days: 7, })),
      dateEnd: timeToString(now),
      avgViewCount: 285.3,
    } as AverageViewPerCategoryItemType;
  }

  // 2. 계층 분석 (3개)
  // 계층별 카테고리 분포
  static categoryHierarchyDistribution() {
    return {
      hierarchyLevel: 'ROOT' as const,
      count: 8,
      ratio: 0.53,
    } as CategoryHierarchyDistributionItemType;
  }

  // 계층별 포스트 분포
  static categoryHierarchyPostDistribution() {
    return {
      hierarchyLevel: 'CHILD' as const,
      postCount: 125,
      ratio: 0.62,
    } as CategoryHierarchyPostDistributionItemType;
  }

  // 계층별 구독자 분포
  static categoryHierarchySubscriberDistribution() {
    return {
      hierarchyLevel: 'ROOT' as const,
      subscriberCount: 85,
      ratio: 0.58,
    } as CategoryHierarchySubscriberDistributionItemType;
  }

  // 3. 관리 통계 (3개)
  // 카테고리 상태별 분포
  static categoryStatusDistribution() {
    return {
      status: 'ACTIVE' as const,
      count: 15,
      ratio: 0.83,
    } as CategoryStatusDistributionItemType;
  }

  // 카테고리 생성자별 통계
  static categoryCreatorStat() {
    const now = DateTime.now();

    return {
      creatorNo: 1,
      creatorName: 'Admin',
      categoryCount: 12,
      activeCategoryCount: 11,
      lastCreateDate: timeToString(now.minus({ days: 5, })),
    } as CategoryCreatorStatItemType;
  }

  // 미사용 카테고리 목록
  static unusedCategory() {
    const now = DateTime.now();

    return {
      ctgryNo: 3,
      ctgryNm: '임시 카테고리',
      createDate: timeToString(now.minus({ days: 45, })),
      daysSinceCreation: 45,
    } as UnusedCategoryItemType;
  }

  // 4. 구독 분석 (2개 추가)
  // 카테고리별 구독자 성장률 (시계열)
  static categorySubscriberGrowthRate() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now.minus({ days: 7, })),
      dateEnd: timeToString(now),
      ctgryNo: 1,
      ctgryNm: '프론트엔드',
      subscriberCount: 45,
      previousSubscriberCount: 38,
      growthRate: 18.42, // ((45 - 38) / 38) * 100
    } as CategorySubscriberGrowthRateItemType;
  }

  // 구독자 없는 카테고리 목록
  static categoriesWithoutSubscribers() {
    const now = DateTime.now();

    return {
      ctgryNo: 4,
      ctgryNm: '새 카테고리',
      postCount: 3,
      createDate: timeToString(now.minus({ days: 15, })),
      daysSinceCreation: 15,
    } as CategoriesWithoutSubscribersItemType;
  }
}
