import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import {
  signInSchema,
  changePasswordSchema
} from '@/endpoints/prisma/schemas';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

// 인증 엔드포인트 경로 등록
export const registerAuthEndpoints = () => {
  // 로그인
  openApiRegistry.registerPath({
    method: 'post',
    path: '/auth/signin',
    summary: '로그인',
    description: '사용자 인증을 처리하고 JWT 토큰을 발급합니다.',
    tags: [ 'auth', ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: signInSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '로그인 성공',
                value: createResponse(
                  'SUCCESS',
                  MESSAGE.AUTH.SIGN_IN_SUCCESS,
                  CreateExample.user('detail')
                ),
              },
              invalidCredentials: {
                summary: '인증 실패',
                value: createError(
                  'UNAUTHORIZED',
                  MESSAGE.AUTH.INVALID_CREDENTIALS
                ),
              },
              userUpdateError: {
                summary: '사용자 정보 업데이트 실패',
                value: createError(
                  'INTERNAL_SERVER_ERROR',
                  MESSAGE.AUTH.SIGN_IN_ERROR
                ),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // 토큰 재발급
  openApiRegistry.registerPath({
    method: 'post',
    path: '/auth/refresh',
    summary: '토큰 재발급',
    description: '리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.',
    tags: [ 'auth', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '토큰 재발급 성공',
                value: createResponse(
                  'SUCCESS',
                  MESSAGE.AUTH.TOKEN_REFRESH_SUCCESS,
                  CreateExample.user('detail')
                ),
              },
              refreshTokenNotFound: {
                summary: '리프레시 토큰이 없음',
                value: createError(
                  'UNAUTHORIZED',
                  MESSAGE.AUTH.REFRESH_TOKEN_NOT_FOUND
                ),
              },
              sessionExpired: {
                summary: '리프레시 토큰 만료',
                value: createError(
                  'UNAUTHORIZED',
                  MESSAGE.AUTH.SESSION_EXPIRED
                ),
              },
              invalidRefreshToken: {
                summary: '리프레시 토큰이 유효하지 않음',
                value: createError(
                  'UNAUTHORIZED',
                  MESSAGE.AUTH.INVALID_REFRESH_TOKEN
                ),
              },
              userNotFound: {
                summary: '사용자를 찾을 수 없음',
                value: createError(
                  'UNAUTHORIZED',
                  MESSAGE.AUTH.NOT_FOUND
                ),
              },
              tokenRefreshError: {
                summary: '토큰 재발급 실패',
                value: createError(
                  'INTERNAL_SERVER_ERROR',
                  MESSAGE.AUTH.TOKEN_REFRESH_ERROR
                ),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // 로그아웃
  openApiRegistry.registerPath({
    method: 'post',
    path: '/auth/signout',
    summary: '로그아웃',
    description: '사용자 로그아웃을 처리하고 모든 인증 정보를 제거합니다.',
    tags: [ 'auth', ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '로그아웃 성공',
                value: createResponse(
                  'SUCCESS',
                  MESSAGE.AUTH.SIGN_OUT_SUCCESS,
                  null
                ),
              },
              signOutError: {
                summary: '로그아웃 실패',
                value: createError(
                  'INTERNAL_SERVER_ERROR',
                  MESSAGE.AUTH.SIGN_OUT_ERROR
                ),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // 세션 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/auth/session',
    summary: '세션 조회',
    description: '현재 로그인된 사용자의 세션 정보를 조회합니다.',
    tags: [ 'auth', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses(
              {
                success: {
                  summary: '세션 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.AUTH.SESSION_GET_SUCCESS,
                    CreateExample.user('detail')
                  ),
                },
                sessionNotFound: {
                  summary: '세션 조회 실패',
                  value: createError(
                    'UNAUTHORIZED',
                    MESSAGE.AUTH.SESSION_NOT_FOUND
                  ),
                },
              },
              {
                hasAuthGuard: true, // JWT 인증 사용
              }
            ),
          },
        },
      },
    },
  });

  // 비밀번호 변경
  openApiRegistry.registerPath({
    method: 'put',
    path: '/auth/password',
    summary: '비밀번호 변경',
    description: '현재 로그인된 사용자의 비밀번호를 변경합니다.',
    tags: [ 'auth', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: changePasswordSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses(
              {
                success: {
                  summary: '비밀번호 변경 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.AUTH.PASSWORD_CHANGE_SUCCESS,
                    CreateExample.user('detail')
                  ),
                },
                userNotFound: {
                  summary: '사용자를 찾을 수 없음',
                  value: createError(
                    'NOT_FOUND',
                    MESSAGE.AUTH.NOT_FOUND
                  ),
                },
                invalidCredentials: {
                  summary: '현재 비밀번호가 올바르지 않음',
                  value: createError(
                    'UNAUTHORIZED',
                    MESSAGE.AUTH.INVALID_CREDENTIALS
                  ),
                },
                passwordChangeError: {
                  summary: '비밀번호 변경 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.AUTH.PASSWORD_CHANGE_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true, // JWT 인증 사용
              }
            ),
          },
        },
      },
    },
  });
};
