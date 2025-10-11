import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchPostType } from '@/_schemas/post.schema';

/**
 * 게시글 관련 쿼리 키 정의
 */
export const postsKeys = createQueryKeys('posts', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 게시글 관련 쿼리 무효화
  postList: (params: SearchPostType) => [
    'postList', params,
  ], // 게시글 목록 조회 (POST)
  postByNo: (pstNo: number) => [
    'postByNo', pstNo,
  ], // 게시글 번호로 조회
  postBySlug: (pstCd: string) => [
    'postBySlug', pstCd,
  ], // 게시글 슬러그로 조회
  postListByTag: (tagNo: number, params: SearchPostType) => [
    'postListByTag', tagNo, params,
  ], // 태그별 게시글 목록
  postListByCategory: (ctgryNo: number, params: SearchPostType) => [
    'postListByCategory', ctgryNo, params,
  ], // 카테고리별 게시글 목록
  postListByArchive: (date: string, params: SearchPostType) => [
    'postListByArchive', date, params,
  ], // 년월별 게시글 목록
  advancedPostList: (params: SearchPostType) => [
    'advancedPostList', params,
  ], // 고급 검색 게시글 목록
  bookmarkedPosts: (params: SearchPostType) => [
    'bookmarkedPosts', params,
  ], // 북마크한 게시글 목록

  // ===== POST Mutations =====
  createViewLog: (pstNo: number) => [
    'createViewLog', pstNo,
  ], // 조회 로그 기록
  createShareLog: (pstNo: number) => [
    'createShareLog', pstNo,
  ], // 공유 로그 기록
  createBookmark: (pstNo: number) => [
    'createBookmark', pstNo,
  ], // 북마크 생성
  deleteBookmark: (pstNo: number) => [
    'deleteBookmark', pstNo,
  ], // 북마크 삭제
});
