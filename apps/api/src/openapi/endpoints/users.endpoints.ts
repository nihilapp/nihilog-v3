import { z } from 'zod';

import {
  createUserSchema,
  updateUserSchema,
  updateSubscribeSchema
} from '@/endpoints/prisma/schemas';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

// 사용자 엔드포인트 경로 등록
export const registerUserEndpoints = () => {
  // 내 프로필 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/users/profile',
    summary: '👤 내 프로필 조회',
    description: '현재 로그인한 사용자의 프로필 정보를 조회합니다.',
    tags: [ 'users', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '프로필 조회 성공',
                value: createResponse(
                  'SUCCESS',
                  'PROFILE_GET_SUCCESS',
                  CreateExample.user('detail')
                ),
              },
              error: {
                summary: '사용자를 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'USER_NOT_FOUND'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });

  // 이메일 구독 설정 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/users/subscribe',
    summary: '📧 이메일 구독 설정 조회',
    description: '현재 로그인한 사용자의 이메일 알림 및 구독 설정을 조회합니다.',
    tags: [ 'users', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '구독 설정 조회 성공',
                value: createResponse(
                  'SUCCESS',
                  'SUBSCRIBE_FETCH_SUCCESS',
                  CreateExample.subscribe('detail')
                ),
              },
              error: {
                summary: '구독 설정을 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'SUBSCRIBE_NOT_FOUND'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });

  // 사용자 계정 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/users',
    summary: '👤 사용자 계정 생성',
    description: '새로운 사용자 계정을 생성합니다.',
    tags: [ 'users', ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createUserSchema,
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
                summary: '사용자 생성 성공',
                value: createResponse(
                  'CREATED',
                  'USER_CREATE_SUCCESS',
                  CreateExample.user('detail')
                ),
              },
              emailInUse: {
                summary: '이메일 중복',
                value: createError('CONFLICT', 'EMAIL_IN_USE'),
              },
              createError: {
                summary: '사용자 생성 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'USER_CREATE_ERROR'),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // 내 프로필 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/users/profile',
    summary: '✏️ 내 프로필 수정',
    description: '현재 로그인한 사용자의 프로필 정보를 수정합니다.',
    tags: [ 'users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateUserSchema,
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
                summary: '프로필 수정 성공',
                value: createResponse(
                  'SUCCESS',
                  'USER_UPDATE_SUCCESS',
                  CreateExample.user('detail')
                ),
              },
              notFound: {
                summary: '사용자를 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'USER_NOT_FOUND'),
              },
              nameExists: {
                summary: '사용자명 중복',
                value: createError('CONFLICT', 'USER_NAME_EXISTS'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });

  // 이메일 구독 설정 변경
  openApiRegistry.registerPath({
    method: 'put',
    path: '/users/subscribe',
    summary: '⚙️ 이메일 구독 설정 변경',
    description: '현재 로그인한 사용자의 이메일 알림 및 구독 설정을 변경합니다.',
    tags: [ 'users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateSubscribeSchema,
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
                summary: '구독 설정 변경 성공',
                value: createResponse(
                  'SUCCESS',
                  'SUBSCRIBE_UPDATE_SUCCESS',
                  CreateExample.subscribe('detail')
                ),
              },
              userNotFound: {
                summary: '사용자를 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'USER_NOT_FOUND'),
              },
              subscribeNotFound: {
                summary: '구독 설정을 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'SUBSCRIBE_NOT_FOUND'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });

  // 내 프로필 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/users/profile',
    summary: '🗑️ 내 프로필 삭제',
    description: '현재 로그인한 사용자의 프로필 정보를 삭제합니다.',
    tags: [ 'users', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '프로필 삭제 성공',
                value: createResponse(
                  'SUCCESS',
                  'USER_DELETE_SUCCESS',
                  true
                ),
              },
              notFound: {
                summary: '사용자를 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'USER_NOT_FOUND'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });
};
