import { z } from 'zod';

import {
  createCategorySubscribeSchema,
  updateCategorySubscribeSchema,
  deleteCategorySubscribeSchema
} from '@/endpoints/prisma/schemas/category-subscribe.schema';
import { createError, createResponse } from '@/utils';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminCategorySubscribeEndpoints = () => {
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
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS', {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              conflict: {
                summary: '이미 존재하는 카테고리 구독',
                value: createError('CONFLICT', 'CATEGORY_SUBSCRIBE_ALREADY_EXISTS'),
              },
              error: {
                summary: '다수 카테고리 구독 생성 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_CREATE_ERROR'),
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
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              notFound: {
                summary: '카테고리 구독을 찾을 수 없음',
                value: createError('NOT_FOUND', 'CATEGORY_SUBSCRIBE_NOT_FOUND'),
              },
              error: {
                summary: '다수 카테고리 구독 수정 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_UPDATE_ERROR'),
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
                value: createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              notFound: {
                summary: '카테고리 구독을 찾을 수 없음',
                value: createError('NOT_FOUND', 'CATEGORY_SUBSCRIBE_NOT_FOUND'),
              },
              error: {
                summary: '다수 카테고리 구독 삭제 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_DELETE_ERROR'),
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
