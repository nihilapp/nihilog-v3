import { z } from 'zod';

import {
  createTagSchema,
  updateTagSchema,
  deleteTagSchema
} from '@/endpoints/prisma/schemas/tag.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminTagsEndpoints = () => {
  // POST /admin/tags - 태그 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/tags',
    summary: '🏷️ 태그 생성',
    description: 'ADMIN 권한으로 새로운 태그를 생성합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createTagSchema,
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
                summary: '태그 생성 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_CREATE_SUCCESS', CreateExample.tag('detail')),
              },
              conflict: {
                summary: '태그 이름 중복 (Service)',
                value: createError('CONFLICT', 'ADMIN_TAG_NAME_IN_USE'),
              },
              error: {
                summary: '태그 생성 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_CREATE_ERROR'),
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

  // POST /admin/tags/multiple - 다수 태그 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/tags/multiple',
    summary: '🏷️ 다수 태그 생성',
    description: 'ADMIN 권한으로 다수 태그를 일괄 생성합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.array(createTagSchema),
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
                summary: '다수 태그 생성 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_MULTIPLE_CREATE_SUCCESS', {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              conflict: {
                summary: '태그 이름 중복 (Service)',
                value: createError('CONFLICT', 'ADMIN_TAG_NAME_IN_USE'),
              },
              error: {
                summary: '다수 태그 생성 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_MULTIPLE_CREATE_ERROR'),
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

  // PUT /admin/tags - 태그 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/tags',
    summary: '✏️ 태그 수정',
    description: 'ADMIN 권한으로 태그 정보를 수정합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateTagSchema,
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
                summary: '태그 수정 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_UPDATE_SUCCESS', CreateExample.tag('detail')),
              },
              notFound: {
                summary: '태그를 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'ADMIN_TAG_NOT_FOUND'),
              },
              error: {
                summary: '태그 수정 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_UPDATE_ERROR'),
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

  // PUT /admin/tags/multiple - 다수 태그 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/tags/multiple',
    summary: '✏️ 다수 태그 수정',
    description: 'ADMIN 권한으로 다수 태그를 일괄 수정합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateTagSchema,
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
                summary: '다수 태그 수정 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_MULTIPLE_UPDATE_SUCCESS', {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 태그 수정 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_MULTIPLE_UPDATE_ERROR'),
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

  // DELETE /admin/tags - 태그 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/tags',
    summary: '🗑️ 태그 삭제',
    description: 'ADMIN 권한으로 태그를 삭제합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deleteTagSchema,
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
                summary: '태그 삭제 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_DELETE_SUCCESS', true),
              },
              notFound: {
                summary: '태그를 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'ADMIN_TAG_NOT_FOUND'),
              },
              error: {
                summary: '태그 삭제 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_DELETE_ERROR'),
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

  // DELETE /admin/tags/multiple - 다수 태그 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/tags/multiple',
    summary: '🗑️ 다수 태그 삭제',
    description: 'ADMIN 권한으로 다수 태그를 일괄 삭제합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deleteTagSchema,
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
                summary: '다수 태그 삭제 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_MULTIPLE_DELETE_SUCCESS', {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 태그 삭제 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_MULTIPLE_DELETE_ERROR'),
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
