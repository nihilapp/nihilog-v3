import { DateTime } from 'luxon';

import type {
  AnalyzeTagStatItemType,
  TopUsedTagItemType,
  TagUsageTrendItemType,
  UnusedTagItemType,
  TopTagsBySubscriberItemType,
  TagSubscriberGrowthRateItemType,
  TagWithoutSubscribersItemType,
  TagUsageEfficiencyItemType,
  TagAverageUsageFrequencyItemType,
  TagLifecycleItemType,
  TagStatusDistributionItemType,
  TagCreatorStatItemType,
  TagCleanupRecommendationItemType
} from '@nihilog/schemas';

import { timeToString } from './timeHelper';

export class CreateTagAnalyze {
  // 기본 통계 (9개 지표 통합)
  static analyzeTag() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now),
      dateEnd: timeToString(now),
      // 태그 생성/삭제 통계
      newTagCount: 12,
      deleteTagCount: 2,
      activeTagCount: 45,
      // 태그 사용 통계
      tagMappingCount: 15,
      tagMappingDeleteCount: 3,
      activeTagMappingCount: 12,
      // 태그 구독 통계
      subscriberIncreaseCount: 8,
      subscriberDecreaseCount: 1,
      activeSubscriberCount: 7,
    } as AnalyzeTagStatItemType;
  }

  // 1. 사용량 분석 (3개)
  // 태그별 사용 횟수 TOP N
  static topUsedTag() {
    const now = DateTime.now();

    return {
      tagNo: 1,
      tagNm: 'JavaScript',
      usageCount: 25,
      subscriberCount: 15,
      lastUsedDate: timeToString(now.minus({ days: 1, })),
    } as TopUsedTagItemType;
  }

  // 태그별 사용 추이
  static tagUsageTrend() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now.minus({ days: 7, })),
      dateEnd: timeToString(now),
      tagNo: 2,
      tagNm: 'TypeScript',
      usageCount: 18,
    } as TagUsageTrendItemType;
  }

  // 미사용 태그 목록
  static unusedTag() {
    const now = DateTime.now();

    return {
      tagNo: 3,
      tagNm: 'Legacy Code',
      createDate: timeToString(now.minus({ days: 30, })),
      daysSinceCreation: 30,
    } as UnusedTagItemType;
  }

  // 2. 구독 분석 (3개)
  // 태그별 구독자 수 TOP N
  static topTagsBySubscriber() {
    const now = DateTime.now();

    return {
      tagNo: 4,
      tagNm: 'React',
      subscriberCount: 28,
      usageCount: 35,
      lastSubscriberDate: timeToString(now.minus({ days: 2, })),
    } as TopTagsBySubscriberItemType;
  }

  // 태그별 구독자 성장률
  static tagSubscriberGrowthRate() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now.minus({ days: 7, })),
      dateEnd: timeToString(now),
      tagNo: 5,
      tagNm: 'Vue.js',
      subscriberCount: 12,
      growthRate: 0.25,
      previousSubscriberCount: 9,
    } as TagSubscriberGrowthRateItemType;
  }

  // 구독자 없는 태그 목록
  static tagWithoutSubscribers() {
    const now = DateTime.now();

    return {
      tagNo: 6,
      tagNm: 'Angular',
      usageCount: 5,
      createDate: timeToString(now.minus({ days: 15, })),
    } as TagWithoutSubscribersItemType;
  }

  // 3. 효율성 분석 (3개)
  // 태그별 사용 효율성
  static tagUsageEfficiency() {
    return {
      tagNo: 7,
      tagNm: 'Node.js',
      usageCount: 20,
      subscriberCount: 8,
      efficiencyRatio: 2.5,
    } as TagUsageEfficiencyItemType;
  }

  // 태그별 평균 사용 빈도
  static tagAverageUsageFrequency() {
    return {
      tagNo: 8,
      tagNm: 'NestJS',
      totalUsageCount: 15,
      activeDays: 30,
      averageFrequency: 0.5,
    } as TagAverageUsageFrequencyItemType;
  }

  // 태그 생명주기 분석
  static tagLifecycle() {
    const now = DateTime.now();

    return {
      tagNo: 9,
      tagNm: 'Express',
      createDate: timeToString(now.minus({ days: 60, })),
      lastUsedDate: timeToString(now.minus({ days: 5, })),
      lifecycleDays: 55,
      isActive: true,
    } as TagLifecycleItemType;
  }

  // 4. 관리 통계 (3개)
  // 태그 상태별 분포
  static tagStatusDistribution() {
    return {
      status: 'ACTIVE' as const,
      count: 45,
      ratio: 0.75,
    } as TagStatusDistributionItemType;
  }

  // 태그 생성자별 통계
  static tagCreatorStat() {
    const now = DateTime.now();

    return {
      creatorNo: 1,
      creatorName: 'Admin',
      tagCount: 25,
      activeTagCount: 23,
      lastCreateDate: timeToString(now.minus({ days: 3, })),
    } as TagCreatorStatItemType;
  }

  // 태그 정리 필요도
  static tagCleanupRecommendation() {
    const now = DateTime.now();

    return {
      tagNo: 10,
      tagNm: 'Old Framework',
      createDate: timeToString(now.minus({ days: 400, })),
      lastUsedDate: timeToString(now.minus({ days: 200, })),
      daysUnused: 200,
      recommendation: 'ARCHIVE' as const,
    } as TagCleanupRecommendationItemType;
  }
}
