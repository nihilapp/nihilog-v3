/**
 * 카테고리 관련 메시지 코드
 */
export const CATEGORY_MESSAGES = {
  USER: {
    // 성공 메시지
    SEARCH_SUCCESS: '카테고리 목록을 조회했습니다.',
    GET_SUCCESS: '카테고리 정보를 조회했습니다.',
    GET_BY_NAME_SUCCESS: '카테고리명으로 카테고리를 조회했습니다.',

    // 에러 메시지
    SEARCH_ERROR: '카테고리 목록 조회에 실패했습니다.',
    GET_ERROR: '카테고리 정보 조회에 실패했습니다.',
    GET_BY_NAME_ERROR: '카테고리명으로 카테고리 조회에 실패했습니다.',
    NOT_FOUND: '카테고리를 찾을 수 없습니다.',
    NAME_NOT_FOUND: '해당 이름의 카테고리를 찾을 수 없습니다.',
  },

  ADMIN: {
    // 성공 메시지
    SEARCH_SUCCESS: '관리자 카테고리 목록을 조회했습니다.',
    GET_SUCCESS: '관리자 카테고리 정보를 조회했습니다.',
    GET_BY_NAME_SUCCESS: '관리자 카테고리명으로 카테고리를 조회했습니다.',
    CREATE_SUCCESS: '카테고리가 생성되었습니다.',
    MULTIPLE_CREATE_SUCCESS: '다수 카테고리가 생성되었습니다.',
    UPDATE_SUCCESS: '카테고리가 수정되었습니다.',
    MULTIPLE_UPDATE_SUCCESS: '다수 카테고리가 수정되었습니다.',
    DELETE_SUCCESS: '카테고리가 삭제되었습니다.',
    MULTIPLE_DELETE_SUCCESS: '다수 카테고리가 삭제되었습니다.',

    // 에러 메시지
    SEARCH_ERROR: '관리자 카테고리 목록 조회에 실패했습니다.',
    GET_ERROR: '관리자 카테고리 정보 조회에 실패했습니다.',
    GET_BY_NAME_ERROR: '관리자 카테고리명으로 카테고리 조회에 실패했습니다.',
    CREATE_ERROR: '카테고리 생성에 실패했습니다.',
    MULTIPLE_CREATE_ERROR: '다수 카테고리 생성에 실패했습니다.',
    UPDATE_ERROR: '카테고리 수정에 실패했습니다.',
    MULTIPLE_UPDATE_ERROR: '다수 카테고리 수정에 실패했습니다.',
    DELETE_ERROR: '카테고리 삭제에 실패했습니다.',
    MULTIPLE_DELETE_ERROR: '다수 카테고리 삭제에 실패했습니다.',
    NOT_FOUND: '관리할 카테고리를 찾을 수 없습니다.',
    NAME_NOT_FOUND: '해당 이름의 관리자 카테고리를 찾을 수 없습니다.',
    NAME_IN_USE: '이미 사용 중인 카테고리 이름입니다.',
    NAME_REQUIRED: '카테고리 이름은 필수 입력 항목입니다.',
    PARENT_NOT_FOUND: '상위 카테고리를 찾을 수 없습니다.',
  },
} as const;
