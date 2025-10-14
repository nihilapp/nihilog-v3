import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchPostType } from '@/_schemas/post.schema';

/**
 * 게시글 관련 쿼리 키 정의
 */
export const postsKeys = createQueryKeys('posts', {
  // ===== GET Queries =====
  search: (params: SearchPostType) => [
    'posts', 'search', params,
  ], // 게시글 목록 조회 (POST /posts/search)
  byNo: (pstNo: number) => [
    'posts', 'by-no', pstNo,
  ], // 게시글 번호로 조회
  bySlug: (pstCd: string) => [
    'posts', 'by-slug', pstCd,
  ], // 게시글 슬러그로 조회
  listByTag: (tagNo: number, params: SearchPostType) => [
    'posts', 'list', 'tag', tagNo, params,
  ], // 태그별 게시글 목록
  listByCategory: (ctgryNo: number, params: SearchPostType) => [
    'posts', 'list', 'category', ctgryNo, params,
  ], // 카테고리별 게시글 목록
  listByArchive: (date: string, params: SearchPostType) => [
    'posts', 'list', 'archive', date, params,
  ], // 년월별 게시글 목록
  advancedSearch: (params: SearchPostType) => [
    'posts', 'advanced-search', params,
  ], // 고급 검색 게시글 목록
  bookmarked: (params: SearchPostType) => [
    'posts', 'bookmarked', params,
  ], // 북마크한 게시글 목록

  // ===== POST Mutations =====
  createViewLog: (pstNo: number) => [
    'posts', 'create', 'view-log', pstNo,
  ], // 조회 로그 기록
  createShareLog: (pstNo: number) => [
    'posts', 'create', 'share-log', pstNo,
  ], // 공유 로그 기록
  createBookmark: (pstNo: number) => [
    'posts', 'create', 'bookmark', pstNo,
  ], // 북마크 생성
  deleteBookmark: (pstNo: number) => [
    'posts', 'delete', 'bookmark', pstNo,
  ], // 북마크 삭제
});
