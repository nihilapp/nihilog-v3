import { z } from 'zod';

import {
  searchTagSubscribeSchema,
  createTagSubscribeSchema,
  updateTagSubscribeSchema,
  deleteTagSubscribeSchema
} from '@/endpoints/prisma/schemas';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

// 태그 구독 엔드포인트 경로 등록
export const registerTagSubscribeEndpoints = () => {
  // 태그 구독 목록 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/users/subscribes/tags',
    summary: '📋 태그 구독 목록 조회',
    description: '사용자가 구독한 태그 목록을 조회합니다.',
    tags: [ 'tag-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: searchTagSubscribeSchema,
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
                summary: '태그 구독 목록 조회 성공',
                value: createResponse(
                  'SUCCESS',
                  'TAG_SUBSCRIBE_SEARCH_SUCCESS',
                  [ CreateExample.tagSubscribe('list'), ]
                ),
              },
              error: {
                summary: '태그 구독 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_SEARCH_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });

  // 특정 태그 구독 상태 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/users/subscribes/tags/{tagNo}',
    summary: '📋 특정 태그 구독 상태 조회',
    description: '특정 태그의 구독 상태를 조회합니다.',
    tags: [ 'tag-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        tagNo: z.coerce.number().int().positive().openapi({
          description: '태그 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: searchTagSubscribeSchema,
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
                summary: '태그 구독 상태 조회 성공',
                value: createResponse(
                  'SUCCESS',
                  'TAG_SUBSCRIBE_SEARCH_SUCCESS',
                  CreateExample.tagSubscribe('detail')
                ),
              },
              error: {
                summary: '태그 구독 상태 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_SEARCH_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });

  // 특정 태그 구독 설정
  openApiRegistry.registerPath({
    method: 'post',
    path: '/users/subscribes/tags/{tagNo}',
    summary: '➕ 태그 구독 설정',
    description: '특정 태그를 구독합니다.',
    tags: [ 'tag-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        tagNo: z.coerce.number().int().positive().openapi({
          description: '태그 번호',
          example: 1,
        }),
      }),
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
            examples: addGlobalResponses({
              success: {
                summary: '태그 구독 설정 성공',
                value: createResponse(
                  'SUCCESS',
                  'TAG_SUBSCRIBE_CREATE_SUCCESS',
                  CreateExample.tagSubscribe('detail')
                ),
              },
              error: {
                summary: '태그 구독 설정 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_CREATE_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });

  // 다수 태그 일괄 구독
  openApiRegistry.registerPath({
    method: 'post',
    path: '/users/subscribes/tags/multiple',
    summary: '➕ 다수 태그 일괄 구독',
    description: '여러 태그를 한 번에 구독합니다.',
    tags: [ 'tag-subscribe', ],
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
            examples: addGlobalResponses({
              success: {
                summary: '다수 태그 구독 성공',
                value: createResponse(
                  'SUCCESS',
                  'TAG_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS',
                  [ CreateExample.tagSubscribe('detail'), ]
                ),
              },
              error: {
                summary: '다수 태그 구독 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_MULTIPLE_CREATE_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });

  // 특정 태그 구독 설정 변경
  openApiRegistry.registerPath({
    method: 'put',
    path: '/users/subscribes/tags/{tagSbcrNo}',
    summary: '✏️ 특정 태그 구독 설정 변경',
    description: '특정 태그의 구독 설정을 변경합니다.',
    tags: [ 'tag-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        tagSbcrNo: z.coerce.number().int().positive().openapi({
          description: '태그 구독 번호',
          example: 1,
        }),
      }),
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
            examples: addGlobalResponses({
              success: {
                summary: '태그 구독 설정 변경 성공',
                value: createResponse(
                  'SUCCESS',
                  'TAG_SUBSCRIBE_UPDATE_SUCCESS',
                  CreateExample.tagSubscribe('detail')
                ),
              },
              error: {
                summary: '태그 구독 설정 변경 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_UPDATE_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });

  // 다수 태그 구독 설정 일괄 변경
  openApiRegistry.registerPath({
    method: 'put',
    path: '/users/subscribes/tags/multiple',
    summary: '✏️ 다수 태그 구독 설정 일괄 변경',
    description: '여러 태그의 구독 설정을 한 번에 변경합니다.',
    tags: [ 'tag-subscribe', ],
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
            examples: addGlobalResponses({
              success: {
                summary: '다수 태그 구독 설정 변경 성공',
                value: createResponse(
                  'SUCCESS',
                  'TAG_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS',
                  [ CreateExample.tagSubscribe('detail'), ]
                ),
              },
              error: {
                summary: '다수 태그 구독 설정 변경 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_MULTIPLE_UPDATE_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });

  // 특정 태그 구독 해제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/users/subscribes/tags/{tagSbcrNo}',
    summary: '➖ 태그 구독 해제',
    description: '특정 태그 구독을 해제합니다.',
    tags: [ 'tag-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        tagSbcrNo: z.coerce.number().int().positive().openapi({
          description: '태그 구독 번호',
          example: 1,
        }),
      }),
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '태그 구독 해제 성공',
                value: createResponse('SUCCESS', 'TAG_SUBSCRIBE_DELETE_SUCCESS', true),
              },
              error: {
                summary: '태그 구독 해제 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_DELETE_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });

  // 다수 태그 구독 일괄 해제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/users/subscribes/tags/multiple',
    summary: '➖ 다수 태그 구독 일괄 해제',
    description: '여러 태그 구독을 한 번에 해제합니다.',
    tags: [ 'tag-subscribe', ],
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
            examples: addGlobalResponses({
              success: {
                summary: '다수 태그 구독 해제 성공',
                value: createResponse(
                  'SUCCESS',
                  'TAG_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS',
                  [ CreateExample.tagSubscribe('detail'), ]
                ),
              },
              error: {
                summary: '다수 태그 구독 해제 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_MULTIPLE_DELETE_ERROR'),
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
