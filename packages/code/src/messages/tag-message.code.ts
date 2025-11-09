/**
 * 태그 관련 메시지 코드
 */
export const TAG_MESSAGES = {
  USER: {
    // 성공 메시지
    SEARCH_SUCCESS: '태그 목록을 조회했습니다.',
    GET_SUCCESS: '태그 정보를 조회했습니다.',
    GET_BY_NAME_SUCCESS: '태그명으로 태그를 조회했습니다.',

    // 에러 메시지
    SEARCH_ERROR: '태그 목록 조회에 실패했습니다.',
    GET_ERROR: '태그 정보 조회에 실패했습니다.',
    GET_BY_NAME_ERROR: '태그명으로 태그 조회에 실패했습니다.',
    NOT_FOUND: '태그를 찾을 수 없습니다.',
    NAME_NOT_FOUND: '해당 이름의 태그를 찾을 수 없습니다.',
  },

  ADMIN: {
    // 성공 메시지
    CREATE_SUCCESS: '태그가 생성되었습니다.',
    MULTIPLE_CREATE_SUCCESS: '다수 태그가 생성되었습니다.',
    UPDATE_SUCCESS: '태그가 수정되었습니다.',
    MULTIPLE_UPDATE_SUCCESS: '다수 태그가 수정되었습니다.',
    DELETE_SUCCESS: '태그가 삭제되었습니다.',
    MULTIPLE_DELETE_SUCCESS: '다수 태그가 삭제되었습니다.',
    SEARCH_SUCCESS: '태그 검색을 완료했습니다.',
    ANALYZE_SUCCESS: '태그 분석 통계를 조회했습니다.',
    STATISTICS_SUCCESS: '태그 통계를 조회했습니다.',

    // 에러 메시지
    CREATE_ERROR: '태그 생성에 실패했습니다.',
    MULTIPLE_CREATE_ERROR: '다수 태그 생성에 실패했습니다.',
    UPDATE_ERROR: '태그 수정에 실패했습니다.',
    MULTIPLE_UPDATE_ERROR: '다수 태그 수정에 실패했습니다.',
    DELETE_ERROR: '태그 삭제에 실패했습니다.',
    MULTIPLE_DELETE_ERROR: '다수 태그 삭제에 실패했습니다.',
    SEARCH_ERROR: '태그 검색에 실패했습니다.',
    ANALYZE_ERROR: '태그 분석 통계 조회에 실패했습니다.',
    STATISTICS_ERROR: '태그 통계 조회에 실패했습니다.',
    NOT_FOUND: '태그를 찾을 수 없습니다.',
    ALREADY_EXISTS: '이미 존재하는 태그입니다.',
    NAME_IN_USE: '이미 사용 중인 태그 이름입니다.',
    NAME_REQUIRED: '태그 이름은 필수 입력 항목입니다.',
    SLUG_DUPLICATE: '이미 존재하는 태그 슬러그입니다.',

    // 태그 매핑 관련
    MAPPING_SEARCH_SUCCESS: '태그 매핑 검색을 완료했습니다.',
    MAPPING_CREATE_SUCCESS: '태그 매핑이 생성되었습니다.',
    MAPPING_DELETE_SUCCESS: '태그 매핑이 삭제되었습니다.',
    MAPPING_ALREADY_EXISTS: '이미 태그 매핑이 존재합니다.',
    MAPPING_SEARCH_ERROR: '태그 매핑 검색에 실패했습니다.',
    MAPPING_CREATE_ERROR: '태그 매핑 생성에 실패했습니다.',
    MAPPING_DELETE_ERROR: '태그 매핑 삭제에 실패했습니다.',

    // 태그 통계 관련
    TOP_USED_SUCCESS: '태그 사용 횟수 TOP N을 조회했습니다.',
    TOP_USED_ERROR: '태그 사용 횟수 TOP N 조회에 실패했습니다.',
    USAGE_TREND_SUCCESS: '태그 사용 추이를 조회했습니다.',
    USAGE_TREND_ERROR: '태그 사용 추이 조회에 실패했습니다.',
    UNUSED_SUCCESS: '미사용 태그 목록을 조회했습니다.',
    UNUSED_ERROR: '미사용 태그 목록 조회에 실패했습니다.',
    TOP_SUBSCRIBERS_SUCCESS: '태그별 구독자 수 TOP N을 조회했습니다.',
    TOP_SUBSCRIBERS_ERROR: '태그별 구독자 수 TOP N 조회에 실패했습니다.',
    SUBSCRIBER_GROWTH_SUCCESS: '태그별 구독자 성장률을 조회했습니다.',
    SUBSCRIBER_GROWTH_ERROR: '태그별 구독자 성장률 조회에 실패했습니다.',
    NO_SUBSCRIBERS_SUCCESS: '구독자 없는 태그 목록을 조회했습니다.',
    NO_SUBSCRIBERS_ERROR: '구독자 없는 태그 목록 조회에 실패했습니다.',
    EFFICIENCY_SUCCESS: '태그별 사용 효율성을 조회했습니다.',
    EFFICIENCY_ERROR: '태그별 사용 효율성 조회에 실패했습니다.',
    FREQUENCY_SUCCESS: '태그별 평균 사용 빈도를 조회했습니다.',
    FREQUENCY_ERROR: '태그별 평균 사용 빈도 조회에 실패했습니다.',
    LIFECYCLE_SUCCESS: '태그 생명주기 분석을 조회했습니다.',
    LIFECYCLE_ERROR: '태그 생명주기 분석 조회에 실패했습니다.',
    STATUS_DISTRIBUTION_SUCCESS: '태그 상태별 분포를 조회했습니다.',
    STATUS_DISTRIBUTION_ERROR: '태그 상태별 분포 조회에 실패했습니다.',
    CREATOR_STATS_SUCCESS: '태그 생성자별 통계를 조회했습니다.',
    CREATOR_STATS_ERROR: '태그 생성자별 통계 조회에 실패했습니다.',
    CLEANUP_SUCCESS: '태그 정리 필요도를 조회했습니다.',
    CLEANUP_ERROR: '태그 정리 필요도 조회에 실패했습니다.',
  },
} as const;

