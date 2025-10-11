import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { SearchTagType, CreateTagType, UpdateTagType, DeleteTagType } from '@/_schemas/tag.schema';
import type { SearchPstTagMpngType, CreatePstTagMpngType, DeletePstTagMpngType } from '@/_schemas/tag.schema';

/**
 * 관리자 태그 관련 쿼리 키 정의
 */
export const adminTagsKeys = createQueryKeys('adminTags', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 관리자 태그 관련 쿼리 무효화

  // 태그 관리
  tagList: (params: SearchTagType) => [
    'tagList', params,
  ], // 태그 목록 조회 (POST)
  tagByNo: (tagNo: number) => [
    'tagByNo', tagNo,
  ], // 태그 번호로 조회
  tagByName: (tagNm: string) => [
    'tagByName', tagNm,
  ], // 태그명으로 조회

  // ===== 통계 관련 GET Queries =====
  unusedTags: () => [ 'unusedTags', ], // 미사용 태그 목록
  topTagsBySubscribers: () => [ 'topTagsBySubscribers', ], // 구독자 많은 태그 TOP N
  tagsWithoutSubscribers: () => [ 'tagsWithoutSubscribers', ], // 구독자 없는 태그
  tagEfficiency: () => [ 'tagEfficiency', ], // 태그 사용 효율성
  tagLifecycle: () => [ 'tagLifecycle', ], // 태그 라이프사이클
  tagStatusDistribution: () => [ 'tagStatusDistribution', ], // 태그 상태 분포
  tagCreatorStats: () => [ 'tagCreatorStats', ], // 태그 생성자 통계
  tagCleanupRecommendations: () => [ 'tagCleanupRecommendations', ], // 태그 정리 추천

  // ===== POST Mutations =====
  createTag: () => [ 'createTag', ], // 태그 생성
  createMultipleTags: () => [ 'createMultipleTags', ], // 다수 태그 생성
  analyzeOverview: (params: AnalyzeStatType) => [
    'analyzeOverview', params,
  ], // 태그 분석 통계 (9개 지표 통합)
  analyzeTopUsed: (params: AnalyzeStatType) => [
    'analyzeTopUsed', params,
  ], // 인기 태그 TOP N
  analyzeUsageTrend: (params: AnalyzeStatType) => [
    'analyzeUsageTrend', params,
  ], // 태그 사용 트렌드
  analyzeSubscriberGrowth: (params: AnalyzeStatType) => [
    'analyzeSubscriberGrowth', params,
  ], // 태그 구독자 성장률
  analyzeFrequency: (params: AnalyzeStatType) => [
    'analyzeFrequency', params,
  ], // 태그 평균 사용 빈도

  // ===== PUT Mutations =====
  updateTag: (tagNo: number) => [
    'updateTag', tagNo,
  ], // 태그 수정
  updateMultipleTags: () => [ 'updateMultipleTags', ], // 다수 태그 수정

  // ===== DELETE Mutations =====
  deleteTag: (tagNo: number) => [
    'deleteTag', tagNo,
  ], // 태그 삭제
  deleteMultipleTags: () => [ 'deleteMultipleTags', ], // 다수 태그 삭제

  // ===== 태그 매핑 관련 =====
  tagMappings: (params: SearchPstTagMpngType) => [
    'tagMappings', params,
  ], // 태그 매핑 검색
  tagMapping: (pstNo: number, tagNo: number) => [
    'tagMapping', pstNo, tagNo,
  ], // 태그 매핑 조회
  createTagMapping: () => [ 'createTagMapping', ], // 태그 매핑 생성
  createMultipleTagMappings: () => [ 'createMultipleTagMappings', ], // 다수 태그 매핑 생성
  deleteTagMapping: () => [ 'deleteTagMapping', ], // 태그 매핑 삭제
  deleteMultipleTagMappings: () => [ 'deleteMultipleTagMappings', ], // 다수 태그 매핑 삭제
});
