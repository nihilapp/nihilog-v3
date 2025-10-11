import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchCommentType } from '@/_schemas/comment.schema';

/**
 * 댓글 관련 쿼리 키 정의
 */
export const commentsKeys = createQueryKeys('comments', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 댓글 관련 쿼리 무효화
  commentList: (params: SearchCommentType) => [
    'commentList', params,
  ], // 댓글 목록 조회 (POST)
  commentByNo: (cmntNo: number) => [
    'commentByNo', cmntNo,
  ], // 댓글 번호로 조회

  // ===== POST Mutations =====
  createComment: () => [ 'createComment', ], // 댓글 생성

  // ===== PUT Mutations =====
  updateComment: () => [ 'updateComment', ], // 댓글 수정

  // ===== DELETE Mutations =====
  deleteComment: () => [ 'deleteComment', ], // 댓글 삭제
});
