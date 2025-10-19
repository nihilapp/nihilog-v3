import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQueryClient } from '@tanstack/react-query';

import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { SearchUserType } from '@/_schemas/user.schema';

/**
 * 관리자 사용자 관련 쿼리 키 정의
 */
export const adminUsersKeys = createQueryKeys(
  'adminUsers',
  {
  // ===== GET Queries =====
    search: (params: SearchUserType) => [
      'admin',
      'users',
      'search',
      params,
    ], // 사용자 목록 조회 (POST)
    byNo: (userNo: number) => [
      'admin',
      'users',
      'by-no',
      userNo,
    ], // 사용자 번호로 조회
    byName: (name: string) => [
      'admin',
      'users',
      'by-name',
      name,
    ], // 사용자명으로 조회
    byEmail: (email: string) => [
      'admin',
      'users',
      'by-email',
      email,
    ], // 이메일로 조회

    // ===== 통계 관련 GET Queries =====
    roleDistribution: () => [
      'admin',
      'users',
      'analyze',
      'role-distribution',
    ], // 역할별 사용자 분포
    statusDistribution: () => [
      'admin',
      'users',
      'analyze',
      'status-distribution',
    ], // 상태별 사용자 분포
    inactiveUsers: () => [
      'admin',
      'users',
      'analyze',
      'inactive-users',
    ], // 비활성 사용자 목록

    // ===== POST Mutations (통계) =====
    analyzeOverview: (params: AnalyzeStatType) => [
      'admin',
      'users',
      'analyze',
      'overview',
      params,
    ], // 사용자 분석 통계 (9개 지표 통합)
    analyzeActiveUsers: (params: AnalyzeStatType) => [
      'admin',
      'users',
      'analyze',
      'active-users',
      params,
    ], // 활성 사용자 분석
    analyzeTopContribution: (params: AnalyzeStatType) => [
      'admin',
      'users',
      'analyze',
      'top-contribution',
      params,
    ], // 사용자별 기여도 TOP N
    analyzeTopPostCount: (params: AnalyzeStatType) => [
      'admin',
      'users',
      'analyze',
      'top-post-count',
      params,
    ], // 사용자별 포스트 작성 수 TOP N
    analyzeTopCommentCount: (params: AnalyzeStatType) => [
      'admin',
      'users',
      'analyze',
      'top-comment-count',
      params,
    ], // 사용자별 댓글 작성 수 TOP N
    analyzeGrowthRate: (params: AnalyzeStatType) => [
      'admin',
      'users',
      'analyze',
      'growth-rate',
      params,
    ], // 사용자 성장률
    analyzeRetentionRate: (params: AnalyzeStatType) => [
      'admin',
      'users',
      'analyze',
      'retention-rate',
      params,
    ], // 사용자 유지율

    // ===== POST Mutations =====
    create: () => [
      'admin',
      'users',
      'create',
    ], // 사용자 생성
    signup: () => [
      'admin',
      'users',
      'create',
      'signup',
    ], // 최초 어드민 생성 (개발 환경에서만)

    // ===== PUT Mutations =====
    update: (userNo: number) => [
      'admin',
      'users',
      'update',
      userNo,
    ], // 사용자 정보 수정
    updateMultiple: () => [
      'admin',
      'users',
      'update',
      'multiple',
    ], // 다중 사용자 수정

    // ===== DELETE Mutations =====
    delete: (userNo: number) => [
      'admin',
      'users',
      'delete',
      userNo,
    ], // 사용자 삭제
    deleteMultiple: () => [
      'admin',
      'users',
      'delete',
      'multiple',
    ], // 다중 사용자 삭제
  }
);

/**
 * Admin Users 관련 뮤테이션 시 공통 캐시 무효화 로직
 * Admin Users 생성/수정/삭제 시 관련된 모든 쿼리를 무효화합니다.
 */
export function useInvalidateAdminUsersCache() {
  const queryClient = useQueryClient();

  return () => {
    // 1. admin/users로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'users',
      ],
    });

    // 2. users로 시작하는 모든 쿼리 무효화 (일반 사용자 관련)
    queryClient.invalidateQueries({
      queryKey: [ 'users', ],
    });

    // 3. auth로 시작하는 모든 쿼리 무효화 (인증 관련)
    queryClient.invalidateQueries({
      queryKey: [ 'auth', ],
    });

    // 4. posts로 시작하는 모든 쿼리 무효화 (사용자와 관련된 포스트)
    queryClient.invalidateQueries({
      queryKey: [ 'posts', ],
    });

    // 5. admin/posts로 시작하는 모든 쿼리 무효화 (관리자 포스트 관련)
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'posts',
      ],
    });

    // 6. comments로 시작하는 모든 쿼리 무효화 (사용자와 관련된 댓글)
    queryClient.invalidateQueries({
      queryKey: [ 'comments', ],
    });

    // 7. admin/comments로 시작하는 모든 쿼리 무효화 (관리자 댓글 관련)
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'comments',
      ],
    });

    // 8. subscribe로 시작하는 모든 쿼리 무효화 (사용자 구독 관련)
    queryClient.invalidateQueries({
      queryKey: [ 'subscribe', ],
    });

    // 9. admin/subscribe로 시작하는 모든 쿼리 무효화 (관리자 구독 관련)
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'subscribe',
      ],
    });
  };
}
