import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { AnalyzeStatType } from '@/_schemas/common.schema';

/**
 * 관리자 구독 관련 쿼리 키 정의
 */
export const adminSubscribeKeys = createQueryKeys('adminSubscribe', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 관리자 구독 관련 쿼리 무효화

  // 구독 관리
  searchSubscribes: () => [ 'searchSubscribes', ], // 구독 목록 조회 (POST)
  subscribeByUserNo: (userNo: number) => [
    'subscribeByUserNo', userNo,
  ], // 사용자별 구독 조회

  // ===== 통계 관련 GET Queries =====
  analyzeNotificationDistribution: () => [ 'analyzeNotificationDistribution', ], // 알림 설정 분포

  // ===== POST Mutations =====
  createSubscribe: () => [ 'createSubscribe', ], // 구독 생성
  analyzeOverview: (params: AnalyzeStatType) => [
    'analyzeOverview', params,
  ], // 구독 분석 통계
  analyzeActiveUsers: () => [ 'analyzeActiveUsers', ], // 활성 구독자 분석
  analyzeInactiveUsers: () => [ 'analyzeInactiveUsers', ], // 비활성 구독자 분석

  // ===== PUT Mutations =====
  updateMultipleSubscribes: () => [ 'updateMultipleSubscribes', ], // 다수 구독 수정

  // ===== DELETE Mutations =====
  deleteSubscribe: (sbcrNo: number) => [
    'deleteSubscribe', sbcrNo,
  ], // 구독 삭제
  deleteMultipleSubscribes: () => [ 'deleteMultipleSubscribes', ], // 다수 구독 삭제
});
