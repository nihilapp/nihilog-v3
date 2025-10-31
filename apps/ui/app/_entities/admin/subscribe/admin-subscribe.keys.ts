import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQueryClient } from '@tanstack/react-query';

import type { AnalyzeStatType } from '@/_types/common.schema';

/**
 * 관리자 구독 관련 쿼리 키 정의
 */
export const adminSubscribeKeys = createQueryKeys(
  'adminSubscribe',
  {
  // ===== GET Queries =====
    search: () => [
      'admin',
      'subscribes',
      'search',
    ], // 구독 목록 조회 (POST)
    byUserNo: (userNo: number) => [
      'admin',
      'subscribes',
      'by-user-no',
      userNo,
    ], // 사용자별 구독 조회

    // ===== 통계 관련 GET Queries =====
    analyzeNotificationDistribution: () => [
      'admin',
      'subscribes',
      'analyze',
      'notification-distribution',
    ], // 알림 설정 분포

    // ===== POST Mutations (통계) =====
    analyzeOverview: (params: AnalyzeStatType) => [
      'admin',
      'subscribes',
      'analyze',
      'overview',
      params,
    ], // 구독 분석 통계
    analyzeActiveUsers: () => [
      'admin',
      'subscribes',
      'analyze',
      'active-users',
    ], // 활성 구독자 분석
    analyzeInactiveUsers: () => [
      'admin',
      'subscribes',
      'analyze',
      'inactive-users',
    ], // 비활성 구독자 분석

    // ===== POST Mutations =====
    create: () => [
      'admin',
      'subscribes',
      'create',
    ], // 구독 생성

    // ===== PUT Mutations =====
    updateMultiple: () => [
      'admin',
      'subscribes',
      'update',
      'multiple',
    ], // 다수 구독 수정

    // ===== DELETE Mutations =====
    delete: (sbcrNo: number) => [
      'admin',
      'subscribes',
      'delete',
      sbcrNo,
    ], // 구독 삭제
    deleteMultiple: () => [
      'admin',
      'subscribes',
      'delete',
      'multiple',
    ], // 다수 구독 삭제
  }
);

/**
 * Admin Subscribe 관련 뮤테이션 시 공통 캐시 무효화 로직
 * Admin Subscribe 생성/수정/삭제 시 관련된 모든 쿼리를 무효화합니다.
 */
export function useInvalidateAdminSubscribeCache() {
  const queryClient = useQueryClient();

  return () => {
    // 1. admin/subscribes로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'subscribes',
      ],
    });

    // 2. subscribe로 시작하는 모든 쿼리 무효화 (일반 구독 관련)
    queryClient.invalidateQueries({
      queryKey: [ 'subscribe', ],
    });

    // 3. users로 시작하는 모든 쿼리 무효화 (구독자 관련)
    queryClient.invalidateQueries({
      queryKey: [ 'users', ],
    });

    // 4. admin/users로 시작하는 모든 쿼리 무효화 (관리자 사용자 관련)
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'users',
      ],
    });

    // 5. categories로 시작하는 모든 쿼리 무효화 (카테고리 구독 관련)
    queryClient.invalidateQueries({
      queryKey: [ 'categories', ],
    });

    // 6. admin/categories로 시작하는 모든 쿼리 무효화 (관리자 카테고리 관련)
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'categories',
      ],
    });

    // 7. tags로 시작하는 모든 쿼리 무효화 (태그 구독 관련)
    queryClient.invalidateQueries({
      queryKey: [ 'tags', ],
    });

    // 8. admin/tags로 시작하는 모든 쿼리 무효화 (관리자 태그 관련)
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'tags',
      ],
    });

    // 9. posts로 시작하는 모든 쿼리 무효화 (구독과 관련된 포스트)
    queryClient.invalidateQueries({
      queryKey: [ 'posts', ],
    });

    // 10. admin/posts로 시작하는 모든 쿼리 무효화 (관리자 포스트 관련)
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'posts',
      ],
    });
  };
}
