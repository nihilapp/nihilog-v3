/**
 * 포스트 관련 메시지 코드
 */
export const POST_MESSAGES = {
  USER: {
    // 성공 메시지
    SEARCH_SUCCESS: '포스트 목록을 조회했습니다.',
    GET_SUCCESS: '포스트 정보를 조회했습니다.',
    GET_BY_SLUG_SUCCESS: '포스트를 조회했습니다.',
    GET_BY_TAG_SUCCESS: '태그별 포스트 목록을 조회했습니다.',
    GET_BY_CATEGORY_SUCCESS: '카테고리별 포스트 목록을 조회했습니다.',
    GET_ARCHIVE_SUCCESS: '아카이브 포스트 목록을 조회했습니다.',
    SHARE_SUCCESS: '포스트를 공유했습니다.',
    VIEW_STATS_SUCCESS: '포스트 조회수 통계를 조회했습니다.',
    SHARE_STATS_SUCCESS: '포스트 공유 통계를 조회했습니다.',
    VIEW_LOG_SUCCESS: '포스트 조회 로그를 기록했습니다.',
    SHARE_LOG_SUCCESS: '포스트 공유 로그를 기록했습니다.',

    // 에러 메시지
    SEARCH_ERROR: '포스트 목록 조회에 실패했습니다.',
    GET_ERROR: '포스트 정보 조회에 실패했습니다.',
    GET_BY_SLUG_ERROR: '포스트 조회에 실패했습니다.',
    GET_BY_TAG_ERROR: '태그별 포스트 목록 조회에 실패했습니다.',
    GET_BY_CATEGORY_ERROR: '카테고리별 포스트 목록 조회에 실패했습니다.',
    GET_ARCHIVE_ERROR: '아카이브 포스트 목록 조회에 실패했습니다.',
    SHARE_ERROR: '포스트 공유에 실패했습니다.',
    VIEW_STATS_ERROR: '포스트 조회수 통계 조회에 실패했습니다.',
    SHARE_STATS_ERROR: '포스트 공유 통계 조회에 실패했습니다.',
    NOT_FOUND: '포스트를 찾을 수 없습니다.',
    INVALID_SLUG: '유효하지 않은 포스트 슬러그입니다.',
    INVALID_TAG: '유효하지 않은 태그입니다.',
    INVALID_CATEGORY: '유효하지 않은 카테고리입니다.',
    INVALID_ARCHIVE_DATE: '유효하지 않은 아카이브 날짜입니다.',
    VIEW_LOG_ERROR: '포스트 조회 로그 기록에 실패했습니다.',
    SHARE_LOG_ERROR: '포스트 공유 로그 기록에 실패했습니다.',
  },

  ADMIN: {
    // 성공 메시지
    CREATE_SUCCESS: '포스트가 생성되었습니다.',
    UPDATE_SUCCESS: '포스트 정보가 수정되었습니다.',
    MULTIPLE_UPDATE_SUCCESS: '다수 포스트가 수정되었습니다.',
    DELETE_SUCCESS: '포스트가 삭제되었습니다.',
    MULTIPLE_DELETE_SUCCESS: '다수 포스트가 삭제되었습니다.',
    SEARCH_SUCCESS: '관리자 포스트 검색을 완료했습니다.',
    STATISTICS_SUCCESS: '포스트 통계를 조회했습니다.',
    FEATURE_SUCCESS: '포스트가 추천으로 설정되었습니다.',
    FEATURE_CANCEL_SUCCESS: '포스트 추천이 해제되었습니다.',
    PIN_SUCCESS: '포스트가 고정되었습니다.',
    PIN_CANCEL_SUCCESS: '포스트 고정이 해제되었습니다.',

    // 에러 메시지
    CREATE_ERROR: '포스트 생성에 실패했습니다.',
    UPDATE_ERROR: '포스트 정보 수정에 실패했습니다.',
    MULTIPLE_UPDATE_ERROR: '다수 포스트 수정에 실패했습니다.',
    DELETE_ERROR: '포스트 삭제에 실패했습니다.',
    MULTIPLE_DELETE_ERROR: '다수 포스트 삭제에 실패했습니다.',
    SEARCH_ERROR: '관리자 포스트 검색에 실패했습니다.',
    STATISTICS_ERROR: '포스트 통계 조회에 실패했습니다.',
    FEATURE_ERROR: '포스트 추천 설정에 실패했습니다.',
    PIN_ERROR: '포스트 고정 설정에 실패했습니다.',
    NOT_FOUND: '관리할 포스트를 찾을 수 없습니다.',
    ALREADY_FEATURED: '이미 추천된 포스트입니다.',
    ALREADY_PINNED: '이미 고정된 포스트입니다.',
    NOT_FEATURED: '추천되지 않은 포스트입니다.',
    NOT_PINNED: '고정되지 않은 포스트입니다.',
    INVALID_STATUS: '유효하지 않은 포스트 상태입니다.',
    INVALID_CATEGORY: '유효하지 않은 카테고리입니다.',
    INVALID_TAG: '유효하지 않은 태그입니다.',
    CONTENT_REQUIRED: '포스트 내용은 필수 입력 항목입니다.',
    TITLE_REQUIRED: '포스트 제목은 필수 입력 항목입니다.',
    TITLE_TOO_LONG: '포스트 제목이 너무 깁니다. (최대 200자)',
    CONTENT_TOO_LONG: '포스트 내용이 너무 깁니다. (최대 10000자)',
    SLUG_INVALID: '유효하지 않은 포스트 슬러그입니다.',
    SLUG_DUPLICATE: '이미 존재하는 포스트 슬러그입니다.',
    TITLE_DUPLICATE: '이미 존재하는 포스트 제목입니다.',
    UNAUTHORIZED_AUTHOR: '본인이 작성한 포스트만 수정할 수 있습니다.',
  },

  LIKE: {
    // 성공 메시지
    SUCCESS: '포스트에 좋아요를 눌렀습니다.',
    CANCEL_SUCCESS: '포스트 좋아요를 취소했습니다.',

    // 에러 메시지
    ERROR: '포스트 좋아요 처리에 실패했습니다.',
    ALREADY_LIKED: '이미 좋아요를 누른 포스트입니다.',
    NOT_LIKED: '좋아요를 누르지 않은 포스트입니다.',
  },

  BOOKMARK: {
    // 성공 메시지
    SUCCESS: '포스트를 북마크했습니다.',
    CANCEL_SUCCESS: '포스트 북마크를 취소했습니다.',
    CREATE_SUCCESS: '포스트 북마크가 생성되었습니다.',
    DELETE_SUCCESS: '포스트 북마크가 삭제되었습니다.',
    UPDATE_SUCCESS: '포스트 북마크가 수정되었습니다.',
    GET_SUCCESS: '포스트 북마크 정보를 조회했습니다.',
    SEARCH_SUCCESS: '북마크한 포스트 검색을 완료했습니다.',

    // 에러 메시지
    ERROR: '포스트 북마크 처리에 실패했습니다.',
    CREATE_ERROR: '포스트 북마크 생성에 실패했습니다.',
    DELETE_ERROR: '포스트 북마크 삭제에 실패했습니다.',
    UPDATE_ERROR: '포스트 북마크 수정에 실패했습니다.',
    GET_ERROR: '포스트 북마크 정보 조회에 실패했습니다.',
    SEARCH_ERROR: '북마크한 포스트 검색에 실패했습니다.',
    ALREADY_BOOKMARKED: '이미 북마크한 포스트입니다.',
    NOT_BOOKMARKED: '북마크하지 않은 포스트입니다.',
  },
} as const;
