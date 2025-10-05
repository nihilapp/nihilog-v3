import { z } from 'zod';

import {
  searchCategorySubscribeSchema,
  createCategorySubscribeSchema,
  updateCategorySubscribeSchema,
  deleteCategorySubscribeSchema
} from '@/endpoints/prisma/schemas/category-subscribe.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminCategorySubscribeEndpoints = () => {
  // POST /admin/subscribes/categories/search - 카테고리 구독 목록 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/subscribes/categories/search',
    summary: '📋 카테고리 구독 목록 조회',
    description: '전체 카테고리 구독 목록을 조회합니다.',
    tags: [ 'admin-category-subscribe', ],
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
            examples: addGlobalResponses({
              success: {
                summary: '카테고리 구독 목록 조회 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_SEARCH_SUCCESS', [ CreateExample.categorySubscribe('list'), ]),
              },
              error: {
                summary: '카테고리 구독 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'CATEGORY_SUBSCRIBE_SEARCH_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // GET /admin/subscribes/categories/{ctgryNo} - 카테고리별 구독자 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/subscribes/categories/{ctgryNo}',
    summary: '📋 카테고리별 구독자 조회',
    description: '특정 카테고리의 구독자 목록을 조회합니다.',
    tags: [ 'admin-category-subscribe', ],
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
            examples: addGlobalResponses({
              success: {
                summary: '카테고리별 구독자 조회 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_BY_CATEGORY_SUCCESS', [ CreateExample.categorySubscribe('list'), ]),
              },
              notFound: {
                summary: '카테고리를 찾을 수 없음',
                value: createError('NOT_FOUND', 'CATEGORY_SUBSCRIBE_NOT_FOUND'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // POST /admin/subscribes/categories - 카테고리 구독 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/subscribes/categories',
    summary: '✏️ 카테고리 구독 생성',
    description: '새로운 카테고리 구독을 생성합니다.',
    tags: [ 'admin-category-subscribe', ],
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
            examples: addGlobalResponses({
              success: {
                summary: '카테고리 구독 생성 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_CREATE_SUCCESS', CreateExample.categorySubscribe('detail')),
              },
              conflict: {
                summary: '이미 구독 중인 카테고리',
                value: createError('CONFLICT', 'CATEGORY_SUBSCRIBE_ALREADY_EXISTS'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // POST /admin/subscribes/categories/multiple - 다수 카테고리 구독 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/subscribes/categories/multiple',
    summary: '✏️ 다수 카테고리 구독 생성',
    description: '다수 카테고리 구독을 일괄 생성합니다.',
    tags: [ 'admin-category-subscribe', ],
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
            examples: addGlobalResponses({
              success: {
                summary: '다수 카테고리 구독 생성 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS', [ CreateExample.categorySubscribe('detail'), ]),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // PUT /admin/subscribes/categories/{ctgrySbcrNo} - 카테고리 구독 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/subscribes/categories/{ctgrySbcrNo}',
    summary: '🔄 카테고리 구독 수정',
    description: '카테고리 구독 정보를 수정합니다.',
    tags: [ 'admin-category-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        ctgrySbcrNo: z.coerce.number().int().positive().openapi({
          description: '카테고리 구독 번호',
          example: 1,
        }),
      }),
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
            examples: addGlobalResponses({
              success: {
                summary: '카테고리 구독 수정 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_UPDATE_SUCCESS', CreateExample.categorySubscribe('detail')),
              },
              notFound: {
                summary: '카테고리 구독을 찾을 수 없음',
                value: createError('NOT_FOUND', 'CATEGORY_SUBSCRIBE_NOT_FOUND'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // PUT /admin/subscribes/categories/multiple - 다수 카테고리 구독 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/subscribes/categories/multiple',
    summary: '🔄 다수 카테고리 구독 수정',
    description: '다수 카테고리 구독을 일괄 수정합니다.',
    tags: [ 'admin-category-subscribe', ],
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
            examples: addGlobalResponses({
              success: {
                summary: '다수 카테고리 구독 수정 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', [ CreateExample.categorySubscribe('detail'), ]),
              },
              notFound: {
                summary: '카테고리 구독을 찾을 수 없음',
                value: createError('NOT_FOUND', 'CATEGORY_SUBSCRIBE_NOT_FOUND'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // DELETE /admin/subscribes/categories/{ctgrySbcrNo} - 카테고리 구독 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/subscribes/categories/{ctgrySbcrNo}',
    summary: '🗑️ 카테고리 구독 삭제',
    description: '카테고리 구독을 삭제합니다.',
    tags: [ 'admin-category-subscribe', ],
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
            examples: addGlobalResponses({
              success: {
                summary: '카테고리 구독 삭제 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_DELETE_SUCCESS', true),
              },
              notFound: {
                summary: '카테고리 구독을 찾을 수 없음',
                value: createError('NOT_FOUND', 'CATEGORY_SUBSCRIBE_NOT_FOUND'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // DELETE /admin/subscribes/categories/multiple - 다수 카테고리 구독 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/subscribes/categories/multiple',
    summary: '🗑️ 다수 카테고리 구독 삭제',
    description: '다수 카테고리 구독을 일괄 삭제합니다.',
    tags: [ 'admin-category-subscribe', ],
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
            examples: addGlobalResponses({
              success: {
                summary: '다수 카테고리 구독 삭제 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', null),
              },
              notFound: {
                summary: '카테고리 구독을 찾을 수 없음',
                value: createError('NOT_FOUND', 'CATEGORY_SUBSCRIBE_NOT_FOUND'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });
};
