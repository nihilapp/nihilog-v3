import { z } from 'zod';

import {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  searchCategorySchema
} from '@/endpoints/prisma/schemas/category.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminCategoriesEndpoints = () => {
  // POST /admin/categories - 카테고리 목록 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/categories',
    summary: '📁 관리자 카테고리 목록 조회',
    description: 'ADMIN 권한으로 카테고리 목록을 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: searchCategorySchema,
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
                summary: '카테고리 목록 조회 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_SEARCH_SUCCESS', CreateExample.category('list')),
              },
              error: {
                summary: '카테고리 목록 조회 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_CATEGORY_SEARCH_ERROR'),
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

  // GET /admin/categories/{ctgryNo} - 카테고리 상세 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/categories/{ctgryNo}',
    summary: '📁 관리자 카테고리 상세 조회',
    description: 'ADMIN 권한으로 특정 카테고리의 상세 정보를 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        ctgryNo: z.coerce.number().int().positive().openapi({
          description: '카테고리 번호',
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
                summary: '카테고리 조회 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_GET_SUCCESS', CreateExample.category('detail')),
              },
              notFound: {
                summary: '카테고리를 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'ADMIN_CATEGORY_NOT_FOUND'),
              },
              error: {
                summary: '카테고리 조회 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_CATEGORY_GET_ERROR'),
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

  // GET /admin/categories/name/{name} - 카테고리명으로 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/categories/name/{name}',
    summary: '🔍 관리자 카테고리명으로 조회',
    description: 'ADMIN 권한으로 카테고리명으로 카테고리를 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        name: z.string().openapi({
          description: '카테고리명',
          example: 'JavaScript',
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
                summary: '카테고리 조회 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_GET_BY_NAME_SUCCESS', CreateExample.category('detail')),
              },
              notFound: {
                summary: '카테고리를 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'ADMIN_CATEGORY_NAME_NOT_FOUND'),
              },
              error: {
                summary: '카테고리 조회 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_CATEGORY_GET_BY_NAME_ERROR'),
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

  // POST /admin/categories - 카테고리 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/categories',
    summary: '📁 카테고리 생성',
    description: 'ADMIN 권한으로 새로운 카테고리를 생성합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createCategorySchema,
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
                summary: '카테고리 생성 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_CREATE_SUCCESS', CreateExample.category('detail')),
              },
              conflict: {
                summary: '카테고리 이름 중복 (Service)',
                value: createError('CONFLICT', 'ADMIN_CATEGORY_NAME_IN_USE'),
              },
              error: {
                summary: '카테고리 생성 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_CATEGORY_CREATE_ERROR'),
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

  // POST /admin/categories/multiple - 다수 카테고리 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/categories/multiple',
    summary: '📁 다수 카테고리 생성',
    description: 'ADMIN 권한으로 다수 카테고리를 일괄 생성합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.array(createCategorySchema),
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
                summary: '다수 카테고리 생성 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_MULTIPLE_CREATE_SUCCESS', {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 카테고리 생성 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_CATEGORY_MULTIPLE_CREATE_ERROR'),
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

  // PATCH /admin/categories/{ctgryNo} - 카테고리 수정
  openApiRegistry.registerPath({
    method: 'patch',
    path: '/admin/categories/{ctgryNo}',
    summary: '📁 카테고리 수정',
    description: 'ADMIN 권한으로 카테고리 정보를 수정합니다.',
    tags: [ 'admin-categories', ],
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
            schema: updateCategorySchema,
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
                summary: '카테고리 수정 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_UPDATE_SUCCESS', CreateExample.category('detail')),
              },
              notFound: {
                summary: '카테고리를 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'ADMIN_CATEGORY_NOT_FOUND'),
              },
              error: {
                summary: '카테고리 수정 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_CATEGORY_UPDATE_ERROR'),
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

  // PATCH /admin/categories/multiple - 다수 카테고리 수정
  openApiRegistry.registerPath({
    method: 'patch',
    path: '/admin/categories/multiple',
    summary: '📁 다수 카테고리 수정',
    description: 'ADMIN 권한으로 다수 카테고리를 일괄 수정합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateCategorySchema.extend({
              ctgryNoList: z.array(z.number().int().positive()).openapi({
                description: '수정할 카테고리 번호 목록',
                example: [ 1, 2, 3, ],
              }),
            }),
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
                summary: '다수 카테고리 수정 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_MULTIPLE_UPDATE_SUCCESS', {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 카테고리 수정 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_CATEGORY_MULTIPLE_UPDATE_ERROR'),
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

  // DELETE /admin/categories/{ctgryNo} - 카테고리 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/categories/{ctgryNo}',
    summary: '📁 카테고리 삭제',
    description: 'ADMIN 권한으로 카테고리를 삭제합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        ctgryNo: z.coerce.number().int().positive().openapi({
          description: '카테고리 번호',
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
                summary: '카테고리 삭제 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_DELETE_SUCCESS', true),
              },
              notFound: {
                summary: '카테고리를 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'ADMIN_CATEGORY_NOT_FOUND'),
              },
              error: {
                summary: '카테고리 삭제 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_CATEGORY_DELETE_ERROR'),
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

  // DELETE /admin/categories/multiple - 다수 카테고리 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/categories/multiple',
    summary: '📁 다수 카테고리 삭제',
    description: 'ADMIN 권한으로 다수 카테고리를 일괄 삭제합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deleteCategorySchema,
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
                summary: '다수 카테고리 삭제 성공',
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_MULTIPLE_DELETE_SUCCESS', {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 카테고리 삭제 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_CATEGORY_MULTIPLE_DELETE_ERROR'),
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
