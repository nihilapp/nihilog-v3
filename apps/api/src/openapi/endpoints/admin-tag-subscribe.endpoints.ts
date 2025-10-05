import { z } from 'zod';

import {
  searchTagSubscribeSchema,
  createTagSubscribeSchema,
  updateTagSubscribeSchema,
  deleteTagSubscribeSchema
} from '@/endpoints/prisma/schemas/tag-subscribe.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminTagSubscribeEndpoints = () => {
  // POST /admin/subscribes/tags/search - 태그 구독 목록 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/subscribes/tags/search',
    summary: '📋 태그 구독 목록 조회',
    description: '전체 태그 구독 목록을 조회합니다.',
    tags: [ 'admin-tag-subscribe', ],
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
                value: createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_SEARCH_SUCCESS', [ CreateExample.tagSubscribe('list'), ]),
              },
              error: {
                summary: '태그 구독 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_SEARCH_ERROR'),
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

  // GET /admin/subscribes/tags/{tagNo} - 태그별 구독자 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/subscribes/tags/{tagNo}',
    summary: '📋 태그별 구독자 조회',
    description: '특정 태그의 구독자 목록을 조회합니다.',
    tags: [ 'admin-tag-subscribe', ],
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
                summary: '태그별 구독자 조회 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_BY_TAG_SUCCESS', [ CreateExample.tagSubscribe('list'), ]),
              },
              notFound: {
                summary: '태그를 찾을 수 없음',
                value: createError('NOT_FOUND', 'TAG_SUBSCRIBE_NOT_FOUND'),
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

  // POST /admin/subscribes/tags - 태그 구독 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/subscribes/tags',
    summary: '✏️ 태그 구독 생성',
    description: '새로운 태그 구독을 생성합니다.',
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
            examples: addGlobalResponses({
              success: {
                summary: '태그 구독 생성 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_CREATE_SUCCESS', CreateExample.tagSubscribe('detail')),
              },
              conflict: {
                summary: '이미 구독 중인 태그',
                value: createError('CONFLICT', 'TAG_SUBSCRIBE_ALREADY_EXISTS'),
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
            examples: addGlobalResponses({
              success: {
                summary: '다수 태그 구독 생성 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS', [ CreateExample.tagSubscribe('detail'), ]),
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

  // PUT /admin/subscribes/tags/{tagSbcrNo} - 태그 구독 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/subscribes/tags/{tagSbcrNo}',
    summary: '🔄 태그 구독 수정',
    description: '태그 구독 정보를 수정합니다.',
    tags: [ 'admin-tag-subscribe', ],
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
                summary: '태그 구독 수정 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_UPDATE_SUCCESS', CreateExample.tagSubscribe('detail')),
              },
              notFound: {
                summary: '태그 구독을 찾을 수 없음',
                value: createError('NOT_FOUND', 'TAG_SUBSCRIBE_NOT_FOUND'),
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

  // PUT /admin/subscribes/tags/multiple - 다수 태그 구독 수정
  openApiRegistry.registerPath({
    method: 'put',
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
            examples: addGlobalResponses({
              success: {
                summary: '다수 태그 구독 수정 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', [ CreateExample.tagSubscribe('detail'), ]),
              },
              notFound: {
                summary: '태그 구독을 찾을 수 없음',
                value: createError('NOT_FOUND', 'TAG_SUBSCRIBE_NOT_FOUND'),
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

  // DELETE /admin/subscribes/tags/{tagSbcrNo} - 태그 구독 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/subscribes/tags/{tagSbcrNo}',
    summary: '🗑️ 태그 구독 삭제',
    description: '태그 구독을 삭제합니다.',
    tags: [ 'admin-tag-subscribe', ],
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
                summary: '태그 구독 삭제 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_DELETE_SUCCESS', true),
              },
              notFound: {
                summary: '태그 구독을 찾을 수 없음',
                value: createError('NOT_FOUND', 'TAG_SUBSCRIBE_NOT_FOUND'),
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
            examples: addGlobalResponses({
              success: {
                summary: '다수 태그 구독 삭제 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', null),
              },
              notFound: {
                summary: '태그 구독을 찾을 수 없음',
                value: createError('NOT_FOUND', 'TAG_SUBSCRIBE_NOT_FOUND'),
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
