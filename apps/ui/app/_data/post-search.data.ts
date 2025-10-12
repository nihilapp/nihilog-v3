import type { SearchPostType } from '@/_schemas/post.schema';

/**
 * @description 게시글 검색을 위한 기본 데이터
 */
export const postSearchData = {
  /**
   * @description 기본 게시글 검색 파라미터
   */
  defaultSearchParams: {
    page: 1,
    strtRow: 0,
    endRow: 20,
    orderBy: 'LATEST' as const,
  } satisfies Partial<SearchPostType>,

  /**
   * @description 관리자 대시보드용 게시글 검색 파라미터
   */
  adminSearchParams: {
    page: 1,
    strtRow: 0,
    endRow: 50,
    orderBy: 'LATEST' as const,
    delYn: 'N' as const,
  } satisfies Partial<SearchPostType>,

  /**
   * @description 게시글 상태별 검색 파라미터
   */
  statusSearchParams: {
    draft: {
      page: 1,
      strtRow: 0,
      endRow: 20,
      orderBy: 'LATEST' as const,
      pstStts: 'EMPTY' as const,
      delYn: 'N' as const,
    },
    writing: {
      page: 1,
      strtRow: 0,
      endRow: 20,
      orderBy: 'LATEST' as const,
      pstStts: 'WRITING' as const,
      delYn: 'N' as const,
    },
    published: {
      page: 1,
      strtRow: 0,
      endRow: 20,
      orderBy: 'LATEST' as const,
      pstStts: 'FINISHED' as const,
      delYn: 'N' as const,
    },
  } satisfies Record<string, Partial<SearchPostType>>,

  /**
   * @description 정렬 옵션
   */
  sortOptions: [
    { value: 'LATEST', label: '최신순', },
    { value: 'POPULAR', label: '인기순', },
    { value: 'OLDEST', label: '오래된순', },
  ] as const,

  /**
   * @description 게시글 상태 옵션
   */
  statusOptions: [
    { value: 'EMPTY', label: '초안', color: 'outline' as const, },
    { value: 'WRITING', label: '작성중', color: 'secondary' as const, },
    { value: 'FINISHED', label: '발행됨', color: 'default' as const, },
  ] as const,

  /**
   * @description 페이지 크기 옵션
   */
  pageSizeOptions: [
    { value: 10, label: '10개씩', },
    { value: 20, label: '20개씩', },
    { value: 50, label: '50개씩', },
    { value: 100, label: '100개씩', },
  ] as const,
} as const;

/**
 * @description 게시글 검색 파라미터 생성 헬퍼 함수
 */
export const createPostSearchParams = {
  /**
   * @description 기본 검색 파라미터 생성
   */
  default: (): Partial<SearchPostType> => ({
    ...postSearchData.defaultSearchParams,
  }),

  /**
   * @description 관리자용 검색 파라미터 생성
   */
  admin: (): Partial<SearchPostType> => ({
    ...postSearchData.adminSearchParams,
  }),

  /**
   * @description 상태별 검색 파라미터 생성
   */
  byStatus: (status: 'draft' | 'writing' | 'published'): Partial<SearchPostType> => ({
    ...postSearchData.statusSearchParams[status],
  }),

  /**
   * @description 페이지네이션 파라미터 생성
   */
  withPagination: (page: number, pageSize: number): Partial<SearchPostType> => ({
    page,
    strtRow: (page - 1) * pageSize,
    endRow: page * pageSize,
    orderBy: 'LATEST',
  }),

  /**
   * @description 검색 키워드와 함께 파라미터 생성
   */
  withKeyword: (keyword: string, searchType?: 'pstTtl' | 'pstSmry'): Partial<SearchPostType> => ({
    ...postSearchData.defaultSearchParams,
    srchKywd: keyword,
    srchType: searchType,
  }),
};
