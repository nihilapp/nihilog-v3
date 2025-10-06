import { z } from 'zod';

import {
  createTagSchema,
  updateTagSchema,
  deleteTagSchema,
  createPstTagMpngSchema,
  deletePstTagMpngSchema,
  searchPstTagMpngSchema
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

  // POST /admin/tags/mapping - 태그 매핑 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/tags/mapping',
    summary: '🔍 태그 매핑 조회',
    description: 'ADMIN 권한으로 태그 매핑 목록을 조회합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: searchPstTagMpngSchema,
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
                summary: '태그 매핑 조회 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_MAPPING_SEARCH_SUCCESS', {
                  list: [
                    {
                      tagNo: 1,
                      tagNm: 'JavaScript',
                      pstNo: 1,
                      pstTitle: 'JavaScript 기초',
                      createdAt: '2024-01-01T00:00:00.000Z',
                    },
                  ],
                  total: 1,
                  page: 1,
                  limit: 10,
                }),
              },
              error: {
                summary: '태그 매핑 조회 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_MAPPING_SEARCH_ERROR'),
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

  // GET /admin/tags/mapping/:pstNo/:tagNo - 특정 태그 매핑 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/mapping/{pstNo}/{tagNo}',
    summary: '🔍 특정 태그 매핑 조회',
    description: 'ADMIN 권한으로 특정 포스트-태그 매핑을 조회합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        pstNo: z.coerce.number().int().positive().openapi({
          description: '포스트 번호',
          example: 1,
        }),
        tagNo: z.coerce.number().int().positive().openapi({
          description: '태그 번호',
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
                summary: '태그 매핑 조회 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_MAPPING_SEARCH_SUCCESS', {
                  tagNo: 1,
                  tagNm: 'JavaScript',
                  pstNo: 1,
                  pstTitle: 'JavaScript 기초',
                  createdAt: '2024-01-01T00:00:00.000Z',
                }),
              },
              notFound: {
                summary: '태그 매핑을 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'ADMIN_TAG_NOT_FOUND'),
              },
              error: {
                summary: '태그 매핑 조회 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_MAPPING_SEARCH_ERROR'),
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

  // POST /admin/tags/mapping - 태그 매핑 추가
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/tags/mapping',
    summary: '➕ 태그 매핑 추가',
    description: 'ADMIN 권한으로 포스트에 태그를 매핑합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createPstTagMpngSchema,
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
                summary: '태그 매핑 추가 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_MAPPING_CREATE_SUCCESS', {
                  tagNo: 1,
                  tagNm: 'JavaScript',
                  pstNo: 1,
                  pstTitle: 'JavaScript 기초',
                  createdAt: '2024-01-01T00:00:00.000Z',
                }),
              },
              conflict: {
                summary: '이미 존재하는 태그 매핑 (Service)',
                value: createError('CONFLICT', 'ADMIN_TAG_MAPPING_ALREADY_EXISTS'),
              },
              error: {
                summary: '태그 매핑 추가 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_MAPPING_CREATE_ERROR'),
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

  // POST /admin/tags/mapping/multiple - 다수 태그 매핑 추가
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/tags/mapping/multiple',
    summary: '➕ 다수 태그 매핑 추가',
    description: 'ADMIN 권한으로 다수 포스트-태그 매핑을 일괄 추가합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.array(createPstTagMpngSchema),
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
                summary: '다수 태그 매핑 추가 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_MAPPING_CREATE_SUCCESS', {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              conflict: {
                summary: '이미 존재하는 태그 매핑 (Service)',
                value: createError('CONFLICT', 'ADMIN_TAG_MAPPING_ALREADY_EXISTS'),
              },
              error: {
                summary: '다수 태그 매핑 추가 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_MAPPING_CREATE_ERROR'),
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

  // DELETE /admin/tags/mapping - 태그 매핑 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/tags/mapping',
    summary: '🗑️ 태그 매핑 삭제',
    description: 'ADMIN 권한으로 포스트-태그 매핑을 삭제합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deletePstTagMpngSchema,
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
                summary: '태그 매핑 삭제 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_MAPPING_DELETE_SUCCESS', true),
              },
              notFound: {
                summary: '태그 매핑을 찾을 수 없음 (Repository)',
                value: createError('NOT_FOUND', 'ADMIN_TAG_NOT_FOUND'),
              },
              error: {
                summary: '태그 매핑 삭제 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_MAPPING_DELETE_ERROR'),
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

  // DELETE /admin/tags/mapping/multiple - 다수 태그 매핑 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/tags/mapping/multiple',
    summary: '🗑️ 다수 태그 매핑 삭제',
    description: 'ADMIN 권한으로 다수 포스트-태그 매핑을 일괄 삭제합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deletePstTagMpngSchema,
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
                summary: '다수 태그 매핑 삭제 성공',
                value: createResponse('SUCCESS', 'ADMIN_TAG_MAPPING_DELETE_SUCCESS', {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 태그 매핑 삭제 실패 (Service)',
                value: createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_MAPPING_DELETE_ERROR'),
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
