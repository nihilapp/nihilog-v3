/**
 * 댓글 관련 메시지 코드
 */
export const COMMENT_MESSAGES = {
  USER: {
    // 성공 메시지
    SEARCH_SUCCESS: '댓글 목록을 조회했습니다.',
    GET_SUCCESS: '댓글 정보를 조회했습니다.',
    CREATE_SUCCESS: '댓글이 작성되었습니다.',
    UPDATE_SUCCESS: '댓글이 수정되었습니다.',
    DELETE_SUCCESS: '댓글이 삭제되었습니다.',

    // 에러 메시지
    SEARCH_ERROR: '댓글 목록 조회에 실패했습니다.',
    GET_ERROR: '댓글 정보 조회에 실패했습니다.',
    CREATE_ERROR: '댓글 작성에 실패했습니다.',
    UPDATE_ERROR: '댓글 수정에 실패했습니다.',
    DELETE_ERROR: '댓글 삭제에 실패했습니다.',
    NOT_FOUND: '댓글을 찾을 수 없습니다.',
    ALREADY_DELETED: '이미 삭제된 댓글입니다.',
    INVALID_STATUS: '유효하지 않은 댓글 상태입니다.',
    CONTENT_REQUIRED: '댓글 내용은 필수 입력 항목입니다.',
    CONTENT_TOO_LONG: '댓글 내용이 너무 깁니다. (최대 1000자)',
    POST_NOT_FOUND: '댓글을 작성할 포스트를 찾을 수 없습니다.',
    PARENT_NOT_FOUND: '답글을 작성할 댓글을 찾을 수 없습니다.',
    UNAUTHORIZED: '댓글을 수정/삭제할 권한이 없습니다.',
  },

  ADMIN: {
    // 성공 메시지
    SEARCH_SUCCESS: '관리자 댓글 검색을 완료했습니다.',
    GET_SUCCESS: '관리자 댓글 정보를 조회했습니다.',
    UPDATE_SUCCESS: '댓글이 수정되었습니다.',
    MULTIPLE_UPDATE_SUCCESS: '다수 댓글이 수정되었습니다.',
    DELETE_SUCCESS: '댓글이 삭제되었습니다.',
    MULTIPLE_DELETE_SUCCESS: '다수 댓글이 삭제되었습니다.',
    APPROVE_SUCCESS: '댓글이 승인되었습니다.',
    REJECT_SUCCESS: '댓글이 거부되었습니다.',
    SPAM_SUCCESS: '댓글이 스팸으로 처리되었습니다.',
    ANALYZE_SUCCESS: '댓글 분석 통계를 조회했습니다.',
    STATISTICS_SUCCESS: '댓글 통계를 조회했습니다.',

    // 에러 메시지
    SEARCH_ERROR: '관리자 댓글 검색에 실패했습니다.',
    GET_ERROR: '관리자 댓글 정보 조회에 실패했습니다.',
    UPDATE_ERROR: '댓글 수정에 실패했습니다.',
    MULTIPLE_UPDATE_ERROR: '다수 댓글 수정에 실패했습니다.',
    DELETE_ERROR: '댓글 삭제에 실패했습니다.',
    MULTIPLE_DELETE_ERROR: '다수 댓글 삭제에 실패했습니다.',
    APPROVE_ERROR: '댓글 승인에 실패했습니다.',
    REJECT_ERROR: '댓글 거부에 실패했습니다.',
    SPAM_ERROR: '댓글 스팸 처리에 실패했습니다.',
    ANALYZE_ERROR: '댓글 분석 통계 조회에 실패했습니다.',
    STATISTICS_ERROR: '댓글 통계 조회에 실패했습니다.',
    NOT_FOUND: '관리할 댓글을 찾을 수 없습니다.',
    ALREADY_APPROVED: '이미 승인된 댓글입니다.',
    ALREADY_REJECTED: '이미 거부된 댓글입니다.',
    ALREADY_SPAM: '이미 스팸으로 처리된 댓글입니다.',
    INVALID_STATUS: '유효하지 않은 댓글 상태입니다.',
    STATUS_REQUIRED: '댓글 상태는 필수 입력 항목입니다.',
  },
} as const;
