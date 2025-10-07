/**
 * 구독 관련 메시지 코드
 */
export const SUBSCRIBE_MESSAGES = {
  USER: {
    // 일반 구독 설정 성공 메시지
    FETCH_SUCCESS: '구독 설정을 조회했습니다.',
    UPDATE_SUCCESS: '구독 설정이 수정되었습니다.',
    CREATE_SUCCESS: '구독 설정이 생성되었습니다.',
    DELETE_SUCCESS: '구독 설정이 삭제되었습니다.',
    SEARCH_SUCCESS: '구독 설정 검색을 완료했습니다.',
    MULTIPLE_CREATE_SUCCESS: '다수 구독 설정이 생성되었습니다.',
    MULTIPLE_UPDATE_SUCCESS: '다수 구독 설정이 수정되었습니다.',
    MULTIPLE_DELETE_SUCCESS: '다수 구독 설정이 삭제되었습니다.',

    // 일반 구독 설정 에러 메시지
    FETCH_ERROR: '구독 설정 조회에 실패했습니다.',
    UPDATE_ERROR: '구독 설정 수정에 실패했습니다.',
    CREATE_ERROR: '구독 설정 생성에 실패했습니다.',
    DELETE_ERROR: '구독 설정 삭제에 실패했습니다.',
    NOT_FOUND: '구독 설정을 찾을 수 없습니다.',
    SEARCH_ERROR: '구독 검색에 실패했습니다.',
    MULTIPLE_CREATE_ERROR: '다수 구독 설정 생성에 실패했습니다.',
    MULTIPLE_UPDATE_ERROR: '다수 구독 설정 수정에 실패했습니다.',
    MULTIPLE_DELETE_ERROR: '다수 구독 설정 삭제에 실패했습니다.',
    EMAIL_NOTIFICATION_ERROR: '이메일 알림 설정에 실패했습니다.',
    PUSH_NOTIFICATION_ERROR: '푸시 알림 설정에 실패했습니다.',
    CATEGORY_LIST_INVALID: '구독 카테고리 목록이 올바르지 않습니다.',
    TAG_LIST_INVALID: '구독 태그 목록이 올바르지 않습니다.',
    ALREADY_EXISTS: '이미 구독 중인 항목입니다.',
    DUPLICATE_CATEGORY: '중복된 카테고리 구독입니다.',
    DUPLICATE_TAG: '중복된 태그 구독입니다.',
  },

  ADMIN: {
    // 관리자 구독 관리 성공 메시지
    SEARCH_SUCCESS: '전체 사용자 구독 설정 검색을 완료했습니다.',
    CREATE_SUCCESS: '사용자 구독 설정이 생성되었습니다.',
    MULTIPLE_CREATE_SUCCESS: '다수 사용자 구독 설정이 생성되었습니다.',
    MULTIPLE_UPDATE_SUCCESS: '다수 사용자 구독 설정이 수정되었습니다.',
    DELETE_SUCCESS: '사용자 구독 설정이 삭제되었습니다.',
    MULTIPLE_DELETE_SUCCESS: '다수 사용자 구독 설정이 삭제되었습니다.',

    // 관리자 구독 관리 에러 메시지
    SEARCH_ERROR: '전체 사용자 구독 설정 검색에 실패했습니다.',
    CREATE_ERROR: '사용자 구독 설정 생성에 실패했습니다.',
    MULTIPLE_CREATE_ERROR: '다수 사용자 구독 설정 생성에 실패했습니다.',
    MULTIPLE_UPDATE_ERROR: '다수 사용자 구독 설정 수정에 실패했습니다.',
    DELETE_ERROR: '사용자 구독 설정 삭제에 실패했습니다.',
    MULTIPLE_DELETE_ERROR: '다수 사용자 구독 설정 삭제에 실패했습니다.',
    ALREADY_EXISTS: '이미 구독 설정이 존재합니다.',
    ALREADY_DELETED: '이미 삭제된 구독 설정입니다.',
    INVALID_USER_LIST: '유효하지 않은 사용자 목록입니다.',
  },

  CATEGORY: {
    // 카테고리 구독 성공 메시지
    CREATE_SUCCESS: '카테고리 구독이 설정되었습니다.',
    UPDATE_SUCCESS: '카테고리 구독이 수정되었습니다.',
    DELETE_SUCCESS: '카테고리 구독이 해제되었습니다.',
    SEARCH_SUCCESS: '카테고리 구독 검색을 완료했습니다.',
    MULTIPLE_CREATE_SUCCESS: '다수 카테고리 구독이 설정되었습니다.',
    MULTIPLE_UPDATE_SUCCESS: '다수 카테고리 구독이 수정되었습니다.',
    MULTIPLE_DELETE_SUCCESS: '다수 카테고리 구독이 해제되었습니다.',

    // 카테고리 구독 에러 메시지
    CREATE_ERROR: '카테고리 구독 설정에 실패했습니다.',
    UPDATE_ERROR: '카테고리 구독 수정에 실패했습니다.',
    DELETE_ERROR: '카테고리 구독 해제에 실패했습니다.',
    NOT_FOUND: '카테고리 구독을 찾을 수 없습니다.',
    SEARCH_ERROR: '카테고리 구독 검색에 실패했습니다.',
    MULTIPLE_CREATE_ERROR: '다수 카테고리 구독 설정에 실패했습니다.',
    MULTIPLE_UPDATE_ERROR: '다수 카테고리 구독 수정에 실패했습니다.',
    MULTIPLE_DELETE_ERROR: '다수 카테고리 구독 해제에 실패했습니다.',
    ALREADY_EXISTS: '이미 구독 중인 카테고리입니다.',

    // 관리자 카테고리 구독 관리
    ADMIN_SEARCH_SUCCESS: '관리자 카테고리 구독 검색을 완료했습니다.',
    ADMIN_BY_CATEGORY_SUCCESS: '카테고리별 구독자 목록을 조회했습니다.',
    ADMIN_CREATE_SUCCESS: '관리자가 카테고리 구독을 생성했습니다.',
    ADMIN_MULTIPLE_CREATE_SUCCESS: '관리자가 다수 카테고리 구독을 생성했습니다.',
    ADMIN_UPDATE_SUCCESS: '관리자가 카테고리 구독을 수정했습니다.',
    ADMIN_MULTIPLE_UPDATE_SUCCESS: '관리자가 다수 카테고리 구독을 수정했습니다.',
    ADMIN_DELETE_SUCCESS: '관리자가 카테고리 구독을 삭제했습니다.',
    ADMIN_MULTIPLE_DELETE_SUCCESS: '관리자가 다수 카테고리 구독을 삭제했습니다.',
    ADMIN_SEARCH_ERROR: '관리자 카테고리 구독 검색에 실패했습니다.',
    ADMIN_BY_CATEGORY_ERROR: '카테고리별 구독자 조회에 실패했습니다.',
    ADMIN_CREATE_ERROR: '관리자 카테고리 구독 생성에 실패했습니다.',
    ADMIN_MULTIPLE_CREATE_ERROR: '관리자 다수 카테고리 구독 생성에 실패했습니다.',
    ADMIN_UPDATE_ERROR: '관리자 카테고리 구독 수정에 실패했습니다.',
    ADMIN_MULTIPLE_UPDATE_ERROR: '관리자 다수 카테고리 구독 수정에 실패했습니다.',
    ADMIN_DELETE_ERROR: '관리자 카테고리 구독 삭제에 실패했습니다.',
    ADMIN_MULTIPLE_DELETE_ERROR: '관리자 다수 카테고리 구독 삭제에 실패했습니다.',
  },

  TAG: {
    // 태그 구독 성공 메시지
    CREATE_SUCCESS: '태그 구독이 설정되었습니다.',
    UPDATE_SUCCESS: '태그 구독이 수정되었습니다.',
    DELETE_SUCCESS: '태그 구독이 해제되었습니다.',
    SEARCH_SUCCESS: '태그 구독 검색을 완료했습니다.',
    MULTIPLE_CREATE_SUCCESS: '다수 태그 구독이 설정되었습니다.',
    MULTIPLE_UPDATE_SUCCESS: '다수 태그 구독이 수정되었습니다.',
    MULTIPLE_DELETE_SUCCESS: '다수 태그 구독이 해제되었습니다.',

    // 태그 구독 에러 메시지
    CREATE_ERROR: '태그 구독 설정에 실패했습니다.',
    UPDATE_ERROR: '태그 구독 수정에 실패했습니다.',
    DELETE_ERROR: '태그 구독 해제에 실패했습니다.',
    NOT_FOUND: '태그 구독을 찾을 수 없습니다.',
    SEARCH_ERROR: '태그 구독 검색에 실패했습니다.',
    MULTIPLE_CREATE_ERROR: '다수 태그 구독 설정에 실패했습니다.',
    MULTIPLE_UPDATE_ERROR: '다수 태그 구독 수정에 실패했습니다.',
    MULTIPLE_DELETE_ERROR: '다수 태그 구독 해제에 실패했습니다.',
    ALREADY_EXISTS: '이미 구독 중인 태그입니다.',

    // 관리자 태그 구독 관리
    ADMIN_SEARCH_SUCCESS: '관리자 태그 구독 검색을 완료했습니다.',
    ADMIN_BY_TAG_SUCCESS: '태그별 구독자 목록을 조회했습니다.',
    ADMIN_CREATE_SUCCESS: '관리자가 태그 구독을 생성했습니다.',
    ADMIN_MULTIPLE_CREATE_SUCCESS: '관리자가 다수 태그 구독을 생성했습니다.',
    ADMIN_UPDATE_SUCCESS: '관리자가 태그 구독을 수정했습니다.',
    ADMIN_MULTIPLE_UPDATE_SUCCESS: '관리자가 다수 태그 구독을 수정했습니다.',
    ADMIN_DELETE_SUCCESS: '관리자가 태그 구독을 삭제했습니다.',
    ADMIN_MULTIPLE_DELETE_SUCCESS: '관리자가 다수 태그 구독을 삭제했습니다.',
    ADMIN_SEARCH_ERROR: '관리자 태그 구독 검색에 실패했습니다.',
    ADMIN_BY_TAG_ERROR: '태그별 구독자 조회에 실패했습니다.',
    ADMIN_CREATE_ERROR: '관리자 태그 구독 생성에 실패했습니다.',
    ADMIN_MULTIPLE_CREATE_ERROR: '관리자 다수 태그 구독 생성에 실패했습니다.',
    ADMIN_UPDATE_ERROR: '관리자 태그 구독 수정에 실패했습니다.',
    ADMIN_MULTIPLE_UPDATE_ERROR: '관리자 다수 태그 구독 수정에 실패했습니다.',
    ADMIN_DELETE_ERROR: '관리자 태그 구독 삭제에 실패했습니다.',
    ADMIN_MULTIPLE_DELETE_ERROR: '관리자 다수 태그 구독 삭제에 실패했습니다.',
  },
} as const;
