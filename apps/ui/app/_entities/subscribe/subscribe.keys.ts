import { createQueryKeys } from '@lukemorales/query-key-factory';

/**
 * Subscribe 엔티티의 쿼리 키 정의
 * createQueryKeys를 사용하여 타입 안전한 쿼리 키를 생성합니다.
 *
 * GET 쿼리:
 * - userSettings: 사용자 구독 설정 조회
 * - categoryList: 카테고리 구독 목록 조회
 * - categoryDetail: 카테고리 구독 상세 조회
 * - tagList: 태그 구독 목록 조회
 * - tagDetail: 태그 구독 상세 조회
 *
 * POST 뮤테이션:
 * - updateUserSettings: 사용자 구독 설정 수정
 * - subscribeCategory: 카테고리 구독
 * - unsubscribeCategory: 카테고리 구독 해제
 * - subscribeTag: 태그 구독
 * - unsubscribeTag: 태그 구독 해제
 */
export const subscribeKeys = createQueryKeys('subscribe', {
  // ===== GET Queries =====
  userSettings: (userId: number) => [
    'users', 'subscribe', userId,
  ],
  categoryList: (userId: number) => [
    'users', 'subscribes', 'categories', userId,
  ],
  categoryDetail: (userId: number, categoryId: number) => [
    'users', 'subscribes', 'categories', userId, categoryId,
  ],
  tagList: (userId: number) => [
    'users', 'subscribes', 'tags', userId,
  ],
  tagDetail: (userId: number, tagId: number) => [
    'users', 'subscribes', 'tags', userId, tagId,
  ],

  // ===== POST Mutations =====
});
