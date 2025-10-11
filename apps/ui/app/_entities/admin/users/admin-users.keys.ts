import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { SearchUserType } from '@/_schemas/user.schema';

/**
 * 관리자 사용자 관련 쿼리 키 정의
 */
export const adminUsersKeys = createQueryKeys('adminUsers', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 관리자 사용자 관련 쿼리 무효화

  // 사용자 목록 및 조회
  userList: (params: SearchUserType) => [
    'userList', params,
  ], // 사용자 목록 조회 (POST)
  userByNo: (userNo: number) => [
    'userByNo', userNo,
  ], // 사용자 번호로 조회
  userByName: (name: string) => [
    'userByName', name,
  ], // 사용자명으로 조회
  userByEmail: (email: string) => [
    'userByEmail', email,
  ], // 이메일로 조회

  // ===== 통계 관련 GET Queries =====
  roleDistribution: () => [ 'roleDistribution', ], // 역할별 사용자 분포
  statusDistribution: () => [ 'statusDistribution', ], // 상태별 사용자 분포
  inactiveUsers: () => [ 'inactiveUsers', ], // 비활성 사용자 목록

  // ===== POST Mutations =====
  createUser: () => [ 'createUser', ], // 사용자 생성
  analyzeOverview: (params: AnalyzeStatType) => [
    'analyzeOverview', params,
  ], // 사용자 분석 통계 (9개 지표 통합)
  analyzeActiveUsers: (params: AnalyzeStatType) => [
    'analyzeActiveUsers', params,
  ], // 활성 사용자 분석
  analyzeTopContribution: (params: AnalyzeStatType) => [
    'analyzeTopContribution', params,
  ], // 사용자별 기여도 TOP N
  analyzeTopPostCount: (params: AnalyzeStatType) => [
    'analyzeTopPostCount', params,
  ], // 사용자별 게시글 작성 수 TOP N
  analyzeTopCommentCount: (params: AnalyzeStatType) => [
    'analyzeTopCommentCount', params,
  ], // 사용자별 댓글 작성 수 TOP N
  analyzeGrowthRate: (params: AnalyzeStatType) => [
    'analyzeGrowthRate', params,
  ], // 사용자 성장률
  analyzeRetentionRate: (params: AnalyzeStatType) => [
    'analyzeRetentionRate', params,
  ], // 사용자 유지율

  // ===== PUT Mutations =====
  updateUser: (userNo: number) => [
    'updateUser', userNo,
  ], // 사용자 정보 수정
  updateMultipleUsers: () => [ 'updateMultipleUsers', ], // 다중 사용자 수정

  // ===== DELETE Mutations =====
  deleteUser: (userNo: number) => [
    'deleteUser', userNo,
  ], // 사용자 삭제
  deleteMultipleUsers: () => [ 'deleteMultipleUsers', ], // 다중 사용자 삭제
});
