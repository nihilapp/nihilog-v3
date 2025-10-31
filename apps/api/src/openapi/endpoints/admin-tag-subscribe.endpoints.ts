import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import {
  createTagSubscribeSchema,
  updateTagSubscribeSchema,
  deleteTagSubscribeSchema
} from '@/endpoints/prisma/schemas/tag-subscribe.schema';
import { createError, createResponse } from '@/utils';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminTagSubscribeEndpoints = () => {
  // POST /admin/subscribes/tags/multiple - 다수 태그 구독 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/subscribes/tags/multiple',
    summary: '✏️ 다수 태그 구독 생성',
    description: '다수 태그 구독을 일괄 생성합니다.',
    tags: [ 'admin-tag-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createTagSubscribeSchema,
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
                  summary: '다수 태그 구독 생성 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.SUBSCRIBE.TAG.ADMIN_MULTIPLE_CREATE_SUCCESS,
                    {
                      successCnt: 3,
                      failCnt: 0,
                      failNoList: [],
                    }
                  ),
                },
                conflict: {
                  summary: '이미 존재하는 태그 구독',
                  value: createError(
                    'CONFLICT',
                    MESSAGE.SUBSCRIBE.TAG.ALREADY_EXISTS
                  ),
                },
                error: {
                  summary: '다수 태그 구독 생성 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.SUBSCRIBE.TAG.ADMIN_MULTIPLE_CREATE_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true, // JWT 인증 사용
                hasRoles: true, // 권한 사용
              }
            ),
          },
        },
      },
    },
  });

  // PATCH /admin/subscribes/tags/multiple - 다수 태그 구독 수정
  openApiRegistry.registerPath({
    method: 'patch',
    path: '/admin/subscribes/tags/multiple',
    summary: '🔄 다수 태그 구독 수정',
    description: '다수 태그 구독을 일괄 수정합니다.',
    tags: [ 'admin-tag-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateTagSubscribeSchema,
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
                  summary: '다수 태그 구독 수정 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.SUBSCRIBE.TAG.ADMIN_MULTIPLE_UPDATE_SUCCESS,
                    {
                      successCnt: 3,
                      failCnt: 0,
                      failNoList: [],
                    }
                  ),
                },
                notFound: {
                  summary: '태그 구독을 찾을 수 없음',
                  value: createError(
                    'NOT_FOUND',
                    MESSAGE.SUBSCRIBE.TAG.NOT_FOUND
                  ),
                },
                error: {
                  summary: '다수 태그 구독 수정 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.SUBSCRIBE.TAG.ADMIN_MULTIPLE_UPDATE_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true, // JWT 인증 사용
                hasRoles: true, // 권한 사용
              }
            ),
          },
        },
      },
    },
  });

  // DELETE /admin/subscribes/tags/multiple - 다수 태그 구독 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/subscribes/tags/multiple',
    summary: '🗑️ 다수 태그 구독 삭제',
    description: '다수 태그 구독을 일괄 삭제합니다.',
    tags: [ 'admin-tag-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deleteTagSubscribeSchema,
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
                  summary: '다수 태그 구독 삭제 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.SUBSCRIBE.TAG.ADMIN_MULTIPLE_DELETE_SUCCESS,
                    {
                      successCnt: 3,
                      failCnt: 0,
                      failNoList: [],
                    }
                  ),
                },
                notFound: {
                  summary: '태그 구독을 찾을 수 없음',
                  value: createError(
                    'NOT_FOUND',
                    MESSAGE.SUBSCRIBE.TAG.NOT_FOUND
                  ),
                },
                error: {
                  summary: '다수 태그 구독 삭제 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.SUBSCRIBE.TAG.ADMIN_MULTIPLE_DELETE_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true, // JWT 인증 사용
                hasRoles: true, // 권한 사용
              }
            ),
          },
        },
      },
    },
  });
};
