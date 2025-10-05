import { z } from 'zod';

import {
  searchCategorySubscribeSchema,
  createCategorySubscribeSchema,
  updateCategorySubscribeSchema,
  deleteCategorySubscribeSchema
} from '@/endpoints/prisma/schemas';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';

// 카테고리 구독 엔드포인트 경로 등록
export const registerCategorySubscribeEndpoints = () => {
  // 카테고리 구독 목록 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/users/subscribes/categories',
    summary: '📋 카테고리 구독 목록 조회',
    description: '사용자가 구독한 카테고리 목록을 조회합니다.',
    tags: [ 'users/subscribes/categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: searchCategorySubscribeSchema,
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
            examples: {
              success: {
                summary: '카테고리 구독 목록 조회 성공',
                value: createResponse(
                  'SUCCESS',
                  'CATEGORY_SUBSCRIBE_SEARCH_SUCCESS',
                  [ CreateExample.categorySubscribe('list'), ]
                ),
              },
              error: {
                summary: '카테고리 구독 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'CATEGORY_SUBSCRIBE_SEARCH_ERROR'),
              },
            },
          },
        },
      },
    },
  });

  // 특정 카테고리 구독 상태 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/users/subscribes/categories/{ctgryNo}',
    summary: '📋 특정 카테고리 구독 상태 조회',
    description: '특정 카테고리의 구독 상태를 조회합니다.',
    tags: [ 'users/subscribes/categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        ctgryNo: z.coerce.number().int().positive().openapi({
          description: '카테고리 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: searchCategorySubscribeSchema,
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
            examples: {
              success: {
                summary: '카테고리 구독 상태 조회 성공',
                value: createResponse(
                  'SUCCESS',
                  'CATEGORY_SUBSCRIBE_SEARCH_SUCCESS',
                  CreateExample.categorySubscribe('detail')
                ),
              },
              error: {
                summary: '카테고리 구독 상태 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'CATEGORY_SUBSCRIBE_SEARCH_ERROR'),
              },
            },
          },
        },
      },
    },
  });

  // 특정 카테고리 구독 설정
  openApiRegistry.registerPath({
    method: 'post',
    path: '/users/subscribes/categories/{ctgryNo}',
    summary: '➕ 카테고리 구독 설정',
    description: '특정 카테고리를 구독합니다.',
    tags: [ 'users/subscribes/categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        ctgryNo: z.coerce.number().int().positive().openapi({
          description: '카테고리 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: createCategorySubscribeSchema,
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
            examples: {
              success: {
                summary: '카테고리 구독 설정 성공',
                value: createResponse(
                  'SUCCESS',
                  'CATEGORY_SUBSCRIBE_CREATE_SUCCESS',
                  CreateExample.categorySubscribe('detail')
                ),
              },
              error: {
                summary: '카테고리 구독 설정 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'CATEGORY_SUBSCRIBE_CREATE_ERROR'),
              },
            },
          },
        },
      },
    },
  });

  // 다수 카테고리 일괄 구독
  openApiRegistry.registerPath({
    method: 'post',
    path: '/users/subscribes/categories/multiple',
    summary: '➕ 다수 카테고리 일괄 구독',
    description: '여러 카테고리를 한 번에 구독합니다.',
    tags: [ 'users/subscribes/categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createCategorySubscribeSchema,
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
            examples: {
              success: {
                summary: '다수 카테고리 구독 성공',
                value: createResponse(
                  'SUCCESS',
                  'CATEGORY_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS',
                  [ CreateExample.categorySubscribe('detail'), ]
                ),
              },
              error: {
                summary: '다수 카테고리 구독 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'CATEGORY_SUBSCRIBE_MULTIPLE_CREATE_ERROR'),
              },
            },
          },
        },
      },
    },
  });

  // 다수 카테고리 구독 설정 일괄 변경
  openApiRegistry.registerPath({
    method: 'put',
    path: '/users/subscribes/categories/multiple',
    summary: '✏️ 다수 카테고리 구독 설정 일괄 변경',
    description: '여러 카테고리의 구독 설정을 한 번에 변경합니다.',
    tags: [ 'users/subscribes/categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateCategorySubscribeSchema,
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
            examples: {
              success: {
                summary: '다수 카테고리 구독 설정 변경 성공',
                value: createResponse(
                  'SUCCESS',
                  'CATEGORY_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS',
                  [ CreateExample.categorySubscribe('detail'), ]
                ),
              },
              error: {
                summary: '다수 카테고리 구독 설정 변경 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'CATEGORY_SUBSCRIBE_MULTIPLE_UPDATE_ERROR'),
              },
            },
          },
        },
      },
    },
  });

  // 특정 카테고리 구독 해제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/users/subscribes/categories/{ctgrySbcrNo}',
    summary: '➖ 카테고리 구독 해제',
    description: '특정 카테고리 구독을 해제합니다.',
    tags: [ 'users/subscribes/categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        ctgrySbcrNo: z.coerce.number().int().positive().openapi({
          description: '카테고리 구독 번호',
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
            examples: {
              success: {
                summary: '카테고리 구독 해제 성공',
                value: createResponse('SUCCESS', 'CATEGORY_SUBSCRIBE_DELETE_SUCCESS', true),
              },
              error: {
                summary: '카테고리 구독 해제 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'CATEGORY_SUBSCRIBE_DELETE_ERROR'),
              },
            },
          },
        },
      },
    },
  });

  // 다수 카테고리 구독 일괄 해제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/users/subscribes/categories/multiple',
    summary: '➖ 다수 카테고리 구독 일괄 해제',
    description: '여러 카테고리 구독을 한 번에 해제합니다.',
    tags: [ 'users/subscribes/categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deleteCategorySubscribeSchema,
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
            examples: {
              success: {
                summary: '다수 카테고리 구독 해제 성공',
                value: createResponse('SUCCESS', 'CATEGORY_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', null),
              },
              error: {
                summary: '다수 카테고리 구독 해제 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'CATEGORY_SUBSCRIBE_MULTIPLE_DELETE_ERROR'),
              },
            },
          },
        },
      },
    },
  });
};
