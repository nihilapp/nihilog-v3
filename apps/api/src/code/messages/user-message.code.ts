/**
 * 사용자 관련 메시지 코드
 */
export const USER_MESSAGES = {
  USER: {
    // 성공 메시지
    CREATE_SUCCESS: '사용자가 생성되었습니다.', // v
    UPDATE_SUCCESS: '사용자 정보가 수정되었습니다.', // v
    IMAGE_CHANGE_SUCCESS: '프로필 이미지가 변경되었습니다.', // v
    FETCH_SUCCESS: '사용자 정보를 조회했습니다.', // v
    LIST_SUCCESS: '사용자 목록을 조회했습니다.', // v
    DELETE_SUCCESS: '사용자가 삭제되었습니다.', // v
    DELETE_MULTIPLE_SUCCESS: '선택한 사용자들이 삭제되었습니다.',

    // 에러 메시지
    CREATE_ERROR: '사용자 생성에 실패했습니다.', // v
    UPDATE_ERROR: '사용자 정보 수정에 실패했습니다.', // v
    IMAGE_CHANGE_ERROR: '프로필 이미지 변경에 실패했습니다.', // v
    LIST_ERROR: '사용자 목록 조회에 실패했습니다.', // v
    NOT_FOUND: '사용자를 찾을 수 없습니다.', // v
    DELETE_ERROR: '사용자 삭제에 실패했습니다.', // v
    DELETE_MULTIPLE_ERROR: '다중 사용자 삭제에 실패했습니다.',
    VALIDATION_FAILED: '사용자 정보가 올바르지 않습니다.',
    INVALID_PARAMETER: '필수 사용자 정보가 누락되었습니다.', // v
    EMAIL_EXISTS: '이미 사용 중인 이메일입니다.', // v
    NAME_EXISTS: '이미 존재하는 이름입니다.', // v
    USERNAME_EXISTS: '이미 존재하는 사용자명입니다.', // v
    EMAIL_INVALID: '올바른 이메일 형식이 아닙니다.', // v
    NAME_TOO_SHORT: '사용자명은 2자 이상이어야 합니다.', // v
    NAME_TOO_LONG: '사용자명은 30자를 초과할 수 없습니다.', // v
    IMAGE_INVALID: '올바른 이미지 파일이 아닙니다.',
    INVALID_USER_NO: '유효하지 않은 사용자 번호입니다.', // v
  },

  // 사용자 통계 관련 메시지
  STATISTICS: {
    // 성공 메시지
    ANALYZE_SUCCESS: '사용자 분석 통계를 조회했습니다.', // v
    ACTIVE_USER_ANALYSIS_SUCCESS: '활성 사용자 분석을 조회했습니다.', // v
    TOP_CONTRIBUTION_SUCCESS: '사용자별 기여도 TOP N을 조회했습니다.', // v
    TOP_POST_COUNT_SUCCESS: '사용자별 포스트 작성 수 TOP N을 조회했습니다.', // v
    TOP_COMMENT_COUNT_SUCCESS: '사용자별 댓글 작성 수 TOP N을 조회했습니다.', // v
    ROLE_DISTRIBUTION_SUCCESS: '역할별 사용자 분포를 조회했습니다.', // v
    STATUS_DISTRIBUTION_SUCCESS: '상태별 사용자 분포를 조회했습니다.', // v
    INACTIVE_USERS_SUCCESS: '비활성 사용자 목록을 조회했습니다.', // v
    GROWTH_RATE_SUCCESS: '사용자 성장률을 조회했습니다.', // v
    RETENTION_RATE_SUCCESS: '사용자 유지율을 조회했습니다.', // v

    // 에러 메시지
    ANALYZE_ERROR: '사용자 분석 통계 조회에 실패했습니다.', // v
    ACTIVE_USER_ANALYSIS_ERROR: '활성 사용자 분석 조회에 실패했습니다.', // v
    TOP_CONTRIBUTION_ERROR: '사용자별 기여도 TOP N 조회에 실패했습니다.', // v
    TOP_POST_COUNT_ERROR: '사용자별 포스트 작성 수 TOP N 조회에 실패했습니다.', // v
    TOP_COMMENT_COUNT_ERROR: '사용자별 댓글 작성 수 TOP N 조회에 실패했습니다.', // v
    ROLE_DISTRIBUTION_ERROR: '역할별 사용자 분포 조회에 실패했습니다.', // v
    STATUS_DISTRIBUTION_ERROR: '상태별 사용자 분포 조회에 실패했습니다.', // v
    INACTIVE_USERS_ERROR: '비활성 사용자 목록 조회에 실패했습니다.', // v
    GROWTH_RATE_ERROR: '사용자 성장률 조회에 실패했습니다.', // v
    RETENTION_RATE_ERROR: '사용자 유지율 조회에 실패했습니다.', // v
    INVALID_DAYS_THRESHOLD: '비활성 기준 일수는 1일부터 365일 사이여야 합니다.', // v
  },
} as const;
