/**
 * 메시지 코드 통합 파일
 *
 * 모든 엔티티별 메시지를 하나의 객체로 통합하여 export
 *
 * 사용 예시:
 * - MESSAGE_CODE.AUTH.USER.SIGN_IN_SUCCESS
 * - MESSAGE_CODE.CATEGORY.ADMIN.CREATE_SUCCESS
 * - MESSAGE_CODE.POST.BOOKMARK.CREATE_SUCCESS
 * - MESSAGE_CODE.SUBSCRIBE.CATEGORY.CREATE_SUCCESS
 */

import { COMMON_MESSAGES } from '@/code/messages/common-message.code';

import { AUTH_MESSAGES } from './auth-message.code';
import { CATEGORY_MESSAGES } from './category-message.code';
import { COMMENT_MESSAGES } from './comment-message.code';
import { DB_MESSAGES } from './db-message.code';
import { POST_MESSAGES } from './post-message.code';
import { SUBSCRIBE_MESSAGES } from './subscribe-message.code';
import { TAG_MESSAGES } from './tag-message.code';
import { USER_MESSAGES } from './user-message.code';

export const MESSAGE = {
  COMMON: COMMON_MESSAGES,
  AUTH: AUTH_MESSAGES,
  USER: USER_MESSAGES,
  CATEGORY: CATEGORY_MESSAGES,
  TAG: TAG_MESSAGES,
  POST: POST_MESSAGES,
  COMMENT: COMMENT_MESSAGES,
  SUBSCRIBE: SUBSCRIBE_MESSAGES,
  DB: DB_MESSAGES,
} as const;
