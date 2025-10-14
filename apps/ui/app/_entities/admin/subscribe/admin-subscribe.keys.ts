import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { AnalyzeStatType } from '@/_schemas/common.schema';

/**
 * 관리자 구독 관련 쿼리 키 정의
 */
export const adminSubscribeKeys = createQueryKeys('adminSubscribe', {
  // ===== GET Queries =====
  search: () => [
    'admin', 'subscribes', 'search',
  ], // 구독 목록 조회 (POST)
  byUserNo: (userNo: number) => [
    'admin', 'subscribes', 'by-user-no', userNo,
  ], // 사용자별 구독 조회

  // ===== 통계 관련 GET Queries =====
  analyzeNotificationDistribution: () => [
    'admin', 'subscribes', 'analyze', 'notification-distribution',
  ], // 알림 설정 분포

  // ===== POST Mutations (통계) =====
  analyzeOverview: (params: AnalyzeStatType) => [
    'admin', 'subscribes', 'analyze', 'overview', params,
  ], // 구독 분석 통계
  analyzeActiveUsers: () => [
    'admin', 'subscribes', 'analyze', 'active-users',
  ], // 활성 구독자 분석
  analyzeInactiveUsers: () => [
    'admin', 'subscribes', 'analyze', 'inactive-users',
  ], // 비활성 구독자 분석

  // ===== POST Mutations =====
  create: () => [
    'admin', 'subscribes', 'create',
  ], // 구독 생성

  // ===== PUT Mutations =====
  updateMultiple: () => [
    'admin', 'subscribes', 'update', 'multiple',
  ], // 다수 구독 수정

  // ===== DELETE Mutations =====
  delete: (sbcrNo: number) => [
    'admin', 'subscribes', 'delete', sbcrNo,
  ], // 구독 삭제
  deleteMultiple: () => [
    'admin', 'subscribes', 'delete', 'multiple',
  ], // 다수 구독 삭제
});
