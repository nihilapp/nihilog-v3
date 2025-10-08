/**
 * 사용자 관련 메시지 코드
 */
export const USER_MESSAGES = {
  USER: {
    // 성공 메시지
    CREATE_SUCCESS: '사용자가 생성되었습니다.',
    UPDATE_SUCCESS: '사용자 정보가 수정되었습니다.',
    PASSWORD_CHANGE_SUCCESS: '비밀번호가 변경되었습니다.',
    IMAGE_CHANGE_SUCCESS: '프로필 이미지가 변경되었습니다.',
    SEARCH_SUCCESS: '사용자 검색을 완료했습니다.',
    FETCH_SUCCESS: '사용자 정보를 조회했습니다.',
    DELETE_SUCCESS: '사용자가 삭제되었습니다.',

    // 에러 메시지
    CREATE_ERROR: '사용자 생성에 실패했습니다.',
    UPDATE_ERROR: '사용자 정보 수정에 실패했습니다.',
    PASSWORD_CHANGE_ERROR: '비밀번호 변경에 실패했습니다.',
    IMAGE_CHANGE_ERROR: '프로필 이미지 변경에 실패했습니다.',
    SEARCH_ERROR: '사용자 검색에 실패했습니다.',
    FETCH_ERROR: '사용자 정보 조회에 실패했습니다.',
    INFO_NOT_FOUND: '사용자 정보를 찾을 수 없습니다.',
    DELETE_ERROR: '사용자 삭제에 실패했습니다.',
    EMAIL_EXISTS: '이미 사용 중인 이메일입니다.',
    NAME_EXISTS: '이미 존재하는 이름입니다.',
    NOT_FOUND: '사용자를 찾을 수 없습니다.',
    ADMIN_NOT_FOUND: '관리자를 찾을 수 없습니다.',
  },

  PROFILE: {
    // 조회 관련
    GET_SUCCESS: '프로필 정보를 조회했습니다.',
    GET_BY_EMAIL_SUCCESS: '이메일로 프로필을 조회했습니다.',
    LIST_SUCCESS: '프로필 목록을 조회했습니다.',
    NOT_FOUND: '해당 프로필을 찾을 수 없습니다.',

    // 생성/수정 관련
    CREATE_SUCCESS: '프로필이 생성되었습니다.',
    UPDATE_SUCCESS: '프로필 정보가 수정되었습니다.',
    PROFILE_UPDATE_SUCCESS: '프로필이 성공적으로 업데이트되었습니다.',

    // 삭제 관련
    DELETE_SUCCESS: '프로필이 삭제되었습니다.',
    DELETE_MULTIPLE_SUCCESS: '선택한 프로필들이 삭제되었습니다.',

    // 중복 체크 관련
    EMAIL_EXISTS: '이미 사용 중인 이메일입니다.',
    USERNAME_EXISTS: '이미 존재하는 사용자명입니다.',

    // 비밀번호 관련
    PASSWORD_CHANGE_SUCCESS: '비밀번호가 변경되었습니다.',
    INVALID_PASSWORD: '현재 비밀번호가 올바르지 않습니다.',

    // 이미지 관련
    IMAGE_CHANGE_SUCCESS: '프로필 이미지가 변경되었습니다.',

    // 에러 메시지
    GET_ERROR: '프로필 정보 조회에 실패했습니다.',
    GET_BY_EMAIL_ERROR: '이메일로 프로필 조회에 실패했습니다.',
    SEARCH_ERROR: '프로필 목록 조회에 실패했습니다.',
    CREATE_ERROR: '프로필 생성에 실패했습니다.',
    UPDATE_ERROR: '프로필 정보 수정에 실패했습니다.',
    DELETE_ERROR: '프로필 삭제에 실패했습니다.',
    DELETE_MULTIPLE_ERROR: '다중 프로필 삭제에 실패했습니다.',
    PASSWORD_CHANGE_ERROR: '비밀번호 변경에 실패했습니다.',
    IMAGE_CHANGE_ERROR: '프로필 이미지 변경에 실패했습니다.',
    UPDATE_FAILED: '프로필 업데이트에 실패했습니다.',
    VALIDATION_FAILED: '프로필 정보가 올바르지 않습니다.',
    DATA_REQUIRED: '필수 프로필 정보가 누락되었습니다.',
    EMAIL_INVALID: '올바른 이메일 형식이 아닙니다.',
    NAME_REQUIRED: '이름은 필수 입력 항목입니다.',
    NAME_TOO_LONG: '이름은 50자를 초과할 수 없습니다.',
    BIO_TOO_LONG: '자기소개는 500자를 초과할 수 없습니다.',
    IMAGE_INVALID: '올바른 이미지 파일이 아닙니다.',
    PROFILE_UPDATE_FAILED: '프로필 업데이트에 실패했습니다.',
    PROFILE_VALIDATION_FAILED: '프로필 정보가 유효하지 않습니다.',
    PROFILE_DATA_REQUIRED: '프로필 데이터가 필요합니다.',
    PROFILE_EMAIL_INVALID: '유효하지 않은 이메일 형식입니다.',
    PROFILE_NAME_REQUIRED: '사용자명은 필수 입력 항목입니다.',
    PROFILE_NAME_TOO_LONG: '사용자명이 너무 깁니다. (최대 50자)',
    PROFILE_BIO_TOO_LONG: '소개가 너무 깁니다. (최대 500자)',
    PROFILE_IMAGE_INVALID: '유효하지 않은 프로필 이미지입니다.',
  },
} as const;
