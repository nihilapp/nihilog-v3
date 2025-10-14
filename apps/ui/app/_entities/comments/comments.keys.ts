import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchCommentType } from '@/_schemas/comment.schema';

/**
 * 댓글 관련 쿼리 키 정의
 */
export const commentsKeys = createQueryKeys('comments', {
  // ===== GET Queries =====
  search: (params: SearchCommentType) => [
    'comments', 'search', params,
  ], // 댓글 목록 조회 (POST /comments/search)
  byNo: (cmntNo: number) => [
    'comments', 'by-no', cmntNo,
  ], // 댓글 번호로 조회

  // ===== POST Mutations =====
  create: () => [
    'comments', 'create',
  ], // 댓글 생성

  // ===== PUT Mutations =====
  update: (cmntNo: number) => [
    'comments', 'update', cmntNo,
  ], // 댓글 수정

  // ===== DELETE Mutations =====
  delete: (cmntNo: number) => [
    'comments', 'delete', cmntNo,
  ], // 댓글 삭제
});
