import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { SearchTagType } from '@/_schemas/tag.schema';
import type { SearchPstTagMpngType } from '@/_schemas/tag.schema';

/**
 * 관리자 태그 관련 쿼리 키 정의
 */
export const adminTagsKeys = createQueryKeys(
  'adminTags',
  {
  // ===== GET Queries =====
    search: (params: SearchTagType) => [
      'admin',
      'tags',
      'search',
      params,
    ], // 태그 목록 조회 (POST)
    byNo: (tagNo: number) => [
      'admin',
      'tags',
      'by-no',
      tagNo,
    ], // 태그 번호로 조회
    byName: (tagNm: string) => [
      'admin',
      'tags',
      'by-name',
      tagNm,
    ], // 태그명으로 조회

    // ===== 통계 관련 GET Queries =====
    analyzeUnusedTags: () => [
      'admin',
      'tags',
      'analyze',
      'unused-tags',
    ], // 미사용 태그 목록
    analyzeTopTagsBySubscribers: () => [
      'admin',
      'tags',
      'analyze',
      'top-tags-by-subscribers',
    ], // 구독자 많은 태그 TOP N
    analyzeTagsWithoutSubscribers: () => [
      'admin',
      'tags',
      'analyze',
      'tags-without-subscribers',
    ], // 구독자 없는 태그
    analyzeTagEfficiency: () => [
      'admin',
      'tags',
      'analyze',
      'tag-efficiency',
    ], // 태그 사용 효율성
    analyzeTagLifecycle: () => [
      'admin',
      'tags',
      'analyze',
      'tag-lifecycle',
    ], // 태그 라이프사이클
    analyzeTagStatusDistribution: () => [
      'admin',
      'tags',
      'analyze',
      'tag-status-distribution',
    ], // 태그 상태 분포
    analyzeTagCreatorStats: () => [
      'admin',
      'tags',
      'analyze',
      'tag-creator-stats',
    ], // 태그 생성자 통계
    analyzeTagCleanupRecommendations: () => [
      'admin',
      'tags',
      'analyze',
      'tag-cleanup-recommendations',
    ], // 태그 정리 추천

    // ===== POST Mutations (통계) =====
    analyzeOverview: (params: AnalyzeStatType) => [
      'admin',
      'tags',
      'analyze',
      'overview',
      params,
    ], // 태그 분석 통계 (9개 지표 통합)
    analyzeTopUsed: (params: AnalyzeStatType) => [
      'admin',
      'tags',
      'analyze',
      'top-used',
      params,
    ], // 인기 태그 TOP N
    analyzeUsageTrend: (params: AnalyzeStatType) => [
      'admin',
      'tags',
      'analyze',
      'usage-trend',
      params,
    ], // 태그 사용 트렌드
    analyzeSubscriberGrowth: (params: AnalyzeStatType) => [
      'admin',
      'tags',
      'analyze',
      'subscriber-growth',
      params,
    ], // 태그 구독자 성장률
    analyzeFrequency: (params: AnalyzeStatType) => [
      'admin',
      'tags',
      'analyze',
      'frequency',
      params,
    ], // 태그 평균 사용 빈도

    // ===== POST Mutations =====
    create: () => [
      'admin',
      'tags',
      'create',
    ], // 태그 생성
    createMultiple: () => [
      'admin',
      'tags',
      'create',
      'multiple',
    ], // 다수 태그 생성

    // ===== PUT Mutations =====
    update: (tagNo: number) => [
      'admin',
      'tags',
      'update',
      tagNo,
    ], // 태그 수정
    updateMultiple: () => [
      'admin',
      'tags',
      'update',
      'multiple',
    ], // 다수 태그 수정

    // ===== DELETE Mutations =====
    delete: (tagNo: number) => [
      'admin',
      'tags',
      'delete',
      tagNo,
    ], // 태그 삭제
    deleteMultiple: () => [
      'admin',
      'tags',
      'delete',
      'multiple',
    ], // 다수 태그 삭제

    // ===== 태그 매핑 관련 =====
    searchMappings: (params: SearchPstTagMpngType) => [
      'admin',
      'tags',
      'mappings',
      'search',
      params,
    ], // 태그 매핑 검색
    mappingByKey: (pstNo: number, tagNo: number) => [
      'admin',
      'tags',
      'mappings',
      'by-key',
      pstNo,
      tagNo,
    ], // 태그 매핑 조회
    createMapping: () => [
      'admin',
      'tags',
      'mappings',
      'create',
    ], // 태그 매핑 생성
    createMultipleMappings: () => [
      'admin',
      'tags',
      'mappings',
      'create',
      'multiple',
    ], // 다수 태그 매핑 생성
    deleteMapping: () => [
      'admin',
      'tags',
      'mappings',
      'delete',
    ], // 태그 매핑 삭제
    deleteMultipleMappings: () => [
      'admin',
      'tags',
      'mappings',
      'delete',
      'multiple',
    ], // 다수 태그 매핑 삭제
  }
);
